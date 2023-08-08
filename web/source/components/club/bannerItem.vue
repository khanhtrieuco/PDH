<template>
    <div class="club-aura-item d-flex justify-content-between" v-if="!isMobile">
        <div class="club-aura-item-left-info">
            <div class="club-aura-item-category">{{ getClubCategory(item.attributes.category,$i18n.locale) }}</div>
            <NuxtLink :to="`/club/${item.attributes.slug}`">
                <div class="club-aura-item-title mt-3 mb-3">
                    {{ $i18n.locale === 'vn' ? item.attributes.title : item.attributes.title_en }}
                </div>
            </NuxtLink>
            <div class="club-aura-item-description mb-3">
                {{ get_excerpt($i18n.locale === 'vn' ? item.attributes.short_content : item.attributes.short_content_en, 90) }}
            </div>
            <NuxtLink :to="`/club/${item.attributes.slug}`">
                <div class="club-aura-item-more">{{ $t('Club_read_more') }}</div>
            </NuxtLink>
        </div>
        <div class="club-aura-item-right-image">
            <NuxtLink :to="`/club/${item.attributes.slug}`">
                <img class="aura-img w-100" :src="item.attributes?.thub.data?.attributes.url" fluid alt="Fluid image" />
            </NuxtLink>
        </div>
    </div>
    <div class="club-aura-item" v-else>
        <NuxtLink :to="`/club/${item.attributes.slug}`">
            <ThumbImage class="club-item-img" ratio="21-9" :src="item.attributes?.thub.data?.attributes.url"></ThumbImage>
        </NuxtLink>
        <b-container>
            <div class="club-aura-item-category">{{ getClubCategory(item.attributes.category,$i18n.locale) }}</div>
            <NuxtLink :to="`/club/${item.attributes.slug}`">
                <div class="club-aura-item-title">
                    {{ $i18n.locale === 'vn' ? item.attributes.title : item.attributes.title_en }}
                </div>
            </NuxtLink>
            <div class="club-aura-item-description">
                {{ get_excerpt($i18n.locale === 'vn' ? item.attributes.short_content : item.attributes.short_content_en, 90) }}
            </div>
            <NuxtLink :to="`/club/${item.attributes.slug}`">
                <div class="club-aura-item-more">{{ $t('Club_read_more') }}</div>
            </NuxtLink>
        </b-container>
    </div>
</template>
  
<script>
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        item: {
            type: Object,
            default: () => {
                return {
                    image: '/images/aura1.jpg',
                    category: 'Chăm sóc da',
                    title: 'Cac hoat dong cua Nas Community',
                    description: "That's why NAS is committed to providing the best quality and most effective cosmetic and dietary supplements at affordable prices for you and your loved ones."
                }
            }
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            description: ''
        }
    },
    mounted() {
        // let lang = 'en'
        // let lland = window.localStorage.getItem('lang')
        // if (lland) {
        //   lang = lland
        // }
        // if (lang === 'vn') {
        // this.description = this.get_excerpt(this.item.description_vn, 150)
        // } else {
        this.description = this.get_excerpt(this.item.description, 100)
        // }
    }
}
</script>
<style lang="scss">
.club-aura-item-left-info {
    width: 270px;
}

.club-aura-item-right-image {
    width: calc(100% - 320px);
    padding-right: 3px;
}

.club-aura-item-category {
    color: #777;
    font-size: 12px;
    font-family: 'inter';
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 20px;
}

.club-aura-item-title {
    color: #2F3036;
    font-size: 26px;
    margin-top: 10px;
}

.club-aura-item-description {
    color: #2F3036;
    font-size: 13px;
    font-family: 'inter-light';
    text-transform: uppercase;
    margin-top: 20px;
}

.club-aura-item-more {
    color: #2F3036;
    font-size: 12px;
    font-family: 'inter';
    font-weight: 600;
    text-decoration-line: underline;
    margin-top: 30px;
}

@media (max-width: 520px) {
    .aura-title {
        font-weight: 700;
        font-size: 13px;
        line-height: 15px;
        color: #2F3036;
        text-align: left;
    }

    .club-aura-item-title {
        margin-top: 10px;
        font-size: 20px;
        line-height: 20px;
    }

    .club-aura-item-description {
        font-size: 10px;
    margin-top: 16px;

    }

    .club-aura-item-more {
    margin-top: 16px;
        font-size: 10px;
    }
}
</style>