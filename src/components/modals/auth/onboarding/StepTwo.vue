<template>
 <div>
  <!-- TEXT SECTION -->
  <div style="background: #B9B0A2!important;" class="q-pt-xl">
   <DoubleHeaderSeparatorCentered
    class="snow"
    :primaryText="primaryText"
    :secondarySubText="secondarySubText"
   />
   <!-- END TEXT SECTION -->

   <!-- Step One -->
   <div>
    <center></center>
    <q-dialog v-model="cropped_prompt" persistent>
     <CropAlert :imageUrl="base64Image" v-on:photoState="changePhoto($event)" />
    </q-dialog>
    <center class="base-img-uploard">
     <img
      :src="base64Image"
      class="q-mt-xl"
      @click="createCropDlg()"
      style="border-radius:50%;cursor:pointer;height:150px;width:150px;"
     />
    </center>
    <center>
     <q-input
      label="Your Name *"
      v-model="user.name"
      @input="$v.user.name.$touch()"
      :rules="[val => $v.user.name.required || 'Name is required']"
      class="q-ml-xl q-mr-xl q-mt-md q-pt-md q-pl-lg q-pr-lg"
      dense
      color="sage"
      filled
      round
     />
     <q-input
      color="sage"
      filled
      round
      label="Zip Code *"
      @input="$v.user.zipCode.$touch()"
      :rules="[val => $v.user.zipCode.required || 'Zipcode is required']"
      v-model="user.zipCode"
      class="q-ml-xl q-mr-xl q-mt-md q-pl-lg q-pr-lg"
      dense
     />

     <q-select
      dense
      color="sage"
      filled
      outlined
      @input="$v.user.profileType.$touch()"
      :rules="[
       val => $v.user.profileType.required || 'Profile Type is required'
      ]"
      v-model="user.profileType"
      :options="profileOptions"
      label="Profile Type *"
      class="q-ml-xl q-mr-xl q-mt-md q-pl-lg q-pr-lg"
     />

     <q-input
      v-model="user.description"
      color="sage"
      :rules="[
       val => $v.user.description.required || 'Description is required'
      ]"
      filled
      round
      type="textarea"
      label="Description *"
      class="q-ml-xl q-mr-xl q-mt-md q-pl-lg q-pr-lg"
     />
    </center>
   </div>
  </div>

  <!-- BUTTON -->
  <div class="q-mb-xl q-pb-xl">
   <center>
    <q-btn
     style="background: white!important;"
     class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
     size="md"
     rounded
     label="Complete Profile"
     @click="select(user)"
    />
   </center>
  </div>
  <!-- END BUTTON -->
 </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DoubleHeaderSeparatorCentered from "../../../typography/DoubleHeaderSeparatorCentered.vue";
import CropAlert from "../../../../components/misc/CropAlert";
export default {
 name: "StepTwo",
 props: ["primaryText", "secondarySubText", "img"],
 data() {
  return {
   profileOptions: ["amateur", "professional", "coach"],
   user: {
    name: "",
    zipCode: "",
    profileType: "",
    description: ""
   },
   avatar: "",
   base64Image: "../../../statics/default.png",
   cropped_prompt: false,
   isBase64Image: false
  };
 },
 validations: {
  user: {
   name: { required },
   zipCode: { required },
   profileType: { required },
   description: { required }
  }
 },
 components: {
  DoubleHeaderSeparatorCentered,
  CropAlert
 },
 methods: {
  changePhoto(e) {
   if (e != "null") {
    this.base64Image = e;
    this.isBase64Image = true;
   }
   this.cropped_prompt = false;
   this.confirmUpload();
  },
  createCropDlg() {
   this.cropped_prompt = true;
  },
  confirmUpload() {
   if (this.isBase64Image) {
    this.uploadTask = this.uploadToStorage(this.base64Image);
    this.uploadTask.on("state_changed", () => {
     this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
      if (this.uploadTask.snapshot.state) {
       this.avatar = downloadURL;
      }
     });
    });
   }
  },
  uploadToStorage(base64image, path) {
   let uniqkey = "pic" + Math.floor(Math.random() * 1000000);
   var pathUrl = (path ? path : "avatars") + "/" + uniqkey;
   let storageRef = this.$storage.ref(pathUrl);
   return storageRef.putString(base64image, "data_url");
  },
  select(user) {
   this.$v.user.$touch();
   if (this.$v.user.$error) {
    alert("Please fill in all required fields!");
    return;
   }
   this.user.avatar = this.avatar;
   this.$emit("stepTwo", user);
  }
 }
};
</script>
<style>
.snow > .q-pa-xl {
 padding: 0 40px 10px !important;
}
.snow .q-img.overflow-hidden {
 height: 100px !important;
 width: 100px !important;
 margin-top: 10px;
}
.snow .q-mb-xl.q-pb-xl {
 margin-bottom: 0px !important;
 margin-top: 10px;
}
.base-img-uploard img {
 width: 100px !important;
 height: 100px !important;
 margin-top: 10px;
}
.snow .row.snow.q-mt-md.q-mb-md {
 margin: 8px 0 5px !important;
}
.snow > .q-pt-xl {
 padding-top: 35px !important;
}
</style>
