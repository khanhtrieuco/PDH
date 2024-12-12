<template>
    <div class="my-order-container">
        <div class="my-order-content">
            <div class="container">
                <div class="my-order-title">Order history</div>
            </div>
            <div class="my-order-item" v-for="_order, index in listOrder" :key="index">
                <div class="container mx-0 px-0">
                    <div class="my-order-item-head d-flex justify-content-between">
                        <div class="my-order-item-code">{{ _order.attributes.code }}</div>
                        <div class="my-order-item-state">{{ $i18n.locale === 'vn' ?
                            getStateOrderUser(_order.attributes.state)
                            : getStateOrderUserEn(_order.attributes.state) }}</div>
                    </div>
                    <div class="my-order-item-product-list">
                        <div class="my-order-item-product" v-for="_cart, idx in _order.attributes.cartitems.data"
                            :key="idx">
                            <div class="d-flex justify-content-between">
                                <img class="my-order-item-product-img"
                                    :src="_cart.attributes.product.data?.attributes.thub.data.attributes.url" />
                                <div class="my-order-item-product-info">
                                    <div class="my-order-item-product-info-name">
                                        {{ _cart.attributes.product.data?.attributes.name }}
                                    </div>
                                    <div class="my-order-item-product-info-des">Color: <span>{{
                                        _cart.attributes.variant.data?.attributes.color.data.attributes.name }}</span>
                                    </div>
                                    <div class="my-order-item-product-info-des">Size: <span>{{
                                        _cart.attributes.variant.data?.attributes.size.data.attributes.name }}</span>
                                    </div>
                                    <div class="my-order-item-product-info-des">Quantity: <span>{{
                                        _cart.attributes.quantity }}</span></div>
                                    <div class="my-order-item-product-info-price">
                                        $ {{ _cart.attributes.total_price | numberWithCommas }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-order-item-product-price">
                        Total: $ {{ _order.attributes.price | numberWithCommas }}
                    </div>
                </div>
            </div>
            <div style="margin: 1rem;" v-if="listOrder && listOrder.length === 0">You currently have no orders</div>
        </div>
        <div class="my-order-back" @click="$router.go(-1)">back to my account</div>
    </div>
</template>

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
.my-order-container {
    background-color: #FAFAFA;
    margin-top: -45px;
    padding-top: 150px;
    padding-bottom: 150px;

    .my-order-back {
        text-align: center;
        padding-bottom: 20px;
        margin-top: 20px;
        cursor: pointer;
        color: #000;
        font-family: "Aeroport-light";
        font-size: 16px;
        font-weight: 300;
        text-decoration-line: underline;
        text-transform: uppercase;
    }
}

.my-order-content {
    padding-bottom: 100px;
    min-height: 700px;
    max-width: 1050px;
    margin: auto;
    background-color: #fff;

    .my-order-title {
        color: #000;
        text-align: left;
        font-family: 'Aeroport';
        font-size: 35px;
        font-weight: 500;
        padding-top: 40px;
        padding-left: 80px;
        padding-right: 80px;
    }

    .my-order-item {
        border-top: 1px solid #D9D9D9;
        margin-top: 15px;
        margin-bottom: 30px;
        padding-left: 80px;
        padding-right: 80px;

        .my-order-item-head {
            margin-top: 10px;
            margin-bottom: 10px;

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

@media (max-width: 520px) {
    .my-order-container {
        background-color: #FAFAFA;
        margin-top: -20px;
        padding-top: 80px;
        padding-bottom: 80px;

        .my-order-back {
            text-align: center;
            padding-bottom: 20px;
            margin-top: 20px;
            cursor: pointer;
            color: #000;
            font-family: "Aeroport-light";
            font-size: 16px;
            font-weight: 300;
            text-decoration-line: underline;
            text-transform: uppercase;
        }
    }

    .my-order-content {
        padding-bottom: 100px;
        min-height: 600px;
        max-width: 80%;
        margin: auto;
        background-color: #fff;

        .my-order-title {
            color: #000;
            text-align: left;
            font-family: 'Aeroport';
            font-size: 12px;
            font-weight: 500;
            padding-top: 10px;
            padding-left: 20px;
            padding-right: 20px;
        }

        .my-order-item {
            border-top: 1px solid #D9D9D9;
            margin-top: 12px;
            margin-bottom: 20px;
            padding-left: 20px;
            padding-right: 20px;

            .my-order-item-head {
                margin-top: 10px;
                margin-bottom: 10px;

                .my-order-item-code {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 12px;
                }

                .my-order-item-state {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                }
            }

            .my-order-item-product-list {
                border-top: 1px solid #D9D9D9;
                border-bottom: 1px solid #D9D9D9;
                padding-bottom: 1rem;
                .my-order-item-product {
                    padding: 10px 0px 0px 0px;


                    .my-order-item-product-img {
                        width: 120px;
                        height: 190px;
                        object-fit: cover;
                    }

                    .my-order-item-product-info {
                        width: calc(100% - 130px);
                        position: relative;

                        .my-order-item-product-info-name {
                            color: #000;
                            font-family: 'Aeroport-light';
                            font-size: 10px;
                            text-transform: uppercase;
                        }

                        .my-order-item-product-info-name {
                            color: #717171;
                            font-family: 'Aeroport-light';
                            font-size: 10px;
                            line-height: 25px;

                            span {
                                color: #000;
                            }
                        }

                        .my-order-item-product-info-des{
                            font-size: 10px;
                        }

                        .my-order-item-product-info-price {
                            color: #000;
                            text-align: right;
                            font-family: 'Aeroport-light';
                            font-size: 10px;
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
                font-size: 10px;
                text-transform: uppercase;
            }
        }
    }
}
</style>