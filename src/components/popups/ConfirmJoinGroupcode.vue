<template>
 <div class="q-ml-md">
  <q-card>
   <q-card-section
    v-if="
     this.group.photo != '' &&
      this.group.photo != 'undefined' &&
      this.group.photo != undefined
    "
    class="row items-center"
   >
    <span class="q-ml-sm"><img :src="this.group.photo"/></span>
   </q-card-section>

   <q-card-section class="row items-center">
    <span class="q-ml-sm">Group Name: {{ group.name }}</span>
   </q-card-section>

   <q-card-section class="row items-center">
    <span class="q-ml-sm">Zip Code: {{ group.zipcode }}</span>
   </q-card-section>

   <q-card-section class="row items-center">
    <span class="q-ml-sm">Are you sure you want to join the group ?</span>
   </q-card-section>

   <q-card-actions align="right">
    <q-btn flat label="No" color="primary" v-close-popup />
    <q-btn
     flat
     label="Yes"
     @click="joingroup()"
     color="primary"
     v-close-popup
    />
   </q-card-actions>
  </q-card>
 </div>
</template>

<script>
export default {
 name: "ConfirmJoinGroup",
 props: ["group", "isongroup"],
 data() {
  return {
   member_update: [],
   isAlreadyMember: null
  };
 },
 methods: {
  async joingroup() {
   const col = this.$db.collection("groups");
   const query = col.where("id", "==", this.group.id);
   await query.get().then(snapshot => {
    //I8iXIMfmuMZXzGycbjs1
    snapshot.docs.forEach(doc => {
     doc.data().users.forEach(doci => {
      if (doci.uid == this.$q.localStorage.getItem("user_id")) {
       this.$q.notify("You are already in this group!");
       this.isAlreadyMember = 1;
      } else {
       this.member_update.push({ uid: doci.uid, role: "admin" });
      }
     });
    });
   });

   if (this.isAlreadyMember != 1) {
    var user_array = {
     uid: this.$q.localStorage.getItem("user_id"),
     role: "admin"
    };
    this.member_update.push(user_array);
    // alert(JSON.stringify(this.member_update));
    // alert(this.group.id)
    // return
    await this.$db
     .collection("groups")
     .doc(this.group.id)
     .update({ users: this.member_update });

     // Updating the messages document with the added users
    await this.$db
     .collection("messages")
     .doc(this.group.id)
     .update({ members: this.member_update.map(member => member.uid) });

    var notificationRef = this.$db.collection("notifications").doc();
    await notificationRef.set({
     id: notificationRef.id,
     groupID: this.group.id,
     name: this.$q.localStorage.getItem("name"),
     group: this.group.name,
     receiver: this.group.ownerUID,
     sender: this.$q.localStorage.getItem("user_id"),
     flag: "4",
     time: new Date().getTime()
     //zipcode: this.zipcode,
    });

    this.$q.notify("You have joined group " + this.group.name);
    //alert('done')
    location.reload();
    if (this.isongroup) {
     location.reload();
    } else {
     this.$router.push("/group/" + this.group.id);
    }
   }
   //alert(JSON.stringify(this.isAlreadyMember));

   this.isAccepted = 1;
  }
 }
};
</script>
