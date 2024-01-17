<template>
  <div class="list-product-item" v-show="item.id">
    <div class="d-flex justify-content-between">
      <div class="list-product-item-img">
        <img class="list-product-item-image" :src="item.attributes.thub.data.attributes.url" />
      </div>
      <div class="list-product-item-info">
        <div class="list-product-item-info-name">{{ item.attributes.name }}</div>
        <div class="list-product-item-info-text">${{ ' ' }}{{ item.attributes.price | numberWithCommas }}</div>
      </div>
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
          attributes: {},
          id: null
        }
      }
    },
    isMobile: {
      type: Boolean,
      default: false,
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
.list-product-item {
  .list-product-item-img {
    width: 90px;
    height: 100px;

    .list-product-item-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .list-product-item-info-name {
    color: #000;
    font-family: 'Aeroport-light';
    font-size: 16px;
    text-transform: uppercase;
  }
  .list-product-item-info-text {
    color: #000;
    font-family: 'Aeroport-light';
    font-size: 16px;
  }
}

@media (max-width: 520px) {
  .product-item {
    padding: 0px;

    .product-img {
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
      font-family: 'Aeroport-light';
      font-size: 10px;
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