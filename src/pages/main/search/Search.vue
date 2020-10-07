<template>
 <div>
  <DoubleHeaderSeparator
   primaryText="Discover"
   primarySubText="Activities"
   secondarySubText="Discover fun new activities below:"
   style="margin-top: -10px"
   class="snow sage"
   v-show="isSearching == false"
  />

  <div class="search-bar" v-if="isSearching == false" />

  <div class="row full-search-box ">
   <q-input
    name="Search"
    placeholder="Search"
    outlined
    bg-color="white"
    type="search"
    v-model="text"
    class="search"
    @input="queryData(text)"
    @focus="isSearchingHandlerTrue()"
   >
    <template v-slot:append v-if="isSearching == true">
     <div class="search-icon">
      <q-icon
       name="search"
       @click="closeSearchBar()"
       class="cursor-pointer icon"
      />
     </div>
    </template>
   </q-input>
  </div>

  <Featured v-show="isSearching == false" />

  <q-tabs
   v-model="tab"
   dense
   class="font-size: 17px;"
   no-caps
   active-color="secondary"
   indicator-color="secondary"
   align="justify"
   narrow-indicator
   v-if="isSearching == true"
  >
   <q-tab name="users" label="Users" />
   <q-tab name="groups" label="Groups" />
   <q-tab name="categories" label="Categories" />
  </q-tabs>

  <q-tab-panels v-model="tab" animated>
   <q-tab-panel name="users" v-if="users.length > 0">
    <UserProfileList :data="users" />
   </q-tab-panel>

   <q-tab-panel name="groups" v-if="groups.length > 0">
    <q-list v-for="(item, id) in groups" :key="id">
     <GroupListItem
      :title="item.name"
      :text="item.category"
      :img="item.photo"
      :to="item.id"
      :count="item.users"
     />
    </q-list>
   </q-tab-panel>

   <q-tab-panel name="categories">
    <CategoryList />
   </q-tab-panel>
  </q-tab-panels>
 </div>
</template>

<script>
import DoubleHeaderSeparator from "../../../components/typography/DoubleHeaderSeparator.vue";
import UserProfileList from "../../../components/lists/UserProfileList.vue";
// import GroupSearchList from "../../../components/lists/GroupSearchList.vue";
import Featured from "../../../components/search/Featured.vue";
import GroupListItem from "../../../components/items/GroupListItem.vue";
export default {
 name: "Search",
 components: {
  DoubleHeaderSeparator,
  Featured,
  UserProfileList,
  //GroupSearchList,
  GroupListItem
 },
 data() {
  return {
   isSearching: true,
   text: "",
   tab: "users",
   users: [
    {
     avatar: null,
     name: null
    }
   ],
   groups: [
    {
     avatar: null,
     name: null
    }
   ]
  };
 },
 created() {
  this.queryData(this.text);
 },
 methods: {
  isSearchingHandlerTrue() {
   this.isSearching = true;
  },
  closeSearchBar() {
   this.isSearching = true;
  },
  getQuery(col, value) {
   let query;
   if (value.length > 0) {
    query = col
     .orderBy("name")
     .startAt(value.toLowerCase())
     .endAt(value.toLowerCase() + "\uf8ff");
   } else {
    query = col.orderBy("name").limit(10);
   }
   return query;
  },
  queryData(value) {
   switch (this.tab) {
    case "users": {
     this.users = [];
     var col = this.$db.collection("users");

     let query = this.getQuery(col, value);
     query.get().then(snapshot => {
      this.users = [];
      snapshot.docs.forEach(doc => {
       this.users.push(doc.data());
      });
     });
     break;
    }
    case "groups": {
     this.groups = [];
     var col1 = this.$db.collection("groups");
     let query1 = this.getQuery(col1, value);
     query1.get().then(snapshot => {
      this.groups = [];

      snapshot.docs.forEach(doc => {
       this.groups.push(doc.data());
      });
     });
     break;
    }
    case "categories":
     break;
   }
  }
 },
 watch: {
  tab() {
   this.queryData(this.text);
  }
 }
};
</script>

<style scoped>
.search-icon {
 color: white;
 width: 59px;
 height: 54px;
 margin-right: -11px;
 background: #d97d54;
 border-radius: 0px 3px 3px 0;
 margin-top: 0.99px;
 margin-bottom: 0.99px;
}
.icon {
 margin-left: 19px;
 margin-top: 17px;
}
.search-bar {
 border-radius: 5px;
 margin-top: -25px;
 padding-top: -5px;
 margin-bottom: -5px;
}

.search {
 padding: 10px 20px 10px 20px;
 margin: 0 3%;
 outline: none;
 border: none;
 width: 95%;
 -webkit-transition: width 0.3s ease-in-out, margin 0.3s ease-in-out,
  top 0.3s ease-in-out;
 transition: width 0.3s ease-in-out, margin 0.3s ease-in-out,
  top 0.3s ease-in-out;
}

.search:focus {
 width: 70%;
 margin: 0 5px;
 margin-top: 10px;
}

input[type="search"]::-webkit-search-cancel-button {
 -webkit-appearance: searchfield-cancel-button;
}
</style>
