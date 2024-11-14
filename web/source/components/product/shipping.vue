<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content-shipping" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <img class="popup-logo" src="/images/logo.png" />
            <div class="shipping-title">SHIPPING POLICY</div>
            <div class="shipping-sub">International shipping is offered to the majority of the world's areas.</div>

            <div class="shiping-haft-content">
                <div class="shipping-title-box">SHIPPING TIME</div>
                <div class="shipping-text">Shipping time: This varies by region, but it generally ranges from 7 to 20 days.
                </div>
                <div class="shipping-text">* Express shipping costs more depending on the time and place.
                    Shipping costs vary depending on the weight of the items ordered and the country to which they are being
                    delivered. It is computed automatically at checkout and does not include taxes or fees.
                </div>
            </div>
            <div class="shiping-haft-content">
                <div class="shipping-title-box">ORDER TRACKING</div>
                <div class="shipping-text">Tracking information will be updated online roughly 2–3 working days after your
                    order has been sent.</div>
                <div class="shipping-text">We'll send you an email with a tracking number. You'll receive tracking
                    information in your delivery
                    confirmation emails, which you can use to track the progress of your item online. The merchandise will
                    be delivered to the address mentioned in the order.</div>
            </div>
            <div class="shiping-full-content">
                <div class="shipping-line"></div>
                <div class="shipping-content-sub">Please take note that:</div>
                <div class="shipping-content-text">* Please confirm that all of the shipping information, email address, and
                    phone number you gave are correct so that the procedure does not get delayed. Please check your email or
                    WhatsApp message, as we will contact you to inquire about missing information if necessary.</div>
                <div class="shipping-content-text">* Our shipping charges do not include customs duties. It is the customer's
                    responsibility to pay the tax to obtain the items. We accept no responsibility if consumers refuse to
                    pay or pay late.</div>
                <div class="shipping-content-text">* Customers must contact us if they have any issues about the amount of
                    taxes and customs costs. Please do not notify the delivery service about taxes and customs fees on your
                    own without first speaking with us. We are not in charge of any additional charges.</div>
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
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-content-shipping {
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

        .shipping-title {
            font-size: 14px;
            margin-top: 40px;
            font-family: 'Aeroport-bold';
            color: #000;
        }

        .shipping-sub {
            font-size: 11px;
            margin-top: 20px;
            font-family: 'Aeroport';
            color: #000;
            text-align: left;
        }

        .shiping-haft-content {
            width: 50%;
            display: inline-block;
            padding: 0px 1px;
            margin-top: 15px;
            color: #000;
            float: left;
            text-align: left;

            .shipping-title-box {
                background-color: #000;
                color: #fff;
                font-size: 12px;
                font-family: 'Aeroport';
                height: 45px;
                line-height: 45px;
                padding: 0px 15px;
            }

            .shipping-text {
                font-family: 'Aeroport';
                color: #000;
                font-size: 11px;
                margin-top: 15px;
            }
        }

        .shiping-full-content{
            width: 100%;
            margin-top: 40px;
            color: #A4A4A4;
            text-align: left;
            float: left;
            .shipping-line{
                width: 100%;
                border-top: 1px solid #A4A4A4;
                margin-bottom: 20px;
            }
            .shipping-content-sub{
                font-family: 'Aeroport';
                font-size: 10px;
                margin-bottom: 15px;
                margin-top: 10px;
            }
            .shipping-content-text{
                font-family: 'Aeroport';
                font-size: 10px;
                margin-top: 5px;
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
    background-color: #000000b3;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-content-shipping {
        position: relative;
        width: 100%;
        max-width: 100%;
        padding: 20px 20px 20px;
        background-color: #fff;
        text-align: center;

        .popup-logo {
            margin: auto;
            margin-top: 10px;
            width: 120px;
        }

        .shipping-title {
            font-size: 14px;
            margin-top: 20px;
            font-family: 'Aeroport-bold';
            color: #000;
        }

        .shipping-sub {
            font-size: 11px;
            margin-top: 10px;
            font-family: 'Aeroport';
            color: #000;
            text-align: left;
        }

        .shiping-haft-content {
            width: 100%;
            display: inline-block;
            padding: 0px 1px;
            margin-top: 10px;
            color: #000;
            float: left;
            text-align: left;

            .shipping-title-box {
                background-color: #000;
                color: #fff;
                font-size: 11px;
                font-family: 'Aeroport';
                height: 40px;
                line-height: 40px;
                padding: 0px 10px;
            }

            .shipping-text {
                font-family: 'Aeroport';
                color: #000;
                font-size: 10px;
                margin-top: 15px;
            }
        }

        .shiping-full-content{
            width: 100%;
            margin-top: 20px;
            color: #A4A4A4;
            text-align: left;
            float: left;
            .shipping-line{
                width: 100%;
                border-top: 1px solid #A4A4A4;
                margin-bottom: 10px;
            }
            .shipping-content-sub{
                font-family: 'Aeroport';
                font-size: 9px;
                margin-bottom: 5px;
                margin-top: 10px;
            }
            .shipping-content-text{
                font-family: 'Aeroport';
                font-size: 9px;
                margin-top: 5px;
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
  