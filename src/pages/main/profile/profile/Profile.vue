<template>
 <div>
  <div>
   <ProfileCard
    :name="this.user.name"
    :location="this.user.zipCode"
    :description="this.user.description"
    :imagepath="this.user.imagePath"
    :id="this.id"
    :profileId="this.profileId"
    :currentUserId="this.currentUserId"
   />
  </div>
  <div @click="seeallmedia()" >
   <TitleLink
    class="onyx"
    :text="this.user.name + '\'s' + ' Photos'"
    icon="chevron_right"
    style="margin-bottom: -20px"
   />
   <MediaGalleryImageList class="q-mt-sm" :data="galleryimagelist" />
  </div>
  <q-separator />
  <TitleLink
   class="onyx"
   :text="this.user.name + '\'s' + ' Activity'"
   style="margin-bottom: -20px"
  />
  <q-list
   class="rounded-borders q-ma-md"
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
</template>

<script>
import ProfileCard from "../../../../components/shared/cards/ProfileCard.vue";
import PostDisplay from "../../../../components/shared/PostDisplay.vue";
import TitleLink from "../../../../components/typography/TitleLink.vue";
import MediaGalleryImageList from "../../../../components/images/MediaGallery.vue";

export default {
 name: "ProfileView",
 components: {
  ProfileCard,
  TitleLink,
  PostDisplay,
  MediaGalleryImageList
 },
 data() {
  return {
   isOtherProfile: false,
   id: this.$route.params.id,
   profileId: '',
   currentUserId: '',
   user: {
    name: null,
    zipCode: null,
    description: null,
    imagePath: null,
    location: null
   },
   posts: [],
   friends: [],
   galleryimagelist: []
  };
 },
 created() {
  this.getPosts();
  this.isOtherProfile = this.isOther();
  this.profile = this.getProfile();
  this.currentUserId = this.$q.localStorage.getItem("user_id");
  this.profileId = this.$route.params.id;
 },
 methods: {
  seeallmedia() {
   this.$router.push("/seeallmedia/" + this.$route.params.id);
  },
  getPosts() {
   var col = this.$db.collection("posts");
   var query = col.where("uid", "==", this.id).where("personal", "==", true);
   query.get().then(snapshot => {
    var i = 0;
    snapshot.docs.forEach(doc => {
     doc.data().mediaUrls.forEach(doci => {
      //alert(doci);
      //alert(i)
      if (i < 6) {
       //alert(doci);
       this.galleryimagelist.push({ img: doci });
      }
      i++;
     });

     this.posts.push(doc.data());
    });
   });
  },
  isOther() {
   if (this.id == this.$q.localStorage.getItem("user_id")) {
    return false;
   } else {
    return true;
   }
  },
  getProfile() {
   var profileRef = this.$db.collection("users").doc(this.id);
   profileRef.get().then(doc => {
    this.user.name = doc.data().name;
    //alert(doc.data().description)
    this.user.description = doc.data().description;
    this.user.imagePath = doc.data().avatar;
    var that = this;
   });
  }
 }
};
</script>
