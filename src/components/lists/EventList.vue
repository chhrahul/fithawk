<template>
 <div>
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
       {{ item.event_date || moment("from", "now") }}
       <br />
       <span class="small_font"></span>
      </div>
     </q-img>
    </q-card>

    <div class="seperate_me">&nbsp;</div>
   </div>
  </q-list>
 </div>
</template>

<script>
import moment from "moment";
export default {
 name: "EventListItem",
 props: ["data"],
 methods: {
  eventdetail(id) {
   this.$router.push("/event/" + id);
  }
 }
};
</script>
<style scoped>
.seperate_me {
 height: 25px;
 padding-top: 25px;
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
</style>
