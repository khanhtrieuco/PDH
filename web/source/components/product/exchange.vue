<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content-shipping" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <VueSlickCarousel v-bind="settings" class="popup-exchange-slider" :arrows="false">
                <div class="exchange-full-content">
                    <h4>EXCHANGE VALUE</h4>
                    <p>The amount of two-way shipping, customs fees, and any relevant duty must be paid by you.</p>
                    <p>The merchandise exchange amount will be granted based on the purchase price, excluding original
                        intermediary fees, shipping expenses, and any applicable tax or custom.</p>
                    <p>If the price of the items you wish to exchange is less than the exchange amount, the difference will
                        be preserved as a reserved coupon or credit for future purchases at https://phandanghoang.com.</p>
                    <h4>RETURN/REFUND AND CANCELLATION WILL NOT BE PERMITTED.</h4>
                    <p>Completed orders will not be returned, refunded, or canceled under any circumstances.</p>
                    <p><b>*Please take note that:</b></p>
                    <p>All comments and recommendations from our customer service are only for purposes of reference. The
                        order will be executed based on the final customer's decision and complete order confirmation.</p>
                </div>
                <div class="exchange-full-content">
                    <h4>IMPORTANT INFORMATION REGARDING DELIVERY AND EXCHANGE:</h4>
                    <div class="exchange-haft-content">
                        <p>1. To ensure we give you the best service possible, please include videos and receipts as proof
                            in your exchange question. We require this for all inquiries, and we do not resolve cases unless
                            we receive unpacking videos.</p>
                        <p>2. Only items that comply with these conditions may be accepted by Phan Dang Hoang. Items
                            regarded as unacceptable will be promptly returned to clients at their expense.</p>
                        <p>3. Products need to be undamaged and in original condition, with all tags still on. Belts must
                            also be returned, along with any packaging—such as zippered bags—if any was given.</p>
                        <p>4. We advise using a tracking service with your neighborhood post office and carefully and
                            securely packing the order. It is advisable to acquire documentation of the return shipping
                            since you have the responsibility of handling the items with appropriate care and will be held
                            accountable for any harm caused to them until the returned item reaches our atelier. Products
                            that are damaged during delivery are not our responsibility.</p>
                    </div>
                    <div class="exchange-haft-content">
                        <p>5. In terms of delivery, you can either permit us to arrange a return shipment for you or arrange
                            a shipment on your own. Our technical team will thoroughly inspect the returned product before
                            providing more assistance through our private customer service. The tracking information will be
                            provided to the consumer for further investigation.</p>
                        <p>6. If the shipment is handled by the customer, please provide evidence of the shipment for our
                            records. After submitting the proof of delivery, the customer must provide us with the tracking
                            number so that we may follow the shipment's location.</p>
                        <p>7. In case we fail to collect tracking information from the customer in advance and the shipment
                            is lost in transit, Phan Dang Hoang bears no responsibility for tracking and locating the
                            delivery. Customers must be responsible for contacting the courier or customs and tracing the
                            shipment. No exchange will be done until we successfully receive the products.</p>
                        <p>8. We will cancel any exchange request if the shipment process takes more than 30 days.</p>
                    </div>
                </div>
                <div class="exchange-full-content">
                    <h4>WE DO NOT ACCEPT EXCHANGES IN THE FOLLOWING CASES:</h4>
                    <p>1. Phan Dang Hoang retains the right to reject any items that do not fulfill the stated conditions.
                        Unacceptable items will be promptly returned to clients at their expense.</p>
                    <p>2. Exchange requests for products that have been damaged (torn, deformed, broken, etc.) due to consumer
                        mistakes will not be accepted. Items with makeup marks, tan, deodorant, lint or fur, the scent of
                        perfume, smoke, body odors, or stains that have been altered or washed are inappropriate.</p>
                    <p>3. We do not accept exchange requests for personalized items or discounted or gifted items.</p>
                    <p>4. Please do not proceed with any exchange until we have confirmed it. In this case, we will not provide
                        support or exchange the goods.</p>
                </div>
                <div class="exchange-full-content">
                </div>
            </VueSlickCarousel>
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

    .popup-content-shipping {
        position: relative;
        width: 70%;
        background-color: #fff;

        .popup-exchange-slider {
            margin-bottom: 20px;

            .slick-dots {
                bottom: 0px !important;
            }

            .slick-dots li button:before {
                color: #D9D9D9 !important;
                width: 10px !important;
                line-height: 10px !important;
                font-size: 10px !important;
            }

            .slick-dots li.slick-active button:before {
                color: #717171 !important;
            }

        }

        .exchange-haft-content {
            width: 50%;
            display: inline-block;
            padding-right: 20px;
            color: #000;
            float: left;
        }

        .exchange-full-content {
            width: 100%;
            display: inline-block;
            padding: 50px 20px;
            color: #000;
            float: left;

            h4 {
                margin-bottom: 20px;
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

        .popup-content-shipping {
            position: relative;
            width: 100%;

            .exchange-haft-content {
                width: 100%;
                display: inline-block;
                padding: 16px;
            }

            .size-close {
                position: absolute;
                right: 15px;
                top: 15px;
                cursor: pointer;
            }
        }
    }
}</style>
  