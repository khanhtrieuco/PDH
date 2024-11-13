import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    item: {},
    list_news: [],
    list_item: {
        data: [],
        pagination: {
            page: 1,
            pageSize: 10
        }
    },
    news: {}
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
