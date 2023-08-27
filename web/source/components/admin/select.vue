<template>
    <a-select show-search :placeholder="placeholder" option-filter-prop="children" style="width: 100%"
        :filter-option="filterOption" v-model="select" @select="(e) => this.$emit('onSelect',e)">
        <a-select-option v-for="d in listItem" :key="d.value">
            {{ d.text }}
        </a-select-option>
    </a-select>
</template>


<script>
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        listItem: {
            type: Array,
            default() {
                return []
            }
        },
        placeholder: {
            type: String,
            default: 'Select a value'
        },
        default: {
            type: Number,
            default: null
        },
    },
    data() {
        return {
            select: null,
            show: false
        }
    },
    mounted() {
        if (this.default) {
            this.select = this.default
        } else {
            this.select = null
        }
    },
    watch: {
        default: function (val) {
            this.select = this.default
        }
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        }
    }
}
</script>
<style lang="scss">
@media (max-width: 520px) {}
</style>