import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    createItem: async function ({ commit }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "/api/collection-cates",
            data: data
        });
        if(res && res.data)
            return res.data
        return res
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
            url: `/api/collection-cates?${query}`
        })
        commit('set_data', {
            name: 'list_item',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },
    getListItemSub: async ({ commit, rootState }, data = {}) => {
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
            url: `/api/collection-cates?${query}`
        })
        return res.data
    },
    updateItem: async function ({ commit }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/collection-cates/${data.id}`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },
    deleteItem: async function ({ commit }, data) {
        console.log(data)
        let res = await ApiService.request({
            method: "delete",
            url: `/api/collection-cates/${data.id}`
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },
}