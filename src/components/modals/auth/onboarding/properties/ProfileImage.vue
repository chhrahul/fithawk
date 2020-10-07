<template>
 <q-img
  :src="img"
  @click="clicked($event)"
  style="border-radius:50%;cursor:pointer;height:150px;width:150px;"
  ><q-btn
   class="absolute-bottom"
   dense
   icon="edit"
   color="white"
   style="color: #B9B0A2!important"
 /></q-img>
</template>
<script>
export default {
 name: "ProfileImage",
 props: ["img"]
};
</script>
