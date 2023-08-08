<template>
  <div class="container py-4" v-if="isMobile">
    <h4 class="solution-title mb-5">{{ $t('Home_cate') }}</h4>
    <NuxtLink :to="`/chuyen-muc/${_cate.attributes.slug}`" v-for="(_cate, idx) in listCategory" :key="idx">
      <div class="s-item">
        <b-img class="s-img" :src="_cate.attributes.home_thub_mobile?.data?.attributes.url" fluid alt="image"></b-img>
        <div class="s-content">
          <div class="s-title">
          {{ $i18n.locale === 'vn' ? _cate.attributes.name : _cate.attributes.name_en ?? _cate.attributes.name }}
          </div>
          <div class="s-desc">
          {{ $i18n.locale === 'vn' ? _cate.attributes.stort_des : _cate.attributes.stort_des_en ?? _cate.attributes.stort_des }}
          </div>
        </div>
      </div>
    </NuxtLink>
    <!-- <NuxtLink to="/chuyen-muc/thuc-pham-chuc-nang">
      <div class="s-item">
        <b-img class="s-img" src="images/m_s_gb2.jpg" fluid alt="image"></b-img>
        <div class="s-content">
          <div class="s-title">Thực phẩm chức năng</div>
          <div class="s-desc">Giu gìn vóc dáng - Bảo vệ từ bên trong</div>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink to="/chuyen-muc/trang-thiet-bi-y-te">
      <div class="s-item">
        <b-img class="s-img" src="images/m_s_gb3.jpg" fluid alt="image"></b-img>
        <div class="s-content">
          <div class="s-title">Trang thiết bị y tế </div>
          <div class="s-desc">Hỗ trợ và bảo vệ bé</div>
        </div>
      </div>
    </NuxtLink> -->
  </div>
  <div class="container py-5" v-else>
    <h4 class="solution-title  mb-5">{{ $t('Home_cate') }}</h4>
    <NuxtLink :to="`chuyen-muc/${cate1.slug}`">
    <div class="s-item mb-3 d-flex align-items-center justify-content-end">
      <div class="s-content float-right">
        <div class="s-title">
          {{ $i18n.locale === 'vn' ? cate1.name : cate1.name_en ?? cate1.name }}
        </div>
        <div class="s-desc">
          {{ $i18n.locale === 'vn' ? cate1.stort_des : cate1.stort_des_en ?? cate1.stort_des }}
        </div>
      </div>
      <b-img class="s-img" :src="cate1.home_thub?.data?.attributes.url" fluid alt="image"></b-img>
    </div>
    </NuxtLink>
    <NuxtLink :to="`chuyen-muc/${cate2.slug}`">
    <div class="s-item mb-3 d-flex align-items-center justify-content-start">
      <div class="s-content float-left">
        <div class="s-title">
          {{ $i18n.locale === 'vn' ? cate2.name : cate2.name_en ?? cate2.name }}
        </div>
        <div class="s-desc">
          {{ $i18n.locale === 'vn' ? cate2.stort_des : cate2.stort_des_en ?? cate2.stort_des }}
        </div>
      </div>
      <b-img class="s-img" :src="cate2.home_thub?.data?.attributes.url" fluid alt="image"></b-img>
    </div>
    </NuxtLink>
    <NuxtLink :to="`chuyen-muc/${cate3.slug}`">
    <div class="s-item mb-3 d-flex align-items-center justify-content-end">
      <div class="s-content  float-right">
        <div class="s-title">
          {{ $i18n.locale === 'vn' ? cate3.name : cate3.name_en ?? cate3.name }}
        </div>
        <div class="s-desc">
          {{ $i18n.locale === 'vn' ? cate3.stort_des : cate3.stort_des_en ?? cate3.stort_des }}
        </div>
      </div>
      <b-img class="s-img" :src="cate3.home_thub?.data?.attributes.url" fluid alt="image"></b-img>
    </div>
    </NuxtLink>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
  // components: {
  //   ProductItem
  // },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cate1: {},
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
    if(this.listCategory.length === 0) {
      await this.getListCategory()
    }
    if(this.listCategory.length >= 3) {
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
