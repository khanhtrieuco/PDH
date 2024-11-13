<template>
    <div style="width: 40px;height:25px;display: inline-block;" v-if="selected">
        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="22" viewBox="0 0 39 22" fill="none">
            <path
                d="M19.5265 1C9.29986 1 1 5.64784 1 11.3841C1 17.1204 9.28828 21.7682 19.5265 21.7682C29.7647 21.7682 38.0391 17.118 38.0391 11.3841C38.0391 5.65015 29.7415 1 19.5265 1Z"
                :stroke="color" stroke-width="0.320344" stroke-miterlimit="10" />
            <path
                d="M16.2844 3.30432C8.79276 3.30432 2.7207 6.92161 2.7207 11.3842C2.7207 14.3345 5.37926 16.9143 9.34393 18.3316L23.2249 4.45064C20.993 3.67806 18.6461 3.29043 16.2844 3.30432Z"
                :fill="color" />
            <path
                d="M23.2189 4.4436L9.33789 18.3246C11.5726 19.0944 13.9218 19.4789 16.2853 19.4616C23.777 19.4616 29.849 15.8443 29.849 11.3841C29.8421 8.43375 27.1858 5.85162 23.2189 4.4436Z"
                :fill="color" />
        </svg>
    </div>
    <div style="width: 40px;height:25px;display: inline-block;" v-else>
        <svg v-if="!hover" xmlns="http://www.w3.org/2000/svg" @mouseover="showHover()" width="33" height="20"
            viewBox="0 0 33 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0.589355 9.61942C0.589355 4.30679 7.81807 0.000428921 16.7368 0.000428921C19.5441 -0.0160774 22.3337 0.443943 24.987 1.36086L24.991 1.35693C29.7136 3.03316 32.8758 6.10716 32.8841 9.61951C32.8841 14.9294 25.6554 19.2358 16.7367 19.2358C13.9273 19.2563 11.1348 18.8 8.47817 17.8863L8.47424 17.8903C3.75434 16.203 0.589355 13.1318 0.589355 9.61942Z"
                :fill="color" />
        </svg>
        <svg v-if="hover" xmlns="http://www.w3.org/2000/svg" @mouseleave="hideHover()" width="39" height="22"
            viewBox="0 0 39 22" fill="none">
            <path
                d="M19.5265 1C9.29986 1 1 5.64784 1 11.3841C1 17.1204 9.28828 21.7682 19.5265 21.7682C29.7647 21.7682 38.0391 17.118 38.0391 11.3841C38.0391 5.65015 29.7415 1 19.5265 1Z"
                :stroke="color" stroke-width="0.320344" stroke-miterlimit="10" />
            <path
                d="M16.2844 3.30432C8.79276 3.30432 2.7207 6.92161 2.7207 11.3842C2.7207 14.3345 5.37926 16.9143 9.34393 18.3316L23.2249 4.45064C20.993 3.67806 18.6461 3.29043 16.2844 3.30432Z"
                :fill="color" />
            <path
                d="M23.2189 4.4436L9.33789 18.3246C11.5726 19.0944 13.9218 19.4789 16.2853 19.4616C23.777 19.4616 29.849 15.8443 29.849 11.3841C29.8421 8.43375 27.1858 5.85162 23.2189 4.4436Z"
                :fill="color" />
        </svg>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        color: {
            type: String,
            default: '#000'
        },
        selected: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            hover: false
        }
    },
    watch: {
        selected() {
            if(!this.selected)
                this.hover = false
        },
    },
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
<style></style>