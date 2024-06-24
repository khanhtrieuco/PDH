<template>
    <div class="collection-content">
        <div class="collection-banner">
            <img class="customer-image" ratio="21-9" v-if="!isMobile"
                :src="collection.attributes?.detail_thub?.data?.attributes.url" />
            <img class="customer-image" ratio="9-21" v-if="isMobile"
                :src="collection.attributes?.detail_thub_mobile?.data?.attributes.url" />
            <!-- <div class="container customer-des" v-if="isMobile">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
                suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
                vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
                accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcor
            </div> -->
        </div>
        <div class="container" v-if="!isMobile">
            <div class="photo-list">
                <div class="photo-img" v-for="imgData, index in imgDataArray" :key="index">
                    <img class="photo-img-detail" :src="imgData.src" :alt="imgData.title" />
                </div>
            </div>
        </div>
        <div class="" v-else>
            <div class="photo-list">
                <div class="photo-img" v-for="imgData, index in imgDataArray" :key="index">
                    <img class="photo-img-detail" :src="imgData.src" :alt="imgData.title" />
                </div>
            </div>
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
            await this.getCollectionBySlug(this.$route.params.id) //(this.$route.params.id)
        }
        // await this.loadProducts()
        if (this.collection.attributes) {
            this.collection.attributes.media?.data?.map(o => {
                this.imgDataArray.push({
                    src: o.attributes.url,  // for spotlight too
                    title: o.attributes.name,
                    size: {
                        width: o.attributes.width,
                        height: o.attributes.height,
                    }
                });
            })
        }
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

    .customer-image {
        width: 100%;
    }

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

    .collection-detail-image {
        position: absolute;
        top: 0;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        flex-grow: 1;
        object-fit: cover;
        vertical-align: bottom;
        // border-radius: 3px;
        // box-sizing: border-box;
        // box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
    }

    .photo-list {
        width: 100%;
        margin-top: 50px;

        .photo-img {
            width: calc(100% / 3);
            display: inline-block;
            padding: 8px;

            .photo-img-detail {
                width: 100%;
                min-width: 100%;
                max-width: 100%;
                height: 600px;
                object-fit: cover;
                vertical-align: bottom;
                // border-radius: 3px;
                // box-sizing: border-box;
                // box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
            }

            .photo-img-detail-half {
                width: calc(50% - 5px);
                min-width: calc(50% - 5px);
                max-width: calc(50% - 5px);
                height: 250px;
                object-fit: cover;
                vertical-align: bottom;
                // border-radius: 3px;
                // box-sizing: border-box;
                // box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
            }
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

@media (max-width: 520px) {
    .collection-content {
        .customer-des {
            font-size: 12px;
            padding: 20px 25px;
            font-family: 'Aeroport-light';
            text-align: center;
        }

        .photo-list {
            width: 100%;
            margin-top: 40px;
            margin-left: 2px;
            margin-right: 2px;
            .photo-img {
                width: calc(100% / 3 - 1px);
                display: inline-block;
                padding: 2px;

                .photo-img-detail {
                    width: 100%;
                    min-width: 100%;
                    max-width: 100%;
                    height: 270px;
                    object-fit: cover;
                    vertical-align: bottom;
                    // border-radius: 3px;
                    // box-sizing: border-box;
                    // box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
                }
            }

            .photo-img-half {
                width: calc(100% / 2);
                display: inline-block;
                padding: 3px;

                .photo-img-detail {
                    width: 100%;
                    min-width: 100%;
                    max-width: 100%;
                    height: 250px;
                    object-fit: cover;
                    vertical-align: bottom;
                    // border-radius: 3px;
                    // box-sizing: border-box;
                    // box-shadow: 1px 1px 2px 0px rgb(13 13 13 / 31%);
                }
            }
        }
    }
}
</style>