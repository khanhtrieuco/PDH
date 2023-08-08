<template>
    <div class="backgroud-black">
        <div class="address-content">
            <img class="close-btn" src="/images/Dell_light.png" @click="$emit('closeUpdate')" />
            <div class="address-title">Thêm địa chỉ</div>
            <b-row v-if="!isMobile">
                <b-col cols="12">
                    <b-form-input class="input-form-address" v-model="form.name" placeholder="Họ và tên*"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <b-form-input class="input-form-address" v-model="form.phone"
                        placeholder="Số điện thoại*"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <b-form-input class="input-form-address" v-model="form.email"
                        placeholder="Địa chỉ Email*"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="input-form-address" v-model="form.full_address"
                        placeholder="Địa chỉ nhận"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <b-form-select class="input-form-address" v-model="country"
                        :options="[{ text: 'Việt Nam', value: null }]">
                    </b-form-select>
                </b-col>
                <b-col cols="6">
                    <b-form-select class="input-form-address" v-model="province" :options="provinces"></b-form-select>
                </b-col>
                <b-col cols="6">
                    <b-form-select class="input-form-address" v-model="district" :options="districts"></b-form-select>
                </b-col>
                <b-col cols="6">
                    <b-form-select class="input-form-address" v-model="ward" :options="wards"></b-form-select>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col cols="12">
                    <b-form-input class="input-form-address" v-model="form.name" placeholder="Họ và tên*"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="input-form-address" v-model="form.phone"
                        placeholder="Số điện thoại*"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="input-form-address" v-model="form.email"
                        placeholder="Địa chỉ Email*"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="input-form-address" v-model="form.full_address"
                        placeholder="Địa chỉ nhận"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-select class="input-form-address" v-model="country"
                        :options="[{ text: 'Việt Nam', value: null }]">
                    </b-form-select>
                </b-col>
                <b-col cols="12">
                    <b-form-select class="input-form-address" v-model="province" :options="provinces"></b-form-select>
                </b-col>
                <b-col cols="12">
                    <b-form-select class="input-form-address" v-model="district" :options="districts"></b-form-select>
                </b-col>
                <b-col cols="12">
                    <b-form-select class="input-form-address" v-model="ward" :options="wards"></b-form-select>
                </b-col>
            </b-row>
            <div class="nas-btn up-add-btn" @click="type === 'create' ? onAddNew() : onUpdate()">Cập nhật
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        type: {
            type: String,
            default: 'create'
        },
        item: {
            type: Object,
            default: {}
        },
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            listProvince: "user/getListProvince",
            listDistrict: "user/getListDistrict",
            listWard: "user/getListWard"
        }),
    },
    data() {
        return {
            provinces: [],
            districts: [],
            wards: [],
            form: {
                name: null,
                phone: null,
                email: null,
                full_address: null
            },
            district: null,
            ward: null,
            country: null,
            province: 1,
        }
    },
    async mounted() {
        this.setValueForm()
        this.provinces = this.listProvince.map(o => { return { text: o.attributes.name, value: o.id } })
        if (this.item.attributes?.provinces?.data?.length > 0) {
            this.province = this.item.attributes?.provinces?.data[0].id
            await this.getListDistrict({ filters: { province: { id: { $eq: this.province } } } })
            this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
        } else {
            await this.getListDistrict({ filters: { province: { id: { $eq: this.province } } } })
            this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
        }
        if (this.item.attributes?.districts?.data?.length > 0) {
            this.district = this.item.attributes?.districts?.data[0].id
            // await this.getListWard({ filters: { district: { id: { $eq: this.district } } } })
            // this.wards = this.listWard.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
        }
        if (this.item.attributes?.wards?.data?.length > 0) {
            this.ward = this.item.attributes?.wards?.data[0].id
        }
    },
    watch: {
        type: function (val) {
            if (val) {
                this.setValueForm()
            }
        },
        listProvince: async function (val) {
            if (val) {
                this.provinces = val.map(o => { return { text: o.attributes.name, value: o.id } })
            }
        },
        province: async function (val) {
            if (val) {
                await this.getListDistrict({ filters: { province: { id: { $eq: val } } } })
                this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
            }
        },
        district: async function (val) {
            if (val) {
                await this.getListWard({ filters: { district: { id: { $eq: val } } } })
                this.wards = this.listWard.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
            }
        },
    },
    methods: {
        ...mapActions({
            addNewAddress: "auth/addNewAddress",
            updateAddress: "auth/updateAddress",
            getListDistrict: 'user/getListDistrict',
            getListWard: 'user/getListWard'
        }),
        setValueForm() {
            if (this.type === 'create') {
                this.form = {
                    name: null,
                    phone: null,
                    email: null,
                    full_address: null
                }
            } else {
                this.form = this.item?.attributes
            }
        },
        async onAddNew() {
            if (!this.form.name || !this.form.phone || !this.form.email || !this.form.full_address) {
                this.showNotification('warning', `Vui lòng nhập đử thông tin địa chỉ`)
                return
            }
            let _data = {
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                full_address: this.form.full_address,
                users_permissions_user: this.profile.id,
                provinces: this.province,
                districts: this.district,
                wards: this.ward,
            }
            let rs = await this.addNewAddress({ data: _data })
            if (rs) {
                this.$emit('closeUpdate')
                this.showNotification('success', `Tạo địa chỉ thành công`)
                this.setValueForm()
            } else {
                this.showNotification('danger', `Tạo địa chỉ thất bại vui lòng thử lại`)
            }
        },
        async onUpdate() {
            if (!this.form.name || !this.form.phone || !this.form.email || !this.form.full_address
                || !this.province || !this.district || !this.ward
            ) {
                this.showNotification('warning', `Vui lòng nhập đử thông tin địa chỉ`)
                return
            }
            let _data = {
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                full_address: this.form.full_address,
                provinces: this.province,
                districts: this.district,
                wards: this.ward,
            }
            let rs = await this.updateAddress({ id: this.item.id, data: _data })
            if (rs) {
                this.$emit('closeUpdate')
                this.showNotification('success', `Cập nhật địa chỉ thành công`)
                this.setValueForm()

            } else {
                this.showNotification('danger', `Cập nhật địa chỉ thất bại vui lòng thử lại`)
            }
        },
    }
}
</script>
<style lang="scss">
.backgroud-black {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #000000b3;
    z-index: 15;
}

.address-content {
    position: relative;
    top: calc(50% - 700px/2);
    margin: auto;
    width: 900px;
    height: 700px;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 74px;
}

.address-title {
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 24px;
    text-align: center;
}

.close-btn {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 52px;
    z-index: 1;
    cursor: pointer;
}

.input-form-address {
    height: 40px !important;
    border: 1px solid #E8E8E8 !important;
    border-radius: 20px !important;
    font-size: 13px !important;
    line-height: 26px !important;
    margin-bottom: 10px;
    font-family: 'inter-light';

}

.up-add-btn {
    margin-top: 30px;
}

@media (max-width: 520px) {
    .address-content {
        width: 90%;
        padding: 16px;
    }

    .address-title {
        text-align: center;
        font-size: 20px;
    }

    .close-btn {
        top: 16px;
        right: 16px;
        width: 32px;
    }

    .up-add-btn {
        position: absolute;
        bottom: 30px;
        width: calc(100% - 32px);
    }
}
</style>
  