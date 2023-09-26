export default {
    set_list_collection(state, payload) {
        state.list_collection = payload.list_collection;
    },
    set_list_home_collection(state, payload) {
        state.list_home_collection = payload.list_home_collection;
    },
    set_collection(state, payload) {
        state.collection = payload.collection;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
};
