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
                    <label>2.99 $</label>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="5" />
                <b-col lg="4">
                    <div ref="paypal" class="paypay"></div>
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
                            plan_id: "P-22X55209K5606000JLZ6CVMI"
                        });
                    },
                    onApprove: async function() {
                        alert(
                            "You have successfully created subscription " 
                        );
                        await axios.get(
                            "http://localhost:3000/members/P-22X55209K5606000JLZ6CVMI"
                        );

                        
                    },
                    onError: function(err) {
                        alert(err)
                    }
                })
                .render(this.$refs.paypal);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>