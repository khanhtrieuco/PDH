export default {
    set_list_item(state, payload) {
        state.list_item = payload.list_item;
    },
    set_item(state, payload) {
        state.item = payload.item;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
    set_news(state, payload) {
        state.news = payload.news;
    },
};
