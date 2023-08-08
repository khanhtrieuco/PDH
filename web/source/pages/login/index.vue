<template>
    <div class="page-login-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="page-login-image">
            <b-container class="page-login-image-content">
                <img class="page-login-logo" src="/images/login-logo.png" v-if="!isMobile" />
                <div class="page-login-logo-text">
                    {{ $t('Login_des') }}
                </div>
            </b-container>
        </div>
        <b-container class="d-flex justify-content-between" v-if="!isMobile">
            <div class="page-login-left-content">
                <div class="page-login-title">{{ $t('Login_title_1') }}</div>
                <div class="page-login-des">{{ $t('Login_des_1') }}</div>
                <b-form-input class="page-input-login" v-model="username" placeholder="Email*"></b-form-input>
                <b-form-input class="page-input-login" v-model="password" type="password" v-on:keyup.enter="onLogin()"
                    :placeholder="this.$t('Login_des_2')"></b-form-input>
                <div class="d-flex justify-content-between my-3">
                    <b-form-checkbox v-model="remember" value="accepted" unchecked-value="not_accepted"
                        class="page-login-check">
                        {{ $t('Login_des_3') }}
                    </b-form-checkbox>
                    <div class="forget-pass">{{ $t('Login_des_4') }}</div>
                </div>
                <div class="nas-btn" @click="onLogin()">{{ $t('Login_title_1') }}</div>
                <div class="login-line">{{ $t('Login_des_5') }}</div>
                <div class="page-login-content-text">{{ $t('Login_title_3') }}</div>
                <div class="page-login-social-text">{{ $t('Login_des_6') }}</div>
                <div class="d-flex justify-content-between">
                    <img class="img-login" src="/images/facebook-btn.png" @click="onFacebookLogin" />
                    <img class="img-login" src="/images/google-btn.png" @click="onGoogleLogin" />
                </div>
                <div class="page-login-social-des">{{ $t('Login_des_7') }}</div>
            </div>
            <b-row class="page-login-right-content">
                <div class="page-login-title">{{ $t('Login_title_2') }}</div>
                <div class="page-login-des">{{ $t('Login_des_1') }}</div>
                <b-col cols="12" style="padding-left: 0px;">
                    <b-form-input class="page-input-login" v-model="login_name"
                        :placeholder="this.$t('Login_des_8')"></b-form-input>
                </b-col>
                <b-col cols="6" style="padding-left: 0px;">
                    <b-form-input class="page-input-login" v-model="login_email" placeholder="Email*"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <b-form-input class="page-input-login" v-model="re_email"
                        :placeholder="this.$t('Login_des_9')"></b-form-input>
                </b-col>
                <b-col cols="6" style="padding-left: 0px;">
                    <b-form-input class="page-input-login" v-model="login_password" type="password"
                        :placeholder="this.$t('Login_des_2')"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <b-form-input class="page-input-login" v-model="re_password" type="password"
                        :placeholder="this.$t('Login_des_10')"></b-form-input>
                </b-col>
                <b-col cols="6" style="padding-left: 0px;">
                    <b-form-input class="page-input-login" v-model="login_phone"
                        :placeholder="this.$t('Login_des_11')"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <!-- <b-form-input class="page-input-login" v-model="login_gender"
                        :placeholder="this.$t('Login_des_12')"></b-form-input> -->
                    <b-form-select v-if="$i18n.locale === 'vn'" class="page-input-login" v-model="login_gender">
                        <b-form-select-option :value="null">{{ $t('Login_des_12') }}</b-form-select-option>
                        <b-form-select-option value="male">Nam</b-form-select-option>
                        <b-form-select-option value="female">Nữ</b-form-select-option>
                        <b-form-select-option value="orther">Khác</b-form-select-option>
                    </b-form-select>
                    <b-form-select v-else class="page-input-login" v-model="login_gender">
                        <b-form-select-option :value="null">{{ $t('Login_des_12') }}</b-form-select-option>
                        <b-form-select-option value="male">Male</b-form-select-option>
                        <b-form-select-option value="female">Female</b-form-select-option>
                        <b-form-select-option value="orther">Order</b-form-select-option>
                    </b-form-select>
                </b-col>
                <div class="page-login-right-text">
                    {{ $t('Login_des_13') }}</br>
                    --</br>
                    {{ $t('Login_des_14') }}</br>
                    --</br>
                </div>
                <b-form-checkbox v-model="check1" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_15') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check2" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_16') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check3" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_17') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check4" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_18') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check5" value="accepted" unchecked-value="not_accepted" @change="checkAll($event)"
                    class="page-login-check">
                    {{ $t('Login_des_19') }}
                </b-form-checkbox>
                <div style="width: 100%;">
                    <div class="nas-btn page-login-btn" @click="onRegister()">
                        {{ $t('Login_des_20') }}
                    </div>
                </div>
            </b-row>
        </b-container>
        <b-container v-if="isMobile">
            <div class="page-login-title">{{ $t('Login_title_1') }}</div>
            <div class="page-login-des">{{ $t('Login_des_1') }}</div>
            <b-form-input class="page-input-login" v-model="username" placeholder="Email*"></b-form-input>
            <b-form-input class="page-input-login" v-model="password" type="password" v-on:keyup.enter="onLogin()"
                :placeholder="this.$t('Login_des_2')"></b-form-input>
            <div class="d-flex justify-content-between my-3">
                <b-form-checkbox v-model="remember" value="accepted" unchecked-value="not_accepted"
                    class="page-login-check">
                    {{ $t('Login_des_3') }}
                </b-form-checkbox>
                <div class="forget-pass">{{ $t('Login_des_4') }}</div>
            </div>
            <div class="nas-btn" @click="onLogin()">{{ $t('Login_title_1') }}</div>
            <div class="login-line">{{ $t('Login_des_5') }}</div>
            <div class="page-login-content-text">{{ $t('Login_title_3') }}</div>
            <div class="page-login-social-text">{{ $t('Login_des_6') }}</div>
            <div class="d-flex justify-content-between">
                <img class="img-login" src="/images/facebook-btn.png" @click="onFacebookLogin" />
                <img class="img-login" src="/images/google-btn.png" @click="onGoogleLogin" />
            </div>
            <div class="page-login-social-des">{{ $t('Login_des_7') }}</div>
        </b-container>
        <div v-if="isMobile" style="margin-top: 40px;padding: 40px 0px;background-color: #E8E8E8;">
            <b-container>
                <div class="page-login-title">{{ $t('Login_title_2') }}</div>
                <div class="page-login-des">{{ $t('Login_des_1') }}</div>
                <b-col cols="12" style="padding: 0px;">
                    <b-form-input class="page-input-login" v-model="login_name"
                        :placeholder="this.$t('Login_des_8')"></b-form-input>
                </b-col>
                <b-col cols="12" style="padding: 0px;">
                    <b-form-input class="page-input-login" v-model="login_email" placeholder="Email*"></b-form-input>
                </b-col>
                <b-col cols="12" style="padding: 0px;">
                    <b-form-input class="page-input-login" v-model="re_email"
                        :placeholder="this.$t('Login_des_9')"></b-form-input>
                </b-col>
                <b-col cols="12" style="padding: 0px;">
                    <b-form-input class="page-input-login" v-model="login_password" type="password"
                        :placeholder="this.$t('Login_des_2')"></b-form-input>
                </b-col>
                <b-col cols="12" style="padding: 0px;">
                    <b-form-input class="page-input-login" v-model="re_password" type="password"
                        :placeholder="this.$t('Login_des_10')"></b-form-input>
                </b-col>
                <b-col cols="12" style="padding: 0px;">
                    <b-form-input class="page-input-login" v-model="login_phone"
                        :placeholder="this.$t('Login_des_11')"></b-form-input>
                </b-col>
                <b-col cols="12" style="padding: 0px;">
                    <!-- <b-form-input class="page-input-login" v-model="login_gender"
                        :placeholder="this.$t('Login_des_12')"></b-form-input> -->
                    <b-form-select class="page-input-login" v-model="login_gender">
                        <b-form-select-option :value="null">{{ $t('Login_des_12') }}</b-form-select-option>
                        <b-form-select-option value="male">Nam</b-form-select-option>
                        <b-form-select-option value="female">Nữ</b-form-select-option>
                        <b-form-select-option value="orther">Khác</b-form-select-option>
                    </b-form-select>
                </b-col>
                <div class="page-login-right-text">
                    {{ $t('Login_des_13') }}</br>
                    --</br>
                    {{ $t('Login_des_14') }}</br>
                    --</br>
                </div>
                <b-form-checkbox v-model="check1" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_15') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check2" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_16') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check3" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_17') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check4" value="accepted" unchecked-value="not_accepted" class="page-login-check">
                    {{ $t('Login_des_18') }}
                </b-form-checkbox>
                <b-form-checkbox v-model="check5" value="accepted" unchecked-value="not_accepted" @change="checkAll($event)"
                    class="page-login-check">
                    {{ $t('Login_des_19') }}
                </b-form-checkbox>
                <div style="width: 100%;">
                    <div class="nas-btn page-login-btn" @click="onRegister()">
                        {{ $t('Login_des_20') }}
                    </div>
                </div>
            </b-container>
        </div>
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
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$t('Login'),
                    active: true
                }
            ],
            isMobile: false,
            username: null,
            password: null,
            remember: false,
            login_name: null,
            login_email: null,
            login_password: null,
            re_password: null,
            re_email: null,
            login_phone: null,
            login_gender: null,
            check1: null,
            check2: null,
            check3: null,
            check4: null,
            check5: null,
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('Login'),
                        active: true
                    }
                ]
            }
        },
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
            registerByEmail: "auth/registerByEmail",
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
        checkAll(e) {
            this.check1 = e
            this.check2 = e
            this.check3 = e
            this.check4 = e
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
        async onRegister() {
            if (!this.login_email || !this.login_password || !this.login_name || !this.login_phone) {
                this.showNotification('warning', `Vui lòng nhập đủ thông tin đăng ký`)
                return
            }
            if (this.login_password !== this.re_password) {
                this.showNotification('warning', `Mật khẩu nhập lại không đúng`)
                return
            }
            if (this.login_email !== this.re_email) {
                this.showNotification('warning', `Email nhập lại không đúng`)
                return
            }
            if (this.check1 !== 'accepted' || this.check2 !== 'accepted' || this.check3 !== 'accepted' || this.check4 !== 'accepted') {
                this.showNotification('warning', `Vui lòng xác nhận điều kiện đăng ký của chúng tôi`)
                return
            }
            let rs = await this.registerByEmail({
                username: this.login_name,
                email: this.login_email,
                password: this.login_password,
                phone: this.login_phone
            })
            if (rs) {
                this.showNotification('success', `Đăng ký thành công`)
                this.$router.push({ path: '/' })
            } else {
                this.showNotification('danger', `Đăng ký thất bại vui lòng thử lại`)
            }
        },
        async onGoogleLogin() {
            window.location = '/api/connect/google'
        },
        async onFacebookLogin() {
            window.location = '/api/connect/facebook'
        },
    }
}
</script>
<style lang="scss">
.page-login-content {
    margin-top: 180px;
    margin-bottom: 100px;
}

.page-login-image {
    background-image: url('/images/login.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 40px;
}

.page-login-image-content {
    padding: 160px 0px;
}

.page-login-logo-text {
    color: #FFF;
    font-size: 30px;
    font-weight: 300;
    // text-transform: uppercase;
    margin-top: 60px;
    width: 580px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.page-login-left-content {
    width: 330px;
}

.page-login-right-content {
    width: calc(100% - 530px);
}

.page-login-title {
    color: #2F3036;
    font-size: 26px;
    width: 100%;
}

.page-login-des {
    color: #AFAFAF;
    font-size: 13px;
    font-family: 'inter';
    margin-top: 16px;
    margin-bottom: 16px;
}

.page-input-login {
    height: 60px;
    border-radius: 20px;
    border: 0.75px solid #515151;
    background: #FDFDFD;
    font-size: 13px;
    font-family: 'inter';
    color: #68666C;
    margin-top: 8px;
}

.page-login-check {
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter-light';
    margin-bottom: 16px;
}

.page-login-content-text {
    color: #515151;
    font-size: 26px;
    margin-bottom: 24px;
}

.page-login-social-text {
    font-size: 13px;
    font-family: 'inter-light';
    margin-top: 24px;
    margin-bottom: 16px;
    color: #818181;
}

.page-login-social-des {
    color: #777777;
    font-size: 11px;
    font-family: 'inter-light';
    margin-top: 16px;
}

.page-login-right-text {
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter-light';
    margin-top: 28px;
    margin-bottom: 24px;
}

.page-login-btn {
    width: 220px;
    margin-top: 20px;
}

.login-line {
    position: relative;

    &:before {
        content: "";
        display: block;
        width: calc(50% - 30px);
        height: 1px;
        background: #777;
        left: 0;
        top: 50%;
        position: absolute;
    }

    &:after {
        content: "";
        display: block;
        width: calc(50% - 30px);
        height: 1px;
        background: #777;
        right: 0;
        top: 50%;
        position: absolute;
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