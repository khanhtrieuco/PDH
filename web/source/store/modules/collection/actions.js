import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListHomeCollection: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: data.sort,
            populate: {
                products: { populate: '*' },
                slider_thub: { populate: 'url' },
                slider_thub_mobile: { populate: 'url' }
            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/collections?${query}`
        })
        commit('set_list_home_collection', {
            list_home_collection: res.data.filter(i => i.attributes.state === 'active')
        })
    },

    getListCollection: async ({ commit, rootState }, data = {}) => {
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
            url: `/api/collections?${query}`
        })
        commit('set_list_collection', {
            list_collection: res.data.filter(i => i.attributes.state === 'active')
        })
    },

    getCountCollection: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            url: '/api/collections/count',
            data: data.params ? data.params : {}
        })
        return res
    },

    getCollectionId: async ({ commit, rootState }, data = {}) => {
        let res = await ApiService.request({
            method: 'get',
            // url: rootState.common.api_host + `/collections/${data.id}`,
            url: '/api/collections/${data.id}',
            data: data.params ? data.params : {}
        })
        commit('set_collection', {
            collection: res
        })
    },

    getCollectionBySlug: async ({ commit, rootState }, data) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/collections?populate=*&filters[slug][$eq]=${data}`
        })
        if (res && res.data && res.data.length > 0) {
            commit('set_collection', {
                collection: res?.data[0]
            })
        }
    },

    getListItem: async ({ commit, rootState }, data = {}) => {
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
            url: `/api/collections?${query}`
        })
        commit('set_data', {
            name: 'list_item',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
        return res.data
    },

    createItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: `/api/collections`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    updateItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/collections/${data.id}`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },
    // getListSubCollection: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         url: '/api/subcollections',
    //         data: data.params ? data.params : {}
    //     })
    //     commit('set_list_subcollection', {
    //         list_subcollection: res.data
    //     })
    // }
}