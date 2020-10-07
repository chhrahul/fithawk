<template>
 <q-page class="q-px-md q-mt-md">
  <create-post @close="postCreated"></create-post>
 </q-page>
</template>
<script>
import CreatePost from "components/create/CreatePost";
export default {
 components: {
  CreatePost
 },
 methods: {
  postCreated() {
   this.$router.push({ name: "HomeFeed" });
  }
 }
};
</script>
