<template>
  <div class="banner-distributor-slide">
    <VueSlickCarousel v-bind="settings" class="list-banner-distributor" v-if="listBanner && listBanner.length">
      <div v-for="(item, index) in listBanner" :key="index" v-if="type === 'Trang chủ'">
        <div v-if="isMobile" class="banner-distributor-item">
          <img class="banner-distributor-img" :src="item.attributes?.imagelink_mobile.data?.attributes.formats?.large.url" />
        </div>
        <div v-else class="banner-distributor-item">
          <img class="banner-distributor-img" :src="item.attributes?.imagelink.data?.attributes.url" />
        </div>
      </div>
      <div v-for="(item, index) in listBanner" :key="index" v-if="type === 'Kinh doanh'">
        <div v-if="isMobile" class="banner-distributor-item">
          <!-- <img class="banner-img" :src="item.attributes?.imagelink_mobile.data?.attributes.url" /> -->
          <ThumbImage ratio="4-3" :src="item.attributes?.imagelink_mobile.data?.attributes.formats?.large.url"></ThumbImage>
        </div>
        <div v-else class="banner-distributor-item">
          <img class="banner-distributor-img" :src="item.attributes?.imagelink.data?.attributes.url" />
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
  props: {
    type: {
      type: String,
      default: 'Trang chủ',
    },
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
    await this.getListBanner({
      filters: {
        type : this.type
      }
    })
  },
  methods: {
    ...mapActions({
      getListBanner: "banner/getListBanner"
    }),
  }
}
</script>
<style lang="scss">
.banner-distributor-slide{
  width: 100%;
}
.banner-distributor-img{
  width: 100%;
  object-fit: cover;
}
.list-banner-distributor{
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
