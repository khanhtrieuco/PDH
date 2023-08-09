<template>
    <div class="collection-content">
        <div class="collection-banner">
            <ThumbImage class="customer-image" ratio="21-9" :src="collection.attributes?.main_thub?.data?.attributes.url">
            </ThumbImage>
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
            <div class="collection-more">READ MORE</div>
            <div class="collection-products">
                <b-row v-if="listProduct">
                    <b-col class="mb-3" cols="4" v-for="index in 6" :key="index">
                        <ProductItem :isMobile="isMobile" />
                    </b-col>
                </b-row>
                <!-- <div v-else>
                    <div class="collection-empty">{{ $t('Catogory_empty_product') }}</div>
                </div> -->
            </div>
            <div class="btn-collection-top">Back to top</div>
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
            await this.getCollectionBySlug('women-aw') //(this.$route.params.id)
        }
        // await this.loadProducts()
        this.listProduct = [1,2,3,4,5,6]
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
        // async loadProducts(_data) {
        //     if (this.collection && this.collection.id) {
        //         let arrayFilter = [{ categories: this.collection.id }]
        //         let sort = 'order:desc,id:desc'
        //         if (_data && _data.sort) {
        //             sort = _data.sort + ',order:desc'
        //         } else {
        //             sort = 'order:desc'
        //         }
        //         if (_data && _data.filterSub) {
        //             arrayFilter.push({ subcategories: _data.filterSub })
        //         }
        //         await this.getListProduct({ filters: { '$and': arrayFilter }, sort })
        //     }
        // }
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
    }
    .collection-more{
        color: #000;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 15px;
        font-weight: 500;
        margin-top: 55px;
    }
    .collection-products{
        margin-top: 60px;
        margin-bottom: 60px;
    }
    .btn-collection-top{
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

@media (max-width: 520px) {
    .collection-content {
        margin-top: 0px;
    }

    .collection-title {
        font-size: 24px;
        line-height: 31px;
    }

    .collection-des {
        width: 328px;
        font-size: 10px;
        line-height: 14px;
    }

    .collection-filter {
        margin-top: 32px;

        .filter-item {
            width: 140px;

            .filter-title {
                font-weight: 600;
                font-size: 12px;
                line-height: 17px;
            }

            .filter-select {
                font-weight: 300;
                font-size: 10px;
                line-height: 10px;
            }
        }
    }

    .user-cart-empty {
        width: calc(100% - 20px);
        padding: 50px 20px;
        margin-left: 10px;
        margin-right: 10px;
        background: #FFF;
        border: 1px solid #F4F4F4;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }

    .user-list-cart-panel {
        width: 100%;
    }
}
</style>