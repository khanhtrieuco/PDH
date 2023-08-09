<template>
    <div class="about-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="about-banner">
            <img v-if="isMobile" class="w-100" src="/images/abanner_mobile.jpg"></img>
            <img v-else class="w-100" src="/images/about-banner.jpg"></img>
        </div>
        <b-container class="about-description">
            <b-row>
                <b-col cols="6" style="padding-right: 20px;">
                    <div class="about-title">{{ $t('About_main_text') }}</div>
                    <img class="des-img" src="/images/about-bg.png"></img>
                </b-col>
                <b-col cols="6" style="padding: 0px;">
                    <div class="about-text">{{ $t('About_des_1') }}</div>
                    <div class="about-text">{{ $t('About_des_2') }}</div>
                    <div class="about-text">{{ $t('About_des_3') }}</div>
                </b-col>
            </b-row>
        </b-container>
        <!-- <Founder :isMobile="isMobile" :ceo1="siteInfo?.ceo1" :ceo2="siteInfo?.ceo2" />
        <Mission :isMobile="isMobile" />
        <BValue :isMobile="isMobile" />
        <Aura :isMobile="isMobile" />
        <Blog :isMobile="isMobile" /> -->
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
// import Mission from "~/components/about/mission.vue"
// import Founder from "~/components/about/founder.vue"
// import BValue from "~/components/about/bvalue.vue"
// import Aura from "~/components/home/aura.vue"
// import Blog from "~/components/home/blog.vue"
export default {
    name: 'AboutPage',
    // components: {
    //     Mission,
    //     Founder,
    //     BValue,
    //     Aura,
    //     Blog
    // },
    computed: {
      ...mapGetters({
        siteInfo: "common/getSiteinfo"
      }),
    },
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$t('About'),
                    active: true
                }
            ],
            isMobile: false
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('About'),
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        if (!this.$route.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.isMobile = this.checkMobile()
    },
    methods: {
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
    // methods: {
    //   ...mapActions({
    //     getListWork: "work/getListWork"
    //   }),
    //   async loadData() {
    //     await this.getListWork()
    //     console.log(this.listWork)
    //   }
    // }
}
</script>
<style lang="scss">
.about-content {
    margin-top: 180px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.about-description {
    margin-top: 68px;
    margin-bottom: 80px;
}

.about-title {
    font-size: 36px;
    font-weight: 400;
    line-height: 40px;
    color: #2F3036;
    z-index: 1;
    position: relative;
}

.about-text {
    font-size: 22px;
    font-weight: 300;
    line-height: 29px;
    color: #2F3036;
    margin-bottom: 16px;
    font-family: 'bodrum-light';
}

.des-img {
    position: relative;
    margin-right: 0px;
    width: calc(100% + 50px);
    margin-top: -65px;
    float: right;
}

@media (max-width: 520px) {
    .about-content {
        margin-top: 0px;
    }

    .about-title {
        font-size: 13px;
        line-height: 15px;
    }

    .about-text {
        font-size: 10px;
        line-height: 13px;
    }

    .des-img {
        margin-top: 40px;
    }
}
</style>