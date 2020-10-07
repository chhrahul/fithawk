<template>
 <q-card class="my-card" style="border-radius: 20px">
  <div>
   <AuthorBox
    :type="type"
    :avatar="avatar"
    :more="this.user_id == post.owner.uid"
    :name="name"
    :group="group"
    :postuid="post.uid"
    :timestamp="timestamp"
    :owner="post.owner"
    :id="id"
   />

   <PostText class="q-ml-lg q-mr-lg q-mb-md" :text="text" />
  </div>
  <MediaDetail :post="post" />
  <PostFooter
   :doc="doc"
   :id="id"
   :likeCount="likeCount"
   :commentCount="commentCount"
   :post="post"
   :comments="comments"
  />
 </q-card>
</template>

<script>
import AuthorBox from "../typography/AuthorBox.vue";
import PostFooter from "../shared/postFooter/PostFooter.vue";
import MediaDetail from "../shared/postFooter/MediaDetail.vue";
import PostText from "../shared/postFooter/PostText.vue";
import { mapState } from "vuex";

export default {
 name: "PostDetail",
 components: {
  AuthorBox,
  PostFooter,
  MediaDetail,
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
