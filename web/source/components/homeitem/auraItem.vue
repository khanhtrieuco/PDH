<template>
  <div class="aura-item p-2 mb-2">
    <NuxtLink :to="`/club/${item.attributes.slug}`">
      <div class="aura-img">
        <ThumbImage ratio="16-9" :src="item.attributes?.thub.data?.attributes.url"></ThumbImage>
      </div>
      <!-- <img class="aura-img" :src="item.attributes?.thub.data?.attributes.url" fluid alt="Fluid image" /> -->
    </NuxtLink>
    <div class="aura-title mt-3 mb-3" v-if="!isMobile">
      {{ item.attributes.title }}
    </div>
    <div class="aura-title mt-3 mb-3" v-if="isMobile">
      {{ get_excerpt(item.attributes.title, 37) }}
    </div>
    <div class="aura-description mb-3" v-if="!isMobile">
      {{ get_excerpt(item.attributes.short_content, 90) }}
    </div>
    <NuxtLink :to="`/club/${item.attributes.slug}`">
      <div v-if="!isMobile" class="btn-viewmore">View more</div>
    </NuxtLink>
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