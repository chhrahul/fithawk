<!-- NOTIFICATION FLAG = 6 -->
<template>
 <div>
  <q-item clickable @click="$router.push('/group/' + to)">
   <q-item-section top avatar>
    <q-avatar
     class="q-mt-sm"
     size="4em"
     color="primary"
     text-color="white"
     icon="bluetooth"
    />
   </q-item-section>

   <q-item-section>
    <q-item-label
     ><q-item-label class="q-mb-xs rift-light" caption>{{ time }}</q-item-label>
     <span class="europa-bold"> {{ name }} </span>
     <span class="europa-regular">invited you to join </span>
     <span class="europa-bold">{{ group }} </span></q-item-label
    >
   </q-item-section>

   <q-item-section side>
    <q-btn
     class="q-mb-sm"
     size="sm"
     color="accent"
     label="accept"
     @click.stop="approve($event)"
    />
    <q-btn
     size="sm"
     color="secondary"
     label="decline"
     @click.stop="decline($event)"
    />
   </q-item-section>
  </q-item>
 </div>
</template>

<script>
import { mapState } from "vuex";
export default {
 name: "RequestedToJoinNotification",
 props: ["name", "group", "time", "to", "notification"],
 computed: {
  ...mapState({
   user: state => state.storage.user
  }),
  notifications: {
   get() {
    return this.$store.state.notification.notifications;
   },
   set(value) {
    this.$store.commit("notification/setValue", {
     key: "notifications",
     value: value
    });
   }
  }
 },
 methods: {
  async approve(flag) {
   let that = this;
   let users = [];
   let snap = await this.$db
    .collection("groups")
    .where("id", "==", this.notification.group_id)
    .get();
   snap.docs.forEach(doc => {
    users = doc.data().users;
    users.push({
     role: "user",
     uid: that.notification.receiver
    });
    that.$db
     .collection("groups")
     .doc(that.notification.group_id)
     .update({
      users: users
     });
   });

   users
    .filter(a => a.uid !== this.notification.receiver)
    .forEach(user => {
     this.$db.collection("notifications").add({
      read: false,
      text: that.user.name + " has joined the group " + that.notification.group,
      to: that.user.uid,
      flag: 10,
      receiver: user.uid,
      status: "unread",
      owner: that.user.uid,
      avatar: that.user.avatar
       ? that.user.avatar
       : "https://cdn.quasar.dev/img/boy-avatar.png"
     });
    });
   this.$db
    .collection("notifications")
    .doc(that.notification.id)
    .delete();
   this.notifications = this.notifications.filter(
    a => a.id !== this.notification.id
   );
   return flag;
  },
  async decline() {
   this.$db
    .collection("notifications")
    .doc(this.notification.id)
    .delete();
   this.notifications = this.notifications.filter(
    a => a.id !== this.notification.id
   );
   this.$forceUpdate();
  }
 }
};
</script>
