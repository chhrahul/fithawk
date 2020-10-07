<template>
 <q-item clickable v-ripple>
  <q-item-section class="onyx"
   ><PrimaryHeading style="color: #1B1C20!important;" :text="text"
  /></q-item-section>
  <q-item-section side>
   <MessageTimeStamp :text="link" :icon="icon" />
  </q-item-section>
 </q-item>
</template>

<script>
import PrimaryHeading from "../typography/SecondaryHeading.vue";
import MessageTimeStamp from "../typography/MessageTimeStamp";
export default {
 name: "TitleLink",
 props: ["text", "link", "icon"],
 components: {
  PrimaryHeading,
  MessageTimeStamp
 }
};
</script>
