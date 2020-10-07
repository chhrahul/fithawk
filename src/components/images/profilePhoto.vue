<template>
 <div>
  <img :src="img" class="q-mt-xl" @click="clicked($event)" />
 </div>
</template>

<script>
export default {
 name: "ProfilePhoto",
 props: ["img"],
 methods: {
  clicked(flag, img) {
   this.$emit("clicked", img);
   return flag;
  }
 }
};
</script>
