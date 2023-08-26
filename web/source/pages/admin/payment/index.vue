<template>
    <div class="admin-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tên</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tên" v-model="filter.name" /></a-col>
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
                            @click="handleRefesh">Lọc</a-button>
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
                <a-button @click="deletedItem(record.id)" class="admin-btn" type="danger"
                    v-if="record?.attributes?.state === 'active'">Xoá</a-button>
                <a-button @click="activeItem(record.id)" class="admin-btn" ghost type="danger" v-else>Khôi phục</a-button>
            </span>
        </a-table>
        <a-modal title="Thông tin thanh toán" :visible="modalOpen" :footer="null" width="1400px"
            @cancel="() => this.modalOpen = false">
            <Detail :item="current" :modalType="modalType" @onCancel="() => this.modalOpen = false"
                @onReload="() => this.onRefresh()" />
        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import general from "~/mixins/general";
import Detail from "./detail.vue"

export default {
    layout: "admin",
    mixins: [general],
    components: {
        Detail,
    },
    data() {
        return {
            columns: [
                {
                    dataIndex: 'attributes.thub',
                    key: 'thub',
                    title: 'Hình ảnh',
                    width: 150,
                    fixed: 'left',
                    scopedSlots: { customRender: 'images' },
                }, {
                    dataIndex: 'attributes.name',
                    key: 'name',
                    title: 'Tên',
                    sorter: true
                }, {
                    title: 'Mô tả',
                    dataIndex: 'attributes.description',
                    width: 200,
                    align: 'center',
                    key: 'description',
                    sorter: true
                }, {
                    title: 'Trạng thái',
                    dataIndex: 'attributes.state',
                    width: 130,
                    align: 'center',
                    scopedSlots: { customRender: 'state' },
                    key: 'state',
                    sorter: true
                }, {
                    title: 'Sắp xếp',
                    width: 120,
                    align: 'center',
                    dataIndex: 'attributes.order',
                    sorter: true,
                    key: 'order',
                }, {
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
            listItem: "payment/getListItem"
        })
    },
    async mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            getListItem: "payment/getListItem",
            updateItem: "payment/updateItem",
        }),
        loadData: async function () {
            this.loading = true
            await this.getListItem({
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination ? this.listItem.pagination.pageSize : 10
                }
            })
            this.loading = false
        },
        activeItem: async function (id) {
            let _data = {
                state: 'active'
            }
            let rs = await this.updateItem({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Active thành công');
            } else {
                this.$message.error('Active thất bại');
            }
        },
        deletedItem: async function (id) {
            let _data = {
                state: 'deleted'
            }
            let rs = await this.updateItem({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Xoá thành công');
            } else {
                this.$message.error('Xoá thất bại');
            }
        },
        onRefresh: async function () {
            this.filter = {}
            this.sort = []
            this.handleRefesh()
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
            if (_s && _s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListItem({
                pagination: {
                    page: _p ? _p.current : 1,
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
    }
};
</script>
<style lang="scss" scoped></style>