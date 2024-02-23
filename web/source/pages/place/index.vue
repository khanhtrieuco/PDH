<template>
    <div class="place-content">
        <b-container v-if="!isMobile">
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="place-image">
            <ThumbImage ratio="21-9" :src="bannerInfo.customer_care?.data.attributes.url ?? '/images/place.jpg'" src="/images/place.jpg" v-if="!isMobile"></ThumbImage>
            <ThumbImage ratio="4-3" :src="bannerInfo.customer_care_mobile?.data.attributes.url ?? '/images/place_mobile.jpg'" v-if="isMobile"></ThumbImage>
        </div>
        <b-container>
            <div class="place-info">
                <h2 class="place-info-title">{{ $t('Place_title_1') }}</h2>
                <div class="place-info-text"><b>{{ $t('Place_des_1') }}</b> {{ nasInfo.working_time }}</div>
                <div class="place-info-text"><b>{{ $t('Place_des_2') }}</b> 
                    {{ $i18n.locale === 'vn' ? nasInfo.address : nasInfo.address_en }}</div>
                <div class="place-info-text"><b>{{ $t('Place_des_3') }}</b> {{ nasInfo.phone }} </div>
                <div class="place-info-text"><b>Email</b>{{ nasInfo.email }}</div>
            </div>
            <div class="place-info-location">{{ $t('Place_title_2') }}</div>
        </b-container>
        <div class="d-flex" style="margin-top: 30px;margin-bottom: 100px;" v-if="!isMobile">
            <div class="place-list">
                <div class="d-flex place-control">
                    <img class="place-icon" src="/images/Search2.png" />
                    <input class="place-input" v-model="search" :placeholder="this.$t('Place_search_text')" />
                    <img class="place-icon" src="/images/place.png" />
                </div>
                <div class="place-item" v-for="(_place, idx) in listData" :key="idx" @click="viewMap(_place)">
                    <a :href="_place.attributes.link" target="_blank">
                        <img class="place-marker" src="/images/marker.png" />
                    </a>
                    <div class="place-name">
                        {{ $i18n.locale === 'vn' ? _place.attributes.name : _place.attributes.name_en }}
                    </div>
                    <div class="place-address">
                        {{ $i18n.locale === 'vn' ? _place.attributes.address : _place.attributes.address_en }}
                    </div>
                    <div class="place-line"></div>
                </div>
            </div>
            <div class="place-image-map">
                <img class="place-map" :src="current_image" />
            </div>
        </div>
        <div v-if="isMobile">
            <div class="place-image-map">
                <img class="place-map" :src="current_image" />
            </div>
            <div class="place-list">
                <div class="d-flex place-control">
                    <img class="place-icon" src="/images/Search2.png" />
                    <input class="place-input" v-model="search" :placeholder="this.$t('Place_search_text')" />
                    <img class="place-icon" src="/images/place.png" />
                </div>
                <div class="place-item" v-for="(_place, idx) in listData" :key="idx" @click="viewMap(_place)">
                    <a :href="_place.attributes.link" target="_blank">
                        <img class="place-marker" src="/images/marker.png" />
                    </a>
                    <div class="place-name">
                        {{ $i18n.locale === 'vn' ? _place.attributes.name : _place.attributes.name_en }}
                    </div>
                    <div class="place-address"> {{ $i18n.locale === 'vn' ? _place.attributes.address :
                        _place.attributes.address_en }}
                    </div>
                    <div class="place-line"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    name: 'PlacePage',
    computed: {
        ...mapGetters({
            listPlace: "place/getListPlace",
            nasInfo: "common/getNasinfo",
            bannerInfo: "common/getBannerinfo",
        }),
    },
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: this.$t('Place'),
                    active: true
                }
            ],
            listData: [],
            current_image: '/images/fff.jpg',
            search: null,
            isMobile: false
        }
    },
    watch: {
        search: function (val) {
            if (val) {
                this.listData = this.listPlace.filter(f => f.attributes.name.toLowerCase().includes(val.toLowerCase())
                    || val.toLowerCase().includes(f.attributes.name.toLowerCase()))
            } else {
                this.listData = this.listPlace
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
                        text: this.$t('Place'),
                        active: true
                    }
                ]
            }
        },
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.getListPlace()
        if (this.listPlace.length > 0) {
            this.listData = this.listPlace
            this.viewMap(this.listPlace[0])
        }
    },
    methods: {
        ...mapActions({
            getListPlace: "place/getListPlace"
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
        viewMap(place) {
            if (place && place.attributes && place.attributes.map && place.attributes.map.data) {
                this.current_image = place.attributes.map.data.attributes.url
            }
        }
    }
    // methods: {
    //   ...mapActions({
    //     getListWork: "work/getListWork"
    //   }),
    //   async loadData() {
    //     await this.getListWork()
    //   }
    // }
}
</script>
<style lang="scss">
.place-content {
    margin-top: 180px;
}

.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.place-info {
    text-align: center;
}

.place-info-title {
    margin-top: 40px;
    color: #515151;
    text-align: center;
    font-size: 36px;
}

.place-info-text {
    color: #777;
    text-align: center;
    font-size: 13px;
    font-family: 'inter-light';

    b {
        font-family: 'inter';
        font-weight: 600;
    }
}

.place-info-location {
    margin-top: 60px;
    color: #515151;
    text-align: center;
    font-size: 36px;
}

.place-list {
    width: 530px;
    max-height: 600px;
    overflow-y: scroll;

    .place-control {
        width: 500px;
        border-top: solid 1px #B9B9B9;
        border-bottom: solid 1px #B9B9B9;
        padding: 20px 30px;

        .place-input {
            border: none;
            margin: 0px 5px;
            font-size: 13px;
            font-family: 'inter-light';
            color: #515151;
            width: calc(100% - 30px);

            &:focus-visible {
                outline: none;
            }
        }
    }

    .place-item {
        width: 500px;
        border-bottom: solid 1px #B9B9B9;
        padding: 35px 30px 35px 80px;
        background-color: #FBFAFA;
        margin: 10px 0px;
        position: relative;
        cursor: pointer;

        .place-marker {
            position: absolute;
            left: 30px;
        }

        .place-name {
            color: #2F3036;
            font-size: 16px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        .place-address {
            font-size: 13px;
            font-family: 'inter-light';
            color: #515151;
        }

        .place-line {
            position: absolute;
            background-color: #fff;
            left: 0px;
            bottom: 0px;
            width: 100%;
            height: 10px;
        }
    }
}

.place-image-map {
    width: calc(100% - 500px);
    max-height: 600px;

    .place-map {
        height: 600px;
        width: 100%;
        object-fit: cover;
    }
}

@media (max-width: 520px) {
    .place-content {
        margin-top: 0px;
    }

    .place-info-title {
        color: #515151;
        text-align: center;
        font-size: 20px;
    }

    .place-info-text {
        color: #777;
        text-align: center;
        font-size: 11px;
        font-family: 'inter-light';

        b {
            font-family: 'inter';
            font-weight: 600;
        }
    }

    .place-info-location {
        color: #515151;
        text-align: center;
        font-size: 20px;
    }

    .place-map {
        margin-bottom: 0px;
    }

    .place-search-block {
        border-top: 1px solid #D9D9D9;
        border-bottom: 1px solid #D9D9D9;
        padding-bottom: 12px;
        padding-top: 12px;
    }

    .place-icon {
        width: 25px;
    }

    .place-search-text {
        width: calc(100% - 50px);
        color: #515151;
        font-size: 13px;
        padding-left: 10px;
        font-family: 'inter-light';
    }

    .list-place-item {
        background: #FBFAFA;
        padding-top: 22px;
        padding-bottom: 22px;
        border-bottom: 1px solid #D9D9D9;
    }

    .list-place-item-title {
        color: #2F3036;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .list-place-item-description {
        color: #515151;
        font-size: 11px;
        font-family: 'inter-light';
        font-weight: 600;
    }

    .place-list {
        width: 100%;

        .place-control {
            width: 100%;
            border-top: solid 1px #B9B9B9;
            border-bottom: solid 1px #B9B9B9;
            padding: 20px 15px;

            .place-input {
                border: none;
                margin: 0px 5px;
                font-size: 13px;
                font-family: 'inter-light';
                color: #515151;
                width: calc(100% - 30px);

                &:focus-visible {
                    outline: none;
                }
            }
        }

        .place-item {
            width: 100%;
            padding: 22px 15px 22px 60px;
            background-color: #FBFAFA;
            margin: 10px 0px;
            position: relative;

            .place-marker {
                position: absolute;
                left: 15px;
                top: 18px;
            }

            .place-name {
                color: #2F3036;
                font-size: 14px;
                text-transform: uppercase;
                margin-bottom: 5px;
            }

            .place-address {
                font-size: 9px;
                font-family: 'inter-light';
                color: #515151;
            }

            .place-line {
                position: absolute;
                background-color: #fff;
                left: 0px;
                bottom: 0px;
                width: 100%;
                height: 10px;
            }
        }
    }

    .place-image-map {
        margin-top: 30px;
        width: calc(100%);
        max-height: 280px;

        .place-map {
            height: 280px;
            width: 100%;
            object-fit: cover;
        }
    }
}
</style>