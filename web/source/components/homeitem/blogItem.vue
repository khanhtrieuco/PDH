<template>
  <div class="aura-item p-2 mb-2">
    <img class="aura-img" src="/images/aura1.jpg" fluid alt="Fluid image"></img>
    <div class="aura-title mt-3 mb-3">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import general from "~/mixins/general"
export default {
  mixins: [general],
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          image: '/images/aura1.jpg',
          title: 'Cac hoat dong cua Nas Community',
          description: "That's why NAS is committed to providing the best quality and most effective cosmetic and dietary supplements at affordable prices for you and your loved ones."
        }
      }
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      description: ''
    }
  },
  mounted() {
    // let lang = 'en'
    // let lland = window.localStorage.getItem('lang')
    // if (lland) {
    //   lang = lland
    // }
    // if (lang === 'vn') {
    // this.description = this.get_excerpt(this.item.description_vn, 150)
    // } else {
    this.description = this.get_excerpt(this.item.description, 100)
    // }
  }
}
</script>
<style lang="scss">
.aura-img {
  width: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px 0px rgba(13, 13, 13, 0.31);

}

.aura-title {
  font-size: 20px;
  font-weight: 600;
}

.aura-description {
  font-family: 'inter';
  font-size: 14px;
  font-weight: 300;
}

.btn-viewmore {
  cursor: pointer;
  float: right;
  font-family: 'inter';
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-decoration-line: underline;
}

@media (max-width: 520px) {
  .aura-title {
    font-weight: 700;
    font-size: 13px;
    line-height: 15px;
    color: #2F3036;
    text-align: left;
  }
}</style>