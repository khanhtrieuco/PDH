import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
    innovation: {},
    list_innovation : []
})

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
