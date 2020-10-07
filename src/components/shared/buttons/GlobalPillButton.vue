<template>
 <div>
  <q-btn
   class="q-mt-md rift-regular dropshadow q-pl-xl q-pr-xl"
   size="md"
   rounded
   :color="color"
   :label="label"
   :icon="icon"
   @click="clicked($event)"
  />
 </div>
</template>

<script>
export default {
 name: "GlobalPillButton",
 props: ["label", "icon","color"],
 methods: {
  clicked(flag) {
   this.$emit("click");
   return flag;
  }
 }
};
</script>
