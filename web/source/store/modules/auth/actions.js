import qs from 'qs';
import ApiService from '@/service/api.service'
export default {

    loginEmail: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "api/auth/local",
            data: data
        });
        if (res && res.user) {
            await commit('set_token', {
                jwt: res.jwt,
                cookie: this.$cookies,
                recache: true
            });
            await commit('set_profile', {
                user: res.user,
                cookie: this.$cookies,
                recache: true
            });
            commit('set_login_in');
            return true
        }
        return false
    },

    logout: async function ({
        commit
    }, data) {
        await commit('clearSession');
    },

    changePassword: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "api/auth/change-password",
            data: data
        });
        if (res && res.user) {
            await commit('set_token', {
                jwt: res.jwt,
                cookie: this.$cookies,
                recache: true
            });
            await commit('set_profile', {
                user: res.user,
                cookie: this.$cookies,
                recache: true
            });
            commit('set_login_in');
        }
        return res
    },

    updateProfile: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/users/${data.id}`,
            data: data.data
        });
        if (res) {
            await commit('set_profile', {
                user: res,
                cookie: this.$cookies,
                recache: true
            });
            return res
        }
        return {}
    },

    callBackGoogle: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "get",
            url: "/api/auth/google/callback?access_token=" + data.access_token
        });
        if (res && res.user) {
            await commit('set_token', {
                jwt: res.jwt,
                cookie: this.$cookies,
                recache: true
            });
            await commit('set_profile', {
                user: res.user,
                cookie: this.$cookies,
                recache: true
            });
            commit('set_login_in');
            return true
        }
        return false
    },

    callBackFacebook: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "get",
            url: "/api/auth/facebook/callback?access_token=" + data.access_token
        });
        if (res && res.user) {
            await commit('set_token', {
                jwt: res.jwt,
                cookie: this.$cookies,
                recache: true
            });
            await commit('set_profile', {
                user: res.user,
                cookie: this.$cookies,
                recache: true
            });
            commit('set_login_in');
            return true
        }
        return false
    },

    registerByEmail: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "/api/auth/local/register",
            data: data
        });
        if (res && res.user) {
            await commit('set_token', {
                jwt: res.jwt,
                cookie: this.$cookies,
                recache: true
            });
            await commit('set_profile', {
                user: res.user,
                cookie: this.$cookies,
                recache: true
            });
            commit('set_login_in');
            return true
        }
        return false
    },

    setLoggedIn: async function ({ commit }, data) {
        commit('set_login_in');
    },

    showAuth: async function ({
        commit
    }, data) {
        commit('set_show_auth', {
            showAuth: Math.floor(Math.random() * 1000)
        })
    },

    hideAuth: async function ({
        commit
    }, data) {
        commit('set_show_auth', {
            showAuth: Math.floor(Math.random() * 1000) * -1
        })
    },

    getAddressByUser: async ({ commit, rootState }, data) => {
        const query = qs.stringify({
            filters: {
                user_id: { $eq: data }
            },
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/addresses?${query}`
        })
        if (res && res.data && res.data.length > 0) {
            commit('set_address', {
                address: res?.data[0]
            })
        }
    },

    me: async ({ commit, rootState }, data) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/users/me?populate=*`
        })
        if (res) {
            return res
        }
        return null
    },

    addNewAddress: async ({ commit, rootState }, data) => {
        let res = await ApiService.request({
            method: "post",
            url: "/api/addresses",
            data: data
        });
        if (res && res.data && res.data.length > 0) {
            commit('set_address', {
                address: data.data
            })
        }
        return res
    },

    updateAddress: async ({ commit, rootState }, data) => {
        let res = await ApiService.request({
            method: "put",
            url: "/api/addresses/" + data.id,
            data: { data: data.data }
        });
        if (res && res.data && res.data.length > 0) {
            commit('set_address', {
                address: data.data
            })
        }
        return res
    },

}