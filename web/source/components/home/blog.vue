<template>
  <div class="blog-container">
    <div class="container pt-3 pb-5" v-if="isMobile">
      <h4 class="text-right mb-3">#Blog</h4>
      <div class="blog-grid">
        <div class="blog-top">
          <img class="blog-img img-1" id="popover-target-1" src="/images/m_blog1.jpg" fluid alt="Blog image"></img>
          <div class="blog-title">Hành trình trị nám cùng Nas</div>
        </div>
        <div class="blog-bot">
          <div class="both-1 float-left">
            <img class="blog-img img-2" id="popover-target-2" src="/images/m_blog2.jpg" fluid alt="Blog image"></img>
            <div class="blog-title">Tinh chất trị mụn chị em mong chờ</div>
          </div>
          <div class="both-2 float-left">
            <img class="blog-img img-2" id="popover-target-3" src="/images/m_blog3.jpg" fluid alt="Blog image"></img>
            <div class="blog-title">Tự tin cùng nhờ Nas Club</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-7" v-else>
      <h4 class="text-right mb-3">#Blog</h4>
      <div class="blog-grid float-left">
        <div class="blog-left float-left">
          <img class="blog-img img-1" src="/images/blog1.jpg" fluid alt="Blog image"></img>
          <div class="d-flex justify-content-center align-items-center blog-hover">
            <NuxtLink to="/blog/1">
              <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
              <div class="blog-hover-btn">Xem thêm</div>
            </NuxtLink>
          </div>
        </div>
        <div class="blog-both float-left">
          <div class="both-1 float-left">
            <img class="blog-img img-2" src="/images/blog4.jpg" fluid alt="Blog image"></img>
            <div class="d-flex justify-content-center align-items-center blog-hover">
              <NuxtLink to="/blog/1">
                <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
                <div class="blog-hover-btn">Xem thêm</div>
              </NuxtLink>
            </div>
          </div>
          <div class="both-2 float-left">
            <img class="blog-img img-2" src="/images/blog5.jpg" fluid alt="Blog image"></img>
            <div class="d-flex justify-content-center align-items-center blog-hover">
              <NuxtLink to="/blog/1">
                <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
                <div class="blog-hover-btn">Xem thêm</div>
              </NuxtLink>
            </div>
          </div>
          <div class="both-3 float-left">
            <img class="blog-img img-3" src="/images/blog2.jpg" fluid alt="Blog image"></img>
            <div class="d-flex justify-content-center align-items-center blog-hover">
              <NuxtLink to="/blog/1">
                <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
                <div class="blog-hover-btn">Xem thêm</div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="blog-right float-left">
          <div class="both-3 float-left">
            <img class="blog-img img-4" src="/images/blog3.jpg" fluid alt="Blog image"></img>
            <div class="d-flex justify-content-center align-items-center blog-hover">
              <NuxtLink to="/blog/1">
                <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
                <div class="blog-hover-btn">Xem thêm</div>
              </NuxtLink>
            </div>
          </div>
          <div class="both-1 float-left">
            <img class="blog-img img-5" src="/images/blog6.jpg" fluid alt="Blog image"></img>
            <div class="d-flex justify-content-center align-items-center blog-hover">
              <NuxtLink to="/blog/1">
                <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
                <div class="blog-hover-btn">Xem thêm</div>
              </NuxtLink>
            </div>
          </div>
          <div class="both-2 float-left">
            <img class="blog-img img-5" src="/images/blog7.jpg" fluid alt="Blog image"></img>
            <div class="d-flex justify-content-center align-items-center blog-hover">
              <NuxtLink to="/blog/1">
                <div class="blog-hover-text">Cac hoat dong cua Nas Community</div>
                <div class="blog-hover-btn">Xem thêm</div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters, mapActions } from "vuex"
import AuraItem from "~/components/homeitem/auraItem.vue"

export default {
  components: {
    AuraItem
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settings: {
        "dots": true,
        "arrows": true,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 3,
        "slidesToScroll": 1
      },
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
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>
<style lang="scss">
.blog-container {
  background-color: #FAC8D2;
  display: grid;
}

.blog-img {
  width: 100%;
  cursor: pointer;

  img {
    object-fit: cover;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px 0px rgba(13, 13, 13, 0.31);
  }
}

.blog-grid {
  .blog-left {
    position: relative;
    width: calc(100% / 3 - 8px);
    margin-right: 6px;
  }

  .blog-both {
    width: calc(100% / 3 - 8px);
    margin-right: 6px;

    .both-1 {
      width: calc(100% / 2 - 3px);
      margin-right: 3px;
      margin-bottom: 6px;
      position: relative;
    }

    .both-2 {
      width: calc(100% / 2 - 3px);
      margin-left: 3px;
      margin-bottom: 6px;
      position: relative;
    }

    .both-3 {
      width: calc(100%);
      margin-bottom: 6px;
      position: relative;
    }
  }

  .blog-right {
    width: calc(100% / 3 + 4px);

    .both-1 {
      width: calc(100% / 2 - 3px);
      margin-right: 3px;
      margin-bottom: 6px;
      position: relative;
    }

    .both-2 {
      width: calc(100% / 2 - 3px);
      margin-left: 3px;
      margin-bottom: 6px;
      position: relative;
    }

    .both-3 {
      width: calc(100%);
      margin-bottom: 6px;
      position: relative;
    }
  }
}

.img-1 {
  width: 100%;
  height: 550px;
}

.img-2 {
  width: 100%;
  height: 265px;
}

.img-3 {
  width: 100%;
  height: 280px;
}

.img-4 {
  width: 100%;
  height: 265px;
}

.img-5 {
  width: 100%;
  height: 280px;
}

.blog-hover {
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: #f5abf3;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  transition: opacity 0.4s;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px 0px rgba(13, 13, 13, 0.31);

  &:hover {
    opacity: 0.8;
    transition: opacity 0.4s;
  }

  .blog-hover-text {
    color: white;
    margin-bottom: 16px;
  }

  .blog-hover-btn {
    color: white;
    font-weight: 600;
    font-family: 'inter';
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
  .img-1 {
    height: 497px;
  }

  .img-2 {
    height: 246px;
  }

  .img-3 {
    height: 245px;
  }

  .img-4 {
    height: 246px;
  }

  .img-5 {
    height: 245px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .img-1 {
    height: 430px;
  }

  .img-2 {
    height: 201px;
  }

  .img-3 {
    height: 222px;
  }

  .img-4 {
    height: 201px;
  }

  .img-5 {
    height: 222px;
  }
}

@media (max-width: 520px) {
  .blog-container {
    background-color: #ffffff;
  }

  .text-right {
    font-size: 16px;
    line-height: 16px;
    text-align: right;
    color: #2F3036;
  }

  .blog-grid {
    margin-right: auto;
    margin-left: auto;
  }

  .blog-top {
    width: 100%;
    height: 185px;
    margin-bottom: 5px;
    position: relative;
  }

  .blog-bot {
    .both-1 {
      width: 161px;
      height: 185px;
      margin-right: 5px;
      position: relative;
    }

    .both-2 {
      width: 161px;
      height: 185px;
      position: relative;
    }
  }

  .blog-title {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    padding: 3px 5px 3px 5px;
    font-size: 9px;
    line-height: 10px;
  }

  .img-1 {
    width: 100%;
    height: 100%;
  }

  .img-2 {
    width: 100%;
    height: 100%;
  }
}
</style>
