<template>
    <div class="about-content">
        <div class="about-banner">
            <div class="about-banner-top">
                <img class="w-100" src="/images/about-crop.jpeg" v-if="!isMobile" />
                <img class="about-banner-image" src="/images/about-top-m.jpg" v-if="isMobile" />
                <div class="about-banner-content">
                    <!-- <div class="about-title">ABOUT P.D.H</div> -->
                    <img class="about-name-img" src="/images/about-name.png" />
                    <div class="about-des">PHAN DANG HOANG - a fashion brand founded by designer Phan Dang Hoang with
                        inspirations from painting, architecture and East and West cultural interference. The brand's
                        designs are boldly personal but always balance artistic concepts and high application. Phan Dang
                        Hoang wants to connect the past and the present, bringing fashion values that bring the voice of the
                        times, the breath of tradition, with durable materials and delicate treatments in every pattern.
                        Therefore, each customer who experiences the product will be clothed with a meaningful message and
                        find their aspirations through fashion so that they can speak for themselves.
                    </div>
                </div>
            </div>
        </div>
        <div>
            <img class="w-100" src="/images/about-top.jpg" v-if="!isMobile" />
            <img class="w-100" src="/images/about-top-mobile.jpg" v-if="isMobile" />
        </div>
        <VueSlickCarousel v-bind="settings" class="about-list-banner" :arrows="isMobile ? false : true">
            <div class="about-list-item">
                <div class="about-info">
                    <div class="about-achievement">achievement</div>
                    <div class="about-text-title">/2023/</div>
                    <div class="about-text">Attended MILANO Fashion Week Autumn | Winter 2022</div>
                    <div class="about-text">Top 21 promising emerging brands voted by VOGUE Italy</div>
                    <div class="about-text">Won - Promising Designer of the Year by SR Fashion Awards</div>
                    <div class="about-text">Participated in LIT exhibition and debuted the first show in Vietnam organized
                        by Sun Life Vietnam</div>
                </div>
            </div>
            <div class="about-list-item">
                <div class="about-info">
                    <div class="about-achievement">achievement</div>
                    <div class="about-text-title">/2022/</div>
                    <div class="about-text">Attended the AFRO Fashion Week Fall | Winter 2022 with a collection presented by
                        VOGUE Italy</div>
                    <div class="about-text">The first Vietnamese designer to officially attend the MILANO Fashion Week 2023
                        & launch his own brand "PHAN DANG HOANG"</div>
                    <div class="about-text">Became a representative alumni to participate in the interview of the series
                        “NABA Meets Alumni”</div>
                </div>
            </div>
            <div class="about-list-item">
                <div class="about-info">
                    <div class="about-achievement about-achievement-1">achievement</div>
                    <div class="about-text-title">/2021/</div>
                    <div class="about-text">TOP 30 BEST COLLECTION voted by fashion council for the PLANET DRESS show of
                        NABA University</div>
                    <div class="about-text">Opened the AFRO Fashion Week Spring | Summer 2022 and meet influential figures
                        in the fashion world: Anna Wintour, Naomi Campbell,...</div>
                    <div class="about-text"><b>/2018/</b> Won a scholarship to study abroad at NABA University (Milano,
                        Italy), fashion design major</div>
                    <div class="about-text"><b>/2016/</b> The first young Vietnamese artist to appear in 2 American art
                        magazines in 2016</div>
                    <div class="about-text"><b>/2015/</b> Participating in Lynk Show by Ly Nha Ky</div>
                </div>
            </div>
            <template slot="prevArrow">
                <div class="pre-arrow">
                    <img src="/images/left-a.svg" />
                </div>
            </template>
            <template slot="nextArrow">
                <div class="next-arrow">
                    <img src="/images/right-a.svg" />
                </div>
            </template>
        </VueSlickCarousel>
        <div class="about-mid">
            <img class="w-100" src="/images/about-mid.jpg" v-if="!isMobile" />
            <img class="w-100" src="/images/about-mid-mobile.jpg" v-if="isMobile" />
            <div class="about-mid-content">
                <div class="about-mid-des">
                    <p>Love for the simple and familiar things, childhood memories associated with the image of a
                        grandfather
                        painting, a mother with a sewing machine, and a grandmother knitting shirts have long become a part
                        of
                        forming the designer's personality.</p>

                    <p>Despite experiencing Western civilization, receiving modern technologies, and encountering
                        groundbreaking new images, the designer still chooses to embrace the beautiful memories of
                        childhood.
                        This choice is reflected in the creation of a brand identity with the concept of ""Fusion Fashion,""
                        inspired by the image of a familiar sewing machine from childhood—a needle threading stitches that
                        compose the soul of a shirt.</p>

                    <p>These elements serve as an extension of the customer's fashion experience with the Phan Dang Hoang
                        brand. It represents a new way of reception from a Gen Z designer who always seeks to incorporate a
                        simple part of childhood, preserving traditional values and bringing soul into fashion products.</p>
                </div>
            </div>
        </div>
        <!-- <div class="container about-list">
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
            </div>
        </div> -->
        <div class="about-vision-list">
            <div class="inside-slider ">
                <div class="slide-to-move">
                    <div class="slider-content">
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <Slider1 :position="position" :index="index" :check="index" />
                        <Slider2 :position="position" :index="index" :check="index" />
                        <Slider3 :position="position" :index="index" :check="index" />
                        <!-- <Slider1 :position="position" :index="index" :check="6" />
                        <Slider2 :position="position" :index="index" :check="7" />
                        <Slider3 :position="position" :index="index" :check="8" />
                        <Slider1 :position="position" :index="index" :check="9" />
                        <Slider2 :position="position" :index="index" :check="10" />
                        <Slider3 :position="position" :index="index" :check="11" />
                        <Slider1 :position="position" :index="index" :check="12" />
                        <Slider2 :position="position" :index="index" :check="13" />
                        <Slider3 :position="position" :index="index" :check="14" />
                        <Slider1 :position="position" :index="index" :check="15" />
                        <Slider2 :position="position" :index="index" :check="16" />
                        <Slider3 :position="position" :index="index" :check="17" />
                        <Slider1 :position="position" :index="index" :check="18" />
                        <Slider2 :position="position" :index="index" :check="19" />
                        <Slider3 :position="position" :index="index" :check="20" />
                        <Slider1 :position="position" :index="index" :check="21" />
                        <Slider2 :position="position" :index="index" :check="22" />
                        <Slider3 :position="position" :index="index" :check="23" /> -->
                    </div>
                </div>
                <div class="slide-hidder-left "></div>
                <div class="slider_nav in">
                    <img class="slider_nav_prev" src="/images/left-s.svg" @click="onPrev()" />
                    <img class="slider_nav_next" src="/images/right-s.svg" @click="onNext()" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import Slider1 from "./slide1.vue"
import Slider2 from "./slide2.vue"
import Slider3 from "./slide3.vue"

export default {
    name: 'AboutPage',
    components: {
        Slider1,
        Slider2,
        Slider3
    },
    computed: {
        ...mapGetters({
            siteInfo: "common/getSiteinfo"
        }),
    },
    data() {
        return {
            isMobile: false,
            tab: 1,
            settings: {
                "dots": true,
                "autoplay": false,
                "autoplaySpeed": 300000,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            },
            position: 1400,
            index: 12
        }
    },
    async mounted() {
        if (!this.$route.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.isMobile = this.checkMobile()

        let width = document.body.clientWidth
        if (width < 1600 && width > 1100) {
            this.position = 1200
        } else if (width < 1100) {
            this.position = 380
        }
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
        },
        onNext() {
            this.index = this.index + 1
            // if (this.index === 24) {
            //     this.index = 6
            // }
        },
        onPrev() {
            this.index = this.index - 1
            // if (this.index === -1) {
            //     this.index = 10
            // }
        }
    }
}
</script>
<style lang="scss">
.about-vision-list {
    background-color: #000;
    text-align: center;
    padding-top: 150px;
    padding-bottom: 20px;

    .inside-slider {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: auto;
        max-width: 1400px;
        overflow: hidden;
        position: relative;
        transition: all 1s;
        height: 980px;

        .slide-to-move {
            height: 100%;
            position: relative;
            width: 100%;

            .slider-content {
                display: flex;
                flex-direction: row;
                height: 100%;
                justify-content: space-between;
                width: 100%;

                .slide {
                    flex-shrink: 0;
                    height: 100%;
                    position: relative;
                    width: 100%;

                    .slide-word {
                        left: 50%;
                        opacity: 0;
                        position: absolute;
                        text-align: center;
                        transform: translateX(-50%);
                        z-index: 3;
                        color: #FFF;
                        font-family: "Aeroport";
                        font-size: 108px;
                        font-weight: 500;
                        line-height: 140%;
                        text-transform: uppercase;
                        top: 230px;
                    }

                    .slide-text-block {
                        width: 90%;
                        margin-left: 18px;
                        position: absolute;
                        top: 590px;
                        white-space: pre-wrap;
                        z-index: 3;
                        transform: translate(-50%);

                        .about-vision-text {
                            color: #fff;
                            text-align: center;
                            font-family: "Aeroport";
                            font-size: 16px;
                            font-weight: 700;
                            margin-top: 70px;
                            text-transform: uppercase;
                            width: 550px;
                            margin-left: auto;
                            margin-right: auto;
                        }

                        .about-vision-sub {
                            color: #fff;
                            font-family: "Aeroport-light";
                            font-size: 16px;
                            margin-top: 20px;
                            width: 700px;
                            margin-left: auto;
                            margin-right: auto;
                        }

                        .about-vison-list-content {
                            position: relative;
                            width: 100%;
                            margin-top: 20px;

                            .about-vison-content-item {
                                float: left;
                                margin-top: 20px;
                                padding-left: 50px;
                                padding-right: 50px;
                                width: calc(100% / 3 - 4px);

                                .about-vision-text {
                                    color: #fff;
                                    text-align: center;
                                    font-family: "Aeroport";
                                    font-size: 16px;
                                    font-weight: 700;
                                    margin-top: 20px;
                                    text-transform: uppercase;
                                    width: 100%;
                                    margin-left: auto;
                                    margin-right: auto;
                                }

                                .about-vision-sub-1 {
                                    color: #fff;
                                    font-family: "Aeroport-light";
                                    font-size: 14px;
                                    margin-top: 5px;
                                    width: 90%;
                                    margin-left: auto;
                                    margin-right: auto;
                                }
                            }

                        }
                    }

                    .slide-image-wrapper {
                        overflow: hidden;
                        position: relative;

                        .about-vision-img {
                            width: 80%;
                        }

                        .about-vision-img-mask {
                            width: 120%;
                            position: absolute;
                            top: calc(65%);
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }

                        .mask-out-next {
                            animation: maskOutNext 2s forwards;
                        }

                        .mask-in-next {
                            animation: maskInNext 2s forwards;
                        }
                    }
                }
            }
        }

        .slider_nav {
            .slider_nav_prev {
                position: absolute;
                left: 0;
                top: calc(50% - 180px);
                transform: translateY(-50%);
                cursor: pointer;
                z-index: 4;
            }

            .slider_nav_next {
                position: absolute;
                right: 0;
                top: calc(50% - 180px);
                transform: translateY(-50%);
                cursor: pointer;
                z-index: 4;
            }
        }
    }
}

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
            margin-bottom: 60px;
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .about-text-title {
            font-family: 'Aeroport-bold';
            color: #000;
            margin-bottom: 25px;
        }

        .about-text {
            color: #000;
            text-align: center;
            font-family: 'Aeroport-light';
            font-size: 15px;
            margin-bottom: 15px;
            font-weight: 200;

            b {
                font-family: 'Aeroport-bold';
            }
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
                font-size: 20px;
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
                padding: 10px;

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
                    line-height: 40px;
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

    .about-list-banner {
        margin-bottom: 80px;

        .slick-dots {
            bottom: 0px !important;
        }

        .slick-dots li button:before {
            color: #D9D9D9 !important;
            width: 10px !important;
            line-height: 10px !important;
            font-size: 10px !important;
        }

        .slick-dots li.slick-active button:before {
            color: #717171 !important;
        }

        .pre-arrow {
            margin-top: 20px;
            margin-left: 45px;
            z-index: 99;

            &:before {
                display: none;
            }

            img {
                width: auto;
            }
        }

        .next-arrow {
            margin-top: 20px;
            margin-right: 75px;

            &:before {
                display: none;
            }

            img {
                width: auto;
            }
        }
    }

}

@media (min-width: 1200px) and (max-width: 1600px) {
    .about-vision-list {
        background-color: #000;
        text-align: center;
        padding-top: 150px;
        padding-bottom: 20px;

        .inside-slider {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: auto;
            max-width: 1200px;
            overflow: hidden;
            position: relative;
            transition: all 1s;
            height: 810px;

            .slide-to-move {
                height: 100%;
                position: relative;
                width: 100%;

                .slider-content {
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                    justify-content: space-between;
                    width: 100%;

                    .slide {
                        flex-shrink: 0;
                        height: 100%;
                        position: relative;
                        width: 100%;

                        .slide-word {
                            left: 50%;
                            opacity: 0;
                            position: absolute;
                            text-align: center;
                            transform: translateX(-50%);
                            z-index: 3;
                            color: #FFF;
                            font-family: "Aeroport";
                            font-size: 90px;
                            font-weight: 500;
                            line-height: 140%;
                            text-transform: uppercase;
                            top: 170px;
                        }

                        .slide-text-block {
                            width: 90%;
                            margin-left: 18px;
                            position: absolute;
                            top: 440px;
                            white-space: pre-wrap;
                            z-index: 3;
                            transform: translate(-50%);

                            .about-vision-text {
                                color: #fff;
                                text-align: center;
                                font-family: "Aeroport";
                                font-size: 16px;
                                font-weight: 700;
                                margin-top: 70px;
                                text-transform: uppercase;
                                width: 550px;
                                margin-left: auto;
                                margin-right: auto;
                            }

                            .about-vision-sub {
                                color: #fff;
                                font-family: "Aeroport-light";
                                font-size: 16px;
                                margin-top: 20px;
                                width: 700px;
                                margin-left: auto;
                                margin-right: auto;
                            }

                            .about-vison-list-content {
                                position: relative;
                                width: 100%;
                                margin-top: 20px;

                                .about-vison-content-item {
                                    float: left;
                                    margin-top: 20px;
                                    padding-left: 50px;
                                    padding-right: 50px;
                                    width: calc(100% / 3 - 4px);

                                    .about-vision-text {
                                        color: #fff;
                                        text-align: center;
                                        font-family: "Aeroport";
                                        font-size: 16px;
                                        font-weight: 700;
                                        margin-top: 20px;
                                        text-transform: uppercase;
                                        width: 100%;
                                        margin-left: auto;
                                        margin-right: auto;
                                    }

                                    .about-vision-sub-1 {
                                        color: #fff;
                                        font-family: "Aeroport-light";
                                        font-size: 14px;
                                        margin-top: 5px;
                                        width: 90%;
                                        margin-left: auto;
                                        margin-right: auto;
                                    }
                                }

                            }
                        }

                        .slide-image-wrapper {
                            overflow: hidden;
                            position: relative;

                            .about-vision-img {
                                width: 80%;
                            }

                            .about-vision-img-mask {
                                width: 110%;
                                position: absolute;
                                top: calc(57%);
                                left: 50%;
                                transform: translate(-50%, -50%);
                            }

                            .mask-out-next {
                                animation: maskOutNext 2s forwards;
                            }

                            .mask-in-next {
                                animation: maskInNext 2s forwards;
                            }
                        }
                    }
                }
            }

            .slider_nav {
                .slider_nav_prev {
                    position: absolute;
                    left: 0;
                    top: calc(50% - 170px);
                    transform: translateY(-50%);
                    cursor: pointer;
                    z-index: 4;
                }

                .slider_nav_next {
                    position: absolute;
                    right: 0;
                    top: calc(50% - 170px);
                    transform: translateY(-50%);
                    cursor: pointer;
                    z-index: 4;
                }
            }
        }
    }

}

@media (max-width: 1100px) {
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
                margin-bottom: 60px;
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .about-text-title {
                font-family: 'Aeroport-bold';
                color: #000;
                margin-bottom: 25px;
            }

            .about-text {
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 14px;
                font-weight: 200;
                width: 275px;
                margin: auto;
                margin-bottom: 25px;
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
                        line-height: unset;
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

    .about-vision-list {
        background-color: #000;
        text-align: center;
        padding-top: 100px;
        padding-bottom: 20px;

        .inside-slider {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: auto;
            max-width: 380px;
            overflow: hidden;
            position: relative;
            transition: all 1s;
            height: 500px;

            .slide-to-move {
                height: 100%;
                position: relative;
                width: 100%;

                .slider-content {
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                    justify-content: space-between;
                    width: 100%;

                    .slide {
                        flex-shrink: 0;
                        height: 100%;
                        position: relative;
                        width: 100%;

                        .slide-word {
                            left: 50%;
                            opacity: 0;
                            position: absolute;
                            text-align: center;
                            transform: translateX(-50%);
                            z-index: 3;
                            color: #FFF;
                            font-family: "Aeroport";
                            font-size: 32px;
                            font-weight: 500;
                            line-height: 140%;
                            text-transform: uppercase;
                            top: 57px;
                        }

                        .slide-text-block {
                            width: 90%;
                            margin-left: 0px;
                            position: absolute;
                            top: 200px;
                            white-space: pre-wrap;
                            z-index: 3;
                            transform: translate(-50%);

                            .about-vision-text {
                                color: #fff;
                                text-align: center;
                                font-family: "Aeroport";
                                font-size: 9px;
                                font-weight: 700;
                                margin-top: 0px;
                                text-transform: uppercase;
                                width: 90%;
                                margin-left: auto;
                                margin-right: auto;
                            }

                            .about-vision-sub {
                                color: #fff;
                                font-family: "Aeroport-light";
                                font-size: 9px;
                                margin-top: 0px;
                                width: 90%;
                                margin-left: auto;
                                margin-right: auto;
                            }

                            .about-vison-list-content {
                                position: relative;
                                width: 100%;
                                margin-top: 0px;

                                .about-vison-content-item {
                                    float: left;
                                    margin-top: 5px;
                                    padding-left: 0px;
                                    padding-right: 0px;
                                    width: calc(100% / 2 - 2px);

                                    .about-vision-text {
                                        color: #fff;
                                        text-align: center;
                                        font-family: "Aeroport";
                                        font-size: 9px;
                                        font-weight: 700;
                                        margin-top: 5px;
                                        text-transform: uppercase;
                                        width: 100%;
                                        margin-left: auto;
                                        margin-right: auto;
                                    }

                                    .about-vision-sub-1 {
                                        color: #fff;
                                        font-family: "Aeroport-light";
                                        font-size: 7px;
                                        margin-top: 0px;
                                        width: 90%;
                                        margin-left: auto;
                                        margin-right: auto;
                                        height: 35px;
                                        margin-top: -20px;
                                    }
                                }

                            }
                        }

                        .slide-image-wrapper {
                            overflow: hidden;
                            position: relative;
                            background-color: #000;
                            padding: 2px;

                            .about-vision-img {
                                width: 80%;
                            }

                            .about-vision-img-mask {
                                width: 130%;
                                position: absolute;
                                top: calc(65%);
                                left: 50%;
                                transform: translate(-50%, -50%);
                            }

                            .mask-out-next {
                                animation: maskOutNext 2s forwards;
                            }

                            .mask-in-next {
                                animation: maskInNext 2s forwards;
                            }
                        }
                    }
                }
            }

            .slider_nav {
                .slider_nav_prev {
                    position: absolute;
                    left: 80px;
                    top: auto;
                    bottom: 50px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    z-index: 4;
                    width: 10px;
                }

                .slider_nav_next {
                    position: absolute;
                    right: 80px;
                    top: auto;
                    bottom: 50px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    z-index: 4;
                    width: 10px;
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
                top: 28%;
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
                margin-bottom: 60px;
                color: #000;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .about-achievement-1 {
                margin-bottom: 30px;
            }

            .about-text-title {
                font-family: 'Aeroport-bold';
                color: #000;
                margin-bottom: 25px;
            }

            .about-text {
                color: #000;
                text-align: center;
                font-family: 'Aeroport-light';
                font-size: 12px;
                font-weight: 200;
                width: 275px;
                margin: auto;
                margin-bottom: 25px;
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
                        line-height: unset;
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

    .about-vision-list {
        background-color: #000;
        text-align: center;
        padding-top: 100px;
        padding-bottom: 20px;
        max-width: 100%;
        overflow: hidden;

        .inside-slider {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: auto;
            max-width: 380px;
            overflow: hidden;
            position: relative;
            transition: all 1s;
            height: 500px;

            .slide-to-move {
                height: 100%;
                position: relative;
                width: 100%;

                .slider-content {
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                    justify-content: space-between;
                    width: 100%;

                    .slide {
                        flex-shrink: 0;
                        height: 100%;
                        position: relative;
                        width: 100%;

                        .slide-word {
                            left: 50%;
                            opacity: 0;
                            position: absolute;
                            text-align: center;
                            transform: translateX(-50%);
                            z-index: 3;
                            color: #FFF;
                            font-family: "Aeroport";
                            font-size: 32px;
                            font-weight: 500;
                            line-height: 140%;
                            text-transform: uppercase;
                            top: 57px;
                        }

                        .slide-text-block {
                            width: 90%;
                            margin-left: 0px;
                            position: absolute;
                            top: 200px;
                            white-space: pre-wrap;
                            z-index: 3;
                            transform: translate(-50%);

                            .about-vision-text {
                                color: #fff;
                                text-align: center;
                                font-family: "Aeroport";
                                font-size: 9px;
                                font-weight: 700;
                                margin-top: 0px;
                                text-transform: uppercase;
                                width: 90%;
                                margin-left: auto;
                                margin-right: auto;
                            }

                            .about-vision-sub {
                                color: #fff;
                                font-family: "Aeroport-light";
                                font-size: 9px;
                                margin-top: 0px;
                                width: 90%;
                                margin-left: auto;
                                margin-right: auto;
                            }

                            .about-vison-list-content {
                                position: relative;
                                width: 100%;
                                margin-top: 0px;

                                .about-vison-content-item {
                                    float: left;
                                    margin-top: 5px;
                                    padding-left: 0px;
                                    padding-right: 0px;
                                    width: calc(100% / 2 - 2px);

                                    .about-vision-text {
                                        color: #fff;
                                        text-align: center;
                                        font-family: "Aeroport";
                                        font-size: 9px;
                                        font-weight: 700;
                                        margin-top: 5px;
                                        text-transform: uppercase;
                                        width: 100%;
                                        margin-left: auto;
                                        margin-right: auto;
                                    }

                                    .about-vision-sub-1 {
                                        color: #fff;
                                        font-family: "Aeroport-light";
                                        font-size: 7px;
                                        margin-top: 0px;
                                        width: 90%;
                                        margin-left: auto;
                                        margin-right: auto;
                                        height: 35px;
                                        margin-top: -20px;
                                    }
                                }

                            }
                        }

                        .slide-image-wrapper {
                            overflow: hidden;
                            position: relative;
                            width: 100%;

                            img {
                                width: 80%;
                            }

                            .mask-out-next {
                                animation: maskOutNext 2s forwards;
                            }

                            .mask-in-next {
                                animation: maskInNext 2s forwards;
                            }
                        }
                    }
                }
            }

            .slider_nav {
                .slider_nav_prev {
                    position: absolute;
                    left: 80px;
                    top: auto;
                    bottom: 50px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    z-index: 4;
                }

                .slider_nav_next {
                    position: absolute;
                    right: 80px;
                    top: auto;
                    bottom: 50px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    z-index: 4;
                }
            }
        }
    }
}</style>