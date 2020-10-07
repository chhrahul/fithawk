<template>
 <q-layout view="lHh Lpr lFf" class="ice">
  <Header
   logo="../statics/logos/fithawktitle.png"
   leftIcon="arrow_back_ios"
   @click="back($event)"
  />
  <q-page-container>
   <router-view />
  </q-page-container>
 </q-layout>
</template>

<script>
import Header from "../components/navigation/Header.vue";

export default {
 name: "MainLayout",
 backFlag: false,
 leftIcon: true,
 components: {
  Header
 },
 mounted() {
  var uid = this.$q.localStorage.getItem("user_id");
  if (
   uid != null &&
   uid != "" &&
   uid != undefined &&
   uid != "undefined" &&
   uid != "null"
  ) {
   //do nothing
  } else {
   this.$router.push("/auth");
  }
 },
 methods: {
  back(flag) {
   return flag;
  }
 }
};
</script>
