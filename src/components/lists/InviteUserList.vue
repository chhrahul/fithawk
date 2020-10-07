<template>
 <div>
  <q-list>
   <q-list v-for="(item, id) in data" :key="id" class="q-ml-lg q-mr-lg">
    <q-item v-if="item.name != null" class="q-my-sm" clickable>
     <q-item-section avatar v-if="item.avatar != null">
      <q-avatar color="primary" text-color="white">
       <q-img :src="item.avatar" />
      </q-avatar>
     </q-item-section>

     <q-item-section v-if="item.name != null">
      <q-item-label class="europa-bold onyx" style="font-size: 1.1em;">{{
       item.name
      }}</q-item-label>
     </q-item-section>

     <q-item-section side key="refresh">
      <InviteButton
       v-if="!item['flag']"
       label="Invite"
       class="bg-deep-orange text-white"
       @click="invite(item)"
      />
     </q-item-section>
    </q-item>

    <q-separator />
   </q-list>
  </q-list>
 </div>
</template>
<style lang="stylus"></style>
<script>
import InviteButton from "../shared/buttons/InviteButton.vue";
export default {
 name: "InviteUserList",
 props: ["data"],
 data() {
  return {
   flag: [],
   refresh: -111111
  };
 },
 computed: {},
 components: {
  InviteButton
 },
 created() {},
 methods: {
  invite(item) {
   item.flag = !!item.flag;
   this.refresh++;
   this.$q.notify("Invite was sent !");
  }
 }
};
</script>
