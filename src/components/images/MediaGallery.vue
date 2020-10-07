
<template>
 <div class="row main_row">
  <div class="col-4  photo_grid_class" v-for="(item, id) in data" :key="id">
   <img class="main_img" :src="item.img" @click="detailView(id)" />
  </div>

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
 components: {
  ImageDetail
 },
 props: ["data","openslideshow"],
 data() {
  return {
   slide: 1,
   detail_prompt: false,
   selectedIndex: 0
  }
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
