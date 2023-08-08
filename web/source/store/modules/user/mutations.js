export default {
    set_list_user(state, payload) {
        state.list_user = payload.list_user;
    },
    set_user(state, payload) {
        state.user = payload.user;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
};
