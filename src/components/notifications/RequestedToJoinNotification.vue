<!-- NOTIFICATION FLAG = 5 -->
<template>
 <div>
  <q-item clickable v-if="isAccepted != 1">
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
     <span class="europa-regular">requested to join </span>
     <span class="europa-bold">{{ group }} </span></q-item-label
    >
   </q-item-section>

   <q-item-section side>
    <q-btn
     class="q-mb-sm"
     size="sm"
     color="accent"
     label="Accept"
     @click="approve(notification)"
    />
    <q-btn
     label="Decline"
     size="sm"
     color="secondary"
     @click="confirm = true"
    />
    <q-dialog v-model="confirm" persistent>
     <q-card>
      <q-card-section class="row items-center">
       <span class="q-ml-sm"
        >Are you sure you want to decline this request ?</span
       >
      </q-card-section>

      <q-card-actions align="right">
       <q-btn flat label="No" color="primary" v-close-popup />
       <q-btn
        flat
        label="Yes"
        @click="decline(notification)"
        color="primary"
        v-close-popup
       />
      </q-card-actions>
     </q-card>
    </q-dialog>
   </q-item-section>
  </q-item>
 </div>
</template>

<script>
export default {
 name: "RequestedToJoinNotification",
 props: ["name", "group", "time", "to", "notification"],
 data() {
  return {
   isAccepted: null,
   confirm: false,
   member_update: []
  };
 },
 methods: {
  async approve(notification) {
   const col = this.$db.collection("groups");
   const query = col.where("id", "==", notification.groupID);
   await query.get().then(snapshot => {
    //I8iXIMfmuMZXzGycbjs1
    snapshot.docs.forEach(doc => {
     doc.data().users.forEach(doci => {
      //alert(doci.uid)
      this.member_update.push({ uid: doci.uid, role: "admin" });
     });
    });
   });

   var user_array = {
    uid: notification.sender,
    role: "admin"
   };
   this.member_update.push(user_array);
   // alert(JSON.stringify(this.member_update));
   // return
   this.$db
    .collection("groups")
    .doc(notification.groupID)
    .update({ users: this.member_update });

   var group_name = notification.name;
   var receiver = notification.sender;
   var notificationRef = this.$db.collection("notifications").doc();
   notificationRef.set({
    id: notificationRef.id,
    groupID: notification.groupID,
    name: this.$q.localStorage.getItem("name"),
    group: group_name,
    receiver: receiver,
    status: "unread",
    sender: this.$q.localStorage.getItem("user_id"),
    flag: "4",
    time: new Date().getTime()
   });
   this.$db
    .collection("notifications")
    .doc(notification.id)
    .delete()
    .then(function() {})
    .catch(function() {});
   this.$q.notify("Requested Acceped!");

   this.isAccepted = 1;
  },
  decline(notification) {
   this.$db
    .collection("notifications")
    .doc(notification.id)
    .delete()
    .then(function() {})
    .catch(function() {});
   this.$q.notify("Request Declined!");

   this.isAccepted = 1;
  }
 }
};
</script>
