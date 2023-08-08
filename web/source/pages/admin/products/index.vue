<template>
    <div class="admin-product-container">
        <a-collapse bordered style="margin-bottom: 10px;">
            <a-collapse-panel key="1" header="Tiêu chí lọc">
                <a-row>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Tên</a-col>
                            <a-col :span="17"><a-input placeholder="Nhập tên sản phẩm" v-model="filter.search" /></a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Chuyên mục</a-col>
                            <a-col :span="17">
                                <a-select style="width: 100%" @change="(e) => this.filter['categories'] = e" allowClear>
                                    <a-select-option :value="_cate.id" v-for="(_cate, idx) in listCategory" :key="idx">
                                        {{ _cate.attributes.name }}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="8" style="margin-bottom: 10px;">
                        <a-row>
                            <a-col :span="6">Chuyên mục con</a-col>
                            <a-col :span="17">
                                <a-select style="width: 100%" @change="(e) => this.filter['subcategories'] = e" allowClear>
                                    <a-select-option :value="_cate.id" v-for="(_cate, idx) in listSubcategory" :key="idx">
                                        {{ _cate.attributes.name }}
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
            :loading="loading" @change="handleRefesh" :row-key="record => record.id" :scroll="{ x: 1000 }">
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
                {{ price | numberWithCommas }}{{ ' ' }}đ
            </span>
            <span slot="state" slot-scope="state">
                <a-tag color="green" v-if="state === 'active'">Active</a-tag>
                <a-tag color="red" v-else>Deleted</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <a-button @click="deletedProduct(record.id)" class="admin-btn" type="danger"
                    v-if="record?.attributes?.state === 'active'">Xoá</a-button>
                <a-button @click="activeProduct(record.id)" class="admin-btn" ghost type="danger" v-else>Khôi
                    phục</a-button>
            </span>
        </a-table>
        <a-modal title="Thông tin sản phẩm" :visible="modalOpen" :footer="null" width="1400px"
            @cancel="() => this.modalOpen = false">
            <Detail :item="current" :modalType="modalType" :listRelated="listRelated" @onReloadRelated="onReloadRelated"
                @onCancel="() => this.modalOpen = false" @onReload="() => this.onRefresh()" />
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
                    dataIndex: 'id',
                    key: 'id',
                    title: 'Id',
                    sorter: true,
                    width: 70,
                    fixed: 'left',
                },
                {
                    dataIndex: 'attributes.thub',
                    key: 'thub',
                    title: 'Hình ảnh',
                    width: 150,
                    fixed: 'left',
                    scopedSlots: { customRender: 'images' },
                },
                {
                    dataIndex: 'attributes.name',
                    sorter: true,
                    key: 'name',
                    width: 250,
                    fixed: 'left',
                    title: 'Tên sản phẩm'
                },
                {
                    dataIndex: 'attributes.description',
                    key: 'description',
                    width: 250,
                    title: 'Mô tả'
                },
                {
                    title: 'Chuyên mục',
                    dataIndex: 'attributes.categories.data',
                    scopedSlots: { customRender: 'category' },
                    width: 150,
                    key: 'categories',
                },
                {
                    title: 'Chuyên mục con',
                    dataIndex: 'attributes.subcategories.data',
                    scopedSlots: { customRender: 'subcategory' },
                    width: 150,
                    key: 'subcategories',
                },
                {
                    title: 'Giá',
                    sorter: true,
                    dataIndex: 'attributes.price',
                    scopedSlots: { customRender: 'price' },
                    width: 150,
                    key: 'price',
                }, {
                    dataIndex: 'attributes.sold',
                    sorter: true,
                    key: 'sold',
                    width: 140,
                    title: 'Đã bán'
                }, {
                    dataIndex: 'attributes.order',
                    sorter: true,
                    width: 100,
                    key: 'order',
                    title: 'Vị trí'
                },
                {
                    title: 'Trạng thái',
                    sorter: true,
                    width: 130,
                    dataIndex: 'attributes.state',
                    scopedSlots: { customRender: 'state' },
                    key: 'state',
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 240,
                    fixed: 'right',
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
            listItem: "product/getListProductAdmin",
            listCategory: "category/getListCategory",
            listSubcategory: "category/getListSubCategory",
            listRelated: "product/getListProductRelated"
        })
    },
    mounted() {
        this.loadData();
        this.getListCategory();
        this.getListSubCategory();
        this.getListTip();
        this.getListProductRelated({
            pagination: {
                page: 1,
                pageSize: 100
            }
        })
    },
    methods: {
        ...mapActions({
            getListCategory: "category/getListCategory",
            getListSubCategory: "category/getListSubCategory",
            getListTip: "product/getListTip",
            getListProductAdmin: "product/getListProductAdmin",
            getListProductRelated: "product/getListProductRelated",
            updateProduct: "product/updateProduct"
        }),
        loadData: async function () {
            this.loading = true
            await this.getListProductAdmin({
                sort: ['id:desc'],
                pagination: {
                    page: this.listItem.pagination ? this.listItem.pagination.page : 1,
                    pageSize: this.listItem.pagination ? this.listItem.pagination.pageSize : 10
                }
            })
            this.loading = false
        },
        activeProduct: async function (id) {
            let _data = {
                state: 'active'
            }
            let rs = await this.updateProduct({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Active sản phẩm thành công');
            } else {
                this.$message.error('Active sản phẩm thất bại');
            }
        },
        deletedProduct: async function (id) {
            let _data = {
                state: 'deleted'
            }
            let rs = await this.updateProduct({
                id,
                data: _data
            })
            this.loadData()
            if (rs) {
                this.$message.success('Xoá sản phẩm thành công');
            } else {
                this.$message.error('Xoá sản phẩm thất bại');
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
                filters['name'] = { $containsi: this.filter.search }
            }
            if (this.filter.categories) {
                filters['categories'] = { id: { $eq: this.filter.categories } }
            }
            if (this.filter.subcategories) {
                filters['subcategories'] = { id: { $eq: this.filter.subcategories } }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            await this.getListProductAdmin({
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
            if (this.filter.search) {
                filters['name'] = { $containsi: this.filter.search }
            }
            if (this.filter.categories) {
                filters['categories'] = { $eq: this.filter.categories }
            }
            if (this.filter.subcategories) {
                filters['subcategories'] = { $eq: this.filter.subcategories }
            }
            if (this.filter.state) {
                filters['state'] = { $eq: this.filter.state }
            }
            if (_s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            await this.getListProductAdmin({
                pagination: {
                    page: _p.current,
                    pageSize: 10
                },
                filters,
                sort: this.sort
            })
            this.loading = false
        },
        onReloadRelated() {
            this.getListProductRelated({
                pagination: {
                    page: 1,
                    pageSize: 100
                }
            })
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