<template>
    <div class="user-payment-panel">
        <b-row v-if="!isMobile">
            <b-col cols="6">
                <div :class="`user-payment-btn ${user_payment === 'cod' ? 'user-payment-active' : ''}`"
                    @click="choicePayment('cod')">{{ $t('Payment_menthod_1') }}</div>
            </b-col>
            <b-col cols="6">
                <div :class="`user-payment-btn ${user_payment === 'online' ? 'user-payment-active' : ''}`"
                    @click="choicePayment('online')">{{ $t('Payment_menthod_2') }}</div>
            </b-col>
        </b-row>
        <b-row v-if="isMobile">
            <b-col cols="12">
                <div :class="`user-payment-btn ${user_payment === 'cod' ? 'user-payment-active' : ''}`"
                    @click="choicePayment('cod')">{{ $t('Payment_menthod_1') }}</div>
            </b-col>
            <b-col cols="12">
                <div :class="`user-payment-btn ${user_payment === 'online' ? 'user-payment-active' : ''}`"
                    @click="choicePayment('online')">{{ $t('Payment_menthod_2') }}</div>
            </b-col>
        </b-row>
        <transition name="fade">
            <div class="user-payment-menthod d-flex justify-content-between" v-if="user_payment === 'online'">
                <div :class="`user-payment-menthod-item ${_pay.id === current_payment?.id ? 'user-payment-menthod-item-active' : ''}`"
                    v-for="(_pay, index) in listPayment " :key="index">
                    <img :src="_pay.attributes.thub.data.attributes.url" @click="onChoicePaymentType(_pay)"
                        class="user-payment-icon" />
                </div>
                <!-- <img src="/images/zalopay.png" class="user-payment-icon" />
                <img src="/images/visa.png" class="user-payment-icon" />
                <img src="/images/atm.png" class="user-payment-icon" /> -->
            </div>
        </transition>
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
            listPayment: 'payment/getListPayment'
        }),
    },
    data() {
        return {
            user_payment: null,
            current_payment: null
        }
    },
    methods: {
        ...mapActions({
            getListPayment: "payment/getListPayment"
        }),
        choicePayment(_name) {
            this.user_payment = _name
            this.$emit('onChoicePayment', this.user_payment)
        },
        onChoicePaymentType(payment) {
            this.current_payment = payment
            this.$emit('onChoicePaymentType', payment)
        },
    }
}
</script>
<style lang="scss">
.user-payment-panel {
    .user-payment-btn {
        margin-top: 32px;
        background-color: #E8E8E8;
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 13px;
        font-family: 'inter';
        color: #2F3036;
        text-align: center;
        cursor: pointer;
    }

    .user-payment-active {
        background-color: #F593A5;
        color: #ffffff;
    }

    .user-payment-menthod {
        width: 80%;
        margin-top: 32px;
        margin-left: auto;
        margin-right: auto;

        .user-payment-menthod-item {
            padding: 20px 10px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 120px;
            cursor: pointer;

            &:hover {
                background-color: #F593A5;

            }
        }

        .user-payment-menthod-item-active {
            background-color: #F593A5;
        }

        .user-payment-icon {
            max-height: 45px;
            cursor: pointer;
        }
    }
}

@media (max-width: 520px) {
    .user-payment-panel {
        .user-payment-btn {
            margin-top: 20px;
        }

        .user-payment-menthod {
            margin-top: 15px;
            width: 80%;

            .user-payment-menthod-item {
                padding: 15px 15px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 80px;
                cursor: pointer;

                &:hover {
                    background-color: #F593A5;

                }
            }

            .user-payment-menthod-item-active {
                background-color: #F593A5;
            }

            .user-payment-icon {
                max-height: 25px;
            }
        }
    }
}
</style>