<template>
    <ValidationObserver ref="observer">
        <b-form>
            <b-container class="mt-5" style="min-height: 800px">
                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group label-cols-sm="4" label-align-sm="right">
                            <h2 id="form-radio-inputs" class="bv-no-focus-ring">
                                <span class="bd-content-title">Đăng ký tài khoản</span>
                            </h2>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group
                            label="Tên đăng nhập"
                            label-cols-sm="4"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required"
                                name="Tên đăng nhập"
                                v-slot="{ valid, errors }"
                            >
                                <b-form-input
                                    v-model.trim="UserName"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    maxlength="250"
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
                            label="Mật khẩu"
                            label-cols-sm="4"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required"
                                name="Mật khẩu"
                                vid="confirm"
                                v-slot="{ valid, errors }"
                            >
                                <b-form-input
                                    type="password"
                                    v-model.trim="PassWord"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    maxlength="250"
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
                            label="Nhập lại mật khẩu"
                            label-cols-sm="4"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required|password:@confirm"
                                name="Nhập lại mật khẩu"
                                v-slot="{ valid, errors }"
                            >
                                <b-form-input
                                    v-model.trim="RePassWord"
                                    type="password"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    maxlength="250"
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
                            label="Họ tên"
                            label-cols-sm="4"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required"
                                name="Name"
                                v-slot="{ valid, errors }"
                            >
                                <b-form-input
                                    v-model.trim="Name"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    maxlength="250"
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
                            label="Email"
                            label-cols-sm="4"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <ValidationProvider
                                rules="required|email"
                                name="Email"
                                v-slot="{ valid, errors }"
                            >
                                <b-form-input
                                    v-model.trim="Email"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    maxlength="250"
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
                            label="Captcha"
                            label-cols-sm="4"
                            label-align-sm="right"
                            description="Bắt buộc nhập!"
                        >
                            <b-form-group>
                                <vue-recaptcha
                                    ref="recaptcha"
                                    :sitekey="siteKey"
                                    :loadRecaptchaScript="true"
                                    @verify="onCaptchaVerified"
                                    @expired="onCaptchaExpired"
                                ></vue-recaptcha>
                                <b-form-invalid-feedback
                                    :state="isCaptchaChecked"
                                >Captcha không được bỏ trống!</b-form-invalid-feedback>
                            </b-form-group>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" class="mx-auto">
                        <b-form-group
                            label
                            label-cols-sm="4"
                            label-align-sm="right"
                            label-for
                            class="mb-0"
                        >
                            <b-input-group>
                                <b-button-group>
                                    <b-button variant="success" @click="clientAdd">Đăng ký</b-button>
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
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { msg_YN } from "@/utils/messagebox.js";
import VueRecaptcha from "vue-recaptcha";

export default {
    data() {
        return {
            isCaptchaChecked: true
        };
    },
    components: {
        ValidationObserver,
        ValidationProvider,
        VueRecaptcha
    },
    computed: {
        ...mapState("register", {
            siteKey: state => state.siteKey,
        }),

        UserName: {
            get() {
                return this.$store.state.register.obj.UserName;
            },
            set(value) {
                this.updateObj(["UserName", value]);
            }
        },
        PassWord: {
            get() {
                return this.$store.state.register.obj.PassWord;
            },
            set(value) {
                this.updateObj(["PassWord", value]);
            }
        },
        RePassWord: {
            get() {
                return this.$store.state.register.obj.RePassWord;
            },
            set(value) {
                this.updateObj(["RePassWord", value]);
            }
        },
        Email: {
            get() {
                return this.$store.state.register.obj.Email;
            },
            set(value) {
                this.updateObj(["Email", value]);
            }
        },
        Name: {
            get() {
                return this.$store.state.register.obj.Name;
            },
            set(value) {
                this.updateObj(["Name", value]);
            }
        }
    },
    methods: {
        onCaptchaVerified(recaptchaToken) {
            this.updateCaptchaChecked(true);
            this.updateReCaptchaToken(recaptchaToken);
        },
        onCaptchaExpired: function() {
            this.$refs.recaptcha.reset();
            this.updateCaptchaChecked(false);
            this.updateReCaptchaToken("");
        },
        ...mapMutations("loading", ["updateIsLoading"]),
        ...mapActions("register", ["add"]),
        ...mapMutations("register", ["updateObj"]),
        ...mapMutations("register", [
            "updateReCaptchaToken",
            "updateCaptchaChecked"
        ]),
        ...mapGetters("register", ["isCaptcha"]),
        async clientAdd() {
            const hasError = await this.$refs.observer.validate();
            this.isCaptchaChecked = this.isCaptcha();
            if (!hasError || !this.isCaptchaChecked) {
                return;
            }

            try {
                if (await msg_YN(this.$bvModal, "đăng ký")) {
                    this.updateIsLoading(true);
                    const result = await this.add();
                    if (result && result.status == 201) {
                        this.$bvToast.toast("Đăng ký thành công!", {
                            title: `Thông báo!`,
                            variant: "success",
                            autoHideDelay: 100
                        });
                        this.newForm();
                    }
                }
            } catch (error) {
                throw new error();
            } finally {
                this.updateIsLoading(false);
            }
        },
        async resetForm() {
            if (await msg_YN(this.$bvModal, "làm mới")) {
                this.newForm();
            }
        },
        newForm() {
            this.updateObj(["UserName", null]);
            this.updateObj(["PassWord", null]);
            this.updateObj(["RePassWord", null]);
            this.updateObj(["Email", null]);
            this.updateObj(["Name", null]);

            requestAnimationFrame(() => {
                this.$refs.observer.reset();
            });

            this.isCaptchaChecked = true;
            this.$refs.recaptcha.reset();
        }
    },
    async mounted() {
        this.updateIsLoading(true);
        this.newForm();
        this.updateIsLoading(false);
    }
};
</script>