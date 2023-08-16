<template>
    <div class="list-cart-panel">
        <div class="list-cart-user-top">
            <div class="list-cart-title">{{ $t('Cart_your') }}{{ `(${listItem.length})` }}</div>
            <img class="list-cart-close" src="/images/close-outline.png" @click="$emit('hideListCart')"></img>
        </div>
        <div class="list-cart-main-list">
            <div class="list-cart-item" v-for="(item, index) in listItem" :key="index">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="list-card-div-img">
                        <img class="list-card-image" :src="item.imagelink" />
                    </div>
                    <div class="list-card-div-info">
                        <div class="list-cart-product-name">{{ item.name }}</div>
                        <div class="list-cart-product-des">Color:
                            <span>{{ item.variant.attributes.color.data.attributes.name }}</span>
                        </div>
                        <div class="list-cart-product-des">Size:
                            <span>
                                {{ item.variant.attributes.size.data.attributes.name }}
                            </span>
                        </div>
                        <div class="list-cart-product-des">Quantity
                            <CartButton :inumber="item.quantity"
                                @updateValue="(e) => updateCartValue(item.variant_id, e)" />
                            <div class="list-cart-product-remove" @click="deleteItemCart(item.variant_id)">Remove</div>
                        </div>
                    </div>
                    <div class="list-card-div-price">
                        {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                    </div>
                </div>
            </div>
        </div>
        <div class="list-cart-footer">
            <div class="d-flex justify-content-between">
                <div class="list-cart-total">{{ $t('Cart_text_4') }}</div>
                <div class="list-cart-number">{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
            </div>
            <div class="list-cart-checkout-btn" @click="onGoPaymentPage">{{ $t('Cart_text_6') }}</div>
            <div class="list-cart-btn" @click="onGoCheckoutPage">{{ $t('Cart_text_66') }}</div>
        </div>

    </div>
</template>
  
<script>
import CartButton from "~/components/common/cartButton.vue"
import general from "~/mixins/general"
import { mapGetters, mapActions } from "vuex"

export default {
    mixins: [general],
    components: {
        CartButton
    },
    data() {
        return {
            total_price: 0,
            listItem: []
        }
    },
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
        listCart: {
            type: Array,
            default: []
        },
        showListCart: {
            type: Boolean,
            default: false,
        }
    },
    mounted() {
        if (this.listCart && this.listCart.length >= 0) {
            this.listItem = this.listCart
            this.total_price = this.listItem.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        }
    },
    watch: {
        listCart: function (val) {
            if (val) {
                this.listItem = val
            }
        },
    },
    methods: {
        ...mapActions({
            setCartCheckoutItem: "cart/setCartCheckoutItem"
        }),
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
        // setCheckItem(_item) {
        //     for (let i = 0; i < this.listItem.length; i++) {
        //         if (this.listItem[i].id === _item.id) {
        //             this.listItem[i].checked = this.listItem[i].checked ? !this.listItem[i].checked : true
        //         }
        //     }
        //     this.total_price = this.listItem.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        // },
        // choiceAllCartItem() {
        //     for (let i = 0; i < this.listItem.length; i++) {
        //         this.listItem[i].checked = true
        //     }
        //     this.total_price = this.listItem.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        // },
        onGoCheckoutPage() {
            this.setCartCheckoutItem({ listCheckout: this.listItem })
            this.$emit('update:showListCart', false)
            this.$router.push({ path: '/gio-hang' })
        },
        onGoPaymentPage() {
            this.setCartCheckoutItem({ listCheckout: this.listItem })
            this.$emit('update:showListCart', false)
            this.$router.push({ path: '/thanh-toan' })
        },
    }
}
</script>
<style lang="scss">
.list-cart-panel {
    position: fixed;
    right: 0px;
    top: 0px;
    width: 720px;
    height: 100vh;
    background-color: #fff;
    box-shadow: -8px 4px 10px 0px rgba(0, 0, 0, 0.25);

    .list-cart-user-top {
        position: relative;
        border-bottom: 1px solid #717171;

        .list-cart-title {
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 20px;
            text-transform: uppercase;
            margin-top: 40px;
            margin-bottom: 35px;
        }

        .list-cart-close {
            position: absolute;
            right: 50px;
            top: 20px;
        }
    }

    .list-cart-main-list {
        padding-top: 35px;
        padding-left: 50px;
        padding-right: 50px;
        height: calc(100vh - 425px);
        overflow-y: scroll;

        .list-cart-item {
            padding: 20px 0px;
            border-bottom: 1px solid #D9D9D9;

            .list-card-div-img {
                .list-card-image {
                    width: 120px;
                    height: 180px;
                    object-fit: cover;
                }
            }

            .list-card-div-info {
                margin-left: 25px;
                width: calc(100% - 310px);
                margin-top: 30px;

                .list-cart-product-name {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                    text-transform: uppercase;
                    line-height: 30px;
                }

                .list-cart-product-des {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                    line-height: 30px;

                    span {
                        color: #000;
                    }

                    .list-cart-product-remove {
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

            .list-card-div-price {
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

    .list-cart-footer {
        position: relative;
        width: 100%;
        bottom: 0px;
        background-color: #F5F5F5;
        padding: 50px;

        .list-cart-total {
            text-transform: uppercase;
            font-family: 'Aeroport';
            color: #000;
            font-size: 16px;
        }

        .list-cart-number {
            text-transform: uppercase;
            font-family: 'Aeroport';
            color: #000;
            font-size: 16px;
        }

        .list-cart-checkout-btn {
            background-color: #000;
            color: #fff;
            height: 45px;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
            cursor: pointer;
            font-family: 'Aeroport-light';
            margin-top: 10px;
            text-transform: uppercase;
        }

        .list-cart-btn {
            background-color: #fff;
            color: #000;
            height: 45px;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
            cursor: pointer;
            font-family: 'Aeroport-light';
            border: 1px solid #000;
            margin-top: 10px;
            text-transform: uppercase;
        }
    }
}

@media (max-width: 520px) {
    .aura-title {
        font-weight: 700;
        font-size: 13px;
        line-height: 15px;
        color: #2F3036;
        text-align: left;
    }
}</style>