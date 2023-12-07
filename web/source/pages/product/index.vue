<template>
    <div class="product-detail-content">
        <div class="container">
            <div class="product-detail-info">
                <div class="product-detail-color" @click="scrollToAdd">
                    <span class="color-text">Color:</span>
                    <Color v-if="!isMobile"></Color>
                    <ColorMobile v-else></ColorMobile>
                    <div class="color-value">+{{ listColor.length - 1 }}</div>
                </div>
                <div class="product-detail-size" @click="scrollToAdd">
                    <span class="size-text">Size:</span>
                    <div class="size-value" v-for="_size, index in listSize" :key="index">{{ _size.attributes.name
                    }}</div>
                </div>
                <img class="product-detail-img" :src="product.attributes?.thub_main.data?.attributes.url" />
                <div class="product-detail-name">
                    <div class="product-detail-name-title">{{ product.attributes?.name }}</div>
                    <div class="product-detail-name-price">{{ product.attributes?.price | numberWithCommas }}{{ ' ' }}đ
                    </div>
                </div>
                <div class="product-detail-btn" @click="scrollToAdd">
                    Add to cart
                </div>
            </div>
            <div class="d-flex" v-if="!isMobile">
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
                        <div v-for="_color, index in listColor" @click="choiceColor(_color)" :key="index">
                            <Color :color="_color.attributes.value" :selected="selectColor === _color.id" v-if="!isMobile">
                            </Color>
                            <ColorMobile :color="_color.attributes.value" :selected="selectColor === _color.id" v-else>
                            </ColorMobile>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="product-detail-data-size-text">Size:</div>
                        <div>
                            <span class="product-detail-data-size-des">Size guide</span>
                            <span class="product-detail-data-size-des" v-if="selectSize" @click="clearChoice">Clear
                                choice</span>
                        </div>
                    </div>
                    <Select :default="$i18n.locale === 'vn' ? 'Select Size' : 'Select Size'" :listItem="listSizeChoice"
                        @onChange="choiceSize"></Select>
                    <div class="product-detail-data-inventory" v-if="variant">
                        <div class="product-detail-data-inventory-text">Inventory:</div>
                        <div class="product-detail-data-inventory-des">{{ variant.attributes?.inventory }}</div>
                    </div>
                    <div class="product-detail-data-btn" @click="addProductToCart">
                        Add to cart
                    </div>
                </div>
            </div>
            <VueSlickCarousel v-bind="settings" class="product-detail-media"
                v-if="isMobile && product.attributes?.media.data">
                <div v-for="(imgData, index) in product.attributes?.media.data" :key="index">
                    <img class="product-detail-media-img" :src="imgData.attributes?.url" />
                </div>
            </VueSlickCarousel>
            <div class="product-detail-data" v-if="isMobile">
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
                    <div v-for="_color, index in listColor" @click="choiceColor(_color)" :key="index">
                        <Color :color="_color.attributes.value" :selected="selectColor === _color.id" v-if="!isMobile">
                        </Color>
                        <ColorMobile :color="_color.attributes.value" :selected="selectColor === _color.id" v-else>
                        </ColorMobile>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="product-detail-data-size-text">Size:</div>
                    <div class="product-detail-data-size-des">Size guide</div>
                </div>
                <Select :default="$i18n.locale === 'vn' ? 'Select Size' : 'Select Size'" :listItem="listSizeChoice"
                    @onChange="choiceSize"></Select>
                <div class="product-detail-data-inventory" v-if="variant">
                    <div class="product-detail-data-inventory-text">Inventory:</div>
                    <div class="product-detail-data-inventory-des">{{ variant.attributes?.inventory }}</div>
                </div>
                <div class="product-detail-data-btn" @click="addProductToCart">
                    Add to cart
                </div>
            </div>
            <div class="product-detail-list-related">
                <div class="product-detail-list-title">Recommend</div>
                <b-row v-if="listRelated && listRelated.length > 0">
                    <b-col class="mb-4" cols="6" lg="3" v-for="_item, index in listRelated" :key="index">
                        <ProductItem :item="_item" :isMobile="isMobile" height="290px" />
                    </b-col>
                </b-row>
            </div>
            <div class="product-detail-list-related">
                <div class="product-detail-list-title">Recently viewed</div>
                <b-row v-if="listView && listView.length > 0">
                    <b-col class="mb-4" cols="6" lg="3" v-for="_item, index in listView" :key="index">
                        <ProductItem :item="_item" :isMobile="isMobile" height="290px" />
                    </b-col>
                </b-row>
                <!-- <div class="product-detail-list-btn">More items from collection</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Select from "~/components/common/select.vue"
import Color from "~/components/common/color.vue"
import ProductItem from "~/components/product/productItem.vue"
// import ListMedia from "~/components/product/mediaList.vue"
import general from "~/mixins/general"
import ColorMobile from "~/components/common/colorMobile.vue"

export default {
    name: 'IndexPage',
    components: {
        ProductItem,
        Select,
        Color,
        ColorMobile
    },
    mixins: [general],
    data() {
        return {
            showImage: false,
            isMobile: false,
            settings: {
                "dots": true,
                "arrows": false,
                "edgeFriction": 0.35,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            },
            listRelated: [],
            listSize: [],
            listColor: [],
            listSizeChoice: [],
            selectColor: null,
            selectSize: null,
            variant: null
        }
    },
    computed: {
        ...mapGetters({
            product: "product/getProduct",
            listView: "product/getListProductView"
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

        this.listRelated = this.product.attributes?.related.data

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
        scrollToAdd() {
            window.scrollTo({ top: 1000, behavior: 'smooth' })
        },
        async loadData() {
            if (this.$route.params.id) {
                await this.getProductBySlug(this.$route.params.id)
                this.listRelated = this.product.attributes?.related.data ?? []
            }
        },
        updateValue(_v) {
            let _t = this.quantity + _v
            if (_t >= 0) {
                this.quantity = _t
            }
        },
        choiceColor(_color) {
            this.selectColor = _color.id
            let listFilter = this.product.attributes.variants.data.filter(f => f.attributes.color.data.id === _color.id)
            this.listSize = []
            listFilter.forEach(v => {
                let size = v.attributes.size.data
                let _cs = this.listSize.find(o => o.id === size.id)
                if (!_cs) {
                    this.listSize.push(size)
                }
            });
            this.listSizeChoice = this.listSize.map(o => {
                return {
                    item: o.id,
                    name: o.attributes.name
                }
            })
            if (this.selectSize) {
                this.variant = listFilter.find(o => o.attributes.size.data.id === this.selectSize)
            }
        },
        choiceSize(_size) {
            this.selectSize = _size
            let listFilter = this.product.attributes.variants.data.filter(f => f.attributes.size.data.id === _size)
            this.listColor = []
            listFilter.forEach(v => {
                let color = v.attributes.color.data
                let _cc = this.listColor.find(o => o.id === color.id)
                if (!_cc) {
                    this.listColor.push(color)
                }
            });
            if (this.selectColor) {
                this.variant = listFilter.find(o => o.attributes.color.data.id === this.selectColor)
            }
        },
        clearChoice() {
            this.selectSize = null
            this.selectColor = null
            let listFilter = this.product.attributes.variants.data
            this.listColor = []
            listFilter.forEach(v => {
                let color = v.attributes.color.data
                let _cc = this.listColor.find(o => o.id === color.id)
                if (!_cc) {
                    this.listColor.push(color)
                }
            });
            this.listSize = []
            listFilter.forEach(v => {
                let size = v.attributes.size.data
                let _cs = this.listSize.find(o => o.id === size.id)
                if (!_cs) {
                    this.listSize.push(size)
                }
            });
        },
        addProductToCart() {
            if (!this.selectSize) {
                this.$message.warning('Vui lòng chọn size');
                return
            }
            if (!this.selectColor) {
                this.$message.warning('Vui lòng chọn màu');
                return
            }
            let _t = {
                id: this.product.id,
                variant_id: this.variant.id,
                variant: this.variant,
                imagelink: this.product.attributes?.thub.data?.attributes.url,
                name: this.product.attributes.name,
                description: this.product.attributes.description,
                price: this.product.attributes.price,
                quantity: 1
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
            height: 40px;
            cursor: pointer;

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
            cursor: pointer;

            .size-text {
                font-size: 20px;
                font-family: 'Aeroport';
            }

            .size-value {
                font-size: 20px;
                font-family: 'Aeroport-light';
                display: inline-block;

                &:not(:last-child):after {
                    content: '';
                    height: 16px;
                    padding-right: 10px;
                    border-right: 1px solid #000;
                }
            }
        }

        .product-detail-img {
            max-width: 38%;
        }

        .product-detail-name {
            position: absolute;
            bottom: 0px;
            left: 0px;

            .product-detail-name-title {
                width: 360px;
                color: #000;
                font-family: 'Aeroport';
                font-size: 28px;
                line-height: 28px;
            }

            .product-detail-name-price {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 25px;
                margin-top: 20px;
                letter-spacing: -0.7px;
            }
        }

        .product-detail-btn {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 280px;
            height: 50px;
            line-height: 48px;
            text-align: center;
            cursor: pointer;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 20px;
            border: 1px solid;
            text-transform: uppercase;

            &:hover {
                color: #fff;
                background-color: #000;
            }
        }

    }

    .product-detail-media {
        width: 50%;
        display: inline-block;

        .product-detail-media-img {
            width: calc(50% - 5px);
            height: 380px;
            margin-bottom: 10px;
            object-fit: cover;

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
            height: 40px;
            display: flex;
            gap: 8px;

            .product-detail-data-color-text {
                color: #000;
                font-family: 'Aeroport';
                font-size: 20px;
                line-height: 15px;
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
            margin-left: 10px;
            cursor: pointer;
        }

        .product-detail-data-inventory {
            margin-top: 20px;
            margin-bottom: 10px;
            display: flex;

            .product-detail-data-inventory-text {
                color: #000;
                font-family: 'Aeroport';
                font-size: 20px;
                line-height: 15px;
            }

            .product-detail-data-inventory-des {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 20px;
                line-height: 15px;
                margin-left: 10px;
            }
        }

        .product-detail-data-btn {
            margin-top: 30px;
            width: 100%;
            height: 55px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
            color: #000;
            font-family: 'Aeroport-light';
            font-size: 20px;
            border: 1px solid;
            text-transform: uppercase;

            &:hover {
                color: #fff;
                background-color: #000;
            }
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

@media (max-width: 820px) {
    .product-detail-content {
        padding-bottom: 30px;

        .product-detail-info {
            margin: 20px 0px;
            position: relative;
            text-align: center;
            display: block;

            .product-detail-color {
                position: absolute;
                top: 0px;
                left: 0px;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                height: 30px;

                .color-text {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 12px;
                    line-height: 15px;
                    height: 18px;
                }

                .color-value {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 11px;
                }
            }

            .product-detail-size {
                position: absolute;
                top: 0px;
                right: 0px;
                display: inline-flex;
                align-items: center;
                gap: 4px;

                .size-text {
                    font-size: 12px;
                    font-family: 'Aeroport';
                }

                .size-value {
                    font-size: 12px;
                    font-family: 'Aeroport-light';
                    height: 16px;

                    &:not(:last-child):after {
                        content: '';
                        display: inline-block;
                        height: 10px;
                        padding-right: 6px;
                        border-right: 1px solid #000;
                    }
                }
            }

            .product-detail-img {
                width: 100%;
            }

            .product-detail-name {
                position: relative;
                bottom: unset;
                text-align: left;

                .product-detail-name-title {
                    width: 100%;
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 20px;
                    margin-top: 10px;
                }

                .product-detail-name-price {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 12px;
                    margin-top: 10px;
                    margin-bottom: 10px;

                }
            }

            .product-detail-btn {
                position: relative;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 11px;
                border: 1px solid;
            }

        }

        .product-detail-media {
            width: 100%;
            display: inline-block;
            margin-bottom: 50px;

            .product-detail-media-img {
                width: 100%;

                &:nth-child(even) {
                    margin-left: 10px;
                }
            }
        }

        .product-detail-data {
            width: 100%;
            display: inline-block;
            padding-left: 0px;

            .product-detail-data-title {
                color: #000;
                font-family: 'Aeroport';
                font-size: 12px;

                &:not(:first-child) {
                    margin-top: 20px;
                }
            }

            .product-detail-data-text {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 10px;
            }

            .product-detail-help-box {
                padding: 10px 25px;
                border: 2px solid #717171;

                .product-detail-help-item {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 11px;
                    margin: 6px 0px;
                    text-decoration-line: underline;
                    text-transform: uppercase;
                }
            }

            .product-detail-data-color {
                margin-top: 20px;
                margin-bottom: 10px;
                height: 30px;
                display: flex;
                gap: 4px;

                .product-detail-data-color-text {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 11px;
                    line-height: 15px;
                }
            }

            .product-detail-data-size-text {
                color: #000;
                font-family: 'Aeroport';
                font-size: 10px;
                margin-bottom: 10px;
            }

            .product-detail-data-size-des {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 10px;
                text-decoration-line: underline;
                margin-bottom: 10px;
            }

            .product-detail-data-inventory {
                margin-top: 20px;
                margin-bottom: 10px;
                display: flex;

                .product-detail-data-inventory-text {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 10px;
                    line-height: 15px;
                }

                .product-detail-data-inventory-des {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                    line-height: 15px;
                    margin-left: 10px;
                }
            }

            .product-detail-data-btn {
                margin-top: 30px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 11px;
                border: 1px solid;
            }
        }

        .product-detail-list-related {
            margin-top: 60px;
            padding: 60px 0px 0px 0px;
            border-top: 1px solid #717171;

            .product-detail-list-title {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 20px;
            }

            .product-detail-list-btn {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 11px;
                border: 1px solid #000;
                cursor: pointer;
                margin-left: auto;
                margin-right: auto;
                margin-top: 60px;
            }
        }
    }
}

@media (max-width: 520px) {
    .product-detail-content {
        padding-bottom: 30px;

        .product-detail-info {
            margin: 20px 0px;
            position: relative;
            text-align: center;
            display: block;

            .product-detail-color {
                position: absolute;
                top: 0px;
                left: 0px;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                height: 30px;

                .color-text {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 12px;
                    line-height: 15px;
                    height: 18px;
                }

                .color-value {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 11px;
                }
            }

            .product-detail-size {
                position: absolute;
                top: 0px;
                right: 0px;
                display: inline-flex;
                align-items: center;
                gap: 4px;

                .size-text {
                    font-size: 12px;
                    font-family: 'Aeroport';
                }

                .size-value {
                    font-size: 12px;
                    font-family: 'Aeroport-light';
                    height: 16px;

                    &:not(:last-child):after {
                        content: '';
                        display: inline-block;
                        height: 10px;
                        padding-right: 6px;
                        border-right: 1px solid #000;
                    }
                }
            }

            .product-detail-img {
                width: 100%;
            }

            .product-detail-name {
                position: relative;
                bottom: unset;
                text-align: left;

                .product-detail-name-title {
                    width: 100%;
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 20px;
                    margin-top: 50x;
                }

                .product-detail-name-price {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 12px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            }

            .product-detail-btn {
                position: relative;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 11px;
                border: 1px solid;
            }

        }

        .product-detail-media {
            width: 100%;
            display: inline-block;
            margin-bottom: 50px;

            .product-detail-media-img {
                width: 100%;

                &:nth-child(even) {
                    margin-left: 10px;
                }
            }
        }

        .product-detail-data {
            width: 100%;
            display: inline-block;
            padding-left: 0px;

            .product-detail-data-title {
                color: #000;
                font-family: 'Aeroport';
                font-size: 12px;

                &:not(:first-child) {
                    margin-top: 20px;
                }
            }

            .product-detail-data-text {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 10px;
            }

            .product-detail-help-box {
                padding: 10px 25px;
                border: 2px solid #717171;

                .product-detail-help-item {
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 11px;
                    margin: 6px 0px;
                    text-decoration-line: underline;
                    text-transform: uppercase;
                }
            }

            .product-detail-data-color {
                margin-top: 20px;
                margin-bottom: 10px;
                height: 30px;
                display: flex;
                gap: 4px;

                .product-detail-data-color-text {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 11px;
                    line-height: 15px;
                }
            }

            .product-detail-data-size-text {
                color: #000;
                font-family: 'Aeroport';
                font-size: 10px;
                margin-bottom: 10px;
            }

            .product-detail-data-size-des {
                color: #717171;
                font-family: 'Aeroport-light';
                font-size: 10px;
                text-decoration-line: underline;
                margin-bottom: 10px;
            }

            .product-detail-data-inventory {
                margin-top: 20px;
                margin-bottom: 10px;
                display: flex;

                .product-detail-data-inventory-text {
                    color: #000;
                    font-family: 'Aeroport';
                    font-size: 10px;
                    line-height: 15px;
                }

                .product-detail-data-inventory-des {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 10px;
                    line-height: 15px;
                    margin-left: 10px;
                }
            }

            .product-detail-data-btn {
                margin-top: 30px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 11px;
                border: 1px solid;
            }
        }

        .product-detail-list-related {
            margin-top: 60px;
            padding: 60px 0px 0px 0px;
            border-top: 1px solid #717171;

            .product-detail-list-title {
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 20px;
            }

            .product-detail-list-btn {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #000;
                font-family: 'Aeroport-light';
                font-size: 11px;
                border: 1px solid #000;
                cursor: pointer;
                margin-left: auto;
                margin-right: auto;
                margin-top: 60px;
            }
        }
    }
}
</style>