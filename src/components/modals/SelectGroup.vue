<template>
 <q-card v-if="groups.length > 0" style="width:90vw">
  <q-card-section>
   <select-group @input="inviteId" @change="inviteName" />
  </q-card-section>
  <q-card-actions align="center">
   <GlobalPillButtonInverted no-caps label="Invite" @click="sendInvite" />
  </q-card-actions>
 </q-card>
</template>
<script>
import GlobalPillButtonInverted from "../shared/buttons/GlobalPillButtonInverted.vue";
import SelectGroup from "../shared/selects/SelectGroup.vue";
export default {
 props: ["value", "placeholder"],
 data() {
  return {
   group_names: [],
   groups: [],
   label: "Select Group",
   selected_group: "Select Group",
   group: null,
   invite_group_name: null,
   invite_group_id: null
  };
 },
 computed: {
  myInfo() {
   return this.$store.getters["storage/getUserData"];
  }
 },
 components: {
  GlobalPillButtonInverted,
  SelectGroup
 },
 async created() {
  this.init();
 },
 methods: {
  inviteId(event) {
   this.invite_group_id = event;
   //     this.invite_group = event;
   //   this.$emit("input", event);
  },
  inviteName(event) {
   this.invite_group_name = event;
  },
  sendInvite() {
   const group = {
    id: this.invite_group_id,
    name: this.invite_group_name
   };
   if (group.id !== null && group.name !== null) this.$emit("input", group);
  },
  init() {
   this.$db
    .collection("groups")
    .get()
    .then(snap => {
     snap.docs.forEach(doc => {
      this.addGroup(doc);
     });
     this.group_names = this.groups.map(el => {
      return {
       label: el.name,
       id: el.id
      };
     });
    });
  },
  addGroup(doc) {
   const data = doc.data();
   if (data) {
    if (data.users) {
     const findMe = data.users.filter(el => {
      return el.uid === this.$q.localStorage.getItem("user_id");
     });
     if (findMe.length > 0) {
      this.groups.push({
       id: doc.id,
       name: data.name,
       data: data
      });
     }
    }
   }
  }
 }
};
</script>
