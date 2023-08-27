<template>
    <div class="my-order-content">
        <div class="container">
            <div class="my-order-title">Order history</div>
        </div>

        <div class="my-order-item" v-for="_order, index in listOrder" :key="index">
            <div class="container">
                <div class="my-order-item-head d-flex justify-content-between">
                    <div class="my-order-item-code">{{ _order.attributes.code }}</div>
                    <div class="my-order-item-state">{{ $i18n.locale === 'vn' ?
                        getStateOrderUser(_order.attributes.state)
                        : getStateOrderUserEn(_order.attributes.state) }}</div>
                </div>
                <div class="my-order-item-product-list">
                    <div class="my-order-item-product" v-for="_cart, idx in _order.attributes.cartitems.data" :key="idx">
                        <div class="d-flex justify-content-between">
                            <img class="my-order-item-product-img"
                                :src="_cart.attributes.product.data.attributes.thub.data.attributes.url" />
                            <div class="my-order-item-product-info">
                                <div class="my-order-item-product-info-name">
                                    {{ _cart.attributes.product.data.attributes.name }}
                                </div>
                                <div class="my-order-item-product-info-des">Color: <span>{{
                                    _cart.attributes.variant.data.attributes.color.data.attributes.name }}</span>
                                </div>
                                <div class="my-order-item-product-info-des">Size: <span>{{
                                    _cart.attributes.variant.data.attributes.size.data.attributes.name }}</span>
                                </div>
                                <div class="my-order-item-product-info-des">Quantity: <span>{{
                                    _cart.attributes.quantity }}</span></div>
                                <div class="my-order-item-product-info-price">
                                    {{ _cart.attributes.total_price | numberWithCommas }}{{ ' ' }}đ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-order-item-product-price">
                    Total: {{ _order.attributes.price | numberWithCommas }}{{ ' ' }}đ
                </div>
                
            </div>
        </div>
    </div>
</div></template>

<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    mixins: [general],
    data() {
        return {
            isMobile: false,
        }
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn",
            listOrder: "order/getListOrder",
        }),
    },
    async mounted() {
        if (!this.loggedIn) {
            this.$router.push({ path: '/dang-nhap' })
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.getListOrder({
            filters: {
                user: { id: { $eq: this.profile.id } }
            }
        })
    },
    methods: {
        ...mapActions({
            getListOrder: "order/getListOrder",
        }),
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
}
</script>
<style lang="scss">
.my-order-content {
    padding-bottom: 100px;
    min-height: 700px;

    .my-order-title {
        color: #000;
        text-align: left;
        font-family: 'Aeroport';
        font-size: 35px;
        font-weight: 500;
        margin-top: 45px;
    }

    .my-order-item {
        border-top: 1px solid #D9D9D9;
        margin-top: 15px;

        .my-order-item-head {
            margin-top: 10px;
            margin-bottom: 5px;

            .my-order-item-code {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 20px;
            }

            .my-order-item-state {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 16px;
            }
        }

        .my-order-item-product-list {
            border-top: 1px solid #D9D9D9;
            border-bottom: 1px solid #D9D9D9;

            .my-order-item-product {
                padding: 30px 0px;


                .my-order-item-product-img {
                    width: 160px;
                    height: 180px;
                }

                .my-order-item-product-info {
                    width: calc(100% - 195px);
                    position: relative;

                    .my-order-item-product-info-name {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        text-transform: uppercase;
                    }

                    .my-order-item-product-info-name {
                        color: #717171;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        line-height: 25px;

                        span {
                            color: #000;
                        }
                    }

                    .my-order-item-product-info-price {
                        color: #000;
                        text-align: right;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                    }
                }
            }

        }

        .my-order-item-product-price {
            text-align: right;
            margin-top: 10px;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 16px;
            text-transform: uppercase;
        }
    }
}

@media (max-width: 520px) {}
</style>