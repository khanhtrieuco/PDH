<template>
    <div class="page-login-content container">
        <div class="page-login-title">My account</div>
        <div class="page-login-google-btn d-flex justify-content-around align-items-center" @click="onGoogleLogin()">
            <img class="page-login-google-image" src="/images/google.png" />
            <div class="page-login-google-text">CONTINUE WITH GOOGLE</div>
        </div>
        <div class="page-login-des">or </br> CONTINUE WITH YOUR EMAIL </br> ADDRESS</div>
        <div class="page-login-sub">Sign in with your PHANDANGHOANG email and password or create a profile if you are new.
        </div>
        <b-input-group>
            <template #append>
                <img class="input-icon" src="/images/Edit_light.svg" v-if="onlogin" />
            </template>
            <b-form-input class="page-input-login" v-model="email" placeholder="Email*"></b-form-input>
        </b-input-group>
        <b-input-group v-if="hadaccount">
            <template #append>
                <img class="input-icon" src="/images/View_fill.svg" @click="onSwitchType" />
            </template>
            <b-form-input class="page-input-login" v-model="password" :type="typeshow"
                placeholder="Password*"></b-form-input>
        </b-input-group>
        <b-input-group v-if="onlogin">
            <template #append>
                <img class="input-icon" src="/images/View_fill.svg" @click="onSwitchType" />
            </template>
            <b-form-input class="page-input-login" v-model="newpassword" :type="typeshow"
            placeholder="Create Password*"></b-form-input>
        </b-input-group>

        
        <div class="text-pass-first" v-if="onlogin">- Please enter at least 8 characters</div>
        <div class="text-pass" v-if="onlogin">- Please enter at least one number</div>
        <div class="text-pass" v-if="onlogin">- Please enter one special character (!+,-./:;<=>?@)</div>
        <div class="page-input-btn" v-if="!hadaccount && !onlogin" @click="onCheck()">continue</div>
        <div class="page-input-btn" v-if="hadaccount" @click="onLogin()">continue</div>
        <b-form-input class="page-input-login" v-if="onlogin" v-model="username" placeholder="User Name*"></b-form-input>
        <div class="text-pass-sub" v-if="onlogin">By choosing "Create my profile", you confirm that
            you agree to our <u>Terms of Use</u>, that you have acknowledged
            our privacy policy, and that you want to create your PHANDANGHOANG profile.</div>
        <div class="text-pass-sub" v-if="onlogin">By creating your PHANDANGHOANG profile, you confirm that you have reached
            the age of
            consent in your country of residence (or, if you are under the age of consent, that your parent or legal
            guardian also agrees to such
            registration).</div>
        <div class="page-input-btn" v-if="onlogin" @click="onRegister()">continue</div>
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
            email: null,
            username: null,
            password: null,
            newpassword: null,
            hadaccount: false,
            onlogin: false,
            typeshow:'password'
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
            loginEmail: "auth/loginEmail",
            registerByEmail: "auth/registerByEmail",
            checkEmail: "auth/checkEmail"
        }),
        onSwitchType() {
            if(this.typeshow === 'password') {
                this.typeshow = 'text'
            } else {
                this.typeshow = 'password'
            }
        },
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        async onCheck() {
            if (!this.email) {
                this.showNotification('warning', `Please enter complete login information`)
                return
            }
            let rs = await this.checkEmail({ email: this.email })
            console.log(rs)
            if (rs) {
                this.hadaccount = true
            } else {
                this.hadaccount = false
                this.onlogin = true
            }
        },
        async onLogin() {
            if (!this.email || !this.password) {
                this.showNotification('warning', `Please enter complete login information`)
                return
            }
            let rs = await this.loginEmail({
                identifier: this.email,
                password: this.password
            })
            if (rs) {
                this.showNotification('success', `Logged in successfully`)
                this.$router.push({ path: '/' })
            } else {
                this.showNotification('danger', `Login failed, please try again`)
            }
        },
        async onRegister() {
            if (!this.email || !this.newpassword || !this.username) {
                this.showNotification('warning', `Please enter complete login information`)
                return
            }
            const re = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,50}$/
            if (!re.test(this.newpassword)) {
                this.showNotification('warning', `Please enter password as requested`)
                return
            }
            let rs = await this.registerByEmail({
                username: this.username,
                email: this.email,
                password: this.newpassword,
            })
            if (rs) {
                this.showNotification('success', `Account successfully created`)
                this.$router.push({ path: '/' })
            } else {
                this.showNotification('danger', `Login failed, please try again`)
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

    .input-icon {
        position: absolute;
        top: 45px;
        right: 15px;
        cursor: pointer;
        z-index: 10;
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

    .text-pass {
        color: #717171;
        font-family: "Aeroport-light";
        font-size: 16px;
    }

    .text-pass-first {
        margin-top: 20px;
        color: #717171;
        font-family: "Aeroport-light";
        font-size: 16px;
    }

    .text-pass-sub {
        color: #000;
        font-family: "Aeroport-light";
        font-size: 16px;
        margin-top: 20px;
    }

}

@media (max-width: 520px) {
    .page-login-content {
        margin-top: 50px;
        margin-bottom: 50px;

        .page-login-google-btn {
            width: 100%;
            height: 65px;
            line-height: 65px;
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
                font-size: 14px;
                font-weight: 700;
                margin-right: 30px;
            }
        }

        .page-login-des {
            color: #000;
            text-align: center;
            font-family: 'Aeroport-light';
            font-size: 14px;
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
            margin-top: 30px;
        }
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