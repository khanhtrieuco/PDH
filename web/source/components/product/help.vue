<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content-help" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <img class="popup-logo" src="/images/logo.png" />
            <div class="help-title">NEED HELP</div>
            <div class="help-text">We only allow orders to be changed once, for free. Please call & email to assist with any
                adjustments you would like to make to your order.</div>
            <div class="help-bold">Call us: 0986375167</div>
            <div class="help-bold">Mail us: p.d.h.brand@gmail.com </div>
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

    .popup-content-help {
        position: relative;
        width: 60%;
        max-width: 750px;
        padding: 40px 120px 60px;
        background-color: #fff;
        text-align: center;

        .popup-logo {
            margin: auto;
            margin-top: 20px;
            width: 120px;
        }

        .help-title {
            font-size: 14px;
            margin-top: 40px;
            font-family: 'Aeroport-bold';
            color: #000;
        }

        .help-text {
            font-size: 11px;
            margin-top: 40px;
            font-family: 'Aeroport';
            color: #000;
        }

        .help-bold {
            font-size: 11px;
            margin-top: 10px;
            font-family: 'Aeroport-bold';
            color: #000;
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

        .popup-content-help {
            position: relative;
            width: 100%;
            max-width: 750px;
            padding: 20px 80px 40px;
            background-color: #fff;
            text-align: center;

            .popup-logo {
                margin: auto;
                margin-top: 20px;
                width: 120px;
            }

            .help-title {
                font-size: 14px;
                margin-top: 30px;
                font-family: 'Aeroport-bold';
                color: #000;
            }

            .help-text {
                font-size: 11px;
                margin-top: 30px;
                font-family: 'Aeroport';
                color: #000;
            }

            .help-bold {
                font-size: 11px;
                margin-top: 10px;
                font-family: 'Aeroport-bold';
                color: #000;
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
  