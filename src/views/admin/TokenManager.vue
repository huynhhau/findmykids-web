<template>
    <ValidationObserver ref="observer">
        <b-form>
            <b-container class="mt-3" style="min-height: 800px">
                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group
                            label="Số tài khoản"
                            label-cols-sm="3"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required"
                                name="Số tài khoản"
                                v-slot="{ valid, errors }"
                            >
                                <b-form-input
                                    v-model.trim="account"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    maxlength="50"
                                ></b-form-input>
                                <b-form-invalid-feedback
                                    :state="errors[0] ? false : (valid ? true : null)"
                                >{{ errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group
                            label="Tên gợi nhớ"
                            label-cols-sm="3"
                            label-align-sm="right"
                            description
                        >
                            <b-form-input v-model.trim="namereminiscent" maxlength="150"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group
                            label="Ngân hàng"
                            label-cols-sm="3"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required"
                                name="Ngân hàng"
                                v-slot="{ valid, errors }"
                            >
                                <b-input-group>
                                    <b-form-select
                                        name="Ngân hàng"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        v-model.trim="idbank"
                                        :options="banks"
                                    ></b-form-select>
                                </b-input-group>
                                <b-form-invalid-feedback
                                    :state="errors[0] ? false : (valid ? true : null)"
                                >{{ errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group
                            label
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-for
                            class="mb-0"
                        >
                            <b-input-group>
                                <b-button-group>
                                    <b-button variant="success" @click="clientUpdate">Cập nhật</b-button>
                                    <b-button variant="light" @click="resetForm">
                                        <b-icon icon="arrow-counterclockwise"></b-icon>
                                    </b-button>
                                </b-button-group>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-form>
    </ValidationObserver>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { msg_YN } from "../../../utils/MessageBox";

export default {
    data() {
        return {
            banks: [],
            url: "/customer/receivers"
        };
    },
    components: {
        ValidationObserver,
        ValidationProvider
    },
    computed: {
        account: {
            get() {
                return this.$store.state.receiver.obj.account;
            },
            set(value) {
                this.updateObj(["account", value]);
            }
        },
        namereminiscent: {
            get() {
                return this.$store.state.receiver.obj.namereminiscent;
            },
            set(value) {
                this.updateObj(["namereminiscent", value]);
            }
        },
        idbank: {
            get() {
                return this.$store.state.receiver.obj.idbank;
            },
            set(value) {
                this.updateObj(["idbank", value]);
            }
        },
        breadcrumb_items: {
            get() {
                return this.$store.state.user.breadcrumb_items;
            },
            set(value) {
                this["user/updateField"](["breadcrumb_items", value]);
            }
        }
    },
    methods: {
        ...mapMutations("loading", ["updateIsLoading"]),
        ...mapMutations(["user/updateField"]),
        ...mapMutations("receiver", ["updateObj"]),
        ...mapActions(["helper/loadBankForSelect"]),
        ...mapActions("receiver", ["update", "loadReceiverByUserIdAndId"]),
        async clientUpdate() {
            const hasError = await this.$refs.observer.validate();
            if (!hasError) {
                return;
            }

            try {
                if (await msg_YN(this.$bvModal, "cập nhật")) {
                    this.updateIsLoading(true);
                    const status = await this.update();

                    if (status == 200) {
                        this.$bvToast.toast("Cập nhật thành công!", {
                            title: `Thông báo!`,
                            variant: "success",
                            autoHideDelay: 100
                        });
                        await setTimeout(this.goBack, 1000);
                    }
                }
            } catch (error) {
                throw new error();
            } finally {
                this.updateIsLoading(false);
            }
        },
        goBack() {
            this.$router.push(`${this.url}`).catch(error => {
                if (error.name != "NavigationDuplicated") {
                    throw error;
                }
            });
        },
        async resetForm() {
            if (await msg_YN(this.$bvModal, "làm mới")) {
                this.newForm();
            }
        },
        async newForm() {
            this.account = "";
            this.namereminiscent = "";
            this.idbank = "";

            requestAnimationFrame(() => {
                this.$refs.observer.reset();
            });

            await this.loadReceiverByUserIdAndId(this.$route.params.id);
        },
        loadBreadcumb() {
            this.breadcrumb_items = [
                {
                    text: "Trang chủ",
                    to: "/customer"
                },
                {
                    text: "Danh sách người nhận",
                    to: "/customer/receivers"
                },
                {
                    text: "Cập nhật người nhận"
                }
            ];
        }
    },
    async mounted() {
        this.updateIsLoading(true);
        this.newForm();

        this.banks = await this["helper/loadBankForSelect"]();
        await this.loadReceiverByUserIdAndId(this.$route.params.id);
        
        this.loadBreadcumb();
        this.updateIsLoading(false);
    },
    watch: {
        $route() {
            this.loadBreadcumb();
        }
    }
};
</script>