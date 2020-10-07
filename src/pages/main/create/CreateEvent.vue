<template>
 <q-page class="q-px-md q-mt-md">
  <create-event @close="postCreated"></create-event>
 </q-page>
</template>
<script>
import CreateEvent from "components/create/CreateEvent";
export default {
 components: {
  CreateEvent
 },
 methods: {
  postCreated() {
   this.$router.push({ name: "HomeFeed" });
  }
 }
};
</script>
