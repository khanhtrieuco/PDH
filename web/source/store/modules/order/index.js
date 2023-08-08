import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    order: {},
    list_order : [],
    list_order_admin : {
        data: [],
        pagination: {
            page: 1,
            pageSize: 10
        }
    }
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
