<template>
    <b-container class="google-callback d-flex justify-content-center align-items-center">
      <div>Đăng nhập tài khoản google</div>
    </b-container>
  </template>
  <script>
import general from "~/mixins/general"
import { mapGetters, mapActions } from "vuex"
  export default {
    mixins: [general],
    async mounted(){
        if (this.$route.query.access_token) {
            let res = this.callBackGoogle({ access_token: this.$route.query.access_token })
            if(res) {
                this.showNotification('success', `Đăng nhập thành công`)
                this.$router.push({ path: '/' })
            }
        }
    },
    methods: {
        ...mapActions({
            callBackGoogle: "auth/callBackGoogle"
        })
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>