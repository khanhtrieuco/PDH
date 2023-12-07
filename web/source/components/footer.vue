<template>
  <div class="container-footer">
    <div class="container" v-if="!isMobile">
      <div class="row">
        <div class="col-3">
          <div class="footer-title">{{ $t('Footer_title_1') }}</div>
          <div class="footer-text">{{ $t('Footer_text_1') }}</div>
          <div class="footer-text">{{ $t('Footer_text_2') }}</div>
          <div class="footer-text">{{ $t('Footer_text_3') }}</div>
          <div class="footer-text">{{ $t('Footer_text_4') }}</div>
          <div class="footer-text footer-break">{{ $t('Footer_text_5') }}</div>
          <div class="footer-title">{{ $t('Footer_title_2') }}</div>
          <div class="footer-text">{{ $t('Footer_text_6') }}</div>
          <div class="footer-text">{{ $t('Footer_text_7') }}</div>
          <div class="footer-text">{{ $t('Footer_text_8') }}</div>
        </div>
        <div class="col-3">
          <div class="footer-title">{{ $t('Footer_title_3') }}</div>
          <div class="footer-text">{{ $t('Footer_text_9') }}</div>
          <div class="footer-text">{{ $t('Footer_text_10') }}</div>
          <div class="footer-text">{{ $t('Footer_text_11') }}</div>
          <div class="footer-text">{{ $t('Footer_text_12') }}</div>
          <div class="footer-text">{{ $t('Footer_text_13') }}</div>
          <div class="footer-text">{{ $t('Footer_text_14') }}</div>
          <div class="footer-text">{{ $t('Footer_text_15') }}</div>
          <div class="footer-text">{{ $t('Footer_text_16') }}</div>
        </div>
        <div class="col-6">
          <div class="footer-title">{{ $t('Footer_title_4') }}</div>
          <div class="footer-des mt-1">{{ $t('Footer_text_17') }}</div>
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
              <input type="checkbox">
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
          <div class="footer-copy">© 2016 - 2022 PHANDANGHOANG - All rights reserved</div>
        </div>
      </div>
      <img class="footer-logo" src="/images/footer.png" />
    </div>
    <div class="container" v-if="isMobile">
      <div class="row">
        <div class="col-12">
          <div class="footer-title">{{ $t('Footer_title_4') }}</div>
          <div class="footer-des mt-1">{{ $t('Footer_text_17') }}</div>
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
              <input type="checkbox">
              <span class="checkmark"></span>
              {{ $t('Footer_text_21') }}
            </label>
          </div>
          <div class="footer-des my-4">{{ $t('Footer_text_22') }}</div>
          <div class="footer-btn-login">{{ $t('Footer_text_23') }}</div>
        </div>
        <div class="col-12">
          <div class="footer-title">{{ $t('Footer_title_1') }}</div>
          <div class="footer-text">{{ $t('Footer_text_1') }}</div>
          <div class="footer-text">{{ $t('Footer_text_2') }}</div>
          <div class="footer-text">{{ $t('Footer_text_3') }}</div>
          <div class="footer-text">{{ $t('Footer_text_4') }}</div>
          <div class="footer-text footer-break">{{ $t('Footer_text_5') }}</div>
          <div class="footer-title">{{ $t('Footer_title_2') }}</div>
          <div class="footer-text">{{ $t('Footer_text_6') }}</div>
          <div class="footer-text">{{ $t('Footer_text_7') }}</div>
          <div class="footer-text footer-break">{{ $t('Footer_text_8') }}</div>
        </div>
        <div class="col-12">
          <div class="footer-title">{{ $t('Footer_title_3') }}</div>
          <div class="footer-text">{{ $t('Footer_text_9') }}</div>
          <div class="footer-text">{{ $t('Footer_text_10') }}</div>
          <div class="footer-text">{{ $t('Footer_text_11') }}</div>
          <div class="footer-text">{{ $t('Footer_text_12') }}</div>
          <div class="footer-text">{{ $t('Footer_text_13') }}</div>
          <div class="footer-text">{{ $t('Footer_text_14') }}</div>
          <div class="footer-text">{{ $t('Footer_text_15') }}</div>
          <div class="footer-text footer-break">{{ $t('Footer_text_16') }}</div>
        </div>
        <div class="col-12">
          <div class="d-inline-flex justify-content-between">
            <img class="footer-icon" src="/images/you.png" />
            <img class="footer-icon" src="/images/face.png" />
            <img class="footer-icon" src="/images/inta.png" />
          </div>
          <div class="footer-copy">© 2016 - 2022 PHANDANGHOANG - All rights reserved</div>
          <img class="footer-logo" src="/images/footer.png" />

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
  padding-bottom: 150px;
  color: #fff;

  .footer-title {
    font-family: 'Aeroport';
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  .footer-break{
    margin-bottom: 45px !important;
  }

  .footer-text {
    font-family: 'Aeroport-light';
    font-size: 16px;
    font-weight: 300;
    text-decoration-line: underline;
    cursor: pointer;
    margin-bottom: 15px;
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

  .footer-icon {
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

  .footer-logo {
    margin-top: 100px;
    max-width: 100%;
  }
}

@media (max-width: 520px) {
  .container-footer {
    background-color: #000;
    padding-top: 40px;
    padding-bottom: 60px;
    color: #fff;

    .footer-title {
      font-family: 'Aeroport';
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .footer-text {
      font-family: 'Aeroport-light';
      font-size: 10px;
      font-weight: 300;
      text-decoration-line: underline;
      cursor: pointer;
      margin-bottom: 3px;
    }

    .footer-break{
      margin-bottom: 20px;
    }

    .footer-des {
      font-family: 'Aeroport-light';
      font-weight: 300;
      font-size: 10px;
    }

    .footer-text-span {
      font-family: 'Aeroport-light';
      font-size: 10px;
    }

    .footer-input {
      border: 1px solid #FFF;
      background: #000;
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-family: 'Aeroport-light';
      color: #fff;
      margin-top: 10px;
      font-size: 10px;
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
      font-size: 10px;
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
        font-size: 10px;

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
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-family: 'Aeroport';
      color: #000;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      background-color: #FFF;
      margin-bottom: 40px;
    }

    .footer-icon {
      cursor: pointer;
      margin-left: 0px;
      margin-right: 15px;
      margin-bottom: 10px;
      margin-top: 10px;
      width: 15px;
    }

    .footer-copy {
      font-family: 'Aeroport-light';
      font-size: 10px;
      color: #7D7C7C;
      margin-top: 10px;
    }

    .footer-logo {
      margin-top: 40px;
      max-width: 100%;
    }
  }

}
</style>
