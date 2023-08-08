<template>
    <a-upload name="file" :multiple="true" :show-upload-list="false" @change="handleChangeImage">
        <a-button type="primary" :loading="loading"> <a-icon type="upload" /> {{ text }} </a-button>
    </a-upload>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        text: {
            type: String,
            default: 'Click to Upload'
        },
        hadAddNewMedia: {
            type: Function,
            default: () => { }
        }
    },
    data() {
        return {
            loading: false,
            timeOut: null,
            listId: []
        };
    },
    methods: {
        ...mapActions({
            postbyUrl: "common/postbyUrl"
        }),
        async handleChangeImage(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                let res = await this.postbyUrl({ url: '/api/upload', file: info.file.originFileObj })
                if (res && res.length > 0) {
                    // this.thub = res[0].id

                    this.listId.push(res[0])
                    if (this.timeOut) {
                        clearTimeout(this.timeOut);
                        this.timeOut = null;
                    }
                    this.timeOut = setTimeout(() => {
                        this.$emit("hadAddNewMedia", this.listId);
                        this.listId = []
                        this.loading = false;
                    },1000)

                } else {
                    this.$message.error('Có lỗi trong quá trình upload! Xin thử lại sau!');
                }
            }
        }
    }
};
</script>
<style></style>