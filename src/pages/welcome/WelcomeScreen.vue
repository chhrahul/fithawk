<template>
 <q-page>
  <StackedImage />
  <DoubleHeaderSeparator
   primaryText="Create a"
   primarySubText="New Account"
   secondaryText="Connect With Enthusiasts"
   secondarySubText="Near You"
   style="margin-top: -10px"
   class="snow drab"
  />

  <FullWidthButton
   class="q-pb-sm"
   @click="toAuth($event)"
   label="Get Started"
  />
 </q-page>
</template>

<script>
import DoubleHeaderSeparator from "../../components/typography/DoubleHeaderSeparator.vue";
import StackedImage from "../../components/images/StackedImage.vue";
import FullWidthButton from "../../components/shared/buttons/FullWidthButton.vue";

export default {
 name: "WelcomeScreen",
 components: {
  DoubleHeaderSeparator,
  StackedImage,
  FullWidthButton
 },
 methods: {
  toAuth($event) {
   this.$router.push("/auth");
   return $event;
  }
 }
};
</script>
