<template>
 <div>
  <div
   align="center"
   style="margin-top:30px;"
   v-if="this.notifications.length == 0"
  >
   No Notifications
  </div>
  <q-list
   bordered
   style="background: white"
   v-for="(item, id) in notifications"
   :key="id"
  >
   <q-slide-item
    @left="deleteNotification($event, item)"
    @right="deleteNotification($event, item)"
    left-color="secondary"
    right-color="secondary"
   >
    <template v-slot:right>
     <q-icon name="delete" />
    </template>
    <template v-slot:left>
     <q-icon name="delete" />
    </template>
    <AcceptedToGroupNotification
     :group="item.group"
     :time="item.created_at"
     :to="item.to"
     v-if="item.flag == 1"
    />
    <EventNotification
     :group="item.group"
     :time="item.created_at"
     :event_time="item.event_time"
     :event_title="item.event_title"
     :event_date="item.event_date"
     :to="item.to"
     v-if="item.flag == 2"
    />
    <FollowedNotification :notification="item" v-if="item.flag == 3" />
    <JoinedGroupNotification
     v-if="item.flag == 4"
     :name="item.name"
     :group="item.group"
     :to="item.groupID"
     :time="item.created_at"
    />
    <RequestedToJoinNotification
     :name="item.name"
     :group="item.group"
     :time="item.created_at"
     :to="item.to"
     :notification="item"
     v-if="item.flag == 5"
    />
    <InvitedToJoinNotification
     :name="item.name"
     :group="item.group"
     :time="item.created_at"
     :to="item.to"
     :notification="item"
     v-if="item.flag == 6"
    />
    <PostCreatedNotification v-if="item.flag == 7" :notification="item" />
    <PostNotification
     v-if="item.flag == 8 || item.flag == 9"
     :notification="item"
    />
    <InvitedAcceptNotification v-if="item.flag == 10" :notification="item" />
   </q-slide-item>
  </q-list>
 </div>
</template>

<script>
import AcceptedToGroupNotification from "../../../components/notifications/AcceptedToGroupNotification";
import EventNotification from "../../../components/notifications/EventNotification";
import FollowedNotification from "../../../components/notifications/FollowedNotification";
import JoinedGroupNotification from "../../../components/notifications/JoinedGroupNotification";
import RequestedToJoinNotification from "../../../components/notifications/RequestedToJoinNotification";
import InvitedToJoinNotification from "../../../components/notifications/InvitedToJoinNotification.vue";
import PostCreatedNotification from "../../../components/notifications/PostCreatedNotification.vue";
import PostNotification from "../../../components/notifications/PostNotification.vue";
import InvitedAcceptNotification from "../../../components/notifications/InvitedAcceptNotification.vue";
import { mapState } from "vuex";

export default {
 name: "Notifications",
 components: {
  AcceptedToGroupNotification,
  EventNotification,
  FollowedNotification,
  JoinedGroupNotification,
  PostCreatedNotification,
  RequestedToJoinNotification,
  InvitedToJoinNotification,
  PostNotification,
  InvitedAcceptNotification
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  }),
  unread: {
   get() {
    return this.$store.state.notifications.unread;
   },
   set(value) {
    this.$store.commit("notification/setValue", {
     key: "unread",
     value: value
    });
   }
  },
  notifications: {
   get() {
    return this.$store.state.notification.notifications;
   },
   set(value) {
    this.$store.commit("notification/setValue", {
     key: "notifications",
     value: value
    });
   }
  }
 },
 data() {
  return {
   //orderby date showing newest when pulling from firebase
   group_ids: [],
   followed_users: []
  };
 },
 beforeMount() {
  //alert(JSON.stringify(this.$store.getters["storage/getUserData"]))
 },
 async created() {
  //this.init();
  //async init() {
  // Update status read
  var notification_snap = await this.$db
   .collection("notifications")
   .where("receiver", "==", this.$q.localStorage.getItem("user_id"))
   .where("status", "==", "unread")
   .get();
  notification_snap.docs.forEach(doc => {
   this.$db
    .collection("notifications")
    .doc(doc.id)
    .update({
     status: "read"
    });
  });

  // Show all related notification
  let that = this;
  var notification_snap1 = await this.$db
   .collection("notifications")
   .where("receiver", "==", this.$q.localStorage.getItem("user_id"))
   .orderBy("time", "desc")
   .get();
  // First flash all the list and then push
  this.notifications = [];
  notification_snap1.docs.forEach(doc => {
   that.notifications.push({ ...doc.data(), id: doc.id });
  });
 },
 methods: {
  async deleteNotification({ reset }, notification) {
   this.$q.notify("Notification deleted!");
   await this.$db
    .collection("notifications")
    .doc(notification.id)
    .delete();
   reset();
   var notification_snap1 = await this.$db
    .collection("notifications")
    .where("receiver", "==", this.$q.localStorage.getItem("user_id"))
    .orderBy("time", "desc")
    .get();
   //alert(notification_snap1.docs.length)

   // this.notificationCount = notification_snap1.docs.length
   this.notifications = this.notifications.filter(
    a => a.id !== notification.id
   );
  }
 }
};
</script>
