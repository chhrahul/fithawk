<template>
 <div v-if="groups.length > 0">
  <q-select
   filled
   @input="input"
   :value="value"
   :options="groups"
   :display-value="group ? group.label : 'Select Group'"
  />
 </div>
</template>
<script>
export default {
 props: {
  value: {
   default: null,
   type: String
  },
  placeholder: {
   default: null,
   type: String
  },
  showAll: {
   default: true,
   type: Boolean
  }
 },
 data() {
  return {
   groups: [],
   inGroupList: [],
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
   this.$emit("change", val.label);
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
   if (data) {
    if (data.users) {
     const findMe = data.users.filter(el => {
      return el.uid === this.$q.localStorage.getItem("user_id");
     });
     if (findMe.length > 0) {
      const name = data.name;
      this.groups.push({
       value: doc.id,
       label: name
      });
     }
    }
   }
  }
  /*
    async getInGroup(user_id) {
      var groupList = [];
      var item = null;
      var snapshot1 = await this.$db.collection("groups").get();
      snapshot1.docs.forEach(doc => {
        if (!this.showAll) {
          var foundMe = null;
          if (doc.data().users) {
            foundMe = doc.data().users.find(function(el) {
              return el.uid == user_id;
            });
          }
          if (foundMe) {
            item = {
              id: doc.id,
              data: doc.data()
            };
            groupList.push(item);
          } else {
            if (doc.data().owner == user_id) {
              item = {
                id: doc.id,
                data: doc.data()
              };
              groupList.push(item);
            }
          }
        } else {
          item = {
            id: doc.id,
            data: doc.data()
          };
          groupList.push(item);
        }
      });
      return groupList;
    }
    */
 }
};
</script>
