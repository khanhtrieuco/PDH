import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    faq: {},
    list_faq : []
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
