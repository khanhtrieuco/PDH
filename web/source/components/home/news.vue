<template>
  <div class="container news-container">
    <img class="news-title-image" src="/images/neck_label_1.png" />
    <!-- <div class="news-category">
      <div v-for="(_cate, idx) in  listItem" :key="idx" @click="choiceCate(_cate)"
      :class="`news-cate-item ${active === _cate.id ? 'news-cate-active' : ''}`">{{ _cate.attributes.name }}, </div>
    </div> -->
    <VueSlickCarousel v-bind="settings" :slidesToShow="1" :slidesToScroll="1"
      class="list-news" v-if="isMobile && listNewsMobile && listNewsMobile.length">
      <div v-for="( item, index ) in  listNewsMobile" :key="index">
        <NewItem :isMobile="isMobile" :item="item[0]" />
        <NewItem :isMobile="isMobile" :item="item[1]" />
        <NewItem :isMobile="isMobile" :item="item[2]" />
        <NewItem :isMobile="isMobile" :item="item[3]" />
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
    <VueSlickCarousel v-bind="settings" :slidesToShow="3" :slidesToScroll="3"
      class="list-news" v-if="!isMobile && listNews && listNews.length">
      <div v-for="( item, index ) in  listNews" :key="index">
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
    <NuxtLink :to="`/news`">
      <img class="all-news" src="/images/allnews.svg" />
    </NuxtLink>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import NewItem from "~/components/news/newsItemHome.vue"

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
        "dots": true,
        "arrows": false,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 2000
      },
      active: 1,
      listNewsMobile: []
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
    await this.getListNews({
      // filters: {
      //   new_category: this.active
      // },
      pagination: {
        page: 1,
        pageSize: 9
      }
    })
    if(this.listNews && this.listNews.length > 4) {
      let listTemp = []
      for (let i = 0; i < this.listNews.length; i++) {
        console.log(i%4)
        if(i % 4 < 3) {
          listTemp.push(this.listNews[i])
        } else {
          listTemp.push(this.listNews[i])
          this.listNewsMobile.push(listTemp)
          listTemp = []
        }
      }
      console.log(this.listNewsMobile)
    }
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
  position: relative;

  .all-news {
    position: absolute;
    cursor: pointer;
    right: 0px;
    bottom: 50px;
    z-index: 20px;
  }

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

    .slick-dots {
      bottom: -30px !important;

      li {
        width: 4px !important;
        height: 4px !important;
      }
    }
  }
}

@media (max-width: 520px) {
  .news-container {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 0px;

    .all-news {
      position: absolute;
      cursor: pointer;
      right: 0px;
      bottom: -15px;
      z-index: 20px;
      width: 65px;
    }

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

      .slick-dots {
        bottom: -10px !important;

        li {
          width: 4px !important;
          height: 4px !important;
        }
      }

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
