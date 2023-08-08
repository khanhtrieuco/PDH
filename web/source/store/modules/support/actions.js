import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    createItem: async function ({ commit }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "/api/supports",
            data: data
        });
        return res
    },
    getListSupport: async ({ commit, rootState }, data = {}) => {
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
            url: `/api/supports?${query}`
        })
        commit('set_data', {
            name: 'list_support',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },
    updateSupport: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/supports/${data.id}`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },
}