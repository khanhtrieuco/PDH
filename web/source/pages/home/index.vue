<template>
  <div>
    <div v-if="!isMobile" class="home-top-video">
      <ThumbImage v-if="banner.attributes" :sourceVideo="banner.attributes?.imagelink_mobile.data?.attributes.url"
        :nameClass="'image-banner'" :contain="false" :video="true" ratio="16-9" />
      <div class="home-top-content">
        <img class="home-top-name-img" :src="banner.attributes?.name.data?.attributes.url" />
        <div class="home-top-name-des">{{ banner.attributes?.description }}</div>
        <div class="shop-now-link-home">
          <span class="shop-now-link-text">Shop now</span>
          <img class="shop-now-link-img" src="/images/more.png" />
        </div>
      </div>
    </div>
    <div v-if="isMobile" class="home-top-video">
      <ThumbImage v-if="banner.attributes" :sourceVideo="banner.attributes?.imagelink_mobile.data?.attributes.url"
        :nameClass="'image-banner'" :contain="false" :video="true" ratio="9-21" />
      <div class="home-top-content container">
        <img class="home-top-name-img" :src="banner.attributes?.name.data?.attributes.url" />
        <div class="home-top-name-des">{{ banner.attributes?.description }}</div>
        <div class="shop-now-link-home">
          <span class="shop-now-link-text">Shop now</span>
          <img class="shop-now-link-img" src="/images/more.png" />
        </div>
      </div>
    </div>

    <Collections :isMobile="isMobile" />
    <!-- <BannerAbout v-if="isMobile" :isMobile="isMobile" /> -->
    <div class="about-home" v-if="!isMobile">
      <img class="about-home-img-background" src="/images/home-about.jpg" />
      <div class="about-home-text">{{ $t('Home_about') }}</div>
      <img class="about-home-read" src="/images/read-now.svg" @click="goAbout()"/>

    </div>
    <div class="about-home" v-if="isMobile">
      <img class="about-home-img-background" src="/images/home-about-m.jpg" />
      <div class="abount-home-mobile">
        <img class="about-home-title-mobile" src="/images/about-text.svg" />
        <div class="about-home-text-mobile">{{ $t('Home_about') }}</div>
        <img class="about-home-read-mobile" src="/images/read-now.svg" @click="goAbout()"/>
      </div>
    </div>
    <News :isMobile="isMobile" />
    <Store :isMobile="isMobile" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
// import Banner from "~/components/home/banner.vue"
import Collections from "~/components/home/collection.vue"
// import BannerAbout from "~/components/home/bannerAbout.vue"
import News from "~/components/home/news.vue"
import Store from "~/components/home/store.vue"

export default {
  name: 'IndexPage',
  components: {
    // Banner,
    Collections,
    // BannerAbout,
    News,
    Store,
  },
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    ...mapGetters({
      banner: "banner/getBannerTop",
    }),
  },
  mounted() {
    // if (!this.$route.hash) {
    //   window.scrollTo({ top: 0, behavior: 'smooth' })
    // }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.isMobile = this.checkMobile()
    this.getBannerTop()
  },
  methods: {
    ...mapActions({
      getBannerTop: "banner/getBannerTop"
    }),
    checkMobile() {
      if (!process.server) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      }
    },
    goAbout() {
      this.$router.push({ path: '/house-of-pdh' })
    }
    // async loadData() {
    //   await this.getListWork()
    //   console.log(this.listWork)
    // }
  }
}
</script>
<style lang="scss" scoped>
.home-top-video {
  position: relative;

  .home-top-content {
    position: absolute;
    bottom: 160px;
    left: 20%;
    width: 300px;

    .home-top-name-img {
      width: 100%;
    }

    .home-top-name-des {
      color: #FFF;
      font-family: 'Aeroport-light';
      font-size: 15px;
      font-style: normal;
      margin: 30px 0px;
    }
  }
}

.shop-now-link-home {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .shop-now-link-text {
    color: #FFF;
    font-family: 'Aeroport-light';
    font-size: 15px;
    text-transform: uppercase;
    margin-right: 10px;
  }

  .shop-now-link-img {
    width: 12px;
  }
}

.about-home {
  width: 100%;
  position: relative;

  .about-home-img-background {
    width: 100%;
  }
  .about-home-text {
    position: absolute;
    bottom: 29.5%;
    left: 28.5%;
    color: #000;
    font-family: "Aeroport-light";
    font-size: 16px;
    width: 388px;
  }
  .about-home-read{
    position: absolute;
    right: 30px;
    top: 260px;
    width: 100px;
    cursor: pointer;
  }
}

@media (max-width: 520px) {
  .home-top-video {
    position: relative;

    .home-top-content {
      position: absolute;
      bottom: 120px;
      left: 15px;
      width: 300px;

      .home-top-name-img {
        width: 190px;
      }

      .home-top-name-des {
        color: #FFF;
        font-family: 'Aeroport-light';
        font-size: 12px;
        font-style: normal;
        margin: 20px 0px;
        width: 240px;
      }
    }
  }

  .shop-now-link-home {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    .shop-now-link-text {
      color: #FFF;
      font-family: 'Aeroport-light';
      font-size: 11px;
      text-transform: uppercase;
      margin-right: 10px;
    }

    .shop-now-link-img {
      width: 12px;
    }
  }

  .about-home {
    width: 100%;
    position: relative;

    .about-home-img-background {
      width: 100%;
    }

    .abount-home-mobile {
      position: absolute;
      top: 0px;
      left: calc(50% + 5px);
      .about-home-title-mobile {
        width: 146px;
      }
      .about-home-text-mobile {
        color: #000;
        font-family: "Aeroport-light";
        font-size: 9px;
        width: 164px;
        margin-top: 5px;
      }
      .about-home-read-mobile{
          width: 70px;
          cursor: pointer;
      }
    }
  }
}
</style>
