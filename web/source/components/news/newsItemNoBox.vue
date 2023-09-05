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
}

@media (max-width: 520px) {
    .news-item {
        width: 100%;
        text-align: left;
        margin-bottom: 10px;

        .news-img-no-box {
            position: relative;
        }

        .news-title {
            color: #000;
            font-family: 'Aeroport';
            font-size: 10px;
            font-weight: 600;
            margin-top: 10px;
        }

        .news-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 9px;
        }
    }
}
</style>