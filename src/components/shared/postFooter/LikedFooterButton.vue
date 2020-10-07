<template>
 <div>
  <q-btn
   v-if="!liked"
   class="europa-light onyx"
   :icon="'favorite_border'"
   flat
   :label="'Like (' + likeCount + ')'"
   @click="like"
  />
  <q-btn
   v-if="liked"
   class="europa-light onyx"
   :icon="'favorite'"
   flat
   color="secondary"
   :label="'Liked (' + likeCount + ')'"
   @click="like"
  />
 </div>
</template>

<script>
import { mapState } from "vuex";
export default {
 name: "LikedFooterButton",
 props: ["likeCount", "doc", "id", "post"],
 computed: {
  liked() {
   return this.post.likes.find(
    a => a == this.$q.localStorage.getItem("user_id")
   );
  },
  ...mapState({
   user: state => state.storage.user
  })
 },
 methods: {
  async like() {
   let docData = Object.assign({}, this.post);
   // console.log("Check 1");
   let user_id = this.$q.localStorage.getItem("user_id");
     // alert("userId from local:"+user_id)
   if (docData.likes.find(a => a == user_id)) {
    docData.likes = docData.likes.filter(a => a !== user_id);
   } else {
    docData.likes.push(user_id);
   }

   docData.comments = docData.comments.map(a => {
    return {
     ...a,
     comments: a.comments ? a.comments : []
    };
   });
   docData.mediaUrls = docData.mediaUrls.map(a => {
    return a;
   });
   this.$forceUpdate();

   await this.$db
    .collection("posts")
    .doc(this.post.id)
    .set(Object.assign({}, docData));
      // alert("Passed $db posts");

// Problem started here
   if (
    this.post.likes.find(a => a == user_id) &&
    this.post.uid !== user_id
   ) {
      // alert(this.post.uid);
      // alert("Receiver: "+this.post.owner.uid)
    this.$db.collection("notifications").add({
     flag: 8,
     owner: user_id,
     receiver: this.post.uid,
     status: "unread",
     avatar: this.user.avatar
      ? this.user.avatar
      : "https://cdn.quasar.dev/img/boy-avatar.png",
     time: new Date().getTime(),
     text: this.user.name + " has liked your post",
     follower: true,
     to: this.id
    });
       // alert("End notification");
   }
      // alert("Passed second last");
   this.post.likes = docData.likes;

  }
 }
};
</script>
