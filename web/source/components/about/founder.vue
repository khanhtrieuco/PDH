<template>
    <div>
        <div style="position: relative;">
            <img class="founder-img w-100" src="/images/founder.jpg" v-if="!isMobile" />
            <img class="founder-img w-100" src="/images/founderm.jpg" v-if="isMobile" />
            <div class="ceo-1">
                <div class="ceo-name">{{ ceo1 }}</div>
                <div class="ceo-role">CEO</div>
            </div>
            <div class="ceo-2">
                <div class="ceo-name">{{ ceo2 }}</div>
                <div class="ceo-role">CMO</div>
            </div>
        </div>
        <b-container class="founder-content">
            <b-row v-if="!isMobile">
                <b-col cols="4">
                    <h3 class="founder-title">Nhà sáng lập của PDH</h3>
                    <div class="founder-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                    </div>
                </b-col>
                <b-col cols="4" class="pt-4">
                    <div class="founder-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap
                        into
                        electronic typesetting, remaining essentially unchanged.</div>
                </b-col>
                <b-col cols="4" class="pt-4">
                    <div class="founder-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap
                        into
                        electronic typesetting, remaining essentially unchanged.</div>
                </b-col>
            </b-row>
            <b-row v-if="isMobile">
                <b-col cols="6">
                    <h3 class="founder-title">Nhà sáng lập của PDH</h3>
                    <div class="founder-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                    </div>
                    <div class="founder-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap
                        into
                        electronic typesetting, remaining essentially unchanged.</div>
                </b-col>
                <b-col cols="6" class="pt-4">
                    <div class="founder-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap
                        into
                        electronic typesetting, remaining essentially unchanged.</div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>

export default {
    // components: {
    //   ProductItem
    // },
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
        ceo1: {
            type: String,
            default: 'Trần Thị Thanh Nhàn'
        },
        ceo2: {
            type: String,
            default: 'Phan Kim Sơn'
        }
    },
    data() {
        return {
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
    // methods: {
    //   onSlideStart(slide) {
    //     this.sliding = true
    //   },
    //   onSlideEnd(slide) {
    //     this.sliding = false
    //   }
    // }
}
</script>
<style lang="scss">
.founder-content {
    margin-top: 70px;
    margin-bottom: 150px;
}

.founder-title {
    font-weight: 400;
    font-size: 36px;
    color: #2F3036;
    margin-bottom: 40px;
}

.founder-des {
    font-weight: 400;
    font-family: 'inter-light';
    font-size: 13px;
    color: #515151;
}

.ceo-1 {
    position: absolute;
    top: 25%;
    left: 17%;
    border-top: 1px solid #515151;
    padding-top: 5px;
}

.ceo-2 {
    position: absolute;
    top: 25%;
    right: 40%;
    border-top: 1px solid #515151;
    padding-top: 5px;
}

.ceo-name {
    font-size: 16px;
    font-weight: bolder;
}

.ceo-role {
    font-size: 13px;
}

@media (max-width: 520px) {
    .founder-content {
        margin-bottom: 70px;
    }

    .founder-title {
        font-size: 13px;
        margin-bottom: 16px;
    }

    .founder-des {
        font-size: 10px;
    }

    .ceo-1 {
        position: absolute;
        top: 50px;
        left: 30px;
        border-top: 0.5px solid #515151;
        padding-top: 3px;
    }

    .ceo-2 {
        position: absolute;
        top: 50px;
        right: 150px;
        border-top: 0.5px solid #515151;
        padding-top: 3px;
    }

    .ceo-name {
        font-size: 6px;
        font-weight: 600;

    }

    .ceo-role {
        font-size: 6px;
    }
}
</style>
    