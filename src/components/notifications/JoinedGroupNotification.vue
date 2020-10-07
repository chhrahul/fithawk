<!-- NOTIFICATION FLAG = 4 -->
<template>
 <div>
  <q-item clickable @click="$router.push('/group/' + to)">
   <q-item-section top avatar>
    <q-avatar size="4em" color="primary" text-color="white" icon="bluetooth" />
   </q-item-section>

   <q-item-section>
    <q-item-label>
     <q-item-label class="q-mb-xs rift-light" caption>{{ time }}</q-item-label>
     <span class="europa-bold"> {{ name }} </span>
     <span class="europa-regular">has joined </span>
     <span class="europa-bold">{{ group }} </span></q-item-label
    >
   </q-item-section>

   <q-item-section side top> </q-item-section>
  </q-item>
 </div>
</template>

<script>
export default {
 name: "JoinedGroupNotification",
 props: ["name", "group", "time", "to"]
};
</script>
