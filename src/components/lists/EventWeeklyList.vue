<template>
 <div>
  <q-list v-for="(item, id) in weeklydata" :key="id">
   <div>
    <q-card class="my-card q-pb-md">
     <div class="q-pt-md q-pl-md ">
      <span class="europa-bold onyx"
       >{{ item.event_month }} {{ item.event_day }}</span
      >
      <br />
      <div class="europa-regular">{{ item.day_of_week }}</div>
     </div>

     <div class="q-pt-sm q-pl-md ">
      <div class="row items-start q-md ">
       <div style="width: 49%;float: left;padding: 8px 0;font-weight:bold;">
        Event Title
       </div>
       <div style="font-weight:bold;padding: 8px 0;">Event Time</div>

       


       <div class="colss" v-for="(itemd, did) in item.event_arr" :key="did" style="width: 100%;display: table;border-bottom: 1.5px solid #f0f3f4;">
      
        <div class="europa-light onyx" @click="eventdetail(itemd.ev_id)" style="padding: 8px 0;width: 49%;float: left;">
         {{ itemd.ev_title }}
         </div>
         <div class="grey_text" style="width: 49%;padding: 8px 0;float: right;">{{ itemd.ev_time }} </div>

         <div align="center">

         <q-btn
            style="background: white!important;"
             v-if="itemd.showEdit == 0"
            class="q-mt-md rift-regular
            dropshadow q-pl-xl q-pr-xl onyx"
            size="md"
            rounded
            
            label="Attend this event"
            @click="attending(itemd.ev_id,itemd)"
          />
      <q-btn
            style="background: white!important;" v-if="itemd.showEdit == 1"
            class="q-mt-md rift-regular
            dropshadow q-pl-xl q-pr-xl onyx"
            size="md"
            rounded
            label="Unattend this event"
            @click="attended(itemd.ev_id,itemd)"
          />
          </div>
          <div class="q-mt-md q-mb-md" style="width:95%"></div>
        
         
       </div>
      </div>
     </div>
    </q-card>

    <div class="seperate_me">&nbsp;</div>
   </div>
  </q-list>

  <q-list v-for="(item, id) in data" :key="id">
   <div v-if="item.mediaDownloadUrls != null">
    <q-card class="my-card" @click="eventdetail(item.id)">
     <q-img :src="item.mediaDownloadUrls[0]" rounded>
      <div class="absolute-bottom text-subtitle2 text-right">
       {{ item.title }}
       <br />
       <span class="small_font">{{ item.location }}</span>
      </div>
      <div class="text-subtitle2 text-center rounded date_display">
       {{ item.event_date }}
       <br />
       <span class="small_font"></span>
      </div>
     </q-img>
     </q-card>
     <div align="center">

         <q-btn
            style="background: white!important;"
             v-if="item.showEdit == 0"
            class="q-mt-md rift-regular
            dropshadow q-pl-xl q-pr-xl onyx"
            size="md"
            rounded
            
            label="Attend this event"
            @click="attending(item.id,item)"
          />
      <q-btn
            style="background: white!important;" v-if="item.showEdit == 1"
            class="q-mt-md rift-regular
            dropshadow q-pl-xl q-pr-xl onyx"
            size="md"
            rounded
            label="Unattend this event"
            @click="attended(item.id,item)"
          />
          </div>
    

    <div class="seperate_me">&nbsp;</div>
   </div>
  </q-list>
 </div>
</template>

<script>
export default {
 name: "EventListItem",
 props: ["data", "weeklydata", "requirements"],
 data() {
  return {
   member_update: [],
   member_updated: [],
   isAlreadyEvent: null,
   user_uid: null,
   events_id:0,
   user_id:null,
   eventsid:null
  };
 },
  mounted() {
  this.init();
 },
 methods: {
  eventdetail(id) {
   this.$router.push("/event/" + id);
  },
   async attending(id,k) {
    //  alert(k)
    //  return false;
   var user_id = this.$q.localStorage.getItem("user_id");
    
    var attending_click = this.$db.collection("events_attending").doc();
    attending_click.set({
    id: attending_click.id,
    events_id: id,
    user_id: user_id
   });
   k.showEdit = 1;
    // setTimeout(function(){
    //               location.reload();
    //             }, 2000);

  },

   async attended(id,k) {
   var col = this.$db.collection("events_attending");
   var query = col
    .where("events_id", "==", id)
    .where("user_id", "==", this.$q.localStorage.getItem("user_id"));
   query.get().then(snapshot => {
    if (snapshot.docs.length > 0) {
     this.$db
      .collection("events_attending")
      .doc(snapshot.docs[0].id)
      .delete();
    }
    k.showEdit = 0;
    // setTimeout(function(){
    //               location.reload();
    //             }, 2000);
   });
  

      
      },

  async init() { 
   const col = this.$db.collection("events_attending");
   const query = col.where("user_id", "==", this.$q.localStorage.getItem("user_id"));
   await query.get().then(snapshot => {
    //I8iXIMfmuMZXzGycbjs1
    snapshot.docs.forEach(doc => {
       console.log(doc.data().events_id);
       this.user_id = doc.data().user_id;
       this.eventsid = doc.data().events_id;
    
    });
   });


    
  },
 }
};
</script>
<style scoped>
.seperate_me {
 height: 25px;
 padding-top: 25px;
}
.col-4.photo_grid_class {
 margin: 3px 0px;
 background-size: 100px;
 object-fit: scale-down;
}
.date_display {
 background-color: green;
 color: white;
 margin: 20px 0 0 0px;
 padding-top: 5px;
 padding-bottom: 5px;
}
.small_font {
 font-size: 12px;
}
.grey_text {
 color: #7994a7;
}
.main_img {
 width: 95%;
 height: 100px;
 border-radius: 7px;
}
</style>
