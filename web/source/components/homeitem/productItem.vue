<template>
  <div class="product-item">
    <div class="product-img d-flex justify-content-center" v-if="item.id">
      <div class="d-flex justify-content-center align-self-end">
        <NuxtLink :to="`/san-pham/${item.attributes.slug}`">
          <img class="product-item-img" v-if="!isMobile" :src="item.attributes?.thub?.data?.attributes.formats?.medium.url" fluid alt="image" />
          <img class="product-item-img" v-if="isMobile" :src="item.attributes?.thub?.data?.attributes.formats?.small.url" fluid alt="image" />
        </NuxtLink>
      </div>
      <img class="img-heart" :src="likeImage" @click="onLike(item)" @mouseover="showLike()" @mouseleave="hideLike()"
        alt="Like" />
      <!-- <img v-if="!isMobile" class="img-eye" src="/images/eye.png" alt="View" /> -->
    </div>
    <div class="product-item-content text-center" v-if="item.id">
      <div class="product-title" v-if="!isMobile && $i18n.locale === 'vn'">{{ item.attributes.title }}</div>
      <NuxtLink :to="`/san-pham/${item.attributes.slug}`">
        <div class="product-name">{{ item.attributes.name }}</div>
      </NuxtLink>
      <div class="product-des">{{ $i18n.locale === 'vn' ? item.attributes.description : item.attributes.description_en }}
      </div>
      <div class="product-price" v-if="isMobile">{{ item.attributes.price | numberWithCommas }}{{ ' ' }}đ</div>
      <transition name="fade">
        <div class="product-price-hide" v-if="!isMobile">{{ item.attributes.price | numberWithCommas }}{{ ' ' }}đ</div>
      </transition>
      <div class="product-btn" @click="addProductToCart">{{ $t('Product_add_cart_1') }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
  mixins: [general],
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          image: '/images/product1.png',
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
    }
  },
  mounted() {
    this.isLike = this.checkIsLiked(this.item.attributes.likes?.data)
    if(this.isLike) {
      this.likeImage = '/images/liked.png'
    }
  },
  methods: {
    ...mapActions({
      addCartItem: "cart/addCartItemDirect",
      createLike: "like/createLike",
      deleteLike: "like/deleteLike",
    }),
    showLike() {
      this.likeImage = '/images/liked.png'
    },
    hideLike() {
      if(!this.isLike)
        this.likeImage = '/images/heart.png'
    },
    async onLike(_product) {
      if (!this.loggedIn) {
        this.showNotification('warning', `Đăng ký thành viên để lưu lại sản phẩm yêu thích của bạn`)
        return
      }
      if (this.isLike) {
        let rs = await this.deleteLike( this.isLike.id )
        if (rs && rs.id) {
          this.isLike = false
          this.likeImage = '/images/heart.png'
          this.showNotification('success', `Đã hủy yêu thích sản phẩm`)
        } else {
          this.showNotification('error', `Hủy yêu thích sản phẩm thất bại. Vui lòng thử lại.`)
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
      let _c = listLike?.find(o => o.attributes.user_id === this.profile.id)
      if (_c) rs = _c
      return rs
    },
    addProductToCart() {
      let _t = {
        id: this.item.id,
        imagelink: this.item.attributes?.thub?.data?.attributes.url,
        name: this.item.attributes.name,
        description: this.item.attributes.description,
        price: this.item.attributes.price
      }
      this.addCartItem(_t)
      this.showNotification('success', `Đã thêm sản phẩm vào giỏ hàng`)
    }
  }
}
</script>
<style lang="scss">
.product-item {
  padding: 5px;

  .product-price-hide {
    display: block;
  }

  .img-heart {
    width: 32px;
  }

  &:hover {
    .product-price-hide {
      display: block;
    }

    .product-img {
      background-color: #F5F5F5;
      border-radius: 16px;
      overflow: hidden;
      // height: 349px;

      .product-item-img {
        transform: scale(1.2)
      }
    }
  }
}

.product-img {
  position: relative;
  margin-bottom: 45px;
  height: 350px;
  padding-bottom: 10px;


  img {
    cursor: pointer;
    transition: all .6s ease-in-out;
    max-height: 320px;
    max-width: 220px;
  }
}

.product-title {
  font-family: 'inter';
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #B9B9B9;
  height: 30px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.product-name {
  font-weight: 600;
  font-size: 26px;
  line-height: 26px;
  text-align: center;
  margin-top: 12px;
  height: 55px;
  cursor: pointer;
  width: 275px;
  margin-left: auto;
  margin-right: auto;
}

.product-des {
  font-family: 'inter-light';
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  margin-top: 8px;
  height: 40px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.product-btn {
  font-family: 'inter';
  margin: auto;
  margin-top: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 210px;
  margin-left: auto;
  margin-right: auto;
  height: 35px;
  font-size: 13px;
  line-height: 35px;
  background: #FFFFFF;
  border: 0.25px solid #000000;
  border-radius: 18px;

  &:hover {
    background: #F7B2C2;
    border: none;
    color: #fff;
  }

  &:active {
    background: #000000;
    color: #ffffff;
  }
}

.img-heart {
  position: absolute;
  top: 25px;
  right: 14px;
  cursor: pointer;
  width: 32px;
}

.img-eye {
  position: absolute;
  top: 63px;
  right: 9px;
  cursor: pointer;
  width: 42px;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .product-img {
    height: 330px;

    img {
      max-height: 260px;
    }
  }

  .product-name {
    font-size: 22px;
  }

  .img-heart {
    top: 25px;
    width: 25px;
  }

  .img-eye {
    top: 50px;
    right: 8px;
    width: 35px;
  }
}

@media (max-width: 520px) {
  .product-title {
    font-size: 12px;
    line-height: 15px;
    color: #B9B9B9;
  }

  .product-name {
    font-weight: 600;
    font-size: 26px;
    line-height: 26px;
    color: #2F3036;
  }

  .product-des {
    font-size: 12px;
    line-height: 15px;
    color: #515151;
  }

  .product-price {
    font-size: 20px;
    margin-top: 8px;
  }

  .product-btn {
    margin-top: 8px;
    width: 100%;
    height: 35px;
    font-size: 13px;
    line-height: 32px;
    border-radius: 20px;
  }

  .img-heart {
    top: 10px;
  }
}
</style>