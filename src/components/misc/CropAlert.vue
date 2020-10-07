<template>
 <q-card class="crop_alert">
  <center>
   <q-item>
    <q-item-section align="left">
     <q-item-label class="text-h6 text-grey-9">
      Edit Photo
     </q-item-label>
    </q-item-section>
    <q-item-section side>
     <q-btn
      class="crop_alert_close text-grey-9 bg-white"
      v-close-popup
      round
      color="white"
      icon="close"
      size="sm"
     />
    </q-item-section>
   </q-item>
   <div style="height:280px;width:300px">
    <vueCropper
     ref="cropper"
     :img="getImage"
     :outputSize="option.size"
     :outputType="option.outputType"
     :info="true"
     :full="option.full"
     :canMove="option.canMove"
     :canMoveBox="option.canMoveBox"
     :fixedBox="option.fixedBox"
     :original="option.original"
     :autoCrop="option.autoCrop"
     :autoCropWidth="option.autoCropWidth"
     :autoCropHeight="option.autoCropHeight"
     :centerBox="option.centerBox"
     :high="option.high"
     :infoTrue="option.infoTrue"
     :maxImgSize="option.maxImgSize"
     :enlarge="option.enlarge"
     :mode="option.mode"
    >
    </vueCropper>
   </div>
   <div class="row">
    <div class="col-10">
     <div class="row q-mt-sm q-ml-sm">
      <div class="col-1">
       <q-item-label class="text-grey-9 text-body2">
        Zoom
       </q-item-label>
      </div>
      <div class="col-9"></div>
      <div class="col-1">
       <q-item-label class="text-grey-9 text-body2 q-ml-md">
        {{ 1 + zoom_value / 10 }}
       </q-item-label>
      </div>
     </div>
     <center>
      <q-slider
       :step="1"
       style="width:90%;margin-top:-5px"
       v-model="zoom_value"
       :min="0"
       :max="10"
       color="blue"
      />
     </center>
    </div>
    <div class="col-1">
     <q-icon
      class="text-grey-9 q-mt-md"
      size="md"
      name="rotate_right"
      @click="rotateRight()"
     />
    </div>
   </div>
   <q-item align="center" style="margin-top:-6px;margin-bottom:-6px">
    <q-item-section>
     <label class="custom-upload3">
      <input id="myFile" type="file" @change="previewFile" accept="image/*" />
     </label>
    </q-item-section>
    <q-item-section>
     <q-btn
      @click="sendResult()"
      icon="save_alt"
      no-caps
      flat
      size="lg"
      class="text-blue q-ml-lg crop_save"
     />
    </q-item-section>
   </q-item>
  </center>
 </q-card>
</template>
<style scoped>
.cropper {
 min-width: 350px;
 max-width: 350px;
 max-height: 350px;
 object-fit: cover;
}
.crop_alert {
 overflow: hidden !important;
}
.crop_alert .cropper-drag-box.cropper-move.cropper-modal {
 width: 300px;
}

.crop_alert .custom-upload3 {
 cursor: pointer;
 width: 100%;
 padding: 18px 14px;
 background-color: yellow;
 font-size: 23px;
 color: gray;
 margin-top: 0px;
 margin-left: 30px;
 background: url(../../assets/imgs/add_to_photo.png);
 background-repeat: no-repeat;
}
.crop_alert .custom-upload3 input {
 left: -9999px;
 position: absolute;
 display: none;
}
.crop_alert_close i {
 color: grey;
}
.crop_save i {
 color: lightskyblue;
}
</style>
<script>
import VueCropper from "../../pages/main/vue-cropper/vue-cropper";
export default {
 name: "CropAlert",
 props: ["imageUrl"],
 data() {
  return {
   base64Image: "",
   prev_value: 0,
   option: {
    img: "",
    size: 1,
    full: false,
    outputType: "png",
    canMove: true,
    fixedBox: false,
    original: false,
    canMoveBox: true,
    autoCrop: true,
    autoCropWidth: 160,
    autoCropHeight: 160,
    centerBox: false,
    high: false,
    cropData: {},
    enlarge: 1,
    mode: "contain",
    maxImgSize: 4000
   },
   zoom_value: 0
  };
 },
 computed: {
  getImage() {
   if (this.base64Image.trim().length == 0) {
    return this.imageUrl;
   } else {
    return this.base64Image;
   }
  }
 },
 components: {
  VueCropper
 },
 created() {},
 watch: {
  zoom_value(val) {
   this.zoom_value = val;
   var percent = this.zoom_value;
   if (percent > this.prev_value) {
    this.$refs.cropper.changeScale(percent - this.prev_value);
   } else if (percent < this.prev_value) {
    this.$refs.cropper.changeScale(percent - this.prev_value);
   }
   this.prev_value = percent;
  }
 },
 methods: {
  save(flag) {
   if (flag) {
    this.base64Image = this.cropImage;
   }
  },
  rotateLeft() {
   this.$refs.cropper.rotateLeft();
  },
  rotateRight() {
   this.$refs.cropper.rotateRight();
  },

  getCropImage() {
   this.$refs.cropper.getCropData(data => {
    this.cropImage = data;
    this.croped_prompt = true;
   });
  },
  previewFile(e) {
   var firstFile = e.target.files[0];
   if (firstFile == undefined) return;

   if (firstFile.type.includes("image")) {
    var reader = new FileReader();
    var that = this;
    reader.onload = e => {
     var img = e.target.result;

     that.base64Image = img;
    };
    reader.readAsDataURL(firstFile);
   }
  },
  sendResult() {
   try {
    this.$refs.cropper.getCropData(data => {
     this.$emit("photoState", data);
    });
   } catch (err) {
    this.$emit("photoState", "null");
   }
  }
 }
};
</script>
