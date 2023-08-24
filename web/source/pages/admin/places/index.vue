<template>
    <div class="admin-club-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tên</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tên địa điểm"
                                    v-model="filter.name" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Trạng thái</a-col>
                            <a-col :span="17">
                                <a-select style="width: 100%" @change="(e) => this.filter['state'] = e" allowClear>
                                    <a-select-option value="active">
                                        Active
                                    </a-select-option>
                                    <a-select-option value="deleted">
                                        Deleted
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
                <a-button slot="extra" class="admin-btn" type="primary" style="margin-top: -5px;" @click="onAddNew">Tạo
                    mới</a-button>
            </a-collapse-panel>
        </a-collapse>
        <a-table bordered :columns="columns" :data-source="listItem.data" :pagination="listItem.pagination"
            :loading="loading" @change="handleRefesh" :row-key="record => record.id">
            <span slot="images" slot-scope="images">
                <ThumbImage ratio="16-9" :src="images?.data?.attributes?.url"></ThumbImage>
            </span>
            <span slot="state" slot-scope="state">
                <a-tag color="green" v-if="state === 'active'">Active</a-tag>
                <a-tag color="red" v-else>Deleted</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <a-button @click="deletedPlace(record.id)" class="admin-btn" type="danger"
                    v-if="record?.attributes?.state === 'active'">Xoá</a-button>
                <a-button @click="activePlace(record.id)" class="admin-btn" ghost type="danger" v-else>Khôi phục</a-button>
            </span>
        </a-table>
        <a-modal title="Thông tin địa điểm" :visible="modalOpen" :footer="null" width="1400px" @cancel="() => this.modalOpen = false">
            <Detail :item="current" :modalType="modalType" @onCancel="() => this.modalOpen = false" @onReload="()=> this.onRefresh()"/>
        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import general from "~/mixins/general";
import Detail from "./detail.vue"

//   import moment from "moment";

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
                    dataIndex: 'attributes.thub',
                    width: 150,
                    key: 'thub',
                    title: 'Hình ảnh',
                    scopedSlots: { customRender: 'images' },
                },{
                    dataIndex: 'attributes.name',
                    key: 'title',
                    title: 'Tên',
                    sorter: true
                },{
                    title: 'Địa chỉ',
                    dataIndex: 'attributes.address',
                    width: 250,
                    align: 'center',
                    key: 'address',
                    sorter: true
                },{
                    title: 'Số điện thoại',
                    dataIndex: 'attributes.phone',
                    width: 150,
                    align: 'center',
                    key: 'phone',
                    sorter: true
                },{
                    title: 'Giờ hoạt động',
                    dataIndex: 'attributes.time',
                    width: 190,
                    align: 'center',
                    key: 'time',
                    sorter: true
                },{
                    title: 'Sắp xếp',
                    width: 120,
                    align: 'center',
                    dataIndex: 'attributes.order',
                    sorter: true,
                    key: 'order',
                },{
                    title: 'Trạng thái',
                    dataIndex: 'attributes.state',
                    width: 130,
                    align: 'center',
                    scopedSlots: { customRender: 'state' },
                    key: 'state',
                    sorter: true
                },{
                    title: 'Action',
                    width: 230,
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            filter: {},
            sort: [],
            modalOpen: false,
            modalType: 'create',
            current: {},
            loading: false
        };
    },
    computed: {
        ...mapGetters({
            listItem: "place/getListAdmin"
        })
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            getListAdmin: "place/getListAdmin",
            updatePlace: "place/updatePlace"
        }),
        loadData: async function () {
            this.loading = true
            await this.getListAdmin({
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination? this.listItem.pagination.pageSize : 10
                }
            })
            this.loading = false
        },
        activePlace: async function (id) {
            let _data = {
                state: 'active'
            }
            let rs = await this.updatePlace({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Active địa điểm thành công');
            } else {
                this.$message.error('Active địa điểm thất bại');
            }
        },
        deletedPlace: async function (id) {
            let _data = {
                state: 'deleted'
            }
            let rs = await this.updatePlace({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Xoá địa điểm thành công');
            } else {
                this.$message.error('Xoá địa điểm thất bại');
            }
        },
        onRefresh: async function () {
            this.filter = {}
            this.sort = []
            this.onFilter()
        },
        onFilter: async function () {
            this.loading = true
            let filters = {}
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            await this.getListAdmin({
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination? this.listItem.pagination.pageSize : 10
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
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            if(_s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListAdmin({
                pagination: {
                    page: _p.current,
                    pageSize: 10
                },
                filters,
                sort: this.sort
            })
            this.loading = false
        },
        onAddNew: function () {
            this.current = {}
            this.modalOpen = true
            this.modalType = 'create'
        },
        onEdit: async function (item) {
            this.current = item
            this.modalOpen = true
            this.modalType = 'edit'
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