import ApiService from '@/service/api.service'
import qs from 'qs';
export default {
    getListOrder: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: 'id:desc',
            populate: {
                cartitems : {
                    populate : { 
                        product : { populate: 'thub'} , 
                        variant : { populate: '*'} 
                    }
                }
            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/orders?${query}`
        })
        commit('set_list_order', {
            list_order: res.data
        })
    },

    createOrder: async function ({ commit }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "/api/app/createorder",
            data: data
        });
        return res
    },

    captureOrder: async function ({ commit }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "/api/app/captureorder",
            data: data
        });
        return res
    },

    updateOrder: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/orders/${data.id}`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    approveOrder: async function ({
        commit
    }, id) {
        let res = await ApiService.request({
            method: "post",
            url: `/api/app/approveOrder`,
            data: { order_id : id }
        });
        if (res) {
            return res
        }
        return false
    },

    // createOrder: async function ({ commit }, data) {
    //     let res = await ApiService.request({
    //         method: "post",
    //         url: "/api/orders",
    //         data: data
    //     });
    //     return res
    // },

    getListOrderAdmin: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: data.sort ? {...data.sort,id: 'desc' }: 'id:desc',
            pagination: data.pagination,
            populate: {
                cartitems : {
                    populate : { product : { populate: 'thub'} }
                },
                user: { populate: '*' }
            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/orders?${query}`
        })
        commit('set_data', {
            name: 'list_order_admin',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
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