<template>
  <div class="main-layout">
    <div id="scrollTop"></div>
    <Header />
    <div id="main">
      <nuxt />
      <!-- <div class="zalo-support-content">
        <img class="zalo-support" src="/images/zalo.png" fluid alt="Support" />
        <div class="zalo-text-content">Tư vấn từ chuyên gia</div>
      </div> -->
    </div>
    <Footer ref="footer" />
  </div>
</template>

<script>
import Header from "~/components/header.vue"
import Footer from "~/components/footer.vue"
import general from "~/mixins/general"

export default {
  data() {
    return {
      timeclose: 5,
      is_loading: false
    }
  },
  mixins: [general],
  components: {
    Header,
    Footer
  },
  methods: {
  }
}
</script>

<style lang="scss">
.zalo-support-content {
  position: fixed;
  bottom: 2%;
  right: 2%;
  z-index: 1000;
  opacity: 0.5;
  height: 80px;
  cursor: pointer;

  img {
    height: 100%;
    z-index: 2;
    position: relative;
  }

  .zalo-text-content {
    line-height: 60px;
    position: absolute;
    top: 10px;
    right: 15px;
    background-color: white;
    height: 60px;
    padding-left: 20px;
    z-index: 1;
    width: 0px;
    border-radius: 30px;
    transition: opacity 1s, width 1s;
    opacity: 0;
  }

  &:hover {
    opacity: 1;

    .zalo-text-content {
      display: block;
      opacity: 1;
      width: 240px;
    }
  }
}

@media (max-width: 520px) {
  .main-layout{
    padding-top: 50px;
  }
  .zalo-support-content {
    width: 70px;
    position: fixed;
    bottom: 30px;
    opacity: 0.8;
    right: 30px;

    .zalo-support {
      width: 100%;
      height: auto;

    }
  }
}
</style>
