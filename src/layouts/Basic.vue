<!-- For the login and register pages -->
<template>
 <q-layout id="basic" view="lHh Lpr lFf">
  <div id="overlay"></div>
  <q-page-container>
   <!-- This is where pages get injected -->
   <router-view />
  </q-page-container>
 </q-layout>
</template>

<script>
export default {
 name: "BasicLayout",

 mounted() {
  
};
</script>

<style scoped>
div#basic {
 background: white;
 min-height: 100vh !important;
}
</style>
