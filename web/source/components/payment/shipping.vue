<template>
    <div class="ship-panel">
        <div :class="`ship-menthod-item d-flex justify-content-between ${shipping_id === _ship.id ? 'user-ship-active' : ''}`"
            v-for="(_ship, index) in listShipping " :key="index" @click="choiceShipping(_ship)">
            <div class="ship-menthod-left-info">
                <div class="ship-menthod-name">
                    {{ $i18n.locale === 'vn' ? _ship.attributes.name : _ship.attributes.name_en }}
                </div>
                <div class="ship-menthod-des">
                    {{ `(${$i18n.locale === 'vn' ? _ship.attributes.description : _ship.attributes.description_en}
                                        ${toDateAdd(_ship.attributes.date)})` }}
                </div>
            </div>
            <div class="ship-menthod-right-info">
                <span class="ship-menthod-price">₫ {{ _ship.attributes.price_primary }}</span>
                <span class="ship-menthod-main-price">₫ {{ _ship.attributes.price }}</span>
            </div>
        </div>
        <div class="ship-des-text">
            {{ $t('Payment_order_19') }}
        </div>
        <div class="ship-next-btn">
            <div class="nas-btn ship-btn" @click="$emit('onNextStep')" v-if="shipping_id">{{ $t('Payment_order_20') }}
            </div>
            <div class="nas-btn ship-btn" disabled v-else>{{ $t('Payment_order_20') }}</div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapGetters({
            listShipping: 'shipping/getListShipping'
        }),
    },
    data() {
        return {
            shipping_id: null
        }
    },
    async mounted() {
        await this.getListShipping()
    },
    methods: {
        ...mapActions({
            getListShipping: "shipping/getListShipping"
        }),
        choiceShipping(item) {
            this.shipping_id = item.id
            this.$emit('choiceShipping', item)
        }
    }
}
</script>
<style lang="scss">
.ship-menthod-item {
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: #E8E8E8;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;

    .ship-menthod-des {
        font-size: 13px;
        font-family: 'inter';
        color: #979191;
    }

    .ship-menthod-name {
        font-size: 13px;
        font-family: 'inter';
        color: #2F3036;
    }

    .ship-menthod-price {
        font-size: 13px;
        font-family: 'inter';
        color: #2F3036;
        text-decoration-line: line-through;
    }

    .ship-menthod-main-price {
        font-size: 13px;
        font-family: 'inter';
        font-weight: 600;
        color: #2F3036;
    }
}

.user-ship-active {
    background-color: #F593A5;
    color: #fff;
}

.ship-des-text {
    margin-bottom: 16px;
    margin-top: 32px;
    text-align: right;
    font-size: 10px;
    font-family: 'inter';
}

.ship-next-btn {
    width: 100%;
    height: 90px;

    .ship-btn {
        margin-top: 40px;
        width: 50%;
        float: right;
    }
}

@media (max-width: 520px) {
    .ship-menthod-item {
        .ship-menthod-left-info {
            line-height: 10px;
        }

        .ship-menthod-name {
            font-size: 10px;
        }

        .ship-menthod-des {
            font-size: 10px;
        }

        .ship-menthod-price {
            font-size: 10px;
        }

        .ship-menthod-main-price {
            font-size: 10px;
        }
    }

    .ship-des-text {
        text-align: center;
        font-size: 7px;
    }

    .ship-next-btn {
        .ship-btn {
            width: 100%;
            clear: both;
            margin-top: 30px;
        }
    }
}
</style>