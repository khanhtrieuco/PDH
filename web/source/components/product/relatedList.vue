<template>
    <div class="related-product-container">
      <div class="container">
          <h4 class="p-title mb-5">{{ $t('Product_relation_text') }}</h4>
        <VueSlickCarousel v-if="listRelated && listRelated.length > 0" v-bind="settings" :key="carouselKey" :slidesToShow="isMobile ? 1 : 4" class="related-list-product">
          <div v-for="(item,index) in listRelated" :key="index" class="inno-slider-item">
            <ProductItem :item="item" :isMobile="isMobile" />
          </div>
          <template slot="prevArrow">
            <div class="pre-arrow-product">
              <img src="/images/left.png" v-if="!isMobile"></img>
              <img src="/images/m-left.png" v-if="isMobile"></img>
            </div>
          </template>
          <template slot="nextArrow">
            <div class="next-arrow-product">
              <img src="/images/right.png" v-if="!isMobile"></img>
              <img src="/images/m-right.png" v-if="isMobile"></img>
            </div>
          </template>
        </VueSlickCarousel>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex"
  import ProductItem from "~/components/homeitem/productItem.vue"
  
  export default {
    components: {
      ProductItem
    },
    props: {
      listRelated: {
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
        settings:{
          "dots": true,
          "arrows": true,
          "edgeFriction": 0.35,
          "infinite": true,
          "speed": 500,
          "slidesToScroll": 1
        },
        carouselKey: 0
      }
    },
    async mounted() {
      this.forceRerender()
    },
    methods: {
      forceRerender() {
        this.carouselKey += 1
      },
    }
  }
  </script>
  <style lang="scss">
  .related-product-container{
    height: auto;
    background: #B7AAD31A;
    padding-top: 60px;
    padding-bottom: 120px;
  }
  .p-title{
      text-align: center;
      font-size: 36px;
  }
  .related-list-product{
    .slick-dots{
      bottom: -80px !important;
    }
  }
  .pre-arrow-product{
    left: 25 !important;
    z-index: 1;
  }
  .next-arrow-product{
    right: 25 !important;
    z-index: 1;
  }
  @media (max-width: 520px) {
    .related-product-container{
        margin-top: 50px;
      padding-bottom: 70px;
      height: auto;
    }
    .p-title{
      text-align: center;
      font-size: 24px;
      line-height: 24px;
      white-space: nowrap;
    }
  
    .related-list-product .slick-dots{
      bottom: -40px !important;
    }
    .pre-arrow-product{
      transform: translate(0, calc(-50% + -70px)) !important;
      left: 0px !important;
      z-index: 1;
    }
    .next-arrow-product{
      transform: translate(0, calc(-50% + -70px)) !important;
      right: 0px !important;
      z-index: 1;
    }
  }
  </style>
  