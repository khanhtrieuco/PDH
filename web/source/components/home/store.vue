<template>
  <div class="container store-container">
    <img class="store-title-image" src="/images/store.png" />
    <div class="d-flex justify-content-center">
      <div class="store-content">
        <div class="store-filter-item">
          <div class="filter-title">{{ $t('Store_select_1') }}</div>
          <Select :default="$i18n.locale === 'vn' ? 'Select Nation' : 'Select Nation'"
            :listItem="$i18n.locale === 'vn' ? select_data_1 : select_data_1" />
        </div>
        <div class="store-filter-item">
          <div class="filter-title">{{ $t('Store_select_2') }}</div>
          <Select :default="$i18n.locale === 'vn' ? 'Select City' : 'Select City'"
            :listItem="$i18n.locale === 'vn' ? select_data_2 : select_data_2" />
        </div>
        <div class="store-btn">{{ $t('Store_select_3') }}</div>
        <div class="store-item">
          <img class="store-item-maker" src="/images/place-maker.png" />
          <div class="store-item-text">19/6b Nguyen Thi Minh Khai, District 1, Ho Chi Minh city</div>
          <div class="store-item-text">House today: 10:00 AM - 9:00 PM</div>
          <div class="store-item-text">T: 0868284222</div>
          <div class="store-btn">{{ $t('Store_select_4') }}</div>
        </div>
        <div class="store-item">
          <img class="store-item-maker" src="/images/place-maker.png" />
          <div class="store-item-text">19/6b Nguyen Thi Minh Khai, District 1, Ho Chi Minh city</div>
          <div class="store-item-text">House today: 10:00 AM - 9:00 PM</div>
          <div class="store-item-text">T: 0868284222</div>
          <div class="store-btn">{{ $t('Store_select_4') }}</div>
        </div>
      </div>
      <img class="store-image" src="/images/ple.jpg" />
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
      select_data_1: [
        { item: 'vietnam', name: 'Vietnam' },
        { item: 'canada', name: 'Canada' },
        { item: 'italy', name: 'Italy' },
        { item: 'france', name: 'France' }
      ],
      select_data_2: [
        { item: 'honoi', name: 'Ha Noi' },
        { item: 'hochiminh', name: 'Ho Chi Minh' },
        { item: 'danang', name: 'Da Nanh' }
      ],
      cate2: {},
      cate3: {},
    }
  },
  // computed: {
  //   ...mapGetters({
  //     listCategory: "category/getListCategory"
  //   }),
  // },
  // async mounted() {
  //   if (this.listCategory.length === 0) {
  //     await this.getListCategory()
  //   }
  //   if (this.listCategory.length >= 3) {
  //     this.cate1 = this.listCategory[0].attributes
  //     this.cate2 = this.listCategory[1].attributes
  //     this.cate3 = this.listCategory[2].attributes
  //   }
  // },
  // methods: {
  //   ...mapActions({
  //     getListCategory: "category/getListCategory"
  //   }),
  // }
}
</script>
<style lang="scss">
.store-container {
  text-align: center;
  padding: 100px 0px;

  .store-content {
    margin-top: 75px;
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
      margin-top: 30px;
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
    }
  }

  .store-image {
    margin-top: 75px;
    width: calc(100% - 400px);
    object-fit: cover;
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
