<template>
  <div class="container news-container">
    <img class="news-title-image" src="/images/neck_label_1.png" />
    <div class="news-category">
      <div v-for="(_cate, idx) in  listItem" :key="idx" @click="choiceCate(_cate)"
      :class="`news-cate-item ${active === _cate.id ? 'news-cate-active' : ''}`">{{ _cate.attributes.name }}, </div>
      <!-- <div class="news-cate-item">KOLS, </div>
      <div class="news-cate-item">BLOGS, </div> -->
    </div>
    <VueSlickCarousel v-bind="settings" class="list-news" v-if=" listNews && listNews.length ">
      <div v-for="( item, index ) in  listNews " :key=" index ">
        <NewItem :isMobile=" isMobile " />
      </div>
      <template slot="prevArrow">
        <div class="pre-arrow">
          <img src="/images/left-b.png" />
        </div>
      </template>
      <template slot="nextArrow">
        <div class="next-arrow">
          <img src="/images/right-b.png" />
        </div>
      </template>
    </VueSlickCarousel>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import NewItem from "~/components/news/newsItem.vue"

export default {
  components: {
    NewItem
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
        "dots": false,
        "arrows": true,
        "edgeFriction": 0.35,
        "infinite": false,
        "speed": 1000,
        "slidesToShow": 3,
        "slidesToScroll": 1
      },
      active: 1
    }
  },
  computed: {
    ...mapGetters({
      listItem: "newCategory/getListItem",
      listNews: "news/getListItem",
    }),
  },
  async mounted() {
    await this.getListItem()
    if (this.listItem.length >= 3) {
      this.active = this.listItem[0].id
      this.getListNews({
        filters: {
          new_category: this.active
        },
        pagination: {
          page: 1,
          pageSize: 5
        }
      })
    }
  },
  methods: {
    ...mapActions({
      getListItem: "newCategory/getListItem",
      getListNews: "news/getListItem"
    }),
    choiceCate(_cate) {
      this.active = _cate.id
      this.getListNews({
        filters: {
          new_category: this.active
        }
      })
    }
  }
}
</script>
<style lang="scss">
.news-container {
  text-align: center;
  padding: 100px 0px;

  .news-title-image {
    margin-bottom: 40px;
  }

  .news-category {
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: left;

    .news-cate-item {
      color: #717171;
      font-family: 'Aeroport';
      font-size: 25px;
      font-style: normal;
      font-weight: 700;
      cursor: pointer;
      display: inline-block;
      text-transform: uppercase;
    }

    .news-cate-active {
      color: #000;
    }
  }

  .list-news {
    padding-top: 60px;

    .slick-prev {
      width: 45px;
      z-index: 1;
      left: 0;
      top: 5%;
      width: 45px;

      img {
        width: 45px;
      }
    }

    .slick-next {
      width: 45px;
      z-index: 1;
      right: 0;
      top: 5%;
      width: 45px;

      img {
        width: 45px;
      }
    }
  }
}

@media (max-width: 520px) {
  .solution-title {
    text-align: center;
    white-space: nowrap;
    font-size: 24px;
  }

  .s-content {
    position: relative;
    margin-top: 35px;
    margin-bottom: 42px;
    width: 100%;
  }

  .s-title {
    font-size: 20px;
    line-height: 20px;
    color: #2F3036;
    margin-bottom: 8px;
  }

  .s-desc {
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
    text-transform: capitalize;
    color: #2F3036;
  }
}
</style>
