<template>
    <div class="category-content">
        <b-container v-if="!isMobile" style="position: relative;">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="category-banner">
            <img v-if="isMobile" class="w-100" :src="category.attributes?.thub_mobile?.data?.attributes.url"></img>
            <img v-else class="w-100" :src="category.attributes?.thub?.data?.attributes.url"></img>
        </div>
        <div class="container">
            <h1 class="category-title">
                {{ $i18n.locale === 'vn' ? category.attributes?.name : category.attributes?.name_en ??
                    category.attributes?.name }}
            </h1>
            <div class="category-des">
                {{ $i18n.locale === 'vn' ? category.attributes?.description : category.attributes?.description_en ??
                    category.attributes?.description }}
            </div>
            <div class="category-filter w-100">
                <div class="filter-item">
                    <div class="filter-title">{{ $t('Category_sort') }}</div>
                    <!-- <b-form-select v-model="sort" :options="sortOpt" class="mb-3 filter-select" value-field="item"
                        text-field="name" disabled-field="notEnabled" @change="loadProducts()"></b-form-select> -->
                    <Select :default="$i18n.locale === 'vn' ? 'Mặc định' : 'Default'"
                        :listItem="$i18n.locale === 'vn' ? sortOpt : sortEnOpt"
                        @onChange="(e) => loadProducts({ sort: e })" />
                </div>
                <div class="filter-item">
                    <div class="filter-title">{{ $t('Category_filter') }}</div>
                    <!-- <b-form-select v-model="filterSub" :options="filterOpt" class="mb-3 filter-select" value-field="item"
                        text-field="name" disabled-field="notEnabled" @change="loadProducts()"></b-form-select> -->
                    <Select :default="$i18n.locale === 'vn' ? 'Tất cả' : 'All'"
                        :listItem="$i18n.locale === 'vn' ? filterOpt : filterEnOpt"
                        @onChange="(e) => loadProducts({ filterSub: e })" />
                </div>
            </div>
            <div class="category-products" v-if="isMobile">
                <b-row v-if="listProduct && listProduct.length > 0">
                    <b-col class="mb-3" cols="6" v-for="(item, index) in listProduct" :key="index">
                        <ProductItem :item="item" :isMobile="isMobile" />
                    </b-col>
                </b-row>
                <div v-else>
                    <div class="category-empty">{{ $t('Catogory_empty_product') }}</div>
                </div>
            </div>
            <div class="category-products" v-if="!isMobile">
                <b-row v-if="listProduct && listProduct.length > 0">
                    <b-col class="mb-3" cols="3" v-for="(item, index) in listProduct" :key="index">
                        <ProductItem :item="item" :isMobile="isMobile" />
                    </b-col>
                </b-row>
                <div v-else>
                    <div class="category-empty">{{ $t('Catogory_empty_product') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import ProductItem from "~/components/category/productItem.vue"
import Select from "~/components/common/select.vue"

export default {
    name: 'IndexPage',
    components: {
        ProductItem,
        Select
    },
    mixins: [general],
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$i18n.locale === 'vn' ? this.category?.attributes?.name : this.category?.attributes?.name_en,
                    active: true
                }
            ],
            isMobile: false,
            sort: null,
            sortOpt: [
                { item: 'order:desc', name: 'Mặc định' },
                { item: 'price:asc', name: 'Giá từ thấp tới cao' },
                { item: 'price:desc', name: 'Giá từ cao tới thấp' },
                { item: 'sold:desc', name: 'Lượt mua' }
            ],
            sortEnOpt: [
                { item: 'order:desc', name: 'Default' },
                { item: 'price:asc', name: 'Price from low to high' },
                { item: 'price:desc', name: 'Price from hight to low' },
                { item: 'sold:desc', name: 'Purchases' }
            ],
            filterSub: '',
            filterOpt: [],
            filterEnOpt: [],
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$i18n.locale === 'vn' ? this.category?.attributes?.name : this.category?.attributes?.name_en,
                        active: true
                    }
                ]
            }
        },
    },
    computed: {
        ...mapGetters({
            category: "category/getCategory",
            listProduct: "product/getListProduct",
            listSubCategory: "category/getListSubCategory",
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.loadData()
        await this.getListSubCategory()
        if (this.listSubCategory && this.listSubCategory.length > 0) {
            this.filterOpt = [{ item: null, name: 'Tất cả' }]
            let temp = this.listSubCategory.map(o => {
                return {
                    item: o.id,
                    name: o.attributes.name,
                }
            })
            this.filterOpt = [...this.filterOpt, ...temp]
            this.filterEnOpt = [{ item: null, name: 'All' }]
            temp = this.listSubCategory.map(o => {
                return {
                    item: o.id,
                    name: o.attributes.name_en,
                }
            })
            this.filterEnOpt = [...this.filterEnOpt, ...temp]
        }
        await this.loadProducts()
        await this.getListCartUser()
    },
    methods: {
        ...mapActions({
            getCategoryBySlug: "category/getCategoryBySlug",
            getListProduct: "product/getListProduct",
            getListSubCategory: "category/getListSubCategory",
            getListCartUser: "cart/getListCartUser"
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
        async loadData() {
            if (this.$route.params.id) {
                await this.getCategoryBySlug(this.$route.params.id)
                this.breadcrumb[1].text = this.$i18n.locale === 'vn' ? this.category?.attributes?.name : this.category?.attributes?.name_en
            }
        },
        async loadProducts(_data) {
            if (this.category && this.category.id) {
                let arrayFilter = [{ categories: this.category.id }]
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
.category-content {
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

.category-title {
    margin-top: 45px;
    font-size: 36px;
    line-height: 47px;
    align-items: center;
    text-align: center;
    color: #515151;
}

.category-des {
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

.category-filter {
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
    .category-content {
        margin-top: 0px;
    }

    .category-title {
        font-size: 24px;
        line-height: 31px;
    }

    .category-des {
        width: 328px;
        font-size: 10px;
        line-height: 14px;
    }

    .category-filter {
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