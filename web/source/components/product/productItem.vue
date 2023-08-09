<template>
  <div class="product-item">
    <div class="product-img d-flex justify-content-center" @mouseover="showHover()" @mouseleave="hideHover()">
      <div class="d-flex justify-content-center align-self-end">
        <NuxtLink :to="`/san-pham/123`">
          <img :src="product_image" fluid alt="image" />
        </NuxtLink>
      </div>
      <img class="img-heart" :src="likeImage" @click="onLike(item)" @mouseover="showLike()" @mouseleave="hideLike()"
        alt="Like" />
    </div>
    <div class="product-item-content text-left">
      <NuxtLink :to="`/san-pham/123`">
        <div class="product-name">{{ item.name }}</div>
      </NuxtLink>
      <div class="product-price">{{ item.price | numberWithCommas }}{{ ' ' }}đ</div>
    </div>
  </div>
</template>

<script>
import general from "~/mixins/general"
import { mapGetters, mapActions } from "vuex"

export default {
  mixins: [general],
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          image: '/images/product1.png',
          image_hover: '/images/hover.png',
          name: 'Spot Eraser Gel',
          title: 'Rạng ngời dung nhan',
          description: 'Kem hỗ trợ giảm mụn & vết thâm',
          price: 280000
        }
      }
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
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
      product_image: ''
    }
  },
  mounted() {
    // this.isLike = this.checkIsLiked(this.item.attributes.likes?.data)
    if (this.isLike) {
      this.likeImage = '/images/liked.png'
    }
    this.product_image = '/images/sp1.jpg'
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
      this.product_image = '/images/hover.png'
    },
    hideHover() {
      this.product_image = '/images/sp1.jpg'
    },
    async onLike(_product) {
      if (!this.loggedIn) {
        this.showNotification('warning', `Đăng ký thành viên để lưu lại sản phẩm yêu thích của bạn`)
        return
      }
      if (this.isLike) {
        let rs = await this.deleteLike(this.isLike.id)
        if (rs && rs.id) {
          this.isLike = false
          this.likeImage = '/images/heart.png'
          this.showNotification('success', `Đã hủy sản phẩm yêu thích`)
        } else {
          this.showNotification('error', `Hủy sản phẩm yêu thích thất bại. Vui lòng thử lại.`)
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
          this.showNotification('success', `Đã thêm sản phẩm yêu thích`)
        } else {
          this.showNotification('error', `Thêm sản phẩm yêu thích thất bại. Vui lòng thử lại.`)
        }
      }
    },
    checkIsLiked(listLike) {
      let rs = null
      let _c = listLike.find(o => o.attributes.user_id === this.profile.id)
      if (_c) rs = _c
      return rs
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
      this.showNotification('success', `Đã thêm sản phẩm vào giỏ hàng`)
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
  padding: 5px;

  .product-img {
    position: relative;
    margin-bottom: 20px;
    height: 600px;
    width: 100%;
    padding-bottom: 10px;
    background-color: #F5F5F5;

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
    font-size: 22px;
  }
  .product-price {
    color: #000;
    font-family: 'Aeroport-light';
    font-size: 20px;
  }

  .img-heart {
    position: absolute;
    top: 25px;
    right: 14px;
    cursor: pointer;
    width: 32px;
  }
}

@media (max-width: 520px) {
  .cproduct-title {
    font-size: 12px;
    line-height: 15px;
    color: #B9B9B9;
  }

  .cproduct-name {
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    color: #2F3036;
    height: 30px;
    max-width: 100%;
    min-width: 150px;
  }

  .cproduct-des {
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    height: 25px;
  }

  .cproduct-price {
    font-size: 14px;
    line-height: 36px;
    margin-top: 16px;
  }

  .cproduct-btn {
    margin-top: 16px;
    width: 100%;
    height: 23px;
    font-size: 10px;
    line-height: 22px;
    border-radius: 20px;
  }

  .img-heart {
    top: 10px;
  }

  .cproduct-img {
    height: 170px;

    img {
      max-height: 150px;
      max-width: 120px;
    }

    .img-heart {
      width: 16px;
    }
  }

  .category-empty {
    margin-top: 240px;
    font-size: 20px;
  }
}</style>