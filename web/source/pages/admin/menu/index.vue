<template>
    <div class="admin-club-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tên</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tên" v-model="filter.name" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="24" style="float: right;">
                        <a-button style="float: right;" class="admin-btn" type="danger" @click="onRefresh">Huỷ</a-button>
                        <a-button style="float: right;margin-right: 10px;" class="admin-btn" type="primary"
                            @click="onFilter">Lọc</a-button>
                    </a-col>
                </a-row>
                <!-- <a-button slot="extra" class="admin-btn" type="primary" style="margin-top: -5px;" @click="onAddNew">Tạo
                    mới</a-button> -->
            </a-collapse-panel>
        </a-collapse>
        <a-table v-if="listItem" bordered :columns="columns" :data-source="listItem.data" :pagination="listItem.pagination"
            :loading="loading" @change="handleRefesh" :row-key="record => record.id">
            <span slot="images" slot-scope="images">
                <ThumbImage ratio="16-9" :src="images?.data?.attributes?.url"></ThumbImage>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <!-- <a-button @click="deletedItem(record.id)" class="admin-btn" type="danger">Xoá</a-button> -->
            </span>
        </a-table>
        <a-modal title="Thông tin menu" :visible="modalOpen" :footer="null" width="1400px"
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
                    dataIndex: 'attributes.name',
                    key: 'title',
                    title: 'Tên',
                    sorter: true
                }, {
                    title: 'Loại',
                    dataIndex: 'attributes.type',
                    width: 250,
                    align: 'center',
                    key: 'type',
                    sorter: true
                },
                {
                    title: 'Vị trí',
                    dataIndex: 'attributes.order',
                    width: 150,
                    align: 'center',
                    key: 'order',
                    sorter: true
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
            listItem: "collectionCate/getListItem"
        })
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        ...mapActions({
            getListItem: "collectionCate/getListItem",
            updateItem: "collectionCate/updateItem"
        }),
        loadData: async function () {
            this.loading = true
            let filters = { type : 'main' }

            await this.getListItem({
                filters,
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination ? this.listItem.pagination.pageSize : 10
                }
            })
            this.loading = false
        },
        // deletedPlace: async function (id) {
        //     let _data = {
        //         state: 'deleted'
        //     }
        //     let rs = await this.updatePlace({
        //         id,
        //         data: _data
        //     })
        //     this.loadData()
        //     if (rs) {
        //         this.$message.success('Xoá địa điểm thành công');
        //     } else {
        //         this.$message.error('Xoá địa điểm thất bại');
        //     }
        // },
        onRefresh: async function () {
            this.filter = {}
            this.sort = []
            this.onFilter()
        },
        onFilter: async function () {
            this.loading = true
            let filters = { type : 'main' }
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            await this.getListItem({
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
            let filters = { type : 'main' }
            let sort = []
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            if (_s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListItem({
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
    }
};
</script>
<style lang="scss" scoped></style>