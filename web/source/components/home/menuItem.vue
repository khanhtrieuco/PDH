<template>
    <div class="menu-item">
        <NuxtLink :to="link" v-if="type == 'show'">
            <div class="menu-item-img">
                <ThumbImage ratio="3-4" :src="image_link"></ThumbImage>
            </div>
        </NuxtLink>
        <a target="_blank" :href="link" v-if="type == 'news'">
            <div class="menu-item-img">
                <ThumbImage ratio="3-4" :src="image_link"></ThumbImage>
            </div>
        </a>
        <div class="menu-item-title"> {{ get_excerpt(title,85) }}</div>
    </div>
</template>
  
<script>
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        link: {
            type: String,
            default: 'false',
        },
        image_link: {
            type: String,
            default: '/images/menuitem.jpg',
        },
        title: {
            type: String,
            default: 'QUINTESSENCE',
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'show',
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
        // this.description = this.get_excerpt(this.item?.description, 100)
        this.title = this.get_excerpt(this.title, 100)
        // }
    }
}
</script>
<style lang="scss">
.menu-item {
    width: 100%;
    text-align: left;

    .menu-item-title {
        color: #000;
        font-family: 'Aeroport-light';
        font-size: 13px;
        font-weight: 600;
        line-height: 24px;
        margin-top: 20px;
        max-width: 310px;
        height: 50px;
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