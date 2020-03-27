<template>
    <div>
        <b-form>
            <b-container class="mt-5" style="min-height: 800px">
                <b-row align-h="center">
                    <b-button-group>
                        <b-button 
                            variant="primary"
                            size="lg"
                            to="/payment/onemoth"
                        >1 moth
                        </b-button>
                        <b-button variant="primary" size="lg" to="/payment/threemonth">3 moths</b-button>
                        <b-button variant="primary" size="lg" to="/payment/oneyear">1 year</b-button>
                    </b-button-group>
                </b-row>
                <b-row >
                    <b-col sm="2" class="mt-5"/>
                    <b-col sm="7" class="mt-5">
                        <label>A license for 1 device</label>
                    </b-col>
                    <b-col class="mt-5">
                        <label>2.99 $</label>
                    </b-col>                   
                </b-row>
                <b-row align-h="center">
                    <b-col md="8" sm="10" class="mt-5">
                        <div>
                            <b-button block variant="primary" size="lg" >Subcribe</b-button>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="2"/>
                    <b-col class="mt-5">
                        <b-icon icon="star-fill"/>
                        <label>You are signing up for a monthly renewable subscription</label>
                    </b-col>
                    
                </b-row>
                <b-row>
                    <b-col sm="2"/>
                    <b-col >
                        <b-icon icon="star-fill"/>
                        <label>Application for kids is available for free</label>                                          
                    </b-col>             
                </b-row>
                <b-row>
                    <b-col sm="2"/>
                    <b-col >
                        <b-icon icon="alert-circle"/>
                        <label>The license does not include access to the online listening function</label>                                          
                    </b-col>             
                </b-row>
                <b-row>
                    <b-col sm="2"/>
                    <b-col >
                        <label>By clicking the button, you accept «License agreement». 
                            The subscription will be renewed automatically. 
                            You can unsubscribe at any time.</label>                                          
                    </b-col>             
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script>
export default {
    
};
</script>

<style lang="scss" scoped>
</style>