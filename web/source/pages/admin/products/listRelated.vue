<template>
    <div>
        <a-table bordered :columns="columns" :data-source="list_data" :row-key="record => record.id" :scroll="{ x: 1000 }">
            <span slot="check" slot-scope="check, record">
                <a-checkbox :checked="record.had" @change="(e) => onChange(e.target.checked, record)" />
            </span>
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
        </a-table>
    </div>
</template>
<script>
import general from "~/mixins/general";
import { mapGetters, mapActions } from "vuex";

export default {
    mixins: [general],
    props: {
        product_id: {
            type: Number,
            default: null
        },
        listRelated: {
            type: Object,
            default: {
                data: [],
                pagination: {}
            }
        }
    },
    mounted() {
        if (this.list_data.length === 0) {
            this.list_data = this.listRelated.data.filter(o => o.id !== this.product_id)
            this.list_related_id = []
            for (let i = 0; i < this.list_data.length; i++) {
                if (this.checkIdRelated(this.list_data[i])) {
                    this.list_data[i].had = true
                    this.list_related_id.push(this.list_data[i].id)
                }
            }
        }
    },
    watch: {
        product_id: function (val) {
            this.list_data = this.listRelated.data?.filter(o => o.id !== this.product_id)
            this.list_related_id = []
            for (let i = 0; i < this.list_data.length; i++) {
                this.list_data[i].had = false
                if (this.checkIdRelated(this.list_data[i])) {
                    this.list_data[i].had = true
                    this.list_related_id.push(this.list_data[i].id)
                }
            }
        },
        listRelated: function (val) {
            this.list_data = this.listRelated.data?.filter(o => o.id !== this.product_id)
            this.list_related_id = []
            for (let i = 0; i < this.list_data.length; i++) {
                this.list_data[i].had = false
                if (this.checkIdRelated(this.list_data[i])) {
                    this.list_data[i].had = true
                    this.list_related_id.push(this.list_data[i].id)
                }
            }
        },
    },
    data() {
        return {
            list_data: [],
            columns: [
                {
                    dataIndex: 'id',
                    key: 'id',
                    title: ' ',
                    width: 50,
                    fixed: 'left',
                    scopedSlots: { customRender: 'check' },

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
            ],
            list_related_id: []
        };
    },
    methods: {
        ...mapActions({
            updateProduct: "product/updateProduct"
        }),
        checkIdRelated(items) {
            let _item = items.attributes.products.data?.find(o => o.id === this.product_id)
            if (_item && _item.id) {
                return true
            } else {
                return false
            }
        },
        async onChange(check, _item) {
            if (check) {
                this.list_related_id.push(_item.id)
                let _data = {
                    related: this.list_related_id
                }
                let rs = await this.updateProduct({
                    id: this.product_id,
                    data: _data
                })
                this.$emit('onReloadRelated')
                if (rs) {
                    this.$message.success('Thêm sản phầm dùng kèm thành công');
                } else {
                    this.$message.error('Thêm sản phầm dùng kèm thất bại');
                }
            } else {
                let _temp = this.list_related_id.filter(o=> o !== _item.id)
                let _data = {
                    related: _temp
                }
                let rs = await this.updateProduct({
                    id: this.product_id,
                    data: _data
                })
                this.$emit('onReloadRelated')
                if (rs) {
                    this.$message.success('Xóa sản phầm dùng kèm thành công');
                } else {
                    this.$message.error('Xóa sản phầm dùng kèm thất bại');
                }
            }
        }
        // deleteMedia(id) {
        //     this.$emit('onDeleteMedia', id)
        // }
    }

};
</script>
<style></style>