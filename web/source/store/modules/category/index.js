import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    category: {},
    list_category : [],
    list_subcategory : []
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
