import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListNews: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            pagination: data.pagination,
            sort: 'order:desc,id:asc',
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/news/?${query}`
        })
        commit('set_data', {
            name: 'list_news',
            data: res.data
        })
    },

    getMenuNews: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            pagination: data.pagination,
            sort: 'order:desc,id:asc',
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/news/?${query}`
        })
        return res.data
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
            url: `/api/news?${query}`
        })
        commit('set_data', {
            name: 'list_item',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },

    getNewsBySlug: async ({ commit, rootState }, data) => {
        const query = qs.stringify({
            filters: {
                slug: data
            },
            populate: {
                new_category: '*',
                thub: '*'
            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/news?${query}`
        })
        if (res && res.data && res.data.length > 0) {
            commit('set_news', {
                news: res?.data[0]
            })
        }
    },

    createItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: `/api/news`,
            data: { data: data.data }
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
            url: `/api/news/${data.id}`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    deleteItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "delete",
            url: `/api/news/${data.id}`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

}