<template>
 <q-btn
  @click="clicked($event)"
  :label="label"
  class=" q-pt-lg q-pb-lg full-width text-h6"
  color="secondary"
  style="border-radius: 0px"
  icon-right="chevron_right"
 >
 </q-btn>
</template>

<script>
export default {
 name: "GetStarted",
 props: ["label"],
 methods: {
  clicked(flag) {
   this.$emit("click");
   return flag;
  }
 }
};
</script>
