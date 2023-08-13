import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    item: {},
    list_item : []
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
