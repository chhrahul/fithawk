<template>
 <div v-if="loading">
  <q-list v-for="(item, id) in data" :key="id">
   <q-item
    @click="gotoprofile(item.uid)"
    v-if="item.name != null"
    clickable
    v-ripple
   >
    <q-item-section avatar>
     <q-avatar size="3em">
      <q-img :src="item.avatar" />
     </q-avatar>
    
    </q-item-section>

    <q-item-section>
     <q-item-label class="europa-regular" lines="1">{{
      item.name
     }}</q-item-label>
     <q-item-label caption lines="2">
      <span class="europa-light">{{ item.description }}</span>
      <span v-if="checkFriend(item.uid)" side top class="q-ml-md europa-light"
       >Following</span
      >
     </q-item-label>
    </q-item-section>
   </q-item>
   <q-separator />
  </q-list>
 </div>
</template>

<script>
export default {
 name: "UserProfileListItem",
 props: ["data"],
 data() {
  return {
   user_relation_uids: [],
   loading: false
  };
 },
 computed: {
  checkFriend() {
   return uid => (this.user_relation_uids.indexOf(uid) > -1 ? true : false);
  }
 },
 created() {
  this.initUserRelations();
  console.log(this.data);
 },
 methods: {
  initUserRelations() {
   const data_uids = this.data.map(function(el) {
    return el.uid;
   });
   const col = this.$db.collection("user_relationships");
   const query = col
    .where("followed_by", "==", this.$q.localStorage.getItem("user_id"))
    .where("followed_to", "in", data_uids);
   query.get().then(snap => {
    snap.docs.forEach(doc => {
     this.user_relation_uids.push(doc.data().followed_to);
    });
    this.loading = true;
   });
  },

  gotoprofile(id) {
   this.$router.push("/profile/" + id);
  }
 }
};
</script>
