<template>
 <div class="q-pa-md">
  <div
   v-for="(comment, index) in comments"
   class="q-my-sm"
   :key="index + 'main'"

  >
   <div
    class="flex items-center"
    @click="
     comment.showTextBox = !comment.showTextBox;
     $forceUpdate();
     toggleSubComment(2);
    "
   >
    <div>
     <q-avatar>
      <img :src="comment.avatar" />
     </q-avatar>
    </div>
    <div class="comment-text relative">
     {{ comment.text }}
     <div
      class="subcomment-count carrot"
      v-if="comment.comments && comment.comments.length > 0"
     >
      {{ comment.comments.length }}
     </div>
    </div>
   </div>
   <template v-if="comment.showTextBox">
    <div
     v-for="(subcomment, ind) in comment.comments.slice(0,subcommentRange)"
     class="q-ml-lg flex q-mt-sm"
     :key="ind + 'sub'"
    >
     <div>
      <q-avatar size="xs">
       <img :src="subcomment.avatar" />
      </q-avatar>
     </div>
     <div class="comment-text">
      {{ subcomment.text }}
     </div>
     <q-btn flat rounded color="secondary" v-if="ind == 1 && subcommentRange == 2 && comment.comments.length > 2" @click="toggleSubComment(comment.comments.length)">View {{comment.comments.length - 2}} more comment(s)</q-btn>
    </div>
   </template>
   <div v-if="comment.showTextBox" class="q-mt-sm q-ml-lg">
    <q-input
     filled
     color="primary"
     bottom-slots
     v-model="comment.subCommentText"
     label="Add comment"
    >
     <template v-slot:before>
      <q-avatar>
       <img :src="avatar" />
      </q-avatar>
     </template>

     <template v-slot:append>
      <q-icon
       name="close"
       @click="
        comment.subCommentText = '';
        comment.showTextBox = false;
        $forceUpdate();
       "
       class="cursor-pointer"
      />

     </template>

     <template v-slot:after>
      <q-btn
       round
       dense
       flat
       icon="send"
       @click="
        addSubComment(index, comment.subCommentText)
        comment.subCommentText = ''
       "
      />
     </template>
    </q-input>
   </div>
  </div>
  <div class="flex">
   <q-input
    filled
    standout
    bottom-slots
    v-model="commentText"
    label="Add comment"
    class="textarea js-autoresize" 
   >
   <!--textarea 
   filled
   standout
   bottom-slots
   class="textarea js-autoresize" 
   label="Add comment" 
   v-model="commentText"
   >
    </textarea-->
    <template v-slot:before>
     <q-avatar>
      <img :src="avatar" />
     </q-avatar>
    </template>

    <template v-slot:append>
     <q-icon
      v-if="commentText !== ''"
      name="close"
      @click="sendCommentempty"
      class="cursor-pointer"
     />
    </template>

    <template v-slot:after>
     <q-btn round dense flat icon="send" @click="sendComment" />
    </template>
   </q-input>
  </div>
 </div>
</template>
<script>
import { mapState } from "vuex";
export default {
 props: ["id", "doc", "post", "comments"],
 computed: {
  ...mapState({
   currentUser: state => state.storage.user
  }),
  avatar() {
   return this.currentUser.avatar
    ? this.currentUser.avatar
    : "https://cdn.quasar.dev/img/boy-avatar.png";
  }
 },
 data() {
  return {
   commentText: "",
   showComment: false
  };
 },
 methods: {
  async addSubComment(index, text) {
   let subCommentText = text;
   var mycomment = {
    post_id: this.id,
    text: subCommentText,
    created_time: new Date().getTime(),
    name: this.currentUser.name,
    avatar: this.currentUser.avatar
     ? this.currentUser.avatar
     : "https://cdn.quasar.dev/img/boy-avatar.png",
    uid: this.$q.localStorage.getItem("user_id")
   };
   let comments = this.post.comments.map(a => {
    return {
     post_id: a.post_id,
     text: a.text,
     created_time: a.created_time,
     name: a.name,
     avatar: a.avatar,
     uid: a.uid,
     comments: a.comments ? a.comments : []
    };
   });
   if (comments[index].comments) {
    comments[index].comments.push(mycomment);
   } else {
    comments[index].comments = [mycomment];
   }
   await this.updateComments(comments);
   let user_id = this.currentUser.uid;
   let that = this;
   //  if (this.post.owner.uid !== user_id) {
   //   this.$db.collection("notifications").add({
   //    flag: 9,
   //    owner: user_id,
   //    receiver: this.post.owner.uid,
   //    avatar: that.currentUser.avatar
   //     ? that.currentUser.avatar
   //     : "https://cdn.quasar.dev/img/boy-avatar.png",
   //    time: new Date().getTime(),
   //    text: that.currentUser.name + " has commented your post",
   //    to: that.id
   //   });
   //   }
   if (comments[index].uid !== user_id) {
    this.$db.collection("notifications").add({
     flag: 9,
     owner: user_id,
     receiver: comments[index].uid,
     avatar: that.currentUser.avatar
      ? that.currentUser.avatar
      : "https://cdn.quasar.dev/img/boy-avatar.png",
     time: new Date().getTime(),
     status: "unread",
     text: that.currentUser.name + " has replied to your comment",
     to: that.id
    });
   }
  },
  async sendComment() {
   if (this.commentText.length == 0) return;
   let comments = this.post.comments.map(a => {
    return {
     post_id: a.post_id,
     text: a.text,
     created_time: a.created_time,
     name: a.name,
     avatar: a.avatar,
     uid: a.uid
    };
   });
   var mycomment = {
    post_id: this.id,
    text: this.commentText,
    created_time: new Date().getTime(),
    name: this.currentUser.name,
    avatar: this.currentUser.avatar
     ? this.currentUser.avatar
     : "https://cdn.quasar.dev/img/boy-avatar.png",
    uid: this.$q.localStorage.getItem("user_id"),
    comments: []
   };
   this.commentText = "";
   comments.push(mycomment);
   await this.updateComments(comments);
   let that = this;
   let user_id = this.currentUser.uid;
   if (this.post.owner.uid !== user_id) {
    this.$db.collection("notifications").add({
     flag: 9,
     owner: user_id,
     receiver: this.post.owner.uid,
     status: "unread",
     avatar: that.currentUser.avatar
      ? that.currentUser.avatar
      : "https://cdn.quasar.dev/img/boy-avatar.png",
     time: new Date().getTime(),
     text: that.currentUser.name + " has commented your post",
     to: that.id
    });
   }
   
   this.post.comments.forEach(comment => {
    if (comment.uid !== user_id && comment.uid !== that.post.owner.uid) {
     that.$db.collection("notifications").add({
      flag: 9,
      owner: user_id,
      receiver: comment.uid,
      status: "unread",
      avatar: that.currentUser.avatar
       ? that.currentUser.avatar
       : "https://cdn.quasar.dev/img/boy-avatar.png",
      time: new Date().getTime(),
      text:
       that.currentUser.name + " has commented in a post, you’ve commented on",
      to: that.id
     });
    }
   });
  //alert("test");
   //  this.comments.push(mycomment);
   this.commentText = "";
  },
  
  async sendCommentempty() {
   //alert(this.commentText);
   this.commentText = "";
  },
  async updateComments(comments) {
   await this.$db
    .collection(this.doc)
    .doc(this.id)
    .update({ comments: comments });
  }
 }
};
</script>
