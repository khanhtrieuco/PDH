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
    width: 100%;
    position: relative;

    .input-choice {
        border: 1px solid #000 !important;
        height: 40px;
        line-height: 40px;
        padding: 10px;
        font-family: 'Aeroport-light';
    }

    .input-choice-image {
        width: 12px;
    }

    .select-list-list {
        position: absolute;
        top: 40px;
        left: 0px;
        width: 100%;
        background-color: white;
        z-index: 1;
        padding: 10px;
        border: 1px solid #000 !important;

        .select-item {
            margin-top: 8px;
            font-family: 'Aeroport-light';
        }
    }
}

@media (max-width: 520px) {
    .select-list-panel {
        width: 100%;
        .input-choice {
            font-size: 10px;
            font-family: 'Aeroport-light';
        }
        .input-choice-image {
            width: 10px;
            height: 5px;
        }
        .select-item {
            font-size: 10px;
            font-family: 'Aeroport-light';
        }
    }
}
</style>