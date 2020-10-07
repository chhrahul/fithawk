<template>
 <div><q-toggle color="sage" v-model="toggle" val="friend" /></div>
</template>

<script>
export default {
 name: "Toggle",
 data() {
  return {
   toggle: false
  };
 }
};
</script>
