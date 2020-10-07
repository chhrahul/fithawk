<template>
 <div v-if="post">
  <edit-post
   :post="post"
   @close="$router.push({ name: 'HomeFeed' })"
  ></edit-post>
 </div>
</template>
<script>
import EditPost from "components/edit/EditPost";
export default {
 prop: ["id"],
 components: {
  EditPost
 },
 created() {
  let that = this;
  this.$db
   .collection("posts")
   .doc(this.$route.params.id)
   .get()
   .then(snapShot => {
    that.post = { ...snapShot.data(), id: snapShot.id };
   });
 },
 data() {
  return {
   post: null
  };
 }
};
</script>
