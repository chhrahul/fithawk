<template>
 <div>
  <center>
   <EmailLogin @login="login()" v-if="emailLoginDisplay == true" />
   <GlobalPillButtonInverted
    @click="showEmailLogin($event)"
    icon="mail"
    label="LOG IN WITH EMAIL"
    v-if="emailLoginDisplay != true"
   />

   <!--<AuthOptions />-->
  </center>
  <div
   v-if="emailLoginDisplay == true"
   class=""
   clickable
   @click="$router.push('/signup')"
  >
   <center>
    <div class="europa-light text-white">
     Don't have an account?
     <q-btn flat label="sign up" style="margin-left: -10px" />
    </div>
   </center>
  </div>
 </div>
</template>

<script>
import GlobalPillButtonInverted from "../../shared/buttons/GlobalPillButtonInverted.vue";
//import AuthOptions from "../../modals/auth/AuthOptions.vue";
import EmailLogin from "./EmailLogin.vue";

export default {
 name: "Login",
 components: {
  GlobalPillButtonInverted,
  //AuthOptions,
  EmailLogin
 },
 data() {
  return {
   emailLoginDisplay: false
  };
 },
 methods: {
  login(user) {
   return user;
  },
  showEmailLogin(flag) {
   this.emailLoginDisplay = true;
   this.$emit("emailLogin");
   return flag;
  }
 }
};
</script>
