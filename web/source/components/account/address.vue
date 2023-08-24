<template>
    <div class="backgroud-black">
        <div class="address-content">
            <img class="address-close" src="/images/close-outline.png" @click="$emit('closeUpdate')" />
            <div class="address-title">Add new address</div>
            <div class="input-form-des-text">*required field</div>
            <b-row v-if="!isMobile" class="mt-3">
                <b-col cols="12">
                    <div class="input-form-des">*Full name</div>
                    <b-form-input class="input-form-address" v-model="form.name" placeholder="Họ và tên*"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <div class="input-form-des">*Phone</div>
                    <b-form-input class="input-form-address" v-model="form.phone"
                        placeholder="Số điện thoại*"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <div class="input-form-des">*Email</div>
                    <b-form-input class="input-form-address" v-model="form.email"
                        placeholder="Địa chỉ Email*"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <div class="input-form-des">*Country/ Region</div>
                    <b-form-select class="input-form-address" v-model="country"
                        :options="[{ text: 'Việt Nam', value: null }]">
                    </b-form-select>
                </b-col>
                <b-col cols="6">
                    <div class="input-form-des">*Province</div>
                    <b-form-select class="input-form-address" v-model="province" :options="provinces"></b-form-select>
                </b-col>
                <b-col cols="6">
                    <div class="input-form-des">*District</div>
                    <b-form-select class="input-form-address" v-model="district" :options="districts"></b-form-select>
                </b-col>
                <b-col cols="6">
                    <div class="input-form-des">*Ward</div>
                    <b-form-select class="input-form-address" v-model="ward" :options="wards"></b-form-select>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">Address</div>
                    <b-form-input class="input-form-address" v-model="form.full_address"
                        placeholder="Địa chỉ nhận"></b-form-input>
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
            <div class="up-add-btn" @click="type === 'create' ? onAddNew() : onUpdate()">Cập nhật
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
        item: {
            type: Object,
            default: {
                attributes: null,
                id: null
            }
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
            type: 'create'
        }
    },
    async mounted() {
        if(this.item?.id) {
            this.type = 'update'
        } else {
            this.type = 'create'
        }
        this.setValueForm()
        await this.getListProvince({ pagination: { page: 1, pageSize: 70 } })
        this.provinces = this.listProvince.map(o => {  return { text: o?.attributes?.name, value: o?.id } })
        if (this.item?.attributes?.provinces?.data?.length > 0) {
            this.province = this.item.attributes?.provinces?.data[0].id
            await this.getListDistrict({ filters: { province: { id: { $eq: this.province } } } })
            this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
        } else {
            await this.getListDistrict({ filters: { province: { id: { $eq: this.province } } } })
            this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
        }
        if (this.item?.attributes?.districts?.data?.length > 0) {
            this.district = this.item.attributes?.districts?.data[0].id
            // await this.getListWard({ filters: { district: { id: { $eq: this.district } } } })
            // this.wards = this.listWard.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
        }
        if (this.item?.attributes?.wards?.data?.length > 0) {
            this.ward = this.item.attributes?.wards?.data[0].id
        }
    },
    watch: {
        type: function (val) {
            if (val) {
                this.setValueForm()
            }
        },
        // listProvince: async function (val) {
        //     if (val) {
        //         this.provinces = val.map(o => { 
        //             if(o?.attributes)
        //                 return { text: o?.attributes?.name, value: o?.id } 
        //         })
        //     }
        // },
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
            getListProvince: 'user/getListProvince',
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
                this.showNotification('warning', `Vui lòng nhập đủ thông tin địa chỉ`)
                return
            }
            let _data = {
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                full_address: this.form.full_address,
                users: this.profile.id,
                provinces: this.province,
                districts: this.district,
                wards: this.ward
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
    top: calc(50% - 630px/2);
    margin: auto;
    width: 550px;
    height: 630px;
    background-color: #ffffff;
    padding: 30px;

    .address-close {
        position: absolute;
        right: 30px;
        top: 30px;
        cursor: pointer;
    }

    .address-title {
        color: #000;
        font-family: 'Aeroport';
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .input-form-des {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
        margin-bottom: 5px;
        margin-top: 20px;
    }

    .input-form-des-text {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
    }

    .input-form-address {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
        border: 1px solid #000;
        border-radius: 0px;
    }

    .up-add-btn {
        width: 100%;
        height: 55px;
        line-height: 53px;
        text-align: center;
        color: #FFF;
        border: 1px solid #000;
        background-color: #000;
        font-family: 'Aeroport';
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        margin-top: 30px;
        position: relative;
    }

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
  