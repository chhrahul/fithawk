<template>
 <div>
  <q-card style="width: 30%; border-radius: 20px" class="my-card">
   <q-img :src="image" class="q-pb-md"> </q-img>
   <div>
    <div>
     <center>
      <CardTitle :text="title" />
      <CardSubtitle :text="caption" />
     </center>
    </div>
   </div>
  </q-card>
 </div>
</template>

<script>
import CardSubtitle from "../../typography/CardSubTitle.vue";
import CardTitle from "../../typography/CardTitle.vue";

export default {
 name: "InterestCard",
 props: ["title", "caption", "smallimage", "image"],
 components: {
  CardSubtitle,
  CardTitle
 }
};
</script>
