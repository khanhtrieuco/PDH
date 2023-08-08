export default {
    set_list_product(state, payload) {
        state.list_product = payload.list_product;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
    set_product(state, payload) {
        state.product = payload.product;
    },
    set_product_view(state, payload) {
        let list = state.list_product_view
        let _c = state.list_product_view.find(o=> o.id === payload.product.id)
        if(!_c) {
            state.list_product_view.push(payload.product);
        }
    },
};
