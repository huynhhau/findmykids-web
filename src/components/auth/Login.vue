<template>
    <ValidationObserver ref="observer">
        <b-container style="min-height: 800px">
            <b-row>
                <b-col lg="5" class="mx-auto" style="margin-top:150px;">
                    <b-card class="shadow-sm">
                        <b-card-text>
                            <b-jumbotron
                                style="padding: 0rem 2rem; background-color: transparent; margin-bottom: 0px; text-align: center"
                                header="Find My Kids"
                            ></b-jumbotron>
                        </b-card-text>
                        <b-form>
                            <b-form-group>
                                <ValidationProvider
                                    rules="required|email"
                                    name="Tên đăng nhập"
                                    v-slot="{ valid, errors }"
                                >
                                    <b-form-input
                                        v-model.trim="UserName"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        placeholder="Tên đăng nhập"
                                        description="Bắt buộc nhập!"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        :state="errors[0] ? false : (valid ? true : null)"
                                    >{{ errors[0] }}</b-form-invalid-feedback>
                                </ValidationProvider>
                            </b-form-group>

                            <b-form-group>
                                <ValidationProvider
                                    rules="required"
                                    name="Mật khẩu"
                                    v-slot="{ valid, errors }"
                                >
                                    <b-form-input
                                        type="password"
                                        v-model="PassWord"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        placeholder="Mật khẩu"
                                        description="Bắt buộc nhập!"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        :state="errors[0] ? false : (valid ? true : null)"
                                    >{{ errors[0] }}</b-form-invalid-feedback>
                                </ValidationProvider>
                            </b-form-group>

                            <b-form-group>
                                <vue-recaptcha
                                    ref="recaptcha"
                                    :sitekey="this.siteKey"
                                    :loadRecaptchaScript="true"
                                    @verify="onCaptchaVerified"
                                    @expired="onCaptchaExpired"
                                ></vue-recaptcha>
                                <b-form-invalid-feedback
                                    :state="isCaptchaChecked"
                                >Captcha không được bỏ trống!</b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group>
                                <b-button variant="primary" @click="clientLogin">Đăng nhập</b-button>
                            </b-form-group>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </ValidationObserver>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
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
        ...mapState("auth", {
            siteKey: state => state.siteKey
        }),
        UserName: {
            get() {
                return this.$store.state.auth.obj.UserName;
            },
            set(value) {
                this.updateObj(["UserName", value]);
            }
        },
        PassWord: {
            get() {
                return this.$store.state.auth.obj.PassWord;
            },
            set(value) {
                this.updateObj(["PassWord", value]);
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
        ...mapActions("auth", ["login"]),
        ...mapMutations("auth", ["updateObj"]),
        ...mapMutations("auth", [
            "updateReCaptchaToken",
            "updateCaptchaChecked"
        ]),
        ...mapGetters("auth", ["isCaptcha"]),
        async clientLogin() {
            const hasError = await this.$refs.observer.validate();
            this.isCaptchaChecked = this.isCaptcha();
            if (!hasError || !this.isCaptchaChecked) {
                return;
            }

            try {
                this.updateIsLoading(true);
                const result = await this.login();
                if (result) {
                    this.$router.push("/").catch(error => {
                        if (error.name != "NavigationDuplicated") {
                            throw error;
                        }
                    });
                }
            } catch (error) {
                throw new error();
            } finally {
                this.updateIsLoading(false);
            }
        },
        newForm() {
            this.updateObj(["UserName", null]);
            this.updateObj(["PassWord", null]);

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