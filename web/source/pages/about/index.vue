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
                        THE NAME BRANCH. INCREDIBLE FROM HIS CHILDHOOD Memories, HOANG HAS CREATED PRODUCTS THAT REPEAT THE
                        TRADITIONAL VALUES OF THE COUNTRY OF THE COUNTRIES BRING CONtemporaries. HE LOVES EXPERIENCE WITH
                        USE OF TECHNOLOGY IN THE FASHION WORLD AND HAS A WISH TO BECOME A POINT OF RESPONSE FOR THE NEW
                        GENERATION
                        IN THIS INDUSTRY.
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
                    <div class="about-text">Tham gia triển lãm LIT EXHIBITION và show diễn đầu tiên tại VIỆT NAM do nhãn
                        hàng SUNLIFE VIỆT NAM tổ chức.</div>
                    <div class="about-text">Chiến thắng giải thưởng NTK triển vọng của năm do SR FASHION AWARDS tổ chức
                    </div>
                    <div class="about-text">Lọt top 21 thương hiệu trẻ triển vọng do VOGUE ITALIA bình chọn</div>
                    <div class="about-text">Tham dự tuần lễ thời trang MILANO FASHION WEEK THU ĐÔNG 2023</div>
                </div>
            </div>
            <div class="about-list-item">
                <div class="about-info">
                    <div class="about-achievement">achievement</div>
                    <div class="about-text-title">/2022/</div>
                    <div class="about-text">Trở thành đại diện cựu sinh viên tiêu biểu cho khóa học tham gia phỏng vấn trong
                        series “NABA MEETS ALUMNI” </div>
                    <div class="about-text">NTK Việt đầu tiên tham dự chính thức tuần lễ thời trang MILANO FASHION WEEK XUÂN
                        HÈ 2023 ra mắt thương hiệu cá nhân “PHAN DANG HOANG” </div>
                    <div class="about-text">Tham dự tuần lễ thời trang AFRO FASHION WEEK THU ĐÔNG 2022 được VOGUE ITALIA
                        trình chiếu bst</div>
                </div>
            </div>
            <div class="about-list-item">
                <div class="about-info">
                    <div class="about-achievement about-achievement-1">achievement</div>
                    <div class="about-text-title">/2021/</div>
                    <div class="about-text">Mở màn tuần lễ thời trang AFRO FASHION WEEK XUÂN HÈ 2022 gặp gỡ những nhân vật
                        có ảnh hưởng trong giới thời trang: ANNA WINTOUR, NAOMI CAMPBELL,...</div>
                    <div class="about-text">TOP 30 BEST COLLECTION do hội đồng thời trang bình chọn cho show diễn PLANET
                        DRESS của ĐẠI HỌC NABA</div>
                    <div class="about-text"><b>/2018/</b> Nhận học bổng du học chuyên ngành thiết kế thời trang đại học Naba
                        (MILANO-ITALY)</div>
                    <div class="about-text"><b>/2016/</b> Hoạ sĩ trẻ VN đầu tiên xuất hiện trên 2 tạp chí nghệ thuật mỹ năm
                        2016 với những tác phẩm truyền thần</div>
                    <div class="about-text"><b>/2015/</b> Tham gia vẽ tranh cho Lynk show của doanh nhân LÝ NHÃ KỲ</div>
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
                    From one-off pieces created by independent designers using Gucci materials, to the House's archived
                    pieces that have been restored by its artisans, Vault is a treasure trove of unique objects representing
                    beauty, dreams, passions, and above all, the search for ideas beyond the confines of time and space.
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
            <VueSlickCarousel v-bind="setting_vision" class="about-vision-slider">
                <div class="about-vision-item">
                    <img class="about-vision-img" src="/images/vs1.jpg" />
                    <div class="about-vision-text">{{ $t('About_vs_1') }}</div>
                    <div class="about-vision-sub">{{ $t('About_vs_1_sub') }}</div>
                </div>
                <div class="about-vision-item">
                    <img class="about-vision-img" src="/images/vs2.jpg" />
                    <div class="about-vision-text">{{ $t('About_vs_2') }}</div>
                    <div class="about-vision-sub">{{ $t('About_vs_2_sub') }}</div>
                </div>
                <div class="about-vision-item">
                    <img class="about-vision-img" src="/images/vs3.jpg" />
                    <div class="about-vison-list-content">
                        <div class="about-vison-content-item">
                            <div class="about-vision-text">{{ $t('About_vs_3_1') }}</div>
                            <div class="about-vision-sub-1">{{ $t('About_vs_3_1_sub') }}</div>
                        </div>
                        <div class="about-vison-content-item">
                            <div class="about-vision-text">{{ $t('About_vs_3_2') }}</div>
                            <div class="about-vision-sub-1">{{ $t('About_vs_3_2_sub') }}</div>
                        </div>
                        <div class="about-vison-content-item">
                            <div class="about-vision-text">{{ $t('About_vs_3_3') }}</div>
                            <div class="about-vision-sub-1">{{ $t('About_vs_3_3_sub') }}</div>
                        </div>
                        <div class="about-vison-content-item">
                            <div class="about-vision-text">{{ $t('About_vs_3_4') }}</div>
                            <div class="about-vision-sub-1">{{ $t('About_vs_3_4_sub') }}</div>
                        </div>
                        <div class="about-vison-content-item">
                            <div class="about-vision-text">{{ $t('About_vs_3_5') }}</div>
                            <div class="about-vision-sub-1">{{ $t('About_vs_3_5_sub') }}</div>
                        </div>
                    </div>

                </div>
                <template slot="prevArrow">
                    <div class="pre-arrow">
                        <img src="/images/left-s.svg" />
                    </div>
                </template>
                <template slot="nextArrow">
                    <div class="next-arrow">
                        <img src="/images/right-s.svg" />
                    </div>
                </template>
            </VueSlickCarousel>
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
            tab: 1,
            settings: {
                "dots": true,
                "autoplay": false,
                "autoplaySpeed": 300000,
                // "arrows": this.isMobile ? false : true,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            },
            setting_vision: {
                "dots": false,
                "autoplay": false,
                "autoplaySpeed": 300000,
                "arrows": true,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            }
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
            margin-bottom: 5px;
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

    .about-vision-list {
        background-color: #000;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;

        .about-vision-slider {
            margin: auto;
            width: 90%;
            text-align: center;

            .about-vision-item {
                text-align: center;

                .about-vision-text {
                    color: #fff;
                    text-align: center;
                    font-family: "Aeroport";
                    font-size: 16px;
                    font-weight: 700;
                    margin-top: 50px;
                    text-transform: uppercase;
                    width: 530px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .about-vision-sub {
                    color: #fff;
                    font-family: "Aeroport-light";
                    font-size: 16px;
                    margin-top: 50px;
                    width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .about-vision-img {
                    width: 80%;
                    margin: auto;
                }
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
                    width: calc(100% / 3);

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

            .pre-arrow {
                margin-top: -120px;
                margin-left: 45px;

                &:before {
                    display: none;
                }

                img {
                    width: auto;
                }
            }

            .next-arrow {
                margin-top: -120px;
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

        .about-vision-list {
            background-color: #000;
            text-align: center;
            padding-top: 100px;
            padding-bottom: 0px;

            .about-vision-slider {
                margin: auto;
                width: 96%;
                text-align: center;

                .about-vision-item {
                    text-align: center;
                    height: 520px;
                    .about-vision-text {
                        color: #fff;
                        text-align: center;
                        font-family: "Aeroport";
                        font-size: 9px;
                        font-weight: 700;
                        margin-top: 30px;
                        text-transform: uppercase;
                        width: 70%;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .about-vision-sub {
                        color: #fff;
                        font-family: "Aeroport-light";
                        font-size: 9px;
                        margin-top: 30px;
                        width: 80%;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .about-vision-img {
                        width: 80%;
                        margin: auto;
                    }
                }

                .about-vison-list-content {
                    position: relative;
                    width: 100%;
                    margin-top: 10px;

                    .about-vison-content-item {
                        float: left;
                        margin-top: 5px;
                        padding-left: 5px;
                        padding-right: 5px;
                        width: calc(100% / 2);

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
                            margin-top: 5px;
                            width: 90%;
                            margin-left: auto;
                            margin-right: auto;
                        }
                    }

                }

                .pre-arrow {
                    margin-top: 150px;
                    margin-left: 100px;

                    &:before {
                        display: none;
                    }

                    img {
                        width: auto;
                    }
                }

                .next-arrow {
                    margin-top: 150px;
                    margin-right: 100px;

                    &:before {
                        display: none;
                    }

                    img {
                        width: auto;
                    }
                }
            }
        }
    }
}
</style>