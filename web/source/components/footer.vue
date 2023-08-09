<template>
  <div class="container-footer">
    <div class="container py-5" v-if="!isMobile">
      <div class="row">
        <div class="col-3">
          <div class="footer-text mb-2">{{ $t('Footer_title_1') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_1') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_2') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_3') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_4') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_5') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_title_2') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_6') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_7') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_8') }}</div>
        </div>
        <div class="col-3">
          <div class="footer-text mb-2">{{ $t('Footer_title_3') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_9') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_10') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_11') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_12') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_13') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_14') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_15') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_16') }}</div>
        </div>
        <div class="col-6">
          <div class="footer-text mb-2">{{ $t('Footer_title_4') }}</div>
          <div>{{ $t('Footer_text_22') }}</div>
          <div>
            <span>{{ $t('Footer_text_18') }}</span>
            <span>{{ $t('Footer_text_19') }}</span>
          </div>
          <input type="text">
          <div>
            <label class="container">{{ $t('Footer_text_20') }}
              <input type="checkbox" checked="checked">
              <span class="checkmark"></span>
            </label>
            <label class="container">{{ $t('Footer_text_21') }}
              <input type="checkbox" checked="checked">
              <span class="checkmark"></span>
            </label>
          </div>
          <div>{{ $t('Footer_text_22') }}</div>
          <div>{{ $t('Footer_text_23') }}</div>
          <div class="footer-copy mt-5">© 2016 - 2022 PHANDANGHOANG - All rights reserved</div>
        </div>
      </div>
    </div>
    <div class="container pt-5 pb-5" v-if="isMobile">
      <div class="row">
        <div class="col-3">
          <div class="footer-text mb-2">{{ $t('Footer_title_1') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_1') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_2') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_3') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_4') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_5') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_title_2') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_6') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_7') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_8') }}</div>
        </div>
        <div class="col-3">
          <div class="footer-text mb-2">{{ $t('Footer_title_3') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_9') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_10') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_11') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_12') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_13') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_14') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_15') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_16') }}</div>
        </div>
        <div class="col-6">
          <div class="footer-text mb-2">{{ $t('Footer_title_4') }}</div>
          <div>{{ $t('Footer_text_22') }}</div>
          <div>
            <span>{{ $t('Footer_text_18') }}</span>
            <span>{{ $t('Footer_text_19') }}</span>
          </div>
          <input type="text">
          <div>
            <label class="container">{{ $t('Footer_text_20') }}
              <input type="checkbox" checked="checked">
              <span class="checkmark"></span>
            </label>
            <label class="container">{{ $t('Footer_text_21') }}
              <input type="checkbox" checked="checked">
              <span class="checkmark"></span>
            </label>
          </div>
          <div>{{ $t('Footer_text_22') }}</div>
          <div>{{ $t('Footer_text_23') }}</div>
          <div class="footer-copy mt-5">© 2016 - 2022 PHANDANGHOANG - All rights reserved</div>
        </div>
      </div>

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
      siteInfo: "common/getSiteinfo"
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
