<template>
    <div style="display: inline-block;">
        <img v-if="!checked" class="check-img" src="/images/ucheck.png" @click="$emit('choice', true)" />
        <img v-if="checked" class="check-img" src="/images/check.png" @click="$emit('choice', false)" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        checked: {
            type: Boolean,
            default: false
        }
    },
    // data() {
    //     return {
    //         hover: false
    //     }
    // },
    // watch: {
    //     selected() {
    //         if(!this.selected)
    //             this.hover = false
    //     },
    // },
    methods: {
        showHover() {
            this.hover = true
        },
        hideHover() {
            this.hover = false
        },
    }
};
</script>
<style>
.check-img {
    width: 14px;
    cursor: pointer;
}

@media (max-width: 520px) {
    .check-img {
        width: 9px;
        cursor: pointer;
    }
}
</style>