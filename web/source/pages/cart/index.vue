<template>
    <div class="cart-content">
        <div class="cart-content-top">
            <img class="cart-content-image" src="/images/top-account.jpg" />
            <div class="cart-content-name">shopping bag ({{ listItem.length }})</div>
        </div>
        <div class="cart-content-main container d-flex justify-content-between align-items-start">
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
                            {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-total">
                <div class="cart-total-des">Show Promotional code</div>
                <div class="d-flex justify-content-between">
                    <div class="cart-total-text">shipping cost</div>
                    <div class="cart-total-text">0 đ</div>
                </div>
                <div class="cart-total-number d-flex justify-content-between">
                    <div>{{ $t('Cart_text_4') }}</div>
                    <div>{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
                </div>
                <div class="cart-checkout-btn" @click="onGoPaymentPage">{{ $t('Cart_text_6') }}</div>
            </div>
        </div>
        <HelpInfo></HelpInfo>
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
            console.log(variant_id)
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

        .cart-content-image {
            width: 100%;
        }

        .cart-content-name {
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

    .cart-content-main {
        padding: 250px 0px;

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

            .cart-checkout-btn{
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