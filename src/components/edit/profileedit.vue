<template>
 <div>
  <!-- TEXT SECTION -->
  <div style="background: #B9B0A2" class="q-pt-sm">
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
      class="q-mt-sm"
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
      class="q-ml-xl q-mr-xl q-pt-md q-pl-lg q-pr-lg"
      dense
      color="sage"
      filled
      round
     >
     </q-input>
     <q-input
      color="sage"
      filled
      round
      label="Zip Code *"
      @input="$v.user.zipCode.$touch()"
      :rules="[val => $v.user.zipCode.required || 'Zipcode is required']"
      v-model="user.zipCode"
      class="q-ml-xl q-mr-xl q-pl-lg q-pr-lg"
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
      class="q-ml-xl q-mr-xl q-pl-lg q-pr-lg"
     />
     <q-input
      v-model="user.description"
      :rules="[
       val => $v.user.description.required || 'Description is required'
      ]"
      @input="$v.user.description.$touch()"
      filled
      round
      type="textarea"
      rows="5"
      label="Description *"
      class="q-ml-xl q-mr-xl q-pl-lg q-pr-lg desc_pd_class"
     />
    </center>
   </div>
  </div>

  <!-- BUTTON -->
  <div class="q-pt-md q-pb-md">
   <center>
    <q-btn
     style="background: white!important;"
     class="rift-regular
     dropshadow q-pl-md q-pr-md onyx"
     size="md"
     rounded
     label="Update Profile"
     @click="update(user)"
    />
   </center>
  </div>
  <!-- END BUTTON -->
 </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DoubleHeaderSeparatorCentered from "../typography/DoubleHeaderSeparatorCentered.vue";
import CropAlert from "../misc/CropAlert";
export default {
 name: "StepTwo",
 props: ["primaryText", "secondarySubText", "img", "vali"],
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
       this.base64Image = downloadURL;
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
  async update(user) {
   await this.$db
    .collection("users")
    .doc(this.$route.params.id)
    .update({
     avatar: this.base64Image,
     name: user.name,
     zipCode: user.zipCode,
     profileType: user.profileType,
     description: user.description
    });
   alert("Profile Updated Successfully!");
  }
 },
 mounted() {
  var col = this.$db.collection("users");
  var query = col.where("uid", "==", this.$route.params.id);
  query.get().then(snapshot => {
   if (snapshot.docs.length > 0) {
    snapshot.docs.forEach(doc => {
     this.user.name = doc.data().name;
     this.user.zipCode = doc.data().zipCode;
     this.user.profileType = doc.data().profileType;
     this.user.description = doc.data().description;
     this.base64Image = doc.data().avatar;
    });
   }
  });
 }
};
</script>
<style scoped>
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
 width: 80px !important;
 height: 80px !important;
}
.snow .row.snow.q-mt-md.q-mb-md {
 margin: 8px 0 5px !important;
}
.snow > .q-pt-xl {
 padding-top: 35px !important;
}
</style>
