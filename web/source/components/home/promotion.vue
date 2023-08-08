<template>
  <div class="promotion-slide" v-if="isMobile">
    <h4 class="p-promotion-title mb-5">{{ $t('Home_promotion') }}</h4>
    <VueSlickCarousel v-bind="settings" class="list-inno">
      <div class="promotion-item">
        <div class="promotion-content">
          <div class="promotion-title mb-3">{{ $t('Home_offer') }}</div>
          <div class="promotion-input input-group">
            <input type="text" class="form-control" placeholder="Email" aria-label="Email">
            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary">{{ $i18n.locale === 'vn' ? 'Nhận ưu đãi' : 'Get offers'}}</button>
            </div>
          </div>
        </div>
        <img class="promotion-img" src="/images/m_promotion_1.jpg"></img>
      </div>
      <div class="promotion-item">
        <div class="promotion-content">
          <div class="promotion-title mb-3">{{ $t('Home_offer_1') }}</div>
          <div class="promotion-input input-group">
            <input type="text" class="form-control" placeholder="Email" aria-label="Email">
            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary">{{ $i18n.locale === 'vn' ? 'Nhận ưu đãi' : 'Get offers'}}</button>
            </div>
          </div>
        </div>
        <img class="promotion-img" src="/images/m_promotion_2.jpg"></img>
      </div>
      <template slot="prevArrow">
        <div class="pre-arrow-promotion">
          <img src="/images/wleft.png"></img>
        </div>
      </template>
      <template slot="nextArrow">
        <div class="next-arrow-promotion">
          <img src="/images/wright.png"></img>
        </div>
      </template>
    </VueSlickCarousel>
  </div>
  <div class="promotion-slide" v-else>
    <h4 class="p-promotion-title mb-5">{{ $t('Home_promotion') }}</h4>
    <VueSlickCarousel v-bind="settings" class="list-inno pt-6">
      <div class="promotion-item">
        <div class="promotion-content">
          <div class="promotion-title mb-5">{{ $t('Home_offer') }}</div>
          <div class="promotion-input input-group">
            <input type="text" class="form-control" placeholder="Email" aria-label="Email">
            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary">{{ $i18n.locale === 'vn' ? 'Nhận ưu đãi' : 'Get offers'}}</button>
            </div>
          </div>
        </div>
        <img class="promotion-img" src="/images/promotion1.jpg"></img>
      </div>
      <div class="promotion-item">
        <div class="promotion-content">
          <div class="promotion-title mb-5">{{ $t('Home_offer_1') }}</div>
          <div class="promotion-input input-group">
            <input type="text" class="form-control" placeholder="Email" aria-label="Email">
            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary">{{ $i18n.locale === 'vn' ? 'Nhận ưu đãi' : 'Get offers'}}</button>
            </div>
          </div>
        </div>
        <img class="promotion-img" src="/images/promotion2.jpg"></img>
      </div>
      <template slot="prevArrow">
        <div class="pre-arrow-promotion">
          <img src="/images/wleft.png"></img>
        </div>
      </template>
      <template slot="nextArrow">
        <div class="next-arrow-promotion">
          <img src="/images/wright.png"></img>
        </div>
      </template>
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
  data() {
    return {
      settings: {
        "dots": false,
        "arrows": true,
        "autoplay": true,
        "draggable": false,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      },
    }
  },
  // computed: {
  //   ...mapGetters({
  //     listBanned: "common/getBanner"
  //   }),
  // },
  // components: {
  //   Video
  // },
  // async mounted() {
  //   this.isPlay = false
  //   this.isMobile = this.checkMobile()
  //   await this.getBanner()
  //   this.slide1 = this.$refs.slide1
  //   this.render(0)
  //   this.autoShowPlay()
  // },
  // methods: {
  //   onSlideStart(slide) {
  //     this.sliding = true
  //   },
  //   onSlideEnd(slide) {
  //     this.sliding = false
  //   }
  // }
}
</script>
<style lang="scss">
.promotion-slide {
  width: 100%;
}

.p-promotion-title {
  text-align: center;
  font-size: 36px;
}

.promotion-item {
  position: relative;
}

.promotion-img {
  width: 100%;
}

.pre-arrow-promotion {
  left: 130px !important;
  z-index: 1;
}

.next-arrow-promotion {
  right: 130px !important;
  z-index: 1;
}

.promotion-content {
  margin-top: 10%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  min-width: 700px;
}

.promotion-title {
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;
}

.promotion-input {
  width: 530px !important;
  left: 50%;
  transform: translate(-50%);

  input {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    padding-left: 16px;
  }
}

.input-group-append {
  width: 165px !important;

  button {
    width: 165px !important;
    background-color: black;
    color: white;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
}

@media (max-width: 520px) {
  .p-promotion-title {
    font-size: 24px;
    text-align: center;
  }

  .promotion-title {
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    text-transform: uppercase;
    width: 275px;
    margin-left: auto;
    margin-right: auto;
  }

  .promotion-input {
    width: 230px !important;

    input {
      height: 25px;
      line-height: 10px;
      font-size: 10px;
    }
  }

  .input-group-append {
    width: 100px !important;

    button {
      height: 25px;
      font-size: 10px;
      line-height: 10px;
    }
  }

  .pre-arrow-promotion {
    left: 25px !important;
  }

  .next-arrow-promotion {
    right: 25px !important;
  }
}
</style>
