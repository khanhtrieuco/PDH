<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content-shipping" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <div class="shiping-haft-content">
                <h4>SHIPPING POLICY</h4>
                <p>International shipping is offered to the majority of the world's areas.</p>
                <p>Shipping time: This varies by region, but it generally ranges from 7 to 20 days.</p>
                <p>* Express shipping costs more depending on the time and place.</p>
                Shipping costs vary depending on the weight of the items ordered and the country to which they are being
                delivered. It is computed automatically at checkout and does not include taxes or fees.</p>
                <p>Order tracking: tracking information will be updated online roughly 2–3 working days after your order
                    has been sent.</p>
                <p>We'll send you an email with a tracking number. You'll receive tracking information in your delivery
                    confirmation emails, which you can use to track the progress of your item online. The merchandise will
                    be delivered to the address mentioned in the order.</p>
            </div>
            <div class="shiping-haft-content">
                <p><b>*Please take note that:</b></p>
                <p>Please confirm that all of the shipping information, email address, and phone number you gave are correct
                    so that the procedure does not get delayed. Please check your email or WhatsApp message, as we will
                    contact you to inquire about missing information if necessary.</p>
                <p>Our shipping charges do not include customs duties. It is the customer's responsibility to pay the tax to
                    obtain the items. We accept no responsibility if consumers refuse to pay or pay late.</p>
                <p>Customers must contact us if they have any issues about the amount of taxes and customs costs. Please do
                    not notify the delivery service about taxes and customs fees on your own without first speaking with us.
                    We are not in charge of any additional charges.</p>
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
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-content-shipping {
        position: relative;
        width: 70%;
        background-color: #fff;
        .shiping-haft-content {
            width: 50%;
            display: inline-block;
            padding: 50px 20px;
            color: #000;
            float: left;
            h2{
                text-transform: uppercase;
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

            .shiping-haft-content {
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
}
</style>
  