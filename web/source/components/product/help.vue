<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content-shipping" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <div class="shiping-full-content">
                <h4>NEED HELP</h4>
                <p>We only allow orders to be changed once, for free. Please call & email to assist with any adjustments you
                    would like to make to your order.</p>
                <p>Call us: 0986375167</p>
                <p>Mail us: p.d.h.brand@gmail.com </p>
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

            h2 {
                text-transform: uppercase;
            }
        }

        .shiping-full-content {
            width: 100%;
            display: inline-block;
            padding: 50px 20px;
            color: #000;
            h2 {
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
  