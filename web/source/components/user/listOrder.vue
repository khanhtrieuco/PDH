<template>
    <div v-if="show" class="backgroud-black">
        <div class="user-list-order">
            <img class="close-btn" src="/images/Dell_light.png" @click="$emit('closeUpdate')" />
            <div class="user-list-title">{{ $t('Order_title_1') }}</div>
            <div class="user-list-content">
                <div class="user-list-item" v-for="(order, idx) in  list_order " :key="idx">
                    <div class="user-list-order-item-products">
                        <div class="user-list-order-item-title">{{ $t('Order_text_3') }} | {{ order.attributes.code }}</div>
                        <div class="user-list-item-products" v-for="(cart, idxc) in order.attributes.cartitems?.data"
                            :key="idxc"  v-if="cart && cart.attributes.product.data">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="user-list-product-img">
                                    <img class="user-list-product-image"
                                        :src="cart.attributes.product.data?.attributes.thub.data?.attributes.url" />
                                </div>
                                <div class="user-list-product-info">
                                    <div class="user-list-product-name">{{ cart.attributes.product.data?.attributes.name }}
                                    </div>
                                    <div class="user-list-product-des">{{
                                        cart.attributes.product.data?.attributes.description }}
                                    </div>
                                    <div class="user-list-product-quantity">x{{ cart.attributes.quantity }}</div>
                                </div>
                                <div class="user-list-product-price">
                                    $ {{ cart.attributes.total_price | numberWithCommas }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!isMobile" class="user-list-order-footer d-flex justify-content-between align-items-center">
                        <div class="user-list-order-state">
                            <img class="user-list-order-state-icon" src="/images/state5.png" 
                                v-if="order.attributes.state === 'cancel' || order.attributes.state === 'usercancel'" />
                            <img class="user-list-order-state-icon" src="/images/state4.png" 
                                v-if="order.attributes.state === 'complete' || order.attributes.state === 'rate'" />
                            <img class="user-list-order-state-icon" src="/images/state3.png" 
                                v-if="order.attributes.state === 'delivery'"/>
                            <img class="user-list-order-state-icon" src="/images/state2.png" 
                                v-if="order.attributes.state === 'pickitem' || order.attributes.state === 'payment'"/>
                            <img class="user-list-order-state-icon" src="/images/state1.png" 
                                v-if="order.attributes.state === 'new' || order.attributes.state === 'confirm'"/>
                            <div :style="(order.attributes.state === 'cancel' || order.attributes.state === 'usercancel') ? 'color: #F593A5': 
                                (order.attributes.state === 'complete' || order.attributes.state === 'usercrateancel') ? 'color: #34A353': ''" 
                                class="user-list-order-state-text">{{ $i18n.locale === 'vn' ? getStateOrderUser(order.attributes.state) 
                                : getStateOrderUserEn(order.attributes.state) }}</div>
                        </div>
                        <div class="user-list-order-info">
                            <div class="user-list-order-state-total">{{ $t('Order_text_11') }}: 
                                    <span>$ {{ (order.attributes.price - order.attributes.discount_price) | numberWithCommas }}</span></div>
                            <div class="user-list-order-control d-flex">
                                <div class="nas-btn btn-contact"
                                    @click="goPage('/cham-soc-khach-hang' + order.attributes.code)">{{ $t('Order_text_1') }}</div>
                                <div class="btn-cancel" @click="showCancelModal(order.id)"
                                    v-if="checkAllowCancelOrder(order.attributes.state)">{{ $t('Order_text_2') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isMobile" class="user-list-order-footer">
                        <div class="user-list-order-state">
                            <img class="user-list-order-state-icon" src="/images/state5.png" 
                                v-if="order.attributes.state === 'cancel' || order.attributes.state === 'usercancel'" />
                            <img class="user-list-order-state-icon" src="/images/state4.png" 
                                v-if="order.attributes.state === 'complete' || order.attributes.state === 'rate'" />
                            <img class="user-list-order-state-icon" src="/images/state3.png" 
                                v-if="order.attributes.state === 'delivery'"/>
                            <img class="user-list-order-state-icon" src="/images/state2.png" 
                                v-if="order.attributes.state === 'pickitem' || order.attributes.state === 'payment'"/>
                            <img class="user-list-order-state-icon" src="/images/state1.png" 
                                v-if="order.attributes.state === 'new' || order.attributes.state === 'confirm'"/>
                            <div :style="(order.attributes.state === 'cancel' || order.attributes.state === 'usercancel') ? 'color: #F593A5': 
                                (order.attributes.state === 'complete' || order.attributes.state === 'usercrateancel') ? 'color: #34A353': ''" 
                                class="user-list-order-state-text">{{ $i18n.locale === 'vn' ? getStateOrderUser(order.attributes.state) 
                                : getStateOrderUserEn(order.attributes.state) }}</div>
                        </div>
                        <div class="user-list-order-info">
                            <div class="user-list-order-state-total">{{ $t('Order_text_11') }}: 
                                    <span>$ {{ (order.attributes.price - order.attributes.discount_price) | numberWithCommas }}</span></div>
                            <div class="user-list-order-control">
                                <div class="nas-btn btn-contact"
                                    @click="goPage(`/cham-soc-khach-hang${order.attributes.code}`)">{{ $t('Order_text_1') }}</div>
                                <div class="btn-cancel" @click="showCancelModal(order.id)"
                                    v-if="checkAllowCancelOrder(order.attributes.state)">{{ $t('Order_text_2') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal ref="modal-cancel" title="Lý do hủy" hide-footer>
            <div class="modal-cancel-head">
                Nếu bạn xác nhận hủy, toàn bộ đơn hàng sẽ được hủy. Trường hợp bạn đã thanh toán đơn hàng, nhân viên của
                NAS sẽ liên hệ với bạn để hoàn trả tiền trong vòng 48 tiếng.
            </div>
            <div class="modal-cancel-list">
                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="selectReason" :aria-describedby="ariaDescribedby" name="some-radios"
                        value="Tôi muốn cập nhật địa chỉ/sđt nhận hàng">
                        Tôi muốn cập nhật địa chỉ/sđt nhận hàng</b-form-radio>
                    <b-form-radio v-model="selectReason" :aria-describedby="ariaDescribedby" name="some-radios"
                        value="Người bán không trả lời thắc mắc / yêu cầu của tôi">
                        Người bán không trả lời thắc mắc / yêu cầu của tôi</b-form-radio>
                    <b-form-radio v-model="selectReason" :aria-describedby="ariaDescribedby" name="some-radios"
                        value="Thay đổi đơn hàng ">
                        Thay đổi đơn hàng </b-form-radio>
                    <b-form-radio v-model="selectReason" :aria-describedby="ariaDescribedby" name="some-radios"
                        value="Tôi không có nhu cầu mua nữa">
                        Tôi không có nhu cầu mua nữa</b-form-radio>
                </b-form-group>
            </div>
            <div class="d-flex">
                <div class="nas-btn modal-cancel-btn-1" @click="$refs['modal-cancel'].hide()">Không phải bây giờ</div>
                <div class="nas-btn modal-cancel-btn-2" @click="onUpdateState()">Hủy đơn hàng</div>
            </div>
        </b-modal>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        show: {
            type: Boolean,
            default: false
        },
        state: {
            type: String,
            default: null
        },
        list_order: {
            type: Array,
            default: () => []
        },
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            ischeck: null,
            selectReason: null,
            orderId: null
        }
    },
    methods: {
        ...mapActions({
            updateOrder: "order/updateOrder",
        }),
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
        },
        showCancelModal(id) {
            this.orderId = id
            this.$refs['modal-cancel'].show()
        },
        async onUpdateState() {
            if (!this.selectReason || !this.orderId) {
                this.$message.warning('Vui lòng chọn lý do hùy đơn hàng');
                return
            }
            let rs = await this.updateOrder({
                id: this.orderId,
                data: {
                    state: 'usercancel',
                    note: this.selectReason
                }
            })
            if (rs && rs.id) {
                this.$emit('onReload')
                this.$refs['modal-cancel'].hide()
                this.$message.success('Hủy đơn hàng thành công');
            } else {
                this.$message.error('Hủy đơn hàng không thành công! Xin thử lại sau!');
            }
        }
    }
}
</script>
<style lang="scss">
.user-list-order {
    position: relative;
    top: 0px;
    margin: auto;
    width: 100%;
    height: 100vh;
    background-color: #F0F0F0;
    border-radius: 5px;
    padding: 74px;
}

.user-list-title {
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 24px;
    text-align: center;
}

.user-list-content {
    max-width: 1300px;
    margin: auto;
    height: 100%;
    overflow-y: scroll;
}

.user-list-item {
    background-color: #fff;
    margin-bottom: 16px;
    border-radius: 20px;
}

.user-list-order-item-title {
    font-family: 'inter-light';
    color: #515151;
    font-size: 16px;
    padding: 20px 30px;
}

.user-list-item-products {
    border-top: 1px solid #CBCBCB;
    border-bottom: 1px solid #CBCBCB;
    padding: 20px 30px;
}

.user-list-product-img {
    width: 80px;
    text-align: center;
    margin-right: 30px;
}

.user-list-product-image {
    max-height: 110px;
}

.user-list-product-info {
    width: 300px;
}

.user-list-product-name {
    font-size: 20px;
    color: #2F3036;
}

.user-list-product-des {
    font-size: 13px;
    font-family: 'inter-light';
    color: #515151;
}

.user-list-product-quantity {
    font-size: 13px;
    color: #000;
    font-family: 'inter-light';
    margin-top: 16px;
}

.user-list-product-price {
    width: calc(100% - 380px);
    text-align: right;
}

.user-list-order-footer {
    padding: 20px 30px;
    background-color: #FFF9FA;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

.user-list-order-state-icon {
    width: 30px;
    margin-right: 8px;
}

.user-list-order-state-text {
    display: inline-block;
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter';
}

.user-list-order-state-total {
    display: inline-block;
    color: #2F3036;
    font-size: 16px;
    font-family: 'inter-light';
    text-align: right;

    span {

        display: inline-block;
        color: #F593A5;
        font-size: 18px;
        font-family: 'inter';
    }
}

.btn-contact {
    width: 140px;
    margin-right: 16px;
    margin-top: 16px;
}

.btn-cancel {
    margin-top: 16px;
    width: 140px;
    border-radius: 20px;
    border: 1px solid #2F3036;
    color: #2F3036;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    padding: 10px;
}

.modal-cancel-head {
    margin: 20px;
    padding: 40px 15px;
    text-align: center;
    border-radius: 20px;
    background-color: #FFEFF2;
}

.modal-cancel-list {
    padding: 20px;
    margin-top: 20px;
}

.modal-cancel-btn-1 {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #2F3036;
    color: #2F3036;
}

.modal-cancel-btn-2 {
    margin-left: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
}

@media (max-width: 520px) {
    .user-list-order {
        width: 90%;
        padding: 16px;
        height: 95vh;
        overflow: hidden;
    }

    .user-list-title {
        text-align: center;
        font-size: 20px;
    }

    .user-list-item {
        margin-bottom: 16px;
        padding: 10px 10px;
    }

    .user-list-product-img {
        width: 60px;
        text-align: center;
    }

    .user-list-product-image {
        max-height: 80px;
        max-width: 100%;
    }

    .user-list-product-info {
        width: 150px;
    }

    .user-list-product-price {
        width: calc(100% - 200px);
        text-align: right;
    }

    .user-list-product-name {
        font-size: 14px;
        color: #2F3036;
    }

    .user-list-product-des {
        font-size: 10px;
        font-family: 'inter-light';
        color: #515151;
    }

    .user-list-product-quantity {
        font-size: 10px;
        color: #000;
        font-family: 'inter-light';
        margin-top: 16px;
    }

    .user-list-order-footer {
        padding: 0px 0px 20px 0px;
    }

    .user-list-order-state {
        padding: 20px;
        border-bottom: 1px solid #CBCBCB;
        text-align: center;
    }

    .user-list-order-state-icon {
        width: 20px;
        margin-right: 4px;
    }

    .btn-contact {
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .btn-cancel {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 20px;
        display: block;
    }

    .user-list-order-state-text {
        display: inline-block;
        color: #2F3036;
        font-size: 10px;
        font-family: 'inter';
    }

    .modal-cancel-btn-1 {
        margin-left: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
    }
    .modal-cancel-btn-2 {
        margin-left: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .user-list-order-state-total {
        text-align: center;
        margin-top: 20px;
        display: block;
        font-size: 14px;
        font-family: 'inter-light';

        span {

            display: inline-block;
            color: #F593A5;
            font-size: 18px;
            font-family: 'inter';
        }
    }
}
</style>
  