<template>
  <div class="banner-slide">
    <VueSlickCarousel v-bind="settings" class="list-banner" v-if="listBanner && listBanner.length">
      <div v-for="(item, index) in listBanner" :key="index">
        <div v-if="isMobile" class="banner-item">
          <img class="banner-img" :src="item.attributes?.imagelink_mobile.data?.attributes.url" />
        </div>
        <div v-else class="banner-item">
          <img class="banner-img" :src="item.attributes?.imagelink.data?.attributes.url" />
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      listBanner: "banner/getListBanner",
    }),
  },
  data() {
    return {
      settings:{
        "dots": true,
        "arrows": false,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }
  },
  async mounted() {
    await this.getListBanner({})
  },
  methods: {
    ...mapActions({
      getListBanner: "banner/getListBannerTop"
    }),
  }
}
</script>
<style lang="scss">
.banner-slide{
  width: 100%;
  height: 100vh;
}
.banner-img{
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.list-banner{
  .slick-dots{
    bottom: 40px !important;
  }
  .slick-dots li button:before{
    color: #FFFFFF !important;
  }
  .slick-dots li.slick-active button:before{
    color: #F593A5 !important;
  }
}
</style>
