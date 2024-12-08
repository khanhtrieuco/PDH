<template>
    <div class="qrcode-panel">
        <div class="d-flex justify-content-between w-100" v-if="!isMobile">
            <div class="qrcode-img">
                <!-- <div>{{ payment.attributes?.description }}</div> -->
                <div class="qrcode-img-title">Your order amount is: {{ qrcode.totalPrice | numberWithCommas }}{{ ' '
                }}$</div>
                <img :src="payment.attributes?.qr_code.data?.attributes.url" class="qrcode-image" />
                <div>Message for the recipient: <b>{{ qrcode.code }}</b></div>
                <div v-show="time > 0">Payment time: {{ time }}</div>
            </div>
            <div class="qrcode-info">
                <div class="qrcode-info-title">Thank you. Your order has been received.</div>
                <div class="qrcode-info-des">Order ID: <span>{{ qrcode.code }}</span></div>
                <div class="qrcode-info-des">Date Ordered: <span>{{ toDateAdd(0) }}</span></div>
                <div class="qrcode-info-des">Placed by: <span>{{ qrcode.address_name }}</span></div>
                <div class="qrcode-info-des">Phone Number: <span>{{ qrcode.address_phone }}</span></div>
                <div class="qrcode-info-des">Address: <span>{{ qrcode.address_full }}</span></div>
                <div class="qrcode-info-des">Total: <span>{{ qrcode.totalPrice | numberWithCommas }}{{ ' ' }}$</span>
                </div>
                <div class="qrcode-info-des">Payment Method: <span>{{ payment.attributes?.name }}</span></div>
            </div>
        </div>
        <div class="w-100" v-if="isMobile">
            <div class="qrcode-img">
                <div class="qrcode-info-title">Thank you. Your order has been received.</div>
                <div class="qrcode-info-title">Your order amount is</div>
                <div class="qrcode-img-title">{{ qrcode.totalPrice | numberWithCommas }}{{ ' '}}$</div>
                <img :src="payment.attributes?.qr_code.data?.attributes.url" class="qrcode-image" />
                <div>Message for the recipient: <b>{{ qrcode.code }}</b></div>
                <div v-show="time > 0">Payment time: {{ time }}</div>
            </div>
        </div>
        <div class="qrcode-order">
            <div class="qrcode-order-title">Order Details</div>
            <div class="qrcode-line" v-for="(_p, idx) in qrcode.listProductItem " :key="idx">
                <div class="qrcode-sub-des">{{ _p.name }} x {{ _p.quantity }}</div>
                <div class="qrcode-sub-price">$ {{ _p.quantity * _p.price | numberWithCommas }}</div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="qrcode-sub-des">SUBTOTAL</div>
                <div class="qrcode-sub-des">{{ (qrcode.totalPrice ?? 0 - (qrcode.price_ship ?? 0)) }}{{ ' ' }}$</div>
            </div>
            <div class="qrcode-line d-flex justify-content-between pb-3">
                <div class="qrcode-sub-des">SHIPPING COST</div>
                <div class="qrcode-sub-des">{{ qrcode.price_ship | numberWithCommas }}{{ ' ' }}$</div>
            </div>

            <div class="d-flex justify-content-between mt-2">
                <div class="qrcode-sub-last">TOTAL</div>
                <div class="qrcode-sub-last">{{ qrcode.totalPrice | numberWithCommas }}{{ ' ' }}$</div>
            </div>
            <div v-show="viewBtn">
                <div class="nas-btn qrcode-btn" @click="onClickOrder">COMPLETE</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
        payment: {
            type: Object,
            default: {},
        },
        qrcode: {
            type: Object,
            default: {},
        },
        shippingText: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            viewBtn: false,
            time: 180
        }
    },
    mounted() {
        let _t = setInterval(() => {
            this.time--
            if (this.time <= 0) {
                clearInterval(_t)
                this.viewBtn = true
            }
        }, 1000)
    },
    methods: {
        onClickOrder() {
            this.$emit('onDonePayment')
        }
    }

}
</script>
<style lang="scss">
.qrcode-img {
    width: 100%;
    color: #000;
    text-align: center;
    .qrcode-img-title {
        font-family: 'inter';
        font-weight: bolder;
        font-family: 'Aeroport';
        text-align: center;
        font-size: 16px;
    }

    .qrcode-image {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 50%;
    }

    .qrcode-info-title {
        font-size: 14px;
        margin-bottom: 5px;
        font-family: 'Aeroport-light';
        text-align: center;
    }
}

.qrcode-info {
    width: 50%;

    .qrcode-info-des {
        font-size: 14px;
        font-family: 'Aeroport-light';
        margin-top: 5px;
        color: #000;

        span {
            font-family: 'inter';
            font-weight: 600;
        }
    }
}

.qrcode-order {
    margin-top: 30px;

    .qrcode-order-title {
        font-size: 16px;
        margin-bottom: 20px;
        color: #000;

    }

    .qrcode-line {
        border-bottom: 1px solid #a3a3a3;
        padding: 5px 0px;
    }

    .qrcode-sub-title {
        font-size: 16px;
        font-weight: 600;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .qrcode-sub-des {
        font-size: 14px;
        font-family: 'Aeroport';
        color: #000;
    }

    .qrcode-sub-price {
        font-size: 14px;
        font-family: 'Aeroport-light';
    }

    .qrcode-sub-last {
        font-size: 16px;
        font-weight: 600;
        margin-top: 5px;
        color: #000;
        margin-bottom: 5px;
    }
}

.qrcode-btn {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 30px;
    background-color: #000;
    color: #fff;
    text-align: center;
    cursor: pointer;
    height: 50px;
    line-height: 48px;
    font-family: 'Aeroport-light';
    font-size: 18px;
}

@media (max-width: 520px) {

}
</style>