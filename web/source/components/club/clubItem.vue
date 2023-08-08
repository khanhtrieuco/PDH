<template>
    <div class="club-item">
        <NuxtLink :to="`/club/${item.attributes.slug}`">
            <img class="club-item-img w-100" :src="item.attributes?.thub.data?.attributes.url" fluid alt="Fluid image"
                v-if="!isMobile" />
            <ThumbImage class="club-item-img" ratio="21-9" :src="item.attributes?.thub.data?.attributes.formats?.medium.url" v-else>
            </ThumbImage>
        </NuxtLink>
        <div class="club-item-category">{{ getClubCategory(item.attributes.category,$i18n.locale) }}</div>
        <NuxtLink :to="`/club/${item.attributes.slug}`">
            <div class="club-item-title">
                {{ $i18n.locale === 'vn' ? item.attributes.title : item.attributes.title_en }}
            </div>
        </NuxtLink>
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
.club-item {
    margin-bottom: 50px;
}

.club-item-category {
    color: #777;
    font-size: 12px;
    font-family: 'inter';
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 20px;
}

.club-item-title {
    color: #2F3036;
    font-size: 20px;
    margin-top: 10px;
}

.club-item-img {
    height: 250px;
    object-fit: cover;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px 0px rgba(13, 13, 13, 0.31);
}

@media (max-width: 520px) {
    .club-item {
        margin-bottom: 30px;
    }

    .club-item-category {
        margin-top: 16px;
    }

    .club-item-img {
        height: auto;
    }

    .club-item-title {
        font-size: 16px;
        margin-top: 8px;
    }
}
</style>
