<template>
 <div v-if="post" class="q-my-md q-mx-md">
  <PostDisplay
   :key="key + 'group'"
   :type="post.type"
   :avatar="post.avatar"
   :more="post.more"
   :name="post.owner ? post.owner.name : null"
   :group="post.group"
   :timestamp="post.created_at"
   :likeCount="post.likes.length"
   :commentCount="post.comments.length"
   :comments="post.comments"
   :text="post.text"
   :media-urls="post.mediaUrls"
   doc="posts"
   :id="post.id"
   class="dropshadow"
   :post="post"
  />
 </div>
</template>
<script>
import PostDisplay from "../../../components/shared/PostDisplay.vue";
export default {
 prop: ["id"],
 components: {
  PostDisplay
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
