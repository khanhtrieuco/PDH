import ApiService from '@/service/api.service'
export default {
    getCountInnovation: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            url: '/api/innovations/count',
            data: data.params ? data.params : {}
        })
        return res
    },

    getListInnovation: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/innovations`,
            url: `api/innovations`,
            data: data.params ? data.params : {}
        })
        commit('set_list_innovation', {
            list_innovation: res
        })
    },

    getListInnovationId: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/innovations/${data.id}`,
            url: `api/innovations/${data.id}`,
            data: data.params ? data.params : {}
        })
        if (res && res.content.includes('<figure class="media"><oembed ')) {
            const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
            res.content = res.content.replace(regex,
                '<div style="width: 100%;"><div style="width: 100%;position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                + '</div></div>');
        }
        if (res && res.content_vn.includes('<figure class="media"><oembed ')) {
            const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
            res.content_vn = res.content_vn.replace(regex,
                '<div style="width: 100%;"><div style="width: 100%;position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                + '</div></div>');
        }
        commit('set_innovation', {
            innovation: res
        })
    },

    getInnovationBySlug: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/innovations?url=${data.url}`
            url: `api/innovations?url=${data.url}`,
        })
        if (res && res.length > 0) {
            if (res[0].content.includes('<figure class="media"><oembed ')) {
                const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
                res[0].content = res[0].content.replace(regex,
                    '<div style="width: 100%;"><div style="width: 100%;position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                    + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    + '</div></div>');
            }
            if (res[0].content_vn.includes('<figure class="media"><oembed ')) {
                const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
                res[0].content_vn = res[0].content_vn.replace(regex,
                    '<div style="width: 100%;"><div style="width: 100%;position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                    + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    + '</div></div>');
            }
            commit('set_innovation', {
                innovation: res[0]
            })
        }
    }

}