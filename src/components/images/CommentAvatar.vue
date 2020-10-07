<template>
 <q-item-section top avatar>
  <q-avatar>
   <img :src="avatar" />
  </q-avatar>
 </q-item-section>
</template>

<script>
export default {
 name: "CommentAvatar",
 props: ["avatar"]
};
</script>
