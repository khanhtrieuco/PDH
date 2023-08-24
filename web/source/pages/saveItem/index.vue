<template>
    <div class="save-item-content">
        <div class="save-item-title">Saved Items</div>
        <div class="save-item-des">You Have {{ listLike.length }} Items In Saved Items.</div>
        <div class="container save-item-products">
            <b-row v-if="listLike">
                <b-col class="mb-3" cols="6" lg="3" v-for="_pro, index in listLike" :key="index">
                    <ProductItem :item="_pro" :isMobile="isMobile" :height="isMobile ? '215px' : '330px'" />
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Color from "~/components/common/color.vue"
import ProductItem from "~/components/product/productItemLike.vue"
import general from "~/mixins/general"
import ColorMobile from "~/components/common/colorMobile.vue"

export default {
    name: 'IndexPage',
    components: {
        ProductItem,
        Color,
        ColorMobile
    },
    mixins: [general],
    data() {
        return {
            isMobile: false,
        }
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn",
            listLike: "product/getListProductLike",
        }),
    },
    async mounted() {
        if (!this.loggedIn) {
            this.$router.push({ path: '/dang-nhap' })
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isMobile = this.checkMobile()
        await this.getListProductLike({ user_id: this.profile.id })
    },
    methods: {
        ...mapActions({
            getListProductLike: 'product/getListProductLike'
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
        updateValue(_v) {
            let _t = this.quantity + _v
            if (_t >= 0) {
                this.quantity = _t
            }
        },
    }
}
</script>
<style lang="scss">
.save-item-content {
    padding-bottom: 100px;
    min-height: 700px;
    .save-item-title {
        color: #000;
        text-align: center;
        font-family: 'Aeroport';
        font-size: 35px;
        font-weight: 500;
        margin-top: 45px;
    }

    .save-item-des {
        color: #000;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 15px;
    }
    .save-item-products{
        margin-top: 80px;
    }
}

@media (max-width: 520px) {}
</style>