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
                this.showNotification('success', `Logged in successfully`)
                let path = window.localStorage.getItem('googleback')
                console.log('path',path)
                setTimeout(()=>{                    
                    if(path) {
                        window.localStorage.removeItem('googleback')
                        this.$router.push({ path: `/thanh-toan` })
                    } else {
                        this.$router.push({ path: '/account' })
                    }
                },1000)
                
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