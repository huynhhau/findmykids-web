import axios from 'axios';
import { membersManagerAPI } from "@/store/modules/api";

const state = {
    fields: [
        { key: "userName", label: "Tên đăng nhập", sortable: true },
        { key: "name", label: "Họ tên", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "date", label: "Ngày lập", sortable: true },
        { key: "state", label: "Trạng thái", sortable: true },
        { key: "plans", label: "Chi tiết", sortable: true },
    ],
    items: [],
    selectedvariant: "warning",
    hasData: true,
    totalRows: 1,
    perPage: 10,
    service: {
        UserName: "",
        FullName: "",
        Email: "",
        Page: 1
    },
}

const actions = {
    async getListServiceRegister(context) {
        const results = await axios.get(membersManagerAPI);
        console.log("getListServiceRegister -> results", results.data)
        context.commit("updateItems", results.data);
    },

    async filterService(context, service, perPage) {
        await axios.post(membersManagerAPI, ...service, perPage)
    }
}

const mutations = {
    updateService(state, field_value) {
        Object.assign(state.service, {
            [field_value[0]]: field_value[1]
        });
    },
    updateItems(state, items) {
        state.items = items;
        state.totalRows = items.length;
    },
    updateCurrentPage(state, value) {
        state.currentPage = value;
    }
    // updateItems(state, items) {
    //     state.items = items;
    //     state.totalRows = items.length;
    //     state.hasData = items.length != 0;
    // },
}

export default {
    namespaced: true,
    state,
    //getters,
    actions,
    mutations,

}