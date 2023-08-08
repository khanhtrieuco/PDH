export default {
    set_list_place(state, payload) {
        state.list_place = payload.list_place;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
};
