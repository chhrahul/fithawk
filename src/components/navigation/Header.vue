<template>
 <q-header reveal class="quasar-gcp" style="background-color: white" elevated>
  <q-toolbar class="row q-mt-sm q-mb-sm " style="background-color: white">
   <ColOne v-if="!leftIcon" />
   <ColOne v-if="!leftIcon" />
   <ColOne />
   <q-btn
    v-if="leftIcon"
    @click="$router.go(-1)"
    flat
    round
    dense
    :icon="leftIcon"
    class="q-mr-sm col-2"
    color="accent"
   >
    <div v-if="unreadAmount > 0">
     <q-badge
      style="font-size: 15px"
      color="secondary"
      floating
      class="q-mt-sm"
      :label="unreadAmount"
     />
    </div>
   </q-btn>
   <q-toolbar-title class="q-pr-xl">
    <q-img
     @click="gotothome()"
     class="col-3"
     src="statics/logos/fithawktitle.png"
    />
   </q-toolbar-title>
   <div>
    <q-btn
     @click="$router.push('/messages')"
     flat
     round
     dense
     :icon="icon"
     class="q-mr-sm col-2"
     color="accent"
    >
     <div v-if="unreadAmount > 0">
      <q-badge
       style="font-size: 15px"
       color="secondary"
       floating
       class="q-mt-sm"
       :label="unreadAmount"
      />
     </div>
    </q-btn>
   </div>
  </q-toolbar>
 </q-header>
</template>

<script>
import ColOne from "../shared/spacing/ColOne.vue";
export default {
 name: "Header",
 props: ["leftIcon", "logo", "unreadAmount", "icon", "badge"],
 components: {
  ColOne
 },
 methods: {
  clicked(flag) {
   this.$emit("clicked");
   return flag;
  },
  gotothome() {
   this.$router.push("/home");
  }
 }
};
</script>
