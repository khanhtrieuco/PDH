<template>
    <div class="news-content container news-container">
        <img class="news-title-image" src="/images/neck_label_1.png" />
        <div class="news-category">
            <div class="news-cate-item news-cate-active">FASHION SHOW, </div>
            <div class="news-cate-item">KOLS, </div>
            <div class="news-cate-item">BLOGS, </div>
        </div>
        <b-container>
            <VueSlickCarousel v-bind="settings" class="list-news" v-if="listNews && listNews.length">
                <div v-for="(item, index) in listNews" :key="index">
                    <NewItem :isMobile="isMobile" />
                </div>
                <template slot="prevArrow">
                    <div class="pre-arrow">
                        <img src="/images/left-b.png" />
                    </div>
                </template>
                <template slot="nextArrow">
                    <div class="next-arrow">
                        <img src="/images/right-b.png" />
                    </div>
                </template>
            </VueSlickCarousel>
            <div class="list-main-news">
                <b-row v-if="listMainNews">
                    <b-col class="mb-3" cols="4" v-for="index in 6" :key="index">
                        <newsItemNoBox :isMobile="isMobile" />
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
    // computed: {
    //     ...mapGetters({
    //         listClub: "club/getListClub"
    //     }),
    // },
    mixins: [general],
    data() {
        return {
            settings: {
                "dots": false,
                "arrows": true,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 1000,
                "slidesToShow": 3,
                "slidesToScroll": 1
            },
            listNews: [1, 2, 3, 4],
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
        // if (this.isMobile) {
        //     await this.getListClub({
        //         pagination: {
        //             page: 1,
        //             pageSize: 3
        //         }
        //     })
        //     this.topListItem = [...this.listClub.items]
        //     await this.getListClub({
        //         pagination: {
        //             page: this.page,
        //             pageSize: 4
        //         }
        //     })
        //     this.mainListItem = [...this.listClub.items]
        // } else {
        //     await this.getListClub({
        //         pagination: {
        //             page: this.page,
        //             pageSize: 8
        //         }
        //     })
        //     this.topListItem = [...this.listClub.items]
        //     this.topListItem.length = 4
        //     this.mainListItem = this.listClub.items.splice(4, 4);
        // }
    },
    methods: {
        // ...mapActions({
        //     getListClub: "club/getListClub",
        //     getListClubMore: "club/getListClubMore",
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
    .club-content {
        margin-top: 50px;
    }

    .club-title {
        font-size: 20px;
        margin-bottom: 20px;

    }

    .club-aura-filter {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
    }

    .club-aura-filter-item {
        color: #AFAFAF;
        font-size: 10px;
        margin-right: 5px;
        font-family: 'inter-light';
        text-transform: uppercase;
        cursor: pointer;
    }

    .club-active {
        color: #000;
        font-family: 'inter';
    }
}
</style>