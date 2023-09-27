<template>
    <div class="show-content container">
        <img class="show-title-image" src="/images/show.png" />
        <div class="list-main-show">
            <b-row v-if="listShow && listShow.length > 0">
                <b-col class="mb-3" cols="6" lg="3" v-for="(show, idx) in listShow" :key="idx">
                    <NuxtLink :to="`/show/${show.attributes.slug}`">
                        <ShowItem :isMobile="isMobile" :item="show" />
                    </NuxtLink>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import ShowItem from "~/components/show/showItem.vue"

export default {
    name: 'IndexPage',
    components: {
        ShowItem,
    },
    computed: {
        ...mapGetters({
            listShow: "show/getListShow"
        }),
    },
    mixins: [general],
    data() {
        return {
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
        this.getListShow()
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
        ...mapActions({
            getListShow: "show/getListShow",
            // getListClubMore: "club/getListClubMore",
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
.show-content {
    padding-top: 100px;
    padding-bottom: 100px;
    text-align: center;

    .show-title-image {
        margin: auto;
    }

    .list-main-show {
        margin-top: 100px;
    }
}

@media (max-width: 520px) {
    .show-content {
        padding-top: 60px;
        padding-bottom: 60px;
        text-align: center;

        .show-title-image {
            margin: auto;
            width: 140px;
        }

        .list-main-show {
            margin-top: 40px;
        }
    }
}
</style>