<template>
 <div class="q-ml-lg q-mr-lg">
  <div class="q-pt-lg" align="center">
   Enter Group Code To Join The Group
  </div>
  <q-input filled v-model="joinCode" />
  <q-btn class="q-mt-lg" label="submit" @click="checkCode(joinCode)" />
  <q-dialog v-model="confirmGroup">
   <ConfirmJoinGroup :group="this.group" />
  </q-dialog>
 </div>
</template>
<!-- user enters join code and if it matches a group, show the group image and say join, back
if join then add user to the group and go to /home -->
<script>
import ConfirmJoinGroup from "../../../components/popups/ConfirmJoinGroup.vue";

export default {
 name: "JoinGroup",
 components: {
  ConfirmJoinGroup
 },
 data() {
  return {
   joinCode: null,
   confirmGroup: false,
   group: {}
  };
 },
 methods: {
  checkCode(code) {
   var col = this.$db.collection("groups");
   var query = col.where("code", "==", code);
   query.get().then(snapshot => {
    if (snapshot.docs.length < 1) {
     this.$q.notify("Code is invalid, please try another code.");
    }
    snapshot.docs.forEach(doc => {
     this.group = doc.data();
     this.confirmGroup = true;
    });
   });

   if (code == this.joinCode) {
    //show popup dlg
   } else {
    //sorry no match found
   }
  }
 }
};
</script>
