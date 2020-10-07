<template>
 <!-- mobile menu -->
 <q-footer elevated>
  <q-tabs
   dense
   indicator-color="accent"
   active-color="accent"
   class="bg-white text-grey-5 shadow-2"
   v-model="selectedTab"
   switch-indicator
  >
   <q-route-tab icon="home" to="/home" exact />
   <q-route-tab icon="ion-ios-search" to="/search" exact />
   <q-tab class="q-mt-sm q-mb-sm" @click="clicked($event)" exact>
    <q-img
     style="height: 50px; width: 50px;"
     class="fithawkicon"
     src="statics//logos/fithawklogo.png"
    />
   </q-tab>
   <q-route-tab
    icon="ion-ios-notifications"
    name="notifications"
    to="/notifications"
    exact
   >
    <q-badge
     class="q-mr-md q-mt-md"
     v-if="this.unread > 0"
     color="accent"
     floating
     >{{ unread }}</q-badge
    >
   </q-route-tab>
   <q-route-tab
    icon="person"
    :to="{
     name: 'Profile',
     params: { id: this.$q.localStorage.getItem('user_id') }
    }"
   />
  </q-tabs>
 </q-footer>
</template>

<script>
export default {
 name: "Footer",
 props: ["image"],
 data() {
  return {
   selectedTab: "home"
   // unread: 0
  };
 },

 computed: {
  user() {
   //this.unreadNotification();
   return this.$store.getters["storage/getUserData"];
  },
  unread: {
   get() {
    return this.$store.state.notification.unread;
   },
   set(value) {
    this.$store.commit("notification/setValue", {
     key: "unread",
     value: value
    });
   }
  },

  notification_listener: {
   get() {
    return this.$store.state.notification.notification_listener;
   },
   set(value) {
    this.$store.commit("notification/setValue", {
     key: "notification_listener",
     value: value
    });
   }
  }
 },
 async created() {
  // This is LIVE NOTIFICATION method - Hamza zafar
  this.LiveNotificationCounter();
 },
 methods: {
  async LiveNotificationCounter() {
   let that = this;
   this.$fb.auth().onAuthStateChanged(function(notification) {
    var count = 0;
    that.$db
     .collection("notifications")
     .where("receiver", "==", that.$q.localStorage.getItem("user_id"))
     .where("status", "==", "unread")
     .onSnapshot(function(querySnapshot) {
      count = querySnapshot.docs.length;
      // querySnapshot.forEach(snapshot => {
      //  count++;
      // });
      that.unread = 0;
      that.unread = count;
     });
   });
  },
  unreadNotification() {
   let that = this;

   var col = this.$db
    .collection("notifications")
    .where("receiver", "==", this.$q.localStorage.getItem("user_id"))
    .where("status", "==", "unread");
   col.get().then(snapshot => {
    that.unread = snapshot.docs.length;
    return this.unread;
   });
  },
  clicked(flag) {
   this.$emit("click");
   return flag;
  },
  toProfile(id) {
   this.$router.push("/profile" + id);
  }
 }
};
</script>
