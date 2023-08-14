<template>
    <div class="product-detail-content">
        <div class="container">
            <div class="product-detail-info">
                <div class="product-detail-color">
                    <span class="color-text">Color:</span>
                    <div class="color-elip"></div>
                    <div class="color-value">+{{ listColor.length - 1 }}</div>
                </div>
                <div class="product-detail-size">
                    <span class="size-text">Size:</span>
                    <span class="size-value" v-for="_size, index in listSize" :key="index">{{ _size.attributes.name
                    }}</span>
                </div>
                <div class="product-detail-name">
                    <div class="product-detail-name-title">{{ product.attributes?.name }}</div>
                    <div class="product-detail-name-price">{{ product.attributes?.price | numberWithCommas }}{{ ' ' }}đ
                    </div>
                </div>
                <div class="product-detail-btn">
                    Add to cart
                </div>
                <img class="product-detail-img" :src="product.attributes?.thub_main.data?.attributes.url" />
            </div>
            <div class="d-flex">
                <div class="product-detail-media" v-if="product.attributes?.media.data">
                    <img class="product-detail-media-img" v-for="imgData, index in product.attributes?.media.data"
                        :key="index" :src="imgData.attributes.url" />
                </div>
                <div class="product-detail-data">
                    <div class="product-detail-data-title">Product details</div>
                    <div class="product-detail-data-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product.attributes?.description : product.attributes?.description_en)">
                    </div>
                    <div class="product-detail-data-title">Product code: <span class="product-detail-data-text">{{
                        product.attributes?.sku_code }}</span></div>
                    <div class="product-detail-data-title">Material:</div>
                    <div class="product-detail-data-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product.attributes?.material : product.attributes?.material_en)">
                    </div>
                    <div class="product-detail-data-title">Care your item:</div>
                    <div class="product-detail-data-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product.attributes?.care : product.attributes?.care_en)">
                    </div>
                    <div class="product-detail-help-box">
                        <div class="product-detail-help-item">Shipping and packaging</div>
                        <div class="product-detail-help-item">Exchange and return</div>
                        <div class="product-detail-help-item">Need help</div>
                    </div>
                    <div class="product-detail-data-color">
                        <span class="product-detail-data-color-text">Color:</span>
                        <div class="product-detail-data-color-elip" v-for="_color, index in listColor" :key="index"
                            :style="`background-color: ${_color.attributes.value};`"></div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="product-detail-data-size-text">Size:</div>
                        <div class="product-detail-data-size-des">Size guide</div>
                    </div>
                    <Select :default="$i18n.locale === 'vn' ? 'Select Size' : 'Select Size'"
                        :listItem="listSizeChoice"></Select>
                    <div class="product-detail-data-btn">
                        Add to cart
                    </div>
                </div>
            </div>
            <div class="product-detail-list-related">
                <div class="product-detail-list-title">Recommend</div>
                <b-row v-if="listRelated">
                    <b-col class="mb-3" cols="3" v-for="index in 4" :key="index">
                        <ProductItem :isMobile="isMobile" height="440px" />
                    </b-col>
                </b-row>
            </div>
            <div class="product-detail-list-related">
                <div class="product-detail-list-title">Recently viewed</div>
                <b-row v-if="listRelated">
                    <b-col class="mb-3" cols="3" v-for="index in 3" :key="index">
                        <ProductItem :isMobile="isMobile"  height="440px" />
                    </b-col>
                </b-row>
                <div class="product-detail-list-btn">More items from collection</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Select from "~/components/common/select.vue"
import ProductItem from "~/components/product/productItem.vue"
// import ListMedia from "~/components/product/mediaList.vue"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    components: {
        ProductItem,
        Select,
    },
    mixins: [general],
    data() {
        return {
            showImage: false,
            isMobile: false,
            // quantity: 1,
            // menuTab: 'tab1',
            listRelated: [],
            listSize: [],
            listColor: [],
            listSizeChoice: []
        }
    },
    computed: {
        ...mapGetters({
            product: "product/getProduct"
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.loadData()
        if (this.product.attributes && this.product.attributes.variants.data) {
            this.product.attributes.variants.data.forEach(v => {
                let color = v.attributes.color.data
                let size = v.attributes.size.data
                let _cc = this.listColor.find(o => o.id === color.id)
                if (!_cc) {
                    this.listColor.push(color)
                }
                let _cs = this.listSize.find(o => o.id === size.id)
                if (!_cs) {
                    this.listSize.push(size)
                }
            });
        }
        this.listSizeChoice = this.listSize.map(o => {
            return {
                item: o.id,
                name: o.attributes.name
            }
        })
        console.log(this.listSize)
        console.log(this.listColor)
        // this.listRelated = this.product.attributes?.related.data
        // if (this.isMobile) {
        //     this.menuTab = ''
        // }
        this.addView(this.product)
    },
    methods: {
        ...mapActions({
            getProductBySlug: "product/getProductBySlug",
            addCartItem: "cart/addCartItemDirect",
            addView: "product/addView",
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
                await this.getProductBySlug('spotless-filter')
            }
        },
        updateValue(_v) {
            let _t = this.quantity + _v
            if (_t >= 0) {
                this.quantity = _t
            }
        },
        addProductToCart() {
            let _t = {
                id: this.product.id,
                imagelink: this.product.attributes?.thub.data?.attributes.url,
                name: this.product.attributes.name,
                description: this.product.attributes.description,
                price: this.product.attributes.price,
                quantity: this.quantity
            }
            this.addCartItem(_t)
            this.showNotification('success', `Đã thêm sản phẩm vào giỏ hàng`)
        }
    }
}
</script>
<style lang="scss">
.product-detail-content {
    padding-bottom: 100px;

    .product-detail-info {
        margin: 95px 0px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .product-detail-color {
            position: absolute;
            top: 0px;
            left: 0px;
            display: inline-flex;
            align-items: center;
            gap: 8px;

            .color-text {
                color: #000;
                font-family: 'Aeroport';
                font-size: 20px;
                line-height: 15px;
                height: 18px;
            }

            .color-elip {
                width: 30px;
                height: 20px;
                border-radius: 60px;
                background-color: #000;
                // margin-right: 10px;
            }

            .color-value {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 15px;
            }
        }

        .product-detail-size {
            position: absolute;
            top: 0px;
            right: 0px;
            display: inline-flex;
            align-items: center;
            gap: 8px;

            .size-text {
                font-size: 20px;
                font-family: 'Aeroport';
            }

            .size-value {
                font-size: 20px;
                font-family: 'Aeroport-light';

                &:not(:last-child):after {
                    content: '';
                    height: 16px;
                    padding-right: 10px;
                    border-right: 1px solid #000;
                }
            }
        }

        .product-detail-name {
            position: absolute;
            bottom: 0px;
            left: 0px;

            .product-detail-name-title {
                width: 360px;
                color: #000;
                font-family: 'Aeroport';
                font-size: 40px;
            }

            .product-detail-name-price {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 25px;
                margin-top: 20px;
            }
        }

        .product-detail-btn {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 310px;
            height: 55px;
            line-height: 55px;
            text-align: center;
            cursor: pointer;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 20px;
            border: 1px solid;
        }

    }

    .product-detail-media {
        width: 50%;
        display: inline-block;

        .product-detail-media-img {
            width: calc(50% - 5px);
            margin-bottom: 10px;

            &:nth-child(even) {
                margin-left: 10px;
            }
        }
    }

    .product-detail-data {
        width: 50%;
        display: inline-block;
        padding-left: 100px;

        .product-detail-data-title {
            color: #000;
            font-family: 'Aeroport';
            font-size: 18px;

            &:not(:first-child) {
                margin-top: 20px;
            }
        }

        .product-detail-data-text {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 18px;
        }

        .product-detail-help-box {
            padding: 10px 36px;
            border: 2px solid #717171;

            .product-detail-help-item {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 16px;
                margin: 6px 0px;
                text-decoration-line: underline;
                text-transform: uppercase;
            }
        }

        .product-detail-data-color {
            margin-top: 20px;
            margin-bottom: 10px;
            display: flex;
            gap: 8px;

            .product-detail-data-color-text {
                color: #000;
                font-family: 'Aeroport';
                font-size: 20px;
                line-height: 15px;
            }

            .product-detail-data-color-elip {
                width: 30px;
                height: 20px;
                border-radius: 60px;
                border: 1px solid #000;
                cursor: pointer;
            }
        }

        .product-detail-data-size-text {
            color: #000;
            font-family: 'Aeroport';
            font-size: 20px;
        }

        .product-detail-data-size-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 16px;
            text-decoration-line: underline;
        }

        .product-detail-data-btn {
            margin-top: 30px;
            width: 100%;
            height: 55px;
            line-height: 55px;
            text-align: center;
            cursor: pointer;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 20px;
            border: 1px solid;
        }
    }

    .product-detail-list-related {
        margin-top: 120px;
        padding: 120px 0px;
        border-top: 1px solid #717171;

        .product-detail-list-title {
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 20px;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        .product-detail-list-btn {
            width: 450px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 20px;
            border: 1px solid #000;
            cursor: pointer;
            margin-left: auto;
            margin-right: auto;
            margin-top: 100px;
        }
    }
}


@media (max-width: 520px) {}</style>