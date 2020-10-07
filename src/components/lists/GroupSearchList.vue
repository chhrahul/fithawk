<template>
 <div class="q-ma-xs">
  <q-list v-for="(item, id) in data" :key="id">
   <GroupItem :text="item.text" :title="item.title" :img="item.photo" />
  </q-list>
 </div>
</template>

<script>
import GroupItem from "../../components/items/GroupListItem.vue";
export default {
 name: "GroupSearchListItem",
 components: {
  GroupItem
 },
 props: ["data"],
 mounted: function() {
  console.log(" all data " + this.data);
 },
 methods: {
  checkFriend(followed_by) {
   if (followed_by == this.$q.localStorage.getItem("user_id")) {
    return true;
   } else {
    return false;
   }
  },
  gotoprofile(id) {
   const header = document.querySelector("header");
   header.classList.remove("hidden");
   this.$router.push("/group/" + id);
  }
 }
};
</script>
<style>
.q-img__content > div {
 position: absolute;
 padding: 16px;
 color: #fff;
 background: rgba(0, 0, 0, 0);
}
</style>
