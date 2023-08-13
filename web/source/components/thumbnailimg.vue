<template>
  <img v-if="noratio" :alt="alt" :title="title" :style="contain ? `object-fit: contain;` : `object-fit: cover;`"
    :class="`${nameClass}`" :src="src" :data-srcset="src"></img>

  <div v-else :class="`thumbnail-wrapper d-flex align-items-center justify-content-center ratio_${ratio}`">
    <!-- muted loop-->
    <video ref="videoRef" v-if="video" :muted="mute" playsinline preload="auto" class="thumbnail-video-inner"
      :style="contain ? `object-fit: contain;` : `object-fit: cover;`" :class="`${nameClass}`" loop autoplay>
      <source :src="sourceVideo" type="video/mp4" />
    </video>
    <img v-else :style="contain ? `object-fit: contain;` : `object-fit: ${coverimg};`"
      :class="`${nameClass} thumbnail-inner ${isgray ? 'gray-hover' : ''}`" :alt="alt" :title="title" :src="src"
      :data-srcset="src"></img>
  </div>
</template>

<script>
export default {
  props: {
    nameClass: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "NAS",
    },
    title: {
      type: String,
      default: "NAS",
    },
    src: {
      type: String,
      default: "",
    },
    ratio: {
      type: String,
      default: "1-1",
    },
    noratio: {
      type: Boolean,
      default: false,
    },
    contain: {
      type: Boolean,
      default: false,
    },
    coverimg: {
      type: String,
      default: "cover",
    },
    sourceVideo: {
      type: String,
      default: "cover",
    },
    isgray: {
      type: Boolean,
      default: false,
    },
    video: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isOrigin: false,
      mute: true
    }
  },
  // watch: {
  //   video: (val) => {
  //     if (this.video) {
  //       setTimeout(() => {
  //         this.$ref.videoRef.play()
  //       }, 900)
  //     }
  //   }
  // },
  mounted() {
    if (this.video) {
      setTimeout(() => {
        console.log(this.$refs.videoRef)
        if (this.$refs && this.$refs.videoRef) {
          this.$refs.videoRef.play()
        }
      }, 1000)
    }
  },
  methods: {
    playVideo() {
      this.$refs.videoRef.play()
    },
    onMute() {
      this.mute = !this.mute
      this.$refs.videoRef.play()
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

.thumbnail-wrapper {
  width: 100%;
  background-color: black;
  position: relative;

  /* If you want text inside of it */
  &.ratio_banner-half {
    padding-top: 18%;
    /* Aspect Ratio custom for banner half */
  }

  &.ratio_banner {
    padding-top: 33%;
    /* Aspect Ratio custom for banner */
  }

  &.ratio_banner-home {
    padding-top: 33%;
    /* Aspect Ratio custom for banner at home page */
  }

  &.ratio_banner-collection {
    padding-top: 40%;
    /* Aspect Ratio custom for banner at home page */
  }

  &.ratio_21-9 {
    padding-top: 42.85%;
    /* 21:9 Aspect Ratio */
  }

  &.ratio_16-9 {
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio */
  }

  &.ratio_8-5 {
    padding-top: 62.5%;
    /* 8:5 Aspect Ratio */
  }

  &.ratio_3-2 {
    padding-top: 66.66%;
    /* 3:2 Aspect Ratio */
  }

  &.ratio_4-3 {
    padding-top: 75%;
    /* 4:3 Aspect Ratio */
  }

  &.ratio_1-1 {
    padding-top: 100%;
    /* 1:1 Aspect Ratio */
  }

  &.ratio_3-4 {
    padding-top: 125%;
    /* 4:3 Aspect Ratio */
  }

  &.ratio_9-16 {
    padding-top: 144.75%;
    /* 4:3 Aspect Ratio */
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

.thumbnail-video-inner {
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

  &:hover {
    filter: grayscale(0%) !important;
    -webkit-filter: grayscale(0%) !important;
  }
}

.btn-mute {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 9000;

  img {
    width: 30px;
  }
}

@media (max-width: 768px) {
  .thumbnail-wrapper {
    &.ratio_banner-home {
      padding-top: 70%;
      /* Aspect Ratio custom for banner */
    }

    &.ratio_banner {
      padding-top: 33%;
      /* Aspect Ratio custom for banner */
    }
  }
}

@media (max-width: 575px) {
  .thumbnail-video-inner {
    height: auto;
    top: calc(50% - 115px);
  }
}</style>