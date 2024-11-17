<template>
    <div class="cart-content">
        <div class="cart-content-top" v-if="!isMobile">
            <!-- <img class="cart-content-image" src="/images/top-account.jpg" /> -->
            <div class="cart-content-name">shopping bag ({{ listItem.length }})</div>
        </div>
        <div class="cart-content-name" v-if="isMobile">shopping cart</div>
        <div class="cart-content-main container d-flex justify-content-between align-items-start" v-if="!isMobile">
            <div class="cart-main-list">
                <div class="cart-item" v-for="(item, index) in listItem" :key="index">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="card-div-img">
                            <img class="card-image" :src="item.imagelink" />
                        </div>
                        <div class="card-div-info">
                            <div class="cart-product-name">{{ item.name }}</div>
                            <div class="cart-product-des">Color:
                                <span>{{ item.variant.attributes.color.data.attributes.name }}</span>
                            </div>
                            <div class="cart-product-des">Size:
                                <span>
                                    {{ item.variant.attributes.size.data.attributes.name }}
                                </span>
                            </div>
                            <div class="cart-product-des">Quantity
                                <CartButton :inumber="item.quantity"
                                    @updateValue="(e) => updateCartValue(item.variant_id, e)" />
                                <div class="cart-product-remove" @click="deleteItemCart(item.variant_id)">Remove</div>
                            </div>
                        </div>
                        <div class="card-div-price">
                            $ {{ item.price * item.quantity | numberWithCommas }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-total">
                <div class="cart-total-des">Show Promotional code</div>
                <div class="d-flex justify-content-between">
                    <div class="cart-total-text">shipping cost</div>
                    <div class="cart-total-text">$ 0</div>
                </div>
                <div class="cart-total-number d-flex justify-content-between">
                    <div>{{ $t('Cart_text_4') }}</div>
                    <div>$ {{ total_price | numberWithCommas }}{{ ' ' }}</div>
                </div>
                <div class="cart-checkout-btn" @click="onGoPaymentPage">{{ $t('Cart_text_6') }}</div>
            </div>
        </div>
        <div class="cart-content-main" v-if="isMobile">
            <div class="cart-main-list container">
                <div class="cart-item" v-for="(item, index) in listItem" :key="index">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="card-div-img">
                            <img class="card-image" :src="item.imagelink" />
                        </div>
                        <div class="card-div-info">
                            <div class="cart-product-name">{{ item.name }}</div>
                            <div class="cart-product-des">Color:
                                <span>{{ item.variant.attributes.color.data.attributes.name }}</span>
                            </div>
                            <div class="cart-product-des">Size:
                                <span>
                                    {{ item.variant.attributes.size.data.attributes.name }}
                                </span>
                            </div>
                            <div class="cart-product-des">Quantity
                                <CartButton :inumber="item.quantity"
                                    @updateValue="(e) => updateCartValue(item.variant_id, e)" />
                                <div class="cart-product-remove" @click="deleteItemCart(item.variant_id)">Remove</div>
                            </div>
                        </div>
                        <div class="card-div-price">
                            $ {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-total">
                <div class="container">
                    <div class="cart-total-des">Show Promotional code</div>
                    <div class="d-flex justify-content-between">
                        <div class="cart-total-text">shipping cost</div>
                        <div class="cart-total-text">$ 0</div>
                    </div>
                    <div class="cart-total-number d-flex justify-content-between">
                        <div>{{ $t('Cart_text_4') }}</div>
                        <div>$ {{ total_price | numberWithCommas }}{{ ' ' }}</div>
                    </div>
                    <div class="cart-checkout-btn" @click="onGoPaymentPage">{{ $t('Cart_text_6') }}</div>
                </div>
            </div>
        </div>
        <HelpInfo :isMobile="isMobile"></HelpInfo>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import CartButton from "~/components/common/cartButton.vue"
import HelpInfo from "~/components/payment/helpInfo.vue"
export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        CartButton,
        HelpInfo
    },
    data() {
        return {
            total_price: 0,
            listItem: [],
            isMobile: false
        }
    },
    computed: {
        ...mapGetters({
            listCart: "cart/getListUserCart"
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.getListCartUser()
        if (this.listCart && this.listCart.length >= 0) {
            this.listItem = this.listCart
            this.total_price = this.listItem.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        }
    },
    methods: {
        ...mapActions({
            getListCartUser: "cart/getListCartUser",
            setCartCheckoutItem: "cart/setCartCheckoutItem"
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
        updateCartValue(variant_id, _v) {
            let _i = this.listCart.find(o => o.variant_id === variant_id)
            if (_i) {
                _i.quantity = _v
            }
            this.total_price = this.listItem.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        deleteItemCart(variant_id) {
            this.listItem = this.listItem.filter(o => o.variant_id !== variant_id)
            this.total_price = this.listItem.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
            this.setCartCheckoutItem({ listCheckout: this.listItem })
        },
        onGoPaymentPage() {
            this.setCartCheckoutItem({ listCheckout: this.listItem })
            this.$router.push({ path: '/thanh-toan' })
        },
    }
}
</script>
<style lang="scss">
.cart-content {
    .cart-content-top {
        position: relative;
        padding: 110px;
        border-bottom: 1px solid #D9D9D9;

        .cart-content-image {
            width: 100%;
        }

        .cart-content-name {
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

    .cart-content-main {
        padding: 150px 0px;

        .cart-main-list {
            width: calc(100% - 670px);

            .cart-item {
                padding: 20px 0px;
                border-top: 1px solid #D9D9D9;

                .card-div-img {
                    .card-image {
                        width: 120px;
                        height: 180px;
                        object-fit: cover;
                    }
                }

                .card-div-info {
                    margin-left: 25px;
                    width: calc(100% - 310px);
                    margin-top: 30px;

                    .cart-product-name {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        text-transform: uppercase;
                        line-height: 30px;
                    }

                    .cart-product-des {
                        color: #717171;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        line-height: 30px;

                        span {
                            color: #000;
                        }

                        .cart-product-remove {
                            display: inline-block;
                            color: #000;
                            margin-left: 25px;
                            font-family: 'Aeroport-light';
                            font-size: 16px;
                            text-decoration-line: underline;
                            cursor: pointer;
                        }
                    }
                }

                .card-div-price {
                    margin-top: 30px;
                    width: 170px;
                    color: #000;
                    text-align: right;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                    text-transform: uppercase;
                    line-height: initial;
                }
            }
        }

        .cart-total {
            background-color: #F4F4F4;
            padding: 40px 20px;
            width: 520px;

            .cart-total-des {
                color: #000;
                font-size: 16px;
                font-family: 'Aeroport-light';
                text-decoration-line: underline;
                margin-bottom: 15px;
            }

            .cart-total-text {
                color: #000;
                font-size: 16px;
                font-family: 'Aeroport-light';
                text-transform: uppercase;
                margin-bottom: 10px;
            }

            .cart-total-number {
                color: #000;
                font-family: 'Aeroport';
                font-size: 16px;
                font-weight: 700;
                text-transform: uppercase;
                padding-top: 10px;
                border-top: 1px solid #D9D9D9;
            }

            .cart-checkout-btn {
                background-color: #000;
                color: #fff;
                height: 45px;
                font-size: 18px;
                text-align: center;
                line-height: 45px;
                cursor: pointer;
                font-family: 'Aeroport-light';
                margin-top: 20px;
                text-transform: uppercase;
            }

        }
    }

}

@media (max-width: 520px) {
    .cart-content {
        .cart-content-name {
            position: relative;
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 20px;
            text-transform: uppercase;
            margin-top: 40px;
            margin-bottom: 30px;
        }

        .cart-content-main {
            padding: 0px 0px;

            .cart-main-list {
                width: 100%;

                .cart-item {
                    padding: 20px 0px;
                    border-top: 1px solid #D9D9D9;

                    .card-div-img {
                        .card-image {
                            width: 70px;
                            height: 95px;
                            object-fit: cover;
                        }
                    }

                    .card-div-info {
                        margin-left: 15px;
                        width: calc(100% - 155px);
                        margin-top: 10px;

                        .cart-product-name {
                            color: #000;
                            font-family: 'Aeroport-light';
                            font-size: 11px;
                            text-transform: uppercase;
                            line-height: 15px;
                        }

                        .cart-product-des {
                            color: #717171;
                            font-family: 'Aeroport-light';
                            font-size: 9px;
                            line-height: 15px;

                            span {
                                color: #000;
                            }

                            .cart-product-remove {
                                display: inline-block;
                                color: #000;
                                margin-left: 25px;
                                font-family: 'Aeroport-light';
                                font-size: 9px;
                                text-decoration-line: underline;
                                cursor: pointer;
                            }
                        }
                    }

                    .card-div-price {
                        margin-top: 10px;
                        width: 70px;
                        color: #000;
                        text-align: right;
                        font-family: 'Aeroport-light';
                        font-size: 10px;
                        text-transform: uppercase;
                        line-height: initial;
                    }
                }
            }

            .cart-total {
                background-color: #F4F4F4;
                padding: 10px 10px;
                width: 100%;

                .cart-total-des {
                    color: #000;
                    font-size: 10px;
                    font-family: 'Aeroport-light';
                    text-decoration-line: underline;
                    margin-bottom: 15px;
                }

                .cart-total-text {
                    color: #000;
                    font-size: 10px;
                    font-family: 'Aeroport-light';
                    text-transform: uppercase;
                    margin-bottom: 10px;
                }

                .cart-total-number {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    padding-top: 10px;
                    border-top: 1px solid #D9D9D9;
                }

                .cart-checkout-btn {
                    background-color: #000;
                    color: #fff;
                    height: 30px;
                    font-size: 13px;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                    font-family: 'Aeroport-light';
                    margin-top: 20px;
                    text-transform: uppercase;
                }

            }
        }

    }
}
</style>