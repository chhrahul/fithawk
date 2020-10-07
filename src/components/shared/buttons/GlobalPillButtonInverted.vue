<template>
 <div>
  <q-btn
   class="q-mt-md rift-regular dropshadow q-pl-xl q-pr-xl"
   style="border: 1px white solid;text-transform:lowercase"
   size="md"
   rounded
   filled
   color="accent"
   :label="label"
   :icon="icon"
   @click="clicked($event)"
  />
 </div>
</template>

<script>
export default {
 name: "GlobalPillButtonInverted",
 props: ["label", "icon"],
 methods: {
  clicked(flag) {
   this.$emit("click");
   return flag;
  }
 }
};
</script>
