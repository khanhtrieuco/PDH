import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListUser: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters ?? {},
            sort: 'id:desc',
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/users?${query}`
        })
        commit('set_list_user', {
            list_user: res
        })
    },

    updateUser: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/users/${data.id}`,
            data: data.data
        });
        if (res && res.data) {
            return res.data
        }
        return {}
    },

    getListProvince: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters ?? {},
            pagination: data.pagination,
            sort: 'name:desc'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/provinces?${query}`
        })
        commit('set_data', {
            name: 'list_province',
            data: res.data
        })
    },

    getListDistrict: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters ?? {},
            sort: 'name:desc'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/districts?${query}`
        })
        commit('set_data', {
            name: 'list_district',
            data: res.data
        })
    },

    getListWard: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters ?? {},
            _sort: 'name:desc'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/wards?${query}`
        })
        commit('set_data', {
            name: 'list_ward',
            data: res.data
        })
    },

}