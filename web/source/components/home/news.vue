<template>
  <div class="container news-container">
    <img class="news-title-image" src="/images/neck_label_1.png" />
    <!-- <div class="news-category">
      <div v-for="(_cate, idx) in  listItem" :key="idx" @click="choiceCate(_cate)"
      :class="`news-cate-item ${active === _cate.id ? 'news-cate-active' : ''}`">{{ _cate.attributes.name }}, </div>
    </div> -->
    <VueSlickCarousel v-bind="settings" :slidesToShow="isMobile ? 2 : 3" class="list-news" v-if=" listNews && listNews.length ">
      <div v-for="( item, index ) in  listNews " :key=" index ">
        <NewItem :isMobile="isMobile" :item="item" />
      </div>
      <template slot="prevArrow" v-if="!isMobile">
        <div class="pre-arrow">
          <img src="/images/left-b.png" />
        </div>
      </template>
      <template slot="nextArrow" v-if="!isMobile">
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
        "slidesToScroll": 1
      },
      active: 1
    }
  },
  computed: {
    ...mapGetters({
      listItem: "newCategory/getListCategory",
      listNews: "news/getListNews",
    }),
  },
  async mounted() {
    // await this.getListNewsCategory()
    // if (this.listItem.length >= 1) {
      // this.active = this.listItem[0].id
      this.getListNews({
        // filters: {
        //   new_category: this.active
        // },
        pagination: {
          page: 1,
          pageSize: 3
        }
      })
    // }
  },
  methods: {
    ...mapActions({
      getListNewsCategory: "newCategory/getListNewsCategory",
      getListNews: "news/getListNews"
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
    margin-bottom: 10px;
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
  .news-container {
  text-align: center;
  padding-top: 60px;
  padding-bottom: 0px;

  .news-title-image {
    width: 110px;
    margin-bottom: 0px;
    margin-left: auto;
    margin-right: auto;
  }

  .news-category {
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: left;

    .news-cate-item {
      color: #717171;
      font-family: 'Aeroport';
      font-size: 10px;
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
    padding-top: 30px;

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
}
</style>
