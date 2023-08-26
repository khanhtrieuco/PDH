import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    show: {},
    list_show : [],
    list_item : {
        data: [],
        pagination: {
            page: 1,
            pageSize: 10
        }
    },
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
