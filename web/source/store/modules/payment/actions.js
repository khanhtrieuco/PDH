import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListPayment: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            sort: 'order:desc,id:desc',
            populate:'*'
          }, {
            encodeValuesOnly: true, // prettify URL
          });
          let res = await ApiService.request({
              method: 'get',
              url: `/api/payments?${query}`
          })
        commit('set_list_payment', {
            list_payment: res.data.filter(i => i.attributes.state === 'active')
        })
    },

}