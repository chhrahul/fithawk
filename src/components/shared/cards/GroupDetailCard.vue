<template>
 <div>
  <q-card class="my-card" style="box-shadow: none;background: transparent;">
   <div v-if="src">
    <q-img style="max-height: 250px;" :src="src" />
   </div>
  </q-card>

  <q-item style="padding-top: 3px !important;">
   <q-item-section>
    <SecondaryHeading :text="name" />
   </q-item-section>
  </q-item>
  <q-item style="padding-top: 3px !important;">
   <q-card-section style="padding: 0px !important;">
    <div class="text-subtitle2" style="font-size: 1.30em;color: #505050;">
     {{ zipcode }}
    </div>

    <div style="font-size: 1.10rem;color: #505050;">{{ description }}</div>
   </q-card-section>
  </q-item>
 </div>
</template>
<script>
import Vue from "vue";
import vBlur from "v-blur";
import axios from "axios";
import SecondaryHeading from "../../typography/SecondaryHeading.vue";
import SectionHeader from "../../typography/SectionHeader.vue";
import CardTitle from "../../typography/SubTitle.vue";

Vue.use(vBlur);
export default {
 name: "GroupDetailCard",
 props: ["name", "zipcode", "description", "src", "code"],

 created() {
  this.init();
 },
 components: {
  SecondaryHeading
 },
 data() {
  return {
   blurConfig: {
    isBlurred: true,
    opacity: 0.3,
    filter: "blur(1.8px)",
    transition: "all .3s linear"
   },
   noBlurConfig: {
    isBlurred: false
   },
   position: ""
  };
 },
 methods: {
  init() {
   var that = this;
   axios
    .get("https://ziptasticapi.com/" + this.zipcode)
    .then(function(response) {
     if (response.data.city) {
      that.zip = response.data.city + ", " + response.data.state;
     } else {
      that.zip = "";
     }
    });
  }
 }
};
</script>
