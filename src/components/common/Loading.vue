<template>
    <div>
        <loading :active.sync="this.isLoading" :can-cancel="false" :is-full-page="false" color="red"></loading>
    </div>
</template>

<script>
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

import { mapState } from 'vuex'

export default {
    components: {
        Loading
    },
    computed: {
        ...mapState("loading", {
            isLoading: state =>  state.isLoading
        })
    }
};
</script>

<style lang="scss" scoped>
</style>