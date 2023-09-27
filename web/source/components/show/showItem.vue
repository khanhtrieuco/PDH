<template>
    <div class="show-item">
        <NuxtLink :to="`/show/${item.attributes.slug}`">
            <div class="show-img">
                <ThumbImage ratio="3-4" :src="item.attributes.thub_mobile.data.attributes.url"></ThumbImage>
            </div>
        </NuxtLink>
        <div class="show-title"> {{ item.attributes.name }}</div>
        <div class="show-des"> {{ get_excerpt(item.attributes.short_content, 37) }} </div>
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
                    attributes: {
                        image: '/images/show.jpg',
                        name: 'LIT EXHIBITION',
                        short_content: "Sun Life Vietnam"
                    }
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
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
        }

        .show-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 9px;
        }
    }
}
</style>