<!-- NOTIFICATION FLAG = 3 -->
<template>
 <div>
  <q-item clickable @click="$router.push('/profile/' + notification.to)">
   <q-item-section top avatar>
    <q-avatar size="4em" color="primary" text-color="white">
     <img :src="notification.avatar" />
    </q-avatar>
   </q-item-section>
   <q-item-section>
    <MessageTimeStamp :text="notification.time" />
    <CardCopySmall style="margin-top: -36px" :text="notification.text" />
   </q-item-section>

   <q-item-section side v-if="notification.followed">
    <q-btn
     size="xs"
     :label="follow_status"
     color="accent"
     @click.stop="follow_on"
    />
   </q-item-section>
  </q-item>
 </div>
</template>

<script>
import MessageTimeStamp from "../typography/MessageTimeStamp.vue";
import CardCopySmall from "../typography/CardCopySmall.vue";
import { mapState } from "vuex";
export default {
 name: "JoinedGroupNotification",
 props: ["notification"],
 data() {
  return {
   follow_status: "Follow Back"
  };
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  })
 },
 components: {
  MessageTimeStamp,
  CardCopySmall
 },
 mounted: function() {
  console.log(this.notification);
  this.checkStatus();
 },

 methods: {
  async checkStatus() {
   var col = this.$db.collection("user_relationships");
   var query = col.where("followed_by", "==", this.user.uid);
   await query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     if (doc.data().followed_to == this.notification.to) {
      this.follow_status = "Following";
     }
    });
   });
  },
  follow_on() {
   if (this.follow_status == "following") {
   } else {
    var userRef = this.$db.collection("user_relationships").doc();
    userRef.set({
     id: userRef.id,
     followed_by: this.user.uid,
     followed_to: this.notification.to,
     relationship_type: "following"
    });
    this.$db.collection("notifications").add({
     owner: this.user.uid,
     receiver: this.notification.to,
     status: "unread",
     to: this.user.uid,
     name: this.user.name,
     text: this.user.name + " has started following you",
     time: new Date().getTime(),
     avatar: this.user.avatar,
     flag: 3
    });
    this.follow_status = "Following";
   }
  }
 }
};
</script>
