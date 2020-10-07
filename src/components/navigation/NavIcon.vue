<template>
 <div>
  <q-btn flat round dense :icon="icon" class="q-mr-sm col-2" color="accent">
   <div v-if="badge > 0">
    <q-badge
     style="font-size: 15px"
     color="secondary"
     floating
     class="q-mt-sm"
     :label="badge"
    />
   </div>
  </q-btn>
 </div>
</template>

<script>
export default {
 name: "NavIcon",
 props: ["icon", "badge"],
 methods: {
  clicked(flag) {
   this.$emit("clicked");
   return flag;
  }
 }
};
</script>
