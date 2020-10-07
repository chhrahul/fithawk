<template>
 <div class="row" @click="clicked($event)">
  <div class="col-10 carrot q-pt-lg q-pb-xl">
   <center>
    <SecondaryHeading class="q-mt-sm" text="Get Started" />
   </center>
  </div>
  <div class="col-2 carrot" style="border-left: 3px #324755 solid">
   <center>
    <q-icon name="chevron_right" class="snow q-mt-md" style="font-size: 4em" />
   </center>
  </div>
 </div>
</template>

<script>
import SecondaryHeading from "../../typography/SecondaryHeading.vue";
export default {
 name: "GetStarted",
 components: {
  SecondaryHeading
 },
 methods: {
  clicked(flag) {
   this.$emit("click");
   return flag;
  }
 }
};
</script>
