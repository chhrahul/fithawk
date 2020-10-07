<template>
 <q-page class="inviteuser">
  <q-input
   name="Search"
   placeholder="Search"
   filled
   bg-color="white"
   type="search"
   v-model="text"
   class="search"
   @focus="isSearching = true"
   @input="queryData(text)"
  >
   <template v-slot:append v-if="isSearching == true">
    <q-icon name="close" @click="closeSearchBar()" class="cursor-pointer" />
   </template>
  </q-input>
  <InviteUserList :data="users" />
 </q-page>
</template>
<style lang="stylus">
.inviteuser {
  margin-top: -50px;

  .search {
    border-radius: 6px;
    padding: 10px 20px 10px 20px;
    margin: 0 3%;
    outline: none;
    border: none;
    width: 95%;
    -webkit-transition: width 0.3s ease-in-out, margin 0.3s ease-in-out, top 0.3s ease-in-out;
    transition: width 0.3s ease-in-out, margin 0.3s ease-in-out, top 0.3s ease-in-out;
  }

  .search:focus {
    margin: 0 5px;
    margin-top: 10px;
  }
}
</style>
<script>
import InviteUserList from "../../../components/lists/InviteUserList.vue";
export default {
 name: "InviteUser",
 data() {
  return {
   text: "",
   isSearching: false,
   users: []
  };
 },
 computed: {
  myInfo() {
   return this.$store.getters["storage/getUserData"];
  }
 },
 components: {
  InviteUserList
 },
 mounted() {
  this.isSearching = true;
  let header = document.querySelector("header");
  header.classList.add("hidden");
 },
 destroyed() {
  let header = document.querySelector("header");
  header.classList.remove("hidden");
 },
 methods: {
  queryData(value) {
   this.users = [];
   var col = this.$db.collection("users");

   var query = col
    .orderBy("name")
    .startAt(value.toLowerCase())
    .endAt(value.toLowerCase() + "\uf8ff");
   query.get().then(snapshot => {
    this.users = [];
    snapshot.docs.forEach(doc => {
     const data = doc.data();
     data["flag"] = false;
     if (doc.id !== this.$q.localStorage.getItem("user_id"))
      this.users.push(data);
    });
   });
  },
  closeSearchBar() {
   this.isSearching = false;
  }
 }
};
</script>
