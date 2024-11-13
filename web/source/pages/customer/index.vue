<template>
    <div class="customer-content">
        <b-container v-if="!isMobile" style="position: relative;">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <ThumbImage class="customer-image" ratio="21-9" :src="bannerInfo.customer_care?.data.attributes.url ?? '/images/care.jpg'" v-if="!isMobile"></ThumbImage>
        <ThumbImage class="customer-image" ratio="4-3" :src="bannerInfo.customer_care_mobile?.data.attributes.url ?? '/images/care_mobile.jpg'" v-else></ThumbImage>
        <b-container v-if="!isMobile">
            <b-row>
                <b-col cols="4">
                    <h2 class="customer-title">{{ $t('Customer') }}</h2>
                </b-col>
                <b-col cols="4">
                    <div class="customer-tab-content">
                        <div class="customer-tab-info">{{ $t('Customer_title_1') }}</div>
                        <b-form-input class="customer-form-input" v-model="name" type="text"
                            :placeholder="$t('Customer_form_1')"></b-form-input>
                        <b-form-input class="customer-form-input" v-model="phone" type="text"
                            :placeholder="$t('Customer_form_2')"></b-form-input>
                        <b-form-input class="customer-form-input" v-model="email" type="text"
                            placeholder="Email*"></b-form-input>
                        <!-- <b-form-input class="customer-form-input" v-model="reason" type="text"
                            :placeholder="$t('Customer_form_3')"></b-form-input> -->
                        <b-form-select class="customer-form-input" v-if="$i18n.locale === 'vn'" v-model="reason" :options="reasons"></b-form-select>
                        <b-form-select class="customer-form-input" v-if="$i18n.locale === 'en'" v-model="reason" :options="reasons_en"></b-form-select>
                        <b-form-input class="customer-form-input" v-model="order_code" type="text"
                            :placeholder="$t('Customer_form_4')"></b-form-input>
                        <b-form-textarea class="customer-form-input" v-model="content" :placeholder="$t('Customer_form_5')"
                            rows="4" max-rows="6"></b-form-textarea>
                        <div class="nas-btn customer-btn" @click="onClickAdd">{{ $t('Customer_form_6') }}</div>
                    </div>
                </b-col>
                <b-col cols="4">
                    <div class="customer-tab-content">
                        <div class="customer-content-title">{{ $t('Customer_title_2') }}</div>
                        <div class="customer-content-text">Hotline: [...]</div>
                        <div class="customer-content-text">{{ $t('Customer_des_1') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_2') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_3') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_4') }}</div>
                        <div class="customer-content-link">{{ $t('Customer_title_2') }}</div>
                        <div class="customer-content-title mt-2">Email NAS</div>
                        <div class="customer-content-text">{{ $t('Customer_des_5') }}</div>
                        <div class="customer-content-link">{{ $t('Email NAS') }}</div>
                        <div class="customer-content-title mt-2">{{ $t('Customer_title_3') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_1') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_2') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_3') }}</div>
                        <div class="customer-content-text">{{ $t('Customer_des_4') }}</div>
                        <div class="customer-content-link">{{ $t('Customer_title_3') }}</div>
                        <div class="customer-content-title mt-2">{{ $t('Customer_title_4') }} </div>
                        <div class="customer-content-text">{{ $t('Customer_des_6') }}</div>
                        <NuxtLink to="/thong-tin-mua-sam">
                            <div class="customer-content-link">{{ $t('Customer_des_7') }}</div>
                        </NuxtLink>
                        <div class="customer-content-title mt-2">{{ $t('Customer_title_5') }} </div>
                        <div class="customer-content-text">{{ $t('Customer_des_8') }}</div>
                        <NuxtLink to="/faq">
                            <div class="customer-content-link">{{ $t('Customer_des_9') }}</div>
                        </NuxtLink>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-container v-else>
            <h2 class="customer-title">{{ $t('Customer') }}</h2>
            <div class="customer-tab-content">
                <div class="customer-tab-info">{{ $t('Customer_title_1') }}</div>
                <b-form-input class="customer-form-input" v-model="name" type="text"
                    :placeholder="$t('Customer_form_1')"></b-form-input>
                <b-form-input class="customer-form-input" v-model="phone" type="text"
                    :placeholder="$t('Customer_form_2')"></b-form-input>
                <b-form-input class="customer-form-input" v-model="email" type="text" placeholder="Email*"></b-form-input>
                <!-- <b-form-input class="customer-form-input" v-model="reason" type="text"
                    :placeholder="$t('Customer_form_3')"></b-form-input> -->
                <b-form-select class="customer-form-input" v-if="$i18n.locale === 'vn'" v-model="reason" :options="reasons"></b-form-select>
                <b-form-select class="customer-form-input" v-if="$i18n.locale === 'en'" v-model="reason" :options="reasons_en"></b-form-select>
                <b-form-input class="customer-form-input" v-model="order_code" type="text"
                    :placeholder="$t('Customer_form_4')"></b-form-input>
                <b-form-textarea class="customer-form-input" v-model="content" :placeholder="$t('Customer_form_5')" rows="4"
                    max-rows="6"></b-form-textarea>
                <div class="nas-btn customer-btn" @click="onClickAdd">{{}}</div>
            </div>
        </b-container>
        <div class="customer-tab-mobile-content" v-if="isMobile">
            <b-container>
                <div class="customer-content-title">{{ $t('Customer_title_2') }}</div>
                <div class="customer-content-text">Hotline: [...]</div>
                <div class="customer-content-text">{{ $t('Customer_des_1') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_2') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_3') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_4') }}</div>
                <div class="customer-content-link">{{ $t('Customer_title_2') }}</div>
                <div class="customer-content-title mt-2">Email NAS</div>
                <div class="customer-content-text">{{ $t('Customer_des_5') }}</div>
                <div class="customer-content-link">{{ $t('Email NAS') }}</div>
                <div class="customer-content-title mt-2">{{ $t('Customer_title_3') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_1') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_2') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_3') }}</div>
                <div class="customer-content-text">{{ $t('Customer_des_4') }}</div>
                <div class="customer-content-link">{{ $t('Customer_title_3') }}</div>
                <div class="customer-content-title mt-2">{{ $t('Customer_title_4') }} </div>
                <div class="customer-content-text">{{ $t('Customer_des_6') }}</div>
                <NuxtLink to="/thong-tin-mua-sam">
                    <div class="customer-content-link">{{ $t('Customer_des_7') }}</div>
                </NuxtLink>
                <div class="customer-content-title mt-2">{{ $t('Customer_title_5') }} </div>
                <div class="customer-content-text">{{ $t('Customer_des_8') }}</div>
                <NuxtLink to="/faq">
                    <div class="customer-content-link">{{ $t('Customer_des_9') }}</div>
                </NuxtLink>
            </b-container>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    mixins: [general],
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn"
        }),
    },
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$t('Customer'),
                    active: true
                }
            ],
            reasons: [
                { value: null, text: 'Chọn vấn đề bạn gặp phải', disabled: true },
                { value: 'Sản phẩm', text: 'Sản phẩm' },
                { value: 'Giao hàng', text: 'Giao hàng' },
                { value: 'Thanh toán', text: 'Thanh toán' },
                { value: 'Khuyến mãi', text: 'Khuyến mãi' },
                { value: 'Tài khoản', text: 'Tài khoản' },
                { value: 'Khác', text: 'Khác' }
            ],
            reasons_en: [
                { value: null, text: `You're having issue with`, disabled: true },
                { value: 'Sản phẩm', text: 'Product' },
                { value: 'Giao hàng', text: 'Delivery' },
                { value: 'Thanh toán', text: 'Payment' },
                { value: 'Khuyến mãi', text: 'Promotion' },
                { value: 'Tài khoản', text: 'Account' },
                { value: 'Khác', text: 'Orthers' }
            ],
            isMobile: false,
            name: null,
            email: null,
            phone: null,
            reason: null,
            order_code: null,
            content: null,
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('Customer'),
                        active: true
                    }
                ]
            }
        },
    },
    mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        if (this.profile) {
            this.email = this.profile.email
            this.phone = this.profile.phone
            this.name = this.profile.username
        }
        if (this.$route.hash) {
            this.order_code = this.$route.hash
        }
    },
    methods: {
        ...mapActions({
            createItem: "support/createItem",
            bannerInfo: "common/getBannerinfo",
        }),
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        async onClickAdd() {
            if (!this.name || !this.phone || !this.email || !this.reason || !this.content) {
                this.showNotification('warning', `Please enter complete information`)
                return
            }
            let _data = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                reason: this.reason,
                order_code: this.order_code,
                content: this.content,
                state: 'new'
            }
            await this.createItem({ data: _data })
            this.showNotification('success', `Your message has been received and we will contact you as soon as possible!`)
            this.name = null
            this.phone = null
            this.email = null
            this.reason = null
            this.order_code = null
            this.content = null
        }
    }
}
</script>
<style lang="scss">
.customer-content {
    margin-top: 180px;
    margin-bottom: 160px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.customer-image {
    margin-bottom: 40px;
}

.customer-tab-content {
    border-top: 1px solid #2F3036;
    padding-top: 30px;
}

.customer-title {
    color: #2F3036;
    font-size: 36px;
}

.customer-tab-info {
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter';
    font-weight: 700;
}

.customer-form-input {
    margin-top: 20px;
}

.customer-btn {
    margin-top: 30px;
    width: 200px;
}

.customer-content-title {
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter';
    font-weight: 700;
}

.customer-content-text {
    color: #777777;
    font-size: 13px;
    font-family: 'inter';
    font-weight: 200;
}

.customer-content-link {
    color: #777777;
    font-size: 13px;
    font-family: 'inter';
    font-style: italic;
    font-weight: 200;
    text-decoration-line: underline;
    margin-bottom: 30px;
}

@media (max-width: 520px) {
    .customer-content {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .customer-title {
        color: #515151;
        text-align: center;
        font-size: 20px;
        margin-bottom: 16px;
    }

    .customer-tab-info {
        font-size: 13px;
        font-family: 'inter';
        color: #2F3036;
    }

    .customer-form-input {
        font-size: 13px;
        font-family: 'inter-light';
        border-radius: 20px !important;
        border: 0.75px solid #515151 !important;
        height: 50px;
        line-height: 48px;
    }

    .customer-btn {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 24px;
    }

    .customer-tab-mobile-content {
        padding-top: 36px;
        padding-bottom: 36px;
        background-color: #E8E8E8;
    }

    .customer-content-title {
        margin-bottom: 8px;
    }

    .customer-content-text {
        margin-bottom: 8px;
    }
}
</style>