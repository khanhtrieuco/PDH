<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="12">
                <a-form-model-item ref="name" label="Tiêu đề" prop="name">
                    <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="name_en" label="Tiêu đề tiếng anh" prop="name_en">
                    <a-input v-model="form.name_en" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item ref="short_content" label="Nội dung rút gọn" prop="short_content">
                    <a-input v-model="form.short_content" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"
                        @blur="() => { $refs.short_content.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="short_content_en" label="Nd rút ngọn tiếng anh" prop="short_content_en">
                    <a-input v-model="form.short_content_en" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item ref="content" label="Nội dung" prop="content">
                    <a-input v-model="form.content" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"
                        @blur="() => { $refs.content.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="content_en" label="Nội dung tiếng anh" prop="content_en">
                    <a-input v-model="form.content_en" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Hình banner">
                        <upload-image :thub.sync="form.thub" :thubLink="item?.attributes?.thub.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Hình banner mobile ">
                        <upload-image :thub.sync="form.thub_mobile"
                            :thubLink="item?.attributes?.thub_mobile.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Hình 1">
                        <upload-image :thub.sync="form.media1" :thubLink="item?.attributes?.media1.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Hình 2 ">
                        <upload-image :thub.sync="form.media2" :thubLink="item?.attributes?.media2.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Hình 3">
                        <upload-image :thub.sync="form.media3" :thubLink="item?.attributes?.media3.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Hình 4 ">
                        <upload-image :thub.sync="form.media4" :thubLink="item?.attributes?.media4.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Video">
                        <upload-image :thub.sync="form.video" :thubLink="item?.attributes?.video.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Vị trí hiển thị" prop="order">
                        <a-input v-model="form.order" type="number" />
                    </a-form-model-item>
                </a-col>
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
</template>
<script>
import general from "~/mixins/general";
import { mapActions, mapMutations } from 'vuex'
export default {
    mixins: [general],
    props: {
        item: {
            type: Object,
            default: {},
        },
        modalType: {
            type: String,
            default: 'create'
        }
    },
    data() {
        return {
            form: {
                name: undefined,
                name_en: undefined,
                short_content: undefined,
                short_content_en: undefined,
                content: undefined,
                content_en: undefined,
                thub: undefined,
                thub_mobile: undefined,
                media1: undefined,
                media2: undefined,
                media3: undefined,
                media4: undefined,
                order: 0,
                video: undefined
            },
            rules: {
                name: [{ required: true, message: 'Tiêu đề không thể để trống', trigger: 'blur' }],
                short_content: [{ required: true, message: 'Nội dung rút gọn không thể để trống', trigger: 'blur' }],
                content: [{ required: true, message: 'Nội dung không thể để trống', trigger: 'blur' }]
            },
            loading: false,
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name,
                name_en: this.item.attributes.name_en,
                short_content: this.item.attributes.short_content,
                short_content_en: this.item.attributes.short_content_en,
                content: this.item.attributes.content,
                content_en: this.item.attributes.content_en,
                thub: this.item.attributes.thub?.data?.id,
                thub_mobile: this.item.attributes.thub_mobile?.data?.id,
                video: this.item.attributes.video?.data?.id,
                media1: this.item.attributes.media1?.data?.id,
                media2: this.item.attributes.media2?.data?.id,
                media3: this.item.attributes.media3?.data?.id,
                media4: this.item.attributes.media4?.data?.id,
                order: this.item.attributes.order
            }
        }
    },
    watch: {
        modalType: function (val) {
            if (val && val === 'create') {
                this.$refs.ruleForm.resetFields();
            }
        },
        item: function (val) {
            if (val && val.id && val.attributes) {
                this.$refs.ruleForm.resetFields();
                this.form = {
                    name: val.attributes.name,
                    name_en: val.attributes.name_en,
                    short_content: val.attributes.short_content,
                    short_content_en: val.attributes.short_content_en,
                    content: val.attributes.content,
                    content_en: val.attributes.content_en,
                    thub: val.attributes.thub?.data?.id,
                    thub_mobile: val.attributes.thub_mobile?.data?.id,
                    video: val.attributes.video?.data?.id,
                    media1: val.attributes.media1?.data?.id,
                    media2: val.attributes.media2?.data?.id,
                    media3: val.attributes.media3?.data?.id,
                    media4: val.attributes.media4?.data?.id,
                    order: val.attributes.order
                }
            }
        },
    },
    methods: {
        ...mapActions({
            updateItem: "news/updateItem",
            createItem: "news/createItem"
        }),
        async onSubmitAdd() {
            if (!this.form.thub || !this.form.thub_mobile) {
                this.$message.warning('Vui lòng chọn ảnh cho show!');
                return
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.createItem({
                        data: {
                            ...this.form,
                            slug: this.getSlug(this.form.title)
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
            if (!this.form.thub || !this.form.thub_mobile) {
                this.$message.warning('Vui lòng chọn ảnh cho show!');
                return
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.updateItem({
                        id: this.item.id,
                        data: {
                            ...this.form,
                            slug: this.getSlug(this.form.title)
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
    }
}
</script>
  
<style lang="scss" scoped></style>
  