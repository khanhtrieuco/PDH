<template>
    <div class="page-reset">
        <div class="page-reset-content">
            <div class="container">
                <div class="page-reset-info">
                    <div class="reset-title">Đặt lại mật khẩu</div>
                    <input class="input-reset-pass" v-model="password" type="password" name="password"
                        placeholder="Nhập mật khẩu"></input>
                    <div class="text-pass mt-4" >- Please enter at least 8 characters</div>
			        <div class="text-pass" >- Please enter at least one number</div>
			        <div class="text-pass" >- Please enter one special character (!+,-./:;<=>?@)</div>
                    <input class="input-reset-pass" v-model="repassword" type="password" name="repassword"
                        placeholder="Nhập lại mật khẩu"></input>
                    <div class="reset-confirm" @click="onResetPass">{{ 'Xác nhận' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    data() {
        return {
            isMobile: false,
            code: null,
            password: null,
            repassword: null,
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
                        text: 'Mật khẩu mới',
                        active: true
                    }
                ]
            }
        },
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn",
        }),
    },
    mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (this.loggedIn) {
            this.$router.push({ path: '/' })
        }
        this.isMobile = this.checkMobile()
        if (this.$route.query && this.$route.query.code) {
            this.code = this.$route.query.code
        }
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
            resetPass: "auth/resetPass"
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
        async onResetPass() {
            if (!this.code || !this.password || !this.repassword) {
                this.showNotification('warning', `Please enter full password information`)
                return
            }
            const re = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,50}$/
            if (!re.test(this.password)) {
                this.showNotification('warning', `Please enter password as requested`)
                return
            }
            if (this.password !== this.repassword) {
                this.showNotification('warning', `The password entered is incorrect. Please re-enter.`)
                return
            }
            let rs = await this.resetPass({
                code: this.code,
                password: this.password,
                passwordConfirmation: this.repassword
            })
            if (rs) {
                this.showNotification('success', `Password updated successfully. Please log in again.`)
                window.location = '/dang-nhap'
            } else {
                this.showNotification('danger', `Password update failed please try again`)
            }
        }
    }
}
</script>
<style lang="scss">
.page-reset-content {
    background-color: #F5F5F5;
    padding-bottom: 150px;
    padding-top: 100px;
    .page-reset-info {
        width: 600px;
        margin: 0 auto;
        .reset-title {
            font-size: 36px;
            text-align: center;
            margin-bottom: 30px;
        	color: #000;
	    	font-family: "Aeroport";
        }
        .text-pass {
	        color: #717171;
	        font-family: "Aeroport-light";
	        font-size: 16px;
	    }
        .input-reset-pass{
        	width: 100%;
		    height: 60px;
		    padding: 11px 16px;
		    border: 1px solid #000;
		    margin-top: 30px;
		    border-radius: 0px;
		    font-family: "Aeroport-light";
		    color: #000;
        }
        .reset-confirm{
        	width: 100%;
		    height: 60px;
		    line-height: 60px;
		    text-align: center;
		    color: #FFF;
		    border: 1px solid #000;
		    background-color: #000;
		    font-family: "Aeroport";
		    font-size: 20px;
		    font-weight: 700;
		    letter-spacing: 2px;
		    text-transform: uppercase;
		    cursor: pointer;
		    margin-top: 30px;
        }
    }
}

@media (max-width: 520px) {

    .page-reset-content {
        margin-top: 0px;
        margin-bottom: 0px;

        .page-reset-info {
            width: 100%;
            margin: auto;

            .reset-title {
                font-size: 28px;
                text-align: center;
                margin-bottom: 30px;
            }
        }
    }

}
</style>