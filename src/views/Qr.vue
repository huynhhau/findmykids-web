<template>
    <div>
        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
    export default {
        data() {
    return {
        value: 'http://findmykids.co.uk/',
        size: 150,
    }
    },
    components: {
        QrcodeVue,
    },
    }
</script>

<style lang="scss" scoped>

</style>