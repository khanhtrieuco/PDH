import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    user: {},
    list_user : [],
    list_province : [],
    list_district : [],
    list_ward : [],
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
