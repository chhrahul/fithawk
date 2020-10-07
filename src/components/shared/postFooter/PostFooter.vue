<template>
 <div>
  <q-card-actions class="top-border">
   <LikeButton :id="id" :likeCount="likeCount" :doc="doc" :post="post" />
   <CommentButton
    :commentCount="commentCount"
    @openComment="showComment = !showComment"
   />
   <q-space />
   <q-btn
    color="grey"
    round
    flat
    dense
    icon="flag"
    @click="reportModal = !reportModal"
   />
  </q-card-actions>
  <transition name="bottom-down">
   <comments
    v-if="showComment"
    :id="id"
    :doc="doc"
    :post="post"
    :comments="comments"
   />
  </transition>
  <q-dialog v-model="reportModal">
   <ReportModal :id="id" />
  </q-dialog>
 </div>
</template>

<script>
import LikeButton from "./LikedFooterButton";
import CommentButton from "./CommentFooterButton.vue";
import Comments from "./Comments.vue";
import ReportModal from "../../popups/ReportPopup.vue";
export default {
 name: "PostFooter",
 props: ["likeCount", "commentCount", "id", "doc", "post", "comments"],
 components: {
  LikeButton,
  CommentButton,
  Comments,
  ReportModal
 },
 data() {
  return {
   showComment: false,
   reportModal: false
  };
 }
};
</script>
<style lang="sass" scoped>
.top-border
    border-top: 1px #c9c9c9 solid
</style>
<style>
.comment-text {
 padding: 12px;
 background: rgb(216, 216, 216);
 border-radius: 30px;
 width: fit-content;
 max-width: 80%;
 margin-left: 2px;
 position: relative;
}
.subcomment-count {
 position: absolute;
 top: -9px;
 right: -14px;
 color: white;
 display: flex;
 justify-content: center;
 width: fit-content;
 border-radius: 50%;
 padding: 0px 7px;
}
.bottom-down-enter-active,
.bottom-down-leave-active {
 transition: all 0.5s ease;
}
.bottom-down-enter {
 margin-top: -20px;
}
.bottom-down-leave-to {
 margin-top: -20px;
}
</style>
