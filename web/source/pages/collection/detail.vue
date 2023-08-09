<template>
    <div class="collection-content">
        <div class="collection-banner">
            <ThumbImage class="customer-image" ratio="21-9" :src="collection.attributes?.detail_thub?.data?.attributes.url">
            </ThumbImage>
        </div>
        <div class="container">
            <div class="photo-wrap">
                <div class="photo" v-for="imgData, index in imgDataArray" :key="index"
                    :style="{ 'width': imgData.size.width * 800 / imgData.size.height + 'px', 'flex-grow': imgData.size.width * 800 / imgData.size.height }">
                    <i :style="{ 'padding-bottom': imgData.size.height / imgData.size.width * 100 + '%' }"></i>
                    <img :src="imgData.src" :alt="imgData.title" @load="loaded(index)" crossorigin="Anonymous" />
                </div>
            </div>
            <div class="btn-collection-top">SHOP NOW</div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    mixins: [general],
    data() {
        return {
            isMobile: false,
            imgDataArray: [],
            isLoadedImages: []
        }
    },
    computed: {
        ...mapGetters({
            collection: "collection/getCollection"
        }),
    },
    async mounted() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        if (this.$route.params.id) {
            await this.getCollectionBySlug('women-aw') //(this.$route.params.id)
        }
        // await this.loadProducts()
        this.collection.attributes.media.data.map(o => {
            this.imgDataArray.push({
                src: o.attributes.url,  // for spotlight too
                title: o.attributes.name,
                size: {
                    width: o.attributes.width,
                    height: o.attributes.height,
                }
            });
        })
    },
    methods: {
        ...mapActions({
            getCollectionBySlug: "collection/getCollectionBySlug"
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
        loaded(index) {
            const removeDuplicateValues = ([...array]) => {
                return array.filter((value, index, self) => self.indexOf(value) === index);
            }
            removeDuplicateValues(this.isLoadedImages);
            this.isLoadedImages = this.isLoadedImages.concat([index]);
        }
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

    .photo-wrap {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .photo {
        position: relative;
        flex-grow: 1;
        margin: 8px;
        cursor: pointer;
    }

    i {
        display: block;
    }

    img {
        position: absolute;
        top: 0;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        flex-grow: 1;
        object-fit: cover;
        vertical-align: bottom;
        border-radius: 3px;
        box-sizing: border-box;
        box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
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