import actions from './actions';
import getters from './getters';
import mutations from './mutations.js';

export const state = () => ({
    token: null,
    profile: {},
    loggedIn: false,
    address: {}
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
