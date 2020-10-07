<template>
 <div style="padding: 10px;">
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
   />
  </q-carousel>
  <q-img v-else :src="post.mediaUrls[0]" spinner-color="white" />
 </div>
</template>
<script>
export default {
 props: ["post"],
 data() {
  return {
   slide: 1
  };
 }
};
</script>
