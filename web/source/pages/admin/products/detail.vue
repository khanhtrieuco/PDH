<template>
    <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Thông tin chi tiết">
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
                labelAlign="left">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item ref="name" label="Tên sản phẩm" prop="name">
                            <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="description" label="Mô tả" prop="description">
                            <a-input v-model="form.description" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"
                                @blur="() => { $refs.description.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <!-- <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="name_en" label="Tên tiếng anh" prop="name_en">
                            <a-input v-model="form.name_en" />
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :span="12">
                        <a-form-model-item label="Sku code" prop="sku_code">
                            <a-input v-model="form.sku_code" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Bộ sưu tập" prop="collection">
                            <Select :default="form.collection" placeholder="Chọn bộ sưu tập" :listItem="listCollection"
                                @onSelect="(e) => form.collection = e" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Hình đại diện">
                            <upload-image :thub.sync="form.thub" :thubLink="item?.attributes?.thub.data?.attributes.url" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Hình hover">
                            <upload-image :thub.sync="form.thub_main"
                                :thubLink="item?.attributes?.thub_main.data?.attributes.url" />
                        </a-form-model-item>
                    </a-col>
                   
                    <!-- <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="description_en" label="Mô tả tiếng anh" prop="description_en">
                            <a-input v-model="form.description_en" type="textarea"
                                :auto-size="{ minRows: 3, maxRows: 5 }" />
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :span="12">
                        <a-form-model-item ref="material" label="Nguyên liệu" prop="material">
                            <a-input v-model="form.material" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"
                                @blur="() => { $refs.material.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <!-- <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="material_en" label="Nguyên liệu tiếng anh" prop="material_en">
                            <a-input v-model="form.material_en" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :span="12">
                        <a-form-model-item ref="care" label="Chăm sóc" prop="care">
                            <a-input v-model="form.care" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"
                                @blur="() => { $refs.care.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <!-- <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="care_en" label="Chăm sóc tiếng anh" prop="care_en">
                            <a-input v-model="form.care_en" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :span="12">
                        <a-form-model-item label="Giá" prop="price">
                            <a-input v-model="form.price" type="number" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Vị trí hiển thị" prop="order">
                            <a-input v-model="form.order" type="number" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 20 }">
                    <a-button v-if="modalType === 'create'" type="primary" @click="onSubmitAdd">
                        Tạo mới
                    </a-button>
                    <a-button v-else type="primary" @click="onSubmitUpdate">
                        Cập nhật
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="() => this.$emit('onCancel')">
                        Huỷ
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Danh sách hình ảnh" force-render v-if="modalType === 'edit'">
            <ListMedia :list_media="list_media" @onAddMedia="(items) => onAddMedia(items)"
                @onDeleteMedia="(id) => onDeleteMedia(id)" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Danh sách biến thể" force-render v-if="modalType === 'edit'">
            <ListVariant :product_id="item?.id"/>
        </a-tab-pane>
        <!-- <a-tab-pane key="4" tab="Sản phẩm liên quan" force-render v-if="modalType === 'edit'">
            <ListRelated :listRelated="listRelated" :product_id="item?.id" @onReloadRelated="onReloadRelated" />
        </a-tab-pane> -->

    </a-tabs>
</template>
<script>

import general from "~/mixins/general";
import { mapActions, mapGetters } from 'vuex'
import ListMedia from "./listMedia.vue"
import Select from "~/components/admin/select.vue"
import ListVariant from "./listVariant.vue"
import ListRelated from "./listRelated.vue"
export default {
    mixins: [general],
    components: {
        ListMedia,
        Select,
        ListVariant,
        ListRelated
    },
    computed: {
        ...mapGetters({
            // listVariant: "variant/getListItem",
            // listSubcategory: "category/getListSubCategory",
            // listTip: "product/getListTip",
        })
    },
    props: {
        item: {
            type: Object,
            default: {},
        },
        modalType: {
            type: String,
            default: 'create'
        },
        listCollection: {
            type: Array,
            default() {
                return []
            }
        },
        // listRelated: {
        //     type: Object,
        //     default: {
        //         data: [],
        //         pagination: {}
        //     }
        // }
    },
    data() {
        return {
            form: {
                name: undefined,
                name_en: undefined,
                description: undefined,
                description_en: undefined,
                material: undefined,
                material_en: undefined,
                care: undefined,
                care_en: undefined,
                thub: undefined,
                thub_main: undefined,
                media: undefined,
                order: 0,
                price: 0,
                price_primary: 0,
                sku_code: undefined,
                collection: undefined
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                description: [{ required: true, message: 'Mô tả không thể để trống', trigger: 'blur' }],
                material: [{ required: true, message: 'Nguyên liệu sản phầm không thể để trống', trigger: 'blur' }],
                care: [{ required: true, message: 'Chăm sóc không thể để trống', trigger: 'blur' }]
            },
            list_media: [],
            list_related: [],
            loading: false
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name,
                name_en: this.item.attributes.name_en,
                description: this.item.attributes.description,
                description_en: this.item.attributes.description_en,
                material: this.item.attributes.material,
                material_en: this.item.attributes.material_en,
                care: this.item.attributes.care,
                care_en: this.item.attributes.care_en,
                price: this.item.attributes.price,
                price_primary: this.item.attributes.price_primary,
                sku_code: this.item.attributes.sku_code,
                order: this.item.attributes.order,
                thub: this.item.attributes.thub.data?.id,
                thub_main: this.item.attributes.thub_main.data?.id,
                collection: this.item.attributes.collection.data?.id,
            }
            this.list_media = this.item?.attributes.media?.data ?? []
            // this.list_related = this.item?.attributes.related?.data ?? []
        } else {
            this.$refs.ruleForm.resetFields();
        }
    },
    watch: {
        modalType: function (val) {
            if (val && val === 'create') {
                this.$refs.ruleForm.resetFields();
                this.imageUrl = undefined
            }
        },
        item: function (val) {
            if (val && val.id && val.attributes) {
                this.$refs.ruleForm.resetFields();
                this.form = {
                    name: val.attributes.name,
                    name_en: val.attributes.name_en,
                    description: val.attributes.description,
                    description_en: val.attributes.description_en,
                    material: val.attributes.material,
                    material_en: val.attributes.material_en,
                    care: val.attributes.care,
                    care_en: val.attributes.care_en,
                    price: val.attributes.price,
                    price_primary: val.attributes.price_primary,
                    sku_code: val.attributes.sku_code,
                    order: val.attributes.order,
                    thub: val.attributes.thub.data?.id,
                    thub_main: val.attributes.thub_main.data?.id,
                    collection: val.attributes.collection.data?.id,
                }
                this.list_media = val.attributes.media?.data ?? []
            } else {
                this.$refs.ruleForm.resetFields();
            }
        },
    },
    methods: {
        ...mapActions({
            updateProduct: "product/updateProduct",
            createProduct: "product/createProduct",
        }),
        async onSubmitAdd() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    this.form.name_en = this.form.name
                    this.form.description_en = this.form.description
                    this.form.material_en = this.form.material
                    this.form.care_en = this.form.care
                    let rs = await this.createProduct({
                        data: {
                            ...this.form,
                            state: 'active',
                            sold: 0,
                            slug: this.getSlug(this.form.name)
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Tạo mới sản phẩm thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Tạo mới sản phẩm không thành công! Xin thử lại sau!');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async onSubmitUpdate() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    this.form.name_en = this.form.name
                    this.form.description_en = this.form.description
                    this.form.material_en = this.form.material
                    this.form.care_en = this.form.care
                    let rs = await this.updateProduct({
                        id: this.item.id,
                        data: {
                            ...this.form,
                            slug: this.getSlug(this.form.name)
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Cập nhật sản phẩm thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Cập nhật sản phẩm không thành công! Xin thử lại sau!');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async onAddMedia(_medias) {
            if (_medias && _medias.length > 0) {
                let listMediaId = this.list_media.map(o => { return o.id })
                listMediaId.push(..._medias.map(o => { return o.id }))
                let rs = await this.updateProduct({
                    id: this.item.id,
                    data: {
                        media: listMediaId
                    }
                })
                if (rs && rs.id) {
                    this.$message.success('Thêm ảnh sản phẩm thành công');
                    this.list_media.push(..._medias.map(o => {
                        return {
                            id: o.id,
                            attributes: o
                        }
                    }))
                    this.$emit('onReload')
                } else {
                    this.$message.error('Thêm ảnh sản phẩm không thành công! Xin thử lại sau!');
                }
            }
        },
        async onDeleteMedia(id) {
            let listMediaId = this.list_media.map(o => { return o.id })
            if (listMediaId.length > 0) {
                let listMediaUpdate = listMediaId.filter(f => f !== id)
                let rs = await this.updateProduct({
                    id: this.item.id,
                    data: {
                        media: listMediaUpdate
                    }
                })
                if (rs && rs.id) {
                    this.$message.success('Xóa ảnh sản phẩm thành công');
                    this.list_media = this.list_media.filter(f => f.id !== id)
                    this.$emit('onReload')
                } else {
                    this.$message.error('Xóa ảnh sản phẩm không thành công! Xin thử lại sau!');
                }
            }
        },
        onReloadRelated() {
            this.$emit('onReloadRelated')
        }
    }
}
</script>
  
<style lang="scss" scoped></style>
  