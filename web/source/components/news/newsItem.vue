<template>
    <div class="news-item">
        <NuxtLink :to="`/news/${item.slug}`">
            <div class="news-img">
                <ThumbImage ratio="3-4" :src="`images/news.jpg`"></ThumbImage>
                <div class="news-dot news-dot1">
                    <div></div>
                </div>
                <div class="news-dot news-dot2">
                    <div></div>
                </div>
                <div class="news-dot news-dot3">
                    <div></div>
                </div>
                <div class="news-dot news-dot4">
                    <div></div>
                </div>
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

    .news-img {
        border: 1px solid #000;
        padding: 6px;
        margin: 8px;
        position: relative;
    }

    .news-title {
        color: #000;
        font-family: 'Aeroport';
        font-size: 15px;
        font-weight: 600;
        margin-top: 20px;
        padding: 0px 15px;
    }

    .news-des {
        color: #000;
        font-family: 'Aeroport-light';
        font-size: 15px;
        padding: 0px 15px;
    }

    .news-dot {
        width: 16px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        background-color: #fff;
        padding: 4px;

        div {
            width: 8px;
            height: 6px;
            border-radius: 50%;
            background-color: #000;
        }
    }

    .news-dot1 {
        left: -8px;
        top: -7px;
    }

    .news-dot2 {
        right: -8px;
        top: -7px;
    }

    .news-dot3 {
        left: -8px;
        bottom: -4px;
    }

    .news-dot4 {
        right: -8px;
        bottom: -4px;
    }
}

@media (max-width: 520px) {
    .news-item {
        width: 100%;
        text-align: left;

        .news-img {
            border: 0.7px solid #000;
            padding: 3px;
            margin: 4px;
            position: relative;
        }

        .news-title {
            color: #000;
            font-family: 'Aeroport';
            font-size: 10px;
            font-weight: 600;
            margin-top: 10px;
            margin-left: -10px;
        }

        .news-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 10px;
            margin-left: -10px;
        }

        .news-dot {
            width: 9.5px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            background-color: #fff;
            padding: 3px;

            div {
                width: 5px;
                height: 3px;
                border-radius: 50%;
                background-color: #000;
            }
        }

        .news-dot1 {
            left: -5.5px;
            top: -5px;
        }

        .news-dot2 {
            right: -4.5px;
            top: -5px;
        }

        .news-dot3 {
            left: -5.5px;
            bottom: -4px;
        }

        .news-dot4 {
            right: -4px;
            bottom: -4px;
        }
    }
}
</style>