import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListShipping: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            sort: 'order:desc,id:desc',
            populate:'*'
          }, {
            encodeValuesOnly: true, // prettify URL
          });
          let res = await ApiService.request({
              method: 'get',
              url: `/api/shippings?${query}`
          })
        commit('set_list_shipping', {
            list_shipping: res.data
        })
    },

}