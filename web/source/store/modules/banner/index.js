import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    banner: {},
    banner_top: {},
    list_banner : [],
    list_banner_about : [],
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
