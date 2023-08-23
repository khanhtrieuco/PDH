import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    list_place : [],
    list_place_admin:  {
        data: [],
        pagination: {
            page: 1,
            pageSize: 10
        }
    },
    place: {}
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
