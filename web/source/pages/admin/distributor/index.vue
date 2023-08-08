<template>
    <div class="admin-user-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tên đối tác</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tên đối tác" v-model="filter.name" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Email</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập email đối tác" v-model="filter.email" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Số điện thoại</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập số điện thoại đối tác" v-model="filter.phone" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Trạng thái</a-col>
                            <a-col :span="17">
                                <a-select style="width: 100%" @change="(e) => this.filter['state'] = e" allowClear>
                                    <a-select-option value="new">
                                        Mới
                                    </a-select-option>
                                    <a-select-option value="done">
                                        Đã xử lý
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
        <a-table bordered :columns="columns" :data-source="listDistributor.data" :pagination="listDistributor.pagination"
            :loading="loading" @change="handleRefesh" :row-key="record => record.id">
            <span slot="state" slot-scope="state">
                <a-tag color="red" v-if="!state">Mới</a-tag>
                <a-tag color="red" v-if="state === 'new'">Mới</a-tag>
                <a-tag color="green" v-if="state === 'done'">Đã xử lý</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button @click="onDoneSupport(record.id)" class="admin-btn"
                type="primary" v-if="!record.state || state === 'new'">Xử lý</a-button>
            </span>
        </a-table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//   import general from "~/mixins/general";
//   import moment from "moment";

export default {
    layout: "admin",
    data() {
        return {
            columns : [
                {
                    title: 'Tên đối tác',
                    dataIndex: 'attributes.name',
                    key: 'name',
                },
                {
                    title: 'Email',
                    dataIndex: 'attributes.email',
                    key: 'email',
                },
                {
                    title: 'Số điện thoại',
                    dataIndex: 'attributes.phone',
                    key: 'phone',
                },
                {
                    title: 'Công ty',
                    dataIndex: 'attributes.company',
                    key: 'company',
                },
                {
                    title: 'Nghề nghiệp',
                    dataIndex: 'attributes.job',
                    key: 'job',
                },
                {
                    title: 'Địa chỉ',
                    dataIndex: 'attributes.address',
                    key: 'address',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'attributes.state',
                    key: 'state',
                    scopedSlots: { customRender: 'state' },
                },
                {
                    title: 'Ngày tạo',
                    dataIndex: 'attributes.createdAt',
                    key: 'createdAt',
                },
                {
                    title: 'Action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            filter: {},
            sort: [],
            modalOpen: false,
            current: {},
            loading: false
        };
    },
    computed: {
        ...mapGetters({
            listDistributor: "distributor/getListDistributor"
        })
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            getListDistributor: "distributor/getListDistributor",
            updateDistributor: "distributor/updateDistributor"
        }),
        onRefresh: async function () {
            this.filter = {}
            this.sort = []
            this.onFilter()
        },
        handleRefesh: async function (_p, _f, _s) {
            this.loading = true
            let filters = {}
            let sort = []
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            if (this.filter.email) {
                filters['email'] = { $containsi: this.filter.email }
            }
            if (this.filter.phone) {
                filters['phone'] = { $containsi: this.filter.phone }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            if(_s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListDistributor({
                pagination: {
                    page: _p.current,
                    pageSize: 10
                },
                filters,
                sort: this.sort
            })
            this.loading = false
        },
        onFilter: async function () {
            this.loading = true
            let filters = {}
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            if (this.filter.email) {
                filters['email'] = { $containsi: this.filter.email }
            }
            if (this.filter.phone) {
                filters['phone'] = { $containsi: this.filter.phone }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            await this.getListDistributor({
                pagination: {
                    page: this.listDistributor.pagination ? this.listDistributor.pagination.page : 1,
                    pageSize: this.listDistributor.pagination? this.listDistributor.pagination.pageSize : 10
                },
                filters,
                sort: this.sort
            })
            this.loading = false
        },
        loadData: async function () {
            this.loading = true
            await this.getListDistributor({
                pagination: {
                    page: this.listDistributor.pagination ? this.listDistributor.pagination.page : 1,
                    pageSize: this.listDistributor.pagination? this.listDistributor.pagination.pageSize : 10
                }
            })
            this.loading = false
        },
        onDoneSupport: async function(id) {
            let _data = {
                state: 'done'
            }
            let rs = await this.updateDistributor({
                id,
                data: _data
            })
            this.loadData()
            if(rs) {
                this.$message.success('Cập nhật thành công');
            } else {
                this.$message.error('Cập nhật thất bại');
            }
        },
    }
};
</script>
<style lang="less" scoped></style>