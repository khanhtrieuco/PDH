<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="12">
                <a-form-model-item label="Tên" prop="name">
                    <a-input v-model="form.name" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="sku_code" label="Sku code" prop="sku_code">
                    <a-input v-model="form.sku_code" @blur="() => { $refs.sku_code.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="Kích thước" prop="size">
                    <Select :default="form.size" placeholder="Chọn kích thước" :listItem="listSizeData"
                        @onSelect="(e) => form.size = e" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item label="Màu" prop="color">
                    <Select :default="form.color" placeholder="Chọn màu" :listItem="listColorData"
                        @onSelect="(e) => form.color = e" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="Tồn kho" prop="inventory">
                    <a-input v-model="form.inventory" type="number" />
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
import { mapActions, mapGetters } from 'vuex'
import Select from "~/components/admin/select.vue"

export default {
    mixins: [general],
    components: {
        Select
    },
    computed: {
        ...mapGetters({
            listColor: "color/getListItem",
            listSize: "size/getListItem"
        })
    },
    props: {
        product_id: {
            type: Number,
            default: null
        },
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
                sku_code: undefined,
                size: undefined,
                color: undefined,
                inventory: undefined
            },
            rules: {
                sku_code: [{ required: true, message: 'Sku không thể để trống', trigger: 'blur' }]
            },
            loading: false,
            listColorData: [],
            listSizeData: []
        }
    },
    async mounted() {
        await this.getListColor()
        await this.getListSize()
        this.listColorData = this.listColor.data.map(o => {
            return {
                value: o.id,
                text: o.attributes.name
            }
        })
        this.listSizeData = this.listSize.data.map(o => {
            return {
                value: o.id,
                text: o.attributes.name
            }
        })
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name,
                sku_code: this.item.attributes.sku_code,
                size: this.item.attributes.size?.data?.id,
                color: this.item.attributes.color?.data?.id,
                inventory: this.item.attributes.inventory
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
                    sku_code: val.attributes.sku_code,
                    size: val.attributes.size?.data?.id,
                    color: val.attributes.color?.data?.id,
                    inventory: val.attributes.inventory
                }
            }
        },
    },
    methods: {
        ...mapActions({
            getListColor: "color/getListItem",
            getListSize: "size/getListItem",
            updateItem: "variant/updateItem",
            createItem: "variant/createItem"
        }),
        async onSubmitAdd() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.createItem({
                        data: {
                            ...this.form,
                            state: 'active',
                            product: this.product_id
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Tạo mới thành công');
                        this.$refs.ruleForm.resetFields();
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
                        data: this.form
                    })
                    if (rs && rs.id) {
                        this.$refs.ruleForm.resetFields();
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
  