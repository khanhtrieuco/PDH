<template>
    <div class="payment-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div v-if="!isMobile">
            <div class="payment-container" v-if="!loggedIn && !isSkip && !paymentDone">
                <div class="container d-flex justify-content-around">
                    <div class="payment-info">
                        <div class="payment-title-text">{{ $t('Payment_text_1') }}</div>
                        <div class="payment-continue">
                            <div class="payment-continue-text">
                                {{ $t('Payment_text_2') }}
                            </div>
                            <div class="nas-btn" @click="isSkip = true">{{ $t('Payment') }}</div>
                        </div>
                    </div>
                    <div class="payment-info">
                        <div class="payment-title-text">{{ $t('Payment_text_3') }}</div>
                        <div class="payment-login">
                            <div class="payment-title-text-sub">{{ $t('Payment_text_33') }}</div>
                            <b-form-input class="input-login" v-model="username" placeholder="Email..."></b-form-input>
                            <b-form-input class="input-login" v-model="password" type="password"
                                v-on:keyup.enter="onLogin()" placeholder="Mật khẩu..."></b-form-input>
                            <div class="d-flex justify-content-between mb-3">
                                <b-form-checkbox v-model="remember" value="accepted" unchecked-value="not_accepted">
                                    {{ $t('Login_des_3') }}
                                </b-form-checkbox>
                                <div class="forget-pass">{{ $t('Login_des_4') }}</div>
                            </div>
                            <div class="nas-btn" @click="onLogin()">{{ $t('Login_title_1') }}</div>
                            <div class="login-line">{{ $t('Login_des_5') }}</div>
                            <div class="login-content-text">{{ $t('Login_title_3') }}</div>
                            <div class="login-social-text">{{ $t('Login_des_6') }}</div>
                            <div class="d-flex justify-content-start gap-3">
                                <img class="img-login" src="/images/facebook-btn.png" @click="$emit('closeUpdate')" />
                                <img class="img-login" src="/images/google-btn.png" @click="$emit('closeUpdate')" />
                            </div>
                            <div class="login-social-des">{{ $t('Login_des_7') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-panel" v-if="(loggedIn || isSkip) && !paymentDone">
                <div class="payment-main-info">
                    <b-container class="d-flex">
                        <div class="payment-left-info">
                            <div class="payment-step-title">1. {{ $t('Payment_title_1') }}</div>
                            <transition name="fade">
                                <div class="payment-step-content" v-show="stepShow === 'address'">
                                    <UserAddress :isMobile="isMobile" @onChoiceAddress="onChoiceAddress" :user="user" />
                                </div>
                            </transition>
                            <div class="payment-step-content" v-if="stepShow === 'shipping' || stepShow === 'payment'">
                                <div class="payment-edit-info" @click="stepShow = 'address'">{{ $t('Payment_des_11') }}
                                </div>
                                <div class="payment-edit-text">{{ user?.username }}</div>
                                <div class="payment-edit-text">{{ user?.address }}</div>
                                <div class="payment-edit-text">{{ user?.email }}</div>
                                <div class="payment-edit-text">{{ user?.phone }}</div>
                            </div>
                            <div class="payment-step-title">2. {{ $t('Payment_title_2') }}</div>
                            <transition name="fade">
                                <div class="payment-step-content" v-if="stepShow === 'shipping'">
                                    <Shipping :isMobile="isMobile" @onNextStep="stepShow = 'payment'"
                                        @choiceShipping="choiceShipping" />
                                </div>
                            </transition>
                            <div class="payment-step-content" v-if="stepShow === 'payment'">
                                <div class="payment-edit-info" @click="stepShow = 'shipping'">{{ $t('Payment_des_11') }}
                                </div>
                                <div v-if="user_shipping && user_shipping?.id"
                                    class="ship-menthod-item d-flex justify-content-between">
                                    <div class="ship-menthod-left-info">
                                        <span class="ship-menthod-name">
                                            {{ $i18n.locale === 'vn' ? user_shipping.attributes.name :
                                                user_shipping.attributes.name_en }}
                                        </span>
                                        <span class="ship-menthod-des">
                                            {{ `(${$i18n.locale === 'vn' ? user_shipping.attributes.description :
                                                user_shipping.attributes.description_en}
                                                                                        ${toDateAdd(user_shipping.attributes.date)})` }}
                                        </span>
                                    </div>
                                    <div class="ship-menthod-right-info">
                                        <span class="ship-menthod-main-price">₫ {{ user_shipping.attributes.price }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="payment-step-title">3. {{ $t('Payment') }}</div>
                            <transition name="fade">
                                <div class="payment-step-content" v-if="stepShow === 'payment'">
                                    <UserPayment :isMobile="isMobile" @onChoicePayment="onChoicePayment"
                                        @onChoicePaymentType="onChoicePaymentType" />
                                </div>
                            </transition>
                        </div>
                        <div class="payment-right-info">
                            <UserCart :listItem="listCart" :isMobile="isMobile" :isPaymentAccept="isPaymentAccept"
                                :priceShip="priceShip" @onPushOrder="onPushOrder" />
                        </div>
                    </b-container>
                </div>
                <HelpPayment />
            </div>
        </div>
        <div v-if="isMobile">
            <div class="container" v-if="!loggedIn && !isSkip && !paymentDone">
                <div class="payment-info">
                    <div class="payment-title-text">{{ $t('Payment_text_1') }}</div>
                    <div class="payment-continue">
                        <div class="payment-continue-text">
                            {{ $t('Payment_text_2') }}
                        </div>
                        <div class="nas-btn" @click="isSkip = true">{{ $t('Payment') }}</div>
                    </div>
                </div>
                <div class="payment-info">
                    <div class="payment-title-text">{{ $t('Payment_text_3') }}</div>
                    <div class="payment-login">
                        <div class="payment-title-text-sub">{{ $t('Payment_text_33') }}</div>
                        <b-form-input class="input-login" v-model="username" placeholder="Email..."></b-form-input>
                        <b-form-input class="input-login" v-model="password" type="password" v-on:keyup.enter="onLogin()"
                            placeholder="Mật khẩu..."></b-form-input>
                        <div class="d-flex justify-content-between mb-3">
                            <b-form-checkbox v-model="remember" value="accepted" unchecked-value="not_accepted">
                                {{ $t('Login_des_3') }}
                            </b-form-checkbox>
                            <div class="forget-pass">{{ $t('Login_des_4') }}</div>
                        </div>
                        <div class="nas-btn" @click="onLogin()">{{ $t('Login_des_3') }}</div>
                        <div class="login-line">{{ $t('Login_des_5') }}</div>
                        <div class="login-content-text">{{ $t('Login_title_3') }}</div>
                        <div class="login-social-text">{{ $t('Login_des_6') }}</div>
                        <div class="d-flex justify-content-start gap-3">
                            <img class="img-login" src="/images/facebook-btn.png" @click="$emit('closeUpdate')" />
                            <img class="img-login" src="/images/google-btn.png" @click="$emit('closeUpdate')" />
                        </div>
                        <div class="login-social-des">{{ $t('Login_des_7') }}</div>
                    </div>
                </div>
            </div>
            <div class="payment-panel" v-if="(loggedIn || isSkip) && !paymentDone">
                <b-container>
                    <div class="payment-left-info">
                        <div class="payment-step-title">1. {{ $t('Payment_title_3') }}</div>
                        <transition name="fade">
                            <div class="payment-step-content" v-show="stepShow === 'address'">
                                <UserAddress :isMobile="isMobile" @onChoiceAddress="onChoiceAddress" :user="user" />
                            </div>
                        </transition>
                        <div class="payment-step-content" v-if="stepShow === 'shipping' || stepShow === 'payment'">
                            <div class="payment-edit-info" @click="stepShow = 'address'">{{ $t('Payment_des_11') }}</div>
                            <div>{{ user?.username }}</div>
                            <div>{{ user?.address }}</div>
                            <div>{{ user?.email }}</div>
                            <div>{{ user?.phone }}</div>
                        </div>
                        <div class="payment-step-title">2. {{ $t('Payment_title_3') }}</div>
                        <transition name="fade">
                            <div class="payment-step-content" v-if="stepShow === 'shipping'">
                                <Shipping :isMobile="isMobile" @onNextStep="stepShow = 'payment'"
                                    @choiceShipping="choiceShipping" />
                            </div>
                        </transition>
                        <div class="payment-step-content" v-if="stepShow === 'payment'">
                            <div class="payment-edit-info" @click="stepShow = 'shipping'">{{ $t('Payment_des_11') }}</div>
                            <div v-if="user_shipping && user_shipping?.id"
                                class="ship-menthod-item d-flex justify-content-between">
                                <div class="ship-menthod-left-info">
                                    <span class="ship-menthod-name">
                                        {{ $i18n.locale === 'vn' ? user_shipping.attributes.name :
                                            user_shipping.attributes.name_en }}
                                    </span>
                                    <span class="ship-menthod-des">
                                        {{ `(${$i18n.locale === 'vn' ? user_shipping.attributes.description :
                                            user_shipping.attributes.description_en}
                                                                                ${toDateAdd(user_shipping.attributes.date)})` }}
                                    </span>
                                </div>
                                <div class="ship-menthod-right-info">
                                    <span class="ship-menthod-main-price">₫ {{ user_shipping.attributes.price }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="payment-step-title">3. {{ $t('Payment') }}</div>
                        <transition name="fade">
                            <div class="payment-step-content" v-if="stepShow === 'payment'">
                                <UserPayment :isMobile="isMobile" @onChoicePayment="onChoicePayment"
                                    @onChoicePaymentType="onChoicePaymentType" />
                            </div>
                        </transition>
                    </div>
                </b-container>
                <div class="payment-right-info">
                    <UserCart :listItem="listCart" :isMobile="isMobile" :isPaymentAccept="isPaymentAccept"
                        :priceShip="priceShip" @onPushOrder="onPushOrder" />
                </div>
                <HelpPayment />
            </div>
        </div>
        <a-modal title="Thông tin thanh toán" :visible="modalQrOpen" :destroyOnClose="true" :closable="false"
            :maskClosable="false" :footer="null" width="800px" @cancel="() => this.modalQrOpen = false">
            <Qrcode :isMobile="isMobile" :payment="payment_info" :qrcode="qrcode_info" @onDonePayment="onDonePayment" />
        </a-modal>
        <transition name="fade">
            <div>
                <div class="d-flex justify-content-center align-items-center container">
                    <div class="payment-done" v-if="paymentDone === 'success'">
                        <img class="payment-done-image" src="/images/order_success.png" />
                        <div class="payment-done-title">{{ $t('Payment_order_1') }}</div>
                        <div class="payment-done-id">{{ order.code }}</div>
                        <div class="payment-done-des">{{ $t('Payment_order_2') }}</div>
                        <div class="payment-done-des">{{ $t('Payment_order_22') }}</div>
                        <NuxtLink to="/">
                            <div class="payment-done-home-btn">{{ $t('Payment_order_23') }}</div>
                        </NuxtLink>
                    </div>
                    <div class="payment-done" v-if="paymentDone === 'fail'">
                        <img class="payment-done-image" src="/images/order_fail.png" />
                        <div class="payment-done-title">{{ $t('Payment_order_3') }}</div>
                        <div class="payment-done-des">{{ $t('Payment_order_4') }}</div>
                        <div class="d-flex justify-content-around" v-if="!isMobile">
                            <div class="payment-done-reorder-btn" @click="() => goReloadPage()">Re-order</div>
                            <NuxtLink to="/">
                                <div class="payment-done-home-btn">{{ $t('Home') }}</div>
                            </NuxtLink>
                        </div>
                        <div class="" v-else>
                            <div class="payment-done-reorder-btn" @click="() => goReloadPage()">Re-order</div>
                            <NuxtLink to="/">
                                <div class="payment-done-home-btn">{{ $t('Home') }}</div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="order-panel" v-if="paymentDone === 'success' || paymentDone === 'fail'">
                    <b-container>
                        <h3 class="order-title">{{ $t('Payment_order_5') }}</h3>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_6') }}</b-col>
                            <b-col class="order-des"><b>{{ order.code }}</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_7') }}</b-col>
                            <b-col class="order-des"><b>{{ order.pick_date }}</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_8') }}</b-col>
                            <b-col class="order-des"><b>{{ order.end_date }}</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_9') }}</b-col>
                            <b-col class="order-des"><b>{{ $t('Payment_order_10') }}</b></b-col>
                        </b-row>
                        <h3 class="order-title">{{ $t('Payment_order_11') }}</h3>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_12') }}</b-col>
                            <b-col class="order-des"><b>{{ order.productName }}</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_13') }}</b-col>
                            <b-col class="order-des"><b>{{ order.price | numberWithCommas }}{{ ' ' }}đ</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_14') }}</b-col>
                            <b-col class="order-des"><b>{{ order.price_ship | numberWithCommas }}{{ ' ' }}đ</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_15') }}</b-col>
                            <b-col class="order-des"><b>{{ order.discount_price ?? 0 | numberWithCommas }}{{ ' '
                            }}đ</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_16') }}</b-col>
                            <b-col class="order-des"><b>{{ order.price + order.price_ship | numberWithCommas }}{{ ' '
                            }}đ</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_order_17') }}</b-col>
                            <b-col class="order-des"><b>{{ order.cod | numberWithCommas }}{{ ' ' }}đ</b></b-col>
                        </b-row>
                        <h3 class="order-title">{{ $t('Payment_order_18') }}</h3>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_des_1') }}</b-col>
                            <b-col class="order-des"><b>{{ order.address_name }}</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_des_2') }}</b-col>
                            <b-col class="order-des"><b>{{ order.address_phone }}</b></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="order-des" cols="5">{{ $t('Payment_title_1') }}</b-col>
                            <b-col class="order-des"><b>{{ order.address_full }}</b></b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import LoginPopup from "~/components/loginpopup.vue"
import HelpPayment from "~/components/payment/helpInfo.vue"
import UserCart from "~/components/payment/myCart.vue"
import UserAddress from "~/components/payment/userAddress.vue"
import Shipping from "~/components/payment/shipping.vue"
import UserPayment from "~/components/payment/userPayment.vue"
import Qrcode from "~/components/payment/paymentQrcode.vue"

export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        LoginPopup,
        UserCart,
        HelpPayment,
        UserAddress,
        Shipping,
        UserPayment,
        Qrcode
    },
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$t('Cart'),
                    href: '/gio-hang'
                },
                {
                    text: this.$t('Payment'),
                    active: true
                }
            ],
            showLogin: false,
            isMobile: false,
            isSkip: false,
            isPaymentAccept: false,
            username: null,
            password: null,
            priceShip: 0,
            user_shipping: null,
            remember: 'not_accepted',
            stepShow: 'address',
            paymentDone: null,
            payment_type: null,
            payment_info: {},
            user: {},
            total_price: 0,
            order: {},
            modalQrOpen: false,
            qrcode_info: {}
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
                        text: this.$t('Cart'),
                        href: '/gio-hang'
                    },
                    {
                        text: this.$t('Payment'),
                        active: true
                    }
                ]
            }
        },
    },
    computed: {
        ...mapGetters({
            loggedIn: "auth/getloggedIn",
            profile: "auth/getProfile",
            listCart: "cart/getListCart",
            listPayment: 'payment/getListPayment',
        }),
    },
    async mounted() {
        this.isMobile = this.checkMobile()
        await this.loadData()
        await this.getListPayment()
    },
    watch: {
        stepShow: function (val) {
            if (val !== 'payment') {
                this.isPaymentAccept = false
            }
        }
    },
    methods: {
        ...mapActions({
            loginEmail: "auth/loginEmail",
            getListCart: "cart/getListCart",
            createOrder: "order/createOrder",
            resetUserCart: "cart/resetUserCart",
            createCart: "cart/createCart",
            getListPayment: "payment/getListPayment"
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
        goReloadPage() {
            this.stepShow = 'address'
            this.paymentDone = false
        },
        async onLogin() {
            if (!this.username || !this.password) {
                this.showNotification('warning', `Vui lòng nhập đử thông tin đăng nhập`)
                return
            }
            let rs = await this.loginEmail({
                identifier: this.username,
                password: this.password
            })
            if (rs) {
                this.$emit('closeUpdate')
                this.showNotification('success', `Đăng nhập thành công`)
            } else {
                this.showNotification('danger', `Đăng nhập thất bại vui lòng thử lại`)
            }
        },
        async onGoogleLogin() {
            window.location = '/api/connect/google'
        },
        async onFacebookLogin() {
            window.location = '/api/connect/facebook'
        },
        goRegister() {
            this.$emit('closeUpdate')
            this.$router.push({ path: '/dang-ky' })
        },
        async loadData() {
            if (this.profile.id) {
                let arrayFilter = [{ user: this.profile.id }]
                let populate = [
                    'product',
                    'product.thub'
                ]
                await this.getListCart({ filters: { '$and': arrayFilter }, populate })
            }
        },
        openLoginPopup() {
            this.showLogin = true
        },
        closeUpdate() {
            this.showLogin = false
            this.loadData()
        },
        onChoiceAddress(_user) {
            this.stepShow = 'shipping'
            this.user = _user
        },
        choiceShipping(_shipping) {
            this.user_shipping = _shipping
            if (_shipping.id) {
                this.priceShip = _shipping.attributes.price
            }
        },
        onChoicePayment(_payment) {
            if (_payment && _payment === 'cod') {
                this.isPaymentAccept = true
                this.payment_type = _payment
            }
        },
        onChoicePaymentType(_qr) {
            this.payment_info = _qr
            if (_qr && _qr.attributes && _qr.attributes.qr_code.data && _qr.attributes.qr_code.data.attributes.url) {
                this.isPaymentAccept = true
                this.payment_type = _qr.attributes.name
            }
        },
        onDonePayment() {
            this.modalQrOpen = false
            this.paymentDone = 'success'
        },
        async onPushOrder(price, listOrderCart) {
            let priceTotal = listOrderCart.reduce((_sum, o) => _sum + o.price * o.quantity, 0)
            let _order = {
                code: `#${this.makeString(8)}`,
                state: 'new',
                address_name: this.user.username,
                address_email: this.user.email,
                address_phone: this.user.phone,
                address_full: this.user.address,
                payment_type: this.payment_type,
                provinces: this.user.province,
                districts: this.user.district,
                wards: this.user.ward,
                shipping_id: this.user_shipping.id,
                shippingPrice: this.user_shipping ? this.user_shipping.attributes.price : 0,
                totalPrice: priceTotal + (this.user_shipping ? this.user_shipping.attributes.price : 0),
                listProductItem: listOrderCart.map(o => {
                    return {
                        id: o.id,
                        name: o.name,
                        quantity: o.quantity,
                        price: o.price
                    }
                })
            }
            let rs = await this.createOrder(_order)
            if (rs && rs.data) {
                this.order = rs.data
                this.showNotification('success', `Đã đặt đơn hàng thành công`)
                this.resetUserCart()
                if (this.payment_type !== 'cod') {
                    this.qrcode_info = _order
                    this.modalQrOpen = true
                } else {
                    this.paymentDone = 'success'
                }
            } else {
                this.showNotification('danger', `Đặt đơn hàng thất bại`)
                this.paymentDone = 'fail'
            }
        }
    }
}
</script>
<style lang="scss">
.payment-content {
    margin-top: 180px;
}

.breadcrumb {
    background-color: #FFF;
    padding-left: 0px;
}

.payment-container {
    background-color: #F5F5F5;
    padding-top: 80px;
    padding-bottom: 80px;
}

.payment-info {
    width: 460px;
}

.payment-title-text {
    color: #2F3036;
    font-size: 26px;
}

.payment-continue {
    margin-top: 30px;
    background-color: #FFF;
    border-radius: 20px;
    padding: 24px;

    .payment-continue-text {
        margin-bottom: 24px;
    }
}

.payment-login {
    margin-top: 30px;
    background-color: #FFF;
    border-radius: 20px;
    padding: 24px;
}

.payment-title-text-sub {
    margin-bottom: 20px;
    font-size: 13px;
    font-family: 'inter-light';
}

.payment-main-info {
    width: 100%;
    display: inline-flex;
    margin-bottom: 120px;

    .payment-left-info {
        width: calc(50% + 100px);
        display: inline-block;
        background-color: #FFFFFF;
        padding-right: 60px;

        .payment-step-title {
            font-size: 26px;
            color: #2F3036;
            border-bottom: 1px solid #AFAFAF;
            line-height: 90px;
        }
    }

    .payment-right-info {
        width: calc(50% - 100px);
        display: inline-block;
    }
}

.login-line {
    position: relative;

    &:before {
        content: "";
        display: block;
        width: calc(50% - 30px);
        height: 1px;
        background: #777;
        left: 0;
        top: 50%;
        position: absolute;
    }

    &:after {
        content: "";
        display: block;
        width: calc(50% - 30px);
        height: 1px;
        background: #777;
        right: 0;
        top: 50%;
        position: absolute;
    }
}

.payment-edit-info {
    margin-top: 16px;
    font-size: 10px;
    font-family: 'inter';
    text-align: right;
    text-decoration-line: underline;
    cursor: pointer;
}

.payment-edit-text {
    font-family: 'inter-light';
}

.payment-done {
    text-align: center;
    margin-top: 200px;
    margin-bottom: 200px;

    .payment-done-title {
        font-size: 24px;
        text-transform: uppercase;
        color: #100F0F;
        margin-top: 24px;
    }

    .payment-done-id {
        text-transform: uppercase;
        font-size: 22px;
        color: #F593A5;
    }

    .payment-done-des {
        color: #333436;
        font-size: 14px;
        font-family: 'inter';
        margin-top: 24px;
        width: 630px;
    }

    .payment-done-home-btn {
        font-size: 14px;
        font-family: 'inter';
        color: #100F0F;
        width: 200px;
        height: 45px;
        border-radius: 20px;
        border: 0.5px solid #000;
        line-height: 43px;
        cursor: pointer;
        margin-left: auto;
        margin-right: auto;
        margin-top: 32px;
    }

    .payment-done-reorder-btn {
        background-color: #F593A5;
        font-size: 14px;
        font-family: 'inter';
        color: #FDFDFD;
        width: 200px;
        height: 45px;
        border-radius: 20px;
        line-height: 43px;
        cursor: pointer;
        margin-top: 32px;
    }
}

.order-panel {
    background: #F5F5F5;
    padding-top: 70px;
    padding-bottom: 170px;
}

.order-title {
    color: #2F3036;
    font-size: 26px;
    border-bottom: 1px solid #AFAFAF;
    line-height: 70px;
    margin-bottom: 25px;
    margin-top: 25px;
}

.order-des {
    font-family: 'inter';
    font-size: 16px;
    line-height: 30px;
}

@media (max-width: 520px) {
    .payment-content {
        margin-top: 50px;
        padding-top: 1px;
        background-color: #F5F5F5;
    }

    .payment-info {
        width: 100%;
    }

    .payment-title-text {
        margin-top: 30px;
        color: #2F3036;
        text-align: center;
        font-size: 20px;
    }

    .payment-continue {
        .payment-continue-text {
            text-align: center;
            font-size: 10px;
            font-family: Inter;
            font-weight: 300;
        }
    }

    .payment-left-info {
        margin-top: 30px;

        .payment-step-title {
            font-size: 16px;
            color: #2F3036;
            border-bottom: 1px solid #AFAFAF;
            line-height: 60px;
        }
    }

    .payment-right-info {
        background-color: #fff;
        margin-top: 60px;
        padding-top: 30px;
    }

    .payment-done {
        .payment-done-title {
            font-size: 16px;
        }

        .payment-done-reorder-btn {
            width: 100%;
        }

        .payment-done-home-btn {
            width: 100%;
        }

        .payment-done-des {
            font-size: 12px;
            text-align: center;
            width: 100%;
        }
    }

    .payment-done {
        margin-top: 100px;
        margin-bottom: 50px;
    }

    .order-title {
        font-size: 18px;
        line-height: 50px;
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .order-des {
        font-size: 12px;
    }
}</style>