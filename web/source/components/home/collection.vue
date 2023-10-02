<template>
  <div class="collection-container">
    <img class="collection-title-image" src="/images/collection-lable.png" />
    <carousel-3d class="collection-slide" v-if="!isMobile && listCollection && listCollection.length > 0" :width="1000" :height="800" :animation-speed="1400"
      :autoplay="true" :autoplay-timeout="5000" :display="3" :space="1500" :inverse-scaling="300"
      :controls-visible="true"
      :controls-width="45">
      <!-- :controls-prev-html="'&lt;img class=&quot;col-img-left&quot; src=&quot;/images/left-b.png&quot; /&gt;'"
      :controls-next-html="'&lt;img class=&quot;col-img-right&quot; src=&quot;/images/right-b.png&quot; /&gt;'" -->
      <slide v-for="(collection, i) in listCollection" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <div class="collection-item d-flex justify-content-center align-items-center"
            :style="`background-image: url(${collection.attributes.slider_thub?.data?.attributes.url})`">
            <div class="collection-item-content" v-if="collection.id === 24">
              <NuxtLink :to="`/collection/${collection.attributes.slug}`">
                <div class="collection-item-title">{{ collection.attributes.name }}</div>
                <div class="collection-item-des">{{ collection.attributes.description }}</div>
                <!-- <div class="shop-now-link">
                  <span class="shop-now-link-text">Shop now</span>
                  <img class="shop-now-link-img" src="/images/more.png" />
                </div> -->
              </NuxtLink>
            </div>
            <div class="collection-item-content" v-else>
              <div>
                <div class="collection-item-title">{{ collection.attributes.name }}</div>
                <div class="collection-item-des">{{ collection.attributes.description }}</div>
                <!-- <div class="shop-now-link">
                  <span class="shop-now-link-text">Shop now</span>
                  <img class="shop-now-link-img" src="/images/more.png" />
                </div> -->
              </div>
            </div>
          </div>
        </template>
      </slide>
    </carousel-3d>
    <carousel-3d class="collection-slide" v-if="isMobile" :width="250" :height="350" :animation-speed="1000"
      :autoplay="false" :autoplay-timeout="5000" :display="3" :space="340" :inverse-scaling="300" :controls-visible="true"
      :controls-prev-html="'&lt;img class=&quot;col-img-left&quot; src=&quot;/images/left-b.png&quot; /&gt;'"
      :controls-next-html="'&lt;img class=&quot;col-img-right&quot; src=&quot;/images/right-b.png&quot; /&gt;'"
      :controls-width="45">
      <slide v-for="(collection, i) in listCollection" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <div class="collection-item d-flex justify-content-center align-items-center"
            style="background-image: url(/images/coll.jpg)">
          </div>
        </template>
      </slide>
    </carousel-3d>

    <div class="collection-item-content" v-if="isMobile">
      <NuxtLink :to="`/collection/123`">
        <div class="collection-item-title">LA PEINTURE</div>
        <div class="collection-item-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nulla
          urna, rutrum ut est quis, imperdiet auctor ipsum. </div>
        <div class="shop-now-link">
          <span class="shop-now-link-text">Shop now</span>
          <img class="shop-now-link-img" src="/images/moreb.png" />
        </div>
      </NuxtLink>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
  // components: {
  //   NewItem
  // },
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
      // listcollection: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    ...mapGetters({
      listCollection: "collection/getListHomeCollection"
    }),
  },
  async mounted() {
    if (this.listCollection.length === 0) {
      await this.getListHomeCollection({
        filters: {
          show_home: true
        }
      })
    }
  },
  methods: {
    ...mapActions({
      getListHomeCollection: "collection/getListHomeCollection"
    }),
  }
}
</script>
<style lang="scss">
.collection-container {
  text-align: center;
  padding: 100px 0px;

  .collection-title-image {
    margin-bottom: 40px;
  }

  .collection-slide {
    .collection-item {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;

      .collection-item-content {
        .collection-item-title {
          color: #FFF;
          text-align: center;
          font-family: 'Aeroport';
          font-size: 25px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .collection-item-des {
          color: #FFF;
          text-align: center;
          font-family: 'Aeroport-light';
          font-size: 15px;
          font-weight: 300;
          width: 100%;
          margin-top: 10px;
          margin-bottom: 30px;
        }
      }
    }

    .col-img-left {
      width: 45px;
      position: absolute;
      bottom: -300px;
      left: 200px;
    }

    .col-img-right {
      width: 45px;
      position: absolute;
      bottom: -300px;
      right: 200px;
    }
  }
}

.shop-now-link {

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: 50%;
  transform: translate(-50%);

  .shop-now-link-text {
    color: #FFF;
    font-family: 'Aeroport-light';
    font-size: 15px;
    text-transform: uppercase;
    margin-right: 10px;
  }

  .shop-now-link-img {
    width: 12px;
  }
}

@media (max-width: 520px) {
  .collection-container {
    text-align: center;
    padding: 60px 0px;

    .collection-title-image {
      margin-bottom: 40px;
      width: 245px;
      margin-left: auto;
      margin-right: auto;
    }

    .collection-slide {
      .collection-item {
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
      }

      .col-img-left {
        width: 45px;
        position: absolute;
        bottom: -300px;
        left: 200px;
      }

      .col-img-right {
        width: 45px;
        position: absolute;
        bottom: -300px;
        right: 200px;
      }
    }

    .collection-item-content {
      .collection-item-title {
        color: #000;
        text-align: center;
        font-family: 'Aeroport';
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .collection-item-des {
        color: #000;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 10px;
        font-weight: 300;
        width: 190px;
        margin: 10px auto;
      }
    }
  }

  .shop-now-link {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #000;
    margin-left: auto;
    transform: inherit;

    .shop-now-link-text {
      color: #000;
      font-family: 'Aeroport-light';
      font-size: 10px;
      text-transform: uppercase;
      margin-right: 10px;

    }

    .shop-now-link-img {
      width: 10px;
    }
  }
}
</style>
