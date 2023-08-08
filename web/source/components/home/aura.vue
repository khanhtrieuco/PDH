<template>
  <div class="container home-aura-container" v-if="isMobile">
    <h4 class="aura-h">Aura Club</h4>
    <VueSlickCarousel v-if="listClubMobile && listClubMobile.length > 0" :arrows="false" :slidesToShow="2"
      v-bind="settings" class="list-inno pt-3">
      <div v-for="(item, index) in listClubMobile" :key="index" class="inno-slider-item">
        <AuraItem v-if="item[0]" :item="item[0]" :isMobile="isMobile" />
        <AuraItem v-if="item[1]" :item="item[1]" :isMobile="isMobile" />
      </div>
      <template slot="prevArrow">
        <div class="pre-arrow-aura">
          <img src="/images/left.png"></img>
        </div>
      </template>
      <template slot="nextArrow">
        <div class="next-arrow-aura">
          <img src="/images/right.png"></img>
        </div>
      </template>
    </VueSlickCarousel>
  </div>
  <div class="container py-7" v-else>
    <h4 class="aura-h">Aura Club</h4>
    <VueSlickCarousel v-if="listClub.items && listClub.items.length > 0" :arrows="true" :slidesToShow="3" v-bind="settings"
      class="list-inno pt-6">
      <div v-for="(item, index) in listClub.items" :key="index" class="inno-slider-item">
        <AuraItem :item="item" />
      </div>
      <template slot="prevArrow">
        <div class="pre-arrow-aura">
          <img src="/images/left.png"></img>
        </div>
      </template>
      <template slot="nextArrow">
        <div class="next-arrow-aura">
          <img src="/images/right.png"></img>
        </div>
      </template>
    </VueSlickCarousel>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import AuraItem from "~/components/homeitem/auraItem.vue"

export default {
  components: {
    AuraItem
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      listClub: "club/getListClub",
    }),
  },
  data() {
    return {
      settings: {
        "dots": true,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToScroll": 1
      },
      listClubMobile: []
    }
  },
  async mounted() {
    await this.getListClub({
      pagination: {
        page: 1,
        pageSize: 8
      }
    })
    if (this.isMobile && this.listClub.items.length > 0) {
      let temp = []
      for (let i = 0; i < this.listClub.items.length; i++) {
        temp.push(this.listClub.items[i])
        if ((i > 0 && i % 2 !== 0) || i === this.listClub.items.length - 1) {
          this.listClubMobile.push(temp)
          temp = []
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getListClub: "club/getListClub"
    }),
  }
}
</script>
<style lang="scss">
.next-arrow-aura {
  margin-right: -35px;
}

.pre-arrow-aura {
  margin-left: -35px;
}

.aura-h {
  text-align: center;
  font-size: 36px;
}

@media (max-width: 520px) {
  .home-aura-container {
    margin-top: 40px;
    padding-top: 40px;
  }

  .aura-h {
    text-align: center;
    font-size: 24px;
  }
}</style>
