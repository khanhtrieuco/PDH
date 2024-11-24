<template>
    <div class="faq-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <b-container class="d-flex justify-content-between" v-if="!isMobile">
            <div class="faq-left-content">
                <!-- <ThumbImage class="faq-image" ratio="9-16" srcImg="/images/faq.jpg"></ThumbImage> -->
                <img class="faq-image" :src="bannerInfo.faq?.data.attributes.url ?? '/images/faq.jpg'"></img>
            </div>
            <div class="faq-right-content">
                <h2 class="faq-title">Những câu hỏi thường gặp</h2>
                <div class="faq-item-block" v-for="(item, index) in listFaq" :key="index">
                    <b-button @click="setShow(item)" class="btn-faq-item d-flex w-100 align-items-center">
                        <span class="faq-item-text w-100 text-left"> {{ item?.attributes?.name }} </span>
                        <img class="icon-arrow-faq" src="/images/xvalue.png"></img>
                    </b-button>
                    <b-collapse v-model="item.show">
                        <div class="faq-item-text-content" v-html="$md.render(item?.attributes?.content ?? '')"></div>
                    </b-collapse>
                </div>
            </div>
        </b-container>
        <ThumbImage ratio="4-3" :srcImg="bannerInfo.faq_mobile?.data.attributes.url ?? '/images/faq_mobile.jpg'" v-if="isMobile"></ThumbImage>
        <b-container v-if="isMobile">
            <h2 class="faq-title">Những câu hỏi thường gặp</h2>
            <div class="faq-item-block" v-for="(item, index) in listFaq" :key="index">
                <b-button @click="setShow(item)" class="btn-faq-item d-flex w-100 align-items-center">
                    <span class="faq-item-text w-100 text-left"> {{ item?.attributes?.name }} </span>
                    <img class="icon-arrow" src="/images/xvalue.png"></img>
                </b-button>
                <b-collapse v-model="item.show">
                    <div class="faq-item-text-content" v-html="$md.render(item?.attributes?.content ?? '')"></div>
                </b-collapse>
            </div>
        </b-container>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    computed: {
        ...mapGetters({
            listFaq: "faq/getListFaq",
            bannerInfo: "common/getBannerinfo",
        }),
    },
    mixins: [general],
    data() {
        return {
            breadcrumb: [
                {
                    text: 'Trang chủ',
                    href: '/'
                },
                {
                    text: 'Chăm sóc khách hàng',
                    href: '/cham-soc-khach-hang'
                },
                {
                    text: 'Những câu hỏi thường gặp',
                    active: true
                }
            ],
            isMobile: false
        }
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.getListFaq()
    },
    methods: {
        ...mapActions({
            getListFaq: "faq/getListFaq"
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
        setShow(item) {
            item.show = !item.show
        }
    }
}
</script>
<style lang="scss">
.faq-content {
    margin-top: 180px;
}

.faq-right-content {
    width: 900px;
}

.faq-left-content {
    width: calc(100% - 950px);
    position: relative;
}

.faq-image {
    position: relative;
    right: 0px;
    top: 0px;
    float: right;
}

.faq-title {
    margin-top: 20px;
    color: #2F3036;
    font-size: 36px;
    margin-bottom: 30px;
}

.btn-faq-item {
    border-left: none;
    border-right: none;
    border-top: none;
    background-color: #fff;
    border-bottom: 1px solid #000;
    border-radius: 0px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 8px;
    padding-left: 0px;
    padding-right: 0px;

    &:focus {
        box-shadow: none !important;
        background-color: #fff;
    }

    &:hover {
        background-color: #fff;
    }

    &:active {
        background-color: #fff !important;
    }
}
.icon-arrow-faq{
    width: 15px;
}
.faq-item-text {
    color: #2F3036;
    font-size: 20px;
}
.faq-item-text-content {
    color: #2F3036;
    font-size: 20px;
    padding-top: 10px;
}
@media (max-width: 520px) {
    .faq-content {
        margin-top: 0px;
    }

    .faq-title {
        margin-top: 40px;
        color: #2F3036;
        text-align: center;
        font-size: 20px;
    }

    .faq-item-text {
        color: #2F3036;
        font-size: 10px;
        padding-right: 30px;
    }

    .faq-item-text-content {
        color: #2F3036;
        font-size: 10px;
        padding-right: 30px;
        padding-top: 10px;
    }

    .faq-item-block {
        &:first-child {
            border-top: 1px solid #000 !important;
        }

        &:last-child {
            margin-bottom: 60px;
        }
    }

    .btn-faq-item {
        border-left: none;
        border-right: none;
        border-top: none;
        background-color: #fff;
        border-bottom: 1px solid #000;
        border-radius: 0px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-top: 8px;

        &:focus {
            box-shadow: none !important;
            background-color: #fff;
        }

        &:hover {
            background-color: #fff;
        }

        &:active {
            background-color: #fff;
        }
    }
}
</style>