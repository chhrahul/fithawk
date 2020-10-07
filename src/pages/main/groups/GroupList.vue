<template>
 <div class="ice">
  <q-tabs
   v-model="tab"
   dense
   class="onyx ice q-pl-lg q-pr-lg q-mt-sm"
   active-color="accent"
   indicator-color="secondary"
   align="justify"
  >
   <q-tab name="my-groups" label="My Groups" />
   <q-tab name="joined-groups" label="Joined Groups" />
  </q-tabs>

  <q-tab-panels
   v-model="tab"
   transition-prev="scale"
   transition-next="scale"
   animated
   style="background: none; margin-top: -15px"
  >
   <q-tab-panel name="my-groups">
    <q-list
     v-for="(group, key) in myOwnGroupList"
     class="q-ml-md q-mr-md q-mt-sm"
     :key="group.id"
    >
     <GroupListItem
      :key="key"
      :title="group.name"
      :text="group.category"
      :img="group.photo"
      :icon="group.isPivate"
      :count="group.users.length"
      :to="group.id"
     />
    </q-list>
   </q-tab-panel>

   <q-tab-panel name="joined-groups">
    <q-list
     v-for="(group, key) in joinedGroupList"
     class="q-ml-md q-mr-md q-ma-md q-mt-sm"
     :key="group.id"
    >
     <div>
      <GroupListItem
       :key="'join_' + key"
       :title="group.name"
       :text="group.category"
       :img="group.photo"
       :icon="group.isPivate"
       :to="group.id"
       :count="group.users.length"
      />
     </div>
    </q-list>
   </q-tab-panel>
  </q-tab-panels>
 </div>
</template>

<script>
import GroupListItem from "../../../components/items/GroupListItem.vue";

export default {
 name: "GroupList",
 components: {
  GroupListItem
 },
 data() {
  return {
   uid: this.$q.localStorage.getItem("user_id"),
   tab: "my-groups",
   groups: [],
   myOwnGroupList: [],
   joinedGroupList: [],
   group: null
  };
 },
 computed: {
  myInfo() {
   return this.$store.getters["storage/getUserData"];
  }
 },
 created() {
  this.init();
 },
 methods: {
  input(val) {
   this.$emit("input", val.value);
   this.group = val;
  },
  init() {
   this.$db
    .collection("groups")
    .get()
    .then(snap => {
     snap.docs.forEach(doc => {
      this.addGroup(doc);
     });
    });
  },
  addGroup(doc) {
   const data = doc.data();
   const ownerId = data.ownerUID;
   if (data) {
    if (data.users) {
     const findMe = data.users.filter(el => {
      return el.uid === this.$q.localStorage.getItem("user_id");
     });
     if (findMe.length > 0) {
      if (this.$q.localStorage.getItem("user_id") === ownerId) {
       if (!data["photo"])
        data["photo"] = "https://cdn.quasar.dev/img/parallax2.jpg";
       this.myOwnGroupList.push(data);
      } else {
       if (!data["photo"])
        data["photo"] = "https://cdn.quasar.dev/img/parallax2.jpg";
       this.joinedGroupList.push(data);
      }
     }
    }
   }
  }
 }
};
</script>
