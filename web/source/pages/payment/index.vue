<template>
    <div class="payment-content">
        <div class="payment-content-top" v-if="!isMobile">
            <img class="payment-content-image" src="/images/top-account.jpg" />
            <div class="payment-content-name">checkout</div>
        </div>
        <div class="payment-content-name" v-if="isMobile && !paymentDone">checkout</div>
        <div class="payment-main-info" v-if="!paymentDone && !isMobile">
            <b-container class="d-flex">
                <div class="payment-left-info">
                    <div class="payment-step-card">
                        <div class="payment-step-title">1. {{ $t('Payment_title_1') }}</div>
                        <div class="payment-step-content" v-if="loggedIn">
                            <div class="payment-step-content-title">Email Address</div>
                            <div class="payment-step-content-text">lmydu99@gmail.com</div>
                        </div>
                        <div class="payment-step-content" v-if="!loggedIn">
                            <div class="payment-step-login-des">* E-mail (mary.smith@email.com)</div>
                            <b-form-input class="payment-step-input-login" v-model="username"
                                placeholder="Email*"></b-form-input>
                            <div class="payment-step-login-des">* Passwork</div>
                            <b-form-input class="payment-step-input-login" v-model="password" type="password"
                                placeholder="Password*"></b-form-input>
                            <div class="payment-step-input-btn" @click="onLogin()">continue</div>
                            <div class="page-login-google-btn d-flex justify-content-around align-items-center">
                                <img class="page-login-google-image" src="/images/google.png" />
                                <div class="page-login-google-text">CONTINUE WITH GOOGLE</div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-step-card">
                        <div class="payment-step-title">2. {{ $t('Payment_title_2') }}</div>
                        <div class="payment-step-content">
                            <div class="d-flex">
                                <div :class="`payment-step-shipping-choice ${shiping_type === 1 ? 'shiping-active' : ''}`"
                                    @click="shiping_type = 1">Ship to home</div>
                                <div :class="`payment-step-shipping-choice ${shiping_type === 2 ? 'shiping-active' : ''}`"
                                    @click="shiping_type = 2">Pick up Store</div>
                            </div>
                            <div class="payment-step-address-info" v-if="shiping_type === 1">
                                <div class="payment-step-address-update" @click="openAddressPopup" v-if="!user_address?.id">
                                    Bạn chưa có địa chỉ. Bấm vào đây để cập nhật địa chỉ.</div>
                                <div v-else>
                                    <div class="payment-step-address-name">{{ user_address?.attributes?.name }}</div>
                                    <div class="payment-step-address-des">{{ user_address?.attributes?.full_address }}</div>
                                    <div class="payment-step-address-des">{{ `${user_address?.attributes?.phone}` }}
                                    </div>
                                    <div class="payment-step-address-update mt-1" @click="openAddressPopup">Cập nhật</div>
                                </div>
                                <Address v-if="showUpdateAddress" :item="user_address" :isMobile="isMobile"
                                    @closeUpdate="closeUpdateAddress"></Address>
                            </div>
                            <div class="payment-step-address-info" v-if="shiping_type === 2">
                                <div class="payment-step-address-name">{{ $i18n.locale === 'vn' ? place.attributes?.name :
                                    place.attributes?.name_en }}</div>
                                <div class="payment-step-address-des">{{ $i18n.locale === 'vn' ? place.attributes?.address :
                                    place.attributes?.address_en }}</div>
                                <div class="payment-step-address-des">{{ $i18n.locale === 'vn' ?
                                    `Giờ mở cửa ${place.attributes?.time}` : `Opening Hours ${place.attributes?.time}` }}
                                </div>
                                <div class="payment-step-address-des">{{ `Hotline ${place.attributes?.phone}` }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-step-card">
                        <div class="payment-step-title">3. {{ $t('Payment') }}</div>
                        <div class="payment-step-content">
                            <div class="payment-step-type-name">Payment method</div>
                            <div class="payment-step-type-check">
                                <Check :checked="paymentType === 'cod'" @choice="onChoicePayment('cod')"></Check>
                                <div class="payment-step-type-text">COD</div>
                            </div>
                            <div class="payment-step-type-check">
                                <Check :checked="paymentType && paymentType !== 'cod'" @choice="onChoicePayment('online')">
                                </Check>
                                <div class="payment-step-type-text">Payment Online {{ current_payment.id ? ` -
                                    ${current_payment.attributes.name}` : `` }}</div>
                            </div>
                            <div class="user-payment-menthod-list" v-if="paymentType && paymentType !== 'cod'">
                                <div :class="`user-payment-menthod-item ${_pay.id === current_payment?.id ? 'user-payment-menthod-item-active' : ''}`"
                                    v-for="(_pay, index) in listPayment " :key="index">
                                    <img :src="_pay.attributes.thub.data.attributes.url" @click="onChoicePaymentType(_pay)"
                                        class="user-payment-icon" />
                                </div>
                            </div>
                            <div v-if="isPaymentAccept" class="payment-step-btn-perchase" @click="onPushOrder">Purchase
                            </div>
                            <div v-if="!isPaymentAccept" class="payment-step-btn-unperchase">Purchase</div>
                        </div>
                    </div>
                </div>
                <div class="payment-right-info">
                    <UserCart :listItem="listCart" :isMobile="isMobile" :priceShip="priceShip" />
                </div>
            </b-container>
        </div>
        <div class="payment-main-info" v-if="!paymentDone && isMobile">
            <b-container>
                <div class="payment-step-card">
                    <div class="payment-step-title">1. {{ $t('Payment_title_1') }}</div>
                    <div class="payment-step-content" v-if="loggedIn">
                        <div class="payment-step-content-title">Email Address</div>
                        <div class="payment-step-content-text">lmydu99@gmail.com</div>
                    </div>
                    <div class="payment-step-content" v-if="!loggedIn">
                        <div class="payment-step-login-des">* E-mail (mary.smith@email.com)</div>
                        <b-form-input class="payment-step-input-login" v-model="username"
                            placeholder="Email*"></b-form-input>
                        <div class="payment-step-login-des">* Passwork</div>
                        <b-form-input class="payment-step-input-login" v-model="password" type="password"
                            placeholder="Password*"></b-form-input>
                        <div class="payment-step-input-btn" @click="onLogin()">continue</div>
                        <div class="page-login-google-btn d-flex justify-content-around align-items-center">
                            <img class="page-login-google-image" src="/images/google.png" />
                            <div class="page-login-google-text">CONTINUE WITH GOOGLE</div>
                        </div>
                    </div>
                </div>
                <div class="payment-step-card">
                    <div class="payment-step-title">2. {{ $t('Payment_title_2') }}</div>
                    <div class="payment-step-content">
                        <div class="d-flex">
                            <div :class="`payment-step-shipping-choice ${shiping_type === 1 ? 'shiping-active' : ''}`"
                                @click="shiping_type = 1">Ship to home</div>
                            <div :class="`payment-step-shipping-choice ${shiping_type === 2 ? 'shiping-active' : ''}`"
                                @click="shiping_type = 2">Pick up Store</div>
                        </div>
                    </div>
                    <div class="payment-step-address-info" v-if="shiping_type === 1">
                        <div class="payment-step-address-update" @click="openAddressPopup" v-if="!user_address?.id">
                            Bạn chưa có địa chỉ. Bấm vào đây để cập nhật địa chỉ.</div>
                        <div v-else>
                            <div class="payment-step-address-name">{{ user_address?.attributes?.name }}</div>
                            <div class="payment-step-address-des">{{ user_address?.attributes?.full_address }}</div>
                            <div class="payment-step-address-des">{{ `${user_address?.attributes?.phone}` }}
                            </div>
                            <div class="payment-step-address-update mt-1" @click="openAddressPopup">Cập nhật</div>
                        </div>
                        <Address v-if="showUpdateAddress" :item="user_address" :isMobile="isMobile"
                            @closeUpdate="closeUpdateAddress"></Address>
                    </div>
                    <div class="payment-step-address-info" v-if="shiping_type === 2">
                        <div class="payment-step-address-name">{{ $i18n.locale === 'vn' ? place.attributes?.name :
                            place.attributes?.name_en }}</div>
                        <div class="payment-step-address-des">{{ $i18n.locale === 'vn' ? place.attributes?.address :
                            place.attributes?.address_en }}</div>
                        <div class="payment-step-address-des">{{ $i18n.locale === 'vn' ?
                            `Giờ mở cửa ${place.attributes?.time}` : `Opening Hours ${place.attributes?.time}` }}
                        </div>
                        <div class="payment-step-address-des">{{ `Hotline ${place.attributes?.phone}` }}</div>
                    </div>
                </div>
                <div class="payment-step-card">
                    <div class="payment-step-title">3. {{ $t('Payment') }}</div>
                    <div class="payment-step-content">
                        <div class="payment-step-type-check">
                            <Check :checked="paymentType === 'cod'" @choice="onChoicePayment('cod')"></Check>
                            <div class="payment-step-type-text">COD</div>
                        </div>
                        <div class="payment-step-type-check">
                            <Check :checked="paymentType && paymentType !== 'cod'" @choice="onChoicePayment('online')">
                            </Check>
                            <div class="payment-step-type-text">Payment Online</div>
                        </div>
                        <div class="user-payment-menthod-list" v-if="paymentType && paymentType !== 'cod'">
                            <div :class="`user-payment-menthod-item ${_pay.id === current_payment?.id ? 'user-payment-menthod-item-active' : ''}`"
                                v-for="(_pay, index) in listPayment " :key="index">
                                <img :src="_pay.attributes.thub.data.attributes.url" @click="onChoicePaymentType(_pay)"
                                    class="user-payment-icon" />
                            </div>
                        </div>
                        <div v-if="isPaymentAccept" class="payment-step-btn-perchase" @click="onPushOrder">Purchase
                        </div>
                        <div v-if="!isPaymentAccept" class="payment-step-btn-unperchase">Purchase</div>
                    </div>
                </div>
                <UserCart :listItem="listCart" :isMobile="isMobile" :priceShip="priceShip" />
            </b-container>
        </div>
        <div class="payment-success-info" v-if="paymentDone === 'success'">
            <div class="payment-order-top">
                <div class="payment-order-top-title">ORDERED SUCCESSFULLY</div>
                <div class="payment-order-top-code">#CH0220</div>
                <div class="payment-order-top-des">Your order is placed successfully, to track the order status, please
                    click
                    “My order” or add more products in the shopping cart </div>
                <div class="d-flex justify-content-between" v-if="!isMobile">
                    <div class="payment-order-btn" @click="goPage('/account')">my order</div>
                    <div class="payment-order-btn-shop" @click="goPage('/')">continue shopping</div>
                </div>
                <div v-if="isMobile">
                    <div class="payment-order-btn" @click="goPage('/account')">my order</div>
                    <div class="payment-order-btn-shop" @click="goPage('/')">continue shopping</div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">1. Customer Detail</div>
                <div class="payment-step-content">
                    <div class="d-flex justify-content-between">
                        <div class="w-50">
                            <div class="payment-step-success-title">Contact</div>
                            <div class="payment-step-success-text">Email: lmydu99@gmail.com</div>
                            <div class="payment-step-success-text">Phone: +66 785 5533</div>
                        </div>
                        <div class="w-50">
                            <div class="payment-step-success-title">Billing Address</div>
                            <div class="payment-step-success-text">Thuy Ninh Solngam Dulphi Lalalal</div>
                            <div class="payment-step-success-text">Salthom bangkok TH-36</div>
                            <div class="payment-step-success-text">+66 785 5533</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">2. Products</div>
                <div class="payment-step-content">
                    <div class="payment-product-item" v-for="(item, index) in listCart" :key="index">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="payment-product-img">
                                <img class="payment-product-image" :src="item.imagelink" />
                            </div>
                            <div class="payment-product-info">
                                <div class="payment-product-name">{{ item.name }}</div>
                                <div class="payment-product-des">Color:
                                    <span>{{ item.variant.attributes.color.data.attributes.name }}</span>
                                </div>
                                <div class="payment-product-des">Size:
                                    <span>
                                        {{ item.variant.attributes.size.data.attributes.name }}
                                    </span>
                                </div>
                                <div class="payment-product-des">Quantity
                                    <CartButton :inumber="item.quantity"
                                        @updateValue="(e) => updateCartValue(item.variant_id, e)" />
                                </div>
                                <div class="payment-product-price">
                                    {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">3. Order Detail</div>
                <div class="payment-step-content">
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Order number</div>
                        <div>#62936</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Date</div>
                        <div>July 27, 2023</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Payment method</div>
                        <div>Credit card</div>
                    </div>
                </div>
                <div class="payment-step-extra">
                    <div class="payment-step-extra-content">
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Subtotal</div>
                            <div>{{ 500000 | numberWithCommas }}{{ ' ' }}đ</div>
                        </div>
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Shipping</div>
                            <div>{{ 0 | numberWithCommas }}{{ ' ' }}đ</div>
                        </div>
                        <div class="payment-info-total d-flex justify-content-between">
                            <div class="">Total</div>
                            <div><b>{{ 500000 + 0 | numberWithCommas }}{{ ' ' }}đ</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="payment-success-info" v-if="paymentDone === 'fail'">
            <div class="payment-order-top">
                <div class="payment-order-top-title">ORDERED UUSUCCESSFULLY</div>
                <div class="payment-order-top-code">#CH0220</div>
                <div class="payment-order-top-des">Your order is unsuccessful in payment. Please re-order and check again your payment method to continue the shopping experiences</div>
                <div class="d-flex justify-content-between" v-if="!isMobile">
                    <div class="payment-order-btn" @click="goPage('/gio-hang')">Re-Order</div>
                    <div class="payment-order-btn-shop" @click="goPage('/')">HomePage</div>
                </div>
                <div v-if="isMobile">
                    <div class="payment-order-btn" @click="goPage('/gio-hang')">Re-Order</div>
                    <div class="payment-order-btn-shop" @click="goPage('/')">HomePage</div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">1. Customer Detail</div>
                <div class="payment-step-content">
                    <div class="d-flex justify-content-between">
                        <div class="w-50">
                            <div class="payment-step-success-title">Contact</div>
                            <div class="payment-step-success-text">Email: lmydu99@gmail.com</div>
                            <div class="payment-step-success-text">Phone: +66 785 5533</div>
                        </div>
                        <div class="w-50">
                            <div class="payment-step-success-title">Billing Address</div>
                            <div class="payment-step-success-text">Thuy Ninh Solngam Dulphi Lalalal</div>
                            <div class="payment-step-success-text">Salthom bangkok TH-36</div>
                            <div class="payment-step-success-text">+66 785 5533</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">2. Products</div>
                <div class="payment-step-content">
                    <div class="payment-product-item" v-for="(item, index) in listCart" :key="index">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="payment-product-img">
                                <img class="payment-product-image" :src="item.imagelink" />
                            </div>
                            <div class="payment-product-info">
                                <div class="payment-product-name">{{ item.name }}</div>
                                <div class="payment-product-des">Color:
                                    <span>{{ item.variant.attributes.color.data.attributes.name }}</span>
                                </div>
                                <div class="payment-product-des">Size:
                                    <span>
                                        {{ item.variant.attributes.size.data.attributes.name }}
                                    </span>
                                </div>
                                <div class="payment-product-des">Quantity
                                    <CartButton :inumber="item.quantity"
                                        @updateValue="(e) => updateCartValue(item.variant_id, e)" />
                                </div>
                                <div class="payment-product-price">
                                    {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">3. Order Detail</div>
                <div class="payment-step-content">
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Order number</div>
                        <div>#62936</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Date</div>
                        <div>July 27, 2023</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Payment method</div>
                        <div>Credit card</div>
                    </div>
                </div>
                <div class="payment-step-extra">
                    <div class="payment-step-extra-content">
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Subtotal</div>
                            <div>{{ 500000 | numberWithCommas }}{{ ' ' }}đ</div>
                        </div>
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Shipping</div>
                            <div>{{ 0 | numberWithCommas }}{{ ' ' }}đ</div>
                        </div>
                        <div class="payment-info-total d-flex justify-content-between">
                            <div class="">Total</div>
                            <div><b>{{ 500000 + 0 | numberWithCommas }}{{ ' ' }}đ</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal title="Thông tin thanh toán" :visible="modalQrOpen" :destroyOnClose="true" :closable="false"
            :maskClosable="false" :footer="null" width="800px" @cancel="() => this.modalQrOpen = false">
            <Qrcode :isMobile="isMobile" :payment="current_payment" :qrcode="qrcode_info" @onDonePayment="onDonePayment" />
        </a-modal>
        <HelpPayment :isMobile="isMobile" />
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import HelpPayment from "~/components/payment/helpInfo.vue"
import UserCart from "~/components/payment/myCart.vue"
import Address from "~/components/account/address.vue"
import Qrcode from "~/components/payment/paymentQrcode.vue"

export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        UserCart,
        HelpPayment,
        Address,
        Qrcode
    },
    data() {
        return {
            showLogin: false,
            isMobile: false,
            username: null,
            password: null,
            priceShip: 0,
            shiping_type: 1,
            stepShow: 'address',
            paymentDone: null,
            user: {},
            total_price: 0,
            order: {},
            showUpdateAddress: false,
            user_address: null,
            paymentType: null,
            current_payment: {},
            isPaymentAccept: false,
            modalQrOpen: false,
            qrcode_info: {}
        }
    },
    computed: {
        ...mapGetters({
            loggedIn: "auth/getloggedIn",
            profile: "auth/getProfile",
            listCart: "cart/getListUserCart",
            listPayment: 'payment/getListPayment',
            place: 'place/getPlace',
            userAddress: 'auth/getAddress'
        }),
    },
    async mounted() {
        this.isMobile = this.checkMobile()
        await this.getListCartUser()
        await this.getListPayment()
        await this.getAddressByUser(this.profile.id)
        this.user_address = this.userAddress
        await this.getPlace()
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
            createOrder: "order/createOrder",
            resetUserCart: "cart/resetUserCart",
            getListCartUser: "cart/getListCartUser",
            createCart: "cart/createCart",
            getListPayment: "payment/getListPayment",
            getPlace: 'place/getPlace',
            getAddressByUser: 'auth/getAddressByUser'
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
        goRegister() {
            this.$emit('closeUpdate')
            this.$router.push({ path: '/dang-ky' })
        },
        openLoginPopup() {
            this.showLogin = true
        },
        closeUpdate() {
            this.showLogin = false
            this.loadData()
        },
        openAddressPopup() {
            this.showUpdateAddress = true
        },
        async closeUpdateAddress() {
            this.showUpdateAddress = false
            await this.getAddressByUser(this.profile.id)
            this.user_address = this.userAddress
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
                this.paymentType = _payment
            } else {
                this.isPaymentAccept = false
                this.paymentType = _payment
            }
        },
        onChoicePaymentType(_qr) {
            this.current_payment = _qr
            if (_qr && _qr.attributes && _qr.attributes.qr_code.data && _qr.attributes.qr_code.data.attributes.url) {
                this.isPaymentAccept = true
                this.paymentType = _qr.attributes.name
            }
            // this.modalQrOpen = true
        },
        onDonePayment() {
            this.modalQrOpen = false
            this.paymentDone = 'success'
        },
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
        },
        async onPushOrder() {
            let priceTotal = this.listCart.reduce((_sum, o) => _sum + o.price * o.quantity, 0)
            let _order = {
                code: `#${this.makeString(8)}`,
                state: 'new',
                payment_type: this.paymentType,
                shippingType: this.shiping_type === 1 ? 'ShipToHome' : 'PickUpStore',
                totalPrice: priceTotal,
                listProductItem: this.listCart.map(o => {
                    return {
                        id: o.id,
                        variant_id: o.variant_id,
                        name: o.name,
                        quantity: o.quantity,
                        price: o.price
                    }
                })
            }
            let rs = await this.createOrder(_order)
            if (rs && rs.data) {
                this.order = rs.data
                if (this.paymentType !== 'cod') {
                    this.showNotification('success', `Đã đặt đơn hàng thành công. Vui lòng thanh toán.`)
                    this.resetUserCart()
                    this.qrcode_info = {
                        ..._order,
                        address_name: this.user_address.attributes?.name,
                        address_phone: this.user_address.attributes?.phone,
                        address_full: this.user_address.attributes?.full_address
                    }
                    this.modalQrOpen = true
                } else {
                    this.showNotification('success', `Đã đặt đơn hàng thành công`)
                    this.resetUserCart()
                    this.paymentDone = 'success'
                }
            } else {
                this.showNotification('danger', `Đặt đơn hàng thất bại`)
                this.paymentDone = 'fail'
            }
        },
        async onLogin() {
            if (!this.username || !this.password) {
                this.showNotification('warning', `Vui lòng nhập đủ thông tin đăng nhập`)
                return
            }
            let rs = await this.loginEmail({
                identifier: this.username,
                password: this.password
            })
            if (rs) {
                this.showNotification('success', `Đăng nhập thành công`)
            } else {
                this.showNotification('danger', `Đăng nhập thất bại vui lòng thử lại`)
            }
        },
        async onGoogleLogin() {
            window.location = '/api/connect/google'
        }
    }
}
</script>
<style lang="scss">
.payment-content {
    .payment-content-top {
        position: relative;

        .payment-content-image {
            width: 100%;
        }

        .payment-content-name {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 90px;
            color: #FFF;
            text-align: center;
            font-family: 'Aeroport-light';
            font-size: 50px;
            text-transform: uppercase;
        }
    }

    .payment-main-info {
        margin: 100px 0px;

        .payment-left-info {
            width: calc(100% - 520px);
            margin-right: 30px;
        }
    }

    .payment-success-info {
        width: 1000px;
        margin: 100px auto;

        .payment-order-top {
            margin-bottom: 80px;
            width: 500px;
            margin-left: auto;
            margin-right: auto;

            .payment-order-top-title {
                text-align: center;
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 35px;
                text-transform: uppercase;
            }

            .payment-order-top-code {
                margin-top: 30px;
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 22px;
                text-transform: uppercase;
            }

            .payment-order-top-des {
                margin-top: 10px;
                margin-bottom: 20px;
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 16px;
            }

            .payment-order-btn {
                width: 240px;
                height: 50px;
                line-height: 50px;
                border: 1px solid #000;
                cursor: pointer;
                font-family: 'Aeroport-light';
                color: #000;
                text-align: center;
                text-transform: uppercase;
                font-size: 16px;
            }

            .payment-order-btn-shop {
                width: 240px;
                height: 50px;
                line-height: 50px;
                background-color: #000;
                cursor: pointer;
                font-family: 'Aeroport-light';
                color: #fff;
                text-align: center;
                text-transform: uppercase;
                font-size: 16px;
            }
        }

        .payment-product-item {
            margin: 20px 0px;

            .payment-product-img {
                .payment-product-image {
                    width: 150px;
                    height: 170px;
                    object-fit: cover;
                }
            }

            .payment-product-info {
                width: calc(100% - 180px);
                margin-left: 25px;
                padding-top: 30px;
                position: relative;

                .payment-product-name {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                    text-transform: uppercase;
                }

                .payment-product-des {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 14px;
                    margin-top: 8px;
                    margin-bottom: 8px;

                    span {
                        color: #000;
                    }
                }

                .payment-product-price {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                }
            }
        }
    }

    .payment-step-card {
        border: 1px solid #D9D9D9;
        margin-bottom: 30px;

        .payment-step-title {
            border-bottom: 1px solid #D9D9D9;
            height: 50px;
            line-height: 50px;
            padding: 0px 25px;
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 16px;
            text-transform: uppercase;
        }

        .payment-step-content {
            padding: 25px;

            .payment-step-content-title {
                color: #000;
                font-family: 'Aeroport';
                font-size: 16px;
                text-transform: uppercase;
            }

            .payment-step-content-text {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 16px;
            }

            .payment-step-shipping-choice {
                background-color: #D9D9D9;
                height: 80px;
                width: 50%;
                line-height: 80px;
                text-align: center;
                cursor: pointer;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 16px;
                text-transform: uppercase;
            }

            .shiping-active {
                font-family: 'Aeroport';
                background-color: #fff;

            }

            .payment-step-btn-perchase {
                width: 100%;
                height: 50px;
                line-height: 50px;
                background-color: #000;
                color: #FFF;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 20px;
                text-transform: uppercase;
                cursor: pointer;
                margin-top: 50px;
            }

            .payment-step-btn-unperchase {
                width: 100%;
                height: 50px;
                line-height: 50px;
                background-color: #000;
                color: #FFF;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 20px;
                text-transform: uppercase;
                cursor: not-allowed;
                margin-top: 50px;
            }

            .payment-step-success-title {
                color: #000;
                font-family: 'Aeroport';
                font-size: 18px;
                margin-bottom: 10px;
            }

            .payment-step-success-text {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 18px;
                margin-bottom: 10px;
            }
        }

        .payment-step-extra {
            border-top: 1px solid #D9D9D9;
            padding: 25px;
            display: flex;
            justify-content: flex-end;

            .payment-step-extra-content {
                width: 370px;

                .payment-info-text {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 18px;
                    margin-bottom: 10px;
                }

                .payment-info-total {
                    border-top: 1px solid #D9D9D9;
                    padding-top: 10px;
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 18px;
                    margin-bottom: 10px;
                }
            }
        }

        .payment-step-login-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 16px;
        }

        .payment-step-input-login {
            width: 100%;
            height: 55px;
            padding: 11px 16px;
            border: 1px solid #000;
            margin-top: 10px;
            margin-bottom: 20px;
            border-radius: 0px;
            font-family: 'Aeroport-light';
            color: #000;
        }

        .payment-step-input-btn {
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

            &::after {
                content: '';
                position: absolute;
                bottom: -40px;
                left: 0px;
                width: 100%;
                height: 1px;
                border-top: 1px solid #D9D9D9;
            }
        }

        .page-login-google-btn {
            width: 100%;
            height: 75px;
            line-height: 75px;
            margin-top: 80px;
            border: 1px solid #000;
            cursor: pointer;

            .page-login-google-image {
                width: 40px;
                margin-left: 100px;
            }

            .page-login-google-text {
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 21px;
                font-weight: 700;
                margin-right: 100px;

            }
        }

        .payment-step-address-info {
            margin-top: 30px;
            padding-left: 20px;

            .payment-step-address-update {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 16px;
                text-transform: uppercase;
                text-decoration-line: underline;
                cursor: pointer;
            }

            .payment-step-address-name {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 16px;
                text-transform: uppercase;
                margin-bottom: 10px;
            }

            .payment-step-address-des {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 15px;
            }
        }

        .payment-step-type-name {
            color: #000;
            font-family: 'Aeroport';
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 30px;
        }

        .payment-step-type-check {
            background-color: #F4F4F4;
            height: 55px;
            line-height: 55px;
            width: 100%;
            padding: 0px 20px;
            margin-bottom: 20px;
        }

        .payment-step-type-text {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 16px;
            display: inline-block;
            margin-left: 20px;
        }

        .user-payment-menthod-list {
            width: 80%;
            margin-top: 10px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: space-around;

            .user-payment-menthod-item {
                padding: 20px 10px;
                border-radius: 10px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 120px;
                cursor: pointer;

                &:hover {
                    background-color: #F4F4F4;

                }
            }

            .user-payment-menthod-item-active {
                background-color: #F4F4F4;
            }

            .user-payment-icon {
                max-height: 45px;
                cursor: pointer;
            }
        }
    }
}

@media (max-width: 520px) {
    .payment-content {
        .payment-content-name {
            position: relative;
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 20px;
            text-transform: uppercase;
            margin-top: 40px;
            margin-bottom: 30px;
        }

        .payment-main-info {
            margin: 60px 0px;

        }

        .payment-success-info {
            width: 100%;
            margin: 60px auto;
            padding: 0px 15px;

            .payment-order-top {
                margin-bottom: 10px;
                width: 100%;
                margin-left: auto;
                margin-right: auto;

                .payment-order-top-title {
                    text-align: center;
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 20px;
                    text-transform: uppercase;
                }

                .payment-order-top-code {
                    margin-top: 20px;
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 17px;
                    text-transform: uppercase;
                }

                .payment-order-top-des {
                    margin-top: 10px;
                    margin-bottom: 20px;
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                }

                .payment-order-btn {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid #000;
                    cursor: pointer;
                    font-family: 'Aeroport-light';
                    color: #000;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 11px;
                    margin-bottom: 20px;
                }

                .payment-order-btn-shop {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    background-color: #000;
                    cursor: pointer;
                    font-family: 'Aeroport-light';
                    color: #fff;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 11px;
                }
            }

            .payment-product-item {
                margin: 20px 0px;

                .payment-product-img {
                    .payment-product-image {
                        width: 70px;
                        height: 90px;
                        object-fit: cover;
                    }
                }

                .payment-product-info {
                    width: calc(100% - 85px);
                    margin-left: 15px;
                    padding-top: 10px;
                    position: relative;

                    .payment-product-name {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 10px;
                        text-transform: uppercase;
                    }

                    .payment-product-des {
                        color: #717171;
                        font-family: 'Aeroport-light';
                        font-size: 9px;
                        margin-top: 8px;
                        margin-bottom: 8px;

                        span {
                            color: #000;
                        }
                    }

                    .payment-product-price {
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        font-size: 11px;
                    }
                }
            }
        }

        .payment-step-card {
            border: 1px solid #D9D9D9;
            margin-bottom: 30px;

            .payment-step-title {
                border-bottom: 1px solid #D9D9D9;
                height: 30px;
                line-height: 30px;
                padding: 0px 15px;
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 12px;
                text-transform: uppercase;
            }

            .payment-step-content {
                padding: 15px;

                .payment-step-content-title {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 10px;
                    text-transform: uppercase;
                }

                .payment-step-content-text {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                }

                .payment-step-shipping-choice {
                    background-color: #D9D9D9;
                    height: 40px;
                    width: 50%;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 11px;
                    text-transform: uppercase;
                }

                .shiping-active {
                    font-family: 'Aeroport';
                    background-color: #fff;

                }

                .payment-step-btn-perchase {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    background-color: #000;
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 12px;
                    text-transform: uppercase;
                    cursor: pointer;
                    margin-top: 20px;
                }

                .payment-step-btn-unperchase {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    background-color: #000;
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 12px;
                    text-transform: uppercase;
                    cursor: not-allowed;
                    margin-top: 20px;
                }

                .payment-step-success-title {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 11px;
                    margin-bottom: 10px;
                }

                .payment-step-success-text {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 11px;
                    margin-bottom: 10px;
                }
            }

            .payment-step-extra {
                border-top: 1px solid #D9D9D9;
                padding: 15px;
                display: flex;
                justify-content: flex-end;

                .payment-step-extra-content {
                    width: 100%;

                    .payment-info-text {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 11px;
                        margin-bottom: 10px;
                    }

                    .payment-info-total {
                        border-top: 1px solid #D9D9D9;
                        padding-top: 10px;
                        color: #000;
                        font-family: 'Aeroport';
                        font-size: 11px;
                        margin-bottom: 10px;
                    }
                }
            }

            .payment-step-login-des {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 10px;
            }

            .payment-step-input-login {
                width: 100%;
                height: 30px;
                padding: 11px 16px;
                border: 1px solid #000;
                margin-top: 5px;
                margin-bottom: 10px;
                border-radius: 0px;
                font-family: 'Aeroport-light';
                font-size: 9px;
                color: #000;
            }

            .payment-step-input-btn {
                width: 100%;
                height: 30px;
                line-height: 28px;
                text-align: center;
                color: #FFF;
                border: 1px solid #000;
                background-color: #000;
                font-family: 'Aeroport';
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                cursor: pointer;
                margin-top: 20px;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: -22px;
                    left: 0px;
                    width: 100%;
                    height: 1px;
                    border-top: 1px solid #D9D9D9;
                }
            }

            .page-login-google-btn {
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin-top: 40px;
                border: 1px solid #000;
                cursor: pointer;

                .page-login-google-image {
                    width: 30px;
                    margin-left: 30px;
                }

                .page-login-google-text {
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 12px;
                    font-weight: 700;
                    margin-right: 30px;

                }
            }

            .payment-step-address-info {
                margin-top: 0px;
                padding-left: 20px;
                padding-bottom: 10px;

                .payment-step-address-update {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 9px;
                    text-transform: uppercase;
                    text-decoration-line: underline;
                    cursor: pointer;
                }

                .payment-step-address-name {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }

                .payment-step-address-des {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 9px;
                }
            }

            .payment-step-type-name {
                color: #000;
                font-family: 'Aeroport';
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 30px;
            }

            .payment-step-type-check {
                background-color: #F4F4F4;
                height: 30px;
                line-height: 28px;
                width: 100%;
                padding: 0px 10px;
                margin-bottom: 10px;
            }

            .payment-step-type-text {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 10px;
                display: inline-block;
                margin-left: 10px;
            }

            .user-payment-menthod-list {
                width: 80%;
                margin-top: 10px;
                margin-left: auto;
                margin-right: auto;
                display: flex;
                justify-content: space-around;

                .user-payment-menthod-item {
                    padding: 10px 5px;
                    border-radius: 10px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 80px;
                    cursor: pointer;

                    &:hover {
                        background-color: #F4F4F4;

                    }
                }

                .user-payment-menthod-item-active {
                    background-color: #F4F4F4;
                }

                .user-payment-icon {
                    max-height: 25px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>