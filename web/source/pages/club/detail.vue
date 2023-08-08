<template>
    <div class="detail-club-content">
        <b-container style="position: relative" v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="detail-club-image">
            <ThumbImage ratio="21-9" :src="club.attributes?.thub.data?.attributes.url"></ThumbImage>
        </div>
        <b-container class="d-flex justify-content-between" v-if="!isMobile">
            <div class="detail-left-info">
                <h1 class="detail-club-title">{{ $i18n.locale === 'vn' ? club.attributes?.title : club.attributes?.title_en
                }}</h1>
                <div class="detail-club-des">{{ $i18n.locale === 'vn' ? club.attributes?.short_content :
                    club.attributes?.short_content_en }}</div>
                <div class="club-social-panel d-flex justify-content-start">
                    <img class="club-social-icon" src="/images/tiktok1.png " />
                    <img class="club-social-icon" src="/images/face.png " />
                    <img class="club-social-icon" src="/images/insta.png " />
                </div>
            </div>
            <div class="detail-right-info">
                <!-- <div class="detail-club-text" v-html="$md.render(club?.attributes?.content ?? '')"></div> -->
                <div class="detail-club-text"
                    v-html="showHtmlText($i18n.locale === 'vn' ? club?.attributes?.content : club?.attributes?.content_en)">
                </div>
            </div>
        </b-container>
        <b-container v-if="isMobile">
            <div class="detail-club-category">{{ club.attributes?.category }}</div>
            <h1 class="detail-club-title">{{ $i18n.locale === 'vn' ? club.attributes?.title : club.attributes?.title_en }}
            </h1>
            <div class="detail-club-des">{{ $i18n.locale === 'vn' ? club.attributes?.short_content :
                club.attributes?.short_content_en }}</div>
            <div class="club-social-panel d-flex justify-content-start">
                <img class="club-social-icon" src="/images/tiktok1.png " />
                <img class="club-social-icon" src="/images/face.png " />
                <img class="club-social-icon" src="/images/insta.png " />
            </div>
            <div class="detail-club-text"
                v-html="showHtmlText($i18n.locale === 'vn' ? club?.attributes?.content : club?.attributes?.content_en)">
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
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: 'Aura Club',
                    href: '/aura-club'
                },
                {
                    text: this.club?.attributes?.name,
                    active: true
                }
            ],
            isMobile: false
        }
    },
    computed: {
        ...mapGetters({
            club: "club/getClub"
        }),
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
                        text: 'Aura Club',
                        href: '/aura-club'
                    },
                    {
                        text: this.$i18n.locale === 'vn' ? this.club?.attributes?.title : this.club?.attributes?.title_en,
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.loadData()
    },
    methods: {
        ...mapActions({
            getClubBySlug: "club/getClubBySlug"
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
                await this.getClubBySlug(this.$route.params.id)
                this.breadcrumb[2].text = this.$i18n.locale === 'vn' ? this.club?.attributes?.title : this.club?.attributes?.title_en
            }
        }
    }
}
</script>
<style lang="scss">
.detail-club-content {
    margin-top: 180px;
    margin-bottom: 160px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.detail-club-img {
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

.detail-club-title {
    color: #2F3036;
    font-size: 36px;
    margin-top: 40px;
}

.club-social-panel {
    margin-top: 20px;

    .club-social-icon {
        margin-right: 10px;
    }
}

.detail-club-des {
    color: #9C9C9C;
    font-size: 16px;
    font-family: 'inter-light';
    margin-top: 20px;
    text-transform: uppercase;
    padding-right: 10px;
}

.detail-club-text {
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
    .detail-club-content {
        margin-top: 50px;
    }

    .detail-club-category {
        color: #777;
        font-size: 10px;
        font-family: 'inter';
        text-transform: uppercase;
        margin-top: 20px;
    }

    .detail-club-title {
        color: #2F3036;
        font-size: 20px;
        margin-top: 16px;
    }

    .detail-club-des {
        text-transform: uppercase;
        font-family: 'inter-light';
        margin-top: 16px;
        color: #2F3036;
        font-size: 10px;
    }

    .detail-club-text {
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

    .club-social-panel {
        margin-top: 10px;

        .club-social-icon {
            margin-right: 10px;
            width: 20px;
        }
    }
}
</style>