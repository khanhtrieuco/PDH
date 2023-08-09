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
      </div>
      <img class="store-image" src="/images/store.png" />
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
  computed: {
    ...mapGetters({
      listCategory: "category/getListCategory"
    }),
  },
  async mounted() {
    if (this.listCategory.length === 0) {
      await this.getListCategory()
    }
    if (this.listCategory.length >= 3) {
      this.cate1 = this.listCategory[0].attributes
      this.cate2 = this.listCategory[1].attributes
      this.cate3 = this.listCategory[2].attributes
    }
  },
  methods: {
    ...mapActions({
      getListCategory: "category/getListCategory"
    }),
  }
}
</script>
<style lang="scss">
.solution-title {
  text-align: center;
  font-size: 36px;
}

.s-item {
  position: relative;
}

.s-content {
  width: 50%;
  position: absolute;
  text-align: center;
}

.s-title {
  font-weight: 500;
  font-size: 30px;
}

.s-desc {
  font-family: 'inter';
  font-size: 14px;
  text-transform: capitalize;
}

.s-img {
  width: 100%;
  border-radius: 3px;
  // box-sizing: border-box;
  // box-shadow: 1px 1px 2px 0px rgba(13, 13, 13, 0.31);

}

@media (min-width: 992px) and (max-width: 1199px) {
  .s-title {
    font-size: 26px;
    margin-bottom: 10px;
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
