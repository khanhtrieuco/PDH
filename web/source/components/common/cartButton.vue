<template>
    <div class="volumn-btn d-flex justify-content-around">
        <div class="volumn-btn-sub volumn-left-btn" @click="() => updateValue(-1)">-</div>
        <div class="volumn-number">{{ inumber }}</div>
        <div class="volumn-btn-sub volumn-left-btn" @click=" updateValue(1)">+</div>
    </div>
</template>


<script>
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        inumber: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        updateValue(_v) {
            let _t = this.inumber + _v
            if (_t >= 0) {
                this.$emit('updateValue', _t)
            }
        }
    }
}
</script>
<style lang="scss">
.volumn-btn {
    width: 95px;
    height: 24px;
    border: 1px solid #515151;
    border-radius: 16px;
    font-family: 'inter-light';
    font-size: 16px;
    cursor: pointer;

    .volumn-btn-sub {
        width: 20px;
        text-align: center;
        line-height: 22px;
    }

    .volumn-number {
        line-height: 22px;
        font-family: 'inter-light';

    }
}
</style>