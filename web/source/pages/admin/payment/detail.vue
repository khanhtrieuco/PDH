<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="12">
                <a-form-model-item ref="name" label="Tên" prop="name">
                    <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item label="Vị trí hiển thị" prop="order">
                    <a-input v-model="form.order" type="number" />
                </a-form-model-item>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Hình đại diện">
                        <upload-image :thub.sync="form.thub" :thubLink="item?.attributes?.thub.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Hình Qr">
                        <upload-image :thub.sync="form.qr_code"
                            :thubLink="item?.attributes?.qr_code.data?.attributes.url" />
                    </a-form-model-item>
                </a-col>
            </a-col>
            <a-col :span="12">
                <a-form-model-item ref="description" label="Mô tả" prop="description">
                    <a-input v-model="form.description" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"
                        @blur="() => { $refs.description.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="description_en" label="Mô tả tiếng anh" prop="description_en">
                    <a-input v-model="form.description_en" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
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
    },
    data() {
        return {
            form: {
                name: undefined,
                description: undefined,
                description_en: undefined,
                thub: undefined,
                qr_code: undefined,
                order: 0,
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                description: [{ required: true, message: 'Mô tả không thể để trống', trigger: 'blur' }],
            },
            loading: false,
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name,
                description: this.item.attributes.description,
                description_en: this.item.attributes.description_en,
                content: this.item.attributes.content,
                thub: this.item.attributes.thub?.data?.id,
                qr_code: this.item.attributes.qr_code?.data?.id,
                order: this.item.attributes.order,
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
                    description: val.attributes.description,
                    description_en: val.attributes.description_en,
                    content: val.attributes.content,
                    thub: val.attributes.thub?.data?.id,
                    qr_code: val.attributes.qr_code?.data?.id,
                    order: val.attributes.order,
                }
            }
        },
    },
    methods: {
        ...mapActions({
            updateItem: "payment/updateItem",
            createItem: "payment/createItem"
        }),
        async onSubmitAdd() {
            if (!this.form.thub || !this.form.qr_code) {
                this.$message.warning('Vui lòng chọn ảnh và mã QR!');
                return
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.createItem({
                        data: {
                            ...this.form,
                            state: 'active'
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
            if (!this.form.thub || !this.form.qr_code) {
                this.$message.warning('Vui lòng chọn ảnh và mã QR!');
                return
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.updateItem({
                        id: this.item.id,
                        data: {
                            ...this.form                        }
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
  