<template>
    <b-form>
        <b-container class="mt-5" style="min-height: 800px">
            <b-row>
                <b-col lg="6" class="mt-5" />
                <b-col>
                    <h2>Payment</h2>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="5" />
                <b-col lg="3">
                    <label>A license for 1 device</label>
                </b-col>
                <b-col>
                    <label>36.66 $</label>
                </b-col>
            </b-row>

            <b-row align-h="center">
                <b-col lg="2" />
                <b-col lg="4" class="mx-auto">
                    <div ref="paypal" class="paypal"></div>
                </b-col>
            </b-row>
        </b-container>
    </b-form>
</template>

<script>
import axios from "axios";
export default {
    name: "PayMoth",
    data: function() {
        return {
            loaded: false
        };
    },
    mounted: function() {
        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AZougqOyKucRxBRb-R6xthxmwf6EyV9PjUUsSgA7BpvLHQ8MQ9JOcygThdXyIjRhXFnOU7uHJzi8INex&vault=true";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },
    methods: {
        setLoaded: function() {
            this.loaded = true;
            window.paypal
                .Buttons({
                    style: {
                        shape: "rect",
                        color: "gold",
                        layout: "vertical",
                        label: "subscribe"
                    },
                    createSubscription: function(data, actions) {
                        return actions.subscription.create({
                            plan_id: "P-5PN06135VK478952TLZ5ZNPI"
                        });
                    },
                    onApprove: async function() {
                        alert(
                            "You have successfully created subscription "                                
                        );
                        await axios.get(
                            "http://localhost:3000/members/P-5PN06135VK478952TLZ5ZNPI"
                        );
                        
                    }
                })
                .render(this.$refs.paypal);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>