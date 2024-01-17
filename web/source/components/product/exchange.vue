<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content-exchange" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <img class="popup-logo" src="/images/logo-p.svg" />
            <div class="exchange-title">EXCHANGE AND RETURN</div>
            <div class="exchange-haft-content">
                <div class="exchange-title-box">EXCHANGE VALUE</div>
                <div class="exchange-text">The amount of two-way shipping, customs fees, and any relevant duty must be paid
                    by you</div>
                <div class="exchange-text">The merchandise exchange amount will be granted based on the purchase price,
                    excluding original intermediary fees, shipping expenses, and any applicable tax or custom.</div>
                <div class="exchange-text">If the price of the items you wish to exchange is less than the exchange amount,
                    the difference will be preserved as a reserved coupon or credit for future purchases at
                    https://phandanghoang.com.</div>
            </div>
            <div class="exchange-haft-content">
                <div class="exchange-title-box">RETURN/REFUND AND CANCELLATION WILL NOT BE PERMITTED.</div>
                <div class="exchange-text">Completed orders will not be returned, refunded, or canceled under any
                    circumstances.</div>
                <div class="exchange-text-sub" style="margin-top: 20px;">* Please take note that:</div>
                <div class="exchange-text-sub">All comments and recommendations from our customer service are only for
                    purposes of reference. The order will be executed based on the final customer's decision and complete
                    order confirmation.</div>
            </div>
            <div class="exchange-full-content">
                <div class="exchange-title-box">IMPORTANT INFORMATION REGARDING DELIVERY AND EXCHANGE</div>
                <div class="exchange-haft">
                    <div class="exchange-haft-text">1. To ensure we give you the best service possible, please include
                        videos and receipts as proof in your exchange question. We require this for all inquiries, and we do
                        not resolve cases unless we receive unpacking videos.</div>
                    <div class="exchange-haft-text">2. Only items that comply with these conditions may be accepted by Phan
                        Dang Hoang. Items regarded as unacceptable will be promptly returned to clients at their expense.
                    </div>
                    <div class="exchange-haft-text">3. Products need to be undamaged and in original condition, with all
                        tags still on. Belts must also be returned, along with any packaging—such as zippered bags—if any
                        was given.</div>
                    <div class="exchange-haft-text">4. We advise using a tracking service with your neighborhood post office
                        and carefully and securely packing the order. It is advisable to acquire documentation of the return
                        shipping since you have the responsibility of handling the items with appropriate care and will be
                        held accountable for any harm caused to them until the returned item reaches our atelier. Products
                        that are damaged during delivery are not our responsibility.</div>
                </div>
                <div class="exchange-haft">
                    <div class="exchange-haft-text">5. In terms of delivery, you can either permit us to arrange a return
                        shipment for you or arrange a shipment on your own. Our technical team will thoroughly inspect the
                        returned product before providing more assistance through our private customer service. The tracking
                        information will be provided to the consumer for further investigation.</div>
                    <div class="exchange-haft-text">6. If the shipment is handled by the customer, please provide evidence
                        of the shipment for our records. After submitting the proof of delivery, the customer must provide
                        us with the tracking number so that we may follow the shipment's location.</div>
                    <div class="exchange-haft-text">7. In case we fail to collect tracking information from the customer in
                        advance and the shipment is lost in transit, Phan Dang Hoang bears no responsibility for tracking
                        and locating the delivery. Customers must be responsible for contacting the courier or customs and
                        tracing the shipment. No exchange will be done until we successfully receive the products.</div>
                    <div class="exchange-haft-text">8. We will cancel any exchange request if the shipment process takes
                        more than 30 days.</div>
                </div>
            </div>
            <div class="exchange-full-content">
                <div class="exchange-title-box">WE DO NOT ACCEPT EXCHANGES IN THE FOLLOWING CASES:</div>
                <div class="exchange-haft-text">1. Phan Dang Hoang retains the right to reject any items that do not
                    fulfill the stated conditions. Unacceptable items will be promptly returned to clients at their expense.
                </div>
                <div class="exchange-haft-text">2. Exchange requests for products that have been damaged (torn,
                    deformed, broken, etc.) due to consumer mistakes will not be accepted. Items with makeup marks, tan,
                    deodorant, lint or fur, the scent of perfume, smoke, body odors, or stains that have been altered or
                    washed are inappropriate.</div>
                <div class="exchange-haft-text">3. We do not accept exchange requests for personalized items or
                    discounted or gifted items.</div>
                <div class="exchange-haft-text">4. Please do not proceed with any exchange until we have confirmed it.
                    In this case, we will not provide support or exchange the goods.</div>
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
        isMobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            settings: {
                "dots": true,
                "autoplay": false,
                "autoplaySpeed": 300000,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            }
        }
    },
    methods: {
        async closeUpdate() {
            this.$emit('closeUpdate')
        }
    },
    directives: {
        'click-outside-size': {
            bind: function (el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                    const compName = vNode.context.name
                    let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
                    if (compName) { warn += `Found in component '${compName}'` }

                    console.warn(warn)
                }
                // Define Handler and cache it on the element
                const bubble = binding.modifiers.bubble
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                }
                el.__vueClickOutside__ = handler

                // add Event Listeners
                document.addEventListener('click', handler)
                console.log('afafawa')
            },

            unbind: function (el, binding) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__)
                el.__vueClickOutside__ = null

            }
        }
    }
}
</script>
<style lang="scss">
.backgroud-black {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #000000b3;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-content-exchange {
        position: relative;
        width: 80%;
        max-width: 820px;
        padding: 40px 20px 60px;
        background-color: #fff;
        text-align: center;

        .popup-logo {
            margin: auto;
            margin-top: 20px;
            width: 120px;
        }

        .exchange-title {
            font-size: 14px;
            margin-top: 20px;
            font-family: 'Aeroport-bold';
            color: #000;
        }

        .exchange-haft-content {
            width: 50%;
            display: inline-block;
            padding: 0px 1px;
            margin-top: 15px;
            color: #000;
            float: left;
            text-align: left;

            .exchange-title-box {
                background-color: #000;
                color: #fff;
                font-size: 12px;
                font-family: 'Aeroport';
                height: 45px;
                line-height: 45px;
                padding: 0px 15px;
            }

            .exchange-text {
                font-family: 'Aeroport';
                color: #000;
                font-size: 11px;
                margin-top: 10px;
            }

            .exchange-text-sub {
                font-family: 'Aeroport';
                color: #A4A4A4;
                font-size: 11px;
                margin-top: 5px;
            }
        }

        .exchange-full-content {
            width: 100%;
            margin-top: 40px;
            color: #A4A4A4;
            text-align: left;
            float: left;

            .exchange-title-box {
                background-color: #000;
                color: #fff;
                font-size: 12px;
                font-family: 'Aeroport';
                height: 45px;
                line-height: 45px;
                padding: 0px 15px;
            }

            .exchange-haft {
                width: 50%;
                display: inline-block;
                padding: 0px 1px;
                float: left;

            }

            .exchange-haft-text {
                font-family: 'Aeroport';
                color: #000;
                font-size: 11px;
                margin-top: 10px;
            }
        }

        .size-close {
            position: absolute;
            right: 30px;
            top: 30px;
            cursor: pointer;
        }
    }
}

@media (max-width: 520px) {
    .backgroud-black {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0px;
        top: 0px;
        background-color: #fff;
        z-index: 115;
        display: block;
        overflow: hidden;
        padding: 20px 20px 40px 20px;


        .popup-content-exchange {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 100%;
            background-color: #fff;
            text-align: center;
            overflow-y: scroll;

            .popup-logo {
                margin: auto;
                margin-top: 0px;
                width: 120px;
            }

            .exchange-title {
                font-size: 14px;
                margin-top: 20px;
                font-family: 'Aeroport-bold';
                color: #000;
            }

            .exchange-haft-content {
                width: 100%;
                display: inline-block;
                padding: 0px 1px;
                margin-top: 15px;
                color: #000;
                float: left;
                text-align: left;

                .exchange-title-box {
                    background-color: #000;
                    color: #fff;
                    font-size: 12px;
                    font-family: 'Aeroport';
                    height: 40px;
                    line-height: 40px;
                    padding: 0px 15px;
                }

                .exchange-text {
                    font-family: 'Aeroport';
                    color: #000;
                    font-size: 11px;
                    margin-top: 10px;
                }

                .exchange-text-sub {
                    font-family: 'Aeroport';
                    color: #A4A4A4;
                    font-size: 11px;
                    margin-top: 5px;
                }
            }

            .exchange-full-content {
                width: 100%;
                margin-top: 20px;
                color: #A4A4A4;
                text-align: left;
                float: left;

                .exchange-title-box {
                    background-color: #000;
                    color: #fff;
                    font-size: 12px;
                    font-family: 'Aeroport';
                    height: 45px;
                    line-height: 45px;
                    padding: 0px 15px;
                }

                .exchange-haft {
                    width: 100%;
                    display: inline-block;
                    padding: 0px 1px;
                    float: left;

                }

                .exchange-haft-text {
                    font-family: 'Aeroport';
                    color: #000;
                    font-size: 11px;
                    margin-top: 10px;
                }
            }

            .size-close {
                position: absolute;
                right: 30px;
                top: 30px;
                cursor: pointer;
            }
        }
    }
}
</style>
  