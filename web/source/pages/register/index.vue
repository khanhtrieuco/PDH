<template>
    <div class="page-login-content container">
        <div class="page-login-title">My account</div>
        <div class="page-login-google-btn d-flex justify-content-around align-items-center">
            <img class="page-login-google-image" src="/images/google.png" />
            <div class="page-login-google-text">CONTINUE WITH GOOGLE</div>
        </div>
        <div class="page-login-des">or  </br> CONTINUE WITH YOUR EMAIL  </br> ADDRESS</div>
        <div class="page-login-sub">Sign in with your PHANDANGHOANG email and password or create a profile if you are new.
        </div>
        <b-form-input class="page-input-login" v-model="username" placeholder="Email*"></b-form-input>
        <b-form-input class="page-input-login" v-model="password" type="password" placeholder="Password*"></b-form-input>
        <div class="page-input-btn" @click="onLogin()" >continue</div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    name: 'LoginPage',
    data() {
        return {
            isMobile: false,
            username: null,
            password: null,
        }
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn"
        }),
    },
    mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (this.loggedIn) {
            this.$router.push({ path: '/' })
        }
        this.isMobile = this.checkMobile()
    },
    methods: {
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        ...mapActions({
            loginEmail: "auth/loginEmail"
        }),
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        async onLogin() {
            if (!this.username || !this.password) {
                this.showNotification('warning', `Vui lòng nhập đủ thông tin đăng nhập`)
                return
            }
            let rs = await this.loginEmail({
                identifier: this.username,
                password: this.password
            })
            if (rs) {
                this.showNotification('success', `Đăng nhập thành công`)
                this.$router.push({ path: '/' })
            } else {
                this.showNotification('danger', `Đăng nhập thất bại vui lòng thử lại`)
            }
        },
        async onGoogleLogin() {
            window.location = '/api/connect/google'
        }
    }
}
</script>
<style lang="scss">
.page-login-content {
    margin-top: 100px;
    margin-bottom: 100px;
    width: 490px;
    margin-left: auto;
    margin-right: auto;

    .page-login-title {
        text-align: center;
        color: #000;
        text-align: center;
        font-family: 'Aeroport';
        font-size: 35px;
        text-transform: uppercase;
    }

    .page-login-google-btn {
        width: 100%;
        height: 75px;
        line-height: 75px;
        margin-top: 60px;
        border: 1px solid #000;
        cursor: pointer;

        .page-login-google-image {
            width: 40px;
            margin-left: 20px;
        }

        .page-login-google-text {
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 21px;
            font-weight: 700;
            margin-right: 30px;
        }
    }

    .page-login-des {
        color: #000;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 20px;
        font-weight: 300;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 30px;
    }

    .page-login-sub {
        color: #000;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 16px;
        margin-top: 70px;
    }

    .page-input-login {
        width: 100%;
        height: 60px;
        padding: 11px 16px;
        border: 1px solid #000;
        margin-top: 30px;
        border-radius: 0px;
        font-family: 'Aeroport-light';
        color: #000;
    }

    .page-input-btn {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #FFF;
        border: 1px solid #000;
        background-color: #000;
        font-family: 'Aeroport';
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        margin-top: 30px;
    }
}

@media (max-width: 520px) {
    .page-login-content {
        margin-top: 50px;
        margin-bottom: 0px;
    }

    .page-login-image-content {
        padding: 50px 0px;
        margin-bottom: 10px;
    }

    .page-login-logo-text {
        font-size: 14px;
        width: 292px;
        margin-top: 0px;
    }

    .page-login-title {
        text-align: center;
    }

    .page-login-content-text {
        text-align: center;
        margin-bottom: 8px;
    }

    .page-login-social-text {
        text-align: center;
        margin-top: 8px;
    }

    .page-login-btn {
        width: 100%;
    }

    .page-input-login {
        height: 45px;
    }
}
</style>