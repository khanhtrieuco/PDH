<template>
    <div class="cart-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="container" v-if="!isMobile">
            <h1 class="cart-title">
                {{ $t('Cart_your') }}
            </h1>
            <div class="cart-list">
                <div v-for="(item, index) in listCart" :key="index" class="cart-item">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="cart-product-item">
                            <img class="cart-product-item-image" :src="item.imagelink"></img>
                        </div>
                        <div class="cart-product-item-data">
                            <div class="cart-product-name">{{ item.name }}</div>
                            <div class="cart-product-des">{{ item.description }}</div>
                        </div>
                        <div class="cart-product-price-d">{{ item.price | numberWithCommas }}{{ ' ' }}đ</div>
                        <div class="cart-product-div-control">
                            <CartButton :inumber="item.quantity" @updateValue="(e) => updateCartValue(item.id, e)" />
                            <img class="cart-product-item-remove" src="/images/remove.png"
                                @click="removeProduct(item)"></img>
                        </div>
                        <div class="cart-product-price-d">{{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-info">
                <b-row>
                    <b-col cols="8" class="">
                        <div class="cart-info-content d-flex align-items-center justify-content-center" v-if="!loggedIn">
                            <div class="cart-login-des">
                                <div>{{ $t('Cart_login_des') }}</div>
                                <div class="cart-login-btn" @click="openLoginPopup()"><b>{{ $t('Login') }}</b></div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-around py-4">
                            <div @click="$router.go(-1)" style="cursor: pointer;"><span class="cart-product-back">
                                    <</span>
                                        {{ $t('Cart_view') }}
                            </div>
                            <!-- <div>
                                <img class="cart-product-reload" src="/images/reload.png"></img>
                                Cập nhật lại giỏ hàng</div> -->
                        </div>
                    </b-col>
                    <b-col cols="4" class="">
                        <!-- <div class="d-flex justify-content-between">
                            <div>{{ $t('Cart_text_1') }}:</div>
                            <div>{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
                        </div> -->
                        <div class="d-flex justify-content-between">
                            <div>{{ $t('Cart_text_2') }}:</div>
                            <div>{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>{{ $t('Cart_text_3') }}:</div>
                            <div>30.000đ</div>
                        </div>
                        <!-- <div class="cart-voucher"> Thêm mã giảm giá</div> -->
                        <div class="cart-total d-flex justify-content-between">
                            <div>{{ $t('Cart_text_4') }}:</div>
                            <div><b>{{ total_price + 30000 | numberWithCommas }}{{ ' ' }}đ</b></div>
                        </div>
                        <div class="nas-btn" @click="goPayment()">{{ $t('Cart_text_5') }}</div>
                    </b-col>
                </b-row>
            </div>
        </div>
        <div v-if="isMobile">
            <h1 class="cart-title">
                {{ $t('Cart_your') }}
            </h1>
            <b-container>
                <div class="cart-mobile-choice-all">{{ $t('Cart_choice_all') }}</div>
            </b-container>
            <div class="cart-mobile-list">
                <b-container>
                    <div v-for="(item, index) in listCart" :key="index" class="cart-item">
                        <img class="cart-mobile-item-delete" src="/images/delete.png" @click="removeProduct(item)" />
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="list-card-div-check align-items-center d-flex justify-content-center"
                                @click="setCheckItem(item)">
                                <img class="list-card-check" src="/images/checked.png" v-if="item.checked" />
                                <img class="list-card-check" src="/images/uncheck.png" v-else />
                            </div>
                            <div class="cart-product-item">
                                <img class="cart-product-item-image" :src="item.imagelink"></img>
                            </div>
                            <div class="cart-product-mobile-item">
                                <div class="cart-product-name">{{ item.name }}</div>
                                <div class="cart-product-price">{{ item.price * item.quantity | numberWithCommas }}{{ ' '
                                }}đ</div>
                                <div>
                                    <CartButton :inumber="item.quantity"
                                        @updateValue="(e) => updateCartValue(item.id, e)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </b-container>
            </div>
            <div v-if="!loggedIn" class="cart-mobile-login-des">{{ $t('Cart_login_des') }}</div>
            <div v-if="!loggedIn" class="cart-mobile-login-btn" @click="openLoginPopup()">{{ $t('Login') }}</div>
            <b-container>
                <div class="cart-mobile-price-total">
                    <div class="d-flex justify-content-between">
                        <div>{{ $t('Cart_text_2') }}:</div>
                        <div>{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>{{ $t('Cart_text_3') }}:</div>
                        <div>30.000đ</div>
                    </div>
                </div>
                <!-- <div class="cart-voucher"> Thêm mã giảm giá</div> -->
                <div class="cart-total d-flex justify-content-between">
                    <div>{{ $t('Cart_text_4') }}:</div>
                    <div><b>{{ total_price + 30000 | numberWithCommas }}{{ ' ' }}đ</b></div>
                </div>
                <div class="nas-btn" @click="goPaymentMobile()">{{ $t('Cart_text_5') }}</div>
                <div class="d-flex justify-content-around align-items-center cart-mobile-btn-view">
                    <img class="cart-mobile-btn" src="/images/left.png" />
                    <div @click="$router.go(-1)">{{ $t('Cart_view') }}</div>
                </div>
                <!-- <div class="d-flex justify-content-around align-items-center cart-mobile-btn-view">
                    <img class="cart-mobile-btn" src="/images/reload.png" />
                    <div>Cập nhật lại giỏ hàng</div>
                </div> -->
            </b-container>
        </div>
        <LoginPopup :isMobile="isMobile" :show="showLogin" @closeUpdate="closeUpdate" />
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import LoginPopup from "~/components/loginpopup.vue"
import CartButton from "~/components/common/cartButton.vue"
export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        LoginPopup,
        CartButton
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
                    active: true
                }
            ],
            showLogin: false,
            total_price: 0,
            isMobile: false
        }
    },
    computed: {
        ...mapGetters({
            loggedIn: "auth/getloggedIn",
            profile: "auth/getProfile",
            listCart: "cart/getListCart"
        }),
    },
    watch: {
        listCart: function (val) {
            if (val) {
                if (this.isMobile)
                    this.total_price = val.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
                else
                    this.total_price = val.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
            }
        },
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('Cart'),
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        this.isMobile = this.checkMobile()
        // await this.loadData()
        this.getListCart()
    },
    methods: {
        ...mapActions({
            getListCart: "cart/getListCart",
            setCartCheckoutItem: "cart/setCartCheckoutItem",
            setListCart: "cart/setListCart"
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
        // async loadData() {
        //     if (this.profile.id) {
        //         let arrayFilter = [{ user: this.profile.id }]
        //         let populate = [
        //             'product',
        //             'product.thub'
        //         ]
        //         await this.getListCart({ filters: { '$and': arrayFilter }, populate })
        //     }
        // },
        updateCartValue(id, _v) {
            if (_v === 0) {
                let _list = this.listCart.filter(o => o.id !== id)
                this.setListCart([..._list])
            } else {
                let _i = this.listCart.find(o => o.id === id)
                if (_i) {
                    _i.quantity = _v
                }
            }
            this.total_price = this.listCart.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        removeProduct(_item) {
            let _list = this.listCart.filter(o => o.id !== _item.id)
            this.setListCart([..._list])
        },
        setCheckItem(_item) {
            for (let i = 0; i < this.listCart.length; i++) {
                if (this.listCart[i].id === _item.id) {
                    this.listCart[i].checked = this.listCart[i].checked ? !this.listCart[i].checked : true
                }
            }
            this.total_price = this.listCart.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        choiceAllCartItem() {
            for (let i = 0; i < this.listCart.length; i++) {
                this.listCart[i].checked = true
            }
            this.total_price = this.listCart.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        openLoginPopup() {
            this.showLogin = true
        },
        closeUpdate() {
            this.showLogin = false
            this.getListCart()
        },
        goPayment() {
            // if (!this.loggedIn) {
            //     this.showLogin = true
            // } else {
            let listCheckout = this.listCart
            this.setCartCheckoutItem({ listCheckout })
            this.$router.push({ path: '/thanh-toan' })
            // }
        },
        goPaymentMobile() {
            this.setCartCheckoutItem({ listCheckout: this.listCart })
            this.$router.push({ path: '/thanh-toan' })
        }
    }
}
</script>
<style lang="scss">
.cart-content {
    margin-top: 180px;
    margin-bottom: 160px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.cart-title {
    margin-top: 45px;
    font-size: 36px;
    line-height: 47px;
    align-items: center;
    text-align: center;
    color: #515151;
}

.cart-login-des {
    font-family: 'inter';
    font-size: 16px;
    text-align: 'center';
}

.cart-list {
    background: #FBFAFA;
    margin-top: 40px;
    margin-bottom: 30px;
}

.cart-item {
    margin-bottom: 8px;
    padding: 24px;
}

.cart-product-item {
    width: 60px;
    text-align: center;
}

.cart-product-item-image {
    max-height: 180px;
    max-width: 60px;
}

.cart-product-div-control {
    width: 120px;
    position: relative;
}

.cart-product-item-remove {
    position: absolute;
    right: 0px;
    top: 4px;
    width: 15px;
    cursor: pointer;
}

.cart-product-item-data {
    width: 420px;
}

.cart-product-name {
    max-width: 420px;
    font-size: 25px;
    font-weight: 600;
    color: #2F3036;
}

.cart-product-price-d {
    font-size: 24.5px;
    width: 155px;
}

.cart-product-des {
    font-family: 'inter-light';
    font-size: 16px;
}

.cart-product-back {
    margin-right: 20px;
}

.cart-product-reload {
    width: 15px;
    margin-right: 20px;
}

.cart-info-content {
    background: #FBFAFA;
    padding-top: 28px;
    padding-bottom: 28px;
    border-radius: 10px;
}

.cart-login-btn {
    cursor: pointer;
    text-align: center;
    text-decoration-line: underline;
    color: #484848;
}

.cart-voucher {
    border-top: 1px solid #B9B9B9;
    border-bottom: 1px solid #B9B9B9;
    font-family: 'inter';
    font-size: 13px;
    padding-left: 26px;
    padding-top: 16px;
    padding-bottom: 16px;
    color: #2F3036;
    margin-top: 32px;
}

.cart-total {
    margin-top: 32px;
    margin-bottom: 32px;
    text-transform: uppercase;
}

@media (max-width: 520px) {
    .cart-content {
        margin-top: 50px;
    }

    .cart-title {
        font-size: 24px;
        line-height: 31px;
    }

    .cart-mobile-choice-all {
        font-size: 10px;
        text-decoration-line: underline;
        color: #484848;
    }

    .cart-item {
        padding-left: 0px;
        padding-right: 0px;
        position: relative;
    }

    .cart-mobile-item-delete {
        position: absolute;
        right: 0px;
        top: 30px;
        cursor: pointer;
    }

    .cart-mobile-list {
        margin-top: 20px;
        background-color: #FBFAFA;

        .list-card-check {
            width: 20px;
        }

        .cart-product-mobile-item {
            padding-left: 20px;
            width: 250px;
        }

        .cart-product-item-image {
            max-height: 120px;
            max-width: 50px;
            padding-left: 20px;
        }

        .cart-product-name {
            width: auto;
            font-size: 16px;
            max-width: 200px;
        }

        .cart-product-price {
            font-size: 18Spx;
            margin-bottom: 8px;
        }
    }

    .cart-mobile-login-des {
        color: #484848;
        text-align: center;
        font-size: 10px;
        font-family: Inter;
        font-weight: 300;
        margin-top: 30px;
    }

    .cart-mobile-login-btn {
        color: #484848;
        text-align: center;
        font-size: 10px;
        font-family: Inter;
        font-weight: 700;
        text-decoration-line: underline;
        margin-top: 8px;
        cursor: pointer;
    }

    .cart-mobile-price-total {
        margin-top: 30px;
        border-top: 1px solid #B9B9B9;
        border-bottom: 1px solid #B9B9B9;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .cart-mobile-btn-view {
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        width: 220px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        border: 1px solid #2F3036;
        color: #2F3036;
        text-align: center;
        font-size: 12px;
        font-weight: 300;
        cursor: pointer;
        padding-left: 20px;

        .cart-mobile-btn {
            height: 16px;
        }

        div {
            width: 200px;
        }
    }
}
</style>