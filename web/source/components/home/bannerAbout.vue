<template>
  <div class="banner-about">
    <img class="banner-about-img-top" src="/images/about-banner-black.png" />
    <VueSlickCarousel v-bind="settings" class="list-banner-about" v-if="!isMobile && listBanner && listBanner.length">
      <div v-for="(item, index) in listBanner" :key="index">
        <div class="banner-about-item">
          <img class="banner-about-img" :src="item.attributes?.imagelink.data?.attributes.url" />
          <!-- <div class="banner-about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nulla urna, rutrum
            ut est quis, imperdiet auctor ipsum.</div> -->
        </div>
      </div>
      <!-- <template slot="prevArrow">
        <div class="pre-arrow">
          <img src="/images/left-w.png" />
        </div>
      </template>
      <template slot="nextArrow">
        <div class="next-arrow">
          <img src="/images/right-w.png" />
        </div>
      </template> -->
    </VueSlickCarousel>
    <VueSlickCarousel v-bind="settings" class="list-banner-about" v-if="isMobile && listBanner && listBanner.length">
      <div v-for="(item, index) in listBanner" :key="index">
        <div class="banner-about-item">
          <img class="banner-about-img" :src="item.attributes?.imagelink_mobile.data?.attributes.url" />
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
      listBanner: "banner/getListBannerAbout",
    }),
  },
  data() {
    return {
      settings: {
        "dots": false,
        "autoplay": true,
        "autoplaySpeed": 5000,
        "arrows": true,
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
      getListBanner: "banner/getListBannerAbout"
    }),
  }
}
</script>
<style lang="scss">
.banner-about {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  text-align: center;

  .banner-about-img-top {
    width: 470px;
    margin-bottom: 80px;
  }

  .banner-about-item {
    position: relative;

    .banner-about-img {
      width: 100%;
      // height: 100vh;
      object-fit: cover;
    }

    .banner-about-text {
      color: #FFF;
      text-align: center;
      font-family: 'Aeroport-light';
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;
      position: absolute;
      width: 550px;
      left: 50%;
      transform: translate(-50%);
      bottom: 150px;
    }
  }


  .list-banner-about {
    .slick-prev {
      width: 45px;
      z-index: 1;
      left: calc(50% - 670px);
      top: 75%;

      img {
        width: 45px;
      }
    }

    .slick-next {
      width: 45px;
      z-index: 1;
      right: calc(50% - 670px);
      top: 75%;

      img {
        width: 45px;
      }
    }
  }
}

@media (max-width: 820px) {
  .banner-about {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    text-align: center;

    .banner-about-img-top {
      width: 80%;
      margin-bottom: 50px;
    }
  }
}

@media (max-width: 520px) {
  .banner-about {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    text-align: center;

    .banner-about-img-top {
      width: 80%;
      margin-bottom: 30px;
    }
  }
}
</style>
