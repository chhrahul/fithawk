<template>
 <div>
  <TitleLink
   class="onyx"
   :text="user.name + 's' + ' Photos'"
   style="margin-bottom: -20px"
  />
  <MediaGalleryImageList class="q-mt-sm" :data="galleryimagelist" :openslideshow="1" />
 </div>
</template>

<script>
import TitleLink from "../../../../components/typography/TitleLink.vue";
import MediaGalleryImageList from "../../../../components/images/MediaGallery.vue";

export default {
 name: "SeeAllMedia",
 components: {
  TitleLink,

  MediaGalleryImageList
 },
 data() {
  return {
   user: {
    name: null,
    zipCode: null,
    description: null,
    imagePath: null,
    location: null
   },
   galleryimagelist: [],
   id: this.$route.params.id
  };
 },
 created() {
  this.getPosts();
  this.getProfile();
 },
 methods: {
  getProfile() {
   var profileRef = this.$db.collection("users").doc(this.id);
   profileRef.get().then(doc => {
    this.user.name = doc.data().name;
    this.user.description = doc.data().description;
    this.user.imagePath = doc.data().avatar;
   });
  },
  getPosts() {
   var col = this.$db.collection("posts");
   var query = col.where("uid", "==", this.id);
   query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     doc.data().mediaUrls.forEach(doci => {
      this.galleryimagelist.push({ img: doci });
     });

     //this.posts.push(doc.data());
    });
   });
  }
 }
};
</script>
