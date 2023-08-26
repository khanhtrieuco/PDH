<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="12">
                <a-form-model-item ref="title" label="Tiêu đề" prop="title">
                    <a-input v-model="form.title" @blur="() => { $refs.title.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="title_en" label="Tiêu đề tiếng anh" prop="title_en">
                    <a-input v-model="form.title_en" />
                </a-form-model-item>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Hình đại diện">
                        <upload-image :thub.sync="form.thub" :thubLink="item?.attributes?.thub.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Vị trí hiển thị" prop="order">
                        <a-input v-model="form.order" type="number" />
                    </a-form-model-item>
                </a-col>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="Chuyên mục" prop="new_category">
                    <Select :default="form.new_category" placeholder="Chọn chuyên mục" :listItem="listCategory"
                        @onSelect="(e) => form.new_category = e" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item label="Loại" prop="type">
                    <a-select v-model="form.type" placeholder="chọn loại">
                        <a-select-option value="news">
                            News
                        </a-select-option>
                        <a-select-option value="lookbook">
                            Lookbook
                        </a-select-option>
                        <a-select-option value="campaigns">
                            Campaigns
                        </a-select-option>
                    </a-select>
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
                    <quill-html :content_html.sync="form.content"></quill-html>
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="content_en" label="Nội dung tiếng anh" prop="content_en">
                    <quill-html :content_en_html.sync="form.content_en"></quill-html>
                </a-form-model-item>
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
import Select from "~/components/admin/select.vue"

export default {
    mixins: [general],
    components: {
        Select
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
        listCategory: {
            type: Array,
            default() {
                return []
            }
        },
    },
    data() {
        return {
            form: {
                title: undefined,
                title_en: undefined,
                short_content: undefined,
                short_content_en: undefined,
                content: undefined,
                content_en: undefined,
                thub: undefined,
                order: 0,
                type: undefined,
                new_category: undefined
            },
            rules: {
                title: [{ required: true, message: 'Tiêu đề không thể để trống', trigger: 'blur' }],
                short_content: [{ required: true, message: 'Nội dung rút gọn không thể để trống', trigger: 'blur' }],
                content: [{ required: true, message: 'Nội dung không thể để trống', trigger: 'blur' }],
            },
            loading: false,
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                title: this.item.attributes.title,
                title_en: this.item.attributes.title_en,
                short_content: this.item.attributes.short_content,
                short_content_en: this.item.attributes.short_content_en,
                content: this.item.attributes.content,
                content_en: this.item.attributes.content_en,
                thub: this.item.attributes.thub?.data?.id,
                order: this.item.attributes.order,
                new_category: this.item.attributes.new_category.data?.id,
                type: this.item.attributes.type
            }
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
                    title_en: val.attributes.title_en,
                    short_content: val.attributes.short_content,
                    short_content_en: val.attributes.short_content_en,
                    content: val.attributes.content,
                    content_en: val.attributes.content_en,
                    thub: val.attributes.thub?.data?.id,
                    order: val.attributes.order,
                    new_category: val.attributes.new_category.data?.id,
                    type: val.attributes.type
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
            if (!this.form.thub) {
                this.$message.warning('Vui lòng chọn ảnh!');
                return
            }
            if (!this.form.new_category || !this.form.type) {
                this.$message.warning('Vui lòng nhập đủ thông tin');
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
            if (!this.form.thub) {
                this.$message.warning('Vui lòng chọn ảnh!');
                return
            }
            if (!this.form.new_category || !this.form.type) {
                this.$message.warning('Vui lòng nhập đủ thông tin');
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
  