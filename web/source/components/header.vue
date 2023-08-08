<template>
  <div :class="className">
    <header class="container">
      <div class="container-header" v-if="!isMobile">
        <div class="header-logo d-flex justify-content-start">
          <NuxtLink to="/">
            <img class="menu-logo" src="/images/logo.png" />
          </NuxtLink>
        </div>
        <div class="d-flex justify-content-between text-left ">
          <NuxtLink to="/ve-nas">
            <span class="menu-text">{{ $t('About') }}</span>
          </NuxtLink>
          <NuxtLink :to="`/chuyen-muc/${_cate.attributes.slug}`" v-for="(_cate, idx) in listCategory" :key="idx">
            <span class="menu-text" @mouseover="mouseOver(`tab${idx}`)">
              {{ $i18n.locale === 'vn' ? _cate.attributes.name : _cate.attributes.name_en ?? _cate.attributes.name
              }}</span>
          </NuxtLink>
          <NuxtLink to="/aura-club">
            <span class="menu-text" @mouseover="mouseOver('aura')">Aura Club</span>
          </NuxtLink>

          <span class="menu-text" @mouseover="mouseOver('lienhe')">{{ $t('Contact') }}</span>
          <span class="menu-text" @mouseover="mouseOver('thanhvien')" @click="goPage('/thanh-vien-nas')">
            {{ $t('Members') }}
          </span>

          <div class="ml-auto d-inline-flex flex-row-reverse" style="position: relative;">
            <img class="menu-icon-bag" src="/images/Bag.png" @click="onShowCart()" />
            <!-- <img class="menu-icon-user" src="/images/user.png" id="popover-user-info"
              @click="goPage('/thanh-vien-nas')" /> -->
            <img class="menu-icon" src="/images/Search.png" @click="onShowSearch()" />
            <div class="header-lang-content">
              <div :class="`lang-btn ${$i18n.locale === 'en' ? 'lang-btn-active' : ''}`" @click="changeLang()">EN</div>
              <div :class="`lang-btn ${$i18n.locale === 'vn' ? 'lang-btn-active' : ''}`" @click="changeLang()">VI</div>
            </div>
          </div>
          <div class="custom-club-menu" v-show="hoverShow === 'tab0'" @mouseleave="mouseOver('')">
            <b-container style="position: relative;">
              <div class="custom-club-menu-arrow menu-arrow-cate1"></div>
            </b-container>
            <div class="head-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" class="head-menu-text">
                    {{ $i18n.locale === 'vn' ? cate1.name : cate1.name_en ?? cate1.name }}
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="body-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" @click="goPage(`/san-pham/${_product.attributes.slug}`)"
                    v-for="(_product, index) in cate1.products.data" :key="index" v-if="index <= 7">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9"
                      :src="_product.attributes.thub_header.data?.attributes.formats.small.url"></ThumbImage>
                    <div class="body-menu-aura-text">
                      {{ _product.attributes.name }}
                    </div>
                  </b-col>
                  <!-- <b-col cols="3">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9" src="/images/menu-product-2.jpg"
                      @click="goPage('/chuyen-muc/duoc-my-pham')"></ThumbImage>
                    <div @click="goPage('/chuyen-muc/duoc-my-pham')" class="body-menu-aura-text">
                      Spotless Filter Correcting Cream
                    </div>
                  </b-col>
                  <b-col cols="3">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9" src="/images/menu-product-3.jpg"
                      @click="goPage('/chuyen-muc/duoc-my-pham')"></ThumbImage>
                    <div @click="goPage('/chuyen-muc/duoc-my-pham')" class="body-menu-aura-text">
                      Advanced Re-Genesis Skin Therapy
                    </div>
                  </b-col>
                  <b-col cols="3">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9" src="/images/menu-product-4.jpg"
                      @click="goPage('/chuyen-muc/duoc-my-pham')"></ThumbImage>
                    <div @click="goPage('/chuyen-muc/duoc-my-pham')" class="body-menu-aura-text">
                      BodySilk Moisturizer
                    </div>
                  </b-col> -->
                </b-row>
              </b-container>
            </div>
          </div>
          <div class="custom-club-menu" v-show="hoverShow === 'tab1'" @mouseleave="mouseOver('')">
            <b-container style="position: relative;">
              <div class="custom-club-menu-arrow menu-arrow-cate2"></div>
            </b-container>
            <div class="head-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" class="head-menu-text">
                    {{ $i18n.locale === 'vn' ? cate2.name : cate2.name_en ?? cate2.name }}
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="body-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" @click="goPage(`/san-pham/${_product.attributes.slug}`)"
                    v-for="(_product, index) in cate2.products.data" :key="index" v-if="index <= 7">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9"
                      :src="_product.attributes.thub_header.data?.attributes.formats.small.url"></ThumbImage>
                    <div class="body-menu-aura-text">
                      {{ _product.attributes.name }}
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
          <div class="custom-club-menu" v-show="hoverShow === 'tab2'" @mouseleave="mouseOver('')">
            <b-container style="position: relative;">
              <div class="custom-club-menu-arrow menu-arrow-cate3"></div>
            </b-container>
            <div class="head-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" class="head-menu-text">
                    {{ $i18n.locale === 'vn' ? cate3.name : cate3.name_en ?? cate3.name }}
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="body-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" @click="goPage(`/san-pham/${_product.attributes.slug}`)"
                    v-for="(_product, index) in cate3.products.data" :key="index" v-if="index <= 7">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9"
                      :src="_product.attributes.thub_header.data?.attributes.formats.small.url"></ThumbImage>
                    <div class="body-menu-aura-text">
                      {{ _product.attributes.name }}
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
          <div class="custom-club-menu" v-show="hoverShow === 'aura'" @mouseleave="mouseOver('')">
            <b-container style="position: relative;">
              <div class="custom-club-menu-arrow menu-arrow-aura"></div>
            </b-container>
            <div class="head-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" class="head-menu-text">
                    Aura Club
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="body-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" @click="goPage('/aura-club')">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9" src="/images/menu-aura-1.jpg">
                    </ThumbImage>
                    <div class="body-menu-aura-text">{{ $t('Club_cate_knowledge') }}</div>
                  </b-col>
                  <b-col cols="3" @click="goPage('/aura-club')">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9" src="/images/menu-aura-2.jpg">
                    </ThumbImage>
                    <div class="body-menu-aura-text">{{ $t('Club_cate_skincare') }}</div>
                  </b-col>
                  <b-col cols="3" @click="goPage('/aura-club')">
                    <ThumbImage style="width: 80%;cursor: pointer;" ratio="21-9" src="/images/menu-aura-3.jpg">
                    </ThumbImage>
                    <div class="body-menu-aura-text">{{ $t('Club_cate_news') }}</div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
          <div class="custom-club-menu" v-show="hoverShow === 'lienhe'" @mouseleave="mouseOver('')">
            <b-container style="position: relative;">
              <div class="custom-club-menu-arrow menu-arrow-contact"></div>
            </b-container>
            <div class="head-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" class="head-menu-text">
                    {{ $t('Contact') }}
                  </b-col>
                  <b-col cols="3" class="head-menu-text">
                    {{ $t('Header_question') }}
                  </b-col>
                  <b-col cols="3" class="head-menu-text">
                    {{ $t('Header_support') }}
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="body-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3">
                    <div class="body-menu-text" @click="goPage('/thong-tin-mua-sam')">{{ $t('Place') }}</div>
                    <div class="body-menu-text" @click="goPage('/kinh-doanh-cung-nas')">{{ $t('Header_about_des_1') }}
                    </div>
                    <div class="body-menu-text" @click="goPage('/lien-he')">{{ $t('Header_about_des_2') }}</div>
                    <div class="body-menu-text" @click="goPage('/cham-soc-khach-hang')">{{ $t('Customer') }}</div>
                  </b-col>
                  <b-col cols="3">
                    <div class="body-menu-text" @click="goPage('/don-hang')">{{ $t('Header_about_des_3') }}</div>
                    <div class="body-menu-text" @click="goPage('/faq')">FAQs</div>
                  </b-col>
                  <b-col cols="3">
                    <div class="body-menu-text">{{ $t('Header_about_des_4') }}</div>
                    <div class="body-menu-text">8h00-12h00 | 13h00-17h00</div>
                    <div class="body-menu-text">{{ $t('Header_about_des_5') }}</div>
                    <div class="body-menu-text">1800 545463</div>
                  </b-col>
                  <b-col cols="3">
                    <ThumbImage ratio="21-9" src="/images/menu-contact.jpg"></ThumbImage>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
          <div class="custom-club-menu" v-show="hoverShow === 'thanhvien' && loggedIn" @mouseleave="mouseOver('')">
            <b-container style="position: relative;">
              <div class="custom-club-menu-arrow menu-arrow-club"></div>
            </b-container>
            <div class="head-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3" class="head-menu-text">
                    {{ $t('Members') }}
                  </b-col>
                  <b-col cols="3" v-if="loggedIn" class="head-menu-text">
                    {{ $t('Header_member_hello') }} {{ profile.username }}
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="body-menu-club">
              <b-container>
                <b-row>
                  <b-col cols="3">
                    <div class="body-menu-text" @click="goPage('/thanh-vien-nas#tab1')">{{ $t('Header_member_des_1') }}
                    </div>
                    <div class="body-menu-text" @click="goPage('/thanh-vien-nas#tab2')">{{ $t('Header_member_des_2') }}
                    </div>
                    <!-- <div class="body-menu-text" @click="goPage('/thanh-vien-nas#tab3')">{{ $t('Header_member_des_3') }}
                    </div> -->
                    <div class="body-menu-text" @click="goPage('/thanh-vien-nas#tab4')">{{ $t('Header_member_des_4') }}
                    </div>
                    <div class="body-menu-text" @click="goPage('/thanh-vien-nas#tab5')">{{ $t('Header_member_des_5') }}
                    </div>
                    <div class="body-menu-text" @click="goPage('/thanh-vien-nas#tab6')">{{ $t('Header_member_des_6') }}
                    </div>
                  </b-col>
                  <b-col cols="3" v-if="loggedIn" class="head-menu-text">
                    <img class="body-menu-icon" src="/images/logout.png" />
                    <span class="body-menu-logout" @click="logoutAction()">
                      Log Out
                    </span>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
          <!-- <b-popover target="popover-user-info" triggers="hover" placement="bottomleft">
            <template #title>Thông tin người dùng</template>
            <div>
              <div v-if="loggedIn">
                <div class="profile-item">{{ profile.username }}</div>
                <div class="profile-item" @click="goPage('/don-hang')">Thông tin đơn hàng</div>
                <div class="profile-item-last">Đơn hàng đã mua</div>
                <div class="nas-btn" @click="logoutAction()">Đăng xuất</div>
              </div>
              <div v-else>
                <div class="nas-btn" @click="openLoginPopup()">Đăng nhập</div>
              </div>
            </div>
          </b-popover> -->
        </div>

      </div>
      <div class="container-header-mobile" v-if="isMobile">
        <NuxtLink to="/">
          <img class="menu-logo" src="/images/logo.png" />
        </NuxtLink>
        <div class="float-right d-flex d-flex justify-content-between align-items-center">
          <img class="menu-icon" src="/images/Search.png" @click="onShowSearch()" />
          <!-- <div id="popover-user-info-mobile">
            <img class="menu-icon-user" src="/images/user.png" @click="goPage('/thanh-vien-nas')" />
          </div> -->
          <img class="menu-icon-bag" src="/images/Bag.png" @click="onShowCart()" />
          <!-- <img class="menu-icon-lang" src="/images/lang.png" /> -->
          <div v-if="$i18n.locale === 'vn'" :class="`lang-btn ${$i18n.locale === 'en' ? 'lang-btn-active' : ''}`"
            @click="changeLang()">EN</div>
          <div v-if="$i18n.locale === 'en'" :class="`lang-btn ${$i18n.locale === 'vn' ? 'lang-btn-active' : ''}`"
            @click="changeLang()">VI</div>
          <img class="menu-icon-show" @click="openMenu()" src="/images/show.png" />
        </div>
        <div class="menu-mobile" v-if="showMenu">
          <div class="menu-text" @click="goPage('/ve-nas')">{{ $t('About') }}</div>
          <div class="menu-text" @click="goPage(`/chuyen-muc/${_cate.attributes.slug}`)"
            v-for="(_cate, idx) in listCategory" :key="idx">
            {{ $i18n.locale === 'vn' ? _cate.attributes.name : _cate.attributes.name_en ?? _cate.attributes.name }}
          </div>
          <div class="menu-text" @click="goPage('/aura-club')">Aura Club</div>
          <div class="menu-text" @click="menu_hide = !menu_hide">{{ $t('Contact') }}</div>
          <div class="menu-sub-hide" v-show="menu_hide">
            <div class="menu-text-sub-mobile" @click="goPage('/thong-tin-mua-sam')">{{ $t('Place') }}</div>
            <div class="menu-text-sub-mobile" @click="goPage('/kinh-doanh-cung-nas')">{{ $t('Header_about_des_1') }}</div>
            <div class="menu-text-sub-mobile" @click="goPage('/lien-he')">{{ $t('Menu_sub_3') }}</div>
            <div class="menu-text-sub-mobile" @click="goPage('/cham-soc-khach-hang')">{{ $t('Menu_sub_4') }}</div>
            <div class="menu-text-sub-mobile-last" @click="goPage('/faq')">{{ $t('Menu_sub_5') }}</div>
            <div class="menu-text-sub-mobile-last" @click="goPage('/don-hang')">{{ $t('Header_about_des_3') }}</div>
          </div>
          <div class="menu-text" @click="goPage('/thanh-vien-nas')">{{ $t('Members') }}</div>
          <div class="menu-text">
            <img class="icon-hide" @click="closeMenu()" src="/images/arrow-top.png" />
          </div>
        </div>
        <!-- <b-popover target="popover-user-info-mobile" triggers="hover" placement="bottomright">
          <template #title>Thông tin người dùng</template>
          <div v-if="loggedIn">
            <div class="profile-item">{{ profile.username }}</div>
            <div class="profile-item" @click="goPage('/don-hang')">Thông tin đơn hàng</div>
            <div class="profile-item-last">Đơn hàng đã mua</div>
            <div class="nas-btn" @click="logoutAction()">Đăng xuất</div>
          </div>
          <div v-if="!loggedIn">
            <div class="nas-btn" @click="openLoginPopup()">Đăng nhập</div>
          </div>
        </b-popover> -->
      </div>
      <!-- @click="showListCart = false" -->
      <div v-show="showListCart" class="backgroud-black">
        <div id="list-cart-content" class="list-cart-content" v-click-outside="hideCart">
          <ListCartItem :showListCart.sync="showListCart" :isMobile="isMobile" :listCart="listUserCart"
            @hideListCart="() => { showListCart = false; isOpen = false }" />
        </div>
      </div>
      <div v-if="showEmpty" class="user-cart-empty">
        <div class="user-list-cart-panel d-flex justify-content-between align-items-center" @click="onShowCart">
          <div class="user-cart-title">{{ $t('Payment_your_cart') }}</div>
          <img class="user-cart-close-outline" src="/images/close-outline.png" @click="showEmpty = false"></img>
        </div>
        <img class="user-cart-empty-image" src="/images/cart-outline.png"></img>
        <div class="user-cart-empty-title">{{ $t('Payment_cart_empty') }}</div>
        <div class="user-cart-empty-des">{{ $t('Payment_cart_empty_des') }}</div>
      </div>
      <LoginPopup :isMobile="isMobile" :show="showLogin" @closeUpdate="closeUpdate" />
      <div v-if="showSearchProduct" class="backgroud-black">
        <div id="list-search-product" class="list-search-product">
          <img class="close-btn" src="/images/Dell_light.png" @click="hideSearch()" />
          <b-form-input class="input-search" v-model="searchText" @onChange="(e) => onSearch(e)"
            :placeholder="this.$t('Header_member_des_7')"></b-form-input>
          <div class="search-filter">
            <div class="search-item">
              <div class="search-title">{{ $t('Category_sort') }}</div>
              <Select :default="$i18n.locale === 'vn' ? 'Mặc định' : 'Default'"
                :listItem="$i18n.locale === 'vn' ? sortOpt : sortEnOpt" @onChange="(e) => loadProducts({ sort: e })" />
            </div>
            <div class="search-item">
              <div class="search-title">{{ $t('Category_filter') }}</div>
              <Select :default="$i18n.locale === 'vn' ? 'Tất cả' : 'All'"
                :listItem="$i18n.locale === 'vn' ? filterOpt : filterEnOpt"
                @onChange="(e) => loadProducts({ filterSub: e })" />
            </div>
          </div>
          <div class="search-products">
            <b-row v-if="listProduct && listProduct.length > 0" style="margin: 0px;">
              <b-col class="mb-3" md="4" cols="6" v-for="(item, index) in listProduct" :key="index">
                <ProductItem :item="item" :isMobile="isMobile" />
              </b-col>
            </b-row>
            <div v-else>
              <div class="category-empty">{{ $t('Catogory_empty_product') }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
  <!-- <div class="container d-flex">
    <div>
      <nuxt-link to="/">
        <img class="logo" src="/images/logo.png" alt="logo" />
      </nuxt-link>
    </div>
    <div v-if="$i18n.locale === 'vn'" class="lang-btn" @click="changeLang()">ENG</div>
    <div v-else class="lang-btn" @click="changeLang()">VIE</div>
    <div class="div-right" @click="openMenu()">
      <img class="lang" src="/images/top_right.png" />
    </div>
  </div> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import ProductItem from "~/components/category/productItem.vue"
import Select from "~/components/common/select.vue"
import ListCartItem from "~/components/category/cartList.vue"
import LoginPopup from "~/components/loginpopup.vue"
export default {
  mixins: [general],
  data() {
    return {
      className: 'header',
      showMenu: false,
      lang: 'en',
      isMobile: false,
      lastScrollTop: 0,
      showEmpty: false,
      showListCart: false,
      showLogin: false,
      hoverShow: '',
      isOpen: false,
      menu_hide: false,
      showSearchProduct: false,
      searchText: null,
      timeOut: null,
      cate1: {
        products: { data: [] }
      },
      cate2: {
        products: { data: [] }
      },
      cate3: {
        products: { data: [] }
      },
      sort: null,
      sortOpt: [
        { item: 'order:desc', name: 'Mặc định' },
        { item: 'price:asc', name: 'Giá từ thấp tới cao' },
        { item: 'price:desc', name: 'Giá từ cao tới thấp' },
        { item: 'sold:desc', name: 'Lượt mua' }
      ],
      sortEnOpt: [
        { item: 'order:desc', name: 'Default' },
        { item: 'price:asc', name: 'Price from low to high' },
        { item: 'price:desc', name: 'Price from hight to low' },
        { item: 'sold:desc', name: 'Purchases' }
      ],
      filterSub: '',
      filterOpt: [],
      filterEnOpt: [],
    }
  },
  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      loggedIn: "auth/getloggedIn",
      listCategory: "category/getListCategory",
      listUserCart: "cart/getListUserCart",
      listProduct: "product/getListProduct",
      listSubCategory: "category/getListSubCategory",
    }),
  },
  components: {
    ListCartItem,
    LoginPopup,
    ProductItem,
    Select
  },
  watch: {
    searchText: function (val) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
        this.timeOut = null;
      }
      this.timeout = setTimeout(async () => {
        this.loadProducts()
      }, 400)
    },
  },
  async mounted() {
    let llang = window.localStorage.getItem('lang')
    if (llang) {
      this.lang = llang
      this.$i18n.locale = llang
    }
    window.addEventListener('scroll', this.handleScroll);
    this.isMobile = this.checkMobile()
    this.showLogin = false
    this.setLoggedIn()
    await this.getListCategory({ sort: 'order:desc' })
    if (this.listCategory.length >= 3) {
      this.cate1 = this.listCategory[0].attributes
      this.cate2 = this.listCategory[1].attributes
      this.cate3 = this.listCategory[2].attributes
    }
    this.getListCartUser()
    this.getSiteInfo()
    this.getNasInfo()
    this.getBannerInfo()
    await this.getListSubCategory()
    if (this.listSubCategory && this.listSubCategory.length > 0) {
      this.filterOpt = [{ item: null, name: 'Tất cả' }]
      let temp = this.listSubCategory.map(o => {
        return {
          item: o.id,
          name: o.attributes.name,
        }
      })
      this.filterOpt = [...this.filterOpt, ...temp]
      this.filterEnOpt = [{ item: null, name: 'All' }]
      temp = this.listSubCategory.map(o => {
        return {
          item: o.id,
          name: o.attributes.name_en,
        }
      })
      this.filterEnOpt = [...this.filterEnOpt, ...temp]
    }

  },
  methods: {
    ...mapActions({
      setLoggedIn: "auth/setLoggedIn",
      userLogout: "auth/logout",
      getSiteInfo: "common/getSiteInfo",
      getNasInfo: "common/getNasInfo",
      getBannerInfo: "common/getBannerInfo",
      getListCategory: "category/getListCategory",
      getListSubCategory: "category/getListSubCategory",
      getListCartUser: "cart/getListCartUser",
      getListProduct: "product/getListProduct"
    }),
    hideCart() {
      if (this.isOpen) {
        this.showListCart = false
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
    changeLang() {
      if (this.lang === 'en') {
        this.lang = 'vn'
        this.$i18n.locale = 'vn'
        window.localStorage.setItem('lang', 'vn')
      } else {
        this.lang = 'en'
        this.$i18n.locale = 'en'
        window.localStorage.setItem('lang', 'en')
      }
    },
    mouseOver(_value) {
      this.hoverShow = _value
    },
    handleScroll(e) {
      let scrollTop = window.scrollY

      // if (scrollTop > this.lastScrollTop) {
      //   this.className = 'header'
      // } else {
      if (scrollTop > 5 && !this.isMobile) {
        this.className = 'header header-fix'
      } else {
        this.className = 'header'
      }
      // }
      this.lastScrollTop = scrollTop
    },
    goPage(url) {
      this.showMenu = false;
      if ((url === '/thanh-vien-nas' || url === '/gio-hang' || url === '/don-hang') && !this.loggedIn) {
        this.showNotification('primary', `Vui lòng tạo thành viên để tham gia cùng NAS`)
        this.$router.push({ path: this.localePath('/dang-ky') })
      } else {
        this.$router.push({ path: this.localePath(url) })
      }
    },
    openMenu() {
      this.showMenu = true
    },
    closeMenu() {
      this.showMenu = false
    },
    changeLang() {
      if (this.lang === 'en') {
        this.lang = 'vn'
        this.$i18n.locale = 'vn'
        window.localStorage.setItem('lang', 'vn')
        // this.$router.go()
      } else {
        this.lang = 'en'
        this.$i18n.locale = 'en'
        window.localStorage.setItem('lang', 'en')
        // this.$router.go()
      }
    },
    checkMobile() {
      if (!process.server) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      }
    },
    openLoginPopup() {
      this.showLogin = true
    },
    closeUpdate() {
      this.showLogin = false
    },
    async onShowCart() {
      await this.getListCartUser()
      if (this.listUserCart.length === 0) {
        this.showEmpty = !this.showEmpty
      } else {
        this.showListCart = true
      }
    },
    logoutAction() {
      this.userLogout()
      this.showNotification('success', `Đăng xuất thành công`)
      this.$router.push({ path: '/' })
    },
    onShowSearch() {
      this.showSearchProduct = true
      this.getListProduct()
    },
    hideSearch() {
      this.showSearchProduct = false
      this.searchText = null
    },
    async loadProducts(_data) {
      let arrayFilter = []
      if (this.searchText) {
        arrayFilter.push({
          name: { $containsi: this.searchText }
        })
        arrayFilter.push({
          title: { $containsi: this.searchText }
        })
      }
      let sort = 'order:desc,id:desc'
      if (_data && _data.sort) {
        sort = _data.sort + ',order:desc'
      } else {
        sort = 'order:desc'
      }
      if (_data && _data.filterSub) {
        arrayFilter.push({ subcategories: _data.filterSub })
      }
      await this.getListProduct({ filters: { '$or': arrayFilter }, sort })
    }
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  }
}
</script>
<style lang="scss">
.header {
  position: absolute;
  padding-top: 40px;
  height: 180px;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 3;
}

.header-logo {
  margin-bottom: 30px;
}

.container-header {
  border-bottom: 1px solid #000;
  padding-bottom: 20px;
}

.header-lang-content {
  position: absolute;
  right: 2px;
  top: -35px;
}

.lang-btn {
  cursor: pointer;
  font-size: 15px;
  font-family: 'inter-light';
  color: #2F3036;
  text-transform: uppercase;
  display: inline-block;
  margin-left: 16px;
}

.lang-btn-active {
  font-family: 'inter';
  font-weight: 600;
}

.header-fix {
  position: fixed;
  padding-top: 30px;
  height: 140px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 44.26%, rgba(255, 255, 255, 0.54) 88.51%, rgba(255, 255, 255, 0) 132.77%);
  backdrop-filter: blur(4px);
  border: 1px solid #FFF;
  z-index: 99999;

  .container-header {
    border-bottom: none;
    padding-bottom: 10px;
  }

  .menu-logo {
    transform: scale(0.7) translatex(-25px);
  }
}

.menu-logo {
  transition: all .6s ease-in-out;
}

.menu-text {
  margin-right: 30px;
  font-size: 16px;
  padding: 0px 5px;
  cursor: pointer;

  &:hover {
    font-weight: bolder;
  }
}

.menu-control {
  right: 5px;
  top: 10px;
  position: absolute;
}

.menu-icon {
  cursor: pointer;
  margin-left: 25px;
  width: 17px;
  height: 17px;
  margin-top: 4px;
}

.menu-icon-bag {
  cursor: pointer;
  margin-left: 25px;
  width: 17px;
  height: 17px;
  margin-top: 2px;
}

.menu-icon-user {
  cursor: pointer;
  margin-left: 25px;
  width: 23px;
  height: 23px;
}

.nas-btn {
  cursor: pointer;
  height: 40px;
  width: 100%;
  color: #fff;
  background: #F593A5;
  border: 1px solid #E8E8E8;
  border-radius: 20px;
  font-size: 13px;
  line-height: 38px;
  text-align: center;
  font-family: 'inter-light';
}

.profile-item {
  height: 40px;
  line-height: 38px;
  text-align: center;
  border-bottom: 1px solid #E8E8E8;
  cursor: pointer;
}

.profile-item-last {
  height: 40px;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
}

.custom-club-menu {
  width: 100vw;
  position: absolute;
  left: 0px;
  background-color: #fff;
  top: 149px;

  .menu-arrow-contact {
    right: 600px;
  }

  .menu-arrow-club {
    right: 490px;
  }

  .menu-arrow-aura {
    right: 700px;
  }

  .menu-arrow-cate3 {
    left: 450px;
  }

  .menu-arrow-cate2 {
    left: 290px;
  }

  .menu-arrow-cate1 {
    left: 130px;
  }

  .custom-club-menu-arrow {
    top: -20px;
    position: absolute;
    display: block;
    width: 1rem;
    height: 0.5rem;
    margin: 0 0.3rem;

    &::before {
      top: 0;
      border-width: 0 1.5rem 1.5rem 1.5rem;
      position: absolute;
      display: block;
      content: "";
      border-color: transparent;
      border-style: solid;
      box-sizing: border-box;
    }

    &::after {
      top: 1px;
      border-width: 0 1.5rem 1.5rem 1.5rem;
      border-bottom-color: #fff;
      position: absolute;
      display: block;
      content: "";
      border-left-color: transparent;
      border-style: solid;
      border-top-color: transparent;
      border-right-color: transparent;
      box-sizing: border-box;
      background-color: transparent;
    }
  }

  .head-menu-club {
    height: 48px;
    line-height: 46px;
    border-bottom: 1.5px solid var(--neutral-color-n-6, #F4F4F4);

    .head-menu-text {
      font-size: 16px;
      color: #1C1D1F;
    }
  }

  .body-menu-club {
    padding-top: 30px;
    padding-bottom: 30px;

    .body-menu-text {
      color: #1C1D1F;
      font-size: 13px;
      font-family: 'inter-light';
      margin-bottom: 8px;
      cursor: pointer;
    }

    .body-menu-aura-text {
      color: #777;
      font-family: 'inter';
      font-size: 14px;
      text-transform: uppercase;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .body-menu-icon {
      margin-right: 12px;
      margin-top: -3px;
    }

    .body-menu-logout {
      color: #1C1D1F;
      font-family: 'inter-light';
      cursor: pointer;
      font-size: 13px;
      text-decoration-line: underline;
    }
  }
}

.list-cart-content {
  position: absolute;
  background-color: #fff;
  width: 680px;
  top: 0px;
  right: 0px;
  padding: 94px 36px 20px 36px;
}

.category-empty {
  margin-top: 350px;
  margin-bottom: 100px;
  font-size: 28px;
  text-align: center;
}

.list-search-product {
  background-color: #fff;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  padding: 90px;
  border-radius: 20px;
  position: relative;

  .input-search {
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
  }

  .search-filter {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 40px;
    text-align: right;

    .search-item {
      display: inline-block;
      margin-right: 15px;
      text-align: left;
    }
  }

  .search-products {
    max-height: calc(100vh - 380px);
    overflow-y: scroll;
    width: 100%;
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
  .menu-text {
    font-size: 15px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .menu-text {
    font-size: 12px;
    margin-right: 20px;
  }
}

@media (max-width: 520px) {
  .header {
    height: 50px;
    padding-top: 0px;
    left: 0px;
    top: 0px;
    background: rgba(255, 255, 255, 0.9);
    position: fixed;
  }

  .container-header {
    display: none;
  }

  .container-header-mobile {
    border-bottom: none;

    .menu-logo {
      width: 55px;
      margin-top: 16px;
    }
  }

  .menu-icon {
    display: inline;
    margin-left: 15px;
    width: 10px;
    height: 10px;
    margin-top: 16px;
  }

  .menu-icon-bag {
    display: inline;
    margin-left: 15px;
    width: 12px;
    height: 12px;
    margin-top: 16px;
  }

  .menu-icon-user {
    display: inline;
    margin-left: 15px;
    width: 14px;
    height: 14px;
    margin-top: 16px;
  }

  .menu-icon-show {
    display: inline;
    margin-left: 15px;
    width: 16px;
    margin-top: 16px;
    cursor: pointer;
  }

  .menu-icon-lang {
    display: inline;
    margin-left: 15px;
    width: 10px;
    margin-top: 16px;
  }

  .menu-mobile {
    width: 100%;
    height: 100vh;
    position: fixed;
    background: rgba(255, 255, 255, 0.9);
    left: 0px;
    top: 0px;
    z-index: 1;
    padding-top: 70px;
    margin-top: 50px;
  }

  .menu-text {
    width: 100%;
    text-align: center;
    font-size: 23px;
    line-height: 30px;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 30px;
  }

  .menu-text-sub-mobile {
    margin-left: 50%;
    transform: translate(-50%);
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    text-transform: uppercase;
    color: #515151;
    margin-bottom: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid;
  }

  .menu-text-sub-mobile-last {
    margin-left: 50%;
    transform: translate(-50%);
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    text-transform: uppercase;
    color: #515151;
    margin-bottom: 10px;
  }

  .lang-btn {
    font-size: 12px;
    margin-top: 17px;
    line-height: 12px;
  }

  .list-cart-content {
    width: 100%;
    padding: 20px 10px;
  }

  .list-cart-main-list {
    .list-cart-product-name {
      font-size: 13px !important;
    }

    .list-cart-product-des {
      font-size: 10px !important;
    }

    .list-card-div-check {
      width: 40px !important;
    }

    .list-card-div-price {
      font-size: 16px;
    }

    .volumn-btn {
      width: 65px;
      height: 20px;

      .volumn-btn-sub {
        width: 15px;
        line-height: 18px;
      }

      .volumn-number {
        line-height: 18px;
      }
    }
  }

  .user-cart-empty {
    text-align: center;
    width: calc(100%);
    padding: 20px 20px;
    background: #FFF;
    border: 1px solid #F4F4F4;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    margin-top: 18px;

    .user-cart-empty-title {
      color: #100F0F;
      font-family: 'inter';
      font-weight: 700;
    }
  }

  .list-search-product {
    background-color: #fff;
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    padding: 50px 20px;
    border-radius: 20px;
    position: relative;

    .input-search {
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
    }

    .search-filter {
      width: 100%;
      margin-top: 30px;
      margin-bottom: 40px;
      text-align: right;

      .search-item {
        display: inline-block;
        margin-right: 5px;
        text-align: left;
      }
    }

    .search-products {
      max-height: calc(100vh - 380px);
      overflow-y: scroll;
      width: 100%;
    }
  }
}
</style>
