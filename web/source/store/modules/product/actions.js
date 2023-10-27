import ApiService from '@/service/api.service'
import qs from 'qs';
export default {
    getListProduct: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: data.sort,
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/products?${query}`
        })
        commit('set_list_product', {
            list_product: res.data.filter(i => i.attributes.state === 'active')
        })
    },

    getListProductLike: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: {
                likes: {
                    user_id: data.user_id
                }
            },
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/products?${query}`
        })
        commit('set_data', {
            name: 'list_product_like',
            data: res.data
        })
    },

    getProductBySlug: async ({ commit, rootState }, data) => {
        const query = qs.stringify({
            filters: {
                slug: data
            },
            populate: {
                detail_backgroud: '*',
                detail_backgroud_mobile: '*',
                likes: '*',
                categories: '*',
                media: '*',
                variants: {
                    populate: {
                        color: '*',
                        size: '*'
                    }
                },
                related: {
                    populate: {
                        likes: '*',
                        thub: '*',
                        thub_main: '*',
                    }
                },
                thub_main: '*',
                thub: '*',
            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/products?${query}`
        })
        if (res && res.data && res.data.length > 0) {
            commit('set_product', {
                product: res?.data[0]
            })
        }
    },

    getListProductAdmin: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: data.sort,
            pagination: data.pagination,
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/products?${query}`
        })
        commit('set_data', {
            name: 'list_product_admin',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },

    getListProductRelated: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: data.sort,
            pagination: data.pagination,
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/products?${query}`
        })
        commit('set_data', {
            name: 'list_product_related',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },

    createProduct: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: `/api/products`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    updateProduct: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/products/${data.id}`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    getListTip: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            url: '/api/tips',
            data: data.params ? data.params : {}
        })
        commit('set_data', {
            name: 'list_tip',
            data: res.data
        })
    },

    addView: async ({ commit, rootState }, data = {}) => {
        commit('set_product_view', { product: data })
    },


    // getListWork: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works`,
    //         url: '/api/works',
    //         data: data.params ? data.params : {}
    //     })
    //     commit('set_list_work', {
    //         list_work: res
    //     })
    // },

    // getCountWork: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works/count`,
    //         url: '/api/works/count',
    //         data: data.params ? data.params : {}
    //     })
    //     return res
    // },

    // getWorkId: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works/${data.id}`,
    //         url: '/api/works/${data.id}',
    //         data: data.params ? data.params : {}
    //     })
    //     if (res && res.content.includes('<figure class="media"><oembed ')) {
    //         const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //         res.content = res.content.replace(regex,
    //             '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //             + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //             + '</div></div>');
    //     }
    //     if (res && res.content_vn.includes('<figure class="media"><oembed ')) {
    //         const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //         res.content_vn = res.content_vn.replace(regex,
    //             '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //             + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //             + '</div></div>');
    //     }
    //     commit('set_work', {
    //         work: res
    //     })
    // },

    // getWorkBySlug: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works?url=${data.url}`
    //         url: `/api/works?url=${data.url}`
    //     })
    //     if (res && res.length > 0) {
    //         if (res[0].content.includes('<figure class="media"><oembed ')) {
    //             const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //             res[0].content = res[0].content.replace(regex,
    //                 '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //                 + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //                 + '</div></div>');
    //         }
    //         if (res[0].content_vn.includes('<figure class="media"><oembed ')) {
    //             const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //             res[0].content_vn = res[0].content_vn.replace(regex,
    //                 '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //                 + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //                 + '</div></div>');
    //         }
    //         commit('set_work', {
    //             work: res[0]
    //         })
    //     }
    // }

}