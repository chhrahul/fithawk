<template>
 <div>
  <center>
   <GlobalPillButtonInverted
    @click="register($event)"
    icon="mail"
    label="SIGN UP WITH EMAIL"
   />
   <!--<AuthOptions />-->
  </center>
 </div>
</template>

<script>
import GlobalPillButtonInverted from "../../shared/buttons/GlobalPillButtonInverted.vue";
//import AuthOptions from "../../modals/auth/AuthOptions.vue";

export default {
 name: "Register",
 components: {
  GlobalPillButtonInverted
  // AuthOptions,
 },
 methods: {
  clicked(flag) {
   this.$emit("click");
   return flag;
  },
  register(flag) {
   this.$router.push("/signup");
   return flag;
  }
 }
};
</script>
