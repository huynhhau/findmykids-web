<template>
    <div>
        <b-breadcrumb
            v-show="breadcrumb_items.length != 0"
            :items="breadcrumb_items"
            style="margin-bottom: 0px;"
        ></b-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadcrumb_items: [
                {
                    text: "Admin",
                    href: "#"
                },
                {
                    text: "Manage",
                    href: "#"
                },
                {
                    text: "Library",
                    active: true
                }
            ]
        };
    },
    watch: {
        // $route(to) {
        //     if (to.meta.breadcrumb) {
        //         this.breadcrumb_items = JSON.parse(
        //             JSON.stringify(to.meta.breadcrumb)
        //         );
        //     }
        // }
    }
};
</script>