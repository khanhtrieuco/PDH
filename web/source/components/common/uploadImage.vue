<template>
    <a-upload list-type="picture-card" class="avatar-uploader" :show-upload-list="false" 
        :before-upload="beforeUpload" action="/api/app/upload" @change="handleChangeImage">
        <ThumbImage ratio="16-9" v-if="imageUrl" :src="imageUrl"></ThumbImage>
        <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
                Upload
            </div>
        </div>
    </a-upload>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default {
    props: {
        thub: {
            type: Number,
            default: undefined
        },
        thubLink: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            loading: false,
            imageUrl: ''
        };
    },
    mounted() {
        if (this.thubLink) {
            this.imageUrl = this.thubLink;
        } else {
            this.imageUrl = ''
        }
    },
    watch: {
        thubLink: function (val) {
            if (val) {
                this.imageUrl = val;
            } else {
                this.imageUrl = ''
            }
        },
    },
    methods: {
        ...mapActions({
            postbyUrl: "common/postbyUrl"
        }),
        customRequest(){
            console.log('asadada')
        },
        async handleChangeImage(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, imageUrl => {
                    this.imageUrl = imageUrl;
                    this.loading = false;
                });
                let res = await this.postbyUrl({ url: '/api/upload', file: info.file.originFileObj })
                if (res && res.length > 0) {
                    // this.thub = res[0].id
                    this.$emit("update:thub", res[0].id);
                } else {
                    this.$message.error('Có lỗi trong quá trình upload! Xin thử lại sau!');
                }
            }
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        }
    }
};
</script>
<style></style>