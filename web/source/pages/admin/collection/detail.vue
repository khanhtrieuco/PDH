<template>
    <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Thông tin chi tiết">
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }"
                :wrapper-col="{ span: 17 }" labelAlign="left">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item ref="name" label="Tên" prop="name">
                            <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <!-- <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Tên tiếng anh" prop="name_en">
                            <a-input v-model="form.name_en" />
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :span="12">
                        <a-form-model-item ref="description" label="Nội dung" prop="description">
                            <a-textarea v-model="form.description" :auto-size="{ minRows: 2, maxRows: 5 }"
                                @blur="() => { $refs.description.onFieldBlur(); }" />
                        </a-form-model-item>
                    </a-col>
                    <!-- <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item ref="description_en" label="Nội dung tiếng anh" prop="description_en">
                            <a-textarea v-model="form.description_en" :auto-size="{ minRows: 2, maxRows: 5 }" />
                        </a-form-model-item>
                    </a-col> -->
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item label="Hình banner">
                                <upload-image :thub.sync="form.main_thub"
                                    :thubLink="item?.attributes?.main_thub.data?.attributes.url" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-model-item label="Hình banner mobile">
                                <upload-image :thub.sync="form.main_thub_mobile"
                                    :thubLink="item?.attributes?.main_thub_mobile.data?.attributes.url" />
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item label="Hình chi tiết">
                                <upload-image :thub.sync="form.detail_thub"
                                    :thubLink="item?.attributes?.detail_thub.data?.attributes.url" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-model-item label="Hình chi tiết mobile">
                                <upload-image :thub.sync="form.detail_thub_mobile"
                                    :thubLink="item?.attributes?.detail_thub_mobile.data?.attributes.url" />
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="Vị trí hiển thị" prop="order">
                            <a-input v-model="form.order" type="number" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" style="padding-left: 10px;">
                        <a-form-model-item label="Chuyên mục" prop="collection_cate">
                            <Select :default="form.collection_cate" placeholder="Chọn chuyên mục" :listItem="listMenu"
                                @onSelect="(e) => form.collection_cate = e" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-col :span="12">
                            <a-form-model-item label="Hiển thị slider trang chủ">
                                <a-switch :checked="form.show_home" @change="(e) => form.show_home = e" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                        </a-col>
                    </a-col>
                    <a-col :span="24" v-if="form.show_home">
                        <a-col :span="12">
                            <a-form-model-item label="Hình slider">
                                <upload-image :thub.sync="form.slider_thub"
                                    :thubLink="item?.attributes?.slider_thub.data?.attributes?.url" />
                            </a-form-model-item>
                        </a-col>
                        <!-- <a-col :span="12">
                            <a-form-model-item label="Hình slider mobile">
                                <upload-image :thub.sync="form.slider_thub_mobile"
                                    :thubLink="item?.attributes?.slider_thub_mobile.data?.attributes?.url" />
                            </a-form-model-item>
                        </a-col> -->
                    </a-col>
                </a-row>
                <a-form-model-item :wrapper-col="{ span: 4, offset: 20 }">
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
    </a-tabs>
</template>
<script>
import general from "~/mixins/general";
import { mapActions, mapMutations } from 'vuex'
import Select from "~/components/admin/select.vue"
import ListMedia from "./listMedia.vue"

export default {
    mixins: [general],
    components: {
        Select,
        ListMedia
    },
    props: {
        item: {
            type: Object,
            default: {},
        },
        listMenu: {
            type: Array,
            default: () => []
        },
        modalType: {
            type: String,
            default: 'create'
        },
        modalOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                name: undefined,
                name_en: undefined,
                description: undefined,
                description_en: undefined,
                main_thub: undefined,
                main_thub_mobile: undefined,
                detail_thub: undefined,
                detail_thub_mobile: undefined,
                slider_thub: undefined,
                slider_thub_mobile: undefined,
                collection_cate: undefined,
                order: 0,
                show_home: false
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                description: [{ required: true, message: 'Nội dung rút gọn không thể để trống', trigger: 'blur' }],
            },
            list_media: [],
            loading: false,
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
                main_thub: this.item.attributes.main_thub?.data?.id,
                main_thub_mobile: this.item.attributes.main_thub_mobile?.data?.id,
                slider_thub: this.item.attributes.slider_thub?.data?.id,
                slider_thub_mobile: this.item.attributes.slider_thub_mobile?.data?.id,
                detail_thub: this.item.attributes.detail_thub?.data?.id,
                detail_thub_mobile: this.item.attributes.detail_thub_mobile?.data?.id,
                collection_cate: this.item.attributes.collection_cate?.data?.id,
                order: this.item.attributes.order,
                state: this.item.attributes.state,
                show_home: this.item.attributes.show_home
            }
            this.list_media = this.item?.attributes.media?.data ?? []

        }
    },
    watch: {
        modalType: function (val) {
            if (val && val === 'create') {
                this.$refs.ruleForm.resetFields();
                this.imageUrl = undefined
            }
        },
        modalOpen: function (val) {
            this.$refs.ruleForm.resetFields();
            this.imageUrl = undefined
        },
        item: function (val) {
            if (val && val.id && val.attributes) {
                this.$refs.ruleForm.resetFields();
                this.form = {
                    name: val.attributes.name,
                    name_en: val.attributes.name_en,
                    description: val.attributes.description,
                    description_en: val.attributes.description_en,
                    main_thub: val.attributes.main_thub?.data?.id,
                    main_thub_mobile: val.attributes.main_thub_mobile?.data?.id,
                    slider_thub: val.attributes.slider_thub?.data?.id,
                    slider_thub_mobile: val.attributes.slider_thub_mobile?.data?.id,
                    detail_thub: val.attributes.detail_thub?.data?.id,
                    detail_thub_mobile: val.attributes.detail_thub_mobile?.data?.id,
                    collection_cate: val.attributes.collection_cate?.data?.id,
                    order: val.attributes.order,
                    state: val.attributes.state,
                    show_home: val.attributes.show_home
                }
                this.list_media = val.attributes.media?.data ?? []

            }
        },
    },
    methods: {
        ...mapActions({
            updateItem: "collection/updateItem",
            createItem: "collection/createItem",
            postbyUrl: 'common/postbyUrl'
        }),
        async onSubmitAdd() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    this.form.name_en = this.form.name
                    this.form.description_en = this.form.description
                    let rs = await this.createItem({
                        data: {
                            ...this.form,
                            state: 'active',
                            slug: this.getSlug(this.form.name)
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Tạo mới thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Tạo mới không thành công! Xin thử lại sau!');
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
                    let rs = await this.updateItem({
                        id: this.item.id,
                        data: {
                            ...this.form,
                            slug: this.getSlug(this.form.name)
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Cập nhật thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Cập nhật không thành công! Xin thử lại sau!');
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
                let rs = await this.updateItem({
                    id: this.item.id,
                    data: {
                        media: listMediaId
                    }
                })
                if (rs && rs.id) {
                    this.$message.success('Thêm ảnh bộ sưu tập thành công');
                    this.list_media.push(..._medias.map(o => {
                        return {
                            id: o.id,
                            attributes: o
                        }
                    }))
                    this.$emit('onReload')
                } else {
                    this.$message.error('Thêm ảnh bộ sưu tập không thành công! Xin thử lại sau!');
                }
            }
        },
        async onDeleteMedia(id) {
            let listMediaId = this.list_media.map(o => { return o.id })
            if (listMediaId.length > 0) {
                let listMediaUpdate = listMediaId.filter(f => f !== id)
                let rs = await this.updateItem({
                    id: this.item.id,
                    data: {
                        media: listMediaUpdate
                    }
                })
                if (rs && rs.id) {
                    this.$message.success('Xóa ảnh bộ sưu tập thành công');
                    this.list_media = this.list_media.filter(f => f.id !== id)
                    this.$emit('onReload')
                } else {
                    this.$message.error('Xóa ảnh bộ sưu tập không thành công! Xin thử lại sau!');
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>