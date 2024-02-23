<template>
    <div class="collection-content">
        <div class="collection-banner">
            <ThumbImage class="customer-image" ratio="21-9" v-if="!isMobile"
                :src="collection.attributes?.main_thub?.data?.attributes.url"></ThumbImage>
            <ThumbImage class="customer-image" ratio="9-21" v-if="isMobile"
                :src="collection.attributes?.main_thub_mobile?.data?.attributes.url"></ThumbImage>
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
                    <b-col class="collection-product-item mb-3" cols="6" lg="4" v-for="_pro, index in listProduct"
                        :key="index">
                        <ProductItem :item="_pro" :isMobile="isMobile" :height="isMobile ? '215px' : '600px'" />
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

export default {
    name: 'IndexPage',
    components: {
        ProductItem
    },
    mixins: [general],
    data() {
        return {
            isMobile: false,
        }
    },
    computed: {
        ...mapGetters({
            collection: "collection/getCollection",
            listProduct: "product/getListProduct"
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        if (this.$route.params.id) {
            await this.getCollectionBySlug(this.$route.params.id) //(this.$route.params.id)
        }
        await this.loadProducts()
        // this.listProduct = [1, 2, 3, 4, 5, 6]
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
                await this.getListProduct({ filters: { '$and': arrayFilter }, sort })
            }
        }
    }
}
</script>
<style lang="scss">
.collection-content {
    padding-bottom: 100px;

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