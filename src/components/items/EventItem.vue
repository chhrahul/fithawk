<template>
 <q-card class="my-card" @click="eventdetail(data.id)">
  <div class="absolute-bottom text-subtitle2 text-right">
   {{ data.title }}
   <br />
   <span class="small_font">{{ data.location }}</span>
  </div>
  <div class="text-subtitle2 text-center rounded date_display">
   {{ data.event_date || moment("from", "now") }}
   <br />
   <span class="small_font"></span>
  </div>
 </q-card>
</template>

<script>
import moment from "moment";
export default {
 name: "EventItem",
 props: ["data"],
 methods: {
  eventdetail(id) {
   this.$router.push("/event/" + id);
  }
 }
};
</script>
