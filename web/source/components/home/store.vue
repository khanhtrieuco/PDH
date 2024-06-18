<template>
  <div class="container store-container">
    <img class="store-title-image" src="/images/store.png" />

    <div class="d-flex justify-content-center">
      <img class="store-image" :src="is_show" v-if="isMobile" />
      <div class="list-store">
        <div class="store-content" @click="choiceStore(_item)" v-for="(_item, idx) in list_data" :key="idx">
          <div class="store-item">
            <img class="store-item-maker" src="/images/place-maker.png" />
            <div class="store-item-text">{{ _item.attributes.address }}</div>
            <div class="store-item-text">House today: {{ _item.attributes.time }}</div>
            <div class="store-item-text">T:
              <a class="store-item-text" :href="`tel:${_item.attributes.phone}`">
                {{ _item.attributes.phone }}</a>
            </div>
            <div class="store-btn">{{ $t('Store_select_4') }}</div>
          </div>
        </div>
      </div>
      <img class="store-image" :src="is_show"v-if="!isMobile" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import Select from "~/components/common/select.vue"

export default {
  components: {
    Select
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list_data: [],
      is_show: 'null'
    }
  },
  // computed: {
  //   ...mapGetters({
  //     listCategory: "category/getListCategory"
  //   }),
  // },
  async mounted() {
    let res = await this.getbyUrl({
      url: '/api/places?populate[0]=thub'
    })
    if (res && res.data && res.data.length > 0) {
      this.list_data = res.data
      this.is_show = this.list_data[0].attributes.thub?.data.attributes.url
    }
  },
  methods: {
    ...mapActions({
      getbyUrl: "common/getbyUrl"
    }),
    choiceStore(item){
      if(item.id) {
        this.is_show = item.attributes.thub?.data.attributes.url
      }
    }
  }
}
</script>
<style lang="scss">
.store-container {
  text-align: center;
  padding: 100px 0px;
  .list-store{
    margin-top: 55px;
  }
  .store-content {
    margin-top: 20px;
    width: 360px;
    margin-right: 40px;
    text-align: left;

    .store-filter-item {
      margin-bottom: 10px;

      .filter-title {
        margin-bottom: 10px;
      }
    }

    .store-item {
      background-color: #D9D9D980;
      padding: 20px;
      // margin-top: 30px;

      .store-item-maker {
        width: 30px;
        margin-bottom: 20px;
      }

      .store-item-text {
        color: #000;
        font-family: 'Aeroport-light';
        font-size: 15px;
        font-weight: 300;
      }
    }

    .store-btn {
      background-color: #000;
      color: #fff;
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-family: 'Aeroport-light';
      font-size: 15px;
      font-weight: 300;
      text-transform: uppercase;
      margin-top: 20px;
      cursor: pointer;
    }
  }

  .store-image {
    margin-top: 75px;
    width: calc(100% - 400px);
    object-fit: cover;
  }
}

@media (max-width: 520px) {
  .store-container {
    text-align: center;
    padding: 60px 0px;

    .store-title-image {
      width: 283px;
      margin: auto;
    }

    .store-content {
      margin-top: 10px;
      width: 100%;
      margin-right: auto;
      text-align: left;

      .store-filter-item {
        margin-bottom: 8px;

        .filter-title {
          margin-bottom: 8px;
          font-size: 10px;
        }
      }

      .store-item {
        background-color: #D9D9D980;
        padding: 20px;
        margin-top: 30px;

        .store-item-maker {
          width: 30px;
          margin-bottom: 20px;
        }

        .store-item-text {
          color: #000;
          font-family: 'Aeroport-light';
          font-size: 10px;
          font-weight: 300;
        }
      }

      .store-btn {
        background-color: #000;
        color: #fff;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 10px;
        font-weight: 300;
        text-transform: uppercase;
        margin-top: 20px;
      }
    }

    .store-image {
      margin-top: 40px;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
