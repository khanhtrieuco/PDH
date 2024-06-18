<template>
    <div class="user-address-panel">
        <b-row v-if="!isMobile">
            <b-col cols="12">
                <b-form-input class="user-address-input" v-model="username" type="text"
                    :placeholder="$t('Payment_des_1')"></b-form-input>
            </b-col>
            <b-col cols="6">
                <b-form-input class="user-address-input" v-model="email" type="text" placeholder="Email"></b-form-input>
            </b-col>
            <b-col cols="6">
                <b-form-input class="user-address-input" v-model="phone" type="text"
                    :placeholder="$t('Payment_des_2')"></b-form-input>
            </b-col>
            <b-col cols="12">
                <b-form-input class="user-address-input" v-model="fulladdress" type="text"
                    :placeholder="$t('Payment_title_1')"></b-form-input>
            </b-col>
            <b-col cols="6">
                <b-form-select class="user-address-input" v-model="country" :options="[{ text: 'Việt Nam', value: null }]"></b-form-select>
            </b-col>
            <b-col cols="6">
                <b-form-select class="user-address-input" v-model="province" :options="provinces"></b-form-select>
            </b-col>
            <b-col cols="6">
                <b-form-select class="user-address-input" v-model="district" :options="districts"></b-form-select>
            </b-col>
            <b-col cols="6">
                <b-form-select class="user-address-input" v-model="ward" :options="wards"></b-form-select>
            </b-col>
        </b-row>
        <b-row v-if="isMobile">
            <b-col cols="12">
                <b-form-input class="user-address-input" v-model="username" type="text"
                    :placeholder="$t('Payment_des_1')"></b-form-input>
            </b-col>
            <b-col cols="12">
                <b-form-input class="user-address-input" v-model="email" type="text" placeholder="Email*"></b-form-input>
            </b-col>
            <b-col cols="12">
                <b-form-input class="user-address-input" v-model="phone" type="text"
                    :placeholder="$t('Payment_des_2')"></b-form-input>
            </b-col>
            <b-col cols="12">
                <b-form-input class="user-address-input" v-model="fulladdress" type="text"
                    :placeholder="$t('Payment_title_1')"></b-form-input>
            </b-col>
            <b-col cols="12">
                <b-form-select class="user-address-input" v-model="country" :options="[{ text: 'Việt Nam', value: null }]"></b-form-select>
            </b-col>
            <b-col cols="12">
                <b-form-select class="user-address-input" v-model="province" :options="provinces"></b-form-select>
            </b-col>
            <b-col cols="12">
                <b-form-select class="user-address-input" v-model="district" :options="districts"></b-form-select>
            </b-col>
            <b-col cols="12">
                <b-form-select class="user-address-input" v-model="ward" :options="wards"></b-form-select>
            </b-col>
        </b-row>
        <div class="user-address-login-panel">
            <div class="user-address-create-text" v-if="!loggedIn">{{ $t('Payment_des_66') }}</div>
            <b-row v-if="!loggedIn">
                <b-col cols="6">
                    <b-form-input class="user-address-input" v-model="password" type="password"
                    :placeholder="$t('Login_des_2_22')"></b-form-input>
                </b-col>
            </b-row>
            <b-form-checkbox id="checkbox-1" v-model="check1" name="checkbox-1" class="user-address-checkbox"
                value="accepted" unchecked-value="not_accepted">
                {{ $t('Payment_des_7') }}
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-2" v-model="check2" name="checkbox-1" class="user-address-checkbox"
                value="accepted" unchecked-value="not_accepted">
                {{ $t('Payment_des_8') }}
            </b-form-checkbox>
            <div class="user-address-des-text">{{ $t('Payment_des_9') }}<u>{{ $t('Payment_des_9_1') }}</u></div>
        </div>
        <div class="user-address-next-btn">
            <div class="nas-btn user-address-btn" @click="onNextStep">{{ $t('Payment_des_10') }}</div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    computed: {
        ...mapGetters({
            loggedIn: "auth/getloggedIn",
            profile: "auth/getProfile",
            address: "auth/getAddress",
            listProvince: "user/getListProvince",
            listDistrict: "user/getListDistrict",
            listWard: "user/getListWard"
        }),
    },
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            provinces: [],
            districts: [],
            wards: [],
            username: null,
            email: null,
            phone: null,
            fulladdress: null,
            country: null,
            province: null,
            district: null,
            ward: null,
            password: null,
            check1: 'not_accepted',
            check2: 'not_accepted'
        }
    },
    watch: {
        user: function (val) {
            this.username = val.username
            this.email = this.user.email
            this.phone = this.user.phone
            // this.address = this.user.address
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
    async mounted() {
        await this.getListProvince({ pagination:{ pageSize : 100} })
        this.provinces = this.listProvince.map(o => { return { text: o.attributes.name, value: o.id } })
        if(this.profile && this.profile.id) {
            await this.getAddressByUser(this.profile.id)
            this.username = this.address && this.address.attributes ? this.address.attributes.name : this.profile.username;
            this.email = this.address && this.address.attributes ? this.address.attributes.email : this.profile.email;
            this.phone = this.address && this.address.attributes ? this.address.attributes.phone : this.profile.phone;
            this.fulladdress = this.address && this.address.attributes ? this.address.attributes.full_address : '';
            if(this.address.attributes?.provinces?.data?.length > 0) {
                this.province = this.address.attributes?.provinces?.data[0].id
                // await this.getListDistrict({ filters: { province: { id: { $eq: this.province } } } })
                // this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
            } else {
                // await this.getListDistrict({ filters: { province: { id: { $eq: this.province } } } })
                // this.districts = this.listDistrict.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
            }
            if(this.address.attributes?.districts?.data?.length > 0) {
                this.district = this.address.attributes?.districts?.data[0].id
                // await this.getListWard({ filters: { district: { id: { $eq: this.district } } } })
                // this.wards = this.listWard.map(o => { return { text: `${o.attributes.prefix} ${o.attributes.name}`, value: o.id } })
            }
            if(this.address.attributes?.wards?.data?.length > 0) {
                this.ward = this.address.attributes?.wards?.data[0].id
            }
        }
        this.province = 1
    },
    methods: {
        ...mapActions({
            getAddressByUser: "auth/getAddressByUser",
            getListProvince: 'user/getListProvince',
            getListDistrict: 'user/getListDistrict',
            getListWard: 'user/getListWard',
            registerByEmail: "auth/registerByEmail"
        }),
        async onNextStep() {
            if (!this.username || !this.phone || !this.email || !this.fulladdress ||
                !this.province || !this.ward || !this.district ) {
                // || (!this.password && !this.loggedIn)) {
                this.showNotification('warning', `Please enter complete information`)
                return
            }
            let checkEmail = this.validateEmail(this.email)
            if(!checkEmail || checkEmail.length === 0) {
                this.showNotification('warning', `Please enter the correct email address`)
                return
            }
            let checkPhone = this.validatePhone(this.phone)
            if(!checkPhone || checkPhone.length === 0) {
                this.showNotification('warning', `Please enter the correct phone number`)
                return
            }
            if(this.password) {
                let rs = await this.registerByEmail({
                    username: this.email,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                })
                if (rs) {
                    this.password = null
                    this.showNotification('success', `Update successful`)
                } else {
                    this.showNotification('danger', `Update failed, please try again`)
                    return
                }
            }
            let _u = {
                username: this.username,
                email: this.email,
                phone: this.phone,
                address: this.fulladdress,
                province: this.province,
                district: this.district,
                ward: this.ward
            }
            this.$emit('onChoiceAddress', _u)
        },
    }

}
</script>
<style lang="scss">
.user-address-panel {
    margin-top: 20px;

    .user-address-login-panel {
        margin-top: 20px;
    }

    .user-address-next-btn {
        width: 100%;
        height: 90px;
    }
}

.user-address-input {
    // height: 60px !important;
    // border-radius: 20px !important;
    // border: 1px solid #E8E8E8 !important;
    // background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FF6C15 !important;
    // margin-top: 8px !important;
    // margin-bottom: 8px !important;
    // font-family: 'inter-light';

    height: 50px !important;
    border: 1px solid #E8E8E8 !important;
    border-radius: 16px !important;
    font-size: 13px !important;
    line-height: 26px !important;
    margin-top: 8px;
    margin-bottom: 8px;
    font-family: 'inter-light';
}

.user-address-create-text {
    color: #000000;
    font-size: 16px;
    font-family: 'inter';
}

.user-address-checkbox {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 13px;
    font-family: 'inter';
    color: #777777;
}

.user-address-des-text {
    margin-top: 16px;
    font-size: 13px;
    font-family: 'inter';
    color: #777777;
    padding-left: 24px;
    line-height: 20px;
}

.user-address-btn {
    margin-top: 40px;
    width: 50%;
    float: right;
}

@media (max-width: 520px) {
    .user-address-input {
        height: 40px !important;
        font-size: 10px !important;
    }

    .user-address-checkbox {
        font-size: 7px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .user-address-des-text {
        font-size: 7px;
        margin-top: 0px;
        line-height: 12px;
    }

    .user-address-btn {
        margin-top: 30px;
        width: 100%;
        clear: both;
    }
}</style>