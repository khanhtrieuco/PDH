<template>
    <div class="d-flex">
        <a-card style="width: 70%;">
            <a-descriptions title="Thông tin đơn">
                <a-descriptions-item label="Mã đơn">
                    {{ order?.attributes.code }}
                </a-descriptions-item>
                <a-descriptions-item label="Loại đơn">
                    {{ order?.attributes.payment_type }}
                </a-descriptions-item>
                <a-descriptions-item label="Người đặt">
                    {{ order?.attributes.user?.data?.attributes?.username }}
                </a-descriptions-item>
                <a-descriptions-item label="Ngày đặt">
                    {{ order?.attributes.createdAt }}
                </a-descriptions-item>
                <a-descriptions-item label="Ngày giao">
                    {{ order?.attributes.end_date }}
                </a-descriptions-item>
            </a-descriptions>
            <a-descriptions title="Thông tin giá">
                <a-descriptions-item label="Giá đơn hàng">
                    $ {{ formatPrice(order?.attributes.price) }}
                </a-descriptions-item>
                <a-descriptions-item label="Phí ship">
                    $ {{ formatPrice(order?.attributes.price_ship) }}
                </a-descriptions-item>
                <a-descriptions-item label="Khuyến mãi">
                    $ {{ formatPrice(order?.attributes.discount_price) }}
                </a-descriptions-item>
                <a-descriptions-item label="Tồng cộng">
                    <b>$ {{ formatPrice(order?.attributes.price + order?.attributes.price_ship) }}</b>
                </a-descriptions-item>
            </a-descriptions>
            <a-descriptions title="Thông tin giao hàng">
                <a-descriptions-item label="Người nhận">
                    {{ order?.attributes.address_name }}
                </a-descriptions-item>
                <a-descriptions-item label="Số điện thoại">
                    {{ order?.attributes.address_phone }}
                </a-descriptions-item>
                <a-descriptions-item label="Email">
                    {{ order?.attributes.address_email }}
                </a-descriptions-item>
                <a-descriptions-item label="Địa chỉ">
                    {{ order?.attributes.address_full }}
                </a-descriptions-item>
            </a-descriptions>
            <a-card title="Trạng thái đơn">
                <div slot="extra">
                    <a-button class="admin-btn" type="primary" @click="onOpenAdd">Cập nhật trạng thái</a-button>
                    <a-select v-if="showUpdate" style="width: 250px;" @change="(e) => onUpdateState(e)">
                        <a-select-option :value="_state.value" v-for="(_state, idx) in state" :key="idx">
                            {{ _state.title }}
                        </a-select-option>
                    </a-select>
                </div>
                <a-steps size="small">
                    <a-step :status="_state.status" :title="_state.title" v-for="(_state, idx) in state" :key="idx"
                        style="cursor: pointer;">
                        <a-icon slot="icon" :type="_state.icon" />
                    </a-step>
                </a-steps>
            </a-card>
            <a-button v-if="order?.attributes.state === 'new'" slot="extra" class="admin-btn" type="primary"
                @click="onApproveOrder">Xác nhận đơn</a-button>
        </a-card>
        <div style="width: calc(30% - 10px); margin-left: 10px;">
            <a-card title="Ghi chú đơn hàng" style="margin-bottom: 10px;">
                {{ order?.attributes.note }}
            </a-card>
            <a-card title="Danh sách sản phẩm">
                <a-list item-layout="vertical" size="large" :data-source="list_cart">
                    <a-list-item slot="renderItem" key="cart.id" slot-scope="cart, index">
                        <!-- <template v-for="{ type, text } in actions" slot="actions">
                        <span :key="type">
                            <a-icon :type="type" style="margin-right: 8px" />
                            {{ text }}
                        </span>
                    </template> -->
                        <img slot="extra" style="max-width: 200px;max-height: 100px;object-fit: cover;" alt="logo"
                            :src="cart.attributes.product.data?.attributes.thub.data?.attributes.url" />
                        <div>{{ `${cart.attributes.product.data?.attributes.name} x ${cart.attributes.quantity}` }}
                        </div>
                        <div>{{ formatPrice(cart.attributes.total_price) }} đ</div>
                    </a-list-item>
                </a-list>
            </a-card>
        </div>

    </div>
</template>
<script>
import general from "~/mixins/general";
import { mapActions, mapGetters } from 'vuex'
export default {
    mixins: [general],
    computed: {
        ...mapGetters({
            listCategory: "category/getListCategory",
            listSubcategory: "category/getListSubCategory",
            listTip: "product/getListTip"
        })
    },
    props: {
        item: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
            order: null,
            list_cart: [],
            loading: false,
            showUpdate: false,
            state: [{
                value: 'new',
                title: 'Chờ xác nhận',
                description: 'Đơn vừa tạo',
                icon: 'shopping-cart',
                status: 'wait'
            }, {
                value: 'pickitem',
                title: 'Đang đóng gói',
                description: 'Chờ vận chuyển',
                icon: 'appstore',
                status: 'wait'
            }, {
                value: 'delivery',
                title: 'Đang vận chuyển',
                description: 'Hàng đang vận chuyển',
                icon: 'car',
                status: 'wait'
            }, {
                value: 'complete',
                title: 'Đã giao',
                description: 'Khách đã nhận sản phẩm',
                icon: 'smile-o',
                status: 'wait'
            }, {
                value: 'cancel',
                title: 'Hủy',
                description: 'Đơn đã hủy',
                icon: 'close-circle',
                status: 'wait'
            }, {
                value: 'usercancel',
                title: 'User Hủy',
                description: 'Đơn đã hủy',
                icon: 'close-circle',
                status: 'wait'
            }]
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.list_cart = this.item.attributes.cartitems.data ?? []
            this.order = this.item
            this.checkState(this.item.attributes.state)
        }
    },
    watch: {
        item: function (val) {
            this.order = val
            this.list_cart = val.attributes.cartitems.data ?? []
            this.checkState(val.attributes.state)
        },
    },
    methods: {
        ...mapActions({
            updateOrder: "order/updateOrder",
            approveOrder: "order/approveOrder",
        }),
        checkState(state) {
            switch (state) {
                case 'new':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ xác nhận',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'process'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'wait'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'wait'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'wait'
                    }]
                    break
                case 'confirm':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ thanh toán',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'process'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'wait'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'wait'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'wait'
                    }]
                    break
                case 'payment':
                    this.state = [{
                        value: 'payment',
                        title: 'Đã thanh toán',
                        description: 'Đơn vừa thanh toán',
                        icon: 'shopping-cart',
                        status: 'finish'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'wait'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'wait'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'wait'
                    }]
                    break
                case 'pickitem':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ xác nhận',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'finish'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'process'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'wait'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'wait'
                    }]
                    break
                case 'delivery':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ xác nhận',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'finish'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'finish'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'process'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'wait'
                    }]
                    break
                case 'complete':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ xác nhận',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'finish'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'finish'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'finish'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'process'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'wait'
                    }]
                    break
                // case 'rate':
                //     stringState = 'Đã đánh giá'
                //     break
                case 'cancel':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ xác nhận',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'wait'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'wait'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'wait'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'cancel',
                        title: 'Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'error'
                    }]
                    break
                case 'usercancel':
                    this.state = [{
                        value: 'new',
                        title: 'Chờ xác nhận',
                        description: 'Đơn vừa tạo',
                        icon: 'shopping-cart',
                        status: 'wait'
                    }, {
                        value: 'pickitem',
                        title: 'Đang đóng gói',
                        description: 'Chờ vận chuyển',
                        icon: 'appstore',
                        status: 'wait'
                    }, {
                        value: 'delivery',
                        title: 'Đang vận chuyển',
                        description: 'Hàng đang vận chuyển',
                        icon: 'car',
                        status: 'wait'
                    }, {
                        value: 'complete',
                        title: 'Đã giao',
                        description: 'Khách đã nhận sản phẩm',
                        icon: 'smile-o',
                        status: 'wait'
                    }, {
                        value: 'usercancel',
                        title: 'User Hủy',
                        description: 'Đơn đã hủy',
                        icon: 'close-circle',
                        status: 'error'
                    }]
                    break
                default:
                    break
            }
        },
        onOpenAdd() {
            this.showUpdate = !this.showUpdate
        },
        async onUpdateState(_state) {
            let rs = await this.updateOrder({
                id: this.item.id,
                data: {
                    state: _state
                }
            })
            if (rs && rs.id) {
                this.checkState(_state)
                this.order.attributes.state = _state
                this.$message.success('Cập nhật trạng thái thành công');
                this.$emit('onReload')
                this.showUpdate = !this.showUpdate
            } else {
                this.$message.error('Cập nhật trạng thái không thành công! Xin thử lại sau!');
            }

        },
        async onApproveOrder() {
            let rs = await this.approveOrder(this.item.id)
            if (rs && rs.id) {
                this.order.attributes.state = 'pickitem'
                this.checkState('pickitem')
                this.$message.success('Xác nhận đơn thành công');
                this.$emit('onReload')
                this.showUpdate = !this.showUpdate
            } else {
                this.$message.error('Xác nhận đơn không thành công! Xin thử lại sau!');
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>