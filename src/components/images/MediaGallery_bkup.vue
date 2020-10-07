<template>
 <div class="row main_row">
  
  <q-carousel
   animated
   v-model="slide"
   arrows
   navigation
   infinite
   style="width:100%"
  >
   <q-carousel-slide
    :name="index"
    :key="index"
    :img-src="item.img"
    v-for="(item, index) in data"
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
   
   <ImageDetail :images="data" :slide="selectedIndex" />
  </q-dialog>
   
  
 </div>
 
</template>

<script>
import ImageDetail from "../images/ImageDetailAll.vue";
export default {
 name: "MediaGalleryImageList",
 props: ["data"],
 components: {
  ImageDetail
 },
 data() {
  return {
   slide: 1,
   detail_prompt: false,
   selectedIndex: 0
  };
 },
 methods: {
  detailView(index) {
   this.detail_prompt = true;
   this.selectedIndex = index;
  }
 }
};
</script>
<style>
.main_img {
 width: 95%;
 height: 100px;
 border-radius: 7px;
}

.photo_grid_class .q-img__image.absolute-full {
 border-radius: 7px;
 width: 95%;
 object-fit: scale-down;
 background-size: 100px;
}
.col-4.photo_grid_class {
 margin: 3px 0px;
 background-size: 100px;
 object-fit: scale-down;
}
.main_row {
 padding: 10px 8px 10px 9.5px;
 border-radius: 5px;
 object-fit: scale-down;
 margin-left: 3px;
}
</style>
