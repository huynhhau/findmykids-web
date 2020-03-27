const state = {
    isLoading: false
}

const getters = {}

const actions = {}

const mutations = {
    updateIsLoading(state, _isLoading) {
        state.isLoading = _isLoading;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}