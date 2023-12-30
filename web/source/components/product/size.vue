<template>
    <div class="backgroud-black" @click="closeUpdate">
        <div class="popup-content" @click.stop="">
            <img class="size-close" src="/images/close.svg" @click="$emit('closeUpdate')" />
            <div class="size-content">
                <img class="size-content-img" src="/images/size.svg" />
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
        },
        showSize: {
            type: Boolean,
            default: false
        },
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

    .popup-content {
        position: relative;

        .size-content-img {
            max-width: 100%;
            width: 1024px;
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

        .popup-content {
            position: relative;
            width: 100%;

            .size-content-img {
                width: 100%;
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
  