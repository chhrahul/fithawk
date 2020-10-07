<template>
 <div>
  <div class="q-pa-lg">
   <center>
    <PrimaryHeading :text="primaryText" class="fix_head_font" />
    <PrimaryHeading :text="primarySubText" />
   </center>
   <div class="row snow q-mt-md q-mb-sm">
    <div class="col-5" />
    <q-separator class="col-2" color="accent" />
    <div class="col-5" />
   </div>
   <center>
    <SecondaryHeading :text="secondaryText" />
    <SecondaryHeading :text="secondarySubText" class="fix_subhead_font" />
   </center>
  </div>
 </div>
</template>

<script>
import PrimaryHeading from "./PrimaryHeading.vue";
import SecondaryHeading from "./SecondaryHeading.vue";

export default {
 name: "DoubleHeaderSeparator",
 components: {
  PrimaryHeading,
  SecondaryHeading
 },
 props: ["primaryText", "primarySubText", "secondaryText", "secondarySubText"]
};
</script>
<style>
.fix_head_font div {
 font-size: 26px !important;
}
.fix_subhead_font div {
 font-size: 16px !important;
}
</style>
