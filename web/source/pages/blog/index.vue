<template>
    <div class="blog-content">
        <b-container>
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="empty">Trang đang phát triển</div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
    name: 'IndexPage',
    components: {
        // Item
    },
    mixins: [general],
    data() {
        return {
            breadcrumb: [
                {
                    text: 'Trang chủ',
                    href: '/'
                },
                {
                    text: 'Blog',
                    active: true
                }
            ],
            isMobile: false
        }
    },
}
</script>
<style lang="scss">
.blog-content{
    margin-top: 180px;
}
.empty{
    margin-top: 250px;
    margin-bottom: 350px;
    font-size: 34px;
    text-align: center;
}
</style>