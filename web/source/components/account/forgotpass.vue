<template>
    <div v-if="show" class="backgroud-black" @click="$emit('closeUpdate')">
        <div class="reset-content" @click.stop="">
            <div class="reset-title">Reset Password</div>
            <input v-if="!sendmail" class="input-email" v-model="email"
                placeholder="Please enter your registration email"></input>
            <div v-if="sendmail" class="reset-text">The resetpass code has been sent to your email. Please check your email or spam folder.
            </div>
            <div v-if="!sendmail" class="login-social-des" @click="getCodeReset">confirm</div>
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
            email: null,
            sendmail: true
        }
    },
    watch: {
        'show': function (val) {
            this.sendmail = false
        },
    },
    mounted() {
        this.sendmail = false
    },
    methods: {
        ...mapActions({
            getForgotPass: "auth/getForgotPass",
        }),
        async getCodeReset() {
            if (!this.email) {
                this.showNotification('warning', `Vui lòng nhập email đăng ký`)
                return
            }
            let rs = await this.getForgotPass({
                email: this.email
            })
            if (rs) {
                this.showNotification('success', `Đã gởi yêu cầu reset password`)
                this.sendmail = true
            } else {
                this.showNotification('danger', `Yêu cầu reset password vui lòng thử lại`)
            }
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

.reset-content {
    position: relative;
    margin: auto;
    width: 600px;
    height: auto;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 40px;
    .input-email{
    	width: 100%;
	    height: 60px;
	    padding: 11px 16px;
	    border: 1px solid #000;
	    margin-top: 30px;
	    border-radius: 0px;
	    font-family: "Aeroport-light";
	    color: #000;
    }
    .login-social-des{
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
    .reset-title {
        font-size: 36px;
        text-align: center;
        margin-bottom: 20px;
        color: #000;
        font-family: 'Aeroport';
    }

    .reset-text{
        width: 70%;
        text-align: center;
        margin-top: 60px;
        margin-left: auto;
        font-family: 'Aeroport-light';
        font-size: 20px;
        margin-right: auto;
    }

    .login-social-des {
        margin-top: 20px;
    }
}

@media (max-width: 520px) {
    .reset-content {
        position: relative;
        margin: auto;
        width: 95%;
        background-color: #ffffff;
        border-radius: 20px;
        padding: 1rem 1rem 2rem 1rem;
        .input-email{
		    height: 50px;
		    margin-top: 20px;
	    }
	    .login-social-des{
		    height: 50px;
		    line-height: 50px;
		    margin-top: 20px;
	    }
        .reset-title {
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
        }
        .reset-text{
	        margin-top: 24px;
	        font-size: 14px;
	    }
        .login-social-des {
            margin-top: 20px;
        }
    }
}</style>
  