import ApiService from '@/service/api.service'
export default {
    getListFeatured: async ({ commit, rootState }, data = {}) => {
        
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/featured-works?_sort=order:desc`,
            url: '/api/featured-works?_sort=order:desc,id:desc',
            data: data.params ? data.params : {}
        })
        let res_work = await ApiService.request({
            method: 'get',
            url: '/api/works',
            data: data.params ? data.params : {}
        })
        let list_work = []
        for(let work of res) {
            let temp = res_work.find(o => o.id === work.work.id)
            if(temp) {
                list_work.push(temp)
            }
        }
        commit('set_list_work', {
            // list_work: res.map(i => { return i.work })
            list_work: list_work
        })
    },

    getListWork: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/works`,
            url: '/api/works',
            data: data.params ? data.params : {}
        })
        commit('set_list_work', {
            list_work: res
        })
    },

    getCountWork: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/works/count`,
            url: '/api/works/count',
            data: data.params ? data.params : {}
        })
        return res
    },

    getWorkId: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/works/${data.id}`,
            url: '/api/works/${data.id}',
            data: data.params ? data.params : {}
        })
        if (res && res.content.includes('<figure class="media"><oembed ')) {
            const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
            res.content = res.content.replace(regex,
                '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                + '</div></div>');
        }
        if (res && res.content_vn.includes('<figure class="media"><oembed ')) {
            const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
            res.content_vn = res.content_vn.replace(regex,
                '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                + '</div></div>');
        }
        commit('set_work', {
            work: res
        })
    },

    getWorkBySlug: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/works?url=${data.url}`
            url: `/api/works?url=${data.url}`
        })
        if (res && res.length > 0) {
            if (res[0].content.includes('<figure class="media"><oembed ')) {
                const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
                res[0].content = res[0].content.replace(regex,
                    '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                    + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    + '</div></div>');
            }
            if (res[0].content_vn.includes('<figure class="media"><oembed ')) {
                const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
                res[0].content_vn = res[0].content_vn.replace(regex,
                    '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                    + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    + '</div></div>');
            }
            commit('set_work', {
                work: res[0]
            })
        }
    }

}