import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
    siteinfo : {},
    nasinfo : {},
    bannerinfo : {},
    statistic: {},
    chartMoney: [],
    chartOrder: [],
    chartUser: [],
})

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
