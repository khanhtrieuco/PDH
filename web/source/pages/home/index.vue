<template>
  <div>
    <Banner :isMobile="isMobile"/>
    <Collections :isMobile="isMobile" />
    <BannerAbout :isMobile="isMobile"/>
    <News :isMobile="isMobile"/>
    <Store :isMobile="isMobile"/>
  </div>
</template>

<script>
import Banner from "~/components/home/banner.vue"
import Collections from "~/components/home/collection.vue"
import BannerAbout from "~/components/home/bannerAbout.vue"
import News from "~/components/home/news.vue"
import Store from "~/components/home/store.vue"

export default {
  name: 'IndexPage',
  components: {
    Banner,
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
