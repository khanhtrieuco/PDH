<template>
  <div>
    <quill-editor :style="{
      'height': '400px', display: 'inline-block', 'border': 'solid 1px #acacac',
      'border-radius': '12px', 'overflow': 'hidden', 'font-size': '16px','padding-bottom': '41px','max-width': '100%'
    }" :content="message" :options="editorOption" :ref="quill_id" @blur="onBlur($event)" @focus="onFocus($event)"
      @ready="onEditorReady($event)" @change="onEditorChange($event)"></quill-editor>
    <input
      :ref="id"
      style="display: none;"
      type="file"
      accept="image/*"
      multiple
      @change="loadImageFile"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    uuid: {
      type: String,
      default: "editer-id"
    },
    id: {
      type: String,
      default: "edit-bt-image-button"
    },
    quill_id: {
      type: String,
      default: "QuillEditor"
    },
    content_html: {
      type: String,
      default: null
    },
    placeholder: {
      type: String
    },
  },

  computed: {
    message: {
      get: function () {
        return this.content_html;
      },
      set: function (newValue) {
        this.$emit("update:content_html", newValue);
      }
    },
    readonlymode: {
      get: function () {
        return this.readonly;
      }
    }
  },
  data() {
    return {
      loading: false,
      timeoutinput: null,
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote"], // reference
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }], // List
              [{ indent: "-1" }, { indent: "+1" }], // Indent
              // [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }], // font size
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // font color, font background color
              [{ font: ["14px", "16px", "18px"] }],
              [{ align: [] }],
              // ["clean"],
              ["link"],
              ["image"]
            ],
            handlers: {
              image: (val) => {
                if (val) {
                  this.$refs[this.id].click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      current_img: null
    };
  },
  beforeMount() {
    if (window.localStorage.hasOwnProperty("list_image")) {
      window.localStorage.removeItem("list_image");
    }
  },
  methods: {
    ...mapActions({
      postbyUrl: "common/postbyUrl"
    }),
    onEditorReady(quill) {
      console.log("editor ready!");
    },
    async onEditorChange({ quill, html, text }) {
      let delta = quill.getContents();
      delta.ops = await this.convertDataDelta(delta);
      clearTimeout(this.timeoutinput);
      this.timeoutinput = setTimeout(async () => {
        this.$emit("update:content_html", html);
      }, 1000);
      this.content = html;
    },
    checkData() {
      if (this.message) {
        this.$emit("update:content_html", this.content_html);
      }

      this.$emit("load");
    },
    onBlur(evt) {
      this.checkData();
    },
    onFocus(evt) {
      this.checkData();
    },
    onContentDom(evt) {
      this.checkData();
    },
    onDialogDefinition(evt) {
      evt;
    },
    async convertDataDelta({ ops }) {
      for (let i of ops) {
        if (i && i.insert && i.insert.image) {
          i = await this.getWidthHeigth(i);
        }
      }
      return ops;
    },
    getWidthHeigth(i) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
          i.insert.width = this.width;
          i.insert.height = this.height;
          resolve(i);
        };
        img.src = i.insert.image;
      });
    },
    async loadImageFile(e) {
      let files = e.target.files;
      let quill = this.$refs[this.quill_id].quill;

      for (let i = 0; i < files.length; i++) {
        if (files[i].size >= 3000000) {
          this.$message.error('File ảnh tải lên có dung lượng vượt mức 3MB!');
          return;
        } else {
          let r = await this.postbyUrl({ url: '/api/upload', file: files[i] })
          if (!r) return;
          if (r.length === 0) return;
          

          let select = quill.getSelection(true);
          let image = r[0].url;
          quill.insertEmbed(select.index, 'image', image);
        }
      }
    }
  },
  watch: {
    deep: true
  }
};
</script>
<style>
.ql-editor {
  font-size: 16px;
}
</style>