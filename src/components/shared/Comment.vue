<template>
 <q-item clickable>
  <CommentAvatar avatar="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
  <q-item-section>
   <div class="bg-grey-3 q-pa-sm rounded-borders">
    <div class="row">
     <div class="text-bold">{{ name }}</div>
     <q-space />
     <div>({{ created | moment("from", "now") }})</div>
    </div>
    {{ text }}
   </div>
  </q-item-section>
 </q-item>
</template>

<script>
import CommentAvatar from "../images/CommentAvatar.vue";
import moment from "moment";
export default {
 name: "Comment",
 props: ["created", "text", "name", "avatar"],
 components: {
  CommentAvatar
 },
 methods: {
  moment
 }
};
</script>
