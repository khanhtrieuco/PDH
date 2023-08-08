<template>
    <div>
        <!-- <a-button type="primary" @click="onAddMedia(item.id)">Thêm ảnh</a-button> -->
        <upload-button @hadAddNewMedia="addMedia" text="Thêm ảnh" style="margin-left: 10px;"></upload-button>
        <a-list style="margin-top: 10px;" :grid="{ gutter: 16, xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }" :data-source="list_media">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card>
                    <a-button slot="extra" type="danger" @click="deleteMedia(item.id)">Xóa</a-button>
                    <ThumbImage ratio="21-9" :src="item?.attributes.url"></ThumbImage>
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>

export default {
    props: {
        list_media: {
            type: Array,
            default: []
        },
        onDeleteMedia: {
            type: Function,
            default: () => { }
        },
        onAddMedia: {
            type: Function,
            default: () => { }
        },
    },
    // mounted() {
    //     console.log(this.list_media)
    // },
    data() {
        return {
            listAddMedia: []
        };
    },
    methods: {
        addMedia(items) {
            this.$emit("onAddMedia", items);
        },
        deleteMedia(id) {
            this.$emit('onDeleteMedia', id)
        }
    }

};
</script>
<style></style>