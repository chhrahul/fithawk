<template>
 <div class="">
  <GroupDetailCard
   :name="group.name"
   :zipcode="group.zipcode"
   :description="group.description"
   :src="group.photo"
   :key="detailKey"
  />

  <div
   v-if="
    this.isOwner == 1 &&
     this.group.code != '' &&
     this.group.code != undefined &&
     this.group.code != 'undefined'
   "
  >
   Group Code: {{ this.group.code }}
  </div>

  <div v-if="this.amIMember != 1 && this.requestSent != 1" align="center">
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="Join Group"
    @click="joingroup()"
   />
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="I have a group code"
    @click="groupcode = true"
   />
  </div>

  <div
   v-if="this.requestSent == 1 && this.isOwner != 1 && this.joinexist != 1"
   align="center"
  >
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="Request Sent To Join The Group"
   />
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="I have a group code"
    @click="groupcode = true"
   />
  </div>

  <div
   align="center"
   v-if="
    this.isOwner == 1 &&
     (this.group.code == '' ||
      this.group.code == undefined ||
      this.group.code == 'undefined')
   "
  >
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="Join Code"
    @click="joincode()"
   />
  </div>

  <div align="center" v-if="this.isOwner == 1">
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="Edit Group"
    @click="editgroup()"
   />
  </div>

  <div
   align="center"
   v-if="
    this.isOwner == 1 &&
     this.group.code != '' &&
     this.group.code != undefined &&
     this.group.code != 'undefined'
   "
  >
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="Recreate Join Code"
    @click="confirm = true"
   />
   <br />
   <q-btn
    style="background: white!important;"
    class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
    size="md"
    rounded
    label="Delete Join Code"
    @click="confirmremove = true"
   />
  </div>

  <q-dialog v-model="groupcode" persistent>
   <q-card>
    <q-card-section class="row items-center">
     <span class="q-ml-sm"
      ><q-input
       v-model="code"
       type="input"
       placeholder="Group Code..."
       float-label="Groupjoin"
       :max-height="100"
       rows="7"
     /></span>
    </q-card-section>

    <q-card-actions align="right">
     <q-btn flat label="No" color="primary" v-close-popup />
     <q-btn flat style="color: #90c1c4;" label="Yes" @click="checkCode(code)" />
     <q-dialog v-model="confirmGroup">
      <ConfirmJoinGroup :group="this.group" />
     </q-dialog>
    </q-card-actions>
   </q-card>
  </q-dialog>

  <q-dialog v-model="confirmremove" persistent>
   <q-card>
    <q-card-section class="row items-center">
     <span class="q-ml-sm">Are you sure you want to delete group code?</span>
    </q-card-section>

    <q-card-actions align="right">
     <q-btn flat label="No" color="primary" v-close-popup />
     <q-btn
      flat
      label="Yes"
      @click="removecode()"
      color="primary"
      v-close-popup
     />
    </q-card-actions>
   </q-card>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
   <q-card>
    <q-card-section class="row items-center">
     <span class="q-ml-sm"
      >This will delete existing group code, Are you sure you want to re-create
      new group code?</span
     >
    </q-card-section>

    <q-card-actions align="right">
     <q-btn
      flat
      label="No"
      class="custom_clsssss"
      color="primary"
      v-close-popup
     />
     <q-btn
      flat
      label="Yes"
      @click="joincode()"
      color="primary"
      v-close-popup
     />
    </q-card-actions>
   </q-card>
  </q-dialog>

  <div v-if="group.isPrivate == true && this.amIMember == 1">
   <div v-if="this.galleryimagelist != ''">
    <TitleLink
     class="onyx"
     :text="group.name + '\'s' + ' Photos'"
     link=""
     icon=""
     style="margin-bottom: -20px"
    />
    <MediaGalleryImageList class="q-mt-sm" :data="galleryimagelist" />
   </div>
   <div @click="allmembers()">
    <TitleLink class="onyx" :text="'Members'" icon="chevron_right" />
   </div>
   <q-list
    style="display: inline-block; overflow: auto;  white-space: nowrap; margin-top: -10px"
    horizonatal
    v-for="(item, key) in members"
    :key="key"
   >
    <ScrollableImageList
     :key="key"
     class="q-ml-sm"
     :img="item.img"
     :name="item.name"
     :id="item.id"
    />
   </q-list>
   <q-list
    class="rounded-borders q-mt-md q-mb-md q-mr-md"
    v-for="(post, key) in this.posts"
    :key="post.key"
   >
    <PostDisplay
     :key="key"
     :type="post.type"
     :avatar="post.avatar"
     :more="post.more"
     :name="post.owner ? post.owner.name : null"
     :group="post.group_name"
     :timestamp="post.created_at"
     :likeCount="post.likes.length"
     :commentCount="post.comments.length"
     :comments="post.comments"
     :text="post.text"
     doc="posts"
     :id="post.id"
     class="dropshadow"
     :media-urls="post.mediaUrls"
     :post="post"
    />
   </q-list>
  </div>

  <div v-if="group.isPrivate != true">
   <div v-if="this.galleryimagelist != ''">
    <TitleLink
     class="onyx"
     :text="group.name + '\'s' + ' Photos'"
     link=""
     icon=""
     style="margin-bottom: -20px"
    />
    <MediaGalleryImageList class="q-mt-sm" :data="galleryimagelist" />
   </div>
   <div @click="allmembers()">
    <TitleLink class="onyx" :text="'Members'" icon="chevron_right" />
   </div>
   <q-list
    style="display: inline-block; overflow: auto;  white-space: nowrap; margin-top: -10px"
    horizonatal
    v-for="(item, key) in members"
    :key="key"
   >
    <ScrollableImageList
     :key="key"
     class="q-ml-sm"
     :img="item.img"
     :name="item.name"
    />
   </q-list>
   <q-list
    class="rounded-borders real q-mt-md q-mb-md q-mr-md test"
    v-for="(post, key) in this.posts"
    :key="post.key"
   >
    <PostDisplay
     :key="key"
     :type="post.type"
     :avatar="post.avatar"
     :more="post.more"
     :name="post.owner ? post.owner.name : null"
     :group="post.group_name"
     :timestamp="post.created_at"
     :likeCount="post.likes.length"
     :commentCount="post.comments.length"
     :comments="post.comments"
     :text="post.text"
     doc="posts"
     :id="post.id"
     class="dropshadow"
     :media-urls="post.mediaUrls"
     :post="post"
    />
   </q-list>
   <div class="q-ml-md">
    <q-list
     style="display: inline-block; overflow: auto;  white-space: nowrap; margin-top: -10px"
     horizonatal
     v-for="(item, key) in members"
     :key="key"
    >
    </q-list>
    <q-list
     class="rounded-borders q-mt-md q-mb-md q-mr-md"
     v-for="(post, key) in this.posts"
     :key="post.key"
    >
     <PostDisplay
      :key="key"
      :type="post.mediaType"
      :avatar="post.mediaUrls[0]"
      :more="post.more"
      :name="post.name"
      :group="post.group_name"
      :timestamp="post.created_at"
      :likeCount="post.likes.length"
      :commentCount="post.comments.length"
      :text="post.text"
      class="dropshadow"
      v-if="post.personal == true"
     />
    </q-list>
   </div>
  </div>
 </div>
</template>

<script>
import GroupDetailCard from "../../../components/shared/cards/GroupDetailCard.vue";
import PostDisplay from "../../../components/shared/PostDisplay.vue";
import MediaGalleryImageList from "../../../components/images/MediaGallery.vue";
import TitleLink from "../../../components/typography/TitleLink.vue";
import ScrollableImageList from "../../../components/images/ScrollableCircleImageItem.vue";
import ConfirmJoinGroup from "../../../components/popups/ConfirmJoinGroupcode.vue";
export default {
 name: "ProfileView",
 components: {
  GroupDetailCard,
  MediaGalleryImageList,
  TitleLink,
  PostDisplay,
  ScrollableImageList,
  ConfirmJoinGroup
 },
 computed: {
  user() {
   return this.$store.getters["storage/getUserData"];
  }
 },
 data() {
  return {
   isOtherProfile: false,
   joinCode: null,
   confirmremove: false,
   groupcode: false,
   confirm: false,
   detailKey: -1100,
   zipcode: "",
   amIMember: null,
   requestSent: null,
   members: [],
   isOwner: null,
   user_isd: null,
   user_isd2: null,
   group_code: null,
   member_update: [],
   posts: [],
   code: null,
   confirmGroup: false,
   group_join: {},
   isongroup: null,
   joinexist: null,
   galleryimagelist: [],
   events: [
    {
     mediaUrls: null,
     more: null,
     name: null,
     group: null,
     created_at: null,
     mediaType: null,
     likes: null,
     comments: null,
     personal: null,
     text: null
    }
   ]
  };
 },
 mounted() {
  this.init();
 },
 methods: {
  checkCode(code) {
   //console.log(code);
   var col = this.$db.collection("groups");
   var query = col.where("code", "==", code);
   query.get().then(snapshot => {
    if (snapshot.docs.length < 1) {
     this.$q.notify("Code is invalid, please try another code.");
    }
    snapshot.docs.forEach(doc => {
     //doc.data()[0].alreadyongroup = 1;
     this.isongroup = 1;
     //console.log(doc.data());
     this.confirmGroup = true;
     this.group_join = doc.data();
     //console.log(doc.data().group_join);
    });
   });
   // console.log(code);
   if (code == this.code) {
    //4irw7m7y
    // this.confirmGroup = true;
    //alert("Request Sent Successfully");
   } else {
    // alert("Request not Sent Successfully");
   }
  },
  removecode() {
   var random_str = "";
   this.$db
    .collection("groups")
    .doc(this.$route.params.id)
    .update({ code: random_str });
   this.group.code = random_str;
   this.$q.notify("Join code is deleted successfully!");
  },
  async init() {
   this.checkNotificationSent();
   const doc = await this.$db
    .collection("groups")
    .doc(this.$route.params.id)
    .get();
   this.group = doc.data();
   this.group.users.forEach(doci => {
    if (doci.uid == this.$q.localStorage.getItem("user_id")) {
     this.joinexist = 1;
     // console.log(this.joinexist);
    }
   });
   //alert(JSON.stringify(this.group.ownerUID));
   // this.user_isd = this.group.ownerUID;
   //this.user_isd2 = this.$q.localStorage.getItem("user_id");
   if (this.group.ownerUID == this.$q.localStorage.getItem("user_id")) {
    this.isOwner = 1;
   }

   this.detailKey++;
   if (this.group.users) {
    const users = this.group.users.map(function(el) {
     return el.uid;
    });
    this.getUserList(users);
    this.getPost();
   }
  },
  rndStr() {
   let text =
    Math.random()
     .toString(36)
     .substring(2, 15) +
    Math.random()
     .toString(36)
     .substring(2, 15);
   text = text.substring(0, 8);
   return text;
  },
  editgroup() {
   this.$router.push("/edit-group/" + this.$route.params.id);
  },
  async joincode() {
   //alert(this.rndStr())
   var random_str = this.rndStr();
   this.$db
    .collection("groups")
    .doc(this.$route.params.id)
    .update({ code: random_str });
   this.group.code = random_str;
   this.$q.notify(random_str + " Join code is created successfully!");
  },
  allmembers() {
   //alert('ji')
   this.$router.push("/allgroupmembers/" + this.$route.params.id);
  },

  async joingroup() {
   const doc_1 = await this.$db
    .collection("groups")
    .doc(this.$route.params.id)
    .get();
   var group_name = doc_1.data().name;
   var receiver = doc_1.data().ownerUID;
   //alert(receiver)

   var notificationRef = this.$db.collection("notifications").doc();

   notificationRef.set({
    id: notificationRef.id,
    groupID: this.$route.params.id,
    name: this.$q.localStorage.getItem("name"),
    sender: this.$q.localStorage.getItem("user_id"),
    group: group_name,
    receiver: receiver,
    flag: "5",
    status: "unread",
    time: new Date().getTime()
    //zipcode: this.zipcode,
   });
   //console.log(notificationRef);
   //alert("Request Sent Successfully");
   this.$q.notify("Request Sent Successfully");

   this.requestSent = 1;
   //this.$router.push("/invite-users");
  },

  checkNotificationSent() {
   const col = this.$db.collection("notifications");

   const query = col
    .where("sender", "==", this.$q.localStorage.getItem("user_id"))
    .where("groupID", "==", this.$route.params.id)
    .where("flag", "==", "5");
   query.get().then(snapshot => {
    //I8iXIMfmuMZXzGycbjs1
    snapshot.docs.forEach(doc => {
     //alert(doc.id)
     if (doc.id) {
      this.requestSent = 1;
     }
    });
   });
  },
  getUserList(users) {
   const col = this.$db.collection("users");
   const query = col.where("uid", "in", users);
   query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     //alert(doc.data().uid)
     if (doc.data().uid == this.$q.localStorage.getItem("user_id")) {
      this.amIMember = 1;
     }

     var full_name = doc.data().name;
     var split_it = full_name.split(" ");
     var first_name = split_it[0];
     const member = {
      img: doc.data().avatar
       ? doc.data().avatar
       : "https://cdn.quasar.dev/img/avatar.png",
      name: first_name,
      id: doc.data().uid
     };
     this.members.push(member);
    });
   });
  },
  getPost() {
   const col = this.$db.collection("posts");
   const query = col.where("group", "==", this.$route.params.id);
   query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     //alert(JSON.stringify(doc.data()))
     this.posts.push(doc.data());
     doc.data().mediaUrls.forEach(im => {
      //alert(JSON.stringify(im))
      this.galleryimagelist.push({ img: im });
     });
    });
   });
  }
 }
};
</script>
