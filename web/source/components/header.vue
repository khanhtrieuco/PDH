<template>
  <div :class="className">
    <header class="container">
      <div class="container-header" v-if="!isMobile">
        <div class="d-flex justify-content-between">
          <div class="header-lang-content">
            <span :class="`lang-btn ${$i18n.locale === 'en' ? 'lang-btn-active' : ''}`" @click="changeLang()">EN</span>
            <span>/</span>
            <span :class="`lang-btn ${$i18n.locale === 'vn' ? 'lang-btn-active' : ''}`" @click="changeLang()">VI</span>
          </div>
          <span @click="choicetab(idx + 1)" class="menu-text" v-for="(_i, idx) in listCollection" :key="idx">
            {{ $i18n.locale === 'vn' ? _i.attributes.name : _i.attributes.name_en ?? _i.attributes.name }}
          </span>
          <div @click="goPage('/')">
            <img v-if="!tab" class="menu-logo" src="/images/logo-head.png" />
            <img v-else class="menu-logo" src="/images/menu.png" />
          </div>
          <span class="menu-text" @click="choicetab(4)">{{ $t('About') }}</span>
          <span class="menu-text" @click="choicetab(5)">{{ $t('Friendship') }}</span>
          <div class="d-inline-flex" style="position: relative;">
            <img class="menu-icon" src="/images/Search.png" @click="onShowSearch()" />
            <img class="menu-icon-bag" src="/images/Bag.png" @click="onShowCart()" />
          </div>
        </div>
      </div>
      <!-- <div class="container-header-mobile" v-if="isMobile">
        <NuxtLink to="/">
          <img class="menu-logo" src="/images/logo.png" />
        </NuxtLink>
        <div class="float-right d-flex d-flex justify-content-between align-items-center">
          <img class="menu-icon" src="/images/Search.png" @click="onShowSearch()" />
          <img class="menu-icon-bag" src="/images/Bag.png" @click="onShowCart()" />
          <img class="menu-icon-lang" src="/images/lang.png" />
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
      </div> -->
    </header>
    <div v-if="tab === 1" class="header-tab-menu">
      <div class="container header-tab-menu-container d-flex justify-content-start">
        <div class="header-tab-menu-col-1">
          <div class="header-tab-menu-title">EVENING GOWN</div>
          <div class="header-tab-menu-text" @click="goPage('/collection/121')">Women’s SS23 Collection</div>
          <div class="header-tab-menu-text" @click="goPage('/collection/121')">Women’s AW23 Collection</div>
        </div>
        <div class="header-tab-menu-col-1">
          <div class="header-tab-menu-title">READY TO WEAR</div>
          <div class="header-tab-menu-text">View all</div>
          <div class="header-tab-menu-text">Tailoring</div>
          <div class="header-tab-menu-text">Coats and Outerwear</div>
          <div class="header-tab-menu-text">Jackets and Blazes</div>
          <div class="header-tab-menu-text">Dresses</div>
          <div class="header-tab-menu-text">Top and Shirts</div>
        </div>
        <div class="header-tab-menu-col-1">
          <div class="header-tab-menu-text">T-Shirts and Sweatshirts</div>
          <div class="header-tab-menu-text">Skirts</div>
          <div class="header-tab-menu-text">Trousers</div>
          <div class="header-tab-menu-text">Knitwear</div>
          <div class="header-tab-menu-text">Denim</div>
        </div>
        <div class="header-tab-menu-col-1">
          <div class="header-tab-menu-title">HAND BAGS</div>
          <div class="header-tab-menu-text">View all</div>
          <div class="header-tab-menu-text">Shoulder Bags</div>
          <div class="header-tab-menu-text">Crossbody Bags</div>
          <div class="header-tab-menu-text">Top Handles</div>
          <div class="header-tab-menu-text">Mini Bags</div>
          <div class="header-tab-menu-text">Clutches</div>
          <div class="header-tab-menu-text">Tote Bags (or Totes)</div>
        </div>
        <div class="header-tab-menu-col-1">
          <div class="header-tab-menu-title">SHOES</div>
          <div class="header-tab-menu-text">View all</div>
          <div class="header-tab-menu-text">Boots</div>
          <div class="header-tab-menu-text">Pumps</div>
          <div class="header-tab-menu-text">Sanddals and Slides</div>
          <div class="header-tab-menu-text">Flat Shoes</div>
          <div class="header-tab-menu-text">Sneakers</div>
        </div>
      </div>
    </div>
    <div v-if="tab === 4" class="header-tab-menu">
      <div class="container header-tab-menu-container d-flex justify-content-start">
        <div class="header-tab-menu-col-1">
          <div @click="subTab = 1" class="header-tab-menu-title">Shows</div>
          <div @click="subTab = 1" class="header-tab-menu-title">Lookbook</div>
          <div @click="subTab = 1" class="header-tab-menu-title">Campaigns</div>
          <div @click="subTab = 1" class="header-tab-menu-title">News</div>
          <div @click="subTab = 3" class="header-tab-menu-title">About P.D.H</div>
        </div>
        <div class="header-tab-menu-col-2">
          <div class="header-tab-menu-sub" v-if="subTab === 3">
            <div class="header-tab-menu-text" @click="goPage('/house-of-pdh')">brand story</div>
            <div class="header-tab-menu-text" @click="goPage('/house-of-pdh')">vision - mission - value</div>
          </div>
          <div class="header-tab-menu-sub" v-if="subTab === 1">
            <div @click="goPage('/show/121')" class="header-tab-menu-sub-item"
               v-for="_item, index in listShow" :key="index">
              <MenuItem >
              </MenuItem>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tab === 5" class="header-tab-menu">
      <div class="container header-tab-menu-container">
        <div @click="goPage('/account')" class="header-tab-menu-title">My account
        </div>
        <div @click="goPage('/client-service')" class="header-tab-menu-title">Client service</div>
      </div>
    </div>
    <div v-show="showListCart" class="backgroud-black">
        <div id="list-cart-content" class="list-cart-content" v-click-outside="hideCart">
          <ListCartItem :showListCart.sync="showListCart" :isMobile="isMobile" :listCart="listUserCart"
            @hideListCart="() => { showListCart = false; isOpen = false }" />
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import MenuItem from "~/components/home/menuItem.vue"
import ListCartItem from "~/components/user/cartList.vue"
// import Select from "~/components/common/select.vue"
export default {
  mixins: [general],
  data() {
    return {
      className: 'header',
      lang: 'en',
      isMobile: false,
      tab: null,
      subTab: null,
      listCollection: [
        {
          attributes: {
            name: 'Women',
            name_en: 'Women',
            slug: 'women'
          }
        }, {
          attributes: {
            name: 'Man',
            name_en: 'Man',
            slug: 'Man'
          }
        }, {
          attributes: {
            name: 'Gifts',
            name_en: 'Gifts',
            slug: 'Gifts'
          }
        }
      ],
      listShow: [1, 2],
      isOpen: false,
      showListCart: false
    }
  },
  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      loggedIn: "auth/getloggedIn",
      listUserCart: "cart/getListUserCart",
      // listCategory: "category/getListCategory",
    }),
  },
  components: {
    MenuItem,
    ListCartItem
  },
  // watch: {
  //   searchText: function (val) {
  //     if (this.timeOut) {
  //       clearTimeout(this.timeOut);
  //       this.timeOut = null;
  //     }
  //     this.timeout = setTimeout(async () => {
  //       this.loadProducts()
  //     }, 400)
  //   },
  // },
  async mounted() {
    let llang = window.localStorage.getItem('lang')
    if (llang) {
      this.lang = llang
      this.$i18n.locale = llang
    }
    window.addEventListener('scroll', this.handleScroll);
    this.isMobile = this.checkMobile()
    this.setLoggedIn()
  },
  methods: {
    ...mapActions({
      setLoggedIn: "auth/setLoggedIn",
      userLogout: "auth/logout",
      getListCartUser: "cart/getListCartUser",
      // getSiteInfo: "common/getSiteInfo",
      // getListCategory: "category/getListCategory"
    }),
    hideCart() {
      if (this.isOpen) {
        this.showListCart = false
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
    async onShowCart() {
      await this.getListCartUser()
      if (this.listUserCart.length === 0) {
        this.showEmpty = !this.showEmpty
      } else {
        this.showListCart = true
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
    // mouseOver(_value) {
    //   this.hoverShow = _value
    // },
    // handleScroll(e) {
    //   let scrollTop = window.scrollY

    //   // if (scrollTop > this.lastScrollTop) {
    //   //   this.className = 'header'
    //   // } else {
    //   if (scrollTop > 5 && !this.isMobile) {
    //     this.className = 'header header-fix'
    //   } else {
    //     this.className = 'header'
    //   }
    //   // }
    //   this.lastScrollTop = scrollTop
    // },
    goPage(url) {
      this.tab = null
      this.showMenu = false;
      this.$router.push({ path: this.localePath(url) })
    },
    openMenu() {
      this.showMenu = true
    },
    closeMenu() {
      this.showMenu = false
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
    choicetab(_tab) {
      if (this.tab === _tab) {
        this.tab = null
      } else {
        this.tab = _tab
      }
      if (_tab === 4) {
        this.subTab = 1
      }
    },
    // closeUpdate() {
    //   this.showLogin = false
    // },
    // async onShowCart() {
    //   await this.getListCartUser()
    //   if (this.listUserCart.length === 0) {
    //     this.showEmpty = !this.showEmpty
    //   } else {
    //     this.showListCart = true
    //   }
    // },
    logoutAction() {
      this.userLogout()
      this.showNotification('success', `Đăng xuất thành công`)
      this.$router.push({ path: '/' })
    },
    // onShowSearch() {
    //   this.showSearchProduct = true
    //   this.getListProduct()
    // },
    // hideSearch() {
    //   this.showSearchProduct = false
    //   this.searchText = null
    // },
    // async loadProducts(_data) {
    //   let arrayFilter = []
    //   if (this.searchText) {
    //     arrayFilter.push({
    //       name: { $containsi: this.searchText }
    //     })
    //     arrayFilter.push({
    //       title: { $containsi: this.searchText }
    //     })
    //   }
    //   let sort = 'order:desc,id:desc'
    //   if (_data && _data.sort) {
    //     sort = _data.sort + ',order:desc'
    //   } else {
    //     sort = 'order:desc'
    //   }
    //   if (_data && _data.filterSub) {
    //     arrayFilter.push({ subcategories: _data.filterSub })
    //   }
    //   await this.getListProduct({ filters: { '$or': arrayFilter }, sort })
    // }
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
  position: fixed;
  z-index: 2;
  bottom: 0px;
  width: 100%;
  height: 67px;
  line-height: 67px;
  background-color: #fff;

  .header-lang-content {
    display: inline-flex;

    span {
      margin-right: 5px;
    }

    .lang-btn {
      cursor: pointer;
      font-size: 18px;
      font-family: 'Aeroport';
      color: #777;
      text-transform: uppercase;
      display: inline-block;
    }

    .lang-btn-active {
      font-weight: 600;
      color: #000;
    }
  }

  .menu-text {
    font-size: 18px;
    cursor: pointer;
    font-family: 'Aeroport';

    &:hover {
      font-weight: bolder;
    }
  }

  .menu-logo {
    width: 300px;
  }

  .menu-icon {
    cursor: pointer;
    margin-left: 20px;
    width: 17px;
    height: 17px;
    margin-top: 26px;
  }

  .menu-icon-bag {
    cursor: pointer;
    margin-left: 20px;
    width: 17px;
    height: 17px;
    margin-top: 25px;
  }

}

.header-tab-menu {
  position: fixed;
  width: 100vw;
  background-color: #fff;
  padding: 50px;
  bottom: 50px;

  .header-tab-menu-container {
    padding: 0px 135px;

    .header-tab-menu-title {
      color: #1E1E1E;
      font-family: 'Aeroport';
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 40px;
      cursor: pointer;

      &:hover {
        text-decoration-line: underline;
      }
    }

    .header-tab-menu-col-1 {
      width: 250px;
      min-height: 400px;
    }

    .header-tab-menu-text {
      color: #000;
      font-family: 'Aeroport-light';
      font-size: 13px;
      line-height: 40px;
      text-transform: uppercase;
      cursor: pointer;
    }

    .header-tab-menu-sub-item {
      display: inline-block;
      float: left;
      width: 280px;
      margin-right: 35px;
    }
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
