<template>
    <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Thông tin chi tiết">
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
                labelAlign="left">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item ref="name" label="Tên sản phẩm" prop="name">
                            <a-input v-model="form.name" @blur="() => { $refs.title.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="title" label="Tên tiếng Việt" prop="title">
                            <a-input v-model="form.title" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Hình đại diện">
                            <upload-image :thub.sync="form.thub" :thubLink="item?.attributes?.thub.data?.attributes.url" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Hình nền">
                            <upload-image :thub.sync="form.detail_backgroud"
                                :thubLink="item?.attributes?.detail_backgroud.data?.attributes.url" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Hình menu">
                            <upload-image :thub.sync="form.thub_header"
                                :thubLink="item?.attributes?.thub_header.data?.attributes.url" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Hình nền mobile">
                            <upload-image :thub.sync="form.detail_backgroud_mobile"
                                :thubLink="item?.attributes?.detail_backgroud_mobile.data?.attributes.url" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="description" label="Mô tả" prop="description">
                            <a-input v-model="form.description" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="description_en" label="Mô tả tiếng anh" prop="description_en">
                            <a-input v-model="form.description_en" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Giá" prop="price">
                            <a-input v-model="form.price" type="number" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Giá chưa km" prop="price_primary">
                            <a-input v-model="form.price_primary" type="number" />
                        </a-form-model-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-model-item label="Chuyên mục" prop="categories">
                            <a-select v-model="form.categories" placeholder="chọn chuyên mục" mode="multiple">
                                <a-select-option :value="_cate.id" v-for="(_cate, idx) in listCategory" :key="idx">
                                    {{ _cate.attributes.name }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Chuyên mục con" prop="subcategories">
                            <a-select v-model="form.subcategories" placeholder="chọn chuyên mục con" mode="multiple">
                                <a-select-option :value="_cate.id" v-for="(_cate, idx) in listSubcategory" :key="idx">
                                    {{ _cate.attributes.name }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item label="Chức năng" prop="subcategories">
                                <a-select v-model="form.tips" placeholder="chọn chức năng" mode="multiple">
                                    <a-select-option :value="_tip?.id" v-for="(_tip, idx) in listTip" :key="idx">
                                        {{ _tip?.attributes?.name }}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12" style="padding-left: 10px;">
                            <a-form-model-item label="Vị trí hiển thị" prop="order">
                                <a-input v-model="form.order" type="number" />
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item ref="used_content" label="Công dụng" prop="used_content">
                                <quill-html :content_html.sync="form.used_content"></quill-html>
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12" style="padding-left: 10px;">
                            <a-form-model-item ref="used_content_en" label="Công dụng tiếng anh" prop="used_content_en">
                                <quill-html :content_html.sync="form.used_content_en"
                                    quill_id="used_content_en_quill"></quill-html>
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item ref="structure_content" label="Thành phần" prop="structure_content">
                                <quill-html :content_html.sync="form.structure_content" id="structure_content"
                                    quill_id="structure_content_quill"></quill-html>
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12" style="padding-left: 10px;">
                            <a-form-model-item ref="structure_content_en" label="Thành phần tiếng anh"
                                prop="structure_content_en">
                                <quill-html :content_html.sync="form.structure_content_en" id="structure_content_en"
                                    quill_id="structure_content_en_quill"></quill-html>
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item ref="guide_content" label="Hướng dẫn sử dụng" prop="guide_content">
                                <quill-html :content_html.sync="form.guide_content" id="guide_content"
                                    quill_id="guide_content_quill"></quill-html>
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12" style="padding-left: 10px;">
                            <a-form-model-item ref="guide_content_en" label="Hướng dẫn tiếng anh" prop="guide_content_en">
                                <quill-html :content_html.sync="form.guide_content_en" id="guide_content_en"
                                    quill_id="guide_content_en_quill"></quill-html>
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Thành phần sản phẩm">
                            <a-textarea v-model="form.ingredient" :auto-size="{ minRows: 3, maxRows: 5 }"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <div style="width: 10px;height: 10px;"></div>
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
        <a-tab-pane key="3" tab="Sản phẩm dùng kèm" force-render v-if="modalType === 'edit'">
            <ListRelated :listRelated="listRelated" :product_id="item?.id" @onReloadRelated="onReloadRelated" />
        </a-tab-pane>

    </a-tabs>
</template>
<script>

import general from "~/mixins/general";
import { mapActions, mapGetters } from 'vuex'
import ListMedia from "./listMedia.vue"
import ListRelated from "./listRelated.vue"
export default {
    mixins: [general],
    components: {
        ListMedia,
        ListRelated
    },
    computed: {
        ...mapGetters({
            listCategory: "category/getListCategory",
            listSubcategory: "category/getListSubCategory",
            listTip: "product/getListTip",
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
        listRelated: {
            type: Object,
            default: {
                data: [],
                pagination: {}
            }
        }
    },
    data() {
        return {
            form: {
                title: undefined,
                name: undefined,
                description: undefined,
                used_content: undefined,
                guide_content: undefined,
                structure_content: undefined,
                categories: undefined,
                subcategories: undefined,
                tips: undefined,
                description: undefined,
                thub: undefined,
                thub_header: undefined,
                media: undefined,
                detail_backgroud: undefined,
                detail_backgroud_mobile: undefined,
                tips: undefined,
                ingredient: undefined,
                order: 0,
                price: 0,
                price_primary: 0,
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                title: [{ required: true, message: 'Chức năng không thể để trống', trigger: 'blur' }],
                description: [{ required: true, message: 'Công dụng không thể để trống', trigger: 'blur' }],
                used_content: [{ required: true, message: 'Công dụng sản phầm không thể để trống', trigger: 'blur' }],
                guide_content: [{ required: true, message: 'Hướng dẫn sử dụng không thể để trống', trigger: 'blur' }],
                structure_content: [{ required: true, message: 'Thành phần sản phẩm không thể để trống', trigger: 'blur' }],
                subcategories: [{ required: true, message: 'Chuyên mục con không thể để trống', trigger: 'change' }],
                categories: [{ required: true, message: 'Chuyên mục không thể để trống', trigger: 'change' }],
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
                title: this.item.attributes.title,
                name: this.item.attributes.name,
                description: this.item.attributes.description,
                description_en: this.item.attributes.description_en,
                used_content: this.item.attributes.used_content,
                used_content_en: this.item.attributes.used_content_en,
                guide_content: this.item.attributes.guide_content,
                guide_content_en: this.item.attributes.guide_content_en,
                structure_content: this.item.attributes.structure_content,
                structure_content_en: this.item.attributes.structure_content_en,
                ingredient: this.item.attributes.ingredient,
                price: this.item.attributes.price,
                price_primary: this.item.attributes.price_primary,
                order: this.item.attributes.order,
                state: this.item.attributes.state,
                thub: this.item.attributes.thub.data?.id,
                thub_header: this.item.attributes.thub_header.data?.id,
                detail_backgroud: this.item.attributes.detail_backgroud.data?.id,
                detail_backgroud_mobile: this.item.attributes.detail_backgroud_mobile.data?.id,
                categories: this.item.attributes.categories.data ? this.item.attributes.categories.data.map(o => { return o.id }) : [],
                subcategories: this.item.attributes.subcategories.data ? this.item.attributes.subcategories.data.map(o => { return o.id }) : [],
                tips: this.item.attributes.tips.data ? this.item.attributes.tips.data.map(o => { return o.id }) : []
            }
            this.list_media = this.item?.attributes.media?.data ?? []
            this.list_related = this.item?.attributes.related?.data ?? []
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
                    title: val.attributes.title,
                    name: val.attributes.name,
                    description: val.attributes.description,
                    description_en: val.attributes.description_en,
                    used_content: val.attributes.used_content,
                    used_content_en: val.attributes.used_content_en,
                    guide_content: val.attributes.guide_content,
                    guide_content_en: val.attributes.guide_content_en,
                    structure_content: val.attributes.structure_content,
                    structure_content_en: val.attributes.structure_content_en,
                    ingredient: val.attributes.ingredient,
                    price: val.attributes.price,
                    price_primary: val.attributes.price_primary,
                    order: val.attributes.order,
                    state: val.attributes.state,
                    thub: val.attributes.thub.data?.id,
                    thub_header: val.attributes.thub_header.data?.id,
                    detail_backgroud: val.attributes.detail_backgroud.data?.id,
                    detail_backgroud_mobile: val.attributes.detail_backgroud_mobile.data?.id,
                    categories: val.attributes.categories.data ? val.attributes.categories.data.map(o => { return o.id }) : [],
                    subcategories: val.attributes.subcategories.data ? val.attributes.subcategories.data.map(o => { return o.id }) : [],
                    tips: val.attributes.tips.data ? val.attributes.tips.data.map(o => { return o.id }) : []
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
            createProduct: "product/createProduct"
        }),
        async onSubmitAdd() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
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
  