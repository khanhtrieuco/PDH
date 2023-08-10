<template>
    <div class="show-item">
        <NuxtLink :to="`/show/${item.slug}`">
            <div class="show-img">
                <ThumbImage ratio="3-4" :src="`images/news.jpg`"></ThumbImage>
            </div>
        </NuxtLink>
        <div class="show-title"> {{ item.title }}</div>
        <div class="show-des"> {{ get_excerpt(item.description, 37) }} </div>
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
                    image: '/images/show.jpg',
                    title: 'LIT EXHIBITION',
                    description: "Sun Life Vietnam"
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
.show-item {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    .show-img {
        position: relative;
    }

    .show-title {
        color: #000;
        font-family: 'Aeroport';
        font-size: 15px;
        font-weight: 600;
        margin-top: 20px;
    }

    .show-des {
        color: #000;
        font-family: 'Aeroport-light';
        font-size: 15px;
    }
}

@media (max-width: 520px) {
    .aura-title {
        font-weight: 700;
        font-size: 13px;
        line-height: 15px;
        color: #2F3036;
        text-align: left;
    }
}
</style>