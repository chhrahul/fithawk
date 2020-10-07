<template>
 <q-card class="my-card">
  <q-card-section>
   <q-checkbox
    dense
    v-model="useCode"
    label="I have a join code"
    color="accent"
   />
   <q-input
    size="xs"
    class="q-mt-sm"
    dense
    filled
    v-if="useCode"
    placeholder="Enter Code"
   />
  </q-card-section>
  <q-card-section>
   <center>
    <q-btn
     v-if="!useCode"
     @click="joinGroup($event)"
     label="Join Group"
     v-close-popup
    />
    <q-btn
     v-if="useCode"
     @click="groupCode($event)"
     label="Join Group"
     v-close-popup
    />
   </center>
  </q-card-section>
 </q-card>
</template>

<script>
export default {
 name: "JoinGroup",
 data() {
  return {
   useCode: false,
   code: ""
  };
 },
 methods: {
  joinGroup(f) {
   this.$emit("joinGroup");
  },
  groupCode() {
   this.$emit("joinCode", this.code);
  }
 }
};
</script>
