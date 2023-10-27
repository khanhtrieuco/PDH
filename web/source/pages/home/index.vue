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
    <BannerAbout :isMobile="isMobile" />
    <News :isMobile="isMobile" />
    <Store :isMobile="isMobile" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
// import Banner from "~/components/home/banner.vue"
import Collections from "~/components/home/collection.vue"
import BannerAbout from "~/components/home/bannerAbout.vue"
import News from "~/components/home/news.vue"
import Store from "~/components/home/store.vue"

export default {
  name: 'IndexPage',
  components: {
    // Banner,
    Collections,
    BannerAbout,
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
}</style>
