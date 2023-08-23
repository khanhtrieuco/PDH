import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import Carousel3d from 'vue-carousel-3d';
import VueQuillEditor from 'vue-quill-editor'
import '~/static/quill/quill.core.css' // import styles
import '~/static/quill/quill.snow.css' // for snow theme
import '~/static/quill/quill.bubble.css' // for bubble theme


Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueVideoPlayer)
Vue.component('Paginate', Paginate)
Vue.use(Carousel3d)

import quillHtml from "~/components/common/quill-editor";
import uploadImage from "~/components/common/uploadImage";
import uploadButton from "~/components/common/uploadButton";
import Color from "~/components/common/color";
import ColorMobile from "~/components/common/colorMobile";
import Check from "~/components/common/check";
Vue.component('quill-html', quillHtml)
Vue.component('upload-button', uploadButton)
Vue.component('upload-image', uploadImage)
Vue.component('Check', Check)
Vue.component('Color', Color)
Vue.component('ColorMobile', ColorMobile)


