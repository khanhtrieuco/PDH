<template>
    <div class="backgroud-black">
        <div class="popup-content">
            <div class="password-content">
                <!-- <img class="password-close" src="/images/close-outline.png" @click="$emit('closeUpdate')" /> -->
                <div class="password-title">Change password</div>
                <div class="input-form-des-text">*required field</div>
                <b-row v-if="!isMobile" class="mt-3">
                    <b-col cols="12">
                        <div class="input-form-des">*Current Password</div>
                        <b-form-input class="input-form-password" v-model="form.currentPassword"
                            type="password"></b-form-input>
                    </b-col>
                    <b-col cols="12">
                        <div class="input-form-des">*New Password</div>
                        <b-form-input class="input-form-password" v-model="form.password" type="password"></b-form-input>
                    </b-col>
                    <b-col cols="12">
                        <div class="input-form-des">*Confirm Password</div>
                        <b-form-input class="input-form-password" v-model="form.passwordConfirmation"
                            type="password"></b-form-input>
                    </b-col>
                </b-row>
                <b-row v-else>
                    <b-col cols="12">
                        <div class="input-form-des">*Current Password</div>
                        <b-form-input class="input-form-password" v-model="form.currentPassword"
                            type="password"></b-form-input>
                    </b-col>
                    <b-col cols="12">
                        <div class="input-form-des">*New Password</div>
                        <b-form-input class="input-form-password" v-model="form.password" type="password"></b-form-input>
                    </b-col>
                    <b-col cols="12" style="margin-bottom: 10px;">
                        <div class="input-form-des">*Confirm Password</div>
                        <b-form-input class="input-form-password" v-model="form.passwordConfirmation"
                            type="password"></b-form-input>
                    </b-col>
                    <b-col cols="12">
                        <div class="input-form-text-sub">Please make sure to use a secure password with</div>
                        <div class="input-form-text-sub">- at least 8 characters</div>
                        <div class="input-form-text-sub">- at least one upper case letter at least one special character (!+,-./:;<=>?@) at least one number</div>
                    </b-col>
                </b-row>
                <div class="up-add-btn" @click="onUpdate()">Cập nhật
                </div>
            </div>
            <div class="back-close-popup" @click="$emit('closeUpdate')">back to my account</div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile"
        }),
    },
    data() {
        return {
            form: {
                currentPassword: null,
                password: null,
                passwordConfirmation: null
            }
        }
    },
    async mounted() {
        this.form = {
            currentPassword: null,
            password: null,
            passwordConfirmation: null
        }
    },
    methods: {
        ...mapActions({
            changePassword: "auth/changePassword"
        }),
        async onUpdate() {
            if (!this.form.currentPassword || !this.form.password || !this.form.passwordConfirmation) {
                this.showNotification('warning', `Vui lòng nhập đủ thông tin`)
                return
            }
            let rs = await this.changePassword(this.form)
            if (rs.user) {
                this.$emit('closeUpdate')
                this.showNotification('success', `Cập nhật thành công`)
                this.form = {
                    currentPassword: null,
                    password: null,
                    passwordConfirmation: null
                }
            } else {
                this.showNotification('danger', rs.error.message)
                this.form = {
                    currentPassword: null,
                    password: null,
                    passwordConfirmation: null
                }
            }
        },
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
    background-color: #FAFAFA;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-content {
        position: relative;
    }

    .back-close-popup {
        font-family: 'Aeroport-light';
        text-align: center;
        font-size: 16px;
        text-decoration-line: underline;
        text-transform: uppercase;
        color: #000;
        cursor: pointer;
        margin-top: 30px;
    }
}

.password-content {
    position: relative;
    margin: auto;
    width: 550px;
    background-color: #ffffff;
    padding: 30px;

    .password-close {
        position: absolute;
        right: 30px;
        top: 30px;
        cursor: pointer;
    }

    .password-title {
        color: #000;
        font-family: 'Aeroport';
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .input-form-des {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
        margin-bottom: 5px;
        margin-top: 20px;
    }

    .input-form-des-text {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
    }

    .input-form-password {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
        border: 1px solid #000;
        border-radius: 0px;
    }

    .up-add-btn {
        width: 100%;
        height: 55px;
        line-height: 53px;
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
        position: relative;
    }

}

@media (max-width: 520px) {
    .password-content {
        position: relative;
        top: calc(50% - 400px/2);
        margin: auto;
        width: 90%;
        height: 400px;
        background-color: #ffffff;
        padding: 30px;

        .password-close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }

        .password-title {
            color: #000;
            font-family: 'Aeroport';
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .input-form-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 13px;
            margin-bottom: 5px;
            margin-top: 15px;
        }

        .input-form-des-text {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 13px;
        }

        .input-form-text-sub{
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 10px;

        }

        .input-form-password {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 13px;
            border: 1px solid #000;
            border-radius: 0px;
        }

        .up-add-btn {
            width: 100%;
            height: 35px;
            line-height: 33px;
            text-align: center;
            color: #FFF;
            border: 1px solid #000;
            background-color: #000;
            font-family: 'Aeroport';
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 20px;
            position: relative;
        }

    }
}
</style>
  