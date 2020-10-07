<template>
 <q-btn
  class="q-mt-sm q-pl-lg q-pr-lg invite_btn"
  size="md"
  dense
  rounded
  :label="label"
  :icon="icon"
  @click="clicked($event)"
 />
</template>
<style lang="stylus">
.invite_btn {
  height: 30px;
}
</style>
<script>
export default {
 name: "InviteFillButton",
 props: ["label", "icon"],
 methods: {
  clicked() {
   this.$emit("click");
  }
 }
};
</script>
