<template>
    <div>
        <a-button class="admin-btn" type="primary" style="margin-top: -5px;" @click="onAddNew">
            Tạo mới</a-button>
        <a-table bordered :columns="columns" :data-source="listVariant.data" :row-key="record => record.id"
            :scroll="{ x: 1000 }">
            <span slot="state" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <a-button @click="deletedItem(record.id)" class="admin-btn" type="danger"
                    v-if="record?.attributes?.state === 'active'">Xoá</a-button>
                <a-button @click="activeItem(record.id)" class="admin-btn" ghost type="danger" v-else>Khôi
                    phục</a-button>
            </span>
        </a-table>
        <a-modal title="Thông tin biến thể" :visible="modalOpen" :footer="null" width="1000px"
            @cancel="() => this.modalOpen = false">
            <Detail :item="current" :modalType="modalType" :product_id="product_id"
                @onCancel="() => this.modalOpen = false" @onReload="() => this.onRefresh()" />
        </a-modal>
    </div>
</template>
<script>
import general from "~/mixins/general";
import { mapGetters, mapActions } from "vuex";
import Detail from "./variant.vue"

export default {
    mixins: [general],
    components: {
        Detail,
    },
    props: {
        product_id: {
            type: Number,
            default: null
        },
    },
    computed: {
        ...mapGetters({
            listVariant: "variant/getListItem",
            // listSubcategory: "category/getListSubCategory",
            // listTip: "product/getListTip",
        })
    },
    mounted() {
        this.getListVariant({
            filters: { product: this.product_id },
            pagination: {
                page: 1,
                pageSize: 50
            }
        })
    },
    watch: {
        product_id: function (val) {
            this.getListVariant({
                filters: { product: val },
                pagination: {
                    page: 1,
                    pageSize: 50
                }
            })
        },
    },
    data() {
        return {
            columns: [
                {
                    dataIndex: 'id',
                    key: 'id',
                    title: 'Id',
                    width: 50,
                    fixed: 'left'
                },
                {
                    dataIndex: 'attributes.name',
                    sorter: true,
                    key: 'name',
                    fixed: 'left',
                    title: 'Tên sản phẩm'
                },
                {
                    dataIndex: 'attributes.sku_code',
                    sorter: true,
                    key: 'sku_code',
                    width: 150,
                    fixed: 'left',
                    title: 'Sku'
                },
                {
                    title: 'Kích thước',
                    dataIndex: 'attributes.size.data.attributes.name',
                    width: 150,
                    key: 'size',
                },
                {
                    title: 'Màu sắc',
                    dataIndex: 'attributes.color.data.attributes.name',
                    width: 150,
                    key: 'color',
                },
                {
                    title: 'Tồn kho',
                    sorter: true,
                    dataIndex: 'attributes.inventory',
                    width: 150,
                    key: 'inventory',
                }, {
                    title: 'Đã bán',
                    sorter: true,
                    dataIndex: 'attributes.sold',
                    width: 150,
                    key: 'sold',
                },
                {
                    title: 'Trạng thái',
                    sorter: true,
                    width: 250,
                    dataIndex: 'attributes.state',
                    scopedSlots: { customRender: 'state' },
                    key: 'state',
                },
            ],
            filter: {},
            sort: [],
            modalOpen: false,
            modalType: 'create',
            current: {},
            loading: false,
        };
    },
    methods: {
        ...mapActions({
            getListVariant: "variant/getListItem",
            updateItem: "variant/updateItem",
        }),
        activeItem: async function (id) {
            let _data = {
                state: 'active'
            }
            let rs = await this.updateItem({
                id,
                data: _data
            })
            this.onRefresh()
            if (rs) {
                this.$message.success('Active biến thể thành công');
            } else {
                this.$message.error('Active biến thể thất bại');
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
            this.onRefresh()
            if (rs) {
                this.$message.success('Xoá biến thể thành công');
            } else {
                this.$message.error('Xoá biến thể thất bại');
            }
        },
        onRefresh: async function () {
            this.filter = {}
            this.sort = []
            this.handleRefesh()
        },
        handleRefesh: async function (_p, _f, _s) {
            this.loading = true
            let sort = []
            if (_s && _s.order) {
                sort.push(`${_s.columnKey}:${_s.order === "ascend" ? 'asc' : 'desc'}`)
                this.sort = sort
            }
            this.getListVariant({
                filters: { product: this.product_id },
                sort: this.sort,
                pagination: {
                    page: 1,
                    pageSize: 50
                }
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
<style></style>