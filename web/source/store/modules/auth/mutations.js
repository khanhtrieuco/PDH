export default {
    set_token: (state, payload) => {
        if (!process.server) {
            if ((window.localStorage && !window.localStorage.hasOwnProperty('token')) || payload.recache) {
                window.localStorage.setItem('token', payload.jwt);
                let options = {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 30 * 100
                };
                // payload.cookie.set('token', payload.jwt, options);
            } else {
                payload.jwt = window.localStorage.getItem('token');
            }
        }
        if (payload.data) {
            state.token = payload.jwt;
        }
    },
    clearSession(state, payload) {
        if (window.localStorage) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('profile');
            if (payload && payload.cookie) {
                let optionsLogout = {
                    path: '/'
                };
                payload.cookie.remove('token', optionsLogout);
                payload.cookie.remove('profile', optionsLogout);
            }
        }
        state.loggedIn = false;
        state.token = null;
        state.profile = {};
    },

    set_profile: (state, payload) => {
        if (!process.server) {
            if ((window.localStorage && !window.localStorage.hasOwnProperty('profile')) || payload.recache) {
                window.localStorage.setItem('profile', JSON.stringify(payload.user));
                if (payload.cookie) {
                    let options = {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 30 * 100
                    };
                    payload.cookie.set('profile', payload.user, options);
                }
            } else {
                payload.user = JSON.parse(window.localStorage.getItem('profile') || '{}');
            }
        }
        if (payload.user) {
            state.loggedIn = true;
            state.profile = payload.user;
        }
    },

    set_login_in: (state, payload) => {
        if (window.localStorage && window.localStorage.hasOwnProperty('profile') && window.localStorage.hasOwnProperty('token')) {
            state.loggedIn = true;
            state.profile = JSON.parse(window.localStorage.getItem('profile') || '{}');
            state.token = window.localStorage.getItem('token');
        }
    },

    set_address: (state, payload) => {
        state.address = payload.address
    },
};