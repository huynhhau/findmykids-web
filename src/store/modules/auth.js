import axios from 'axios';
const jwt = require('jwt-decode');
import { authAPI } from "@/store/modules/api";

// OFFLINE "6LfrwNEUAAAAAJHcipukpxMxlsSKrlotSv37V_I1"
// ONLINE "6Lco3dQUAAAAAKaK0-lubZia99rc2AEgE_3_a6As"
const state = {
    obj: {
        UserName: "",
        PassWord: "",
        recaptchaToken: ""
    },
    captchaChecked: false,
    siteKey: "6LfrwNEUAAAAAJHcipukpxMxlsSKrlotSv37V_I1",
    isLogin: localStorage.getItem('user-token'),
    Name: ""
}

const getters = {
    isCaptcha(state) {
        return state.captchaChecked;
    },
    getName(state) {
        if (state.isLogin) {
            return JSON.parse(localStorage.getItem('user-token')).name;
        }
    }
}

const actions = {
    async login(context) {
        const objLogin = { ...context.state.obj };
        const recaptchaToken = objLogin.recaptchaToken;
        delete (objLogin.recaptchaToken);

        const auth = await axios.post(`${authAPI}/login`, { ...objLogin }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                recaptchaToken
            }
        });

        if (auth.data.authenticated) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + auth.data.accessToken;
            localStorage.setItem('user-token', JSON.stringify(auth.data));
            context.commit("updateIsLogin", true);
            context.commit("updateName", auth.data.name);
        }

        return auth.data.authenticated;
    },
    async logout(context) {
        if (state.isLogin) {
            localStorage.removeItem('user-token');
            context.commit("updateIsLogin", false);
        }
    },
    async reNewToken({ state }) {
        if (state.isLogin) {
            const userToken = JSON.parse(localStorage.getItem('user-token').refreshToken);

            if (jwt(userToken.accessToken).exp - 240 <= (Date.now() / 1000).toFixed(0)) {
                const response = await axios.post(`${authAPI}/${userToken.id}/renew-token/${userToken.refreshToken}`);
                if (response.data.authenticated) {
                    userToken.accessToken = response.data.accessToken;
                    localStorage.setItem("user-token", JSON.stringify(userToken));
                    axios.defaults.headers['Authorization'] = 'Bearer ' + userToken.accessToken;
                    
                }
            }
        }
    }
}

const mutations = {
    // updateUser: (state, user) => {
    //     state.user = user;
    // },
    // updateReCaptchaToken: (state, captcha) => {
    //     state.recaptchaToken = captcha;
    // },
    // updateCaptchaChecked: (state, checked) => {
    //     state.captchaChecked = checked;
    // },
    updateName: (state, name) => {
        state.Name = name;
    },
    updateIsLogin: (state, logged) => {
        state.isLogin = logged;
    },
    updateObj(state, field_value) {
        Object.assign(state.obj, {
            [field_value[0]]: field_value[1]
        });
    },
    updateReCaptchaToken: (state, captcha) => {
        state.obj.recaptchaToken = captcha;
    },
    updateCaptchaChecked: (state, checked) => {
        state.captchaChecked = checked;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}