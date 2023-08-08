<template>
    <div class="value-content" v-if="isMobile">
        <b-container>
            <b-row>
                <b-col cols="6">
                    <div class="value-title">{{ $t('About_title_3') }}</div>
                    <div class="value-block">
                        <b-button @click="setShow(1)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_4') }} </span>
                            <img class="icon-arrow" :src="vl_1 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_1">
                            <div class="value-text">
                                {{ $t('About_sub_1') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(2)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_5') }} </span>
                            <img class="icon-arrow" :src="vl_2 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_2">
                            <div class="value-text">
                                {{ $t('About_sub_2') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(3)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_6') }} </span>
                            <img class="icon-arrow" :src="vl_3 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_3">
                            <div class="value-text">
                                {{ $t('About_sub_3') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(4)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_7') }} </span>
                            <img class="icon-arrow" :src="vl_4 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_4">
                            <div class="value-text">
                                {{ $t('About_sub_4') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(5)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_8') }} </span>
                            <img class="icon-arrow" :src="vl_5 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_5">
                            <div class="value-text">
                                {{ $t('About_sub_5') }}
                            </div>
                        </b-collapse>
                    </div>
                </b-col>
                <b-col cols="6">
                    <img class="value-img w-100" src="/images/about-gt.jpg"></img>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <div class="value-content" v-else>
        <b-container>
            <b-row>
                <b-col cols="6" class="value-content-panel-left">
                    <div class="value-title">{{ $t('About_title_3') }}</div>
                    <div class="value-block">
                        <b-button @click="setShow(1)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_4') }} </span>
                            <img class="icon-arrow" :src="vl_1 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_1">
                            <div class="value-text">
                                {{ $t('About_sub_1') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(2)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_5') }} </span>
                            <img class="icon-arrow" :src="vl_2 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_2">
                            <div class="value-text">
                                {{ $t('About_sub_2') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(3)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_6') }} </span>
                            <img class="icon-arrow" :src="vl_3 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_3">
                            <div class="value-text">
                                {{ $t('About_sub_3') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(4)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_7') }} </span>
                            <img class="icon-arrow" :src="vl_4 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_4">
                            <div class="value-text">
                                {{ $t('About_sub_4') }}
                            </div>
                        </b-collapse>
                    </div>
                    <div class="value-block">
                        <b-button @click="setShow(5)" class="btn-value d-flex w-100 align-items-center">
                            <img class="icon-btn" src="/images/avalue.png"></img>
                            <span class="icon-text w-100 text-left"> {{ $t('About_title_8') }} </span>
                            <img class="icon-arrow" :src="vl_5 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                        </b-button>
                        <b-collapse v-model="vl_5">
                            <div class="value-text">
                                {{ $t('About_sub_5') }}
                            </div>
                        </b-collapse>
                    </div>
                </b-col>
                <b-col cols="6" class="value-content-panel-right">
                    <img class="value-img w-100" src="/images/about-gt.jpg"></img>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
// import { mapGetters, mapActions } from "vuex"
// import ProductItem from "~/components/productItem.vue"

export default {
    // components: {
    //   ProductItem
    // },
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            vl_1: false,
            vl_2: false,
            vl_3: false,
            vl_4: false,
            vl_5: false
        }
    },
    // computed: {
    //   ...mapGetters({
    //     listBanned: "common/getBanner"
    //   }),
    // },
    // components: {
    //   Video
    // },
    // async mounted() {
    //   this.isPlay = false
    //   this.isMobile = this.checkMobile()
    //   await this.getBanner()
    //   this.slide1 = this.$refs.slide1
    //   this.render(0)
    //   this.autoShowPlay()
    // },
    methods: {
        setShow(_num) {
            switch (_num) {
                case 1:
                    this.vl_1 = !this.vl_1 
                    this.vl_2 = false
                    this.vl_3 = false
                    this.vl_4 = false
                    this.vl_5 = false
                    break;
                case 2:
                    this.vl_1 = false
                    this.vl_2 = !this.vl_2
                    this.vl_3 = false
                    this.vl_4 = false
                    this.vl_5 = false
                    break;
                case 3:
                    this.vl_1 = false
                    this.vl_2 = false
                    this.vl_3 = !this.vl_3
                    this.vl_4 = false
                    this.vl_5 = false
                    break;
                case 4:
                    this.vl_1 = false
                    this.vl_2 = false
                    this.vl_3 = false
                    this.vl_4 = !this.vl_4
                    this.vl_5 = false
                    break;
                case 5:
                    this.vl_1 = false
                    this.vl_2 = false
                    this.vl_3 = false
                    this.vl_4 = false
                    this.vl_5 = !this.vl_5
                    break;
                default:
                    break;
            }
        },
        onSlideEnd(slide) {
            this.sliding = false
        }
    }
}
</script>
<style lang="scss">
.value-content {
    background-color: #f593a533;
    padding-top: 140px;
    padding-bottom: 140px;
}

.value-content-panel-left {
    padding-right: 50px !important;
}

.value-content-panel-right {
    padding-left: 50px !important;
}

.value-title {
    font-weight: 400;
    font-size: 36px;
    line-height: 40px;
    color: #484848;
    margin-bottom: 56px;
}

.btn-value {
    background-color: transparent !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    margin-bottom: 15px;
    border-radius: 0px !important;
    padding-bottom: 16px;

    &:focus {
        box-shadow: none !important;
    }
}

.icon-btn {
    width: 45px;
    margin-right: 30px;
}

.icon-text {
    font-weight: 400;
    font-size: 22px;
    line-height: 45px;
    color: #2F3036;
    text-transform: uppercase;
}

.icon-arrow {
    width: 35px;
}

.value-block {
    margin-bottom: 10px;
}

.value-text{
    font-family: 'inter-light';
}

.value-img{
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px 0px rgba(13, 13, 13, 0.31);
}

@media (max-width: 520px) {
    .value-content {
        padding-top: 20px;
        padding-bottom: 70px;
    }

    .value-title {
        font-size: 20px;
        margin-bottom: 0px;
    }

    .value-block {
        margin-bottom: 0px;
    }

    .btn-value {
        margin-bottom: 5px;
        padding: 0px;
    }

    .icon-btn {
        width: 18px;
        margin-right: 5px;
    }

    .icon-text {
        font-size: 10px;
        line-height: 30px;
    }

    .icon-arrow {
        width: 15px;
    }

    .value-text {
        font-size: 10px;
    }

    .value-img {
        padding-top: 50px;
    }
}</style>
    