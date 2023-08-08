<template>
    <div class="help-panel">
      <div class="help-panel-1">
        <div class="help-panel-title">{{ $t('Payment_help_1') }}</div>
        <NuxtLink to="/cham-soc-khach-hang">
          <div class="help-panel-des">{{ $t('Payment_help_2') }}</div>
        </NuxtLink>
        <div class="help-panel-des">1800 5454 63</div>
        <div class="help-panel-des">Email Nas</div>
      </div>
      <div class="help-panel-2">
        <div class="help-panel-des">{{ $t('Payment_help_3') }}</div>
        <div class="help-panel-des">{{ $t('Payment_help_4') }}</div>
        <div class="help-panel-des">{{ $t('Payment_help_5') }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import general from "~/mixins/general"
  export default {
    mixins: [general],
    props: {
      isMobile: {
        type: Boolean,
        default: false,
      },
    }
  }
  </script>
  <style lang="scss">
  .help-panel-1{
    background: #F5F5F5;
    padding-top: 40px;
    padding-bottom: 40px;
    .help-panel-title{
        color: #2F3036;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 28px;
    }
    .help-panel-des{
        font-family: 'inter';
        color: #2F3036;
        font-size: 13px;
        text-align: center;
        text-decoration-line: underline;
        line-height: 20px;
        cursor: pointer;
    }
  }
  .help-panel-2{
    background: #FFF;
    padding-top: 40px;
    padding-bottom: 40px;
    .help-panel-des{
        font-family: 'inter';
        color: #2F3036;
        font-size: 13px;
        text-align: center;
        text-decoration-line: underline;
        line-height: 20px;
        cursor: pointer;
    }
  }
  @media (max-width: 520px) {
    .aura-title{
      font-weight: 700;
      font-size: 13px;
      line-height: 15px;
      color: #2F3036;
      text-align: left;
    }
  }
  </style>