<template>
 <div class="q-mt-md">
  <q-card flat>
   <q-card-section
    class="row items-center"
    @click="switchtoweekly()"
    v-if="this.isMonth == 1"
   >
    <div>
     <span class="europa-light onyx"
      ><q-icon color="accent" name="view_week" /> Day
     </span>
    </div>

    <div>
     <span class="active_me europa-light q-ml-sm "
      ><q-icon name="view_module" /> Month</span
     >
    </div>
   </q-card-section>

   <q-card-section
    @click="switchtomonthly()"
    class="row items-center"
    v-if="this.isMonth != 1"
   >
    <div>
     <span class="active_me float-left"><q-icon name="view_week" /> Day </span>
    </div>

    <div>
     <span class="float-left"><q-icon name="calender_today" /> Month</span>
    </div>
   </q-card-section>
  </q-card>

  <div
   class="q-pb-md ustify-center full-height full-width text-center"
   v-if="this.isMonth == 1"
  >
   <q-date
    color="accent"
    class="full-width q-mt-sm"
    v-model="date"
    style="border-radius: 0px"
    :options="this.options"
    today-btn
    flat
    @click="currentdate(date)"
   >
   </q-date>
  </div>
  <div class="q-pb-md ustify-center full-height full-width text-center"></div>

  <EventWeeklyList :weeklydata="days_events" v-if="isMonth != 1" />
  <EventWeeklyList :data="events" v-if="isMonth == 1" />
 </div>
</template>
<script>
import EventWeeklyList from "../../../components/lists/EventWeeklyList.vue";
export default {
 name: "ListEvents",
 components: {
  EventWeeklyList
 },
 data() {
  return {
   date: null,
   options: [],
   days_events: [],
   isMonth: 1,
   tab: "upcoming",
   groups: [
    {
     avatar: null,
     name: null
    }
   ],
   events: [
    {
     mediaUrls: null,
     more: null,
     name: null,
     group: null,
     created_at: null,
     mediaType: null,
     likes: null,
     comments: null,
     personal: null,
     text: null
    }
   ]
  };
 },
 methods: {
  currentdate(date) {
   this.events = [];
   var col = this.$db.collection("events").where("event_date", "==", date);
   col.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     this.events.push(doc.data());
    });
   });
  },
  switchtoweekly() {
   this.isMonth = 0;
  },
  switchtomonthly() {
   this.isMonth = 1;
  }
 },
 mounted() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  this.date = today;

  var col = this.$db.collection("events").where("event_date", ">=", today);
  col.get().then(snapshot => {
   var ev_date = "";

   snapshot.docs.forEach(doc => {
    if (doc.data().mediaDownloadUrls[0]) {
        var first_ev_array = {};

        const check_event_attend_first = this.$db
       .collection("events_attending")
       .where("events_id", "==", doc.data().id)
       .where("user_id", "==", this.$q.localStorage.getItem("user_id"));

       //var att_event = check_event_attend.get().data();

       

       check_event_attend_first.get().then(snapshot => {
           //console.log(snapshot.docs.length)
           if (snapshot.docs.length > 0) {
               first_ev_array = {
                    title: doc.data().title,
                    location: doc.data().location,
                    event_date: doc.data().event_date,
                    mediaDownloadUrls:doc.data().mediaDownloadUrls,
                    //day_of_week: day_of_week,
                    id: doc.data().id,
                    showEdit: 1
                };
           }
           else{
               first_ev_array = {
                    title: doc.data().title,
                    location: doc.data().location,
                    event_date: doc.data().event_date,
                    mediaDownloadUrls:doc.data().mediaDownloadUrls,
                    //day_of_week: day_of_week,
                    id: doc.data().id,
                    showEdit: 0
                };
           }
       this.events.push(first_ev_array);

       });
        

    // this.events.push(doc.data());
     this.options.push(doc.data().event_date);
     if (ev_date != doc.data().event_date) {
      var ev_array = {};
      var d = new Date(doc.data().event_date);

      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      var month_str = month[d.getMonth()];
      //var date_str = d.getMonth();
      var day_str = d.getDate();

      //var d = new Date();
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      var day_of_week = weekday[d.getDay()];

      var col_days = this.$db
       .collection("events")
       .where("event_date", "==", doc.data().event_date);
      col_days.get().then(snapshot_days => {
       var event_arr = new Array();
       //var ev_title = new Array;

       snapshot_days.docs.forEach(doc_days => {
        // arr.event_time = doc_days.data().event_time;
        // arr.event_title = doc_days.data().title;

        const check_event_attend = this.$db
       .collection("events_attending")
       .where("events_id", "==", doc_days.data().id)
       .where("user_id", "==", this.$q.localStorage.getItem("user_id"));

       //var att_event = check_event_attend.get().data();

       

       check_event_attend.get().then(snapshot => {
           //console.log(snapshot.docs.length)
           if (snapshot.docs.length > 0) {
                event_arr.push({
                        ev_time: doc_days.data().event_time,
                        ev_title: doc_days.data().title,
                        ev_id: doc_days.data().id,
                        showEdit: 1
                        });
           }
           else{
               event_arr.push({
                ev_time: doc_days.data().event_time,
                ev_title: doc_days.data().title,
                ev_id: doc_days.data().id,
                showEdit: 0
                });
           }
           
   
   });
       });
       ev_array = {
        title: doc.data().title,
        event_month: month_str,
        event_day: day_str,
        day_of_week: day_of_week,
        id: doc.data().id,
        event_date: doc.data().event_date,
        event_arr: event_arr
       };
       this.days_events.push(ev_array);
      });
     }

     ev_date = doc.data().event_date;
    }
   });
  });
 }
};
</script>

<style scoped>
.width_80 {
 width: 90%;
 margin: 0 auto;
}
.active_me {
 color: #f05621;
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
