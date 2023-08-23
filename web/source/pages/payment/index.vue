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
                        </div>
                    </div>
                    <div class="payment-step-card">
                        <div class="payment-step-title">3. {{ $t('Payment') }}</div>
                        <div class="payment-step-content">
                            <div class="payment-step-btn-perchase" @click="onPushOrder">Purchase</div>
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
                    <div class="payment-step-content">
                        <div class="payment-step-content-title">Email Address</div>
                        <div class="payment-step-content-text">lmydu99@gmail.com</div>
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
                </div>
                <div class="payment-step-card">
                    <div class="payment-step-title">3. {{ $t('Payment') }}</div>
                    <div class="payment-step-content">
                        <div class="payment-step-btn-perchase" @click="onPushOrder">Purchase</div>
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
        <HelpPayment :isMobile="isMobile" />
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import HelpPayment from "~/components/payment/helpInfo.vue"
import UserCart from "~/components/payment/myCart.vue"

export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        UserCart,
        HelpPayment,
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
        }
    },
    computed: {
        ...mapGetters({
            loggedIn: "auth/getloggedIn",
            profile: "auth/getProfile",
            listCart: "cart/getListUserCart",
            listPayment: 'payment/getListPayment',
        }),
    },
    async mounted() {
        this.isMobile = this.checkMobile()
        await this.getListCartUser()
        // await this.getListPayment()
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
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
        },
        async onPushOrder() {
            let priceTotal = this.listCart.reduce((_sum, o) => _sum + o.price * o.quantity, 0)
            let _order = {
                code: `#${this.makeString(8)}`,
                state: 'new',
                payment_type: 'code',
                shippingPrice: 0,
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
                this.showNotification('success', `Đã đặt đơn hàng thành công`)
                this.resetUserCart()
                this.paymentDone = 'success'
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
            width: calc(100% - 680px);
            margin-right: 30px;
        }
    }

    .payment-success-info {
        width: 1000px;
        margin: 100px auto;

        .payment-order-top {
            margin-bottom: 30px;
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
            &::after{
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
        }
    }
}
</style>