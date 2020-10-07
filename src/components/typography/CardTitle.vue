<template>
 <div class="q-pb-s">
  <div class="europa-bold" style="font-size: 17px;">
   {{ text }}
   <div class="europa-regular">{{ type }}</div>
   <div class="europa-regular" style="font-size: 15px;">
    <b>{{ owner }}</b> <span v-if="group"> posted photos in </span>
    <b>{{ group }}</b>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "CardTitle",
 props: ["text", "type", "group", "owner"]
};
</script>
