import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListCategory: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            sort: data.sort,
            populate: {
                products: { populate: '*' },
                thub: { populate: 'url' },
                thub_mobile: { populate: 'url' },
                home_thub: { populate: 'url' },
                home_thub_mobile: { populate: 'url' }
            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/categories?${query}`
        })
        commit('set_list_category', {
            list_category: res.data.filter(i => i.attributes.state === 'active')
        })
    },

    getCountCategory: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            url: '/api/categories/count',
            data: data.params ? data.params : {}
        })
        return res
    },

    getCategoryId: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/Categorys/${data.id}`,
            url: '/api/categories/${data.id}',
            data: data.params ? data.params : {}
        })
        // if (res && res.content.includes('<figure class="media"><oembed ')) {
        //     const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
        //     res.content = res.content.replace(regex,
        //         '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
        //         + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        //         + '</div></div>');
        // }
        // if (res && res.content_vn.includes('<figure class="media"><oembed ')) {
        //     const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
        //     res.content_vn = res.content_vn.replace(regex,
        //         '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
        //         + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        //         + '</div></div>');
        // }
        commit('set_category', {
            category: res
        })
    },

    getCategoryBySlug: async ({ commit, rootState }, data) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/categories?populate=*&filters[slug][$eq]=${data}`
        })
        if (res && res.data && res.data.length > 0) {
            commit('set_category', {
                category: res?.data[0]
            })
        }
    },

    getListSubCategory: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            url: '/api/subcategories',
            data: data.params ? data.params : {}
        })
        commit('set_list_subcategory', {
            list_subcategory: res.data
        })
    }
}