<!-- NOTIFICATION FLAG = 4 -->
<template>
 <div>
  <q-item clickable @click="$router.push('/detail-post/' + notification.to)">
   <q-item-section top avatar>
    <q-avatar size="4em" color="primary" text-color="white">
     <img :src="notification.avatar" />
    </q-avatar>
   </q-item-section>

   <q-item-section>
    <q-item-label>
     <q-item-label class="q-mb-xs rift-light" caption>
      <MessageTimeStamp :text="notification.time" />
     </q-item-label>
     {{ notification.text }}</q-item-label
    >
   </q-item-section>

   <q-item-section side top> </q-item-section>
  </q-item>
 </div>
</template>

<script>
import MessageTimeStamp from "../typography/MessageTimeStamp.vue";
export default {
 name: "PostCreated",
 props: ["notification"],
 components: {
  MessageTimeStamp
 }
};
</script>
