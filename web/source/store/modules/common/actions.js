import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getSiteInfo: async ({ commit, rootState }) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/siteinfo`
        })
        commit('set_siteinfo', {
            siteinfo: res.data?.attributes
        })
    },
    getNasInfo: async ({ commit, rootState }) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/nasinfo`
        })
        commit('set_nasinfo', {
            nasinfo: res.data?.attributes
        })
    },
    getBannerInfo: async ({ commit, rootState }) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/bannerinfo?populate=*`
        })
        commit('set_bannerinfo', {
            bannerinfo: res.data?.attributes
        })
    },
    getStatistic: async ({ commit, rootState },data) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/app/statistic?${data.query}`
        })
        commit('set_statistic', {
            statistic: res
        })
    },
    getChartMoney: async ({ commit, rootState }) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/app/chartmoney`
        })
        commit('set_chart_money', {
            chartMoney: res.data
        })
    },
    getChartOrder: async ({ commit, rootState }) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/app/chartorder`
        })
        commit('set_chart_order', {
            chartOrder: res.data
        })
    },
    getChartUser: async ({ commit, rootState }) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/app/chartuser`
        })
        commit('set_chart_user', {
            chartUser: res.data
        })
    },
    getbyUrlOrigin: async ({ commit, state }, data) => {
        let res = await ApiService.request({
            method: 'get',
            service: 'origin',
            url: data.url,
            data: data.params ? data.params : {}
        })
        return res
    },

    getbyUrl: async ({ commit, state }, data) =>  {
        let res = await ApiService.request({
            method: 'get',
            service: data.service ? data.service : 'review',
            header: data.header ? data.header : {},
            url: data.url,
            data: data.params ? data.params : {}
        })
        return res
    },

    postbyUrl: async ({ commit, state }, data) => {
        let res = await ApiService.request({
            method: 'post',
            timeout: 300000,
            url: data.url,
            data: data.params ? data.params : {},
            file: data.file ? data.file : null,
            files: data.files ? data.files : null,
        })
        return res
    },

    putbyUrl: async ({ commit, state }, data) => {
        let res = await ApiService.request({
            method: 'put',
            url: data.url,
            data: data.params
        })
        return res
    },

    deletebyUrl: async ({ commit, state }, data) => {
        let res = await ApiService.request({
            method: 'delete',
            url: data.url
        })
        return res
    }

}