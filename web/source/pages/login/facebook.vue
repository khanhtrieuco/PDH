<template>
    <b-container class="google-callback d-flex justify-content-center align-items-center">
      <div>Đăng nhập tài khoản facebook</div>
    </b-container>
  </template>
  <script>
import general from "~/mixins/general"
import { mapGetters, mapActions } from "vuex"
  export default {
    mixins: [general],
    async mounted(){
        if (this.$route.query.access_token) {
            let res = this.callBackFacebook({ access_token: this.$route.query.access_token })
            if(res) {
                this.showNotification('success', `Logged in successfully`)
                this.$router.push({ path: '/account' })
            }
        }
    },
    methods: {
        ...mapActions({
            callBackFacebook: "auth/callBackFacebook"
        })
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>