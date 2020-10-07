<template>
 <div>
  <q-item>
   <q-item-section top avatar @click="clicked()">
    <AuthorImage :avatar="avatar" />
   </q-item-section>

   <q-item-section class="q-pr-md onyx" @click="clicked()">
    <div>
     <CardTitle :text="name" :type="type" :group="group" :owner="owner" />
     <MessageTimeStamp :text="timestamp" style="margin-top: -10px" />
    </div>
   </q-item-section>
   <q-item-section side top v-if="more">
    <q-btn flat icon="more_horiz">
     <q-menu>
      <q-list style="min-width: 100px">
       <q-item clickable v-close-popup @click="editPost">
        <q-item-section>Edit</q-item-section>
       </q-item>
       <q-item clickable v-close-popup @click="deletePost">
        <q-item-section>Delete</q-item-section>
       </q-item>
      </q-list>
     </q-menu>
    </q-btn>
   </q-item-section>
  </q-item>
  <q-separator style="margin-top: -25px" />
 </div>
</template>

<script>
import AuthorImage from "../images/PostAuthorImage.vue";
import CardTitle from "../typography/CardTitle.vue";
import MessageTimeStamp from "../typography/MessageTimeStamp.vue";
export default {
 name: "AuthorBox",
 components: {
  AuthorImage,
  CardTitle,
  MessageTimeStamp
 },
 methods: {
 async clicked() {
    //alert('hi')
    //alert(this.postuid)
   if (this.postuid) {
    this.$router.push('/profile/'+this.postuid);
    //this.$router.push({ name: "Profile", params: { id: postuid } });
   }
  },
  async deletePost() {
   await this.$db
    .collection("posts")
    .doc(this.id)
    .delete();
  },
  editPost() {
   this.$router.push({ name: "EditPost", params: { id: this.id } });
  }
 },
 props: ["avatar", "more", "name", "group", "timestamp", "type", "owner", "id","postuid"]
};
</script>
