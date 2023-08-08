<template>
  <div class="home-product-container">
    <div class="container py-7">
    	<h4 class="p-title mb-5">{{ $t('Home_product') }}</h4>
      <VueSlickCarousel v-if="listProduct && listProduct.length > 0" v-bind="settings" :key="carouselKey" :slidesToShow="isMobile ? 1 : 4" class="home-list-product">
        <div v-for="(item,index) in listProduct" :key="index" class="inno-slider-item">
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
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      listProduct: "product/getListProduct",
    }),
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
    await this.getListProduct()
    this.forceRerender()
  },
  methods: {
    ...mapActions({
      getListProduct: "product/getListProduct"
    }),
    forceRerender() {
      this.carouselKey += 1
    },
  }
}
</script>
<style lang="scss">
.home-product-container{
  height: 100vh;
}
.p-title{
    text-align: center;
    font-size: 36px;
}
.home-list-product{
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
  .home-product-container{
    padding-bottom: 50px;
    height: 110vh;
  }
  .p-title{
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    white-space: nowrap;
  }

  .home-list-product .slick-dots{
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
