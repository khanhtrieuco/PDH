<template>
    <div class="news-item">
        <NuxtLink :to="`/news/${item.slug}`">
            <div class="news-img-no-box">
                <ThumbImage ratio="3-4" :src="`images/news.jpg`"></ThumbImage>
            </div>
        </NuxtLink>
        <div class="news-title"> {{ item.title }}</div>
        <div class="news-des"> {{ get_excerpt(item.description, 37) }} </div>

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
                    image: '/images/news.jpg',
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
.news-item {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    .news-img-no-box {
        position: relative;
    }

    .news-title {
        color: #000;
        font-family: 'Aeroport';
        font-size: 15px;
        font-weight: 600;
        margin-top: 20px;
    }

    .news-des {
        color: #000;
        font-family: 'Aeroport-light';
        font-size: 15px;
    }

    .news-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        background-color: #fff;
        padding: 4px;

        div {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #000;
        }
    }

    .news-dot1 {
        left: -7px;
        top: -7px;
    }

    .news-dot2 {
        right: -5px;
        top: -7px;
    }

    .news-dot3 {
        left: -7px;
        bottom: -4px;
    }

    .news-dot4 {
        right: -5px;
        bottom: -4px;
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