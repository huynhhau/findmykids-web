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
    perPage: 15,
    service: {
        UserName: "",
        FullName: "",
        Email: "",
        Page: 1,
        DateCreateFrom: null,
        DateCreateTo: null
    },
}

const actions = {
    async getListServiceRegister(context, page) {
        const results = await axios.post(`${membersManagerAPI}?page=${page}`, { ...context.state.service });
        
        console.log("getListServiceRegister -> results", results.data);
        context.commit("updateItems", results.data);
    },
    async filterService(context, service, perPage) {
        await axios.post(membersManagerAPI, ...service, perPage)
    },
    async updateState(context, id) {
        return await axios.post(`${membersManagerAPI}/updatestate/${id}`)
    }
}

const mutations = {
    updateService(state, field_value) {
        Object.assign(state.service, {
            [field_value[0]]: field_value[1]
        });
    },
    updateItems(state, items) {
        state.items = items.memberInfos;
        state.totalRows = items.total;
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
    mutations
}