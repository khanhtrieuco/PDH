<template>
    <div class="collection-content">
        <div class="collection-banner">
            <img class="customer-image" ratio="21-9" v-if="!isMobile"
                :src="collection.attributes?.main_thub?.data?.attributes.url"></img>
            <img class="customer-image" ratio="9-21" v-if="isMobile"
                :src="collection.attributes?.main_thub_mobile?.data?.attributes.url"></img>
        </div>
        <div class="container">
            <h1 class="collection-title">
                {{ $i18n.locale === 'vn' ? collection.attributes?.name : collection.attributes?.name_en ??
                    collection.attributes?.name }}
            </h1>
            <div class="collection-des">
                {{ $i18n.locale === 'vn' ? collection.attributes?.description : collection.attributes?.description_en ??
                    collection.attributes?.description }}
            </div>
            <NuxtLink :to="`/collection/detail/${$route.params.id}`">
                <div class="shop-now-link-black">
                    <span class="shop-now-link-black-text">READ MORE</span>
                    <img class="shop-now-link-black-img" src="/images/moreb.png" />
                </div>
            </NuxtLink>
            <div class="collection-products">
                <b-row v-if="listProduct && listProduct.length > 0">
                    <b-col class="collection-product-item mb-3 px-1" cols="6" lg="4" v-for="_pro, index in listProduct"
                        :key="index">
                        <ProductItem :item="_pro" :isMobile="isMobile" :height="isMobile ? '260px' : '600px'" />
                    </b-col>
                </b-row>
                <div v-else>
                    <div class="collection-empty">{{ $t('Catogory_empty_product') }}</div>
                </div>
            </div>
            <div class="btn-collection-top" @click="goTop()">Back to top</div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import ProductItem from "~/components/product/productItem.vue"
import ServerService from '@/service/server.service'

export default {
    name: 'IndexPage',
    components: {
        ProductItem
    },
    mixins: [general],
        async asyncData({ route, req, app, redirect, store }) {
        let res = await ServerService.request({
          method: 'get',
          url: `https://phandanghoang.com/api/collections?populate=*&filters[slug][$eq]=${route.params.id}`
        })
        let item = {}
        if (res && res.data && res.data.length > 0) {
          item = res.data[0]
          item.titleShare = res.data[0].attributes.name
          item.description = res.data[0].attributes.description
          item.image = res.data[0].attributes.main_thub ? 'https://phandanghoang.com' + res.data[0].attributes.main_thub.data?.attributes.url : ''
          item.current_url = 'https://phandanghoang.com/collection/' + route.params.id
        }
        return { s_item: item }
      },
    head() {
      let headJson = {
          title:
            this.s_item !== undefined
              ? this.s_item.titleShare
              : "PHAN DANG HOANG",
          meta: [
            {
              hid: "og:title",
              property: "og:title",
              content: this.s_item !== undefined ? this.s_item.titleShare : ""
            },
            {
              hid: "description",
              property: "description",
              content: this.s_item !== undefined ? this.s_item.description : ""
            },
            {
              hid: "og:description",
              property: "og:description",
              content: this.s_item !== undefined ? this.s_item.description : ""
            },
            {
              hid: "robots",
              property: "robots",
              content:
                this.s_item !== undefined && this.s_item.meta_robots
                  ? this.s_item.meta_robots
                  : "INDEX,FOLLOW"
            },
            {
              hid: "og:image",
              property: "og:image",
              content:
                this.s_item !== undefined && this.s_item.image !== ""
                  ? this.s_item.image
                  : ""
            },
            {
              hid: "og:url",
              property: "og:url",
              content: this.s_item !== undefined ? this.s_item.current_url : ""
            },
            {
              hid: "keywords",
              property: "keywords",
              content: this.s_item !== undefined ? this.s_item.keywords : ""
            }
          ],
          link: [
            {
              rel: "canonical",
              href: this.s_item.current_url
            }
          ]
        }
        return headJson
    },
    data() {
        return {
            isMobile: false,
            listProduct: []
        }
    },
    computed: {
        ...mapGetters({
            collection: "collection/getCollection",
            // listProduct: "product/getListProduct"
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()

        if (this.$route.params.id) {
            await this.getCollectionBySlug(this.$route.params.id) //(this.$route.params.id)
        }
        await this.loadProducts()
    },
    methods: {
        ...mapActions({
            getCollectionBySlug: "collection/getCollectionBySlug",
            getListProduct: "product/getListProduct"
        }),
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        goTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        async loadProducts(_data) {
            if (this.collection && this.collection.id) {
                let arrayFilter = [{ collection: this.collection.id }]
                let sort = 'order:desc,id:desc'
                if (_data && _data.sort) {
                    sort = _data.sort + ',order:desc'
                } else {
                    sort = 'order:desc'
                }
                if (_data && _data.filterSub) {
                    arrayFilter.push({ subcategories: _data.filterSub })
                }
                this.listProduct = await this.getListProduct({ filters: { '$and': arrayFilter }, sort })
            }
        }
    }
}
</script>
<style lang="scss">
.collection-content {
    padding-bottom: 100px;
    .customer-image{
        width: 100%;
    }
    .collection-title {
        color: #000;
        text-align: center;
        font-family: 'Aeroport';
        font-size: 35px;
        font-weight: 500;
        margin-top: 45px;
    }

    .collection-des {
        color: #000;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 15px;
        font-weight: 500;
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .collection-products {
        margin-top: 60px;
        margin-bottom: 60px;

        .collection-product-item {
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    .btn-collection-top {
        width: 240px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #000;
        color: #000;
        font-family: 'Aeroport-light';
        cursor: pointer;
        margin: auto;
        font-size: 18px;
    }
}

.shop-now-link-black {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-left: 50%;
    transform: translate(-50%);

    .shop-now-link-black-text {
        color: #000;
        font-family: 'Aeroport-light';
        font-size: 15px;
        text-transform: uppercase;
        margin-right: 10px;
    }

    .shop-now-link-black-img {
        width: 12px;
    }
}

.collection-empty {
    text-align: center;
}

@media (max-width: 520px) {
    .collection-content {
        padding-bottom: 100px;

        .collection-title {
            color: #000;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 20px;
            font-weight: 500;
            margin-top: 45px;
        }

        .collection-des {
            color: #000;
            text-align: center;
            font-family: 'Aeroport-light';
            font-size: 12px;
            margin-top: 15px;
            margin-bottom: 25px;
        }

        .collection-products {
            margin-top: 60px;
            margin-bottom: 60px;

            .collection-product-item {
                padding-left: 5px;
                padding-right: 5px;
            }
        }

        .btn-collection-top {
            width: 240px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            border: 1px solid #000;
            color: #000;
            font-family: 'Aeroport-light';
            cursor: pointer;
            margin: auto;
            font-size: 11px;
        }
    }

    .shop-now-link-black {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        margin-left: 50%;
        transform: translate(-50%);

        .shop-now-link-black-text {
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 15px;
            text-transform: uppercase;
            margin-right: 10px;
        }

        .shop-now-link-black-img {
            width: 12px;
        }
    }
}</style>