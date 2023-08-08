import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    product: {},
    list_product : [],
    list_product_view : [],
    list_product_like : [],
    list_tip: [],
    list_product_admin: {
        data: [],
        pagination: {
            page: 1,
            pageSize: 10
        }
    },
    list_product_related: {
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
