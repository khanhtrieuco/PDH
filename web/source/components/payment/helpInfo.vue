<template>
  <div class="help-panel">
    <div class="container d-flex" v-if="!isMobile">
      <div class="help-card">
        <div class="help-card-title">EASY RETURNS</div>
        <div class="help-card-des">We provide free pick up for your returns: you have 30 days from delivery to follow our
          quick and easy return procedure*. Alternatively, orders can be returned in one of our stores.
          *Exceptions apply.</div>
      </div>
      <div class="help-card">
        <div class="help-card-title">MAY WE HELP?</div>
        <div class="help-card-des">By contacting Client Service, you agree that your data will be transferred outside your
          country.</div>
        <div class="help-card-des">Call us: +84 764 976 754</div>
      </div>
      <div class="help-card">
        <div class="help-card-title">EASY RETURNS</div>
        <div class="help-card-des">We provide free pick up for your returns: you have 30 days from delivery to follow our
          quick and easy return procedure*. Alternatively, orders can be returned in one of our stores.
          *Exceptions apply.</div>
      </div>
    </div>
    <div class="container" v-if="isMobile">
      <div class="help-card">
        <div class="help-card-title">EASY RETURNS</div>
        <div class="help-card-des">We provide free pick up for your returns: you have 30 days from delivery to follow our
          quick and easy return procedure*. Alternatively, orders can be returned in one of our stores.
          *Exceptions apply.</div>
      </div>
      <div class="help-card">
        <div class="help-card-title">MAY WE HELP?</div>
        <div class="help-card-des">By contacting Client Service, you agree that your data will be transferred outside your
          country.</div>
        <div class="help-card-des">Call us: +84 764 976 754</div>
      </div>
      <div class="help-card">
        <div class="help-card-title">EASY RETURNS</div>
        <div class="help-card-des">We provide free pick up for your returns: you have 30 days from delivery to follow our
          quick and easy return procedure*. Alternatively, orders can be returned in one of our stores.
          *Exceptions apply.</div>
      </div>
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
.help-panel {
  background: #F5F5F5;
  padding: 100px 0px;

  .help-card {
    width: calc((100% / 3) - 6px);
    padding: 0px 15px;
    position: relative;

    .help-card-title {
      color: #717171;
      text-align: center;
      font-family: 'Aeroport';
      font-size: 20px;
      margin-bottom: 24px;
    }

    .help-card-des {
      color: #717171;
      text-align: center;
      font-family: 'Aeroport-light';
      font-size: 13px;
      margin-bottom: 10px;
    }

    &:after {
      content: "";
      height: 80%;
      width: 2px;
      display: block;
      border-right: 1px solid #000;
      position: absolute;
      right: 0px;
      top: 15%;
    }

    &:last-child:after {
      display: none;
    }
  }
}

@media (max-width: 520px) {
  .help-panel {
    background: #F5F5F5;
    padding: 20px 0px;

    .help-card {
      width: 100%;
      padding: 15px 15px;
      position: relative;

      .help-card-title {
        color: #717171;
        text-align: center;
        font-family: 'Aeroport';
        font-size: 12px;
        margin-bottom: 15px;
      }

      .help-card-des {
        color: #717171;
        text-align: center;
        font-family: 'Aeroport-light';
        font-size: 10px;
        margin-bottom: 5px;
      }

      &:after {
        display: none;
      }

      &:first-child:after {
        content: "";
        height: 2px;
        width: 100%;
        display: block;
        border-right: none;
        border-top: 1px solid #000;
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }
  }
}
</style>