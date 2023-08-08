<template>
    <div class="product-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb" />
        </b-container>
        <div v-if="!isMobile" class="product-info-panel"
            :style="`background-image: url('${product?.attributes?.detail_backgroud.data?.attributes.formats?.large.url}')`">
            <b-container class="d-flex justify-content-between" style="position: relative;">
                <div class="product-div-info">
                    <div class="product-info-title" v-if="$i18n.locale === 'vn'">{{ product?.attributes?.title }}</div>
                    <div class="product-info-name">{{ product?.attributes?.name }}</div>
                    <div class="product-info-des">
                        {{ $i18n.locale === 'vn' ? product?.attributes?.description : product?.attributes?.description_en }}
                    </div>
                    <div class="product-info-line"></div>
                    <div class="product-info-uses">{{ $t('Product_used_text') }}</div>
                    <div class="product-info-html"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product?.attributes?.used_content : product?.attributes?.used_content_en)">
                    </div>
                </div>
                <div class="product-div-image align-self-center">
                    <Transition name="bounce">
                        <img class="product-image-main" v-if="showImage"
                            :src="product?.attributes?.thub.data?.attributes.formats?.medium.url" />
                    </Transition>
                </div>
                <div class="product-div-tips">
                    <div class="d-flex justify-content-between">
                        <div class="product-tips-price">{{ product?.attributes?.price_primary | numberWithCommas }}{{ ' '
                        }}đ</div>
                        <div class="product-tips-promotion-price">
                            {{ product?.attributes?.price | numberWithCommas }}{{ ' ' }}đ</div>
                    </div>
                    <div class="product-list-tips">
                        <b-row>
                            <b-col class="product-tips-item" cols="6" v-for="(itip, idx) in product?.attributes?.tips.data"
                                :key="idx">
                                {{ $i18n.locale === 'vn' ? itip?.attributes?.name : itip?.attributes?.name_en }}
                            </b-col>
                        </b-row>
                    </div>
                    <div class="product-add-cart-btn d-flex justify-content-between">
                        <div class="product-add-left-text" @click="addProductToCart">{{ $t('Product_add_cart') }}</div>
                        <div class="product-add-right-control d-flex justify-content-between">
                            <div class="product-control-btn" @click="() => updateValue(-1)">-</div>
                            <div class="product-control-quantity">{{ quantity }}</div>
                            <div class="product-control-btn" @click="() => updateValue(1)">+</div>
                        </div>
                    </div>
                    <!-- <div class="product-info-free d-flex align-items-center">
                        <img class="product-info-free-image" src="/images/freeship-product.png" />
                        <div>{{ $t('Product_promotion_text') }}</div>
                    </div> -->
                </div>
            </b-container>
        </div>
        <b-container v-if="!isMobile" class="product-extra-content">
            <div class="d-flex justify-content-end">
                <div :class="`product-tab-title ${menuTab == 'tab1' ? 'product-tab-title-active' : ''}`"
                    @click="menuTab = 'tab1'">{{ $t('Product_media') }}</div>
                <div :class="`product-tab-title ${menuTab == 'tab2' ? 'product-tab-title-active' : ''}`"
                    @click="menuTab = 'tab2'">{{ $t('Product_contruct_text') }}</div>
                <div :class="`product-tab-title ${menuTab == 'tab3' ? 'product-tab-title-active' : ''}`"
                    @click="menuTab = 'tab3'">{{ $t('Product_guide_text') }}</div>
            </div>
            <!-- <transition name="fade"> -->
            <div v-show="menuTab === 'tab1'">
                <ListMedia :listMedia="product?.attributes?.media?.data ?? []" />
            </div>
            <!-- </transition>
            <transition name="fade"> -->
            <div v-if="menuTab === 'tab2'" class="d-flex justify-content-between">
                <div class="product-extra-text-panel">
                    <div class="product-extra-title">{{ $t('Product_contruct_text') }}</div>
                    <div class="product-extra-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product?.attributes?.structure_content : product?.attributes?.structure_content_en)">
                    </div>
                </div>
                <div class="product-extra-image-thub">
                    <img class="product-extra-image-item" src="/images/thanhphan.jpg" />
                    <div class="product-extra-text" style="margin-top: 30px;">{{ product?.attributes?.ingredient }}</div>
                </div>
            </div>
            <!-- </transition>
            <transition name="fade"> -->
            <div v-if="menuTab === 'tab3'" class="d-flex justify-content-between">
                <div class="product-extra-text-panel">
                    <div class="product-extra-title">{{ $t('Product_guide_text') }}</div>
                    <div class="product-extra-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product?.attributes?.guide_content : product?.attributes?.guide_content_en)">
                    </div>
                </div>
                <div class="product-extra-image-thub">
                    <img class="product-extra-image-item" src="/images/huongdan.jpg" />
                </div>
            </div>
            <!-- </transition> -->
        </b-container>
        <div v-if="!isMobile" class="product-related-list-data">
            <RelatedList :isMobile="isMobile" :listRelated="listRelated" />
        </div>
        <div v-if="isMobile">
            <b-container>
                <img class="mobile-product-back" src="/images/back.png" @click="$router.go(-1)" />
            </b-container>
            <div class="mobile-product-backgroud" style="position: relative;">
                <ThumbImage class="mobile-product-back" ratio="1-1"
                    :src="product?.attributes?.detail_backgroud_mobile?.data?.attributes.formats?.medium.url"></ThumbImage>
                <div class="product-div-image align-self-center">
                    <Transition name="bounce">
                        <img class="product-image-main" v-if="showImage"
                            :src="product?.attributes?.thub.data?.attributes.formats?.small.url" />
                    </Transition>
                </div>
            </div>
            <b-container>
                <div class="product-div-info">
                    <div class="product-info-title" v-if="$i18n.locale === 'vn'">{{ product?.attributes?.title }}</div>
                    <div class="product-info-name">{{ product?.attributes?.name }}</div>
                    <div class="product-info-des">
                        {{ $i18n.locale === 'vn' ? product?.attributes?.description : product?.attributes?.description_en }}
                    </div>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="product-tips-price">{{ product?.attributes?.price_primary | numberWithCommas }}{{ ' ' }}đ
                    </div>
                    <div class="product-tips-promotion-price">
                        {{ product?.attributes?.price | numberWithCommas }}{{ ' ' }}đ</div>
                </div>
                <div class="product-list-tips">
                    <b-row>
                        <b-col class="product-tips-item" cols="6" v-for="(itip, idx) in product?.attributes?.tips.data"
                            :key="idx">
                            {{ $i18n.locale === 'vn' ? itip?.attributes?.name : itip?.attributes?.name_en }}
                        </b-col>
                    </b-row>
                </div>
                <div class="product-add-cart-btn d-flex justify-content-between">
                    <div class="product-add-left-text" @click="addProductToCart">{{ $t('Product_used_text') }}</div>
                    <div class="product-add-right-control d-flex justify-content-between">
                        <div class="product-control-btn" @click="() => updateValue(-1)">-</div>
                        <div class="product-control-quantity">{{ quantity }}</div>
                        <div class="product-control-btn" @click="() => updateValue(1)">+</div>
                    </div>
                </div>
                <div class="product-mobile-info">
                    <b-row>
                        <b-col cols="6" class="product-mobile-info-title">
                            {{ $t('Product_used_text') }}
                        </b-col>
                        <b-col cols="6">
                            <div class="product-mobile-info-html"
                                v-html="showHtmlText($i18n.locale === 'vn' ? product?.attributes?.used_content : product?.attributes?.used_content_en)">
                            </div>
                        </b-col>
                    </b-row>
                </div>

            </b-container>
            <b-container class="product-mobile-info-detail">
                <div class="product-content-tab d-flex justify-content-between align-items-center"
                    @click="menuTab !== 'tab1' ? menuTab = 'tab1' : menuTab = ''">
                    <div class="product-content-tab-text">{{ $t('Product_media') }}</div>
                    <img src="/images/plus.png" v-if="menuTab !== 'tab1'" />
                    <img src="/images/minus.png" v-else />
                </div>
                <div class="product-block-content" v-show="menuTab === 'tab1'">
                    <ListMedia :listMedia="product?.attributes?.media?.data ?? []" />
                </div>
                <div class="product-content-tab d-flex justify-content-between align-items-center"
                    @click="menuTab !== 'tab2' ? menuTab = 'tab2' : menuTab = ''">
                    <div class="product-content-tab-text">{{ $t('Product_contruct_text') }}</div>
                    <img src="/images/plus.png" v-if="menuTab !== 'tab2'" />
                    <img src="/images/minus.png" v-else />
                </div>
                <div class="product-block-content tab2" v-if="menuTab === 'tab2'">
                    <div class="product-extra-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product?.attributes?.structure_content : product?.attributes?.structure_content_en)">
                    </div>
                </div>
                <div class="product-content-tab d-flex justify-content-between align-items-center"
                    @click="menuTab !== 'tab3' ? menuTab = 'tab3' : menuTab = ''">
                    <div class="product-content-tab-text">{{ $t('Product_guide_text') }}</div>
                    <img src="/images/plus.png" v-if="menuTab !== 'tab3'" />
                    <img src="/images/minus.png" v-else />
                </div>
                <div class="product-block-content tab2" v-if="menuTab === 'tab3'">
                    <div class="product-extra-text"
                        v-html="showHtmlText($i18n.locale === 'vn' ? product?.attributes?.guide_content : product?.attributes?.guide_content_en)">
                    </div>
                    <div class="product-extra-text">{{ product?.attributes?.ingredient }}</div>
                </div>
            </b-container>
            <div>
                <RelatedList :isMobile="isMobile" :listRelated="listRelated" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ListMedia from "~/components/product/mediaList.vue"
import RelatedList from "~/components/product/relatedList.vue"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    components: {
        ListMedia,
        RelatedList
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
                    text: this.product?.attributes?.name,
                    active: true
                }
            ],
            showImage: false,
            isMobile: false,
            quantity: 1,
            menuTab: 'tab1',
            listRelated: []
        }
    },
    computed: {
        ...mapGetters({
            product: "product/getProduct"
        }),
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
                        text: this.$i18n.locale === 'vn' ? this.product?.attributes.categories?.data[0]?.attributes?.name :
                            this.product?.attributes.categories?.data[0]?.attributes?.name_en,
                        active: false,
                        href: `/chuyen-muc/${this.product?.attributes.categories?.data[0]?.attributes?.slug}`
                    },
                    {
                        text: this.product?.attributes?.name,
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.loadData()
        this.listRelated = this.product.attributes?.related.data
        if (this.isMobile) {
            this.menuTab = ''
        }
        this.addView(this.product)
        setTimeout(() => {
            this.onImgLoad()
        }, 800)
    },
    methods: {
        ...mapActions({
            getProductBySlug: "product/getProductBySlug",
            addCartItem: "cart/addCartItemDirect",
            addView: "product/addView",
        }),
        onImgLoad() {
            console.log('load')
            this.showImage = true
        },
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
                await this.getProductBySlug(this.$route.params.id)
                this.breadcrumb[1] = {
                    text: this.$i18n.locale === 'vn' ? this.product?.attributes.categories?.data[0]?.attributes?.name :
                        this.product?.attributes.categories?.data[0]?.attributes?.name_en,
                    active: false,
                    href: `/ chuyen - muc / ${ this.product?.attributes.categories?.data[0]?.attributes?.slug }`
                }
                this.breadcrumb.push({
                    text: this.product?.attributes?.name,
                    active: true
                })
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
.product-content {
    margin-top: 180px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.product-info-panel {
    padding-top: 80px;
    padding-bottom: 80px;
    margin-top: 50px;
    background-size: 100% 100%;

    .product-div-info {
        width: 435px;

        .product-info-title {
            font-size: 12px;
            font-family: 'inter-light';
            color: #fff;
            text-transform: uppercase;
        }

        .product-info-name {
            font-size: 42px;
            font-weight: 600;
            color: #fff;
            line-height: 42px;
            margin-top: 16px;
        }

        .product-info-des {
            font-size: 16px;
            font-family: 'inter';
            color: #fff;
            margin-top: 16px;
        }

        .product-info-line {
            width: 65px;
            border-bottom: 3px solid #fff;
            margin-top: 48px;
        }

        .product-info-uses {
            margin-top: 24px;
            font-weight: 700;
            font-size: 14px;
            font-family: 'inter';
            color: #fff;
            text-transform: uppercase;
        }

        .product-info-html {
            margin-top: 24px;
            font-size: 16px;
            font-family: 'inter-light';
            color: #fff;

            p,
            div,
            span {
                color: #fff !important;
            }
        }
    }

    .product-div-image {
        .product-image-main {
            transform: scale(1.6);
            max-width: 230px;
            max-height: 400px;
        }
    }

    .product-div-tips {
        width: 480px;
        padding-top: 70px;
        position: relative;

        .product-image-backgroud {
            position: absolute;
            z-index: 0;
        }

        .product-tips-price {
            font-size: 38px;
            text-decoration-line: line-through;
            color: rgba(255, 255, 255, 0.5);
            position: relative;
            z-index: 1;
        }

        .product-tips-promotion-price {
            font-size: 38px;
            color: #FFFFFF;
            position: relative;
            z-index: 1;
        }

        .product-list-tips {
            border-top: 1px solid #FFFFFF;
            border-bottom: 1px solid #FFFFFF;
            margin-bottom: 30px;
            margin-top: 30px;
            padding-bottom: 30px;
            padding-top: 30px;
            position: relative;
            z-index: 1;
            width: 520px;

            .product-tips-item {
                text-transform: uppercase;
                font-size: 15px;
                font-family: 'inter';
                color: #FFFFFF;
                font-weight: 700;
                position: relative;
                z-index: 1;
                white-space: nowrap;

                &:before {
                    content: "•";
                    color: #FFFFFF;
                    text-shadow: #FFFFFF 0 0 5px;
                    margin: 0 10px;
                }
            }


        }

        .product-add-cart-btn {
            width: 460px;
            height: 55px;
            position: relative;
            z-index: 1;

            .product-add-left-text {
                width: 330px;
                border-radius: 27.5px 0px 0px 27.5px;
                background: #FFFFFF;
                text-align: center;
                color: #F7B2C2;
                font-size: 14px;
                line-height: 53px;
                cursor: pointer;
            }

            .product-add-right-control {
                width: 130px;
                border-radius: 0px 27.5px 27.5px 0px;
                border: 1px solid #fff;
                position: relative;
                z-index: 1;

                .product-control-btn {
                    width: 40px;
                    line-height: 53px;
                    text-align: center;
                    color: #FFFFFF;
                    cursor: pointer;
                }

                .product-control-quantity {
                    width: 40px;
                    line-height: 53px;
                    text-align: center;
                    color: #FFFFFF;
                    cursor: pointer;
                }
            }
        }

        .product-info-free {
            margin-top: 24px;
            position: relative;
            z-index: 1;

            .product-info-free-image {
                margin-right: 20px;
            }

            div {
                color: #FFFFFF;
            }
        }
    }
}

.product-extra-content {
    margin-top: 60px;

    .product-tab-title {
        font-size: 20px;
        text-align: center;
        color: #484848;
        cursor: pointer;
        margin: 0px 15px;
        border-bottom: 3px solid #00000000;
        padding-bottom: 16px;
    }

    .product-tab-title-active {
        border-bottom: 3px solid #484848;
    }

    .product-extra-text-panel {
        width: 310px;
    }

    .product-extra-title {
        font-size: 36px;
        font-weight: 600;
        color: #515151;
        line-height: 42px;
        margin-bottom: 30px;
        width: 220px;
    }

    .product-extra-text {
        font-size: 15px;
        color: #777777;
        line-height: 30px;
        font-family: 'inter-light';
    }

    .product-extra-image-thub {
        width: 950px;

        .product-extra-image-item {
            width: 100%;
        }
    }
}

.product-related-list-data {
    margin-top: 60px;
}

.product-extra-text {
    font-family: 'inter';
}

@media (max-width: 520px) {
    .product-content {
        margin-top: 60px;

        .product-div-info {
            margin-top: 60px;
            width: 240px;

            .product-info-title {
                font-family: 'inter';
                color: #515151;
                font-size: 10px;
                text-transform: uppercase;
            }

            .product-info-name {
                font-size: 20px;
                color: #515151;
                margin-top: 8px;
                line-height: 22px;
            }

            .product-info-des {
                font-size: 10px;
                font-family: 'inter';
                margin-top: 8px;
                color: #515151;
            }
        }
    }

    .product-div-image {
        justify-content: center;
        position: absolute;
        text-align: center;
        z-index: 1;
        display: flex;
        align-items: center;
        width: 100%;
        left: 0px;
        top: 0px;
        height: 100%;

        img {
            max-width: 300px;
            max-height: 310px;
        }
    }

    .mobile-product-back {
        margin-bottom: 10px;
    }

    .product-tips-price {
        color: #D7D7D7;
        font-size: 25px;
        text-decoration-line: line-through;
        text-transform: uppercase;
        margin-right: 30px;
    }

    .product-tips-promotion-price {
        color: #515151;
        font-size: 25px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .product-list-tips {
        border-top: 1px solid #515151;
        border-bottom: 1px solid #515151;
        margin-bottom: 15px;
        margin-top: 15px;
        padding-bottom: 15px;
        padding-top: 15px;
        position: relative;
        z-index: 1;

        .product-tips-item {
            text-transform: uppercase;
            font-size: 10px;
            font-family: 'inter';
            color: #515151;
            font-weight: 700;
            position: relative;
            z-index: 1;
            white-space: nowrap;

            &:before {
                content: "•";
                color: #515151;
                text-shadow: #515151 0 0 2px;
                margin: 0 1px;
            }
        }
    }

    .product-add-cart-btn {
        width: 240px;
        height: 30px;
        position: relative;
        z-index: 1;

        .product-add-left-text {
            width: 170px;
            border-radius: 15px 0px 0px 15px;
            background: #D7D7D7;
            text-align: center;
            color: #515151;
            font-size: 10px;
            line-height: 28px;
            cursor: pointer;
        }

        .product-add-right-control {
            width: 70px;
            border-radius: 0px 15px 15px 0px;
            border: 1px solid #F7B2C2;
            position: relative;
            background-color: #F7B2C2;
            z-index: 1;

            .product-control-btn {
                width: 25px;
                line-height: 26px;
                text-align: center;
                color: #FFFFFF;
                cursor: pointer;
            }

            .product-control-quantity {
                width: 20px;
                line-height: 26px;
                text-align: center;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
    }

    .product-mobile-info-detail {
        margin-top: 20px;

        .product-content-tab {
            border-bottom: 1px solid #B9B9B9;
            margin-bottom: 12px;

            .product-content-tab-text {
                line-height: 45px;
                font-size: 14px;
            }

            img {
                width: 25px;
            }
        }

        .product-extra-text {
            font-size: 10px;
            font-family: 'inter';

            h5 {
                font-size: 13px;
            }

            h4 {
                font-size: 14px;
            }

            h3 {
                font-size: 15px;
            }

            h2 {
                font-size: 16px;
            }
        }
    }

    .product-mobile-info {
        margin-top: 30px;

        .product-mobile-info-title {
            color: #515151;
            font-size: 14px;
        }

        .product-mobile-info-html {
            color: #515151;
            font-size: 11px;
            font-family: 'inter';
        }
    }
}
</style>