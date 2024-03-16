export default {
    set_list_user_cart(state, payload) {
        state.list_user_cart = payload.list_user_cart;
    },
    set_cart(state, payload) {
        state.cart = payload.cart;
    },
    set_update_cart(state, payload) {
        state.update_cart = payload.update_cart;
    },
};
