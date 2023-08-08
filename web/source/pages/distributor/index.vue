<template>
    <div class="distributor-containter">
        <Banner :isMobile="isMobile" type="Kinh doanh" />
        <b-container v-if="!isMobile">
            <div class="distributor-item d-flex justify-content-between">
                <div class="distributor-item-image">
                    <ThumbImage ratio="16-9" src="/images/dis1.jpg"></ThumbImage>
                </div>
                <div class="distributor-item-content d-flex justify-content-between align-items-center">
                    <div class="distributor-item-info">
                        <h3 class="distributor-item-title">{{ $t('Distributor_title_1') }}</h3>
                        <div class="distributor-item-text">{{ $t('Distributor_des_1') }}</div>
                        <div class="distributor-item-text">{{ $t('Distributor_des_2') }}</div>
                        <div class="distributor-item-more" @click="goPage('/ve-nas')">{{ $t('Distributor_des_3') }}</div>
                    </div>
                </div>
            </div>
            <div class="distributor-item d-flex justify-content-between">
                <div class="distributor-item-content d-flex justify-content-between align-items-center">
                    <div class="distributor-item-info">
                        <h3 class="distributor-item-title">{{ $t('Distributor_title_2') }}</h3>
                        <div class="distributor-item-text">{{ $t('Distributor_des_1') }}</div>
                        <div class="distributor-item-text">{{ $t('Distributor_des_2') }}</div>
                        <div class="distributor-item-more" @click="goPage('/ve-nas')">{{ $t('Distributor_des_3') }}</div>
                    </div>
                </div>
                <div class="distributor-item-image">
                    <ThumbImage ratio="16-9" src="/images/dis2.jpg"></ThumbImage>
                </div>

            </div>
            <VueSlickCarousel v-bind="settings" class="distributor-list-banner">
                <div class="distributor-item d-flex justify-content-between">
                    <div class="distributor-item-image">
                        <ThumbImage ratio="3-4" src="/images/dis3.jpg"></ThumbImage>
                    </div>
                    <div class="distributor-item-content d-flex justify-content-between align-items-center">
                        <div class="distributor-item-info">
                            <h3 class="distributor-item-title">{{ $t('Distributor_title_3') }}</h3>
                            <div class="distributor-item-text">{{ $t('Distributor_des_4') }}</div>
                            <div class="distributor-item-div-icon d-flex justify-content-between align-items-center">
                                <img class="distributor-item-icon" src="/images/dicon1.png" />
                                <img class="distributor-item-icon" src="/images/dicon2.png" />
                                <img class="distributor-item-icon" src="/images/dicon3.png" />
                                <img class="distributor-item-icon" src="/images/dicon4.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="distributor-item d-flex justify-content-between">
                    <div class="distributor-item-image">
                        <ThumbImage ratio="3-4" src="/images/dis32.jpg"></ThumbImage>
                    </div>
                    <div class="distributor-item-content d-flex justify-content-between align-items-center">
                        <div class="distributor-item-info">
                            <h3 class="distributor-item-title">{{ $t('Distributor_title_4') }}</h3>
                            <div class="distributor-item-text">{{ $t('Distributor_des_5') }}</div>
                        </div>
                    </div>
                </div>
                <div class="distributor-item d-flex justify-content-between">
                    <div class="distributor-item-image">
                        <ThumbImage ratio="3-4" src="/images/dis33.jpg"></ThumbImage>
                    </div>
                    <div class="distributor-item-content d-flex justify-content-between align-items-center">
                        <div class="distributor-item-info">
                            <h3 class="distributor-item-title">{{ $t('Distributor_title_5') }}</h3>
                            <div class="distributor-item-text">{{ $t('Distributor_des_6') }}</div>
                        </div>
                    </div>
                </div>
            </VueSlickCarousel>

        </b-container>
        <b-container v-if="isMobile">
            <ThumbImage class="distributor-image-mobile" ratio="16-9" src="/images/dis1.jpg"></ThumbImage>
            <h3 class="distributor-item-title">{{ $t('Distributor_title_1') }}</h3>
            <div class="distributor-item-text">{{ $t('Distributor_des_1') }}</div>
            <div class="distributor-item-text">{{ $t('Distributor_des_2') }}</div>
            <div class="distributor-item-more" @click="goPage('/ve-nas')">{{ $t('Distributor_des_3') }}</div>
            <ThumbImage class="distributor-image-mobile" ratio="16-9" src="/images/dis2.jpg"></ThumbImage>
            <h3 class="distributor-item-title">{{ $t('Distributor_title_2') }}</h3>
            <div class="distributor-item-text">{{ $t('Distributor_des_1') }}</div>
            <div class="distributor-item-text">{{ $t('Distributor_des_2') }}</div>
            <div class="distributor-item-more" @click="goPage('/ve-nas')">{{ $t('Distributor_des_3') }}</div>
        </b-container>
        <VueSlickCarousel v-bind="settings" class="distributor-list-banner" v-if="isMobile">
            <div class="distributor-item-mobile-list">
                <ThumbImage ratio="16-9" src="/images/dis3.jpg"></ThumbImage>
                <b-container>
                    <h3 class="distributor-item-title">{{ $t('Distributor_title_3') }}</h3>
                    <div class="distributor-item-text">{{ $t('Distributor_des_4') }}</div>
                    <div class="distributor-item-div-icon d-flex justify-content-between align-items-center">
                        <img class="distributor-item-icon" src="/images/dicon1.png" />
                        <img class="distributor-item-icon" src="/images/dicon2.png" />
                        <img class="distributor-item-icon" src="/images/dicon3.png" />
                        <img class="distributor-item-icon" src="/images/dicon4.png" />
                    </div>
                </b-container>
            </div>
            <div class="distributor-item-mobile-list">
                <ThumbImage ratio="16-9" src="/images/dis32-m.jpg"></ThumbImage>
                <h3 class="distributor-item-title">{{ $t('Distributor_title_4') }}</h3>
                <div class="distributor-item-text">{{ $t('Distributor_des_5') }}</div>
            </div>
            <div class="distributor-item-mobile-list">
                <ThumbImage ratio="16-9" src="/images/dis33-m.jpg"></ThumbImage>
                <h3 class="distributor-item-title">{{ $t('Distributor_title_5') }}</h3>
                <div class="distributor-item-text">{{ $t('Distributor_des_6') }}</div>
            </div>
        </VueSlickCarousel>
        <ThumbImage ratio="21-9" src="/images/dis4.jpg" v-if="!isMobile"></ThumbImage>
        <div v-if="isMobile" class="distributor-image-block">
            <b-container>
                <h3 class="distributor-image-block-title">{{ $t('Distributor_title_6') }}</h3>
                <div class="distributor-image-block-text">Lorem Ipsum</div>
                <div class="distributor-image-block-des">There are many variations of passages of Lorem Ipsum available
                </div>
                <div class="distributor-image-block-text">Lorem Ipsum</div>
                <div class="distributor-image-block-des">There are many variations of passages of Lorem Ipsum available
                </div>
                <div class="distributor-image-block-text">Lorem Ipsum</div>
                <div class="distributor-image-block-des">There are many variations of passages of Lorem Ipsum available
                </div>
                <div class="distributor-image-block-text">Lorem Ipsum</div>
                <div class="distributor-image-block-des">There are many variations of passages of Lorem Ipsum available
                </div>
            </b-container>
        </div>
        <b-container class="distributor-form d-flex justify-content-between" v-if="!isMobile">
            <div class="distributor-form-info">
                <div class="distributor-form-info-title">{{ $t('Distributor_title_7') }}</div>
                <div class="distributor-form-info-text">{{ $t('Distributor_des_7') }}</div>
                <div class="distributor-form-info-email">support@nasbeauty.com.vn</div>
            </div>
            <b-row class="distributor-form-input-content">
                <b-col cols="6">
                    <b-form-input class="distributor-form-input" v-model="name" type="text"
                        :placeholder="$t('Distributor_form_1')"></b-form-input>
                </b-col>
                <b-col cols="6">
                    <b-form-input class="distributor-form-input" v-model="phone" type="text"
                        :placeholder="$t('Distributor_form_2')"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="distributor-form-input" v-model="email" type="text"
                        placeholder="Email*"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="distributor-form-input" v-model="job" type="text"
                        :placeholder="$t('Distributor_form_3')"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="distributor-form-input" v-model="company" type="text"
                        :placeholder="$t('Distributor_form_4')"></b-form-input>
                </b-col>
                <b-col cols="4">
                    <b-form-input class="distributor-form-input" v-model="ward" type="text"
                        :placeholder="$t('Distributor_form_5')"></b-form-input>
                </b-col>
                <b-col cols="4">
                    <b-form-input class="distributor-form-input" v-model="distric" type="text"
                        :placeholder="$t('Distributor_form_6')"></b-form-input>
                </b-col>
                <b-col cols="4">
                    <b-form-input class="distributor-form-input" v-model="province" type="text"
                        :placeholder="$t('Distributor_form_7')"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <b-form-input class="distributor-form-input" v-model="address" type="text"
                        :placeholder="$t('Distributor_form_8')"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <div class="nas-btn distributor-btn-action" @click="onClickAdd">{{ $t('Distributor_form_9') }}</div>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="distributor-form" v-if="isMobile">
            <div class="distributor-form-info">
                <div class="distributor-form-info-title">{{ $t('Distributor_title_7') }}</div>
                <div class="distributor-form-info-text">{{ $t('Distributor_des_7') }}</div>
                <div class="distributor-form-info-email">support@nasbeauty.com.vn</div>
                <b-form-input class="distributor-form-input" v-model="name" type="text"
                    :placeholder="$t('Distributor_form_1')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="phone" type="text"
                    :placeholder="$t('Distributor_form_2')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="email" type="text"
                    placeholder="Email*"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="job" type="text"
                    :placeholder="$t('Distributor_form_3')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="company" type="text"
                    :placeholder="$t('Distributor_form_4')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="ward" type="text"
                    :placeholder="$t('Distributor_form_5')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="distric" type="text"
                    :placeholder="$t('Distributor_form_6')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="province" type="text"
                    :placeholder="$t('Distributor_form_7')"></b-form-input>
                <b-form-input class="distributor-form-input" v-model="address" type="text"
                    :placeholder="$t('Distributor_form_8')"></b-form-input>
                <div class="nas-btn distributor-btn-action" @click="onClickAdd">{{ $t('Distributor_form_9') }}</div>
            </div>
        </b-container>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import Banner from "~/components/home/bannerdistributor.vue"

export default {
    name: 'IndexPage',
    mixins: [general],
    components: {
        Banner,
    },
    data() {
        return {
            settings: {
                "dots": true,
                "arrows": false,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            },
            isMobile: false,
            name: null,
            phone: null,
            email: null,
            job: null,
            company: null,
            address: null,
            distric: null,
            ward: null,
            province: null
        }
    },
    // computed: {
    //   ...mapGetters({
    //     listWork: "work/getListWork"
    //   }),
    // },
    mounted() {
        // if (!this.$route.hash) {
        //   window.scrollTo({ top: 0, behavior: 'smooth' })
        // }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
    },
    methods: {
        ...mapActions({
            createItem: "distributor/createItem"
        }),
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        goPage(url) {
            this.showMenu = false;
            this.$router.push({ path: this.localePath(url) })
        },
        async onClickAdd() {
            if (!this.name || !this.phone || !this.email || !this.job || !this.address) {
                this.showNotification('warning', `Vui lòng nhập đầy đủ thông tin`)
                return
            }
            let _data = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                job: this.job,
                company: this.company,
                address: this.address,
            }
            await this.createItem({ data: _data })
            this.showNotification('success', `Thông tin đã được ghi nhận chúng tôi sẽ liên lạc với bạn sớm nhất!`)
            this.name = null
            this.phone = null
            this.email = null
            this.job = null
            this.company = null
            this.address = null
            this.distric = null
            this.ward = null
            this.province = null
        }
    }
}
</script>
<style lang="scss">
.distributor-item {
    margin-top: 200px;

    &:last-child {
        margin-bottom: 200px;
    }
}

.distributor-item-image {
    width: 700px;
}

.distributor-item-content {
    width: calc(100% - 800px);
}

.distributor-item-info {
    width: 350px;
    margin-left: auto;
    margin-right: auto;
}

.distributor-item-title {
    text-align: center;
    color: #191B1E;
    font-size: 36px;
}

.distributor-item-text {
    margin-top: 20px;
    text-align: center;
    color: #68666C;
    font-size: 13px;
    font-family: 'inter';
}

.distributor-item-more {
    margin-top: 40px;
    text-align: center;
    color: #515151;
    font-size: 12px;
    font-family: 'inter';
    font-weight: 600;
    text-decoration-line: underline;
    cursor: pointer;
}

.distributor-item-div-icon {
    margin-top: 40px;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
}

.distributor-form {
    position: relative;
    z-index: 1;
    margin-top: -150px;
    border-radius: 72px;
    background: #FFF;
    box-shadow: 1px -1px 20px 10px rgba(110, 125, 134, 0.05);
    padding: 130px 115px;
}

.distributor-form-info {
    width: 400px;
}

.distributor-form-info-title {
    color: #191B1E;
    font-size: 36px;
    line-height: 40px;
}

.distributor-form-info-text {
    color: #68666C;
    font-size: 13px;
    font-family: 'inter';
    margin-top: 30px;
}

.distributor-form-info-email {
    color: #F593A5;
    font-size: 24px;
    font-weight: 600;
    margin-top: 30px;
}

.distributor-form-input-content {
    width: calc(100% - 500px);
}

.distributor-form-input {
    margin-bottom: 16px;
}

.distributor-btn-action {
    width: 240px;
    margin-top: 30px;
    float: right;
}

.distributor-list-banner {
    .slick-dots {
        bottom: 400px;
        right: 150px;
        width: 200px;
    }
}

@media (max-width: 520px) {
    .distributor-image-mobile {
        margin-top: 40px;
    }

    .distributor-item-title {
        color: #191B1E;
        text-align: center;
        margin-top: 40px;
        font-size: 20px;
    }

    .distributor-item-text {
        color: #68666C;
        text-align: center;
        font-size: 10px;
        font-family: 'inter-light';
        margin-top: 10px;
        width: 330px;
        margin-left: auto;
        margin-right: auto;
    }

    .distributor-item-more {
        color: #515151;
        text-align: center;
        font-size: 8px;
        font-family: 'inter';
        margin-top: 20px;
    }

    .distributor-list-banner {
        margin-top: 40px;
        margin-bottom: 70px;
    }

    .distributor-item-div-icon {
        width: 160px;
        margin-top: 20px;
    }

    .distributor-item-icon {
        width: 30px;
    }

    .distributor-image-block {
        padding-top: 30px;
        background-image: url('/images/dis4_mobile.jpg');
        background-size: 100% 100%;
        min-height: 550px;
    }

    .distributor-image-block-title {
        font-size: 16px;
        color: #191B1E;
        text-transform: uppercase;
        width: 60%;
        margin-bottom: 16px;
    }

    .distributor-image-block-text {
        font-size: 12px;
        color: #191B1E;
        text-transform: uppercase;
        width: 45%;
        margin-top: 5px;

    }

    .distributor-image-block-des {
        font-size: 10px;
        color: #191B1E;
        font-family: 'inter-light';
        border-bottom: 1px solid #191B1E;
        width: 45%;
        padding-bottom: 12px;
        margin-top: 5px;

        &:last-child {
            border-bottom: none;
        }
    }

    .distributor-form {
        border-radius: 30px;
        margin-top: -100px;
        padding: 30px 12px;
    }

    .distributor-form-info {
        width: 100%;
    }

    .distributor-form-info-title {
        text-transform: uppercase;
        text-align: center;
        font-size: 14px;
        width: 180px;
        margin-left: auto;
        margin-right: auto;
        line-height: 20px;
    }

    .distributor-form-info-text {
        color: #68666C;
        text-align: center;
        font-size: 10px;
        margin-top: 16px;
        font-family: 'inter-light';
    }

    .distributor-form-info-email {
        color: #F593A5;
        text-align: center;
        font-size: 10px;
        margin-top: 16px;
    }

    .distributor-form-input-content {
        width: 100%;
    }

    .distributor-form-input {
        margin-top: 8px;
        margin-bottom: 8px;
        height: 20px;
        line-height: 18px;
        font-size: 8px;
        font-family: 'inter-light';
    }

    .distributor-btn-action {
        height: 40px;
        margin-top: 16px;
        float: none;
        margin-left: auto;
        margin-right: auto;
    }

    .distributor-list-banner {
        .slick-dots {
            bottom: -30px;
            right: 0px;
            width: 100%;
        }
    }
}
</style>