<template>
  <div class="mission-container" v-if="isMobile">
    <b-container>
      <b-row>
        <b-col class="pr-2" cols="6">
          <div class="mission-content">
              <div class="mission-title">{{ $t('About_title_1') }}</div>
              <div class="mission-text">{{ $t('About_sub_6') }}</div>
          </div>
        </b-col>
        <b-col class="pl-2" cols="6">
          <img class="mission-img w-100" src="/images/ab_mobile2.jpg"></img>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="pr-2" cols="6">
          <img class="mission-img w-100" src="/images/ab_mobile.jpg"></img>
        </b-col>
        <b-col class="pl-2" cols="6">
          <div class="mission-content">
              <div class="mission-title">{{ $t('About_title_2') }}</div>
              <div class="mission-text">{{ $t('About_sub_7') }}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
  <b-row v-else>
    <b-col class="pr-0" cols="6" >
      <img class="mission-img w-100" src="/images/about-sm.jpg"></img>
      <div class="mission-content d-flex justify-content-center align-items-center">
        <div>
          <div class="mission-title">{{ $t('About_title_2') }}</div>
          <div class="mission-text">{{ $t('About_sub_7') }}</div>
        </div>
      </div>
    </b-col>
    <b-col class="pl-0" cols="6">
      <img class="mission-img w-100" src="/images/about-sm1.jpg"></img>
      <div class="mission-content d-flex justify-content-center align-items-center">
        <div>
          <div class="mission-title">{{ $t('About_title_1') }}</div>
          <div class="mission-text">{{ $t('About_sub_6') }}</div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
// import { mapGetters, mapActions } from "vuex"
// import ProductItem from "~/components/productItem.vue"

export default {
  // components: {
  //   ProductItem
  // },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
.mission-content{
  padding-top: 60px;
  padding-bottom: 80px;
}
.mission-title {
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  text-align: center;
  color: #484848;
  margin-bottom: 20px;
}

.mission-text {
  width: 340px;
  font-weight: 300;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  color: #515151;
  font-family: 'inter-light';
}
@media (max-width: 520px) {
  .mission-container{
    background-color: #f593a533;
    padding-top: 44px;
    padding-bottom: 0px;
  }
  .mission-content{
    padding-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 40px;
  }
  .mission-title{
    font-size: 20px;
    line-height: 20px;
    text-align: left;
    margin-bottom: 10px;
  }
  .mission-text {
    font-size: 10px;
    line-height: 12px;
    text-align: left;
    width: 100%;
  }
  .mission-img{
    padding-top: 5px;
  }
}
</style>
  