import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    cart: {},
    list_user_cart: []
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
