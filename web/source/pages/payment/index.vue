<template>
    <div class="payment-content">
        <div class="payment-content-top" v-if="!isMobile">
            <!-- <img class="payment-content-image" src="/images/top-account.jpg" /> -->
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
                            <div class="payment-step-content-text">{{ profile.email }}</div>
                        </div>
                        <div class="payment-step-content" v-if="!loggedIn">
                            <div class="payment-step-login-des">* E-mail (mary.smith@email.com)</div>
                            <b-form-input class="payment-step-input-login" v-model="username"
                                placeholder="Email*"></b-form-input>
                            <div class="payment-step-login-des">* Password</div>
                            <b-form-input class="payment-step-input-login" v-model="password" type="password"
                                placeholder="Password*"></b-form-input>
                            <div class="payment-forgotpass" @click="showReset = true">Forgot password</div>
                            <div class="payment-step-input-btn" @click="onLogin()">continue</div>
                            <div class="page-login-google-btn d-flex justify-content-around align-items-center">
                                <img class="page-login-google-image" src="/images/google.png" />
                                <div class="page-login-google-text" @click="onGoogleLogin">CONTINUE WITH GOOGLE</div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-step-card">
                        <div :class="stepName >= 1 ? 'payment-step-title' : 'payment-step-title-inactive'">2. {{ $t('Payment_title_2') }}</div>
                            <div v-if="stepName >= 1">
                                <div class="payment-step-content">
                                    <div class="payment-step-address-info" v-if="shiping_type === 1">
                                        <div>
                                            <div class="payment-step-address-info-title">Shipping Option</div>
                                            <div v-for="(_ship, index) in listShipping " :key="index">
                                                <div style="display: flex;gap: 4px;justify-items: center;align-items: center;margin: 5px 0px;">
                                                    <input type="radio" :id="_ship.id" :value="_ship.id" v-model="shipItem" @click="onCheckShipping(_ship.id)" />
                                                    <div style="display: flex;width: 100%;justify-content: space-between;padding-right: 10px;align-items: center; font-size: 10px;">
                                                        <div class="payment-shipping-name" :for="_ship.id">{{_ship.attributes.name}}</div>
                                                        <div class="payment-shipping-price" >{{_ship.attributes.price}} $</div>
                                                    </div>                                        
                                                </div>
                                                <div  class="payment-shipping-des">{{ _ship.attributes.description }}</div>
                                            </div>
                                        </div>
                                        <div class="payment-step-address-update" @click="openAddressPopup"
                                            v-if="!user_address?.id">
                                            You don't have an address yet. Click here to update the address.</div>
                                        <div v-else>
                                            <div class="payment-step-address-info-title">Shipping Address</div>
                                            <div class="payment-step-address-name">{{ user_address?.attributes?.name }}</div>
                                            <div class="payment-step-address-des">
                                                <!-- {{ user_address?.attributes?.full_address }}{{ user_address?.attributes?.wards.data?.length > 0 ? `, ${user_address?.attributes?.wards.data[0].attributes.prefix} ${user_address?.attributes?.districts.data[0].attributes.name}` : ""}}{{ user_address?.attributes?.districts.data?.length > 0 ? `, ${user_address?.attributes?.districts.data[0].attributes.prefix} ${user_address?.attributes?.wards.data[0].attributes.name}` : ""}}{{ user_address?.attributes?.provinces.data?.length > 0 ? ", " + user_address?.attributes?.provinces.data[0].attributes.name : ""}} -->
                                                {{ getFullAddress(user_address) }}
                                            </div>
                                            <div class="payment-step-address-des">{{ `${user_address?.attributes?.phone}` }}
                                            </div>
                                            <div class="payment-step-address-update mt-1" @click="openAddressPopup">Save</div>
                                        </div>
                                        <!-- <Address v-if="showUpdateAddress" :item="user_address" :isMobile="isMobile"
                                            @closeUpdate="closeUpdateAddress"></Address> -->
                                        <a-modal title="" :visible="showUpdateAddress" :destroyOnClose="true" :closable="true"
                                            :maskClosable="false" :footer="null" width="800px" @cancel="() => this.showUpdateAddress = false">
                                            <Address v-if="showUpdateAddress" :item="user_address" :isMobile="isMobile" @closeUpdate="closeUpdateAddress"></Address>
                                        </a-modal>
                                    </div>
                                    <div class="payment-step-address-info" v-if="shiping_type === 2">
                                        <div class="payment-step-address-name">{{ $i18n.locale === 'vn' ? place.attributes?.name
                                            : place.attributes?.name_en }}</div>
                                        <div class="payment-step-address-des">{{ $i18n.locale === 'vn' ?
                                            place.attributes?.address : place.attributes?.address_en }}</div>
                                        <div class="payment-step-address-des">{{ $i18n.locale === 'vn' ?
                                            `Giờ mở cửa ${place.attributes?.time}` : `Opening Hours ${place.attributes?.time}` }}
                                        </div>
                                        <div class="payment-step-address-des">{{ `Hotline ${place.attributes?.phone}` }}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-step-card">
                        <div :class="stepName >= 2 ? 'payment-step-title' : 'payment-step-title-inactive'">3. {{ $t('Payment') }}</div>
                            <div class="payment-step-content" v-show="stepName >= 2">
                                <div class="payment-method-title">Payment Method</div>
                                <div class="payment-method" v-for="(_pay, index) in listPayment " :key="index">
                                    <input type="radio" :id="_pay.id" :value="_pay.id" v-model="payItem" @click="onChoicePayment(_pay)" />
                                    <div style="display: flex;width: 100%;gap: 0.5rem;padding-right: 10px;align-items: center;">
                                        <img :src="_pay.attributes.thub.data.attributes.url" class="payment-method-icon" />
                                        <div class="payment-method-name" :for="_pay.id">{{_pay.attributes.name}}</div>
                                    </div>   
                                </div>
                                <div v-show="payChoice > 0" class="payment-method-title mt-4">Payment Detail</div>
                                <div v-show="payChoice === 3">
                                    <div id="paypal-button-container"></div>
                                </div>                        
                                <div v-show="payChoice === 4 || payChoice === 1">
                                    <div class="payment-step-btn-perchase" @click="onPushOrderOnline">Purchase
                                    </div>
                                </div>
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
                        <div class="payment-step-content-text">{{ profile.email }}</div>
                    </div>
                    <div class="payment-step-content" v-if="!loggedIn">
                        <div class="payment-step-login-des">* E-mail (mary.smith@email.com)</div>
                        <b-form-input class="payment-step-input-login" v-model="username"
                            placeholder="Email*"></b-form-input>
                        <div class="payment-step-login-des">* Password</div>
                        <b-form-input class="payment-step-input-login" v-model="password" type="password"
                            placeholder="Password*"></b-form-input>
                        <div class="payment-forgotpass" @click="showReset = true">Forgot password</div>
                        <div class="payment-step-input-btn" @click="onLogin()">continue</div>
                        <div class="page-login-google-btn d-flex justify-content-around align-items-center">
                            <img class="page-login-google-image" src="/images/google.png" />
                            <div class="page-login-google-text" @click="onGoogleLogin">CONTINUE WITH GOOGLE</div>
                        </div>
                    </div>
                </div>
                <div class="payment-step-card">
                    <div :class="stepName >= 1 ? 'payment-step-title' : 'payment-step-title-inactive'">2. {{ $t('Payment_title_2') }}</div>
                    <div v-if="stepName >= 1">
                        <div class="payment-step-address-info" v-if="shiping_type === 1">
                            <div>
                                <div class="payment-step-address-info-title">Shipping Option</div>
                                <div v-for="(_ship, index) in listShipping " :key="index">
                                    <div style="display: flex;gap: 4px;justify-items: center;align-items: center;margin: 5px 0px;">
                                        <input type="radio" :id="_ship.id" :value="_ship.id" v-model="shipItem" @click="onCheckShipping(_ship.id)" />
                                        <div style="display: flex;width: 100%;justify-content: space-between;padding-right: 10px;align-items: center; font-size: 10px;">
                                            <div class="payment-shipping-name" :for="_ship.id">{{_ship.attributes.name}}</div>
                                            <div class="payment-shipping-price" >{{_ship.attributes.price}} $</div>
                                        </div>                                        
                                    </div>
                                    <div  class="payment-shipping-des">{{ _ship.attributes.description }}</div>
                                </div>
                            </div>
                            <div class="payment-step-address-update" @click="openAddressPopup" v-if="!user_address?.id">
                                You don't have an address yet. Click here to update the address.</div>
                            <div v-else>
                                <div class="payment-step-address-info-title">Shipping Address</div>
                                <div class="payment-step-address-name">{{ user_address?.attributes?.name }}</div>
                                <div class="payment-step-address-des">
                                    {{ getFullAddress(user_address) }}
                                <!-- {{ user_address?.attributes?.full_address }}{{ user_address?.attributes?.wards.data?.length > 0 ? `, ${user_address?.attributes?.wards.data[0].attributes.prefix} ${user_address?.attributes?.districts.data[0].attributes.name}` : ""}}{{ user_address?.attributes?.districts.data?.length > 0 ? `, ${user_address?.attributes?.districts.data[0].attributes.prefix} ${user_address?.attributes?.wards.data[0].attributes.name}` : ""}}{{ user_address?.attributes?.provinces.data?.length > 0 ? ", " + user_address?.attributes?.provinces.data[0].attributes.name : ""}} -->
                            </div>
                                <div class="payment-step-address-des">{{ `${user_address?.attributes?.phone}` }}
                                </div>
                                <div class="payment-step-address-update mt-1" @click="openAddressPopup">Update</div>
                            </div>
                            <!-- <Address v-if="showUpdateAddress" :item="user_address" :isMobile="isMobile"
                                @closeUpdate="closeUpdateAddress"></Address> -->
                            <a-modal title="" :visible="showUpdateAddress" :destroyOnClose="true" :closable="true"
                                :maskClosable="false" :footer="null" width="360px" @cancel="() => this.showUpdateAddress = false">
                                <Address v-if="showUpdateAddress" :item="user_address" :isMobile="isMobile" @closeUpdate="closeUpdateAddress"></Address>
                            </a-modal>
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
                    <div :class="stepName >= 2 ? 'payment-step-title' : 'payment-step-title-inactive'">3. {{ $t('Payment') }}</div>
                    <div class="payment-step-content" v-show="stepName >= 2">
                        <div class="payment-method-title">Payment Method</div>
                        <div class="payment-method" v-for="(_pay, index) in listPayment " :key="index">
                            <input type="radio" :id="_pay.id" :value="_pay.id" v-model="payItem" @click="onChoicePayment(_pay)" />
                            <div style="display: flex;width: 100%;gap: 0.5rem;padding-right: 10px;align-items: center;">
                                <img :src="_pay.attributes.thub.data.attributes.url" class="payment-method-icon" />
                                <div class="payment-method-name" :for="_pay.id">{{_pay.attributes.name}}</div>
                            </div>   
                        </div>
                        <div v-show="payChoice > 0" class="payment-method-title mt-4">Payment Detail</div>
                        <div v-show="payChoice === 3">
                            <div id="paypal-button-container"></div>
                        </div>                        
                        <div v-show="payChoice === 4 || payChoice === 1">
                            <div class="payment-step-btn-perchase" @click="onPushOrderOnline">Purchase
                            </div>
                        </div>
                    </div>
                </div>
                <UserCart :listItem="listCart" :isMobile="isMobile" :priceShip="priceShip" />
            </b-container>
        </div>
        <div class="payment-success-info" v-if="paymentDone === 'success'">
            <div class="payment-order-top">
                <div class="payment-order-top-title">ORDERED SUCCESSFULLY</div>
                <div class="payment-order-top-code">{{ payment_order.code }}</div>
                <div class="payment-order-top-des">Your order is placed successfully.<br/>
                Your order will be confirmed by PHAN DANG HOANG within 24 hours after a successful placement.</div>
                <div class="d-flex justify-content-between" v-if="!isMobile">
                    <div class="payment-order-btn-shop" @click="goPage('/')">continue shopping</div>
                    <div class="payment-order-btn" @click="goPage('/account?order=1')">track your order</div>
                </div>
                <div v-if="isMobile">
                    <div class="payment-order-btn-shop" @click="goPage('/')">continue shopping</div>
                    <div class="payment-order-btn mt-2" @click="goPage('/account?order=1')">track your order</div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">1. Customer Detail</div>
                <div class="payment-step-content">
                    <div class="">
                        <div class="payment-step-content-border">
                            <div class="payment-step-success-title">Contact</div>
                            <div class="payment-step-success-text">Email: {{ profile.email }}</div>
                            <div class="payment-step-success-text">Phone: {{ profile.phone }}</div>
                        </div>
                        <div class="">
                            <div class="payment-step-success-title">Delivery Address</div>
                            <div class="payment-step-success-text">{{ address_full }}</div>
                            <div class="payment-step-success-text">{{ payment_order.address_phone }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">2. Products</div>
                <div class="payment-step-content">
                    <div class="payment-product-item" v-for="(_items, index) in listPaymentCart" :key="index">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="payment-product-img">
                                <img class="payment-product-image" :src="_items.imagelink" />
                            </div>
                            <div class="payment-product-info">
                                <div class="payment-product-name">{{ _items.name }}</div>
                                <div class="payment-product-des">Color:
                                    <span>{{ _items.variant?.attributes.color?.data?.attributes.name }}</span>
                                </div>
                                <div class="payment-product-des">Size:
                                    <span>
                                        {{ _items.variant?.attributes.size?.data?.attributes.name }}
                                    </span>
                                </div>
                                <div class="payment-product-des">Quantity : {{ _items.quantity }}</div>
                                <div class="payment-product-price">
                                    {{ _items.price * _items.quantity | numberWithCommas }} $
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
                        <div><b>{{ payment_order.code }}</b></div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Date</div>
                        <div>{{ payment_order.pick_date }}</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Payment method</div>
                        <div>{{ payment_order.payment_type }}</div>
                    </div>
                </div>
                <div class="payment-step-extra">
                    <div class="payment-step-extra-content">
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Subtotal</div>
                            <div>{{ payment_order.price | numberWithCommas }} $</div>
                        </div>
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Shipping</div>
                            <div>{{ payment_order.price_ship | numberWithCommas }} $</div>
                        </div>
                        <div class="payment-info-total d-flex justify-content-between">
                            <div class="">Total</div>
                            <div><b>{{ payment_order.price + 0 | numberWithCommas }} $</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="payment-success-info" v-if="paymentDone === 'fail'">
            <div class="payment-order-top">
                <div class="payment-order-top-title">ORDERED UNSUCCESSFULLY</div>
                <div class="payment-order-top-code">{{ payment_order.code }}</div>
                <div class="payment-order-top-des">Your order is unsuccessful in payment. Please re-order and check again your payment method to continue the shopping experiences.</div>
                <div class="d-flex justify-content-between" v-if="!isMobile">
                    <div class="payment-order-btn-shop" @click="goPage('/')">HomePage</div>
                    <div class="payment-order-btn" @click="goPage('/gio-hang')">Re-Order</div>
                </div>
                <div v-if="isMobile">
                    <div class="payment-order-btn-shop" @click="goPage('/')">HomePage</div>
                    <div class="payment-order-btn mt-2" @click="goPage('/gio-hang')">Re-Order</div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">1. Customer Detail</div>
                <div class="payment-step-content">
                    <div class="">
                        <div class="payment-step-content-border">
                            <div class="payment-step-success-title">Contact</div>
                            <div class="payment-step-success-text">Email: {{ profile.email }}</div>
                            <div class="payment-step-success-text">Phone: {{ profile.phone }}</div>
                        </div>
                        <div class="">
                            <div class="payment-step-success-title">Delivery Address</div>
                            <div class="payment-step-success-text">{{ address_full }}</div>
                            <div class="payment-step-success-text">{{ payment_order.address_phone }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-step-card">
                <div class="payment-step-title">2. Products</div>
                <div class="payment-step-content">
                    <div class="payment-product-item" v-for="(_items, index) in payment_order.cartitems" :key="index">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="payment-product-img">
                                <img class="payment-product-image" :src="_items.product?.thub?.url" />
                            </div>
                            <div class="payment-product-info">
                                <div class="payment-product-name">{{ _items.product?.name }}</div>
                                <div class="payment-product-des">Color:
                                    <span>{{ _items.variant?.color?.name }}</span>
                                </div>
                                <div class="payment-product-des">Size:
                                    <span>
                                        {{ _items.variant?.size?.name }}
                                    </span>
                                </div>
                                <div class="payment-product-des">Quantity : {{ _items.quantity }}</div>
                                <div class="payment-product-price">
                                    {{ _items.total_price | numberWithCommas }} $
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
                        <div>{{ payment_order.code }}</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Date</div>
                        <div>{{ payment_order.pick_date }}</div>
                    </div>
                    <div class="payment-step-success-text d-flex justify-content-between">
                        <div>Payment method</div>
                        <div>{{ payment_order.payment_type }}</div>
                    </div>
                </div>
                <div class="payment-step-extra">
                    <div class="payment-step-extra-content">
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Subtotal</div>
                            <div>{{ payment_order.price | numberWithCommas }} $</div>
                        </div>
                        <div class="payment-info-text d-flex justify-content-between">
                            <div>Shipping</div>
                            <div>{{ payment_order.price_ship | numberWithCommas }} $</div>
                        </div>
                        <div class="payment-info-total d-flex justify-content-between">
                            <div class="">Total</div>
                            <div><b>{{ payment_order.price + 0 | numberWithCommas }} $</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal title="ORDER INFORMATION" :visible="modalQrOpen" :destroyOnClose="true" :closable="true"
            :maskClosable="false" :footer="null" width="800px" @cancel="() => this.modalQrOpen = false">
            <Qrcode :isMobile="isMobile" :payment="current_payment" :qrcode="qrcode_info" @onDonePayment="onDonePayment" />
        </a-modal>
        <HelpPayment :isMobile="isMobile" />
        <ResetPass :isMobile="isMobile" :show="showReset" @closeUpdate="showReset = false" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { loadScript } from '@paypal/paypal-js'
import general from "~/mixins/general"
import HelpPayment from "~/components/payment/helpInfo.vue"
import UserCart from "~/components/payment/myCart.vue"
import Address from "~/components/account/address.vue"
import Qrcode from "~/components/payment/paymentQrcode.vue"
import ResetPass from "~/components/account/forgotpass.vue"

export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        UserCart,
        HelpPayment,
        Address,
        Qrcode,
        ResetPass
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
            address_full: null,
            user: {},
            total_price: 0,
            order: {},
            showUpdateAddress: false,
            user_address: null,
            paymentType: 'paypal',
            current_payment: {},
            isPaymentAccept: false,
            order_id: null,
            payment_order: {},
            qrcode_info: {},
            modalQrOpen: false,
            listPaymentCart: [],
            stepName: 0,
            listShipping: [],
            shipItem: {},
            shipChoice: null,
            payChoice: null,
            showReset: false,
            payItem: {}
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
        if (!this.$route.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.isMobile = this.checkMobile()
        await this.getListCartUser()
        await this.getListPayment()
        this.listShipping = await this.getListShipping()
        this.user_address = await this.getAddressByUser(this.profile.id)
        // this.user_address = this.userAddress
        await this.getPlace()
        if (this.listPayment.length > 0) {
            let _paypal = this.listPayment.find((o) => o.attributes.name == 'Paypal')
            if (_paypal) {
                loadScript({ 'client-id': _paypal.attributes.description }).then((paypal) => {
                    paypal
                        .Buttons({
                            createOrder: async () => {
                                if(!this.user_address.id) {
                                    this.showNotification('warning', `Please enter address information`)
                                    return
                                }
                                return await this.createPaypalOrder() 
                            },
                            onApprove: async () => { await this.onPaypalApprove() },
                        })
                        .render('#paypal-button-container')
                })
            }
        }

        if(this.loggedIn) {
            this.stepName = 1
        }
        if(this.shipChoice) {
            this.stepName = 2
        }

        // this.modalQrOpen = true
        // this.current_payment = this.listPayment[0]
    },
    watch: {
        stepShow: function (val) {
            if (val !== 'payment') {
                this.isPaymentAccept = false
            }
        },
        shipChoice: function (val) {
            if (val && val.id && this.user_address && this.user_address.id) {
                this.stepName = 2
            }
        },
    },
    methods: {
        ...mapActions({
            loginEmail: "auth/loginEmail",
            createOrder: "order/createOrder",
            createOrderOnline: "order/createOrderOnline",
            captureOrder: "order/captureOrder",
            resetUserCart: "cart/resetUserCart",
            getListCartUser: "cart/getListCartUser",
            createCart: "cart/createCart",
            getListPayment: "payment/getListPayment",
            getListShipping: "shipping/getListShipping",
            getPlace: 'place/getPlace',
            getAddressByUser: 'auth/getAddressByUser',
        }),
        getFullAddress(address){
            if(address.attributes.full_address){
                this.address_full = address.attributes.full_address
            }
            if(address?.attributes?.wards.data?.length > 0){
                this.address_full += `, ${address?.attributes?.wards.data[0].attributes.prefix} ${address?.attributes?.wards.data[0].attributes.name}`
            }
            if(address?.attributes?.districts.data?.length > 0){
                this.address_full += `, ${address?.attributes?.districts.data[0].attributes.prefix} ${address?.attributes?.districts.data[0].attributes.name}`
            }
            if(address?.attributes?.provinces.data?.length > 0){
                this.address_full += `, ${address?.attributes?.provinces.data[0].attributes.name}`
            }
            return this.address_full
        },
        onCheckShipping(_id) {
            this.shipChoice = this.listShipping.find(o=> o.id === _id)
            this.priceShip = this.shipChoice?.attributes.price
        },
        async createPaypalOrder() {
            console.log('Creating order...')
            
            let priceTotal = this.listCart.reduce((_sum, o) => _sum + o.price * o.quantity, 0) + this.priceShip
            let _order = {
                code: `#${this.makeString(8)}`,
                state: 'new',
                price_ship: this.priceShip,
                payment_type: 'paypal',
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
            this.order_id = rs.id
            return rs.id;
        },
        async onPaypalApprove() {
            let rs = await this.captureOrder({ order_id: this.order_id })
            if (rs.status === 'COMPLETED') {
                this.paymentDone = 'success'
                this.resetUserCart()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                this.showNotification('success', `Order placed successfully`)
                this.payment_order = rs.order
            } else {
                this.showNotification('danger', `Placed order failed`)
                this.paymentDone = 'fail'
                this.payment_order = rs.order
            }
        },
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
            this.user_address = await this.getAddressByUser(this.profile.id)
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
            this.payChoice = _payment.id
            this.paymentType = _payment.attributes.name
            if(_payment.id !== 3) {
                this.current_payment = _payment
            }
        },
        onChoicePaymentType(_qr) {
            this.current_payment = _qr
            if (_qr && _qr.attributes && _qr.attributes.qr_code.data && _qr.attributes.qr_code.data.attributes.url) {
                this.isPaymentAccept = true
            }
        },
        onDonePayment() {
            this.modalQrOpen = false
            this.paymentDone = 'success'
        },
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
        },
        async onPushOrderOnline() {
            let priceTotal = this.listCart.reduce((_sum, o) => _sum + o.price * o.quantity, 0)
            this.listPaymentCart = this.listCart
            let _order = {
                code: `#${this.makeString(8)}`,
                state: 'new',
                price_ship: this.priceShip,
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
            let rs = await this.createOrderOnline(_order)
            if (rs && rs.data) {
                this.order = rs.data
                this.showNotification('success', `Đã đặt đơn hàng thành công. Vui lòng thanh toán.`)
                this.resetUserCart()
                this.qrcode_info = {
                    ..._order,
                    totalPrice: _order.totalPrice * 25000,
                    address_name: this.user_address.attributes?.name,
                    address_phone: this.user_address.attributes?.phone,
                    address_full: this.user_address.attributes?.full_address
                }
                this.payment_order = rs.data
                this.modalQrOpen = true
            } else {
                this.showNotification('danger', `Đặt đơn hàng thất bại`)
                this.paymentDone = 'fail'
            }
        },
        async onGoogleLogin() {
            window.location = '/api/connect/google'
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
                location.reload();
            } else {
                this.showNotification('danger', `Đăng nhập thất bại vui lòng thử lại`)
            }
        },
        async onGoogleLogin() {
            window.localStorage.setItem('googleback', 'thanh-toan')
            window.location = '/api/connect/google'
        }
    }
}
</script>
<style lang="scss">
.payment-content {
    .payment-content-top {
        position: relative;
        padding: 110px;
        border-bottom: 1px solid #D9D9D9;
        .payment-content-image {
            width: 100%;
        }

        .payment-content-name {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 50px;
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 64px;
            text-transform: uppercase;
            padding: 8px 16px;
            background-color: #fff;
            height: 120px;
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
                    width: 145px;
                    height: 180px;
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
        .payment-step-title-inactive {
            border-bottom: 1px solid #D9D9D9;
            height: 50px;
            line-height: 50px;
            padding: 0px 25px;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 16px;
            text-transform: uppercase;
            background-color: #D9D9D9;
        }

        .payment-step-content {
            padding: 25px;

            .payment-method{
                display: flex;
                gap: 0.5rem;
                display: flex;
                gap: 0.5rem;
                background-color: #D9D9D9;
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
                padding: 0.5rem;
            }

            .payment-method-title{
                font-family: 'Aeroport';
                font-size: 18px;
                margin-bottom: 1rem;
            }

            .payment-method-icon{
                height: 25px;
            }

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

            .payment-step-content-border{
                border-bottom: 1px solid #D9D9D9;
                margin-bottom: 1rem;
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

        .payment-forgotpass{
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            font-family: "Aeroport-light";
            text-align: right;
            cursor: pointer;
            width: 100%;
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
            margin-top: 0px;
            padding-left: 20px;
            padding-right: 20px;

            .payment-step-address-info-title{
                font-size: 20px;
                font-family: 'Aeroport';
                margin-bottom: 1rem;
            }

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
.payment-shipping-name{
    font-size: 16px;
    text-transform: uppercase;
    font-family: 'Aeroport';
}
.payment-shipping-price{
    font-family: 'Aeroport';
    font-size: 16px;
}
.payment-shipping-des{
    margin-top: 0.5rem;
    background-color: #D9D9D9;
    color: #717171;
    font-size: 14px;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
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
                    font-family: 'Aeroport-medium';
                    font-size: 17px;
                    text-transform: uppercase;
                }

                .payment-order-top-des {
                    margin-top: 10px;
                    margin-bottom: 20px;
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 14px;
                }

                .payment-order-btn {
                    width: 100%;
                    height: 50px;
                    line-height: 46px;
                    border: 1px solid #000;
                    cursor: pointer;
                    font-family: 'Aeroport-bold';
                    color: #000;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 16px;
                    margin-bottom: 20px;
                }

                .payment-order-btn-shop {
                    width: 100%;
                    height: 50px;
                    line-height: 46px;
                    background-color: #000;
                    cursor: pointer;
                    font-family: 'Aeroport-bold';
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
                        width: 140px;
                        height: 185px;
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
                        font-family: 'Aeroport-medium';
                        font-size: 14px;
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
                        position: relative;
                        bottom: 0px;
                        right: 0px;
                        color: #000;
                        font-size: 14px;
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

            .payment-step-title-inactive {
                border-bottom: 1px solid #D9D9D9;
                height: 30px;
                line-height: 30px;
                padding: 0px 15px;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 12px;
                text-transform: uppercase;
                background-color: #D9D9D9;
            }

            .payment-step-content {
                padding: 15px;

                .payment-step-content-title {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 14px;
                    text-transform: uppercase;
                }

                .payment-step-content-text {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 14px;
                }

                .payment-step-btn-perchase {
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
                    font-family: 'Aeroport-medium';
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .payment-step-success-text {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 14px;
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
                height: 50px;
                padding: 11px 16px;
                border: 1px solid #000;
                margin-top: 5px;
                margin-bottom: 10px;
                border-radius: 0px;
                font-family: 'Aeroport-light';
                font-size: 14px;
                color: #000;
            }

            .payment-step-input-btn {
                width: 100%;
                height: 50px;
                line-height: 48px;
                text-align: center;
                color: #FFF;
                border: 1px solid #000;
                background-color: #000;
                font-family: 'Aeroport';
                font-size: 16px;
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
                height: 50px;
                line-height: 50px;
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
                padding-right: 10px;
                padding-top: 1rem;

                .payment-step-address-info-title{
                    font-size: 18px;
                    color: #000;
                }

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
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }

                .payment-step-address-des {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 12px;
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
    .payment-shipping-name{
        font-size: 12px;
        color: #000;
    }
    .payment-shipping-price{
        color: #000;
        font-size: 12px;
    }
    .payment-shipping-des{
        font-size: 9px;
    }
}
</style>