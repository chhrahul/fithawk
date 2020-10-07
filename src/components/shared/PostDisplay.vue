<template>
 <q-card class="my-card" style="border-radius: 20px">
  <div @click="postdetail(post.id)">
   <AuthorBox
    :type="type"
    :avatar="avatar"
    :more="this.user_id == post.owner.uid"
    :group="group"
    :timestamp="timestamp"
    :owner="post.owner"
    :postuid="post.uid"
    :id="id"
    @click="postdetail(post.id)"
   />

   <PostText class="q-ml-lg q-mr-lg q-mb-md q-mt-md" :text="text" />
  </div>
  <PostMedia :post="post" />
  <PostFooter
   :doc="doc"
   :id="id"
   :likeCount="likeCount"
   :commentCount="commentCount"
   :post="post"
   :comments="comments"
   @click="postdetail(post.id)"
  />
 </q-card>
</template>

<script>
import AuthorBox from "../typography/AuthorBox.vue";
import PostFooter from "../shared/postFooter/PostFooter.vue";
import PostMedia from "../shared/postFooter/PostMedia.vue";
import PostText from "../shared/postFooter/PostText.vue";
import { mapState } from "vuex";

export default {
 name: "PostDisplay",
 components: {
  AuthorBox,
  PostFooter,
  PostMedia,
  PostText
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  })
 },
 props: [
  "avatar",
  "more",
  "name",
  "group",
  "timestamp",
  "likeCount",
  "commentCount",
  "type",
  "text",
  "id",
  "doc",
  "post",
  "comments"
 ],
 methods: {
  postdetail(id) {
   this.$router.push("/post/" + id);
  }
 },
 data() {
  return {
   user_id: null
  };
 },
 mounted() {
  this.user_id = this.$q.localStorage.getItem("user_id");
 }
};
</script>
