<template>
 <q-card class="bg-black text-white image-detail">
  <q-bar class="q-mt-lg">
   <q-space />
   <q-btn dense flat icon="close" v-close-popup>
    <q-tooltip content-class="bg-white text-primary ">Close</q-tooltip>
   </q-btn>
  </q-bar>

  <q-card-section>
   <center>
    <q-carousel
     animated
     v-model="slideIndex"
     swipeable
     navigation
     infinite
     :style="style"
    >
     <q-carousel-slide
      v-for="(img, index) in images"
      :name="index"
      :img-src="img"
      :key="index + ' image'"
     />
    </q-carousel>
   </center>
  </q-card-section>
 </q-card>
</template>
<style>
.q-bar .q-icon {
 font-size: 30px !important;
}
</style>
<script>
export default {
 name: "ImageDetail",
 props: ["images", "slide"],
 data() {
  return {
   slideIndex: this.slide
  };
 },
 computed: {
  style() {
   var marginTop = (screen.height - 400) / 2 - 80;
   return `margin-top:${marginTop}px;`;
  }
 }
};
</script>
