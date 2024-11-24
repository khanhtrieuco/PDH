<template>
    <div class="admin-club-container">
        <a-button class="admin-btn" type="primary" style="margin-top: -5px;margin-bottom: 10px;" @click="onAddNew">Tạo mới</a-button>
        <a-table v-if="listItem" bordered :columns="columns" :data-source="listItem"
            :loading="loading" :row-key="record => record.id">
            <span slot="images" slot-scope="images">
                <ThumbImage ratio="16-9" :srcImg="images?.data?.attributes?.url"></ThumbImage>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <a-popconfirm title="Bạn chắc có muốn xóa không?" ok-text="Yes" cancel-text="No" @confirm="deletedItem(record.id)">
                    <a-button class="admin-btn" type="danger">Xoá</a-button>
                </a-popconfirm>
            </span>
        </a-table>
        <a-modal title="Thông tin sub menu" :visible="modalOpen" :footer="null" width="1400px"
            @cancel="() => this.modalOpen = false">
            <DetailItem :item="current" :parent_id="id" :modalType="modalType" :modalOpen="modalOpen"
            @onCancel="() => this.modalOpen = false" @onReload="() => this.$emit('onReload')"/>
        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import general from "~/mixins/general";
import DetailItem from "./detailSub.vue"

//   import moment from "moment";

export default {
    layout: "admin",
    mixins: [general],
    components: {
        DetailItem
    },
    props: {
        id: {
            type: Number,
            default: null,
        },
        listItem: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            columns: [
                {
                    dataIndex: 'attributes.name',
                    key: 'title',
                    width: 250,
                    title: 'Tên',
                    sorter: true
                }, {
                    title: 'Loại',
                    dataIndex: 'attributes.type',
                    width: 100,
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
    methods: {
        ...mapActions({
            updateItem: "collectionCate/updateItem",
            deleteItem: "collectionCate/deleteItem"
        }),
        onAddNew: function () {
            this.current = {}
            this.modalOpen = true
            this.modalType = 'create'
        },
        onEdit: async function (item) {
            this.current = item
            this.modalOpen = true
            this.modalType = 'edit'
        },
        deletedItem: async function (id) {
            let rs = await this.deleteItem({ id })
            if (rs) {
                this.$message.success('Cập nhật menu thành công');
                this.$emit('onReload')
                this.$emit('onCancel')
            } else {
                this.$message.error('Cập nhật menu không thành công! Xin thử lại sau!');
            }
        }
    }
};
</script>
<style lang="scss" scoped></style>