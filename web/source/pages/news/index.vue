<template>
    <div class="news-content container news-container">
        <img class="news-title-image" src="/images/neck_label_1.png" />
        <!-- <div class="news-category">
            <div class="news-cate-item news-cate-active">FASHION SHOW, </div>
            <div class="news-cate-item">KOLS, </div>
            <div class="news-cate-item">BLOGS, </div>
        </div> -->
        <b-container>
            <VueSlickCarousel v-bind="settings" :slidesToShow="isMobile ? 2 : 3" class="list-news"
                v-if="listNews && listNews.length">
                <div v-for="(item, index) in listNews" :key="index">
                    <NewItem :isMobile="isMobile" :item="item" />
                </div>
                <template slot="prevArrow" v-if="!isMobile">
                    <div class="pre-arrow">
                        <img src="/images/left-b.png" />
                    </div>
                </template>
                <template slot="nextArrow" v-if="!isMobile">
                    <div class="next-arrow">
                        <img src="/images/right-b.png" />
                    </div>
                </template>
            </VueSlickCarousel>
            <div class="list-main-news">
                <b-row v-if="listMainNews">
                    <b-col class="mb-3" cols="6" lg="4" v-for="(item, index) in listMainNews" :key="index">
                        <newsItemNoBox :isMobile="isMobile" :item="item" />
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import NewItem from "~/components/news/newsItem.vue"
import newsItemNoBox from "~/components/news/newsItemNoBox.vue"

export default {
    name: 'IndexPage',
    components: {
        NewItem,
        newsItemNoBox
    },
    computed: {
        ...mapGetters({
            listNews: "news/getListNews"
        }),
    },
    mixins: [general],
    data() {
        return {
            settings: {
                "dots": false,
                "arrows": true,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 1000,
                "slidesToScroll": 1
            },
            listMainNews: [],
            isMobile: false
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
    //                     text: this.$t('Club'),
    //                     active: true
    //                 }
    //             ]
    //         }
    //     },
    // },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.getListNews()
        this.listMainNews = this.listNews
    },
    methods: {
        ...mapActions({
            getListNews: "news/getListNews"
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
        // async reloadData() {
        //     let filters = {}
        //     this.page = 1

        //     if (this.filter !== 'all') {
        //         filters.category = this.filter
        //     }

        //     await this.getListClub({
        //         pagination: {
        //             page: this.page,
        //             pageSize: 4
        //         },
        //         filters
        //     })
        //     this.mainListItem = [...this.listClub.items]
        //     if (this.isMobile) {
        //         if (this.mainListItem.length >= this.listClub.pagination.total) {
        //             this.showMore = false
        //         }
        //     }
        //     else {
        //         if ((this.mainListItem.length + 4) >= this.listClub.pagination.total) {
        //             this.showMore = false
        //         }
        //     }
        // },
        // async viewMore() {
        //     this.page++
        //     await this.getListClub({
        //         pagination: {
        //             page: this.page,
        //             pageSize: 4
        //         }
        //     })
        //     this.mainListItem.push(...this.listClub.items)
        //     if (this.isMobile) {
        //         if (this.mainListItem.length >= this.listClub.pagination.total) {
        //             this.showMore = false
        //         }
        //     }
        //     else {
        //         if ((this.mainListItem.length + 4) >= this.listClub.pagination.total) {
        //             this.showMore = false
        //         }
        //     }
        // }
    }
}
</script>
<style lang="scss">
.news-content {
    padding-bottom: 100px;

    .list-main-news {
        margin-top: 100px;
    }
}

@media (max-width: 520px) {
    .news-content {
        padding-bottom: 60px;

        .news-title-image {
            width: 110px;
            margin: auto;
        }

        .news-category {
            margin-top: 15px;
        }

        .list-main-news {
            margin-top: 30px;
        }
    }
}
</style>