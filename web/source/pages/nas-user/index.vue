<template>
    <div class="nas-user-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <b-container class="d-flex justify-content-between" v-if="!isMobile">
            <div class="nas-user-left-content">
                <img class="nas-user-image" :src="bannerInfo.user?.data.attributes.url ?? '/images/usernas.jpg'" />
            </div>
            <div class="nas-user-right-content">
                <h2 class="nas-user-title">{{ $t('Members_hello') }} {{ profile.username }}</h2>
                <div class="nas-user-des">
                    {{ $t('Members_des_1') }}
                </div>
                <div class="nas-user-item-block">
                    <b-button @click="setShow(1)" class="btn-nas-user-item d-flex w-100 align-items-center">
                        <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_1') }} </span>
                        <img class="user-icon-arrow" :src="tab1 ? '/images/xvalue1.png' : '/images/xvalue.png'" />
                    </b-button>
                    <b-collapse v-model="tab1">
                        <div class="nas-user-tab-content d-flex justify-content-between">
                            <div>{{ profile.username }}</div>
                            <div>{{ profile.email }}</div>
                        </div>
                    </b-collapse>
                </div>
                <div class="nas-user-item-block">
                    <b-button @click="setShow(2)" class="btn-nas-user-item d-flex w-100 align-items-center">
                        <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_2') }}</span>
                        <img class="user-icon-arrow" :src="tab2 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                    </b-button>
                    <b-collapse v-model="tab2">
                        <div class="nas-user-tab-content d-flex justify-content-between">
                            <div v-if="listOrder.length === 0">{{ $t('Members_des_9') }}</div>
                            <div @click="() => this.isShowOrders = true" v-if="listOrder.length > 0"
                                style="cursor: pointer;">{{ $t('Members_des_2') }}</div>
                        </div>
                        <NuxtLink to="/">
                            <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                        </NuxtLink>
                    </b-collapse>
                </div>
                <!-- <div class="nas-user-item-block">
                    <b-button @click="setShow(3)" class="btn-nas-user-item d-flex w-100 align-items-center">
                        <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_3') }} </span>
                        <img class="user-icon-arrow" src="/images/xvalue.png" />
                    </b-button>
                    <b-collapse v-model="tab3">
                        <div class="nas-user-tab-content d-flex justify-content-between">
                            <div>{{ $t('Members_des_4') }}</div>
                        </div>
                        <NuxtLink to="/">
                            <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                        </NuxtLink>
                    </b-collapse>
                </div> -->
                <div class="nas-user-item-block">
                    <b-button @click="setShow(4)" class="btn-nas-user-item d-flex w-100 align-items-center">
                        <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_4') }} </span>
                        <img class="user-icon-arrow" :src="tab4 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                    </b-button>
                    <b-collapse v-model="tab4">
                        <div class="nas-user-tab-content d-flex justify-content-between">
                            <div v-if="address?.attributes">
                                <div>{{ address?.attributes?.name }}</div>
                                <div>{{ address?.attributes?.email }}</div>
                                <div>{{ address?.attributes?.phone }}</div>
                                <div>{{ address?.attributes?.full_address }}</div>
                            </div>
                            <div v-else>{{ $t('Members_des_5') }}</div>
                        </div>
                        <div class="nas-user-buy-again" v-if="address?.attributes" @click="onUpdateAddress()">{{
                            $t('Members_des_10') }}</div>
                        <div class="nas-user-buy-again" v-else @click="onAddAddress()">{{ $t('Members_des_6') }}</div>
                    </b-collapse>
                </div>
                <div class="nas-user-item-block">
                    <b-button @click="setShow(5)" class="btn-nas-user-item d-flex w-100 align-items-center">
                        <span class="nas-user-text w-100 text-left">{{ $t('Members_title_5') }}</span>
                        <img class="user-icon-arrow" :src="tab5 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                    </b-button>
                    <b-collapse v-model="tab5">
                        <div class="nas-user-tab-content d-flex justify-content-between">
                            <!-- <div >{{ $t('Members_des_7') }}</div> -->
                            <div v-if="listProduct.length === 0">{{ $t('Members_des_7') }}</div>
                            <div @click="() => this.isShowProducts = true" v-if="listProduct.length > 0"
                                style="cursor: pointer;">{{ $t('Members_des_77') }}</div>
                        </div>
                        <NuxtLink to="/">
                            <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                        </NuxtLink>
                    </b-collapse>
                </div>
                <div class="nas-user-item-block">
                    <b-button @click="setShow(6)" class="btn-nas-user-item d-flex w-100 align-items-center">
                        <span class="nas-user-text w-100 text-left">{{ $t('Members_title_6') }}</span>
                        <img class="user-icon-arrow" :src="tab6 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                    </b-button>
                    <b-collapse v-model="tab6">
                        <div class="nas-user-tab-content d-flex justify-content-between">
                            <!-- <div>{{ $t('Members_des_8') }}</div> -->
                            <div v-if="listLike.length === 0">{{ $t('Members_des_8') }}</div>
                            <div @click="() => this.isShowLike = true" v-if="listLike.length > 0"
                                style="cursor: pointer;">{{ $t('Members_des_88') }}</div>
                        </div>
                        <NuxtLink to="/">
                            <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                        </NuxtLink>
                    </b-collapse>
                </div>
            </div>
        </b-container>
        <ThumbImage ratio="4-3" :src="bannerInfo.user_mobile?.data.attributes.url ?? '/images/usernas_mobile.jpg'" v-if="isMobile"></ThumbImage>
        <b-container v-if="isMobile">
            <div class="d-flex justify-content-between">
                <h2 class="nas-user-title">Xin chào {{ profile.username }}</h2>
                <div class="nas-user-log-out" @click="onLogOut">Log out</div>
            </div>
            <div class="nas-user-des">
                {{ $t('Members_des_1') }}
            </div>
            <div class="nas-user-item-block">
                <b-button @click="setShow(1)" class="btn-nas-user-item d-flex w-100 align-items-center">
                    <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_1') }} </span>
                    <img class="user-icon-arrow" :src="tab1 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                </b-button>
                <b-collapse v-model="tab1">
                    <div class="nas-user-tab-content d-flex justify-content-between">
                        <div>{{ profile.username }}</div>
                        <div>{{ profile.email }}</div>
                    </div>
                </b-collapse>
            </div>
            <div class="nas-user-item-block">
                <b-button @click="setShow(2)" class="btn-nas-user-item d-flex w-100 align-items-center">
                    <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_2') }}</span>
                    <img class="user-icon-arrow" :src="tab2 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                </b-button>
                <b-collapse v-model="tab2">
                    <div class="nas-user-tab-content d-flex justify-content-between">
                        <div v-if="listOrder.length === 0">{{ $t('Members_des_9') }}</div>
                        <div @click="() => this.isShowOrders = true" v-if="listOrder.length > 0" style="cursor: pointer;">
                            {{ $t('Members_des_2') }}</div>
                    </div>
                    <NuxtLink to="/">
                        <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                    </NuxtLink>
                </b-collapse>
            </div>
            <!-- <div class="nas-user-item-block">
                <b-button @click="setShow(3)" class="btn-nas-user-item d-flex w-100 align-items-center">
                    <span class="nas-user-text w-100 text-left">{{ $t('Members_title_3') }} </span>
                    <img class="user-icon-arrow" :src="tab3 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                </b-button>
                <b-collapse v-model="tab3">
                    <div class="nas-user-tab-content d-flex justify-content-between">
                        <div>{{ $t('Members_des_4') }}</div>
                    </div>
                    <NuxtLink to="/">
                        <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                    </NuxtLink>
                </b-collapse>
            </div> -->
            <div class="nas-user-item-block">
                <b-button @click="setShow(4)" class="btn-nas-user-item d-flex w-100 align-items-center">
                    <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_4') }}</span>
                    <img class="user-icon-arrow" :src="tab4 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                </b-button>
                <b-collapse v-model="tab4">
                    <div class="nas-user-tab-content d-flex justify-content-between">
                        <div v-if="address?.attributes">
                            <div>{{ address?.attributes?.name }}</div>
                            <div>{{ address?.attributes?.email }}</div>
                            <div>{{ address?.attributes?.phone }}</div>
                            <div>{{ address?.attributes?.full_address }}</div>
                        </div>
                        <div v-else>{{ $t('Members_des_5') }}</div>
                    </div>
                    <div class="nas-user-buy-again" v-if="address?.attributes" @click="onUpdateAddress()">{{
                        $t('Members_des_10') }}
                    </div>
                    <div class="nas-user-buy-again" v-else @click="onAddAddress()">{{ $t('Members_des_6') }}</div>
                </b-collapse>
            </div>
            <div class="nas-user-item-block">
                <b-button @click="setShow(5)" class="btn-nas-user-item d-flex w-100 align-items-center">
                    <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_5') }} </span>
                    <img class="user-icon-arrow" :src="tab5 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                </b-button>
                <b-collapse v-model="tab5">
                    <div class="nas-user-tab-content d-flex justify-content-between">
                        <!-- <div>{{ $t('Members_des_7') }}</div> -->
                        <div v-if="listProduct.length === 0">{{ $t('Members_des_7') }}</div>
                            <div @click="() => this.isShowProducts = true" v-if="listProduct.length > 0"
                                style="cursor: pointer;">{{ $t('Members_des_77') }}</div>
                    </div>
                    <NuxtLink to="/">
                        <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                    </NuxtLink>
                </b-collapse>
            </div>
            <div class="nas-user-item-block">
                <b-button @click="setShow(6)" class="btn-nas-user-item d-flex w-100 align-items-center">
                    <span class="nas-user-text w-100 text-left"> {{ $t('Members_title_6') }} </span>
                    <img class="user-icon-arrow" :src="tab6 ? '/images/xvalue1.png' : '/images/xvalue.png'"  />
                </b-button>
                <b-collapse v-model="tab6">
                    <div class="nas-user-tab-content d-flex justify-content-between">
                        <!-- <div>{{ $t('Members_des_8') }}</div> -->
                        <div v-if="listLike.length === 0">{{ $t('Members_des_8') }}</div>
                            <div @click="() => this.isShowLike = true" v-if="listLike.length > 0"
                                style="cursor: pointer;">{{ $t('Members_des_88') }}</div>
                    </div>
                    <NuxtLink to="/">
                        <div class="nas-user-buy-again">{{ $t('Members_des_3') }}</div>
                    </NuxtLink>
                </b-collapse>
            </div>
        </b-container>
        <AddressPopup v-if="show_address" :show.sync="show_address" :item="address" :type="type_address"
            :isMobile="isMobile" @closeUpdate="closePopup" />
        <ListOrderPopup :show="isShowOrders" :list_order="listOrder" :isMobile="isMobile" @onReload="() => this.onRefresh()"
            @closeUpdate="() => this.isShowOrders = false" />
        <ListProductPopup :show="isShowProducts" :list_product="listProduct" :isMobile="isMobile"
            @closeUpdate="() => this.isShowProducts = false" />
        <ListLike :show="isShowLike" :list_product="listLike" :isMobile="isMobile"
            @closeUpdate="() => this.isShowLike = false" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import AddressPopup from "~/components/address"
import ListOrderPopup from "~/components/user/listOrder.vue"
import ListProductPopup from "~/components/user/listProduct.vue"
import ListLike from "~/components/user/listProductLike.vue"
export default {
    name: 'IndexPage',
    components: {
        AddressPopup,
        ListOrderPopup,
        ListProductPopup,
        ListLike
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn",
            bannerInfo: "common/getBannerinfo",
            address: "auth/getAddress",
            listOrder: "order/getListOrder",
            listProduct: "product/getListProductView",
            listLike: "product/getListProductLike",
        }),
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
                    text: this.$t('Members'),
                    active: true
                }
            ],
            isMobile: false,
            show_address: false,
            type_address: 'create',
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: false,
            tab5: false,
            tab6: false,
            isShowOrders: false,
            isShowProducts: false,
            isShowLike: false
        }
    },
    watch: {
        '$route.hash': function (val) {
            if (val) {
                // this[val.replace('#','')] = true
                this.setShow(parseInt(val.replace('#', '').replace('tab', '')))
            }
        },
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: this.$t('Members'),
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        if (!this.loggedIn) {
            this.$router.push({ path: '/' })
        }
        this.isMobile = this.checkMobile()
        await this.getAddressByUser(this.profile.id)
        await this.getListOrder({
            filters: {
                user: { id: { $eq: this.profile.id } }
            }
        })
        if (this.$route.hash) {
            this.setShow(parseInt(this.$route.hash.replace('#', '').replace('tab', '')))
        }
        this.getListProvince({ pagination: { pageSize: 100 } })
        this.getListProductLike({ user_id: this.profile.id })
    },
    methods: {
        ...mapActions({
            setLoggedIn: "auth/setLoggedIn",
            logout: 'auth/logout',
            getAddressByUser: "auth/getAddressByUser",
            getListOrder: "order/getListOrder",
            getListProvince: 'user/getListProvince',
            getListProductLike: 'product/getListProductLike'
        }),
        async onRefresh() {
            await this.getListOrder({
                filters: {
                    user: { id: { $eq: this.profile.id } }
                }
            })
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
        onLogOut() {
            this.logout()
            this.$router.push({ path: '/' })
        },
        async closePopup() {
            await this.getAddressByUser(this.profile.id)
            this.show_address = false
        },
        onAddAddress() {
            this.show_address = true
            this.type_address = 'create'
        },
        onUpdateAddress() {
            this.show_address = true
            this.type_address = 'edit'
        },
        setShow(_num) {
            switch (_num) {
                case 1:
                    this.tab1 = !this.tab1
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 2:
                    this.tab1 = false
                    this.tab2 = !this.tab2
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 3:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = !this.tab3
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 4:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = !this.tab4
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 5:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = !this.tab5
                    this.tab6 = false
                    break;
                case 6:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = !this.tab6
                    break;
                default:
                    break;
            }
        },

    }
}
</script>
<style lang="scss">
.nas-user-content {
    margin-top: 180px;
}

.nas-user-right-content {
    width: 700px;
}

.nas-user-left-content {
    width: calc(100% - 750px);
    position: relative;
}

.nas-user-image {
    position: relative;
    right: 0px;
    top: 0px;
    float: right;
}

.nas-user-title {
    margin-top: 20px;
    color: #2F3036;
    font-size: 36px;
    margin-bottom: 30px;
}

.btn-nas-user-item {
    border-left: none;
    border-right: none;
    border-top: none;
    background-color: #fff;
    border-bottom: 1px solid #000;
    border-radius: 0px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 8px;

    &:focus {
        box-shadow: none !important;
        background-color: #fff;
    }

    &:hover {
        background-color: #fff;
    }
}

.nas-user-tab-content {
    background-color: hsla(0, 0%, 91%, 0.5);
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 5px 24px;
    color: #777;
    font-size: 16px;
}

.nas-user-buy-again {
    color: #777;
    font-size: 13px;
    font-family: 'inter';
    font-style: normal;
    font-weight: 400;
    text-decoration-line: underline;
    text-transform: uppercase;
    padding-left: 16px;
    cursor: pointer;
}

.nas-user-text {
    color: #2F3036;
}

.nas-user-item-text {
    color: #2F3036;
    font-size: 20px;
}

.user-icon-arrow {
    width: 25px;
}

@media (max-width: 520px) {
    .nas-user-content {
        margin-top: 0px;
    }

    .nas-user-title {
        color: #2F3036;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .nas-user-log-out {
        color: #2F3036;
        font-size: 11px;
        font-family: 'inter-light';
        text-decoration-line: underline;
        text-transform: uppercase;
        margin-top: 27px;
        cursor: pointer;
    }

    .nas-user-des {
        color: #2F3036;
        font-size: 10px;
        font-family: 'inter-light';
        border-top: 1px solid #2F3036;
        border-bottom: 1px solid #2F3036;
        padding-top: 24px;
        padding-bottom: 24px;
    }

    .nas-user-text {
        color: #2F3036;
        font-size: 13px;
    }

    .user-icon-arrow {
        width: 12px;
    }

    .nas-user-tab-content {
        color: #2F3036;
        font-family: 'inter-light';
        font-size: 13px;
    }

    .nas-user-buy-again {
        font-size: 12px;
    }

    .nas-user-item-block {
        &:last-child {
            margin-bottom: 60px;
        }
    }
}
</style>