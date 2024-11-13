<template>
    <div class="login">
        <a-form :form="form">
            <a-tabs size="large" :tabBarStyle="{ textAlign: 'center' }" style="padding: 0 2px;">
                <a-tab-pane tab="Thông tin đăng nhập" key="1">
                    <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon
                        style="margin-bottom: 24px;" />
                    <a-form-item>
                        <a-input autocomplete="autocomplete" size="large" placeholder="admin"
                            v-decorator="['name', { rules: [{ required: true, message: 'Nhập tên đăng nhập hoặc email', whitespace: true }] }]">
                            <a-icon slot="prefix" type="user" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large" placeholder="888888" autocomplete="autocomplete" type="password"
                            v-decorator="['password', { rules: [{ required: true, message: 'Nhập Password', whitespace: true }] }]">
                            <a-icon slot="prefix" type="lock" />
                        </a-input>
                    </a-form-item>
                </a-tab-pane>
            </a-tabs>
            <div>
                <a-checkbox :checked="true">Ghi nhớ</a-checkbox>
                <a style="float: right">Quên mật khẩu</a>
            </div>
            <a-form-item>
                <a-button :loading="logging" style="width: 100%;margin-top: 24px" @click="onLogin" size="large"
                    htmlType="submit" type="primary">Đăng nhập</a-button>
            </a-form-item>
        </a-form>
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
            logging: false,
            error: '',
            form: this.$form.createForm(this)
        }
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn"
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (this.loggedIn) {
            let rs = await this.getMyInfo()
            if (rs && rs.role && rs.role.type === 'admin') {
                this.$router.push({ path: '/crm-admin' })
            } else {
                this.$router.push({ path: '/' })
            }
        }
    },
    methods: {
        ...mapActions({
            loginEmail: "auth/loginEmail",
            getMyInfo: "auth/me"
        }),
        async onLogin() {
            const name = this.form.getFieldValue('name')
            const password = this.form.getFieldValue('password')
            if (!name || !password) {
                this.showNotification('warning', `Please enter complete login information`)
                return
            }
            let rs = await this.loginEmail({
                identifier: name,
                password: password
            })
            if (rs) {
                this.showNotification('success', `Logged in successfully`)
                location.reload()
            } else {
                this.showNotification('danger', `Login failed, please try again`)
            }
        }
    }
}
</script>
<style lang="scss">
.login {
    width: 600px;
    margin: 300px auto;
    border: 1px solid #d0d0d0;
    border-radius: 20px;
    padding: 30px;
}
</style>