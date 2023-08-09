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
            <div>READ MORE</div>
            <!-- <div class="collection-products" v-if="!isMobile">
                <b-row v-if="listProduct && listProduct.length > 0">
                    <b-col class="mb-3" cols="3" v-for="(item, index) in listProduct" :key="index">
                        <ProductItem :item="item" :isMobile="isMobile" />
                    </b-col>
                </b-row>
                <div v-else>
                    <div class="collection-empty">{{ $t('Catogory_empty_product') }}</div>
                </div>
            </div> -->
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
    margin-top: 180px;
    margin-bottom: 160px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.user-list-cart-panel {
    width: 420px;
    height: 50px;
    background: #FDFDFD;
    border: 1px solid #F4F4F4;
    border-radius: 12px;
    position: absolute;
    right: 0px;
    top: 0px;
    line-height: 48px;
    padding: 0px 20px;
    cursor: pointer;

    .user-cart-close-outline {
        width: 20px;
    }
}

.user-cart-empty {
    text-align: center;
    padding: 50px 20px;
    position: absolute;
    right: 0px;
    top: 50px;
    width: 420px;
    background: #FFF;
    border: 1px solid #F4F4F4;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;

    .user-cart-empty-title {
        color: #100F0F;
        font-family: 'inter';
        font-weight: 700;
    }

    .user-cart-empty-des {
        margin-top: 20px;
        color: #333436;
        font-family: 'inter';
        font-size: 14px;
    }
}

.collection-title {
    margin-top: 45px;
    font-size: 36px;
    line-height: 47px;
    align-items: center;
    text-align: center;
    color: #515151;
}

.collection-des {
    margin-top: 27px;
    font-family: 'inter-light';
    font-weight: 300;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    color: #2F3036;
    width: 390px;
    margin-left: auto;
    margin-right: auto;
}

.collection-filter {
    margin-top: 80px;
    margin-bottom: 40px;
    text-align: right;
}

.filter-item {
    width: 225px;
    display: inline-block;
    margin-left: 20px;
    text-align: left;

    .filter-title {
        font-size: 14px;
        line-height: 20px;
        color: #2F3036;
        margin-bottom: 10px;
        font-weight: 600;
        white-space: nowrap;
    }

    .filter-select {
        border: none !important;
        border-bottom: 1px solid #000 !important;
        border-radius: 0px !important;

        &:focus {
            box-shadow: none !important;
        }
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