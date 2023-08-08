import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSlickCarousel from 'vue-slick-carousel'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import ThumbImage from '~/components/thumbnailimg.vue'
import Breadcrumb from '~/components/breadcrumb.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '~/static/css/responsive.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('VueSlickCarousel', VueSlickCarousel)
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload, {
//     preLoad: 1.3,
//     error: '/images/no-image.png',
//     attempt: 1,
//     listenEvents: ['scroll', 'transitionend'],
//     // silent:false,
//     lazyComponent: true
// })
// import LazyHydrate from 'vue-lazy-hydration'
// Vue.component('LazyHydrate', LazyHydrate)
// From source

Vue.component('ThumbImage', ThumbImage)
Vue.component('Breadcrumb', Breadcrumb)
