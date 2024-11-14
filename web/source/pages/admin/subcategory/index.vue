<template>
    <div class="admin-club-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tiêu đề</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tiêu đề bài viết"
                                    v-model="filter.search" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Chuyên mục</a-col>
                            <a-col :span="17">
                                <a-select style="width: 100%" @change="(e) => this.filter['category'] = e" allowClear>
                                    <a-select-option value="skincare">
                                        Chăm sóc da
                                    </a-select-option>
                                    <a-select-option value="news">
                                        Tin tức
                                    </a-select-option>
                                    <a-select-option value="knowledge">
                                        Kiến thức
                                    </a-select-option>
                                </a-select>
                            </a-col>
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
            <span slot="category" slot-scope="categories">
                <div v-for="cate in categories" :key="cate.id">{{ cate.attributes.name }}</div>
            </span>
            <span slot="subcategory" slot-scope="subcategory">
                <div v-for="cate in subcategory" :key="cate.id">{{ cate.attributes.name }}</div>
            </span>
            <span slot="price" slot-scope="price">
                $ {{ price | numberWithCommas }}
            </span>
            <span slot="state" slot-scope="state">
                <a-tag color="green" v-if="state === 'active'">Active</a-tag>
                <a-tag color="red" v-else>Deleted</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <a-button @click="deletedClub(record.id)" class="admin-btn" type="danger"
                    v-if="record?.attributes?.state === 'active'">Xoá</a-button>
                <a-button @click="activeClub(record.id)" class="admin-btn" ghost type="danger" v-else>Khôi phục</a-button>
            </span>
        </a-table>
        <a-modal title="Thông tin club aura" :visible="modalOpen" :footer="null" width="1400px" @cancel="() => this.modalOpen = false">
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
                    dataIndex: 'attributes.title',
                    key: 'title',
                    title: 'Tiêu đề',
                    sorter: true
                },{
                    title: 'Chuyên mục',
                    dataIndex: 'attributes.category',
                    width: 150,
                    align: 'center',
                    key: 'category',
                    sorter: true
                },{
                    title: 'Nội dung',
                    dataIndex: 'attributes.short_content',
                    key: 'short_content',
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
            listItem: "club/getListClubAdmin"
        })
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            getListClubAdmin: "club/getListClubAdmin",
            updateClub: "club/updateClub"
        }),
        loadData: async function () {
            this.loading = true
            await this.getListClubAdmin({
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination? this.listItem.pagination.pageSize : 10
                }
            })
            this.loading = false
        },
        activeClub: async function (id) {
            let _data = {
                state: 'active'
            }
            let rs = await this.updateClub({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Active club thành công');
            } else {
                this.$message.error('Active club thất bại');
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
            if (this.filter.search) {
                filters['title'] = { $containsi: this.filter.search }
            }
            if (this.filter.category) {
                filters['category'] = { $eq: this.filter.category }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            await this.getListClubAdmin({
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
            if (this.filter.search) {
                filters['title'] = { $containsi: this.filter.search }
            }
            if (this.filter.category) {
                filters['category'] = { $eq: this.filter.category }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            if(_s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListClubAdmin({
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