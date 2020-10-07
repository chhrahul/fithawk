<template>
  <div class>
    <div class>
      <q-input
        name="Search"
        placeholder="Search"
        filled
        bg-color="white"
        type="search"
        v-model="text"
        class="search"
        @input="queryData(text)"
      ></q-input>
    </div>
    <UserProfileList v-if="loadMember" :data="members" />
  </div>
</template>
<script>
import UserProfileList from "../../../components/lists/UserProfileList.vue";

export default {
  name: "GroupMembers",
  components: {
    UserProfileList
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      members: [],
      isOwner: null,
      text: null,
      loadMember: false
    };
  },
  methods: {
    async init() {
      this.members = [];

      const doc = await this.$db
        .collection("groups")
        .doc(this.$route.params.id)
        .get();
      this.group = doc.data();

      if (this.group.ownerUID == this.$q.localStorage.getItem("user_id")) {
        this.isOwner = 1;
      }
      if (this.group.users) {
        const users = this.group.users.map(function(el) {
          return el.uid;
        });

        this.getUserList(users);
      }
    },
    queryData(value) {
      if (value) {
        this.members = [];
        var col = this.$db.collection("users");

        var query = col
          .orderBy("name")
          .startAt(value.toLowerCase())
          .endAt(value.toLowerCase() + "\uf8ff");
        query.get().then(snapshot => {
          this.users = [];
          snapshot.docs.forEach(doc => {
            var full_name = doc.data().name;
            var split_it = full_name.split(" ");
            var first_name = split_it[0];

            const member = {
              uid: doc.data().uid,
              avatar: doc.data().avatar
                ? doc.data().avatar
                : "https://cdn.quasar.dev/img/avatar.png",
              name: first_name,
              description: doc.data().description,
              isOwner: this.isOwner
            };
            //alert(JSON.stringify(member))
            if (this.group.users) {
              const users = this.group.users.map(function(el) {
                return el.uid;
              });

              if (users.indexOf(doc.data().uid) !== -1) {
                //alert("Value exists!")
                this.members.push(member);
              }
            }
          });
        });
      } else {
        this.init();
      }
    },
    getUserList(users) {
      const col = this.$db.collection("users");
      const query = col.where("uid", "in", users);
      query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          var full_name = doc.data().name;
          var split_it = full_name.split(" ");
          var first_name = split_it[0];
          //alert(this.isOwner)
          const member = {
            uid: doc.data().uid,
            avatar: doc.data().avatar
              ? doc.data().avatar
              : "https://cdn.quasar.dev/img/avatar.png",
            name: first_name,
            description: doc.data().description,
            isOwner: this.isOwner
          };
          this.members.push(member);
        });
        this.loadMember = true;
      });
    }
  }
};
</script>
