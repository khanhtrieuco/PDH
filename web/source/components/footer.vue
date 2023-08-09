<template>
  <div class="container-footer">
    <div class="container" v-if="!isMobile">
      <div class="row">
        <div class="col-3">
          <div class="footer-title mb-3">{{ $t('Footer_title_1') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_1') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_2') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_3') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_4') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_5') }}</div>
          <div class="footer-title mb-3 mt-5">{{ $t('Footer_title_2') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_6') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_7') }}</div>
          <div class="footer-text mb-2">{{ $t('Footer_text_8') }}</div>
        </div>
        <div class="col-3">
          <div class="footer-title mb-3">{{ $t('Footer_title_3') }}</div>
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
          <div class="footer-title mb-3">{{ $t('Footer_title_4') }}</div>
          <div class="footer-des mb-4 mt-1">{{ $t('Footer_text_22') }}</div>
          <div class="d-flex justify-content-between w-100">
            <span class="footer-text-span">{{ $t('Footer_text_18') }}</span>
            <span class="footer-text-span">{{ $t('Footer_text_19') }}</span>
          </div>
          <input class="footer-input" type="text">
          <div class="d-inline-flex justify-content-between">
            <label class="footer-check">
              <input type="checkbox">
              <span class="checkmark"></span>
              {{ $t('Footer_text_20') }}
            </label>
            <label class="footer-check">
              <input type="checkbox" checked="checked">
              <span class="checkmark"></span>
              {{ $t('Footer_text_21') }}
            </label>
          </div>
          <div class="footer-des my-4">{{ $t('Footer_text_22') }}</div>
          <div class="footer-btn-login">{{ $t('Footer_text_23') }}</div>
          <div class="d-inline-flex justify-content-between">
            <img class="footer-icon" src="/images/you.png" />
            <img class="footer-icon" src="/images/face.png" />
            <img class="footer-icon" src="/images/inta.png" />
          </div>
          <div class="footer-copy mt-5">© 2016 - 2022 PHANDANGHOANG - All rights reserved</div>
        </div>
      </div>
    </div>
    <div class="container" v-if="isMobile">
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
  background-color: #000;
  padding-top: 150px;
  padding-bottom: 220px;
  color: #fff;

  .footer-title {
    font-family: 'Aeroport';
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .footer-text {
    font-family: 'Aeroport-light';
    font-size: 16px;
    font-weight: 300;
    text-decoration-line: underline;
    cursor: pointer;
  }

  .footer-des {
    font-family: 'Aeroport-light';
    font-weight: 300;
    font-size: 15px;
  }

  .footer-text-span {
    font-family: 'Aeroport-light';
    font-size: 16px;
  }

  .footer-input {
    border: 1px solid #FFF;
    background: #000;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-family: 'Aeroport-light';
    color: #fff;
    margin-top: 10px;
    margin-bottom: 3rem;
  }

  .footer-check {
    display: block;
    position: relative;
    padding-left: 45px;
    margin-bottom: 12px;
    margin-right: 50px;
    line-height: 35px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: 'Aeroport-light';

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked~.checkmark {
        background-color: #000;
      }

      &:checked~.checkmark:after {
        display: block;
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 35px;
      width: 35px;
      background-color: #000;
      border: 1px solid #FFF;

      &:after {
        content: "";
        position: absolute;
        display: none;
      }

      &:after {
        left: 12px;
        top: 6px;
        width: 10px;
        height: 15px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    &:hover input~.checkmark {
      background-color: #3f3f3f;
    }
  }

  .footer-btn-login {
    margin-top: 50px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-family: 'Aeroport';
    color: #000;
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #FFF;
  }

  .footer-icon{
    cursor: pointer;
    margin-right: 40px;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .footer-copy {
    font-family: 'Aeroport-light';
    font-size: 16px;
    color: #7D7C7C;
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
