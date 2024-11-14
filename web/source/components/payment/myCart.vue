<template>
    <div class="my-cart-panel" v-if="!isMobile">
        <div class="my-cart-head d-flex justify-content-between">
            <div class="my-cart-head-title">shopping bag</div>
            <div class="my-cart-head-edit" @click="goPage('/gio-hang')">Modify</div>
        </div>
        <div class="my-cart-list-product">
            <div class="my-cart-item" v-for="(item, index) in listItem" :key="index">
                <div class="d-flex justify-content-between">
                    <div class="my-card-div-img">
                        <img class="my-card-image" :src="item.imagelink" />
                    </div>
                    <div class="my-card-div-info">
                        <div class="my-cart-product-name">{{ item.name }}</div>
                        <div class="my-cart-product-des">Color:
                            <span>{{ item.variant.attributes.color.data.attributes.name }}</span>
                        </div>
                        <div class="my-cart-product-des">Size:
                            <span>
                                {{ item.variant.attributes.size.data.attributes.name }}
                            </span>
                        </div>
                        <div class="my-cart-product-des">Quantity: <span>{{ item.quantity }}</span></div>
                        <div class="my-card-div-price">
                            $ {{ item.price * item.quantity | numberWithCommas }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-cart-info">
            <div class="my-cart-info-text d-flex justify-content-between">
                <div>Subtotal</div>
                <div>$ {{ total_price | numberWithCommas }}</div>
            </div>
            <div class="my-cart-info-text d-flex justify-content-between">
                <div>SHIPPING COST</div>
                <div>$ {{ priceShip | numberWithCommas }}</div>
            </div>
            <div class="my-cart-info-total d-flex justify-content-between">
                <div class="">{{ $t('Cart_text_4') }}</div>
                <div><b>$ {{ total_price + priceShip | numberWithCommas }}</b></div>
            </div>
        </div>
    </div>
    <!-- <div class="my-cart-panel" v-else>
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
                            <div>{{ item.quantity }}</div>

                        </div>
                    </div>
                </div>
                <div class="my-cart-info">
                    <div class="my-cart-edit" @click="goPage('/gio-hang')">{{ $t('Cart_edit') }}</div>
                    <b-row class="my-cart-price-total">
                        <b-col>
                            
                            <div class="d-flex justify-content-between">
                                <div>{{ $t('Cart_text_2') }}:</div>
                                <div>{{ total_price | numberWithCommas }}{{ ' ' }}đ</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>{{ $t('Cart_text_3') }}:</div>
                                <div>{{ priceShip | numberWithCommas }}{{ ' ' }}đ</div>
                            </div>
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
    </div> -->
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
            default: () => []
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
    background-color: #F4F4F4;
    width: 490px;

    .my-cart-head {
        height: 50px;
        line-height: 50px;
        padding: 0px 25px;
        border-bottom: 0.5px solid #D9D9D9;

        .my-cart-head-title {
            color: #000;
            font-family: 'Aeroport';
            font-size: 16px;
            text-transform: uppercase;
        }

        .my-cart-head-edit {
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 16px;
            text-decoration-line: underline;
            cursor: pointer;
        }
    }

    .my-cart-list-product {
        padding: 25px;

        .my-cart-item {
            margin: 10px 0px;

            .my-card-div-img {
                .my-card-image {
                    width: 150px;
                    height: 170px;
                    object-fit: cover;
                    border: 1px solid #D9D9D9;
                }
            }

            .my-card-div-info {
                width: calc(100% - 180px);
                margin-left: 25px;
                position: relative;

                .my-cart-product-name {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                    text-transform: uppercase;
                }

                .my-cart-product-des {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 14px;
                    margin-top: 8px;
                    margin-bottom: 8px;

                    span {
                        color: #000;
                    }
                }

                .my-card-div-price {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                }
            }
        }
    }

    .my-cart-info {
        padding: 25px;
        .my-cart-info-text {
            color: #717171;
            font-family: 'Aeroport';
            font-size: 16px;
            text-transform: uppercase;
            margin-bottom: 15px;
        }

        .my-cart-info-total {
            padding-top: 15px;
            border-top: 1px solid #D9D9D9;
            color: #000;
            font-family: 'Aeroport';
            font-size: 16px;
            text-transform: uppercase;
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