<template>
    <div class="club-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="club-banner">
            <Banner :isMobile="isMobile" :listItem="topListItem" />
        </div>
        <h1 class="club-title">Aura Club</h1>
        <b-container v-if="!isMobile">
            <div class="club-aura-filter d-flex justify-content-around">
                <div :class="`club-aura-filter-item ${filter === 'all' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'all'; this.reloadData() }">{{ $t('Club_cate_all') }}</div>
                <div :class="`club-aura-filter-item ${filter === 'skincare' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'skincare'; this.reloadData() }">{{ $t('Club_cate_skincare') }}</div>
                <div :class="`club-aura-filter-item ${filter === 'knowledge' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'knowledge'; this.reloadData() }">{{ $t('Club_cate_knowledge') }}
                </div>
                <div :class="`club-aura-filter-item ${filter === 'news' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'news'; this.reloadData() }">{{ $t('Club_cate_news') }}
                </div>
            </div>
            <b-row>
                <b-col cols="6" v-for="(item, index) in mainListItem" :key="index">
                    <Item :isMobile="isMobile" :item="item" />
                </b-col>
            </b-row>
            <div class="club-view-more-btn" @click="viewMore()" v-show="showMore">{{ $t('Club_view_more') }}</div>
        </b-container>
        <b-container v-if="isMobile">
            <div class="club-aura-filter d-flex justify-content-around">
                <div :class="`club-aura-filter-item ${filter === 'all' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'all'; this.reloadData() }">{{ $t('Club_cate_all') }}</div>
                <div :class="`club-aura-filter-item ${filter === 'skincare' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'skincare'; this.reloadData() }">{{ $t('Club_cate_skincare') }}
                </div>
                <div :class="`club-aura-filter-item ${filter === 'knowledge' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'knowledge'; this.reloadData() }">{{ $t('Club_cate_knowledge') }}
                </div>
                <div :class="`club-aura-filter-item ${filter === 'news' ? 'club-active' : ''}`"
                    @click="() => { this.filter = 'news'; this.reloadData() }">{{ $t('Club_cate_news') }}
                </div>
            </div>
            <div class="club-list-item" v-for="(item, index) in mainListItem" :key="index">
                <Item :isMobile="isMobile" :item="item" />
            </div>
            <div class="club-view-more-btn" @click="viewMore()" v-show="showMore">{{ $t('Club_view_more') }}</div>
        </b-container>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import Banner from "~/components/club/banner.vue"
import Item from "~/components/club/clubItem.vue"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    components: {
        Banner,
        Item
    },
    computed: {
        ...mapGetters({
            listClub: "club/getListClub"
        }),
    },
    mixins: [general],
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: 'Club',
                    active: true
                }
            ],
            topListItem: [],
            mainListItem: [],
            page: 1,
            isMobile: false,
            showMore: true,
            filter: 'all'
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('Club'),
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        if (this.isMobile) {
            await this.getListClub({
                pagination: {
                    page: 1,
                    pageSize: 3
                }
            })
            this.topListItem = [...this.listClub.items]
            await this.getListClub({
                pagination: {
                    page: this.page,
                    pageSize: 4
                }
            })
            this.mainListItem = [...this.listClub.items]
        } else {
            await this.getListClub({
                pagination: {
                    page: this.page,
                    pageSize: 8
                }
            })
            this.topListItem = [...this.listClub.items]
            this.topListItem.length = 4
            this.mainListItem = this.listClub.items.splice(4, 4);
        }
    },
    methods: {
        ...mapActions({
            getListClub: "club/getListClub",
            getListClubMore: "club/getListClubMore",
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
        async reloadData() {
            let filters = {}
            this.page = 1

            if (this.filter !== 'all') {
                filters.category = this.filter
            }

            await this.getListClub({
                pagination: {
                    page: this.page,
                    pageSize: 4
                },
                filters
            })
            this.mainListItem = [...this.listClub.items]
            if (this.isMobile) {
                if (this.mainListItem.length >= this.listClub.pagination.total) {
                    this.showMore = false
                }
            }
            else {
                if ((this.mainListItem.length + 4) >= this.listClub.pagination.total) {
                    this.showMore = false
                }
            }
        },
        async viewMore() {
            this.page++
            await this.getListClub({
                pagination: {
                    page: this.page,
                    pageSize: 4
                }
            })
            this.mainListItem.push(...this.listClub.items)
            if (this.isMobile) {
                if (this.mainListItem.length >= this.listClub.pagination.total) {
                    this.showMore = false
                }
            }
            else {
                if ((this.mainListItem.length + 4) >= this.listClub.pagination.total) {
                    this.showMore = false
                }
            }
        }
    }
}
</script>
<style lang="scss">
.club-content {
    margin-top: 180px;
}

.club-title {
    color: #2F3036;
    text-align: center;
    font-size: 36px;
    margin-top: 40px;
    margin-bottom: 40px;
}

.club-view-more-btn {
    margin-top: 50px;
    margin-bottom: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 210px;
    height: 50px;
    line-height: 48px;
    border-radius: 25px;
    border: 1px solid #515151;
    background: #FFF;
    color: #2F3036;
    text-align: center;
    font-size: 16px;
    font-family: 'inter';
    cursor: pointer;
}

.club-aura-filter {
    width: 390px;
    margin-bottom: 16px;
}

.club-aura-filter-item {
    color: #AFAFAF;
    font-size: 16px;
    margin-right: 16px;
    font-family: 'inter-light';
    text-transform: uppercase;
    cursor: pointer;
}

.club-active {
    color: #000;
    font-family: 'inter';
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