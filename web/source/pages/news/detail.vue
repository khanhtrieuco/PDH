<template>
    <div class="detail-news-content">
        <div class="detail-news-image">
            <ThumbImage ratio="21-9" :srcImg="news.attributes?.thub.data?.attributes.url"></ThumbImage>
        </div>
        <b-container class="d-flex justify-content-between" v-if="!isMobile">
            <div class="detail-left-info">
                <h1 class="detail-news-title">{{ $i18n.locale === 'vn' ? news.attributes?.title : news.attributes?.title_en
                }}</h1>
                <div class="detail-news-des">{{ $i18n.locale === 'vn' ? news.attributes?.short_content :
                    news.attributes?.short_content_en }}</div>
                <div class="news-social-panel d-flex justify-content-start">
                    <img class="news-social-icon" src="/images/tiktok1.png " />
                    <img class="news-social-icon" src="/images/face.png " />
                    <img class="news-social-icon" src="/images/insta.png " />
                </div>
            </div>
            <div class="detail-right-info">
                <!-- <div class="detail-news-text" v-html="$md.render(news?.attributes?.content ?? '')"></div> -->
                <div class="detail-news-text"
                    v-html="showHtmlText($i18n.locale === 'vn' ? news?.attributes?.content : news?.attributes?.content_en)">
                </div>
            </div>
        </b-container>
        <b-container v-if="isMobile">
            <div class="detail-news-category">{{ news.attributes?.category }}</div>
            <h1 class="detail-news-title">{{ $i18n.locale === 'vn' ? news.attributes?.title : news.attributes?.title_en }}
            </h1>
            <div class="detail-news-des">{{ $i18n.locale === 'vn' ? news.attributes?.short_content :
                news.attributes?.short_content_en }}</div>
            <div class="news-social-panel d-flex justify-content-start">
                <img class="news-social-icon" src="/images/tiktok1.png " />
                <img class="news-social-icon" src="/images/face.png " />
                <img class="news-social-icon" src="/images/insta.png " />
            </div>
            <div class="detail-news-text"
                v-html="showHtmlText($i18n.locale === 'vn' ? news?.attributes?.content : news?.attributes?.content_en)">
            </div>
        </b-container>
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
    computed: {
        ...mapGetters({
            news: "news/getNews"
        }),
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
    //                     text: 'Aura news',
    //                     href: '/aura-news'
    //                 },
    //                 {
    //                     text: this.$i18n.locale === 'vn' ? this.news?.attributes?.title : this.news?.attributes?.title_en,
    //                     active: true
    //                 }
    //             ]
    //         }
    //     },
    // },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.loadData()
    },
    methods: {
        ...mapActions({
            getNewsBySlug: "news/getNewsBySlug"
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
        async loadData() {
            if (this.$route.params.id) {
                await this.getNewsBySlug(this.$route.params.id)
            }
        }
    }
}
</script>
<style lang="scss">
.detail-news-content {
    margin-top: 0px;
    margin-bottom: 160px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.detail-news-img {
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

.detail-news-title {
    color: #2F3036;
    font-size: 36px;
    margin-top: 40px;
}

.news-social-panel {
    margin-top: 20px;

    .news-social-icon {
        margin-right: 10px;
    }
}

.detail-news-des {
    color: #9C9C9C;
    font-size: 16px;
    font-family: 'inter-light';
    margin-top: 20px;
    text-transform: uppercase;
    padding-right: 10px;
}

.detail-news-text {
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
    .detail-news-content {
        margin-top: 50px;
    }

    .detail-news-category {
        color: #777;
        font-size: 10px;
        font-family: 'inter';
        text-transform: uppercase;
        margin-top: 20px;
    }

    .detail-news-title {
        color: #2F3036;
        font-size: 20px;
        margin-top: 16px;
    }

    .detail-news-des {
        text-transform: uppercase;
        font-family: 'inter-light';
        margin-top: 16px;
        color: #2F3036;
        font-size: 10px;
    }

    .detail-news-text {
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

    .news-social-panel {
        margin-top: 10px;

        .news-social-icon {
            margin-right: 10px;
            width: 20px;
        }
    }
}
</style>