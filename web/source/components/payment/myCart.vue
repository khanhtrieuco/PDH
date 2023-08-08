<template>
    <div class="my-cart-panel" v-if="!isMobile">
        <h3 class="my-cart-title">{{ $t('Cart_your') }}</h3>
        <div class="my-cart-list-product">
            <div class="my-cart-item" v-for="(item, index) in listItem" :key="index">
                <div class="d-flex justify-content-between">
                    <div class="my-card-div-img">
                        <img class="my-card-image" :src="item.imagelink" />
                    </div>
                    <div class="my-card-div-info">
                        <div class="my-cart-product-name">{{ item.name }}</div>
                        <div class="my-cart-product-des">{{ item.description }}</div>
                        <!-- <CartButton :inumber="item.quantity" @updateValue="(e) => updateCartValue(item.id, e)" /> -->
                        <div>{{ item.quantity }}</div>
                    </div>
                    <div class="my-card-div-price">
                        {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                    </div>
                </div>
            </div>
        </div>
        <div class="my-cart-info">
            <div class="my-cart-edit" @click="goPage('/gio-hang')">{{ $t('Cart_edit') }}</div>
            <b-row class="my-cart-price-total">
                <b-col>
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
                        <div>{{ priceShip | numberWithCommas }}{{ ' ' }}đ</div>
                    </div>
                    <!-- <div class="cart-voucher"> Thêm mã giảm giá</div> -->
                    <div class="cart-total d-flex justify-content-between">
                        <div style="text-transform: uppercase;">{{ $t('Cart_text_4') }}:</div>
                        <div><b>{{ total_price + priceShip | numberWithCommas }}{{ ' ' }}đ</b></div>
                    </div>
                </b-col>
            </b-row>
            <div class="my-cart-btn" v-if="isPaymentAccept">
                <div class="nas-btn my-cart-done-btn" @click="onClickOrder">{{ $t('Cart_text_7') }}</div>
            </div>
        </div>
    </div>
    <div class="my-cart-panel" v-else>
        <h3 class="my-cart-title">{{ $t('Cart_your') }}</h3>
        <div class="my-cart-list-product">
            <b-container>
                <div class="my-cart-item" v-for="(item, index) in listItem" :key="index">
                    <div class="d-flex justify-content-between">
                        <div class="my-card-div-img">
                            <img class="my-card-image" :src="item.imagelink" />
                        </div>
                        <div class="my-card-div-info">
                            <div class="my-cart-product-name">{{ item.name }}</div>
                            <div class="my-card-div-price"> {{ item.price * item.quantity | numberWithCommas }}{{ ' ' }}đ
                            </div>
                            <!-- <CartButton :inumber="item.quantity" @updateValue="(e) => updateCartValue(item.id, e)" /> -->
                            <div>{{ item.quantity }}</div>

                        </div>
                    </div>
                </div>
                <div class="my-cart-info">
                    <div class="my-cart-edit" @click="goPage('/gio-hang')">{{ $t('Cart_edit') }}</div>
                    <b-row class="my-cart-price-total">
                        <b-col>
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
                                <div>{{ priceShip | numberWithCommas }}{{ ' ' }}đ</div>
                            </div>
                            <!-- <div class="cart-voucher"> Thêm mã giảm giá</div> -->
                            <div class="cart-total d-flex justify-content-between">
                                <div style="text-transform: uppercase;">{{ $t('Cart_text_4') }}:</div>
                                <div><b>{{ total_price + priceShip | numberWithCommas }}{{ ' ' }}đ</b></div>
                            </div>
                        </b-col>
                    </b-row>
                    <div class="my-cart-btn" v-if="isPaymentAccept">
                        <div class="nas-btn my-cart-done-btn" @click="onClickOrder">{{ $t('Cart_text_7') }}</div>
                    </div>
                </div>
            </b-container>
        </div>
    </div>
</template>
  
<script>
import CartButton from "~/components/common/cartButton.vue"
import general from "~/mixins/general"
export default {
    mixins: [general],
    components: {
        CartButton
    },
    props: {
        listItem: {
            type: Array,
            default: [],
        },
        priceShip: {
            type: Number,
            default: 0,
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
        isPaymentAccept: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            total_price: 0
        }
    },
    mounted() {
        this.total_price = this.listItem.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
    },
    watch: {
        listItem: function (val) {
            if (val) {
                this.total_price = val.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
            }
        },
    },
    methods: {
        updateCartValue(id, _v) {
            let _i = this.listItem.find(o => o.id === id)
            if (_i) {
                _i.quantity = _v
            }
            this.total_price = this.listItem.reduce((_sum, o) => _sum + o.price * o.quantity, 0);
        },
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
        },
        onClickOrder() {
            this.$emit('onPushOrder', this.total_price, this.listItem)
        }
    }
}
</script>
<style lang="scss">
.my-cart-panel {
    padding-top: 50px;
    padding-left: 30px;

    .my-cart-title {
        font-size: 20px;
        color: #2F3036;
    }

    .my-cart-list-product {
        margin-top: 30px;
        background-color: #FBFAFA;
        padding-top: 20px;
        padding-bottom: 20px;
        width: calc(100% + 30px);

        .my-cart-item {
            margin-top: 8px;
            margin-bottom: 20px;

            .my-card-div-img {
                width: 120px;
                text-align: center;
            }

            .my-card-div-price {
                width: 120px;
                text-align: right;
                padding-right: 30px;
            }

            .my-card-div-info {
                width: calc(100% - 240px);
            }

            .my-card-image {
                max-height: 110px;
            }

            .my-cart-product-name {
                color: #2F3036;
                font-size: 20px;
                font-weight: 600;
            }

            .my-cart-product-des {
                color: #515151;
                font-size: 13px;
                font-family: 'inter';
                margin-bottom: 10px;
            }
        }
    }

    .my-cart-info {
        margin-top: 50px;
        padding-top: 16px;
        border-top: 1px solid #AFAFAF;

        .my-cart-edit {
            text-decoration-line: underline;
            font-size: 16px;
            font-family: 'inter';
            color: #2F3036;
        }

        .my-cart-price-total {
            margin-top: 24px;
            width: 330px;
            float: right;
        }
    }

    .my-cart-btn {
        width: 100%;
        height: 90px;
        float: right;

        .my-cart-done-btn {
            width: 210px;
            float: right;
            margin-top: 20px;
        }
    }

}

@media (max-width: 520px) {
    .my-cart-panel {
        padding-top: 0px;
        padding-left: 0px;

        .my-cart-title {
            text-align: center;
            font-size: 20px;
            color: #2F3036;
        }

        .my-cart-list-product {
            margin-top: 30px;
            padding-top: 20px;
            padding-bottom: 20px;
            width: 100%;

            .my-cart-item {
                margin-top: 8px;
                margin-bottom: 20px;

                .my-card-div-img {
                    width: 120px;
                    text-align: center;
                }

                .my-card-div-price {
                    width: 100%;
                    font-size: 18px;
                    margin-bottom: 8px;
                    text-align: left;
                }

                .my-card-div-info {
                    width: 200px;
                }

                .my-card-image {
                    max-height: 100px;
                }

                .my-cart-product-name {
                    font-size: 16px;
                }
            }
        }

        .my-cart-info {
            margin-top: 50px;
            padding-top: 16px;
            border-top: 1px solid #AFAFAF;

            .my-cart-edit {
                text-align: center;
            }

            .my-cart-price-total {
                margin-top: 24px;
                width: 100%;
                float: none;
            }
        }

        .my-cart-btn {
            width: 100%;
            height: 90px;
            float: none;

            .my-cart-done-btn {
                width: 100%;
                margin-top: 30px;
                float: none;
            }
        }

    }
}
</style>