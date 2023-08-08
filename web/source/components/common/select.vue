<template>
    <div class="select-list-panel">
        <div class="input-choice d-flex justify-content-between align-items-center" @click="show = !show">
            <div>{{ select }}</div>
            <img class="input-choice-image" src="/images/xvalue.png" v-if="!show"></img>
            <img class="input-choice-image" src="/images/xvalue1.png" v-else></img>
        </div>
        <transition name="fade">
            <div class="select-list-list" v-show="show">
                <div class="select-item" v-for="(item, index) in listItem" :key="index" @click="onSelectItem(item)">
                    {{ item.name }}</div>
            </div>
        </transition>
    </div>
</template>


<script>
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        listItem: {
            type: Array,
            default: []
        },
        default: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            select: null,
            show: false
        }
    },
    mounted() {
        if(this.default) {
            this.select = this.default
        }
    },
    methods: {
        onSelectItem(_item) {
            this.select = _item.name
            this.show = !this.show
            this.$emit('onChange', _item.item)
        }
    }
}
</script>
<style lang="scss">
.select-list-panel {
    width: 225px;
    position: relative;

    .input-choice {
        border-bottom: 1px solid #000 !important;
        height: 30px;
        line-height: 28px;
        padding-bottom: 5px;
    }

    .input-choice-image {
        width: 16px;
        height: 8px;
    }

    .select-list-list {
        position: absolute;
        top: 32px;
        left: 0px;
        width: 100%;
        background-color: white;
        z-index: 1;
        padding-bottom: 20px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .select-item {
            margin-top: 8px;
        }
    }
}

@media (max-width: 520px) {
    .select-list-panel {
        width: 140px;
        .input-choice {
            font-size: 10px;
        }
        .input-choice-image {
            width: 10px;
            height: 5px;
        }
        .select-item {
            font-size: 10px;
        }
    }
}
</style>