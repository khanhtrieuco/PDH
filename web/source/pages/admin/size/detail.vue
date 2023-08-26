<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="12">
                <a-form-model-item ref="name" label="Tên" prop="name">
                    <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
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
                name: undefined
            },
            rules: {
                name: [{ required: true, message: 'Tiêu đề không thể để trống', trigger: 'blur' }]
            },
            loading: false,
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name
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
                    name: val.attributes.name
                }
            }
        },
    },
    methods: {
        ...mapActions({
            updateItem: "size/updateItem",
            createItem: "size/createItem"
        }),
        async onSubmitAdd() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.createItem({
                        data: {
                            ...this.form,
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
    }
}
</script>
  
<style lang="scss" scoped></style>
  