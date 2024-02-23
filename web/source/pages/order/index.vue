<template>
    <div class="order-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="order-panel">
            <b-container>
                <h3 class="order-title">{{ $t('Order_title') }}</h3>
                <div class="user-list-content">
                    <div class="user-list-item" v-for="(order, idx) in list_order " :key="idx">
                        <div class="user-list-order-item-products">
                            <div class="user-list-order-item-title">{{ $t('Order_text_3') }} | {{ order.attributes.code }}
                            </div>
                            <div class="user-list-item-products" v-for="(cart, idxc) in order.attributes.cartitems?.data"
                                :key="idxc" v-if="cart && cart.attributes.product.data">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="user-list-product-img">
                                        <img class="user-list-product-image"
                                            :src="cart.attributes.product.data.attributes.thub.data?.attributes.url" />
                                    </div>
                                    <div class="user-list-product-info">
                                        <div class="user-list-product-name">{{ cart.attributes.product.data.attributes.name
                                        }}
                                        </div>
                                        <div class="user-list-product-des">{{
                                            cart.attributes.product.data.attributes.description }}
                                        </div>
                                        <div class="user-list-product-quantity">x{{ cart.attributes.quantity }}</div>
                                    </div>
                                    <div class="user-list-product-price">
                                        {{ cart.attributes.total_price | numberWithCommas }}{{ ' ' }}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!isMobile" @click="onShowExtra(order)"
                            class="user-list-order-footer d-flex justify-content-between align-items-center">
                            <div class="user-list-order-state">
                                <img class="user-list-order-state-icon" src="/images/state5.png"
                                    v-if="order.attributes.state === 'cancel' || order.attributes.state === 'usercancel'" />
                                <img class="user-list-order-state-icon" src="/images/state4.png"
                                    v-if="order.attributes.state === 'complete' || order.attributes.state === 'rate'" />
                                <img class="user-list-order-state-icon" src="/images/state3.png"
                                    v-if="order.attributes.state === 'delivery'" />
                                <img class="user-list-order-state-icon" src="/images/state2.png"
                                    v-if="order.attributes.state === 'pickitem' || order.attributes.state === 'payment'" />
                                <img class="user-list-order-state-icon" src="/images/state1.png"
                                    v-if="order.attributes.state === 'new' || order.attributes.state === 'confirm'" />
                                <div :style="(order.attributes.state === 'cancel' || order.attributes.state === 'usercancel') ? 'color: #F593A5' :
                                    (order.attributes.state === 'complete' || order.attributes.state === 'usercrateancel') ? 'color: #34A353' : ''"
                                    class="user-list-order-state-text">{{ $i18n.locale === 'vn' ?
                                        getStateOrderUser(order.attributes.state)
                                        : getStateOrderUserEn(order.attributes.state) }}</div>
                            </div>
                            <div class="user-list-order-info">
                                <div class="user-list-order-state-total">{{ $t('Order_text_11') }}:
                                    <span>{{ (order.attributes.price - order.attributes.discount_price) | numberWithCommas
                                    }}{{ ' ' }}đ</span>
                                </div>
                                <div class="user-list-order-control d-flex">
                                    <div class="nas-btn btn-contact"
                                        @click="goPage('/cham-soc-khach-hang' + order.attributes.code)">{{
                                            $t('Order_text_1') }}
                                    </div>
                                    <div class="btn-cancel" @click="showCancelModal(order.id)"
                                        v-if="checkAllowCancelOrder(order.attributes.state)">{{ $t('Order_text_2') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="isMobile" @click="onShowExtra(order)" class="user-list-order-footer">
                            <div class="user-list-order-state">
                                <img class="user-list-order-state-icon" src="/images/state5.png"
                                    v-if="order.attributes.state === 'cancel' || order.attributes.state === 'usercancel'" />
                                <img class="user-list-order-state-icon" src="/images/state4.png"
                                    v-if="order.attributes.state === 'complete' || order.attributes.state === 'rate'" />
                                <img class="user-list-order-state-icon" src="/images/state3.png"
                                    v-if="order.attributes.state === 'delivery'" />
                                <img class="user-list-order-state-icon" src="/images/state2.png"
                                    v-if="order.attributes.state === 'pickitem' || order.attributes.state === 'payment'" />
                                <img class="user-list-order-state-icon" src="/images/state1.png"
                                    v-if="order.attributes.state === 'new' || order.attributes.state === 'confirm'" />
                                <div :style="(order.attributes.state === 'cancel' || order.attributes.state === 'usercancel') ? 'color: #F593A5' :
                                    (order.attributes.state === 'complete' || order.attributes.state === 'usercrateancel') ? 'color: #34A353' : ''"
                                    class="user-list-order-state-text">{{ $i18n.locale === 'vn' ?
                                        getStateOrderUser(order.attributes.state)
                                        : getStateOrderUserEn(order.attributes.state) }}</div>
                            </div>
                            <div class="user-list-order-info">
                                <div class="user-list-order-state-total">{{ $t('Order_text_11') }}:
                                    <span>{{ (order.attributes.price - order.attributes.discount_price) | numberWithCommas
                                    }}{{ ' ' }}đ</span>
                                </div>
                                <div class="user-list-order-control">
                                    <div class="nas-btn btn-contact"
                                        @click="goPage(`/cham-soc-khach-hang${order.attributes.code}`)">
                                        {{ $t('Order_text_1') }}</div>
                                    <div class="btn-cancel" @click="showCancelModal(order.id)"
                                        v-if="checkAllowCancelOrder(order.attributes.state)">{{ $t('Order_text_2') }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-show="showExtra === order.id" class="page-order-extra">
                            <div class="page-order-title">{{ $t('Order_title') }}</div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_3') }}</div>
                                <div class="order-value">{{ order.attributes.code }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_4') }}</div>
                                <div class="order-value">{{ order.attributes.pick_date }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_5') }}</div>
                                <div class="order-value">{{ order.attributes.end_date }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_6') }}</div>
                                <div class="order-value">{{ getStateOrderUser(order.attributes.state) }}</div>
                            </div>
                            <div class="page-order-title">{{ $t('Order_text_7') }}</div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_8') }}</div>
                                <div class="order-value">{{ order.attributes.price | numberWithCommas }}{{ ' ' }}đ</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_9') }}</div>
                                <div class="order-value">{{ order.attributes.price_ship | numberWithCommas }}{{ ' ' }}đ
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_10') }}</div>
                                <div class="order-value">{{ order.attributes.discount_price | numberWithCommas }}{{ ' ' }}đ
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_11') }}</div>
                                <div class="order-value">{{ (order.attributes.price_ship + order.attributes.price -
                                    order.attributes.discount_price) | numberWithCommas }}{{ ' ' }}đ</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_12') }}</div>
                                <div class="order-value">{{ order.attributes.payment_type }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_13') }}</div>
                                <div class="order-value">{{ order.attributes.cod | numberWithCommas }}{{ ' ' }}đ</div>
                            </div>
                            <div class="page-order-title">{{ $t('Order_text_14') }}</div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_15') }}</div>
                                <div class="order-value">{{ order.attributes.address_name }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_16') }}</div>
                                <div class="order-value">{{ order.attributes.address_phone }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">Email</div>
                                <div class="order-value">{{ order.attributes.address_email }}</div>
                            </div>
                            <div class="d-flex">
                                <div class="order-des">{{ $t('Order_text_18') }}</div>
                                <div class="order-value">{{ order.attributes.address_full }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-container>
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
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'OrderPage',
    mixins: [general],
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$t('Order_title'),
                    active: true
                }
            ],
            isMobile: false,
            ischeck: null,
            selectReason: null,
            list_order: [],
            orderId: null,
            showExtra: null
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('Order_title'),
                        active: true
                    }
                ]
            }
        },
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn",
            listOder: "order/getListOrder"
        }),
    },
    async mounted() {
        if (!this.$route.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.isMobile = this.checkMobile()
        await this.getListOrder({
            filters: {
                user: { id: { $eq: this.profile.id } }
            }
        })
        this.list_order = this.listOder
    },
    methods: {
        ...mapActions({
            getListOrder: "order/getListOrder"
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
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
        },
        onShowExtra(_order) {
            if (this.showExtra === _order.id) {
                this.showExtra = null
            } else {
                this.showExtra = _order.id
            }
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
    // methods: {
    //   ...mapActions({
    //     getListWork: "work/getListWork"
    //   }),
    //   async loadData() {
    //     await this.getListWork()
    //   }
    // }
}
</script>
<style lang="scss">
.order-content {
    margin-top: 180px;

    .order-panel {
        background: #F5F5F5;
        padding-top: 70px;
        padding-bottom: 170px;
    }

    .order-title {
        color: #2F3036;
        font-size: 26px;
        line-height: 70px;
        margin-bottom: 25px;
        margin-top: 25px;
        text-align: center;
    }

    .page-order-extra {
        padding: 30px 0px 30px 150px;

        .page-order-title {
            color: #2F3036;
            font-size: 26px;
            border-bottom: 1px solid #AFAFAF;
            padding-bottom: 10px;
            margin-bottom: 10px;
            margin-top: 30px;
        }

        .order-des {
            font-family: 'inter-light';
            font-size: 16px;
            width: 50%;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .order-value {
            font-family: 'inter';
            font-size: 16px;
            width: 50%;
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }
}

@media (max-width: 520px) {
    .order-content {
        margin-top: 0px;

        .order-title {
            font-size: 14px;
            line-height: 35px;
            margin-bottom: 15px;
            margin-top: 15px;
        }

        .page-order-extra {
            padding: 10px 0px 10px 10px;

            .page-order-title {
                color: #2F3036;
                font-size: 14px;
                border-bottom: 1px solid #AFAFAF;
                padding-bottom: 8px;
                margin-bottom: 8px;
                margin-top: 20px;
            }

            .order-des {
                font-family: 'inter-light';
                font-size: 11px;
                width: 50%;
                margin-top: 3px;
                margin-bottom: 3px;
            }

            .order-value {
                font-family: 'inter';
                font-size: 11px;
                width: 50%;
                margin-top: 3px;
                margin-bottom: 3px;
            }
        }
    }



    .about-text {
        font-size: 10px;
        line-height: 13px;
    }

    .des-img {
        margin-top: 40px;
    }
}
</style>