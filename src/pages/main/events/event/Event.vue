<template>
 <div class="q-mt-md">
  <q-card class="my-card"  style="box-shadow: none;">
   <img :src="this.event.mediaDownloadUrls[0]" />
   <div class="text-subtitle2 absolute-top text-left padding_text" style="padding: 15px 15px 11px;">
    <img style="float: left;width: 10%;"
     src="https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic889321?alt=media&token=e7d837de-81b2-433f-b3ab-9b68d3f389e0"
     @click="gotoevents()"
    />
   
    <div style="padding-left:50px;padding-top: 5px;font-size: 16px;">
     {{ this.event.title }}
     <br />
     <div class="small_font">
      <!--{{ this.event.location }}-->
     </div>
    </div>
   </div>
   <q-card-actions>
   <div class="calender_option" style="width:20%;padding-left: 8px;">
    <span class="months_dsgn">APR</span><br>
    <span class="days">04</span>
   </div>
   <div class="calender_desc" style="width:50%;padding: 7px 25px 0px;font-weight: 900;font-size: 16px;color: rgb(82, 83, 86)">
    {{ this.event.title }}
    <br />
     <div class="small_font" style="font-weight: 500;color: #434548;font-size: 13px;">
      {{ this.event.location }}
     </div>
   </div>
   <div class="calender_desc" style="width:30%;text-align: right;padding-right: 15px;">
    <img style="width: 40%;border: 2px solid #fff;border-radius: 38px;padding: 9px;margin-top: 10px;background: #fff;"
     src="https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic246989?alt=media&token=16ef38f1-1fc3-4413-9e66-776cbfe9ade7"
    />
   </div>
    <!--q-btn flat round color="red" icon="favorite" /-->
   </q-card-actions>
  </q-card>

  <q-card class="my-card" style="box-shadow: none;">
   <q-card-actions>
   <div class="calender_option" style="width:20%;padding-left: 8px;">
   
   </div>
  
   <div v-if="this.event.cost != '0'">
   <div class="calender_desc" style="width:100%;padding: 7px 24px 0px;color: #434548;">
   <span class="" style="font-size: 15px;">Tickets</span><br>
     <div class="small_font" style="color: rgb(82, 83, 86);font-weight: 900;font-size: 15px;">
      USD <b>{{ this.event.cost }} Onwards</b>
     </div>
   </div>
   </div>
   <div class="calender_desc" style="width:30%;text-align: right;padding-right: 15px;">
    
   </div>
    
   </q-card-actions>
  </q-card>
 <q-card>
   <q-card-section style="padding-left: 20px;color: #434548">
    {{ this.event.text }}
   </q-card-section>
  </q-card>
 
  <q-card>
   <q-card-section style="padding-left: 20px;">
   <span class="last_content" style="font-size: 16px;font-weight: 700;line-height: 2;color: rgb(82, 83, 86);">Bacon ipsum dolor amet beef.</span><br>
   <span class="last_content_two" style="color: #434548;">Bacon ipsum dolor amet venison picanha andouille</span>
   </q-card-section>
  </q-card>
  <MediaGalleryImageList class="q-mt-sm" :data="galleryimagelist" />
 
 </div>
    
 
</template>
<script>
import MediaGalleryImageList from "../../../../components/images/MediaGallery.vue";

export default {
 name: "ListEvents",
 components: {
  
  MediaGalleryImageList
 },
 data() {
  return {
    galleryimagelist:[
      { 
        img: 'https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic347875?alt=media&token=083af533-7511-4870-9790-aec09027ad28'
      },
      {
        img: 'https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic547792?alt=media&token=367777ed-d5a1-4aae-a9f2-7a359a741f11'
      },
      {
        img: 'https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic364170?alt=media&token=4d52a32f-aac1-48d5-906b-a5a08172de5b'
      },
      {
          img: 'https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic364170?alt=media&token=4d52a32f-aac1-48d5-906b-a5a08172de5b'
      },
      {
        img: 'https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic347875?alt=media&token=083af533-7511-4870-9790-aec09027ad28'
      },
      {
          img: 'https://firebasestorage.googleapis.com/v0/b/fithawk-backend.appspot.com/o/avatars%2Fpic547792?alt=media&token=367777ed-d5a1-4aae-a9f2-7a359a741f11'
      }        
    
    ],
   event: [
    {
     avatar: null,
     title: null
    }
   ]
  };
 },
 methods: {
  gotoevents() {
   this.$router.push("/events");
  },
  getEvent() {
   var eventRef = this.$db.collection("events").doc(this.$route.params.id);
   eventRef.get().then(doc => {
    this.event = doc.data();
   });
  }
 },
 created() {
  this.getEvent();
 }
};
</script>

<style scoped>
.date_div {
 height: 80px;
 padding-top: 10px;
}
.width_80 {
 width: 90%;
 margin: 0 auto;
}
.floats_left_black {
 float: left;
 font-size: 16px;
 padding-left: 15px;
 width: 50%;
 text-align: center;
 color: #000;
}
img.image_gallery {
    width: 33%;
    height: 150px;
    padding: 8px;
}
.floats_left {
 float: left;
 font-size: 16px;
 padding-left: 15px;
 width: 50%;
 text-align: center;
 color: grey;
}
.floats_right {
 float: left;
 font-size: 18px;
 padding-right: 15px;
}
.padding_text {
 padding-top: 20px;
 background: rgba(0, 0, 0, 0.5);
 color: #fff;
 padding-left: 15px;
}
.small_font {
 font-size: 12px;
}
span.months_dsgn {
    background: #2db2a0;
    padding: 10px 12px 3px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-weight: 900;
    color: #fff;
}
span.days {
    background: #ffffff;
    padding: 2px 17px 8px 17px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #80c6c8;
    font-weight: 900;
    color: rgb(82, 83, 86);
}
.q-card{
  background: #f2f2f3 !important;
}
</style>
