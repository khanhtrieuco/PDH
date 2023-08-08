<template>
  <div class="container-footer">
    <div class="container pt-5 pb-3" v-if="isMobile">
      <div class="mb-3">
        <h5 class="footer-title mb-4">{{ $t('Footer_title_1') }}</h5>
        <div class="row">
          <div class="col-6">
            <div class="footer-text mb-2">{{ $t('Footer_des_4') }}</div>
            <div class="footer-text mb-2">{{ $t('Footer_des_5') }}</div>
            <div class="footer-text mb-2">{{ $t('Footer_des_6') }}</div>
          </div>
          <div class="col-6">
            <div class="footer-text mb-2">{{ $t('Footer_des_7') }}</div>
            <div class="footer-text mb-2">{{ $t('Footer_des_8') }}</div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h5 class="footer-title mb-4">{{ $t('Footer_title_3') }}</h5>
        <div class="row">
          <div class="col-6">
            <a :href="siteInfo.link_lazada" target="_blank">
              <div class="footer-text mb-2">Lazada</div>
            </a>
            <a :href="siteInfo.link_tiktok" target="_blank">
              <div class="footer-text mb-2">Tiktok Shop</div>
            </a>
          </div>
          <div class="col-6">
            <a :href="siteInfo.link_tiki" target="_blank">
              <div class="footer-text mb-2">Tiki</div>
            </a>
            <a :href="siteInfo.link_shopee" target="_blank">
              <div class="footer-text mb-2">Shopee</div>
            </a>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <NuxtLink to="/kinh-doanh-cung-nas">
          <h5 class="footer-title mb-4">{{ $t('Footer_title_2') }}</h5>
        </NuxtLink>
      </div>
      <div class="mb-3">
        <h5 class="footer-title mb-4">Nas Beauty and Health care</h5>
        <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_0') }}</b> | 
          {{ $i18n.locale === 'vn' ? nasInfo.msdn : nasInfo.msdn_en }} </div>
        <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_1') }}</b> | 
          {{ $i18n.locale === 'vn' ? nasInfo.address : nasInfo.address_en }} </div>
        <!-- <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_2') }}</b> | {{ $t('Footer_des_2') }}</div> -->
        <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_3') }}</b> | 
          {{ $i18n.locale === 'vn' ? nasInfo.company : nasInfo.company_en }}</div>
        <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_4') }}</b> | {{ nasInfo.phone }}</div>
        <div class="footer-text mb-2"><b>Email</b> | {{ nasInfo.email }}</div>
      </div>
      <div class="footer-image d-flex flex-column align-items-end">
        <b-img class="w-100" src="/images/mfooter.png" fluid alt="image"></b-img>
        <div class="footer-content">
          <div class="footer-follow">{{ $t('Footer_title_4') }}</div>
          <div class="d-flex">
            <a :href="siteInfo.link_tiktok" target="_blank">
              <img class="footer-icon" src="/images/tiktok.png" />
            </a>
            <a :href="siteInfo.link_facebook" target="_blank">
              <img class="footer-icon" src="/images/facebook.png" />
            </a>
            <a :href="siteInfo.link_instagram" target="_blank">
              <img class="footer-icon" src="/images/instaram.png" />
            </a>
            <a :href="siteInfo.link_youtube" target="_blank">
              <img class="footer-icon" src="/images/youtube.png" />
            </a>
            <a :href="siteInfo.link_tiki" target="_blank">
              <img class="footer-icon" src="/images/tiki.png" />
            </a>
            <a :href="siteInfo.link_shopee" target="_blank">
              <img class="footer-icon" src="/images/shopee.png" />
            </a>
            <a :href="siteInfo.link_lazada" target="_blank">
              <img class="footer-icon" src="/images/lazada.png" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-copy mt-5">© 2023 NAS BEAUTY AND HEALTH CARE</div>
    </div>
    <div class="container py-7" v-if="!isMobile">
      <div class="row justify-content-between">
        <div class="col-3">
          <h5 class="footer-title mb-3">Nas Beauty and Health care</h5>
          <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_0') }}</b> |
            {{ $i18n.locale === 'vn' ? nasInfo.msdn : nasInfo.msdn_en }} </div>
          <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_1') }}</b> |
            {{ $i18n.locale === 'vn' ? nasInfo.address : nasInfo.address_en }} </div>
          <!-- <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_2') }}</b> | {{ $t('Footer_des_2') }}</div> -->
          <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_3') }}</b> |
            {{ $i18n.locale === 'vn' ? nasInfo.company : nasInfo.company_en }} </div>
          <div class="footer-text mb-2"><b>{{ $t('Footer_des_main_4') }}</b> | {{ nasInfo.phone }}</div>
          <div class="footer-text mb-2"><b>Email</b> | {{ nasInfo.email }}</div>
        </div>
        <div class="col-2">
          <h5 class="footer-title mb-3">{{ $t('Footer_title_1') }}</h5>
          <div class="footer-text mb-2">{{ $t('Footer_des_4') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_des_5') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_des_6') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_des_7') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_des_8') }}</div>
          <NuxtLink to="/kinh-doanh-cung-nas">
            <h5 class="footer-title mt-4">{{ $t('Footer_title_2') }}</h5>
          </NuxtLink>
        </div>
        <div class="col-2 pr-4">
          <h5 class="footer-title mb-3">{{ $t('Footer_title_3') }}</h5>
          <a :href="siteInfo.link_lazada" target="_blank">
            <div class="footer-text mb-2">Lazada</div>
          </a>
          <a :href="siteInfo.link_tiktok" target="_blank">
            <div class="footer-text mb-2">Tiktok Shop</div>
          </a>
          <a :href="siteInfo.link_tiki" target="_blank">
            <div class="footer-text mb-2">Tiki</div>
          </a>
          <a :href="siteInfo.link_shopee" target="_blank">
            <div class="footer-text mb-2">Shopee</div>
          </a>
        </div>
        <div class="col-5 d-flex flex-column align-items-end">
          <b-img class="w-100" src="/images/footer.jpg" fluid alt="image"></b-img>
          <div class="footer-content">
            <div class="footer-follow">{{ $t('Footer_title_4') }}</div>
            <div class="d-flex">
              <a :href="siteInfo.link_tiktok" target="_blank">
                <img class="footer-icon" src="/images/tiktok.png" />
              </a>
              <a :href="siteInfo.link_facebook" target="_blank">
                <img class="footer-icon" src="/images/facebook.png" />
              </a>
              <a :href="siteInfo.link_instagram" target="_blank">
                <img class="footer-icon" src="/images/instaram.png" />
              </a>
              <a :href="siteInfo.link_youtube" target="_blank">
                <img class="footer-icon" src="/images/youtube.png" />
              </a>
              <a :href="siteInfo.link_tiki" target="_blank">
                <img class="footer-icon" src="/images/tiki.png" />
              </a>
              <a :href="siteInfo.link_shopee" target="_blank">
                <img class="footer-icon" src="/images/shopee.png" />
              </a>
              <a :href="siteInfo.link_lazada" target="_blank">
                <img class="footer-icon" src="/images/lazada.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-copy">© 2023 NAS BEAUTY AND HEALTH CARE</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    ...mapGetters({
      siteInfo: "common/getSiteinfo",
      nasInfo: "common/getNasinfo",
    }),
  },
  mounted() {
    this.isMobile = this.checkMobile()
  },
  methods: {
    checkMobile() {
      if (!process.server) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.container-footer {
  background-color: #FCF6F0;
}

.footer-title {
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
}

.footer-text {
  font-family: 'inter';
  font-size: 10px;

  b {
    text-transform: uppercase;
  }

  text-transform: capitalize;
  cursor: pointer;
}

.footer-copy {
  letter-spacing: 0.15rem;
  font-size: 10px;
  text-transform: capitalize;
  margin-top: 36px;
}

.footer-content {
  position: absolute;
  top: calc(50% - 10px);
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .footer-follow {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    color: #FFFFFF;
    margin-bottom: 8px;
  }

  .footer-icon {
    margin: 8px;
    cursor: pointer;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .footer-content {
    top: calc(38% - 10px);

    .footer-follow {
      font-size: 16px;
    }

    .footer-icon {
      margin: 4px;
      width: 30px;
    }
  }
}

@media (max-width: 520px) {
  .footer-image {
    position: relative;
  }

  .footer-content {
    top: 80px;

    .footer-follow {
      font-size: 16px;
      line-height: 16px;
    }

    .footer-icon {
      margin: 4px;
      cursor: pointer;
      width: 25px;
    }
  }

  .footer-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    color: #484848;
  }

  .footer-text {
    font-weight: 400;
    font-size: 11px;
    line-height: 20px;
    text-transform: capitalize;
    color: #515151;

    b {
      text-transform: uppercase;
    }
  }
}
</style>
