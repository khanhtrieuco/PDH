<template>
    <div class="detail-show">
        <div class="detail-show-image">
            <ThumbImage ratio="16-9" :src="'/images/show-banner.jpg'"></ThumbImage>
            <div class="detail-show-info">
                <h1 class="detail-show-title">MILAN</br> FASHION WEEK 2023</h1>
                <div class="detail-show-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nulla urna,
                    rutrum ut est quis, imperdiet auctor ipsum.</div>
            </div>
        </div>
        <div class="detail-show-content">
            <div class="d-flex align-items-center">
                <img class="detail-show-content-img" src="/images/show1.jpg" />
                <div class="detail-show-data">
                    <div class="detail-show-data-title">MILAN</br> FASHION WEEK 2023</div>
                    <div class="detail-show-data-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    <img class="detail-show-content-img-data" src="/images/show2.jpg" />
                    <div class="detail-show-data-sub">I am so happy to be back in New York. We showed the Dante collection
                        here in 1996, and then came again with Eye in the autumn of 1999.</div>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <div class="detail-show-data">
                    <img class="detail-show-content-img-data" src="/images/show4.jpg" />
                </div>
                <img class="detail-show-content-img" src="/images/show3.jpg" />
            </div>
        </div>
        <div class="detail-show-video">
            <img class="detail-show-img-video" src="/images/video.jpg" />
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    mixins: [general],
    data() {
        return {
            isMobile: false
        }
    },
    // computed: {
    //     ...mapGetters({
    //         club: "club/getClub"
    //     }),
    // },
    // watch: {
    //     '$i18n.locale': function (val) {
    //         if (val) {
    //             this.breadcrumb = [
    //                 {
    //                     text: this.$t('Home'),
    //                     href: '/'
    //                 },
    //                 {
    //                     text: 'Aura Club',
    //                     href: '/aura-club'
    //                 },
    //                 {
    //                     text: this.$i18n.locale === 'vn' ? this.club?.attributes?.title : this.club?.attributes?.title_en,
    //                     active: true
    //                 }
    //             ]
    //         }
    //     },
    // },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        // await this.loadData()
    },
    methods: {
        // ...mapActions({
        //     getClubBySlug: "club/getClubBySlug"
        // }),
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        // async loadData() {
        //     if (this.$route.params.id) {
        //         await this.getClubBySlug(this.$route.params.id)
        //         this.breadcrumb[2].text = this.$i18n.locale === 'vn' ? this.club?.attributes?.title : this.club?.attributes?.title_en
        //     }
        // }
    }
}
</script>
<style lang="scss">
.detail-show {
    .detail-show-image {
        position: relative;

        .detail-show-info {
            position: absolute;
            bottom: 250px;
            left: 240px;

            .detail-show-title {
                color: #FFF;
                font-family: 'Aeroport';
                font-size: 35px;
                text-transform: uppercase;
            }

            .detail-show-des {
                color: #FFF;
                font-family: 'Aeroport-light';
                font-size: 18px;
                width: 380px;
            }
        }
    }

    .detail-show-content {
        .detail-show-content-img {
            width: 50%;
        }

        .detail-show-data {
            width: 50%;
            text-align: center;

            .detail-show-data-title {
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 35px;
            }

            .detail-show-data-des {
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 16px;
            }

            .detail-show-content-img-data {
                width: 380px;
                margin: 10px 0px;
            }

            .detail-show-data-sub {
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 16px;
                width: 400px;
                margin: auto;
            }
        }
    }

    .detail-show-img-video{
        width: 100%;
        margin: 100px 0px;
    }
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.detail-club-img {
    max-height: 600px;
    object-fit: cover;
}

.detail-left-info {
    width: 660px;
}

.detail-right-info {
    width: 660px;
    padding-left: 10px;
}

.detail-club-title {
    color: #2F3036;
    font-size: 36px;
    margin-top: 40px;
}

.club-social-panel {
    margin-top: 20px;

    .club-social-icon {
        margin-right: 10px;
    }
}

.detail-club-des {
    color: #9C9C9C;
    font-size: 16px;
    font-family: 'inter-light';
    margin-top: 20px;
    text-transform: uppercase;
    padding-right: 10px;
}

.detail-club-text {
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter-light';
    margin-top: 40px;

    img {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media (max-width: 520px) {
    .detail-club-content {
        margin-top: 50px;
    }

    .detail-club-category {
        color: #777;
        font-size: 10px;
        font-family: 'inter';
        text-transform: uppercase;
        margin-top: 20px;
    }

    .detail-club-title {
        color: #2F3036;
        font-size: 20px;
        margin-top: 16px;
    }

    .detail-club-des {
        text-transform: uppercase;
        font-family: 'inter-light';
        margin-top: 16px;
        color: #2F3036;
        font-size: 10px;
    }

    .detail-club-text {
        color: #2F3036;
        font-size: 10px;
        font-family: 'inter-light';
        margin-top: 20px;

        img {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .club-social-panel {
        margin-top: 10px;

        .club-social-icon {
            margin-right: 10px;
            width: 20px;
        }
    }
}
</style>