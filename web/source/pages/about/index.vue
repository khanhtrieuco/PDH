<template>
    <div class="about-content">
        <div class="about-banner">
            <div class="about-banner-top">
                <img class="w-100" src="/images/about-crop.jpeg" v-if="!isMobile" />
                <!-- <img class="w-100" src="/images/about.jpg" v-if="!isMobile" /> -->
                <img class="about-banner-image" src="/images/about-top-m.jpg" v-if="isMobile" />
                <div class="about-banner-content">
                    <div class="about-title">ABOUT P.D.H</div>
                    <img class="about-name-img" src="/images/about-name.png" />
                    <div class="about-des">A VIETNAMESE CHILD ARTIST HAS DECIDED PASS INTO THE WORLD OF FASHION AND CREATE
                        THE
                        NAME BRANCH. INCREDIBLE FROM HIS CHILDHOOD Memories, HOANG HAS CREATED PRODUCTS THAT REPEAT THE
                        TRADITIONAL VALUES OF THE COUNTRY OF THE COUNTRIES BRING CONtemporaries. HE LOVES EXPERIENCE WITH
                        USE OF
                        TECHNOLOGY IN THE FASHION WORLD AND HAS A WISH TO BECOME A POINT OF RESPONSE FOR THE NEW GENERATION
                        IN
                        THIS INDUSTRY.
                    </div>
                </div>
            </div>
        </div>
        <img class="w-100" src="/images/about-top.jpg" v-if="!isMobile" />
        <img class="w-100" src="/images/about-top-mobile.jpg" v-if="isMobile" />
        <div class="about-info">
            <div class="about-achievement">achievement</div>
            <div class="about-text">First Vietnamese member - of the Asian Couture Federation, 2014</div>
            <div class="about-text">Winner - Designer of the Year by Sport and Culture Magazine in 2014, 2013, 2012, 2011
            </div>
            <div class="about-text">Winner - Designer of the Year by Beauty Magazine in 2013, 2011, 2005, 2004, 2003</div>
            <div class="about-text">2nd Prize - “Sublimation of Land and Water” Collection in 2011 by Singapore Fashion
                Connection</div>
            <div class="about-text">Winner - Asia Collection Makihari in Japan in 2000 by Bay FM</div>
            <div class="about-text">Winner - Vietnam Collection Grand Prix, Green Leaves Collection in 2000 London Fashion
                Week</div>
        </div>
        <div class="about-mid">
            <img class="w-100" src="/images/about-mid.jpg" v-if="!isMobile" />
            <img class="w-100" src="/images/about-mid-mobile.jpg" v-if="isMobile" />
            <div class="about-mid-content">
                <div class="about-mid-des">
                    From one-off pieces created by independent designers using Gucci materials, to the House's archived
                    pieces that have been restored by its artisans, Vault is a treasure trove of unique objects representing
                    beauty, dreams, passions, and above all, the search for ideas beyond the confines of time and space.
                </div>
            </div>
        </div>
        <div class="container about-list">
            <div class="about-item">
                <div class="about-item-img">
                    <img v-if="tab === 1" src="/images/about1.jpg" />
                    <img v-if="tab === 2" src="/images/about2.jpg" />
                    <img v-if="tab === 3" src="/images/about3.jpg" />
                    <div class="about-item-dot about-item-dot1">
                        <div></div>
                    </div>
                    <div class="about-item-dot about-item-dot2">
                        <div></div>
                    </div>
                    <div class="about-item-dot about-item-dot3">
                        <div></div>
                    </div>
                    <div class="about-item-dot about-item-dot4">
                        <div></div>
                    </div>
                </div>
                <!-- <transition :duration="{ enter: 500, leave: 100 }" name="slide-fade"> -->
                <div v-if="tab === 1" class="about-item-content">
                    <div class="about-item-content-title">LOREM IPSUM DOLOR SIT AMET LA</div>
                    <div class="about-item-content-des">I am so happy to be back in New York. We showed the Dante
                        collection here in 1996, and then came again with Eye in the autumn of 1999.</div>
                    <div class="about-item-tab">
                        <div @click="tab = 1"
                            :class="`about-item-tab-choice ${tab === 1 ? 'about-item-tab-choice-active' : ''}`"></div>
                        <div @click="tab = 2"
                            :class="`about-item-tab-choice ${tab === 2 ? 'about-item-tab-choice-active' : ''}`"></div>
                        <div @click="tab = 3"
                            :class="`about-item-tab-choice ${tab === 3 ? 'about-item-tab-choice-active' : ''}`"></div>
                    </div>
                </div>
                <!-- </transition> -->
                <!-- <transition :duration="{ enter: 500, leave: 100 }" name="slide-fade"> -->
                <div v-if="tab === 2" class="about-item-content">
                    <div class="about-item-content-title">LOREM IPSUM DOLOR SIT AMET LA</div>
                    <div class="about-item-content-des">I am so happy to be back in New York. We showed the Dante
                        collection here in 1996, and then came again with Eye in the autumn of 1999.</div>
                    <div class="about-item-tab">
                        <div @click="tab = 1"
                            :class="`about-item-tab-choice ${tab === 1 ? 'about-item-tab-choice-active' : ''}`"></div>
                        <div @click="tab = 2"
                            :class="`about-item-tab-choice ${tab === 2 ? 'about-item-tab-choice-active' : ''}`"></div>
                        <div @click="tab = 3"
                            :class="`about-item-tab-choice ${tab === 3 ? 'about-item-tab-choice-active' : ''}`"></div>
                    </div>
                </div>
                <!-- </transition> -->
                <!-- <transition :duration="{ enter: 500, leave: 100 }" name="slide-fade"> -->
                <div v-if="tab === 3" class="about-item-content">
                    <div class="about-item-content-title">LOREM IPSUM DOLOR SIT AMET LA</div>
                    <div class="about-item-content-des">I am so happy to be back in New York. We showed the Dante
                        collection here in 1996, and then came again with Eye in the autumn of 1999.</div>
                    <div class="about-item-tab">
                        <div @click="tab = 1"
                            :class="`about-item-tab-choice ${tab === 1 ? 'about-item-tab-choice-active' : ''}`"></div>
                        <div @click="tab = 2"
                            :class="`about-item-tab-choice ${tab === 2 ? 'about-item-tab-choice-active' : ''}`"></div>
                        <div @click="tab = 3"
                            :class="`about-item-tab-choice ${tab === 3 ? 'about-item-tab-choice-active' : ''}`"></div>
                    </div>
                </div>
                <!-- </transition> -->

            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
export default {
    name: 'AboutPage',
    computed: {
        ...mapGetters({
            siteInfo: "common/getSiteinfo"
        }),
    },
    data() {
        return {
            isMobile: false,
            tab: 1
        }
    },
    // watch: {
    //     '$i18n.locale': function (val) {
    //         if (val) {
    //             this.breadcrumb = [
    //                 {
    //                     text: this.$t('Home'),
    //                     href: '/'
    //                 },
    //                 {
    //                     text: this.$t('About'),
    //                     active: true
    //                 }
    //             ]
    //         }
    //     },
    // },
    async mounted() {
        if (!this.$route.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.isMobile = this.checkMobile()
        // setInterval(() => {
        //     this.tab = this.tab + 1
        //     if (this.tab >= 4) {
        //         this.tab = 1
        //     }
        // }, 5000)
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
    .about-banner {
        position: relative;
        height: 100vh;
        background-color: #000;
        align-items: center;
        justify-content: center;

        .about-banner-top {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }

        .about-banner-content {
            position: absolute;
            top: 50%;
            text-align: center;
            left: 50%;
            transform: translate(-50%, -50%);

            .about-title {
                color: #FFF;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 15px;
            }

            .about-name-img {
                width: 750px;
                margin: 40px 0px;
            }

            .about-des {
                color: #FFF;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 16px;
                text-transform: uppercase;
                width: 670px;
                margin: auto;
            }
        }
    }

    .about-info {
        text-align: center;
        padding: 60px 0px;

        .about-achievement {
            margin-bottom: 30px;
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .about-text {
            color: #000;
            text-align: center;
            font-family: 'Aeroport-light';
            font-size: 15px;
            line-height: 30px;
            font-weight: 200;
        }
    }

    .about-mid {
        position: relative;

        .about-mid-content {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            display: flex;
            align-items: center;
            text-align: center;

            .about-mid-des {
                color: #FFF;
                text-align: center;
                font-family: 'Aeroport';
                text-transform: uppercase;
                font-size: 26px;
                width: 750px;
                margin: auto;
            }
        }
    }

    .about-list {
        padding: 100px 0px;
        min-height: 1000px;
        background-color: #FFF;

        .about-item {
            display: flex;
            align-items: center;

            .about-item-img {
                position: relative;
                width: 50%;
                border: 1px solid #000;
                padding: 6px;

                img {
                    width: 100%;
                }

                .about-item-dot {
                    width: 16px;
                    height: 12px;
                    border-radius: 50%;
                    position: absolute;
                    background-color: #fff;
                    padding: 4px;

                    div {
                        width: 8px;
                        height: 6px;
                        border-radius: 50%;
                        background-color: #000;
                    }
                }

                .about-item-dot1 {
                    left: -8px;
                    top: -7px;
                }

                .about-item-dot2 {
                    right: -8px;
                    top: -7px;
                }

                .about-item-dot3 {
                    left: -8px;
                    bottom: -4px;
                }

                .about-item-dot4 {
                    right: -8px;
                    bottom: -4px;
                }
            }

            .about-item-content {
                text-align: center;
                width: 400px;
                margin: auto;
                position: relative;

                .about-item-content-title {
                    color: #000;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 35px;
                    margin-bottom: 30px;
                }

                .about-item-content-des {
                    color: #5A5552;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                }

                .about-item-tab {
                    display: flex;
                    position: absolute;
                    bottom: -325px;
                    left: 50%;
                    transform: translate(-50%);

                    .about-item-tab-choice {
                        width: 100px;
                        height: 3px;
                        border-top: 3px solid #E3DEDA;
                        cursor: pointer;
                    }

                    .about-item-tab-choice-active {
                        border-top: 3px solid #000;
                    }
                }
            }


        }

    }
}
@media (max-width: 820px) {
    .about-content {
        .about-banner {
            position: relative;

            .about-banner-image {
                height: 100vh;
                width: 100%;
            }

            .about-banner-content {
                position: absolute;
                top: 30%;
                text-align: center;
                left: 50%;
                transform: translate(-50%);

                .about-title {
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 10px;
                }

                .about-name-img {
                    width: 100%;
                    margin: 40px 0px;
                }

                .about-des {
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                    text-transform: uppercase;
                    width: 280px;
                    margin: auto;
                    line-height: 18px;
                    margin-top: 40px;
                }
            }
        }

        .about-info {
            text-align: center;
            padding: 60px 0px;

            .about-achievement {
                margin-bottom: 30px;
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .about-text {
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 10px;
                line-height: 30px;
                font-weight: 200;
                width: 275px;
                margin: auto;
            }
        }

        .about-mid {
            position: relative;

            .about-mid-content {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                display: flex;
                align-items: center;
                text-align: center;

                .about-mid-des {
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport';
                    text-transform: uppercase;
                    font-size: 12px;
                    width: 280px;
                    margin: auto;
                }
            }
        }

        .about-list {
            padding: 60px 0px;
            min-height: 700px;

            .about-item {
                display: block;

                .about-item-img {
                    position: relative;
                    width: 310px;
                    margin: auto;
                    border: 1px solid #000;
                    padding: 6px;

                    img {
                        width: 100%;
                    }

                    .about-item-dot {
                        width: 16px;
                        height: 12px;
                        border-radius: 50%;
                        position: absolute;
                        background-color: #fff;
                        padding: 4px;

                        div {
                            width: 8px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: #000;
                        }
                    }

                    .about-item-dot1 {
                        left: -8px;
                        top: -7px;
                    }

                    .about-item-dot2 {
                        right: -8px;
                        top: -7px;
                    }

                    .about-item-dot3 {
                        left: -8px;
                        bottom: -4px;
                    }

                    .about-item-dot4 {
                        right: -8px;
                        bottom: -4px;
                    }
                }

                .about-item-content {
                    text-align: center;
                    width: 310px;
                    margin: auto;
                    position: relative;

                    .about-item-content-title {
                        color: #000;
                        text-align: center;
                        font-family: 'Aeroport';
                        font-size: 17px;
                        margin-bottom: 30px;
                        margin-top: 40px;
                        width: 180px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .about-item-content-des {
                        color: #5A5552;
                        text-align: center;
                        font-family: 'Aeroport-light';
                        font-size: 10px;
                        width: 250px;
                        margin: auto;
                    }

                    .about-item-tab {
                        display: flex;
                        position: absolute;
                        bottom: -50px;
                        left: 50%;
                        transform: translate(-50%);

                        .about-item-tab-choice {
                            width: 60px;
                            height: 3px;
                            border-top: 3px solid #E3DEDA;
                            cursor: pointer;
                        }

                        .about-item-tab-choice-active {
                            border-top: 3px solid #000;
                        }
                    }
                }


            }

        }
    }
}
@media (max-width: 520px) {
    .about-content {
        .about-banner {
            position: relative;

            .about-banner-image {
                height: 100vh;
                width: 100%;
            }

            .about-banner-content {
                position: absolute;
                top: 30%;
                text-align: center;
                left: 50%;
                transform: translate(-50%);

                .about-title {
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport';
                    font-size: 10px;
                }

                .about-name-img {
                    width: 100%;
                    margin: 40px 0px;
                }

                .about-des {
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                    text-transform: uppercase;
                    width: 280px;
                    margin: auto;
                    line-height: 18px;
                    margin-top: 40px;
                }
            }
        }

        .about-info {
            text-align: center;
            padding: 60px 0px;

            .about-achievement {
                margin-bottom: 30px;
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .about-text {
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 10px;
                line-height: 30px;
                font-weight: 200;
                width: 275px;
                margin: auto;
            }
        }

        .about-mid {
            position: relative;

            .about-mid-content {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                display: flex;
                align-items: center;
                text-align: center;

                .about-mid-des {
                    color: #FFF;
                    text-align: center;
                    font-family: 'Aeroport';
                    text-transform: uppercase;
                    font-size: 12px;
                    width: 280px;
                    margin: auto;
                }
            }
        }

        .about-list {
            padding: 60px 0px;
            min-height: 700px;

            .about-item {
                display: block;

                .about-item-img {
                    position: relative;
                    width: 310px;
                    margin: auto;
                    border: 1px solid #000;
                    padding: 6px;

                    img {
                        width: 100%;
                    }

                    .about-item-dot {
                        width: 16px;
                        height: 12px;
                        border-radius: 50%;
                        position: absolute;
                        background-color: #fff;
                        padding: 4px;

                        div {
                            width: 8px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: #000;
                        }
                    }

                    .about-item-dot1 {
                        left: -8px;
                        top: -7px;
                    }

                    .about-item-dot2 {
                        right: -8px;
                        top: -7px;
                    }

                    .about-item-dot3 {
                        left: -8px;
                        bottom: -4px;
                    }

                    .about-item-dot4 {
                        right: -8px;
                        bottom: -4px;
                    }
                }

                .about-item-content {
                    text-align: center;
                    width: 310px;
                    margin: auto;
                    position: relative;

                    .about-item-content-title {
                        color: #000;
                        text-align: center;
                        font-family: 'Aeroport';
                        font-size: 17px;
                        margin-bottom: 30px;
                        margin-top: 40px;
                        width: 180px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .about-item-content-des {
                        color: #5A5552;
                        text-align: center;
                        font-family: 'Aeroport-light';
                        font-size: 10px;
                        width: 250px;
                        margin: auto;
                    }

                    .about-item-tab {
                        display: flex;
                        position: absolute;
                        bottom: -50px;
                        left: 50%;
                        transform: translate(-50%);

                        .about-item-tab-choice {
                            width: 60px;
                            height: 3px;
                            border-top: 3px solid #E3DEDA;
                            cursor: pointer;
                        }

                        .about-item-tab-choice-active {
                            border-top: 3px solid #000;
                        }
                    }
                }


            }

        }
    }
}
</style>