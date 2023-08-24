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
                <a-form-model-item ref="name_en" label="Tên tiếng anh" prop="name_en">
                    <a-input v-model="form.name_en" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item ref="address" label="Địa chỉ" prop="address">
                    <a-input v-model="form.address" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="address_en" label="Địa chỉ tiếng anh" prop="address_en">
                    <a-input v-model="form.address_en" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="Vị trí hiển thị" prop="order">
                    <a-input v-model="form.order" type="number" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="link" label="Link google map" prop="link">
                    <a-input v-model="form.link" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="Số điện thoại" prop="order">
                    <a-input v-model="form.phone" type="number" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item label="Giờ hoạt động" prop="order">
                    <a-input v-model="form.time" type="number" />
                </a-form-model-item>
            </a-col>
            <a-col :span="24">
                <a-col :span="12">
                    <a-form-model-item label="Hình ảnh">
                        <upload-image :thub.sync="form.thub" :thubLink="item?.attributes?.thub.data?.attributes.url" />
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
                address: undefined,
                address_en: undefined,
                thub: undefined,
                phone: undefined,
                time: undefined,
                link: undefined,
                order: 0
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                address: [{ required: true, message: 'Địa chỉ không thể để trống', trigger: 'blur' }],
                name_en: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                address_en: [{ required: true, message: 'Địa chỉ không thể để trống', trigger: 'blur' }]
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
                address: this.item.attributes.address,
                address_en: this.item.attributes.address_en,
                map: this.item.attributes.map?.data?.id,
                order: this.item.attributes.order,
                time: this.item.attributes.time,
                phone: this.item.attributes.phone,
                link: this.item.attributes.link
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
                    name: val.attributes.name,
                    name_en: val.attributes.name_en,
                    address: val.attributes.address,
                    address_en: val.attributes.address_en,
                    map: val.attributes.map?.data?.id,
                    order: val.attributes.order,
                    time: val.attributes.time,
                    phone: val.attributes.phone,
                    link: val.attributes.link
                }
            }
        },
    },
    methods: {
        ...mapActions({
            updatePlace: "place/updatePlace",
            createPlace: "place/createPlace",
            postbyUrl: 'common/postbyUrl'
        }),
        async onSubmitAdd() {
            if (!this.form.map) {
                this.$message.warning('Vui lòng chọn map cho địa điểm!');
                return
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.createPlace({
                        data: {
                            ...this.form,
                            state: 'active'
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Tạo mới địa điểm thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Tạo mới địa điểm không thành công! Xin thử lại sau!');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async onSubmitUpdate() {
            if (!this.form.map || !this.item.id) {
                this.$message.warning('Vui lòng chọn map cho địa điểm!');
                return
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.updatePlace({
                        id: this.item.id,
                        data: {
                            ...this.form
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Cập nhật địa điểm thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Cập nhật địa điểm không thành công! Xin thử lại sau!');
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
  