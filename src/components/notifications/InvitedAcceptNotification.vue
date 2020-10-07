<!-- NAVIGATION FLAG = 1 -->
<template>
 <div>
  <q-item clickable @click="$router.push('/user/' + to)">
   <q-item-section top avatar>
    <q-avatar size="4em" color="primary" text-color="white">
     <img :src="notification.avatar" />
    </q-avatar>
   </q-item-section>

   <q-item-section>
    <q-item-label>
     <q-item-label class="q-mb-xs rift-light" caption>{{
      notification.time
     }}</q-item-label>
     <span class="europa-regular"> {{ notification.text }}</span>
    </q-item-label>
   </q-item-section>

   <q-item-section side top> </q-item-section>
  </q-item>
 </div>
</template>

<script>
export default {
 name: "InvitedAcceptNotification",
 props: ["notification"]
};
</script>
