<template>
 <div class="q-mr-md q-ml-md q-mt-md">
<!--  <q-btn-->
<!--   v-if="leftIcon"-->
<!--   @click="$router.go(-1)"-->
<!--   flat-->
<!--   round-->
<!--   dense-->
<!--   :icon="leftIcon"-->
<!--   class="q-mr-sm col-2"-->
<!--   color="accent"-->
<!--  />-->
  <PostDisplay
   :type="this.post[0].type"
   :avatar="this.post[0].avatar"
   :more="this.post[0].more"
   :name="this.post[0].owner ? this.post[0].owner.name : null"
   :group="this.post[0].group_name"
   :timestamp="this.post[0].created_at"
   :likeCount="this.post[0].likes.length"
   :commentCount="this.post[0].comments.length"
   :comments="this.post[0].comments"
   :text="this.post[0].text"
   doc="posts"
   :id="this.post[0].id"
   class="dropshadow"
   :media-urls="this.post[0].mediaUrls"
   :post="this.post[0]"
  />
 </div>
</template>
<script>
import PostDisplay from "../../../../components/shared/PostDetail.vue";

export default {
 name: "PostDetail",
 components: {
  PostDisplay
 },
 data() {
  return {
   post: [],
   id: this.$route.params.id
  };
 },
 mounted() {
  this.getPost();
  //var ji = 'jk';
  //alert(ji)
 },
 methods: {
  getPost() {
   var col = this.$db.collection("posts");
   var query = col.where("id", "==", this.id);
   query.get().then(snapshot => {
    //var i = 0;
    //alert(snapshot.docs[0].data().uid)
    this.post.push(snapshot.docs[0].data());
   });
  }
 }
};
</script>
