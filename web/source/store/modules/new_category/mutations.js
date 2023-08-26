export default {
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
    set_list_item(state, payload) {
        state.list_item = payload.list_item;
    },
    set_item(state, payload) {
        state.item = payload.item;
    }
};
