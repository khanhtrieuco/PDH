<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="10">
                <a-col :span="24">
                    <a-form-model-item ref="name" label="Tên" prop="name">
                        <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item ref="name_en" label="Tên tiếng anh" prop="name_en">
                        <a-input v-model="form.name_en" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="Vị trí hiển thị" prop="order">
                        <a-input v-model="form.order" type="number" />
                    </a-form-model-item>
                </a-col>
            </a-col>
            <a-col :span="14" style="padding-left: 20px;">
                <b-card>
                    <ListMenu :id="item?.id" :listItem="listItemSub" @onReload="onReloadSub" />
                </b-card>
            </a-col>
        </a-row>
        <a-form-model-item :wrapper-col="{ span: 4, offset: 20 }" style="margin-top: 20px;">
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
import ListMenu from "./listSubmenu.vue"
export default {
    mixins: [general],
    components: {
        ListMenu
    },
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
                order: 0
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                name_en: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
            },
            loading: false,
            listItemSub: []
        }
    },
    async mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name,
                name_en: this.item.attributes.name_en,
                order: this.item.attributes.order,
            }
            let filters = { type : 'sub' , parent: this.item.id }
            this.listItemSub = await this.getListItemSub({ filters })
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
                    order: val.attributes.order,
                }
            }
        },
    },
    methods: {
        ...mapActions({
            updatePlace: "place/updatePlace",
            createPlace: "place/createPlace",
            getListItemSub: "collectionCate/getListItemSub",
        }),
        async onSubmitAdd() {
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
        async onReloadSub() {
            let filters = { type : 'sub' , parent: this.item.id }
            this.listItemSub = await this.getListItemSub({ filters })
        }
    }
}
</script>
  
<style lang="scss" scoped></style>
  