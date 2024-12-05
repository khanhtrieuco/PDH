<template>
  <div>
    <div v-if="!isMobile" class="home-top-video">
      <ThumbImage v-if="banner.attributes && banner.attributes.type_source === 'video'" :sourceVideo="banner.attributes?.imagelink.data?.attributes.url"
        :nameClass="'image-banner'" :contain="false" :video="true" ratio="16-9" />
      <!-- <ThumbImage v-if="banner.attributes && banner.attributes.type_source === 'image'" :src="banner.attributes?.imagelink.data?.attributes.url"
        :nameClass="'image-banner'" :contain="false" ratio="16-9" /> -->
      <img v-if="banner.attributes && banner.attributes.type_source === 'image'" :src="banner.attributes?.imagelink.data?.attributes.url"
        class="image-banner" style="width: 100%"/>  
      <div class="home-top-content">
        <img class="home-top-name-img" :src="banner.attributes?.name.data?.attributes.url" />
        <div class="home-top-name-des">{{ banner.attributes?.description }}</div>
        <div class="shop-now-link-home" @click="banner.attributes?.link ? goPage(banner.attributes?.link) : ()=>{}">
          <span class="shop-now-link-text">Shop now</span>
          <img class="shop-now-link-img" src="/images/more.png" />
        </div>
      </div>
    </div>
    <div v-if="isMobile" class="home-top-video">
      <ThumbImage v-if="banner.attributes && banner.attributes.type_source === 'video'" :sourceVideo="banner.attributes?.imagelink_mobile.data?.attributes.url"
        :nameClass="'image-banner'" :contain="false" :video="true" ratio="9-21" />
      <ThumbImage v-if="banner.attributes && banner.attributes.type_source === 'image'" :srcImg="banner.attributes?.imagelink_mobile.data?.attributes.url"
        :nameClass="'image-banner'" :contain="false" ratio="9-21" />
      <div class="home-top-content container">
        <img class="home-top-name-img" :src="banner.attributes?.name.data?.attributes.url" />
        <div class="home-top-name-des">{{ banner.attributes?.description }}</div>
        <div class="shop-now-link-home" @click="banner.attributes?.link ? goPage(banner.attributes?.link) : ()=>{}">
          <span class="shop-now-link-text">Shop now</span>
          <img class="shop-now-link-img" src="/images/more.png" />
        </div>
      </div>
    </div>

    <Collections :isMobile="isMobile" />
    <!-- <BannerAbout v-if="isMobile" :isMobile="isMobile" /> -->

    <div class="about-home" style="background-image: url('/images/home_bg_about.jpg');" v-if="!isMobile">
      <div class="about-home-content container">
        <img class="about-home-img-model" src="/images/home-about-model.jpg" />
        <div class="about-home-text-content">
          <div class="about-home-name"><img class="about-home-img-text" src="/images/a1.svg" /></div>
          <div class="about-home-name"><img class="about-home-img-text" src="/images/a2.svg" /></div>
          <div class="about-home-name-1"><img class="about-home-img-text" src="/images/a3.svg" /></div>
          <div class="about-home-sub-content">
            <div class="about-home-text">{{ $t('Home_about') }}</div>
          </div>
          <img class="about-home-read" src="/images/read-now.svg" @click="goAbout()" />
        </div>
      </div>
    </div>
    <!-- <div class="about-home" style="background-image: url('/images/home_bg_aboutm.jpg');" v-if="isMobile">
      <div class="about-home-img-left">
        <img class="about-home-img-mobile" src="/images/home-about-modelm.jpg" />
      </div>
      <div class="about-home-right-content">
        <div class="about-home-mobile-text">
          <div class="about-home-mobile-text-div">HOUSE OF</div>
        </div>
        <div class="about-home-mobile-text">
          <div class="about-home-mobile-text-div">PHAN</div>
        </div>
        <div class="about-home-mobile-text">
          <div class="about-home-mobile-text-div">DANG</div>
        </div>
        <div class="about-home-mobile-text">
          <div class="about-home-mobile-text-div">HOANG</div>
        </div>
        <div class="about-home-sub-content">
          <div class="about-home-text">{{ $t('Home_about') }}</div>
          <img class="about-home-read" src="/images/read-now.svg" @click="goAbout()" />
        </div>
      </div>
    </div> -->

    <!-- <News :isMobile="isMobile" /> -->
    <!-- <Store :isMobile="isMobile" /> -->
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
    setTimeout(() => { this.animateOnScroll() }, 1000)
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
    goPage(url) {
      this.$router.push({ path: this.localePath(url) })
    },
    goAbout() {
      this.$router.push({ path: '/house-of-pdh' })
    },
    animateOnScroll() {
      if (this.isMobile) {
        this.$gsap.fromTo('.about-home-img-mobile',
          { x: -200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 4,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.collection-container',
              start: 'top top',
              end: '+=300',
              scrub: true
            }
          })
        this.$gsap.fromTo('.about-home-mobile-text-div',
          { y: 100, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.collection-container',
              start: 'top top',
              end: '+=300',
              scrub: true
            }
          })
        this.$gsap.fromTo('.about-home-text',
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 4,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.collection-container',
              start: 'top top',
              end: '+=300',
              scrub: true
            }
          })
        this.$gsap.fromTo('.about-home-read',
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.collection-container',
              start: 'top top',
              end: '+=300',
              scrub: true
            }
          })
      } else {
        this.$gsap.fromTo('.about-home-img-model',
          { x: -200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 2,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.about-home-read',
              start: 'top +=1200px',
              scrub: true
            }
          })
        this.$gsap.fromTo('.about-home-img-text',
          { y: 300, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.about-home-read',
              start: 'top +=1200px',
              scrub: true
            }
          })
        this.$gsap.fromTo('.about-home-text',
          { y: 500, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: 'Power4.easeInOut',
            scrollTrigger: {
              trigger: '.about-home-read',
              start: 'top +=1200px',
              scrub: true
            }
          })
      }
    }
    // async loadData() {
    //   await this.getListWork()
    // }
  }
}
</script>
<style lang="scss" scoped>
.home-top-video {
  position: relative;
  min-height: 900px;
  background-color: #000;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 160px 0px;
  overflow: hidden;

  .about-home-content {
    position: relative;
    display: inline-block;
    text-align: center;
    padding: 0px 0px;
    margin-left: auto;
    margin-right: auto;

    .about-home-img-model {
      display: inline-block;
      width: 22%;
      margin-right: 30px;
    }

    .about-home-text-content {
      display: inline-block;
      position: relative;
      float: right;
      width: calc(77% - 30px);

      .about-home-name {
        height: 113px;
        overflow: hidden;
        text-align: left;
        margin-bottom: 40px;

        .about-home-img-text {
          height: 100%;
        }
      }

      .about-home-name-1 {
        height: 113px;
        overflow: hidden;
        text-align: right;
        margin-bottom: 5px;

        .about-home-img-text {
          height: 100%;
        }
      }

      .about-home-text {
        position: absolute;
        left: 0px;
        bottom: 0px;
        color: #000;
        text-align: left;
        font-family: "Aeroport-light";
        font-size: 16px;
        width: 388px;
      }

      .about-home-sub-content {
        height: 125px;
        width: 388px;
        overflow: hidden;
        position: absolute;
        left: 0px;
        bottom: 0px;
      }

      .about-home-read {
        position: absolute;
        right: -50px;
        top: 0px;
        width: 100px;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 520px) {
  .home-top-video {
    position: relative;
    min-height: 600px;
    margin-top: -47px;
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
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    padding: 30px 0px;
    overflow: hidden;

    .about-home-img-left {
      width: 50%;
      float: left;
      text-align: right;
      overflow: hidden;

      .about-home-img-mobile {
        height: 240px;
        margin-right: 10px;
      }
    }

    .about-home-right-content {
      position: relative;
      height: 240px;
      width: 50%;
      float: right;
      padding-left: 10px;
      margin-top: -5px;

      .about-home-text {
        position: absolute;
        bottom: 20px;
        color: #000;
        text-align: left;
        font-family: "Aeroport-light";
        font-size: 9px;
        width: 160px;
      }

      .about-home-read {
        position: absolute;
        bottom: -5px;
        left: 0px;
        width: 75px;
      }

      .about-home-sub-content {
        height: 125px;
        overflow: hidden;
        position: relative;
      }

      .about-home-mobile-text {
        height: 30px;
        overflow: hidden;

        .about-home-mobile-text-div {
          font-size: 50px;
          line-height: 22px;
          font-size: 34px;
          font-family: "Aeroport";
          color: #000;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
