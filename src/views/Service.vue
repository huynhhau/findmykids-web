<template>
    <ValidationObserver ref="observer">
        <b-container fluid class="mt-3">
            <h1 class="bv-no-focus-ring" tabindex="-1">
                <span class="bd-content-title">Quản lý người đăng ký và giấy phép dịch vụ</span>
            </h1>
            <div>
                <b-alert show variant="success">
                    <h4 class="alert-heading">Thống kê</h4>
                    <b-list-group>
                        <b-list-group-item>Tổng số người đăng ký: 1000 người.</b-list-group-item>
                        <b-list-group-item>Tổng số người được theo dõi (trẻ em): 2050 người.</b-list-group-item>
                        <b-list-group-item>Tổng số người đang sử dụng dịch vụ: 901 người.</b-list-group-item>
                    </b-list-group>
                </b-alert>
            </div>
            <b-alert show variant="light">
                <div style="min-height: 800px;">
                    <b-row class="mt-4"></b-row>
                    <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group
                                label="Tên đăng nhập"
                                label-cols-sm="3"
                                label-align-sm="right"
                                label-for="filterInput"
                                class="mb-0"
                            >
                                <b-form-input
                                    v-model.trim="UserName"
                                    maxlength="250"
                                    type="search"
                                    id="userName"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group
                                label="Họ tên"
                                label-cols-sm="3"
                                label-align-sm="right"
                                label-for="filterInput"
                                class="mb-0"
                            >
                                <b-form-input
                                    v-model.trim="FullName"
                                    maxlength="250"
                                    type="search"
                                    id="filterInput"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group
                                label="Email"
                                label-cols-sm="3"
                                label-align-sm="right"
                                label-for="filterInput"
                                class="mb-0"
                                :outlined="false"
                                :borderless="true"
                                head-variant="dark"
                                responsive="sm"
                            >
                                <b-form-input
                                    v-model.trim="Email"
                                    maxlength="250"
                                    type="search"
                                    id="filterInput"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row> -->

                    <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group
                                label="Ngày lập từ"
                                label-cols-sm="3"
                                label-align-sm="right"
                                label-for="filterInput"
                                class="mb-0"
                                :outlined="false"
                                :borderless="true"
                                head-variant="dark"
                                responsive="sm"
                            >
                                <b-form-datepicker
                                    id="example-datepicker"
                                    v-model="DateCreateFrom"
                                    class="mb-2"
                                ></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group
                                label="Ngày lập đến"
                                label-cols-sm="3"
                                label-align-sm="right"
                                label-for="filterInput"
                                class="mb-0"
                                :outlined="false"
                                :borderless="true"
                                head-variant="dark"
                                responsive="sm"
                            >
                                <b-form-datepicker
                                    id="example-datepicker33"
                                    v-model="DateCreateTo"
                                    class="mb-2"
                                ></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col lg="6">
                            <b-form-group
                                label="Trạng thái giấy phép"
                                label-cols-sm="3"
                                label-align-sm="right"
                            >
                                <b-input-group>
                                    <b-form-select
                                        name="Trạng thái giấy phép"
                                        v-model.trim="license"
                                        :options="licenses"
                                    ></b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group label-cols-sm="3">
                                <b-input-group>
                                    <b-button-group>
                                        <b-button variant="success" @click="submitForm">Tìm kiếm</b-button>
                                        <b-button variant="light" @click="resetForm">
                                            <b-icon icon="arrow-counterclockwise"></b-icon>
                                        </b-button>
                                    </b-button-group>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-alert show variant="danger">
                        <p class="mb-0">
                            Số lượng kết quả tìm kiếm
                            <span class="alert-link">10</span> dòng.
                        </p>
                    </b-alert>

                    <b-row>
                        <b-col lg="12">
                            <b-table
                                :borderless="true"
                                :current-page="currentPage"
                                :fields="fields"
                                :filter="filter"
                                :items="items"
                                :outlined="false"
                                :per-page="perPage"
                                :striped="true"
                                head-variant="dark"
                                responsive="sm"
                                selectable
                                selected-variant="warning"
                                select-mode="single"
                                hover
                            >
                                <template v-slot:cell(state)="row">
                                    <b-form-checkbox
                                        v-model="row.item.state"
                                        button-variant="warning"
                                        @input="updateStateClick(row.item.id, row.item.state)"
                                        switch
                                        size="lg"
                                    ></b-form-checkbox>
                                </template>

                                <template v-slot:cell(plans)="row">
                                    <b-button
                                        size="sm"
                                        @click="row.toggleDetails"
                                        class="mr-2"
                                        variant="primary"
                                    >{{ row.detailsShowing ? 'Ẩn' : 'Hiện'}} chi tiết</b-button>
                                </template>

                                <template v-slot:row-details="row">
                                    <div class="alert alert-light">
                                        <p class="mb-2">
                                            <span class="alert-link">Danh sách trẻ</span>
                                        </p>
                                        <b-table
                                            :borderless="true"
                                            :fields="fieldsChidren"
                                            :items="row.item.children"
                                            :outlined="false"
                                            :per-page="perPage"
                                            :striped="true"
                                            head-variant="dark"
                                            responsive="sm"
                                            selectable
                                            selected-variant="warning"
                                            select-mode="single"
                                            hover
                                        ></b-table>
                                    </div>

                                    <div class="alert alert-light">
                                        <p class="mb-2">
                                            <span class="alert-link">Giấy phép sử dụng dịch vụ</span> (Ngày hết hạn:
                                            <span
                                                class="alert-link"
                                            >{{row.item.duedate}}</span>
                                            )
                                        </p>

                                        <b-table
                                            :borderless="true"
                                            :fields="fieldsDetail"
                                            :items="row.item.plans"
                                            :outlined="false"
                                            :per-page="perPage"
                                            :striped="true"
                                            head-variant="dark"
                                            responsive="sm"
                                            selectable
                                            selected-variant="warning"
                                            select-mode="single"
                                            hover
                                        ></b-table>
                                    </div>

                                    <b-form-group>
                                        <b-input-group>
                                            <b-button-group>
                                                <b-button
                                                    variant="success"
                                                    @click="submitForm"
                                                >Xác thực Mã subcriber</b-button>
                                                <b-button
                                                    size="sm"
                                                    @click="row.toggleDetails"
                                                    variant="primary"
                                                >Ẩn chi tiết</b-button>
                                                <b-button variant="light" @click="resetForm">
                                                    <b-icon icon="arrow-counterclockwise"></b-icon>
                                                </b-button>
                                            </b-button-group>
                                        </b-input-group>
                                    </b-form-group>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <b-pagination-nav
                                :link-gen="linkGen"
                                :number-of-pages="this.pageNum"
                                use-router
                            ></b-pagination-nav>
                        </b-col>
                    </b-row>
                </div>
            </b-alert>
        </b-container>
    </ValidationObserver>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { msg_YN } from "@/utils/messagebox.js";
import { ValidationObserver } from "vee-validate";
export default {
    components: {
        ValidationObserver
        //ValidationProvider
    },
    data() {
        return {
            filter: null,
            checked1: true,
            fieldsDetail: [
                { key: "id", label: "Mã subcriber", sortable: true },
                { key: "name", label: "Giấy phép", sortable: true },
                { key: "status", label: "Trạng thái", sortable: true },
                { key: "price", label: "Giá", sortable: true },
                { key: "description", label: "Mô tả", sortable: true },
                { key: "create_time", label: "Ngày tạo", sortable: true }
            ],
            fieldsChidren: [
                { key: "id", label: "Mã trẻ", sortable: true },
                { key: "name", label: "Tên trẻ", sortable: true }
            ],
            licenses: [
                { text: "Không sử dụng", value: 1 },
                { text: "Có sử dụng", value: 0 }
                // { text: "Có sử dụng và còn hạn", value: 0 },
                // { text: "Có sử dụng và hết hạn", value: 0 }
            ],
            license: "",
            pageNum: 2
        };
    },
    computed: {
        ...mapState("service", {
            fields: state => state.fields,
            items: state => state.items,
            hasData: state => state.hasData,
            filterOn: state => state.filterOn,
            totalRows: state => state.totalRows,
            perPage: state => state.perPage,
            currentPageTemp: state => state.currentPage,
            selectMode: state => state.selectMode,
            selected: state => state.selected,
            selectedvariant: state => state.selectedvariant
        }),
        UserName: {
            get() {
                return this.$store.state.service.service.UserName;
            },
            set(value) {
                this.updateService(["UserName", value]);
            }
        },
        FullName: {
            get() {
                return this.$store.state.service.service.FullName;
            },
            set(value) {
                this.updateService(["FullName", value]);
            }
        },
        Email: {
            get() {
                return this.$store.state.service.service.Email;
            },
            set(value) {
                this.updateService(["Email", value]);
            }
        },
        DateCreateFrom: {
            get() {
                return this.$store.state.service.service.DateCreateFrom;
            },
            set(value) {
                this.updateService(["DateCreateFrom", value]);
            }
        },
        DateCreateTo: {
            get() {
                return this.$store.state.service.service.DateCreateTo;
            },
            set(value) {
                this.updateService(["DateCreateTo", value]);
            }
        },
        currentPage: {
            get() {
                return this.currentPageTemp;
            },
            set(value) {
                this.updateCurrentPage(value);
            }
        }
    },
    methods: {
        ...mapMutations("loading", ["updateIsLoading"]),
        ...mapMutations("service", ["updateService", "updateCurrentPage"]),
        ...mapActions("service", ["getListServiceRegister", "updateState"]),
        async resetForm() {
            if (await msg_YN(this.$bvModal, "làm mới")) {
                this.newForm();
            }
        },
        async updateStateClick(id, state) {
            try {
                this.updateIsLoading(true);
                const result = await this.updateState(id + "/" + state);
                if (result.status == 200) {
                    this.$bvToast.toast("Cập nhật trạng thái thành công!", {
                        title: `Thông báo!`,
                        variant: "success",
                        autoHideDelay: 100
                    });
                }
            } catch (error) {
                throw new error();
            } finally {
                this.updateIsLoading(false);
            }
        },
        newForm() {
            this.updateService(["UserName", ""]);
            this.updateService(["FullName", ""]);
            this.updateService(["Email", ""]);
            this.updateService(["DateCreateFrom", null]);
            this.updateService(["DateCreateTo", null]);

            requestAnimationFrame(() => {
                this.$refs.observer.reset();
            });
        },
        async submitForm() {
            try {
                if (await msg_YN(this.$bvModal, "tìm kiếm")) {
                    this.updateIsLoading(true);
                    await this.getListServiceRegister(1);
                    this.pageNum = this.totalRows / this.perPage;
                    if (this.totalRows % this.perPage != 0) {
                        this.pageNum += 1;
                    }
                }
            } catch (error) {
                throw new error();
            } finally {
                this.updateIsLoading(false);
            }
        },
        linkGen(pageNum) {
            return pageNum === 1 ? "?" : `?page=${pageNum}`;
        }
    },
    async mounted() {
        this.updateIsLoading(true);
        await this.getListServiceRegister(1);
        this.pageNum = this.totalRows / this.perPage;
        if (this.totalRows % this.perPage != 0) {
            this.pageNum += 1;
        }
        this.updateIsLoading(false);
    },
    watch: {
        async $route(to) {
            this.updateIsLoading(true);
            await this.getListServiceRegister(to.query.page);
            this.pageNum = this.totalRows / this.perPage;
            if (this.totalRows % this.perPage != 0) {
                this.pageNum += 1;
            }
            this.updateIsLoading(false);
        }
    }
};
</script>

<style lang="scss" scoped></style>
