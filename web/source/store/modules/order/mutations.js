export default {
    set_list_order(state, payload) {
        state.list_order = payload.list_order;
    },
    set_order(state, payload) {
        state.order = payload.order;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
};
