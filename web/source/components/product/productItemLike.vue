<template>
  <div class="product-item" v-show="item.id">
    <div :style="`height: ${height};`" class="product-img-like d-flex justify-content-center" @mouseover="showHover()"
      @mouseleave="hideHover()">
      <div class="d-flex justify-content-center align-self-end" style="width: 100%;height: 100%;">
        <NuxtLink style="width: 100%;" :to="`/san-pham/${item.attributes.slug}`">
          <img class="product-img-main" :src="product_image" fluid alt="image" />
        </NuxtLink>
      </div>
      <img class="img-heart" :src="likeImage" @click="onLike(item)" @mouseover="showLike()" @mouseleave="hideLike()"
        alt="Like" />
    </div>
    <div class="product-item-content text-left">
      <NuxtLink :to="`/san-pham/${item.attributes.slug}`">
        <div class="product-name">{{ $i18n.locale === 'vn' ? item.attributes.name : item.attributes.name_en }}</div>
      </NuxtLink>
      <div class="product-price">${{ ' ' }}{{ item.attributes.price | numberWithCommas }}</div>
    </div>
    <!-- <div class="product-item-color">
      <Color v-if="!isMobile"></Color>
      <div class="product-item-color-value d-inline-block">+{{ listColor.length > 1 ? listColor.length - 1 : 1 }}</div>
    </div> -->
    <NuxtLink style="width: 100%;" :to="`/san-pham/${item.attributes.slug}`">
      <div class="product-item-add">ADD TO CART</div>
    </NuxtLink>

  </div>
</template>

<script>
import general from "~/mixins/general"
import { mapGetters, mapActions } from "vuex"
import Color from "~/components/common/color.vue"
import ColorMobile from "~/components/common/colorMobile.vue"

export default {
  mixins: [general],
  components: {
    Color,
    ColorMobile
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          attributes: {},
          id: null
        }
      }
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      loggedIn: "auth/getloggedIn"
    }),
  },
  data() {
    return {
      description: '',
      isLike: false,
      likeImage: '/images/heart.png',
      listColor: [],
      product_image: null
    }
  },
  mounted() {
    this.isLike = this.checkIsLiked(this.item?.attributes.likes?.data)
    if (this.isLike) {
      this.likeImage = '/images/liked.png'
    }
    this.product_image = this.item.attributes.thub_main?.data.attributes.url
    if (this.item.attributes && this.item.attributes.variants?.data) {
      this.item.attributes.variants.data.forEach(v => {
        if (v.attributes.color?.data && v.attributes.size?.data) {
          let color = v.attributes.color?.data
          let size = v.attributes.size?.data
          let _cc = this.listColor.find(o => o.id === color.id)
          if (!_cc) {
            this.listColor.push(color)
          }
          let _cs = this.listSize.find(o => o.id === size.id)
          if (!_cs) {
            this.listSize.push(size)
          }
        }
      });
    }
  },
  methods: {
    ...mapActions({
      addCartItem: "cart/addCartItem",
      createLike: "like/createLike",
      deleteLike: "like/deleteLike",
    }),
    showLike() {
      this.likeImage = '/images/liked.png'
    },
    hideLike() {
      if (!this.isLike)
        this.likeImage = '/images/heart.png'
    },
    showHover() {
      this.product_image = this.item.attributes.thub_main.data.attributes.url
    },
    hideHover() {
      this.product_image = this.item.attributes.thub.data.attributes.url
    },
    async onLike(_product) {
      if (!this.loggedIn) {
        this.showNotification('warning', `Register as a member to save your favorite products`)
        return
      }
      if (this.isLike) {
        let rs = await this.deleteLike(this.isLike.id)
        if (rs && rs.id) {
          this.isLike = false
          this.likeImage = '/images/heart.png'
          this.showNotification('success', `Unlike`)
        } else {
          this.showNotification('error', `Fail.`)
        }
      } else {
        let rs = await this.createLike({
          data: {
            user_name: this.profile.username,
            user_id: this.profile.id,
            product: _product.id
          }
        })
        if (rs && rs.id) {
          this.isLike = rs
          this.likeImage = '/images/liked.png'
          this.showNotification('success', `Like`)
        } else {
          this.showNotification('error', `Fail`)
        }
      }
    },
    checkIsLiked(listLike) {
      if (listLike) {
        let rs = null
        let _c = listLike.find(o => o.attributes.user_id === this.profile.id)
        if (_c) rs = _c
        return rs
      }
    },
    addProductToCart() {
      let _t = {
        id: this.item.id,
        imagelink: this.item.attributes?.thub.data?.attributes.url,
        name: this.item.attributes.name,
        description: this.item.attributes.description,
        price: this.item.attributes.price
      }
      this.addCartItem(_t)
      this.showNotification('success', `Product added to cart`)
    }
  }
  // mounted() {
  //   let lang = 'en'
  //   let lland = window.localStorage.getItem('lang')
  //   if (lland) {
  //     lang = lland
  //   }
  //   if (lang === 'vn') {
  //     this.description = this.get_excerpt(this.item.description_vn, 150)
  //   } else {
  //     this.description = this.get_excerpt(this.item.description, 150)
  //   }
  // }
}
</script>
<style lang="scss">
.product-item {
  padding: 0px;

  .product-img-like {
    position: relative;
    margin-bottom: 0px;
    width: 100%;
    padding-bottom: 10px;
    // background-color: #F5F5F5;

    .product-img-main {
      cursor: pointer;
      transition: all .6s ease-in-out;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      background-color: #fff;
    }
  }

  .product-name {
    color: #000;
    font-family: 'Aeroport';
    font-size: 20px;
    margin-bottom: 5px;
  }

  .product-price {
    color: #000;
    font-family: 'Aeroport';
    font-size: 16px;
    font-weight: 300;
  }

  .img-heart {
    position: absolute;
    top: 25px;
    right: 14px;
    cursor: pointer;
    width: 32px;
  }

  .product-item-add {
    width: 190px;
    margin-top: 30px;
    height: 55px;
    line-height: 55px;
    border: 1px solid #000;
    cursor: pointer;
    color: #000;
    text-align: center;
    font-family: 'Aeroport-light';
    font-size: 16px;
    text-transform: uppercase;
  }
}

@media (max-width: 520px) {
  .product-item {
    padding: 0px;

    .product-img-like {
      position: relative;
      margin-bottom: 10px;
      width: 100%;
      padding-bottom: 10px;
      // background-color: #F5F5F5;

      img {
        cursor: pointer;
        transition: all .6s ease-in-out;
        max-width: 100%;
        max-height: 100%;
      }

      &:hover {
        background-color: #fff;
      }
    }

    .product-name {
      color: #000;
      font-family: 'Aeroport';
      font-size: 12px;
    }

    .product-price {
      color: #000;
      font-family: 'Aeroport';
      font-size: 10px;
      font-weight: 300;
    }

    .img-heart {
      position: absolute;
      top: 15px;
      right: 7px;
      cursor: pointer;
      width: 16px;
    }
  }
}
</style>