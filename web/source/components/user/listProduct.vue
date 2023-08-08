<template>
    <div v-if="show" class="backgroud-black">
        <div class="product-list-order">
            <img class="close-btn" src="/images/Dell_light.png" @click="$emit('closeUpdate')" />
            <div class="product-list-title">Sản phẩm đã xem</div>
            <div class="product-list-content">
                <div class="product-list-item-products" v-for="(_product, idxc) in list_product" :key="idxc">
                    <div class="d-flex justify-content-between align-items-center"
                        @click="goPage(`/san-pham/${_product.attributes.slug}`)">
                        <div class="product-list-product-img">
                            <img class="product-list-product-image" :src="_product.attributes.thub.data?.attributes.url" />
                        </div>
                        <div class="product-list-product-info">
                            <div class="product-list-product-name">{{ _product.attributes.name }}
                            </div>
                            <div class="product-list-product-des">{{
                                _product.attributes.description }}
                            </div>
                        </div>
                        <div class="product-list-product-price">
                            {{ _product.attributes.price | numberWithCommas }}{{ ' ' }}đ
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        list_product: {
            type: Array,
            default: []
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
        goPage(url) {
            this.$router.push({ path: this.localePath(url) })
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
.product-list-order {
    position: relative;
    top: 0px;
    margin: auto;
    width: 100%;
    height: 100vh;
    background-color: #F0F0F0;
    border-radius: 5px;
    padding: 74px;
}

.product-list-title {
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 24px;
    text-align: center;
}

.product-list-content {
    max-width: 1300px;
    margin: auto;
    height: 100%;
    overflow-y: scroll;
}

.product-list-item {
    background-color: #fff;
    margin-bottom: 16px;
    border-radius: 20px;
}

.product-list-order-item-title {
    font-family: 'inter-light';
    color: #515151;
    font-size: 16px;
    padding: 20px 30px;
}

.product-list-item-products {
    border-top: 1px solid #CBCBCB;
    border-bottom: 1px solid #CBCBCB;
    padding: 20px 30px;
}

.product-list-product-img {
    width: 80px;
    text-align: center;
}

.product-list-product-image {
    max-height: 110px;
}

.product-list-product-info {
    width: 300px;
}

.product-list-product-name {
    font-size: 20px;
    color: #2F3036;
}

.product-list-product-des {
    font-size: 13px;
    font-family: 'inter-light';
    color: #515151;
}

.product-list-product-quantity {
    font-size: 13px;
    color: #000;
    font-family: 'inter-light';
    margin-top: 16px;
}

.product-list-product-price {
    width: calc(100% - 380px);
    text-align: right;
}

.product-list-order-footer {
    padding: 20px 30px;
    background-color: #FFF9FA;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

.product-list-order-state-icon {
    width: 30px;
    margin-right: 8px;
}

.product-list-order-state-text {
    display: inline-block;
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter';
}

.product-list-order-state-total {
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
    .product-list-order {
        width: 90%;
        padding: 16px;
        height: 95vh;
        overflow: hidden;
    }

    .product-list-title {
        text-align: center;
        font-size: 20px;
    }

    .product-list-item {
        margin-bottom: 16px;
        padding: 10px 10px;
    }

    .product-list-product-img {
        width: 60px;
        text-align: center;
    }

    .product-list-product-image {
        max-height: 80px;
    }

    .product-list-product-info {
        width: 150px;
    }

    .product-list-product-price {
        width: calc(100% - 200px);
        text-align: right;
    }

    .product-list-product-name {
        font-size: 14px;
        color: #2F3036;
    }

    .product-list-product-des {
        font-size: 10px;
        font-family: 'inter-light';
        color: #515151;
    }

    .product-list-product-quantity {
        font-size: 10px;
        color: #000;
        font-family: 'inter-light';
        margin-top: 16px;
    }

    .product-list-order-footer {
        padding: 0px 0px 20px 0px;
    }

    .product-list-order-state {
        padding: 20px;
        border-bottom: 1px solid #CBCBCB;
        text-align: center;
    }

    .product-list-order-state-icon {
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

    .product-list-order-state-text {
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

    .product-list-item-products {
        padding: 20px 10px;
    }

    .product-list-order-state-total {
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
  