<template>
 <div>
  <div>
   <q-item style="padding: none;">
    <q-item-section>
     <q-avatar size="7em">
      <img
       v-if="imagepath != '/statics/logos/fithawklogo.png'"
       :src="imagepath"
      />
      <img v-else :src="imagepath" class="profileLogo" />
     </q-avatar>
     <SectionHeader class="q-mt-sm onyx" :text="name" />
    </q-item-section>

    <q-item-section style="margin-top: -55px">
     <div class="row">
      <div class="col-6">
       <SectionHeader class=" onyx" text="Following" />
       <center>
        <SectionHeader
         class=" onyx"
         :text="this.follow_logic.following_counter || 0"
        />
       </center>
      </div>
      <div class="col-6">
       <SectionHeader class=" onyx" text="Followers" />
       <center>
        <SectionHeader
         class=" onyx"
         :text="this.follow_logic.following || 0"
        />
       </center>
      </div>
     </div>
    </q-item-section>

   </q-item>

   <SubTitle class="onyx q-ml-md q-mr-md " :text="description" />
  </div>
  <div
   v-if="$route.params.id != this.$q.localStorage.getItem('user_id')"
   class="q-mt-lg snow q-gutter-md "
   style="padding-left: 25px; display:inline-block"
  >
   <q-btn
    class="drab europa-light"
    size="sm"
    @click="initChat"
    rounded
    label="Chat"
   />
   <template>
    <q-btn
     v-if="!invited"
     class="drab europa-light"
     size="sm"
     rounded
     label="Invite"
     @click="showPopup()"
    />
    <q-btn
     v-if="invited"
     class="drab europa-light"
     size="sm"
     rounded
     label="Invited"
     @click="showPopup()"
    />
   </template>
   <template v-if="user_relation_uids == 0">
    <q-btn-dropdown
     split
     class="drab europa-light"
     size="sm"
     rounded
     label="Follow"
     @click="follow_on()"
    >
     <q-list class="drab snow" separator>
      <q-item dense clickable v-close-popup @click="blockUser()">
       <q-item-label class="europa-light">Block</q-item-label>
      </q-item>

      <q-item dense clickable v-close-popup @click="report()">
       <q-item-label class="europa-light">Report</q-item-label>
      </q-item>
     </q-list>
    </q-btn-dropdown>
   </template>
   <template v-else>
    <q-btn-dropdown split class="drab" size="sm" rounded label="Following">
     <q-list class="drab snow" separator>
      <q-item dense clickable v-close-popup @click="unfollow()">
       <q-item-label class="europa-light">Unfollow</q-item-label>
      </q-item>

      <q-item
       dense
       clickable
       v-close-popup
       @click="blockUser($route.params.id)"
      >
       <q-item-label class="europa-light">Block</q-item-label>
      </q-item>
     </q-list>
    </q-btn-dropdown>
   </template>
  </div>

  <div
   v-if="$route.params.id == this.$q.localStorage.getItem('user_id')"
   class="col-6 q-mt-xl"
  ></div>
  <q-dialog v-model="groupSelectPopup">
   <SelectGroupComponent @input="invite" />
  </q-dialog>
 </div>
</template>

<script>
import SectionHeader from "../../typography/SectionHeader.vue";
import SubTitle from "../../typography/SubTitle.vue";
import Vue from "vue";
import vBlur from "v-blur";
import { mapState } from "vuex";
import SelectGroupComponent from "../../modals/SelectGroup.vue";
Vue.use(vBlur);
export default {
 name: "ProfileCard",
 props: [
  "name",
  "location",
  "description",
  "id",
  "imagepath",
  "profileId",
  "currentUserId"
 ],
 components: {
  SectionHeader,
  SubTitle,
  SelectGroupComponent
 },
 computed: {
  hisProfile() {
   return this.$q.localStorage.getItem("user_id") == this.id;
  },
  ...mapState({
   user: state => state.storage.user
  })
 },
 data() {
  return {
   user_relation_uids: 0,
   group: null,
   groups: [],
   blurConfig: {
    isBlurred: true,
    opacity: 0.3,
    filter: "blur(1.8px)",
    transition: "all .3s linear"
   },
   follow: {
    followed_by: null,
    followed_to: null
   },
   follow_logic: {
    following: null,
    following_counter: null
   },
   noBlurConfig: {
    isBlurred: false
   },
   groupSelectPopup: false,
   invited: false,
   invitedKey: -12000
  };
 },
 mounted(){
     //alert("called")
     this.checkFollowing();
     this.showFollowing();
     this.showFollowers();
 },
 methods: {
  showPopup() {
   this.groupSelectPopup = true;
  },
  blockUser() {
   this.$q.notify("This Feature is coming soon!");
  },
  report() {
   this.$q.notify("This Feature is coming soon!");
  },
  async follow_on() {
   this.follow.followed_by = this.$q.localStorage.getItem("user_id");
   this.follow.followed_to = this.$route.params.id;
   var eventRef = this.$db.collection("user_relationships").doc();
   eventRef.set({
    id: eventRef.id,
    followed_by: this.follow.followed_by,
    followed_to: this.follow.followed_to,
    relationship_type: "following"
   });
      this.checkFollowing();
      this.showFollowers();
   await this.$db.collection("notifications").add({
    owner: this.user.uid,
    receiver: this.$route.params.id,
    status: "unread",
    to: this.user.uid,
    name: this.user.name,
    text: this.user.name + " has started following you",
    time: new Date().getTime(),
    followed: 1,
    avatar: this.user.avatar
     ? this.user.avatar
     : "https://cdn.quasar.dev/img/boy-avatar.png",
    flag: 3
   });

   // this.follow_logic.following = 1;
   // this.follow_logic.following_text = "Followers";
   // this.follow_logic.following_counter++;
  },
  checkFollowing(){
   // return true if a follower else false
      this.user_relation_uids = 0
      var query = this.$db.collection('user_relationships')
          .where('followed_by', '==', this.$q.localStorage.getItem('user_id'))
          .where('followed_to', '==', this.$route.params.id)
          .get().then(snapshot => {
              // alert(snapshot.docs.length)
              this.user_relation_uids = snapshot.docs.length;
              console.log(snapshot.docs.length)
              // snapshot.docs.forEach(doc => {
              //     this.user_relation_uids.push(doc.data().followed_to);
              // });
          })
  },
  countFollowing(id){
      var query = this.$db.collection("user_relationships");
      query.where("followed_by", "==", id)
          .get().then(snapshot =>{
          // alert(snapshot.docs.length)
          this.follow_logic.following_counter = snapshot.docs.length
      })
  },
  countFollower(id){
      var query = this.$db.collection("user_relationships");
      query.where("followed_to", "==", id)
          .get().then(snapshot =>{
          // alert(snapshot.docs.length)
          this.follow_logic.following = snapshot.docs.length
      })
  },
  async showFollowers(){
      if(this.$q.localStorage.getItem("user_id") == this.$route.params.id){
          // Logged in user FOLLOWERS
          this.countFollower(this.$q.localStorage.getItem("user_id"))
      }else {
          // Others FOLLOWER
          this.countFollower(this.$route.params.id)
      }
  },
  async showFollowing(){
      if(this.$q.localStorage.getItem("user_id") == this.$route.params.id){
          // Logged in user FOLLOWING
          this.countFollowing(this.$q.localStorage.getItem("user_id"))
      }else {
              // Others FOLLOWING
              this.countFollowing(this.$route.params.id)
          }
  },
  async unfollow() {
   var col = this.$db.collection("user_relationships");
   var query = col
    .where("followed_to", "==", this.$route.params.id)
    .where("followed_by", "==", this.$q.localStorage.getItem("user_id"));
   query.get().then(snapshot => {
    if (snapshot.docs.length > 0) {
     this.$db
      .collection("user_relationships")
      .doc(snapshot.docs[0].id)
      .delete();
        this.checkFollowing();
        this.showFollowers();
     // this.follow_logic.following = null;
     // this.follow_logic.following_counter--;
    }
   });
  },
  async invite(event) {
   this.groupSelectPopup = false;
   let group_name = event.name;
   const group_id = event.id;
   await this.$db.collection("notifications").add({
    owner: this.$q.localStorage.getItem("user_id"),
    receiver: this.id,
    status: "unread",
    group: group_name,
    group_id: group_id,
    to: group_id,
    name: this.user.name,
    text: this.user.name + " has invited you to " + group_name,
    time: new Date().getTime(),
    accepted: false,
    avatar: this.user.avatar
     ? this.user.avatar
     : "https://cdn.quasar.dev/img/boy-avatar.png",
    flag: 6
   });
   this.$q.notify({
    classes: "text-weight-bold text-center",
    color: "primary",
    message: `Successfully invited ${this.user.name}`
   });
   this.invited = true;
  },
  initChat() {
   // Query all the chats that the current user (you) are in
   this.$db
    .collection("messages")
    .where("type", "==", "private")
    .where("members", "array-contains", this.currentUserId)
    .get()
    .then(querySnapshot => {
     console.log(querySnapshot);
     // If you there is no chats that you are part of, init a new chat
     if (querySnapshot.empty) {
      this.initNewChat();
     } else {
      // Return an array of all the chats that you are in
      return querySnapshot.docs.map(doc => doc.data());
     }
    })
    .then(documents => {
     console.log(documents);
     // Filters the chat to see if the other user is in a chat with you. Should only return 1 result.
     const result = documents.filter(doc =>
      doc.members.includes(this.profileId)
     );
     //console.log(result)
     if (result.length === 1) {
      // Go to the existing chat
      this.$router.push("/messages/chat/" + result[0].channelId);
     } else if (result.length === 0) {
      // If there is no result, init a new chat
      this.initNewChat();
     } else {
      // result has more that 1 result and error has been thrown. Should NOT happen.
      throw new Error("Error, too many chat inits");
     }
    })
    .catch(err => console.log(err));
  },
  initNewChat() {
   let channelInfo = {
    type: "private",
    channelId: "",
    members: [this.profileId, this.currentUserId],
    created: Date.now()
   };

   this.$db
    .collection("messages")
    .add(channelInfo)
    .then(docRef => {
     // sets the channelId after init
     this.$db
      .collection("messages")
      .doc(docRef.id)
      .set(
       {
        channelId: docRef.id
       },
       { merge: true }
      );

     // After chat has been init, push to the chat page
     this.$router.push("/messages/chat/" + docRef.id);
    })
    .catch(err => {
     console.log(err);
    });
  }
 }
};
</script>
<style></style>
