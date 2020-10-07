<template>
 <!--<div style="border-radius: 40px;border: 3px solid #f16131;padding:4px;">-->
 <div style="border-radius: 40px;">
  <q-avatar size="60px">
   <img
    v-if="avatar != 'statics/logos/fithawklogo.png'"
    :src="avatar"
  />   <img
    v-else
    :src="avatar"
    class="postAuthorImg"
  />

  </q-avatar>
 </div>
</template>

<script>
export default {
 name: "PostAuthorImage",
 props: ["avatar"]
};
</script>
