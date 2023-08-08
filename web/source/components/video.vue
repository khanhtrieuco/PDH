<template>
  <div
    :class="`thumbnail-wrapper d-flex align-items-center justify-content-center ratio_${ratio}`"
  >
    <video-player class="thumbnail-inner video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        @loadeddata="onPlayerLoadeddata($event)">
  </video-player>
  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: String,
      default: "1-1",
    },
    coverimg: {
      type: String,
      default: "cover",
    },
    sourceVideo: {
      type: String,
      default: "cover",
    }
  },
  data() {
    return {
        playerOptions: {
            muted: true,
            responsive: true,
            language: 'en',
            sources: [{
                type: "video/web",
                src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "/images/banner4.jpg"
        }
    }
  },
  computed: {
    player() {
        return this.$refs.videoPlayer.player
    }
  },
  // watch: {
  //   src: async function (val) {
  //     if (val && val.resize_link !== "") {
  //     }
  //   },
  // },
  // mounted() {
  // },
  methods: {
    onPlayerLoadeddata () {
      console.log('onPlayerLoadeddata')
      this.player.autoplay('muted')
    }
  },
  // created() {
  // },
}
</script>

<style lang="scss" scoped>
img:not([src]) {
  display: none;
}
.video-js{
  width: 100%;
  height: 100%;
}
.thumbnail-wrapper {
  width: 100%;
  position: relative; /* If you want text inside of it */
  &.ratio_banner-half {
    padding-top: 18%; /* Aspect Ratio custom for banner half */
  }
  &.ratio_banner {
    padding-top: 33%; /* Aspect Ratio custom for banner */
  }
  &.ratio_banner-home {
    padding-top: 33%; /* Aspect Ratio custom for banner at home page */
  }
  &.ratio_banner-collection {
    padding-top: 40%; /* Aspect Ratio custom for banner at home page */
  }
  &.ratio_21-9 {
    padding-top: 42.85%; /* 21:9 Aspect Ratio */
  }
  &.ratio_16-9 {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  &.ratio_8-5 {
    padding-top: 62.5%; /* 8:5 Aspect Ratio */
  }
  &.ratio_3-2 {
    padding-top: 66.66%; /* 3:2 Aspect Ratio */
  }
  &.ratio_4-3 {
    padding-top: 75%; /* 4:3 Aspect Ratio */
  }
  &.ratio_1-1 {
    padding-top: 100%; /* 1:1 Aspect Ratio */
  }
  &.ratio_3-4 {
    padding-top: 125%; /* 4:3 Aspect Ratio */
  }
  &.ratio_9-16 {
    padding-top: 144.75%; /* 4:3 Aspect Ratio */
  }
  .thumbnail-inner {
    position: absolute !important;
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &.loading {
    .thumbnail-inner {
      width: unset;
      height: unset;
      object-fit: contain;
      top: 30%;
    }
  }
}
.class-border {
  border-radius: 8px;
}

.class-border-16 {
  border-radius: 16px !important;
}

.border-img-bottom-right {
  border-radius: 0px 0px 14px 0px;
}
.border-img-top-bottom-left {
  border-radius: 0px 0px 0px 14px;
}
.border-img-top-bottom-right {
  border-radius: 0px 0px 14px 0px;
}
.border-img {
  border-radius: 0px 0px 14px 14px;
}

.gray-hover {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  &:hover{
    filter: grayscale(0%) !important;
    -webkit-filter: grayscale(0%) !important;
  }
}
@media (max-width: 768px) {
  .thumbnail-wrapper {
    &.ratio_banner-home {
      padding-top: 70%; /* Aspect Ratio custom for banner */
    }
    &.ratio_banner {
      padding-top: 33%; /* Aspect Ratio custom for banner */
    }
  }
}
</style>