<template>
    <div class="list-cart-panel">
        <div class="list-cart-user-top d-flex justify-content-between align-items-center">
            <div class="list-cart-title">{{ $t('Cart_your') }}</div>
            <img class="list-cart-close-outline" src="/images/close-outline.png" @click="$emit('hideListCart')"></img>
        </div>
        <div class="list-cart-choice-all" @click="choiceAllCartItem">{{ $t('Cart_choice_all') }}</div>
        <div class="list-cart-main-list">
            <div class="list-cart-item" v-for="(item, index) in listItem" :key="index">
                <div class="d-flex justify-content-between">
                    <div class="list-card-div-check align-items-center d-flex justify-content-center"
                        @click="setCheckItem(item)">
                        <img class="list-card-check" src="/images/checked.png" v-if="item.checked" />
                        <img class="list-card-check" src="/images/uncheck.png" v-else />
                    </div>
                    <div class="list-card-div-img">
                        <img class="list-card-image" :src="item.imagelink" />
                    </div>
                    <div class="list-card-div-info">
                        <div class="list-cart-product-name">{{ item.name }}</div>
                        <div class="list-cart-product-des">{{ item.description }}</div>
                        <CartButton :inumber="item.quantity" @updateValue="(e) => updateCartValue(item.id, e)" />
                    </div>
                    <div class="list-card-div-price">
                        <img class="list-card-delete" src="/images/delete.png" @click="deleteItemCart(item.id)"/>
                        <span>{{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="list-cart-total">{{ $t('Cart_text_4') }}</div>
            <div class="list-cart-number">{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
        </div>
        <div class="list-cart-payment-btn" @click="onGoCheckoutPage">{{ $t('Cart_text_6') }}</div>
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
        if (this.listCart && this.listCart.length >= 0)
            this.listItem = this.listCart
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
        updateCartValue(id, _v) {
            let _i = this.listCart.find(o => o.id === id)
            if (_i) {
                _i.quantity = _v
            }
            this.total_price = this.listItem.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        deleteItemCart(id) {
            this.listItem = this.listItem.filter(o => o.id !== id)
            this.total_price = this.listItem.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
            this.setCartCheckoutItem({ listCheckout: this.listItem })

        },
        setCheckItem(_item) {
            for (let i = 0; i < this.listItem.length; i++) {
                if (this.listItem[i].id === _item.id) {
                    this.listItem[i].checked = this.listItem[i].checked ? !this.listItem[i].checked : true
                }
            }
            this.total_price = this.listItem.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        choiceAllCartItem() {
            for (let i = 0; i < this.listItem.length; i++) {
                this.listItem[i].checked = true
            }
            this.total_price = this.listItem.filter(f => f.checked).reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        onGoCheckoutPage() {
            let listCheckout = this.listItem.filter(f => f.checked)
            if (listCheckout.length === 0) {
                this.showNotification('warning', `Vui lòng chọn sản phẩm muốn thanh toán`)
                return
            }
            this.setCartCheckoutItem({ listCheckout })
            this.$emit('update:showListCart', false)
            this.$router.push({ path: '/gio-hang' })
        }
    }
}
</script>
<style lang="scss">
.list-cart-user-top {
    width: 100%;
    height: 50px;
    background: #FDFDFD;
    border: 1px solid #F4F4F4;
    border-radius: 12px;
    line-height: 48px;
    padding: 0px 20px;
    cursor: pointer;

    .cart-close-outline {
        width: 20px;
    }
}

.list-cart-choice-all {
    margin-top: 20px;
    padding-left: 20px;
    cursor: pointer;
    font-size: 13px;
    font-family: 'inter';
    text-decoration-line: underline;
    color: #515151;
}

.list-cart-main-list {
    margin-top: 30px;
    background-color: #FBFAFA;
    padding-top: 20px;
    padding-bottom: 20px;
    max-height: 600px;
    overflow-y: scroll;
    height: calc(100vh - 385px);

    .list-cart-item {
        margin-top: 8px;
        margin-bottom: 20px;

        .list-card-div-check {
            width: 80px;
            text-align: center;
        }

        .list-card-div-img {
            width: 100px;
            text-align: center;
        }

        .list-card-div-price {
            width: 140px;
            text-align: right;
            padding-right: 30px;
            display: flex;
            position: relative;

            span {
                align-self: flex-end;
                margin-bottom: 25px;
            }

            img {
                cursor: pointer;
                position: absolute;
                right: 40px;
                top:10px
            }
        }

        .list-card-div-info {
            width: calc(100% - 240px);
            padding-left: 10px;
        }

        .list-card-image {
            max-height: 110px;
            max-width: 85px;
        }

        .list-cart-product-name {
            color: #2F3036;
            font-size: 20px;
            font-weight: 600;
        }

        .list-cart-product-des {
            color: #515151;
            font-size: 13px;
            font-family: 'inter-light';
            margin-bottom: 10px;
        }
    }
}

.list-cart-total {
    margin-top: 40px;
    font-size: 26px;
}

.list-cart-number {
    margin-top: 40px;
    font-size: 32px;
    font-weight: 700;
}

.list-cart-payment-btn {
    margin-top: 20px;
    background-color: #2F3036;
    height: 45px;
    line-height: 43px;
    color: #fff;
    border-radius: 30px;
    text-align: center;
    cursor: pointer;
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