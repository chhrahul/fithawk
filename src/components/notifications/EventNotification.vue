<!-- NOTIFICATION FLAG = 2 -->
<template>
 <div>
  <q-item clickable @click="$router.push('/event/' + to)">
   <q-item-section top avatar>
    <q-avatar size="4em" color="primary" text-color="white" icon="bluetooth" />
   </q-item-section>

   <q-item-section>
    <q-item-label
     >New Event <span class="europa-bold"> {{ event_title }} </span>is created
     under this group <span class="europa-bold">{{ group }}</span></q-item-label
    >
    <q-item-label caption lines="2"
     >Event Title: {{ event_title }} , Event Date: {{ event_date }} , Event
     time: {{ event_time }}</q-item-label
    >
   </q-item-section>
  </q-item>
 </div>
</template>

<script>
export default {
 name: "EventNotification",
 props: [
  "eventTime",
  "time",
  "group",
  "event_date",
  "event_title",
  "event_time",
  "to"
 ]
};
</script>
