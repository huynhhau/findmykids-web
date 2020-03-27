import axios from 'axios';
import { userAPI } from "@/store/modules/api";

const state = {
    obj: {
        ID: "",
        UserName: "",
        PassWord: "",
        RePassWord: "",
        Email: "",
        Name: "",
        recaptchaToken: ""
    },
    captchaChecked: false,
    siteKey: "6LfrwNEUAAAAAJHcipukpxMxlsSKrlotSv37V_I1"
}

const getters = {
    isCaptcha(state) {
        return state.captchaChecked;
    }
}

const actions = {
    async add(context) {
        const objAdd = { ...context.state.obj };
        const recaptchaToken = objAdd.recaptchaToken;
        delete (objAdd.recaptchaToken);
        delete (objAdd.RePassWord);
        return await axios.post(userAPI, { ...objAdd }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                recaptchaToken
            }
        });
    }
}

const mutations = {
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
    mutations,
}