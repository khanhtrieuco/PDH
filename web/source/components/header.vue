<template>
  <div :class="className" v-click-outside="closeTab">
    <header class="container" v-if="isMobile === false">
      <div class="container-header">
        <div class="d-flex justify-content-between">
          <!-- <div class="header-lang-content">
            <span :class="`lang-btn ${$i18n.locale === 'en' ? 'lang-btn-active' : ''}`" @click="changeLang()">EN</span>
            <span>/</span>
            <span :class="`lang-btn ${$i18n.locale === 'vn' ? 'lang-btn-active' : ''}`" @click="changeLang()">VI</span>
          </div> -->
          <div v-if="!loggedIn" @click="goLogin" class="menu-auth-btn">Sign in</div>
          <div v-else @click="logoutAction" class="menu-auth-btn">Log out</div>

          <span @click="choicetab(idx + 1)" :class="`menu-text ${tab == (idx + 1) ? 'menu-text-active' : ''}`"
            v-for="(_i, idx) in listCollection" :key="idx">
            <span v-if="idx === 0" :class="`${menuActive === 1 ? 'menu-text-bold' : ''}`">
              {{ $i18n.locale === 'vn' ? _i.name : _i.name_en ?? _i.name }}
            </span>
            <span v-else>{{ $i18n.locale === 'vn' ? _i.name : _i.name_en ?? _i.name }}</span>
          </span>
          <div @click="goPage('/')">
            <img v-if="!tab" class="menu-logo" src="/images/logo-head.png" />
            <img v-else class="menu-logo" src="/images/menu.png" />
          </div>
          <span
            :class="`menu-text menu-text-house ${tab == 4 ? 'menu-text-active' : ''} ${menuActive === 2 ? 'menu-text-bold' : ''}`"
            @click="choicetab(4)">{{ $t('About') }}</span>
          <span
            :class="`menu-text menu-text-house ${tab == 5 ? 'menu-text-active' : ''} ${menuActive === 3 ? 'menu-text-bold' : ''}`"
            @click="choicetab(5)">{{ $t('Friendship')
            }}</span>
          <div class="d-inline-flex menu-icon-div" style="position: relative;">
            <img class="menu-icon" src="/images/search.svg" />
            <!-- <img class="menu-icon-bag" src="/images/bag.svg" @click="onShowCart()" /> -->
            <div class="menu-icon-bag">
              <img style="margin-bottom: 35px;width: 100%;" src="/images/bag.svg" @click="onShowCart()" />
              <div class="menu-icon-bag-num" v-if="num_cart > 0">{{ num_cart }}</div>
            </div>
            <!-- <div class="menu-icon-bag-num" v-if="num_cart > 0">{{ num_cart }}</div> -->
          </div>
        </div>
      </div>
    </header>
    <header :class="menuColor ? '' : 'mobile-container'" v-if="isMobile && showMenuScroll">
      <div class="container container-header">
        <div class="d-flex justify-content-between">
          <img class="menu-logo" @click="goPage('/')" :src="menuColor ? '/images/logo_w.svg' : '/images/logo.png'" />
          <div class="d-inline-flex" style="position: relative;">
            <div class="menu-icon-bag">
              <img style="margin-bottom: 5px;" :src="menuColor ? '/images/bag_w.svg' : '/images/bag_b.svg'" @click="onShowCart()" />
              <div class="menu-icon-bag-num" v-if="num_cart > 0">{{ num_cart }}</div>
            </div>
            <div class="menu-icon">
              <img :src="menuColor ? '/images/search_w.svg' : '/images/search_b.svg'" />
            </div>
            <div v-if="!loggedIn" @click="goLogin" :class="menuColor ? 'menu-auth-btn' : 'menu-auth-btn-b'">Sign in</div>
            <div v-else @click="logoutAction" :class="menuColor ? 'menu-auth-btn' : 'menu-auth-btn-b'">Log out</div>
          </div>
        </div>
        <img class="menu-mobile-icon" v-if="!showMenuMobile && showMenuScroll" src="/images/menu-mobile.png"
          @click="onShowMenuMobile()" />
        <img class="menu-mobile-close-icon" v-if="showMenuMobile" src="/images/menu-close.png"
          @click="onShowMenuMobile()" />
      </div>
    </header>
    <div v-if="showMenuMobile" class="menu-mobile">
      <div class="container">
        <div class="menu-mobile-top d-flex justify-content-between">
          <img class="menu-logo" @click="goPage('/')" src="/images/logo.png" />
          <div class="d-inline-flex" style="position: relative;">
            <img class="menu-icon" src="/images/Search.png" />
            <img class="menu-icon-bag" src="/images/Bag.png" @click="onShowCart()" />
            <!-- <span class="lang-btn" v-if="$i18n.locale === 'en'" @click="changeLang()">EN</span>
            <span class="lang-btn" v-if="$i18n.locale === 'vn'" @click="changeLang()">VI</span> -->
          </div>
        </div>
        <div class="menu-mobile-list">
          <div v-if="!mobileSubMenu" class="menu-mobile-item d-flex justify-content-between"
            @click="openMobile = openMobile === 0 ? null : 0">
            <div class="menu-mobile-title">
              {{ $i18n.locale === 'vn' ? listCollection[0].name : listCollection[0].name_en ?? listCollection[0].name }}
            </div>
            <img class="menu-open" :src="openMobile === 0 ? '/images/menu-up.png' : '/images/menu-down.png'" />
          </div>
          <div v-if="openMobile === 0 && !mobileSubMenu" class="menu-mobile-list-sub">
            <div class="menu-mobile-sub-item d-flex justify-content-between"
              v-for="(coll, idx) in listCollection[0].child" :key="idx" @click="mobileSubMenu = coll">
              <div class="menu-mobile-title">{{ coll.attributes.name }}</div>
              <img class="menu-open" :src="openSubMobile === idx ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div>
          </div>
          <div class="menu-mobile-item d-flex justify-content-between" v-if="mobileSubMenu" @click="mobileSubMenu = null">
            <div class="menu-mobile-title">{{ mobileSubMenu.attributes.name }}</div>
            <img class="menu-left" src="/images/menu-left.png" />
          </div>
          <div v-if="mobileSubMenu && mobileSubMenu?.attributes.collections" class="menu-mobile-list-sub"
            v-for="(subMenu, idx) in mobileSubMenu?.attributes.collections?.data" :key="idx">
            <div class="menu-mobile-sub-item d-flex justify-content-between" v-if="subMenu.attributes.state === 'active'">
              <div class="menu-mobile-title"  @click="goPage(`/collection/${subMenu.attributes.slug}`,subMenu.attributes.view_detail)">
              {{ subMenu.attributes.name }}</div>
            </div>
          </div>
          <div v-if="!mobileSubMenu" class="menu-mobile-item d-flex justify-content-between" @click="openMobile = openMobile === 2 ? null : 2">
            <div class="menu-mobile-title">
              {{ $i18n.locale === 'vn' ? listCollection[1].name : listCollection[1].name_en ?? listCollection[1].name }}
            </div>
            <img class="menu-open" :src="openMobile === 2 ? '/images/menu-up.png' : '/images/menu-down.png'" />
          </div>

          <div v-if="openMobile === 2 && !mobileSubMenu" class="menu-mobile-list-sub">
            <div class="menu-mobile-sub-item d-flex justify-content-between"
              v-for="(coll, idx) in listCollection[1].child" :key="idx" @click="mobileSubMenu = coll">
              <div class="menu-mobile-title">{{ coll.attributes.name }}</div>
              <img class="menu-open" :src="openSubMobile === idx ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div>
          </div>

          <div v-if="!mobileSubMenu" class="menu-mobile-item d-flex justify-content-between"
            @click="openMobile = openMobile === 3 ? null : 3">
            <div class="menu-mobile-title">
              {{ $i18n.locale === 'vn' ? listCollection[2].name : listCollection[2].name_en ?? listCollection[2].name }}
            </div>
            <img class="menu-open" :src="openMobile === 3 ? '/images/menu-up.png' : '/images/menu-down.png'" />
          </div>
          <div v-if="openMobile === 3 && !mobileSubMenu" class="menu-mobile-list-sub">
            <div class="menu-mobile-sub-item d-flex justify-content-between"
              v-for="(coll, idx) in listCollection[2].child" :key="idx" @click="mobileSubMenu = coll">
              <div class="menu-mobile-title">{{ coll.attributes.name }}</div>
              <img class="menu-open" :src="openSubMobile === idx ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div>
          </div>
          <div v-if="!openSubChild" class="menu-mobile-item d-flex justify-content-between"
            @click="() => { mobileSubMenu = null; openMobile = openMobile === 4 ? null : 4 }">
            <div class="menu-mobile-title">House of P.D.H</div>
            <img class="menu-open" :src="openMobile === 4 ? '/images/menu-up.png' : '/images/menu-down.png'" />
          </div>
          <div v-if="openMobile === 4 && !openSubChild" class="menu-mobile-list-sub">
            <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/show')">Shows</div>
              <img class="menu-open" :src="openSubMobile === 1 ? '/images/menu-up.png' : '/images/menu-right.png'"
                @click="goPage('/show')" />
            </div>
            <!-- <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/news')">Lookbook</div>
              <img class="menu-open" :src="openSubMobile === 2 ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div>
            <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/news')">Campaigns</div>
              <img class="menu-open" :src="openSubMobile === 3 ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div>
            <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/news')">News</div>
              <img class="menu-open" @click="goPage('/news')"
                :src="openSubMobile === 4 ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div> -->
            <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/house-of-pdh')">About P.D.H</div>
              <img class="menu-open" @click="goPage('/house-of-pdh')"
                :src="openSubMobile === 5 ? '/images/menu-up.png' : '/images/menu-right.png'" />
            </div>
          </div>
          <div v-if="!openSubChild" class="menu-mobile-item d-flex justify-content-between"
            @click="() => { mobileSubMenu = null; openMobile = openMobile === 5 ? null : 5 }">
            <div class="menu-mobile-title">Friendship</div>
            <img class="menu-open" :src="openMobile === 5 ? '/images/menu-up.png' : '/images/menu-down.png'" />
          </div>
          <div v-if="openMobile === 5 && !openSubChild" class="menu-mobile-list-sub">
            <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/account')">My account</div>
              <img class="menu-open" :src="openSubMobile === 1 ? '/images/menu-up.png' : '/images/menu-right.png'"
                @click="goPage('/account')" />
            </div>
            <div class="menu-mobile-sub-item d-flex justify-content-between">
              <div class="menu-mobile-title" @click="goPage('/client-service')">Client service</div>
              <img class="menu-open" :src="openSubMobile === 2 ? '/images/menu-up.png' : '/images/menu-right.png'"
                @click="goPage('/client-service')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tab === 1 || tab === 2 || tab === 3" class="header-tab-menu">
      <div class="container header-tab-menu-container d-flex justify-content-between">
        <div class="header-tab-menu-col-1" v-for="(_menu, idx) in listCollection[tab-1].child" :key="idx">
          <div class="header-tab-menu-title">{{ _menu.attributes.name }}</div>
          <div class="header-tab-menu-text" v-for="(_coll, index) in _menu.attributes.collections.data" :key="index"
            v-if="_coll?.attributes.state === 'active'"
            @click="goPage(`/collection/${_coll?.attributes.slug}`,_coll?.attributes.view_detail)">{{ _coll?.attributes.name }}</div>
        </div>
      </div>
    </div>
    <div v-if="tab === 4" class="header-tab-menu-about">
      <div class="container header-tab-menu-container d-flex justify-content-start"
        style="position: absolute;bottom: 70px;margin-left: 30px;">
        <div class="header-tab-menu-col-1">
          <div @click="subTab = 1" @mouseover="subTab = 1" class="header-tab-menu-title">Shows</div>
          <!-- <div @click="goPage('/news')" @mouseover="subTab = 2" type="news" class="header-tab-menu-title">Lookbook</div>
          <div @click="goPage('/news')" @mouseover="subTab = 4" type="news" class="header-tab-menu-title">Campaigns
          </div>
          <div @click="goPage('/news')" @mouseover="subTab = 5" type="news" class="header-tab-menu-title">News</div> -->
          <div @click="goPage('/house-of-pdh')" class="header-tab-menu-title">About P.D.H</div>
        </div>
        <div class="header-tab-menu-col-2">
          <div class="header-tab-menu-sub" v-if="subTab === 3">
            <div class="header-tab-menu-text" @click="goPage('/house-of-pdh')">brand story</div>
            <div class="header-tab-menu-text" @click="goPage('/house-of-pdh')">vision - mission - value</div>
          </div>
          <div class="header-tab-menu-sub" v-if="subTab === 1">
            <div @click="goPage(`/show/${_item.attributes.slug}`)" class="header-tab-menu-sub-item"
              v-for="_item, index in listShow" :key="index">
              <MenuItem :link="_item.attributes.slug" :image_link="_item.attributes.thub?.data.attributes.url"
                :title="_item.attributes.name">
              </MenuItem>
            </div>
          </div>
          <div class="header-tab-menu-sub" v-if="subTab === 2">
            <div @click="goPage(`/news`)" class="header-tab-menu-sub-item" v-for="_new, index in listNewsType1"
              :key="index">
              <MenuItem :link="_new.attributes.slug" type="news" :image_link="_new.attributes.thub?.data.attributes.url"
                :title="_new.attributes.title">
              </MenuItem>
            </div>
          </div>
          <div class="header-tab-menu-sub" v-if="subTab === 4">
            <div @click="goPage(`/news`)" class="header-tab-menu-sub-item" v-for="_new, index in listNewsType2"
              :key="index">
              <MenuItem :link="_new.attributes.slug" type="news" :image_link="_new.attributes.thub?.data.attributes.url"
                :title="_new.attributes.title">
              </MenuItem>
            </div>
          </div>
          <div class="header-tab-menu-sub" v-if="subTab === 5">
            <div @click="goPage(`/news`)" class="header-tab-menu-sub-item" v-for="_new, index in listNewsType3"
              :key="index">
              <MenuItem :link="_new.attributes.slug" type="news" :image_link="_new.attributes.thub?.data.attributes.url"
                :title="_new.attributes.title">
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
    <div v-show="showListCart" class="backgroud-black" @click="hideCart()">
      <div id="list-cart-content" class="list-cart-content" @click.stop="">
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
      isMobile: null,
      tab: null,
      isOpenTab: false,
      subTab: null,
      listCollection: [{
        name: 'Women',
        name_en: 'Women',
        child: []
      }, {
        name: 'Man',
        name_en: 'Man',
        child: []
      }, {
        name: 'Gifts',
        name_en: 'Gifts',
        child: []
      }
      ],
      showMenuMobile: false,
      showMenuScroll: true,
      lastScrollTop: 0,
      openMobile: null,
      openSubMobile: null,
      openSubChild: null,
      mobileSubMenu: null,
      isOpen: false,
      showListCart: false,
      listNewsType1: [],
      listNewsType2: [],
      listNewsType3: [],
      menuActive: null,
      menuColor: false,
      num_cart: 0
    }
  },
  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      loggedIn: "auth/getloggedIn",
      listUserCart: "cart/getListUserCart",
      updateCart: "cart/getUpdateCart",
      listCategory: "category/getListCategory",
      listShow: "show/getListShow",
    }),
  },
  components: {
    MenuItem,
    ListCartItem
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    // searchText: function (val) {
    //   if (this.timeOut) {
    //     clearTimeout(this.timeOut);
    //     this.timeOut = null;
    //   }
    //   this.timeout = setTimeout(async () => {
    //     this.loadProducts()
    //   }, 400)
    // },
    $route(to, from) {
      if (this.$route.path.includes('/women')) {
        this.menuActive = 1
      } else if (this.$route.path.includes('/show') || this.$route.path.includes('/news') || this.$route.path.includes('/house-of-pdh')) {
        this.menuActive = 2
      } else if (this.$route.path.includes('/account') || this.$route.path.includes('/client-service')) {
        this.menuActive = 3
      } else {
        this.menuActive = null
      }
      if(this.$route.fullPath === "/") {
        this.menuColor = true
      } else {
        this.menuColor = false
      }
    },
    updateCart: function (val) {
      this.num_cart = this.listUserCart.length
    }
  },
  async mounted() {
    // let llang = window.localStorage.getItem('lang')
    // if (llang) {
    //   this.lang = llang
    //   this.$i18n.locale = llang
    // }

    this.lang = 'en'
    this.$i18n.locale = 'en'
    window.localStorage.setItem('lang', 'en')

    window.addEventListener('scroll', this.handleScroll);
    this.isMobile = this.checkMobile()
    this.setLoggedIn()
    await this.getListCategory({ sort: { 'order': 'desc' }, filters: { type: 'main' } })
    this.listCollection = []
    for (let i = 0; i < this.listCategory.length; i++) {
      let temp = {
        name: this.listCategory[i].attributes.name,
        name_en: this.listCategory[i].attributes.name_en,
      }
      let listColl = this.listCategory[i].attributes.child.data
      for (let j = 0; j < listColl.length; j++) {
        if (listColl[j].attributes.collections.data.length > 8 && !this.isMobile) {
          let listTemp = listColl[j].attributes.collections.data.slice(8)
          listColl[j].attributes.collections.data = listColl[j].attributes.collections.data.slice(0, 8)
          let sTemp = {
            attributes: {
              name: ' ',
              name_en: ' ',
              collections: { data: [...listTemp] }
            }
          }
          listColl.splice(j + 1, 0, sTemp)
        }
      }
      temp.child = listColl
      this.listCollection.push(temp)
      this.getListShow()
    }
    await this.getListCartUser()
    this.loadDataNews()
    this.num_cart = this.listUserCart.length
    let st = document.documentElement.scrollTop;
    if(this.$route.fullPath === "/") {
      if(st < 700) this.menuColor = true
    }
    if(this.$route.fullPath === "/thanh-toan") {
      this.showMenuScroll = false
    }
  },
  methods: {
    ...mapActions({
      setLoggedIn: "auth/setLoggedIn",
      userLogout: "auth/logout",
      getListCartUser: "cart/getListCartUser",
      // getSiteInfo: "common/getSiteInfo",
      getListCategory: "category/getListCategory",
      getListShow: "show/getListShow",
      getMenuNews: "news/getMenuNews"
    }),
    async loadDataNews() {
      this.listNewsType1 = await this.getMenuNews({
        filters: { type: 'lookbook' },
        pagination: { page: 1, pageSize: 2 }
      })
      this.listNewsType2 = await this.getMenuNews({
        filters: { type: 'campaigns' },
        pagination: { page: 1, pageSize: 2 }
      })
      this.listNewsType3 = await this.getMenuNews({
        filters: { type: 'news' },
        pagination: { page: 1, pageSize: 2 }
      })
    },
    closeTab() {
      // if (this.isOpenTab) {
        this.tab = null
      //   this.isOpenTab = false
      // } else {
      //   this.isOpenTab = true
      // }
    },
    hideCart() {
      this.showListCart = false
    },
    async onShowCart() {
      await this.getListCartUser()
      if (this.listUserCart.length === 0) {
        this.showEmpty = !this.showEmpty
      } else {
        this.showListCart = true
      }
      // this.showMenuMobile = false
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
    goPage(url,view_detail) {
      // if (url.includes('collection') && view_detail !== true) return
      this.mobileSubMenu = null
      if (this.$router.history.current.path !== url) {
        this.tab = null
        this.showMenuMobile = false;
        this.openMobile = null;
        this.openSubMobile = null;
        this.$router.push({ path: this.localePath(url) })
      }
    },
    goLogin() {
      this.$router.push('/dang-nhap')
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
    logoutAction() {
      this.userLogout()
      this.showNotification('success', `Signed out successfully`)
      this.$router.push({ path: '/' })
    },
    onShowMenuMobile() {
      this.showMenuMobile = !this.showMenuMobile
    },
    handleScroll(e) {
      let st = document.documentElement.scrollTop;
      if (st > this.lastScrollTop) {
        this.showMenuScroll = false
      } else if (st < this.lastScrollTop) {
        this.showMenuScroll = true
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
      if(this.$route.fullPath === "/") {
        if(st < 700) {
          this.menuColor = true
        } else {
          this.menuColor = false
        }
      } else{
        this.menuColor = false
      }
      if(this.$route.fullPath === "/thanh-toan") {
        this.showMenuScroll = false
      }
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
  position: fixed;
  z-index: 999;
  bottom: 0px;
  width: 100%;
  height: 67px;
  line-height: 67px;
  background-color: #fff;

  .mobile-container{
    background-color: #fff;
  }

  .header-lang-content {
    display: inline-flex;

    span {
      margin-right: 5px;
    }

    .lang-btn {
      cursor: pointer;
      font-size: 18px;
      font-family: 'Aeroport';
      color: #000;
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
    padding: 0px 10px;
    color: #000;
    width: 100px;
  }

  .menu-text-house {
    width: 160px;
  }

  .menu-text-active {
    border-top: 2px solid #000;
    font-family: 'Aeroport-bold';
    white-space: nowrap;
  }

  .menu-text-bold {
    font-family: 'Aeroport-bold';
    white-space: nowrap;
  }

  .menu-logo {
    width: 300px;
    cursor: pointer;
  }

  .menu-icon-div::before {
    content: "";
    width: 0;
    height: 20px;
    position: absolute;
    border-left: 0.8px solid black;
    top: 25px;
    left: 0px;
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
    margin-left: 0px;
    width: 45px;
    height: 45px;
    margin-top: 0px;
    padding: 15px;
  }

  .menu-icon-bag-num {
    width: 14px;
    height: 14px;
    color: white;
    background-color: #ff0000ab;
    text-align: center;
    line-height: 14px;
    border-radius: 4px;
    font-size: 10px;
    position: absolute;
    right: 5px;
    top: 20px;
  }

  .menu-auth-btn {
    font-family: 'Aeroport';
    cursor: pointer;
    font-size: 18px;
    margin-right: 15px;
    padding-right: 15px;
    color: #fff;
    position: relative;

    &::after {
      content: '';
      width: 0;
      height: 20px;
      position: absolute;
      border-right: 0.8px solid #fff;
      top: 25px;
      right: 0px;
    }
  }

  .menu-auth-btn-b {
    font-family: 'Aeroport';
    cursor: pointer;
    font-size: 18px;
    margin-left: 15px;
    padding-left: 15px;
    color: #000;
    position: relative;
    white-space: nowrap;

    &::before {
      content: '';
      width: 0;
      height: 20px;
      position: absolute;
      border-left: 0.8px solid black;
      top: 14px;
      left: 0px;
    }
  }

}

.header-tab-menu {
  position: fixed;
  width: 100vw;
  background-color: #fff;
  padding: 50px;
  bottom: 67px;

  .header-tab-menu-container {
    padding: 0px 20px;

    .header-tab-menu-title {
      color: #1E1E1E;
      font-family: 'Aeroport';
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 40px;
      height: 40px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        text-decoration-line: underline;
      }
    }

    .header-tab-menu-col-1 {
      width: 250px;
      min-height: 200px;
    }

    .header-tab-menu-text {
      color: #000;
      font-family: 'Aeroport-light';
      font-size: 13px;
      line-height: 20px;
      // min-height: 40px;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 20px;
      // white-space: nowrap;
    }

    .header-tab-menu-sub-item {
      display: inline-block;
      float: left;
      width: 280px;
      margin-right: 35px;
    }
  }
}

.header-tab-menu-about {
  position: fixed;
  width: 100vw;
  background-color: #fff;
  padding: 50px;
  padding-bottom: 0px;
  padding-top: 100px;
  bottom: 67px;
  height: 700px;

  .header-tab-menu-col-2 {
    width: calc(100% - 250px);
  }

  .header-tab-menu-container {
    padding: 0px 20px;

    .header-tab-menu-title {
      color: #1E1E1E;
      font-family: 'Aeroport';
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 40px;
      height: 40px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        text-decoration-line: underline;
      }
    }

    .header-tab-menu-col-1 {
      width: 250px;
      min-height: 200px;
    }

    .header-tab-menu-text {
      color: #000;
      font-family: 'Aeroport-light';
      font-size: 13px;
      line-height: 20px;
      // min-height: 40px;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 20px;
      // white-space: nowrap;
    }

    .header-tab-menu-sub-item {
      display: inline-block;
      float: left;
      width: calc(50% - 20px);
      margin-right: 20px;
    }
  }
}

@media (max-width: 900px) {
  .header {
    position: relative;
    top: 0px;
    width: 100%;
    height: 47px;
    line-height: 47px;

    .lang-btn {
      cursor: pointer;
      font-size: 16px;
      font-family: 'Aeroport-light';
      color: #000;
      text-transform: uppercase;
      display: inline-block;
      margin-left: 10px;
      line-height: 48px;
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
      width: 45px;
      height: 17px;
      margin-top: 16px;
    }

    .menu-icon {
      cursor: pointer;
      margin-left: 20px;
      width: 15px;
      height: 15px;
      margin-top: 17px;
    }

    .menu-icon-bag {
      cursor: pointer;
      margin-left: 10px;
      width: 15px;
      height: 15px;
      margin-top: 16px;
    }

    .menu-icon-bag-num {
      width: 14px;
      height: 14px;
      color: white;
      background-color: #ff0000ab;
      text-align: center;
      line-height: 14px;
      border-radius: 4px;
      font-size: 10px;
      position: absolute;
      right: auto;
      top: 10px;
      left: 20px;
    }

    .menu-auth-btn {
      font-family: 'Aeroport';
      cursor: pointer;
      font-size: 14px;
      margin-left: 15px;
      padding-left: 15px;
      margin-right: 0px;
      padding-right: 0px;
      color: #fff;
      position: relative;

      &::after {
        content: '';
        width: 0;
        height: 15px;
        position: absolute;
        border-right: 0.8px solid #fff;
        top: 18px;
        right: auto;
        left: 0px;
      }
    }

    .menu-auth-btn-b {
      font-family: 'Aeroport';
      cursor: pointer;
      font-size: 14px;
      margin-left: 15px;
      padding-left: 15px;
      margin-right: 0px;
      padding-right: 0px;
      color: #000;
      position: relative;

      &::after {
        content: '';
        width: 0;
        height: 15px;
        position: absolute;
        border-right: 0.8px solid black;
        top: 18px;
        right: auto;
        left: 0px;
      }
    }

    .menu-mobile-icon {
      position: fixed;
      left: 50%;
      transform: translate(-50%);
      bottom: 45px;
      width: 70px;
      height: 45px;
      z-index: 2;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      border-radius: 24px;
    }

    .menu-mobile-close-icon {
      position: fixed;
      left: 50%;
      transform: translate(-50%);
      bottom: 45px;
      width: 70px;
      height: 45px;
      z-index: 2;
    }
  }

  .menu-mobile {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;

    .menu-mobile-top {
      height: 47px;
      line-height: 47px;
      position: relative;

      .menu-logo {
        width: 45px;
        height: 17px;
        margin-top: 16px;
      }

      .menu-icon {
        cursor: pointer;
        margin-left: 20px;
        width: 17px;
        height: 17px;
        margin-top: 17px;
      }

      .menu-icon-bag {
        cursor: pointer;
        margin-left: 10px;
        width: 17px;
        height: 17px;
        margin-top: 16px;
      }

      .menu-mobile-icon {
        position: fixed;
        left: 50%;
        transform: translate(-50%);
        bottom: 45px;
        width: 70px;
        height: 45px;
        z-index: 2;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 24px;
      }
    }

    .menu-mobile-list {
      margin-top: 100px;

      .menu-mobile-item {
        border-bottom: 1px solid #8D8D8D;
        height: 50px;
        line-height: 50px;

        .menu-mobile-title {
          color: #000;
          font-family: 'Aeroport-bold';
          font-size: 20px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .menu-open {
          width: 13px;
          height: 8px;
          margin-top: 25px;
        }

        .menu-left {
          width: 8px;
          height: 13px;
          margin-top: 20px;
        }
      }

      .menu-mobile-list-sub {
        padding-left: 25px;
        margin-bottom: 10px;

        .menu-mobile-sub-item {
          border-bottom: 1px solid #8D8D8D;
          height: 50px;
          line-height: 50px;

          .menu-mobile-title {
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 14px;
            white-space: nowrap;

          }

          .menu-open {
            // width: 13px;
            // height: fit-content;
            height: 13px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}

@media (max-width: 520px) {
  .header {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 47px;
    line-height: 47px;
    overflow: hidden;
    background-color: transparent;

    .lang-btn {
      cursor: pointer;
      font-size: 16px;
      font-family: 'Aeroport-light';
      color: #000;
      text-transform: uppercase;
      display: inline-block;
      margin-left: 12px;
      line-height: 48px;
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
      width: 45px;
      height: 17px;
      margin-top: 16px;
    }

    .menu-icon {
      cursor: pointer;
      margin-left: 0px;
      width: 100%;
      height: 100%;
      margin-top: 0px;
    }

    .menu-icon-bag {
      cursor: pointer;
      margin-left: 0px;
      width: 100%;
      height: 100%;
      margin-top: 0px;
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .menu-mobile-icon {
      position: fixed;
      left: 50%;
      transform: translate(-50%);
      bottom: 45px;
      width: 70px;
      height: 45px;
      z-index: 2;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      border-radius: 24px;
    }

    .menu-mobile-close-icon {
      position: fixed;
      left: 50%;
      transform: translate(-50%);
      bottom: 45px;
      width: 70px;
      height: 45px;
      z-index: 2;
    }
  }

  .menu-mobile {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;

    .menu-mobile-top {
      height: 47px;
      line-height: 47px;
      position: relative;

      .menu-logo {
        width: 45px;
        height: 17px;
        margin-top: 16px;
      }

      .menu-icon {
        cursor: pointer;
        margin-left: 20px;
        width: 17px;
        height: 17px;
        margin-top: 17px;
      }

      .menu-icon-bag {
        cursor: pointer;
        margin-left: 10px;
        width: 17px;
        height: 17px;
        margin-top: 16px;
      }

      .menu-mobile-icon {
        position: fixed;
        left: 50%;
        transform: translate(-50%);
        bottom: 45px;
        width: 70px;
        height: 45px;
        z-index: 2;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 24px;
      }
    }

    .menu-mobile-list {
      margin-top: 100px;
      overflow: scroll;
      height: 80vh;

      .menu-mobile-item {
        border-bottom: 1px solid #8D8D8D;
        height: 50px;
        line-height: 50px;

        .menu-mobile-title {
          color: #000;
          font-family: 'Aeroport-bold';
          font-size: 20px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .menu-open {
          width: 13px;
          height: 8px;
          margin-top: 25px;
        }

        .menu-left {
          width: 8px;
          height: 13px;
          margin-top: 20px;
        }
      }

      .menu-mobile-list-sub {
        padding-left: 25px;
        margin-bottom: 10px;

        .menu-mobile-sub-item {
          border-bottom: 1px solid #8D8D8D;
          height: 50px;
          line-height: 50px;

          .menu-mobile-title {
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .menu-open {
            // width: 13px;
            // height: fit-content;
            height: 13px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
