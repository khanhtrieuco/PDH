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
                            @click="onFilter">Lọc</a-button>
                    </a-col>
                </a-row>
                <a-button slot="extra" class="admin-btn" type="primary" style="margin-top: -5px;" @click="onAddNew">
                    Tạo mới</a-button>
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
        <a-modal title="Thông tin bộ sưu tập" :visible="modalOpen" :footer="null" width="1400px"
            @cancel="() => this.modalOpen = false">
            <Detail :item="current" :listMenu="listMenu" :modalType="modalType" @onCancel="() => this.modalOpen = false"
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
                    key: 'name',
                    title: 'Tên',
                    sorter: true
                }, {
                    title: 'Chuyên mục',
                    dataIndex: 'attributes.collection_cate.data.attributes.name',
                    width: 150,
                    align: 'center',
                    // key: 'collection_cate',
                    sorter: true
                },{
                    title: 'Sắp xếp',
                    width: 120,
                    align: 'center',
                    dataIndex: 'attributes.order',
                    sorter: true,
                    key: 'order',
                }, {
                    title: 'Trạng thái',
                    dataIndex: 'attributes.state',
                    width: 130,
                    align: 'center',
                    scopedSlots: { customRender: 'state' },
                    key: 'state',
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
            loading: false,
            listMenu: []
        };
    },
    computed: {
        ...mapGetters({
            listItem: "collection/getListItem"
        })
    },
    async mounted() {
        this.loadData();
        let temp = await this.getListItemSub({ filters : { type : 'sub' } })
        this.listMenu = temp.map(o=> {return {
            value: o.id,
            text: o.attributes.name
        }})
    },
    methods: {
        ...mapActions({
            getListItem: "collection/getListItem",
            updateItem: "collection/updateItem",
            getListItemSub: "collectionCate/getListItemSub",
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
                this.$message.success('Active Item thành công');
            } else {
                this.$message.error('Active Item thất bại');
            }
        },
        deletedClub: async function (id) {
            let _data = {
                state: 'deleted'
            }
            let rs = await this.updateClub({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Xoá club thành công');
            } else {
                this.$message.error('Xoá club thất bại');
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
            let filters = {}
            let sort = []
            if (this.filter.name) {
                filters['name'] = { $containsi: this.filter.name }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
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