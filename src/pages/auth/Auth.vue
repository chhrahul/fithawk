<template>
 <q-page class="drab">
  <FullWidthLogo />
  <DoubleHeaderSeparator
   class="q-mt-sm snow"
   primaryText="Create a"
   primarySubText="New Account"
   secondaryText="Connect With Enthusiasts"
   secondarySubText="Near You"
   v-if="showIntroCard"
  />

  <div class="q-mt-md" v-if="!showIntroCard" />

  <q-tabs
   v-model="tab"
   dense
   class="snow"
   active-color="success"
   indicator-color="secondary"
   align="justify"
   v-if="showIntroCard"
  >
   <q-tab name="register" label="Register" />
   <q-tab name="login" label="Log in" />
  </q-tabs>

  <q-tab-panels v-model="tab" animated class="drab">
   <q-tab-panel name="register" class="drab q-pb-sm">
    <Register @click="showRegister($event)" v-if="showIntroCard" />
   </q-tab-panel>

   <q-tab-panel name="login" class=" drab q-pb-sm">
    <Login @emailLogin="showLogin($event)" />
   </q-tab-panel>
  </q-tab-panels>
 </q-page>
</template>

<script>
import FullWidthLogo from "../../components/images/LogoFullWidthWhite.vue";
import DoubleHeaderSeparator from "../../components/typography/DoubleHeaderSeparator.vue";
import Register from "../../components/modals/auth/Register.vue";
import Login from "../../components/modals/auth/Login.vue";

export default {
 name: "Auth",
 components: {
  FullWidthLogo,
  DoubleHeaderSeparator,
  Register,
  Login
 },
 data() {
  return {
   tab: "register",
   showIntroCard: true
  };
 },
 methods: {
  showLogin() {
   this.tab = "login";
   this.showIntroCard = false;
  }
 }
};
</script>
<style>
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
 .fix_inr_img {
  height: 460px;
 }
}
@media only screen and (device-width: 828px) and (device-height: 1792px) and (-webkit-device-pixel-ratio: 3) {
 .fix_inr_img {
  height: 760px;
 }
}
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
 .auth_fix_cl {
  padding: 20px 48px;
 }
}
@media only screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
 .fix_inr_img {
  height: 390px;
 }
 body {
  overflow: hidden;
 }
}
</style>
