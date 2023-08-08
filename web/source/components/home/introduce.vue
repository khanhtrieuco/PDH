<template>
  <div v-if="isMobile" class="mt-4 introduce-panel">
    <b-img class="img-modal" src="images/modal.png" fluid alt="image"></b-img>
    <div class="container">
      <div class="intro-content">
        <div class="intro-title">{{ $t('Home_intro_title') }}</div>
        <div class="intro-des">{{ $t('Home_intro_des') }}</div>
        <NuxtLink to="/ve-nas">
          <div class="intro-info">{{ $t('Home_intro_more') }}</div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-else class="introduce-panel">
    <b-img class="img-modal" src="/images/modal.png" fluid alt="image"></b-img>
    <div class="container">
      <div class="intro-content">
        <div class="intro-title">{{ $t('Home_intro_title') }}</div>
        <div class="intro-des">{{ $t('Home_intro_des') }}</div>
        <NuxtLink to="/ve-nas">
          <div class="intro-info">{{ $t('Home_intro_more') }}</div>
        </NuxtLink>
      </div>
    </div>
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
  mounted() {
    this.animateOnScroll()
  },
  watch: {
    isMobile: function (val) {
      this.animateOnScroll()
    },
  },
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    animateOnScroll() {
      console.log(this.isMobile)
      if (this.isMobile) {
        this.$gsap.fromTo('.img-modal',
          { y: 80 },
          {
            y: 0,
            duration: 3,
            ease: 'Power1.easeInOut',
            scrollTrigger: {
              trigger: '.content',
              pin: true,
              // end: 'bottom',
              scrub: true
            }
          })
        this.$gsap.fromTo('.intro-content',
          { y: -35 },
          {
            y: 0,
            duration: 3,
            ease: 'Power1.easeInOut',
            scrollTrigger: {
              trigger: '.content',
              pin: true,
              // end: 'bottom',
              scrub: true
            }
          })
      } else {
        this.$gsap.fromTo('.img-modal',
          { y: 450 },
          {
            y: 0,
            duration: 4,
            ease: 'Power1.easeInOut',
            scrollTrigger: {
              trigger: '.content',
              pin: true,
              end: 'bottom',
              scrub: true
            }
          })
        this.$gsap.fromTo('.intro-content',
          { y: -100 },
          {
            y: 100,
            duration: 4,
            ease: 'Power1.easeInOut',
            scrollTrigger: {
              trigger: '.content',
              pin: true,
              end: 'bottom',
              scrub: true
            }
          })
      }
    }
  }
}
</script>
<style lang="scss">
.section-one {
  width: 100%;
  position: relative;
}

.introduce-panel {
  height: 95vh;
  min-height: 1030px;
  position: relative;
  background-image: url('/images/gioithieu.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;

  .img-modal {
    position: absolute;
    bottom: 0px;
    left: 100px;
    width: 700px;
  }
}

.intro-content {
  position: absolute;
  bottom: 150px;
  right: 70px;
  width: 360px;
}

.intro-title {
  font-weight: 400;
  font-size: 45px;
  line-height: 60px;
  border-bottom: 1px solid #515151;
  padding-bottom: 28px;
  margin-bottom: 28px;
  padding-right: 30px;
}

.intro-des {
  font-family: 'inter-light';
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 34px;
}

.intro-info {
  font-family: 'inter';
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  text-decoration-line: underline;
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .introduce-panel {
    .img-modal {
      width: 650px;
    }
  }

  .intro-content {
    bottom: 110px;
    right: 130px;
    width: 390px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .introduce-panel {
    min-height: 740px;
    .img-modal {
      width: 550px;
    }
  }
  .intro-content {
    bottom: 50px;
    width: 330px;
  }

  .intro-title {
    font-size: 45px;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  .intro-des {
    margin-bottom: 28px;
  }
}

@media (max-width: 520px) {
  .introduce-panel {
    min-height: 400px;
    position: relative;
    background-image: url('/images/aboutm.jpg');
    background-size: 100%;
    height: 400px;
    // overflow: hidden;
    .img-modal {
      position: absolute;
      bottom: 0px !important;
      left: 0px !important;
      width: 240px !important;
      max-height: none !important;
      height: auto !important;
    }
  }

  .intro-content {
    bottom: 60px;
    right: 10px;
    width: 160px;

    .intro-title {
      font-size: 18px;
      color: #181717;
      line-height: 20px;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .intro-des {
      font-size: 10px;
      color: #818181;
      line-height: 12px;
      margin-bottom: 5px;
    }

    .intro-info {
      font-size: 8px;
      color: #484848;
    }
  }
}
</style>
