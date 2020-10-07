<template>
 <div>
  <q-carousel
   animated
   v-model="slide"
   arrows
   navigation
   infinite
   v-if="post.mediaUrls.length > 1"
  >
   <q-carousel-slide
    :name="index"
    :key="index"
    :img-src="url"
    v-for="(url, index) in post.mediaUrls"
    @click="detailView(index)"
   />
  </q-carousel>
  <q-dialog
   v-model="detail_prompt"
   persistent
   :maximized="true"
   transition-show="slide-up"
   transition-hide="slide-down"
  >
   <ImageDetail :images="post.mediaUrls" :slide="selectedIndex" />
  </q-dialog>
 </div>
</template>
<script>
import ImageDetail from "../../images/ImageDetail.vue";

export default {
 props: ["post"],
 components: {
  ImageDetail
 },
 data() {
  return {
   slide: 1,
   detail_prompt: false,
   selectedIndex: 0
   //images: [],
  };
 },
 methods: {
  check_url(url) {
   alert(url);
  },
  detailView(index) {
   this.detail_prompt = true;
   this.selectedIndex = index;
  }
 }
};
</script>
