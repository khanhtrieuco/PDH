<template>
    <div class="detail-show">
        <div class="detail-show-image">
            <ThumbImage ratio="16-9" :src="'/images/show-banner.jpg'" v-if="!isMobile"></ThumbImage>
            <ThumbImage ratio="9-21" :src="'/images/show-banner.jpg'" v-if="isMobile"></ThumbImage>
            <div class="detail-show-info">
                <h1 class="detail-show-title">MILAN</br> FASHION WEEK 2023</h1>
                <div class="detail-show-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nulla urna,
                    rutrum ut est quis, imperdiet auctor ipsum.</div>
            </div>
        </div>
        <div class="detail-show-content" v-if="!isMobile">
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
        <div class="container detail-show-content" v-if="isMobile">
            <div class="detail-show-data">
                <div class="detail-show-data-title">MILAN</br> FASHION WEEK 2023</div>
                <div class="detail-show-data-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <img class="detail-show-content-img-data" src="/images/show2.jpg" />
                <div class="detail-show-data-sub">I am so happy to be back in New York. We showed the Dante collection
                    here in 1996, and then came again with Eye in the autumn of 1999.</div>
            </div>
            <img class="detail-show-content-img" src="/images/show1.jpg" />
            <img class="detail-show-content-img" src="/images/show3.jpg" />
            <img class="detail-show-content-img" src="/images/show4.jpg" />
        </div>
        <div class="detail-show-video">
            <img class="detail-show-img-video" src="/images/PDH.png" />
            <video id="videoRef-id" ref="videoRef" preload="auto" class="detail-show-video-inner" @click="onStopVideo">
                <source :src="'/uploads/Untitled_5f724864c9.webm'" type="video/mp4" />
            </video>
            <img class="detail-show-img-play" src="/images/play.png" @click="onPlayVideo" />
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
        onPlayVideo() {
            console.log(this.$refs.videoRef)
            var elem = document.getElementById("videoRef-id");
            if (this.$refs && this.$refs.videoRef) {
                this.$refs.videoRef.play()
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
        },
        onStopVideo() {
            if (this.$refs && this.$refs.videoRef) {
                this.$refs.videoRef.play()
                document.exitFullscreen();
                setTimeout(() => {
                    var elem = document.getElementById("videoRef-id");
                    elem.scrollIntoView();
                }, 50)
            }
        }
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
                line-height: 36px;
                margin-bottom: 16px;
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

    .detail-show-video {
        position: relative;

        .detail-show-img-video {
            width: 100%;
            margin: 100px 0px;
            position: relative;
            z-index: 2;
        }

        .detail-show-video-inner {
            position: absolute;
            top: 10%;
            left: 50%;
            z-index: 1;
            width: 100%;
            transform: translate(-50%);
        }

        .detail-show-img-play {
            position: absolute;
            width: 70px;
            transform: translate(calc(-50% + 30px), calc(-50% - 20px));
            left: 50%;
            top: 50%;
            z-index: 2;
            cursor: pointer;
        }
    }

}

@media (max-width: 520px) {
    .detail-show {
        .detail-show-image {
            position: relative;

            .detail-show-info {
                position: absolute;
                bottom: 150px;
                left: 15px;

                .detail-show-title {
                    color: #FFF;
                    font-family: 'Aeroport';
                    font-size: 25px;
                    text-transform: uppercase;
                }

                .detail-show-des {
                    color: #FFF;
                    font-family: 'Aeroport-light';
                    font-size: 12px;
                    width: 250px;
                }
            }
        }

        .detail-show-content {
            .detail-show-content-img {
                width: 100%;
                margin-top: 15px;
            }

            .detail-show-data {
                margin-top: 30px;
                margin-bottom: 0px;
                width: 100%;
                text-align: center;

                .detail-show-data-title {
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 20px;
                    margin-bottom: 10px;
                }

                .detail-show-data-des {
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    margin-bottom: 10px;
                    font-size: 10px;
                }

                .detail-show-content-img-data {
                    width: 250px;
                    margin-bottom: 10px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .detail-show-data-sub {
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                    width: 100%;
                    margin: auto;
                }
            }
        }

        .detail-show-video {
            position: relative;

            .detail-show-img-video {
                width: 100%;
                margin: 100px 0px;
                position: relative;
                z-index: 2;
            }

            .detail-show-video-inner {
                position: absolute;
                top: 27%;
                left: 50%;
                z-index: 1;
                width: 100%;
                transform: translate(-50%);
            }

            .detail-show-img-play {
                position: absolute;
                width: 30px;
                transform: translate(calc(-50% + 5px), calc(-50% - 0px));
                left: 50%;
                top: 50%;
                z-index: 2;
                cursor: pointer;
            }
        }
    }
}
</style>