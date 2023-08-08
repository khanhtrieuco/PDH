<template>
  <div>
    <!-- <Loading /> -->
    <Banner :isMobile="isMobile" type="Trang chủ"/>
    <Introduce :isMobile="isMobile"/>
    <Product :isMobile="isMobile"/>
    <Solution :isMobile="isMobile"/>
    <Promotion :isMobile="isMobile"/>
    <Aura :isMobile="isMobile"/>
    <Blog :isMobile="isMobile"/>
  </div>
</template>

<script>
import Banner from "~/components/home/banner.vue"
import Introduce from "~/components/home/introduce.vue"
import Product from "~/components/home/product.vue"
import Solution from "~/components/home/solution.vue"
import Promotion from "~/components/home/promotion.vue"
import Aura from "~/components/home/aura.vue"
import Blog from "~/components/home/blog.vue"

export default {
  name: 'IndexPage',
  components: {
    Banner,
    Introduce,
    Product,
    Solution,
    Promotion,
    Aura,
    Blog
  },
  data() {
    return {
      isMobile: false
    }
  },
  // computed: {
  //   ...mapGetters({
  //     listWork: "work/getListWork"
  //   }),
  // },
  mounted() {
    // if (!this.$route.hash) {
    //   window.scrollTo({ top: 0, behavior: 'smooth' })
    // }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.isMobile = this.checkMobile()
  },
  methods: {
    checkMobile() {
      if (!process.server) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      }
    }
  }
  // methods: {
  //   ...mapActions({
  //     getListWork: "work/getListWork"
  //   }),
  //   async loadData() {
  //     await this.getListWork()
  //     console.log(this.listWork)
  //   }
  // }
}
</script>
