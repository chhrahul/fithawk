<template>
 <q-page class="q-pt-md">
  <center>
   <q-img
    v-if="this.user.avatar != '/statics/logos/fithawklogo.png'"
    :src="this.user.avatar"
    style="border-radius:50%;cursor:pointer;height:150px;width:150px;"
   />
    <q-img
     v-else
    :src="this.user.avatar"
    style="border-radius:50%;cursor:pointer;height:150px;width:189px;"
   />
  </center>
  <q-card class="q-mr-md q-ml-md q-mt-xl" style="border-radius: 18px">
   <q-list v-for="(item, key) in settings" :key="key">
    <q-item class="q-pt-md q-pb-md">
     <q-item-section>
      <q-item-label class="europa-bold onyx">{{ item.text }}</q-item-label>
     </q-item-section>
     <q-item-section side top v-if="item.value != null">
      <q-toggle color="sage" v-model="item.value" size="lg" />
     </q-item-section>
     <q-item-section side top v-if="item.value == null">
      <q-btn
       flat
       :icon="item.icon"
       @click="$router.push(item.to)"
      /> </q-item-section
    ></q-item>
    <q-separator />
   </q-list>
  </q-card>
  <center class="q-mt-lg">
   <GlobalPillButtonInverted @click="logout()" label="logout" />
  </center>
  <div class="fixed-bottom q-mb-md q-ml-xs europa-light">
   Version: 1.0.3
  </div>
 </q-page>
</template>

<script>
import GlobalPillButtonInverted from "../../../components/shared/buttons/GlobalPillButtonInverted.vue";
import { mapState } from "vuex";

export default {
 name: "Settings",
 components: {
  GlobalPillButtonInverted
 },
 data() {
  return {
   settings: [
    {
     text: "Edit Profile",
     to: "/edit-profile/"+this.$q.localStorage.getItem('user_id'),
     icon: "settings"
    },
    {
     text: "Push Notifications",
     value: true
    },
    {
     text: "Allow Access to My Contacts",
     value: false
    },
    {
     text: "Allow My Location",
     value: false
    }
   ]
  };
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  })
 },
 methods: {
  logout() {
   //this.$store.commit("storage/resetState", "");
   //this.$store.commit("storage/resetLocalstorage", "");
   //this.$store.getters["storage/resetLocalstorage"];
   this.$q.localStorage.set("user_id", null);
   this.$q.localStorage.set("name", null);
   this.$logout();
   this.$router.push("/auth");
  }
 }
};
</script>
