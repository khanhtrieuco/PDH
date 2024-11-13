<template>
    <div id="photos-wrap">
        <transition name="fade">
            <div class="photo-wrap">
                <div class="photo" v-for="imgData, index in imgDataArray" :key="index"
                    :style="{ 'width': imgData.size.width * 400 / imgData.size.height + 'px', 'flex-grow': imgData.size.width * 400 / imgData.size.height }">
                    <i :style="{ 'padding-bottom': imgData.size.height / imgData.size.width * 100 + '%' }"></i>
                    <img :src="imgData.src" :alt="imgData.title" @load="loaded(index)" crossorigin="Anonymous" />
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
export default {
    props: {
        listMedia: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            imgDataArray: [],
            isLoadedImages: []
        };
    },
    watch: {
        listMedia: function (val) {
            if (val) {
                val.map(o => {
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
    },
    methods: {
        loaded(index) {
            const removeDuplicateValues = ([...array]) => {
                return array.filter((value, index, self) => self.indexOf(value) === index);
            }
            removeDuplicateValues(this.isLoadedImages);
            this.isLoadedImages = this.isLoadedImages.concat([index]);
        }
    }

};

</script>
  
<style lang="scss" scoped>
.photo-wrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
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
</style>
  