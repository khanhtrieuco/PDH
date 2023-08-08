<template>
    <div v-if="show" class="backgroud-black">
        <div class="login-content">
            <img class="close-btn" src="/images/Dell_light.png" @click="$emit('closeUpdate')" />
            <b-row v-if="!isMobile">
                <b-col cols="7" class="form-content">
                    <div class="login-title">{{ $t('Login_title_1') }}</div>
                    <b-form-input class="input-login" v-model="username" placeholder="Email..."></b-form-input>
                    <b-form-input class="input-login" v-model="password" type="password" v-on:keyup.enter="onLogin()"
                        :placeholder="$t('Login_des_2_2')+'...'"></b-form-input>
                    <div class="d-flex justify-content-between mb-3">
                        <b-form-checkbox v-model="remember" value="accepted" unchecked-value="not_accepted">
                            {{ $t('Login_des_3') }}
                        </b-form-checkbox>
                        <div class="forget-pass">{{ $t('Login_forgot') }}</div>
                    </div>
                    <div class="nas-btn" @click="onLogin()">{{ $t('Login_title_1') }}</div>
                    <div class="login-line">{{ $t('Login_des_5') }}</div>
                    <div class="login-content-text">{{ $t('Login_title_3') }}</div>
                    <div class="login-social-text">{{ $t('Login_des_6') }}</div>
                    <div class="d-flex justify-content-start gap-3">
                        <img class="img-login" src="/images/facebook-btn.png" @click="onFacebookLogin" />
                        <img class="img-login" src="/images/google-btn.png" @click="onGoogleLogin" />
                    </div>
                    <div class="login-social-des">{{ $t('Login_des_7') }}</div>
                </b-col>
                <b-col cols="5" class="form-right-content">
                    <div>{{ $t('Login_des_21') }}</div>
                    <ul>
                        <li>{{ $t('Login_des_22') }}</li>
                        <li>{{ $t('Login_des_23') }}</li>
                        <li>{{ $t('Login_des_24') }}</li>
                        <li>{{ $t('Login_des_25') }}</li>
                    </ul>
                    <div class="nas-btn login-register" @click="goRegister()">{{ $t('Login_register') }}</div>
                </b-col>
            </b-row>
            <b-row v-if="isMobile">
                <b-col cols="12" class="form-content">
                    <div class="login-title">{{ $t('Login_title_1') }}</div>
                    <b-form-input class="input-login" v-model="username" placeholder="Email..."></b-form-input>
                    <b-form-input class="input-login" v-model="password" type="password" v-on:keyup.enter="onLogin()"
                        :placeholder="$t('Login_des_2_2')+'...'"></b-form-input>
                    <div class="d-flex justify-content-between mb-3">
                        <b-form-checkbox v-model="remember" value="accepted" unchecked-value="not_accepted">
                            {{ $t('Login_des_3') }}
                        </b-form-checkbox>
                        <div class="forget-pass">{{ $t('Login_forgot') }}</div>
                    </div>
                    <div class="nas-btn" @click="onLogin()">{{ $t('Login_title_1') }}</div>
                    <div class="login-line">{{ $t('Login_des_5') }}</div>
                    <div class="login-content-text">{{ $t('Login_title_3') }}</div>
                    <div class="login-social-text">{{ $t('Login_des_6') }}</div>
                    <div class="d-flex justify-content-between">
                        <img class="img-login" src="/images/facebook-btn.png" @click="onFacebookLogin" />
                        <img class="img-login" src="/images/google-btn.png" @click="onGoogleLogin" />
                    </div>
                    <div class="login-social-des">{{ $t('Login_des_7') }}</div>
                    <div class="form-right-content">
                        <div>{{ $t('Login_des_21') }}</div>
                        <ul>
                            <li>{{ $t('Login_des_22') }}</li>
                            <li>{{ $t('Login_des_23') }}</li>
                            <li>{{ $t('Login_des_24') }}</li>
                            <li>{{ $t('Login_des_25') }}</li>
                        </ul>
                        <div class="nas-btn login-register" @click="goRegister()">{{ $t('Login_register') }}</div>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        show: {
            type: Boolean,
            default: false
        },
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            username: null,
            password: null,
            remember: 'not_accepted'
        }
    },
    // mounted() {
    //     console.log(this.show)
    // },
    methods: {
        ...mapActions({
            loginEmail: "auth/loginEmail",
            loginWithGoogle: "auth/loginWithGoogle"
        }),
        async onLogin() {
            if (!this.username || !this.password) {
                this.showNotification('warning', `Vui lòng nhập đử thông tin đăng nhập`)
                return
            }
            let rs = await this.loginEmail({
                identifier: this.username,
                password: this.password
            })
            if (rs) {
                this.$emit('closeUpdate')
                this.showNotification('success', `Đăng nhập thành công`)
            } else {
                this.showNotification('danger', `Đăng nhập thất bại vui lòng thử lại`)
            }
        },
        async onGoogleLogin() {
            window.location = '/api/connect/google'
        },
        async onFacebookLogin() {
            window.location = '/api/connect/facebook'
        },
        goRegister() {
            this.$emit('closeUpdate')
            this.$router.push({ path: '/dang-ky' })
        }
    }
}
</script>
<style lang="scss">
.backgroud-black {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #000000b3;
    z-index: 15;
}

.login-content {
    position: relative;
    top: calc(50% - 700px/2);
    margin: auto;
    width: 900px;
    height: 700px;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 74px;
}

.form-content {
    padding-right: 24px !important;
    border-right: 1px solid #B9B9B9;
}

.form-right-content {
    max-width: 280px;
    padding-left: 24px !important;
    font-family: 'inter-light';

    div,
    li {
        font-family: 'inter-light';
        font-weight: 400;
        font-size: 13px;
    }
}

.close-btn {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 52px;
    z-index: 1;
    cursor: pointer;
}

.login-title {
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 24px;
}

.forget-pass {
    font-family: 'inter-light';
    font-weight: 400;
    font-size: 13px;
    text-align: right;
    text-decoration-line: underline;
}

.login-line {
    margin-top: 16px;
    margin-bottom: 8px;
    text-align: center;
}

.login-content-text {
    font-size: 26px;
    margin-bottom: 16px;
}

.login-social-text {
    font-family: 'inter-light';
    font-weight: 400;
    font-size: 13px;
    margin-bottom: 8px;
}

.login-social-des {
    margin-top: 16px;
    font-family: 'inter-light';
    font-weight: 400;
    font-size: 13px;
}

.img-login {
    cursor: pointer;
    width: 130px;
    margin-right: 18px;
}

.input-login {
    height: 40px !important;
    width: 100%;
    border: 1px solid #E8E8E8 !important;
    border-radius: 20px !important;
    font-size: 13px !important;
    line-height: 38px !important;
    margin-bottom: 16px;
    font-family: 'inter-light';
    padding-left: 16px;
}

.login-register {
    position: absolute;
    left: 20px;
    width: calc(100% - 40px);
    color: #fff;
    bottom: 0px;
}

@media (max-width: 520px) {
    .login-content {
        width: 90%;
        padding: 16px;
    }

    .login-title {
        text-align: center;
        font-size: 20px;
    }

    .login-content-text {
        text-align: center;
        font-size: 20px;
    }

    .login-social-text{
        text-align: center;
        font-size: 10px;
    }

    .img-login{
        margin-right: 0;
    }

    .login-social-des{
        font-size: 8px;
    }

    .form-right-content{
        border-top: 1px solid #B9B9B9;
        margin-top: 10px;
        padding-top: 10px;
        max-width: 100%;
        position: relative;
        div,li{
        font-size: 10px;
        }
    }

    .login-register {
        position: absolute;
        bottom: -50px;
        font-size: 13px !important;
        left: 0px;
    }

    .close-btn {
        top: 16px;
        right: 16px;
        width: 32px;
    }
}</style>
  