import { setClient } from '@/service/apiClient'

export default ({ app, store }) => {
  setClient(app.$axios)
}