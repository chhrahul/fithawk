<template>
 <div class="rift-light" style="font-size: 12px;padding-top: 8px;">
  <div>{{ text | moment("from", "now") }}</div>
  <q-btn style="margin-left: -20px" :icon="icon" flat />
 </div>
</template>

<script>
import VueMoment from "vue-moment";
import Vue from "vue";

Vue.use(VueMoment);
export default {
 name: "MessageTimeStamp",
 props: ["text", "icon"]
};
</script>
