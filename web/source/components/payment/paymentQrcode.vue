<template>
    <div class="qrcode-panel">
        <div class="d-flex justify-content-between w-100" v-if="!isMobile">
            <div class="qrcode-img">
                <div>{{ payment.attributes?.description }}</div>
                <div class="qrcode-img-title">Số tiền đơn hàng của bạn là: {{ qrcode.totalPrice | numberWithCommas }}{{ ' '
                }}đ</div>
                <img :src="payment.attributes?.qr_code.data?.attributes.url" class="qrcode-image" />
                <div>Nhập lời nhắn cho người nhận là : <b>{{ qrcode.code }}</b></div>
                <div v-show="time > 0">Thời gian thanh toán: {{ time }}</div>
            </div>
            <div class="qrcode-info">
                <div class="qrcode-info-title">Cảm ơn bạn. Đơn hàng của bạn đã được nhận</div>
                <div class="qrcode-info-des">Mã đơn hàng: <span>{{ qrcode.code }}</span></div>
                <div class="qrcode-info-des">Ngày đặt: <span>{{ toDateAdd(0) }}</span></div>
                <div class="qrcode-info-des">Người đặt: <span>{{ qrcode.address_name }}</span></div>
                <div class="qrcode-info-des">Email: <span>{{ qrcode.address_email }}</span></div>
                <div class="qrcode-info-des">Số điện thoại: <span>{{ qrcode.address_phone }}</span></div>
                <div class="qrcode-info-des">Địa chỉ: <span>{{ qrcode.address_full }}</span></div>
                <div class="qrcode-info-des">Tổng cộng: <span>{{ qrcode.totalPrice | numberWithCommas }}{{ ' ' }}đ</span>
                </div>
                <div class="qrcode-info-des">Thanh toán: <span>{{ payment.attributes?.name }}</span></div>
            </div>
        </div>
        <div class="w-100" v-if="isMobile">
            <div class="qrcode-img">
                <div style="font-size: 13px;">{{ payment.attributes?.description }}</div>
                <div class="qrcode-img-title">Số tiền đơn hàng của bạn là: {{ qrcode.totalPrice | numberWithCommas }}{{ ' '
                }}đ</div>
                <img :src="payment.attributes?.qr_code.data?.attributes.url" class="qrcode-image" />
                <div>Nhập lời nhắn cho người nhận là : <b>{{ qrcode.code }}</b></div>
                <div v-show="time > 0">Thời gian thanh toán: {{ time }}</div>
            </div>
            <div class="qrcode-info">
                <div class="qrcode-info-title">Cảm ơn bạn. Đơn hàng của bạn đã được nhận</div>
                <div class="qrcode-info-des">Mã đơn hàng: <span>{{ qrcode.code }}</span></div>
                <div class="qrcode-info-des">Ngày đặt: <span>{{ toDateAdd(0) }}</span></div>
                <div class="qrcode-info-des">Người đặt: <span>{{ qrcode.address_name }}</span></div>
                <div class="qrcode-info-des">Email: <span>{{ qrcode.address_email }}</span></div>
                <div class="qrcode-info-des">Số điện thoại: <span>{{ qrcode.address_phone }}</span></div>
                <div class="qrcode-info-des">Địa chỉ: <span>{{ qrcode.address_full }}</span></div>
                <div class="qrcode-info-des">Tổng cộng: <span>{{ qrcode.totalPrice | numberWithCommas }}{{ ' ' }}đ</span>
                </div>
                <div class="qrcode-info-des">Thanh toán: <span>{{ payment.attributes?.name }}</span></div>
            </div>
        </div>
        <div class="qrcode-order">
            <div class="qrcode-order-title">Chi tiết đơn hàng</div>
            <div class="qrcode-line d-flex justify-content-between">
                <div class="qrcode-sub-title">Sản phẩm</div>
                <div class="qrcode-sub-title">Tổng</div>
            </div>
            <div class="qrcode-line d-flex justify-content-between" v-for="(_p, idx) in qrcode.listProductItem " :key="idx">
                <div class="qrcode-sub-des">{{ _p.name }} x {{ _p.quantity }}</div>
                <div class="qrcode-sub-des">{{ _p.quantity * _p.price | numberWithCommas }}{{ ' ' }}đ</div>
            </div>
            <div class="qrcode-line d-flex justify-content-between">
                <div class="qrcode-sub-des">Phí shipping</div>
                <div class="qrcode-sub-des">{{ qrcode.shippingPrice | numberWithCommas }}{{ ' ' }}đ</div>
            </div>
            <div class="qrcode-line d-flex justify-content-between">
                <div class="qrcode-sub-last">Tổng cộng</div>
                <div class="qrcode-sub-last">{{ qrcode.totalPrice | numberWithCommas }}{{ ' ' }}đ</div>
            </div>
            <div v-show="viewBtn">
                <div class="nas-btn qrcode-btn" @click="onClickOrder">Hoàn tất thanh toán</div>
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
    },
    data() {
        return {
            viewBtn: false,
            time: 30
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
    width: 50%;

    .qrcode-img-title {
        font-family: 'inter';
        font-weight: bolder;
        font-size: 18px;
    }

    .qrcode-image {
        margin-top: 10px;
        margin-bottom: 10px;
    }
}

.qrcode-info {
    width: 50%;

    .qrcode-info-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .qrcode-info-des {
        font-size: 14px;
        font-family: 'inter-light';
        margin-top: 5px;

        span {
            font-family: 'inter';
            font-weight: 600;
        }
    }
}

.qrcode-order {
    margin-top: 30px;

    .qrcode-order-title {
        font-size: 20px;
        margin-bottom: 20px;
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
        margin-top: 5px;
        margin-bottom: 5px;
        font-family: 'inter-light';
    }

    .qrcode-sub-last {
        font-size: 16px;
        font-weight: 600;
        margin-top: 5px;
        margin-bottom: 5px;
    }
}

.qrcode-btn {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 30px;
}

@media (max-width: 520px) {
    .qrcode-img {
        width: 100%;

        .qrcode-img-title {
            font-family: 'inter';
            font-weight: bolder;
            font-size: 14px;
        }

        .qrcode-image {
            margin-top: 10px;
            margin-bottom: 10px;
            width: 100%;
        }
    }

    .qrcode-info {
        margin-top: 30px;
        width: 100%;

        .qrcode-info-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .qrcode-info-des {
            font-size: 9px;
            font-family: 'inter-light';
            margin-top: 5px;

            span {
                font-family: 'inter';
                font-weight: 600;
            }
        }
    }

    .qrcode-order {
        margin-top: 20px;

        .qrcode-order-title {
            font-size: 16px;
            margin-bottom: 5px;
        }

        .qrcode-line {
            border-bottom: 1px solid #a3a3a3;
            padding: 5px 0px;
        }

        .qrcode-sub-title {
            font-size: 12px;
            font-weight: 600;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .qrcode-sub-des {
            font-size: 9px;
            margin-top: 5px;
            margin-bottom: 5px;
            font-family: 'inter-light';
        }

        .qrcode-sub-last {
            font-size: 12px;
            font-weight: 600;
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }

    .qrcode-btn {
        width: 300px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>