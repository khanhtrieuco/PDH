<template>
    <div class="admin-product-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tên người nhận</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tên người nhận"
                                    v-model="filter.address_name" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Số điện thoại</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập số điện thoại người nhận"
                                    v-model="filter.address_phone" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Email</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập email người nhận"
                                    v-model="filter.address_email" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tỉnh Thành</a-col>
                            <a-col :span="17">
                                <!-- <b-form-select v-model="filter.province" :options="provinces"></b-form-select> -->
                                <a-select placeholder="Chọn tỉnh thành" style="width: 100%"
                                @change="(e) => this.province = e">
                                    <a-select-option :value="_item.id" v-for="(_item, idx) in listProvince" :key="idx">
                                        {{ _item.attributes.name }}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Quận Huyện</a-col>
                            <a-col :span="17">
                                <!-- <b-form-select v-model="filter.district" :options="districts"></b-form-select> -->
                                <a-select placeholder="Chọn quận huyện" style="width: 100%"
                                @change="(e) => this.district = e">
                                    <a-select-option :value="_item.id" v-for="(_item, idx) in districts" :key="idx">
                                        {{ _item.attributes.name }}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Phường Xã</a-col>
                            <a-col :span="17">
                                <!-- <b-form-select v-model="filter.ward" :options="wards"></b-form-select> -->
                                <a-select  placeholder="Chọn phường xã" style="width: 100%"
                                @change="(e) => this.ward = e">
                                    <a-select-option :value="_item.id" v-for="(_item, idx) in wards" :key="idx">
                                        {{ _item.attributes.name }}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="24" style="float: right;">
                        <a-button style="float: right;" class="admin-btn" type="danger" @click="onRefresh">Huỷ</a-button>
                        <a-button style="float: right;margin-right: 10px;" class="admin-btn" type="primary"
                            @click="onFilter">Lọc</a-button>
                    </a-col>
                </a-row>
            </a-collapse-panel>
        </a-collapse>
        <a-table bordered :columns="columns" :data-source="listItem.data" :pagination="listItem.pagination"
            :loading="loading" @change="handleRefesh" :row-key="record => record.id" :scroll="{ x: 1000 }">
            <span slot="address" slot-scope="record">
                <div>Tên khách hàng: {{ record?.attributes.address_name }}</div>
                <div>Số điện thoại: {{ record?.attributes.address_phone }}</div>
                <div>Email: {{ record?.attributes.address_email }}</div>
                <div>Địa chỉ: {{ record?.attributes.address_full }}</div>
            </span>
            <span slot="user" slot-scope="record">
                <div>{{ record?.attributes.user?.data?.attributes?.username }}</div>
            </span>
            <span slot="time" slot-scope="record">
                <div>Ngày lấy hàng: {{ record?.attributes.pick_date }}</div>
                <div>Ngày giao hàng: {{ record?.attributes.end_date }}</div>
            </span>
            <span slot="price" slot-scope="price">
                {{ price | numberWithCommas }}{{ ' ' }}đ
            </span>
            <span slot="state" slot-scope="state">
                <a-tag :color="getStateOrderColor(state)">{{ getStateOrder(state) }}</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Thông tin</a-button>
                <!-- <a-button @click="deletedProduct(record.id)" class="admin-btn" type="danger" v-if="record?.attributes?.state === 'active'">Xoá</a-button>
                <a-button @click="activeProduct(record.id)" class="admin-btn" ghost type="danger" v-else>Khôi phục</a-button> -->
            </span>
        </a-table>
        <a-modal title="Thông tin đơn hàng" :visible="modalOpen" :footer="null" width="1400px"
            @cancel="() => this.modalOpen = false">
            <Detail :item="current" @onCancel="() => this.modalOpen = false" @onReload="() => this.onRefresh()" />
        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import general from "~/mixins/general";
//   import moment from "moment";
import Detail from "./detail.vue"

export default {
    layout: "admin",
    mixins: [general],
    components: {
        Detail
    },
    data() {
        return {
            columns: [
                {
                    dataIndex: 'attributes.code',
                    key: 'code',
                    title: 'Mã đơn hàng',
                    fixed: 'left',
                    width: 140
                }, {
                    title: 'Trạng thái',
                    dataIndex: 'attributes.state',
                    scopedSlots: { customRender: 'state' },
                    key: 'state',
                    fixed: 'left',
                    width: 150

                }, {
                    title: 'Người đặt đơn',
                    scopedSlots: { customRender: 'user' },
                    key: 'user',
                    width: 150
                }, {
                    title: 'Địa chỉ giao',
                    scopedSlots: { customRender: 'address' },
                    key: 'address',
                    width: 300
                }, {
                    title: 'Thời gian',
                    scopedSlots: { customRender: 'time' },
                    key: 'time',
                    width: 300
                }, {
                    title: 'Loại',
                    dataIndex: 'attributes.payment_type',
                    key: 'payment_type',
                    width: 100
                }, {
                    title: 'Giá',
                    dataIndex: 'attributes.price',
                    scopedSlots: { customRender: 'price' },
                    width: 130,
                    align: 'center',
                    key: 'price',
                }, {
                    title: 'Phí shipping',
                    dataIndex: 'attributes.price_ship',
                    scopedSlots: { customRender: 'price' },
                    width: 130,
                    align: 'center',
                    key: 'price_ship',
                }, {
                    title: 'Giảm giá',
                    dataIndex: 'attributes.discount_price',
                    scopedSlots: { customRender: 'price' },
                    width: 130,
                    align: 'center',
                    key: 'discount_price',
                }, {
                    title: 'Phí thu hộ',
                    dataIndex: 'attributes.cod',
                    scopedSlots: { customRender: 'price' },
                    width: 130,
                    align: 'center',
                    key: 'cod',
                }, {
                    title: 'Action',
                    key: 'action',
                    width: 130,
                    fixed: 'right',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            loading: false,
            filter: {},
            sort: [],
            modalOpen: false,
            districts: [],
            wards: [],
            province: null,
            district: null,
            ward: null,
            current: {}
        };
    },
    computed: {
        ...mapGetters({
            listItem: "order/getListOrderAdmin",
            listProvince: "user/getListProvince",
            listDistrict: "user/getListDistrict",
            listWard: "user/getListWard"
        })
    },
    watch: {
        province: async function (val) {
            if (val) {
                await this.getListDistrict({ filters: { province: { id: { $eq: val } } } })
                this.districts = this.listDistrict
            }
        },
        district: async function (val) {
            if (val) {
                await this.getListWard({ filters: { district: { id: { $eq: val } } } })
                this.wards = this.listWard
            }
        },
    },
    async mounted() {
        await this.loadData();
        await this.getListProvince({ pagination: { pageSize: 100 } })
    },
    methods: {
        ...mapActions({
            getListOrderAdmin: "order/getListOrderAdmin",
            getListProvince: 'user/getListProvince',
            getListDistrict: 'user/getListDistrict',
            getListWard: 'user/getListWard'
        }),
        onRefresh: async function () {
            this.filter = {}
            this.sort = []
            this.onFilter()
        },
        loadData: async function () {
            this.loading = true
            await this.getListOrderAdmin({
                pagination: {
                    page: this.listItem.pagination.page,
                    pageSize: this.listItem.pagination.pageSize
                }
            })
            this.loading = false
        },
        onFilter: async function () {
            this.loading = true
            let filters = {}
            if (this.filter.address_name) {
                filters['address_name'] = { $containsi: this.filter.address_name }
            }
            if (this.filter.address_email) {
                filters['address_email'] = { id: { $eq: this.filter.address_email } }
            }
            if (this.filter.address_phone) {
                filters['address_phone'] = { id: { $eq: this.filter.address_phone } }
            }
            if (this.province) {
                filters['provinces'] = { id: { $eq: this.province } }
            }
            if (this.district) {
                filters['districts'] = { id: { $eq: this.district } }
            }
            if (this.ward) {
                filters['wards'] = { id: { $eq: this.ward } }
            }
            await this.getListOrderAdmin({
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination ? this.listItem.pagination.pageSize : 10
                },
                filters,
                sort: this.sort
            })
            this.loading = false
        },
        handleRefesh: async function (_p, _f, _s) {
            this.loading = true
            let filters = {}
            let sort = []
            if (this.filter.address_name) {
                filters['address_name'] = { $containsi: this.filter.address_name }
            }
            if (this.filter.address_email) {
                filters['address_email'] = { id: { $eq: this.filter.address_email } }
            }
            if (this.filter.address_phone) {
                filters['address_phone'] = { id: { $eq: this.filter.address_phone } }
            }
            if (this.province) {
                filters['provinces'] = { id: { $eq: this.province } }
            }
            if (this.district) {
                filters['districts'] = { id: { $eq: this.district } }
            }
            if (this.ward) {
                filters['wards'] = { id: { $eq: this.ward } }
            }
            if (_s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListOrderAdmin({
                pagination: {
                    page: _p.current,
                    pageSize: 10
                },
                filters,
                sort: this.sort
            })
            this.loading = false
        },
        onEdit: async function (item) {
            this.current = item
            this.modalOpen = true
        }
        //   goProfile(alias_link) {
        //     let href = new URL(`${window.location.href}/${alias_link}`);
        //     // href.searchParams.set("profile", uuid);
        //     window.location.href = href.toString();
        //     // this.$router.push(`/profile/${uuid}`);
        //   }
    }
};
</script>
<style lang="scss" scoped></style>