<template>
 <div>
  <div class="q-pa-xl auth_fix_cl">
   <PrimaryHeading :text="primaryText" />
   <PrimaryHeading :text="primarySubText" style="margin-top: -13px" />
   <IntroCardSeparator />
   <SecondaryHeading :text="secondaryText" />
   <SecondaryHeading :text="secondarySubText" />
  </div>
 </div>
</template>

<script>
import IntroCardSeparator from "../separators/IntroCardSeparator.vue";
import PrimaryHeading from "./PrimaryHeading.vue";
import SecondaryHeading from "./SecondaryHeading.vue";

export default {
 name: "DoubleHeaderSeparator",
 components: {
  IntroCardSeparator,
  PrimaryHeading,
  SecondaryHeading
 },
 props: ["primaryText", "primarySubText", "secondaryText", "secondarySubText"]
};
</script>
