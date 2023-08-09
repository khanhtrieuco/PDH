export default {
    set_list_category(state, payload) {
        state.list_category = payload.list_category;
    },
    set_category(state, payload) {
        state.category = payload.category;
    },
    set_list_subcategory(state, payload) {
        state.list_subcategory = payload.list_subcategory;
    },
};
