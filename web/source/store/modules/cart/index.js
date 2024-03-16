import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    cart: {},
    list_user_cart: [],
    update_cart: null
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
