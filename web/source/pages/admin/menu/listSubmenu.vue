<template>
    <div class="admin-club-container">
        <a-button class="admin-btn" type="primary" style="margin-top: -5px;margin-bottom: 10px;" @click="onAddNew">Tạo mới</a-button>
        <a-table v-if="listItem" bordered :columns="columns" :data-source="listItem"
            :loading="loading" :row-key="record => record.id">
            <span slot="images" slot-scope="images">
                <ThumbImage ratio="16-9" :src="images?.data?.attributes?.url"></ThumbImage>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button class="admin-btn" type="primary" @click="onEdit(record)">Cập nhật</a-button>
                <a-button @click="deletedItem(record.id)" class="admin-btn" type="danger">Xoá</a-button>
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
            updateItem: "collectionCate/updateItem"
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
        }
    }
};
</script>
<style lang="scss" scoped></style>