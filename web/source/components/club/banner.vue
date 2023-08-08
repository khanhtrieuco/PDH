<template>
    <div class="club-banner container" v-if="!isMobile">
        <VueSlickCarousel v-bind="settings" class="club-aura-banner" v-if="listItem && listItem.length">
            <div v-for="(item, index) in listItem" :key="index">
                <Item :isMobile="isMobile" :item="item" />
            </div>
        </VueSlickCarousel>
    </div>
    <div class="club-mobile-banner" v-else>
        <VueSlickCarousel v-bind="settings" class="club-aura-banner" v-if="listItem && listItem.length">
            <div v-for="(item, index) in listItem" :key="index">
                <Item :isMobile="isMobile" :item="item" />
            </div>
        </VueSlickCarousel>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import Item from "~/components/club/bannerItem.vue"

export default {
    components: {
        Item
    },
    props: {
        listItem: {
            type: Array,
            default: []
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            settings: {
                "dots": true,
                "arrows": false,
                "edgeFriction": 0.35,
                "infinite": false,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            }
        }
    }
}
</script>
<style lang="scss">
.banner-slide {
    width: 100%;
}

.banner-img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
}

.club-aura-banner {
    .slick-dots {
        bottom: 30px;
        left: 0px;
        width: auto;
    }

    .slick-dots li button:before {
        color: #C3C3C3 !important;
    }

    .slick-dots li.slick-active button:before {
        color: #2F3036 !important;
    }
}

@media (max-width: 520px) {
    .club-mobile-banner {
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
        padding-bottom: 60px;
    }

    .club-aura-banner {
        .slick-dots {
            bottom: -30px;
            left: 25px;
            width: auto;

            li {
                margin: 0px 0px;
            }
        }

        .slick-dots li button:before {
            color: #C3C3C3 !important;
        }

        .slick-dots li.slick-active button:before {
            color: #2F3036 !important;
        }
    }
}
</style>
  