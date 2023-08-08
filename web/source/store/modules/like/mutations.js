export default {
    set_data(state, payload) {
        state[payload.name] = payload.data;
    }

};
