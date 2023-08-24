export default {
    set_list_club(state, payload) {
        state.list_club = {
            items: payload.list_club,
            pagination: payload.pagination
        }
    },
    set_club(state, payload) {
        state.club = payload.club;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
};
