<template>
  <q-header class="quasar-gcp" style="background-color: white" elevated>
    <q-toolbar class="row q-my-sm" style="background-color: white">
      <div class="col-2 q-pl-sm">
        <q-btn
          v-if="leftIcon"
          @click="$router.go(-1)"
          flat
          round
          dense
          :icon="leftIcon"
          color="accent"
        />
      </div>
      <q-toolbar-title class="text-center">
        <q-avatar color="deep-orange-4" text-color="white">
          <img v-if="image" :src="image" />
          <span v-else>{{name[0].toUpperCase()}}</span>
        </q-avatar>
        <div class="text-black text-caption text-weight-bold">{{name}}</div>
      </q-toolbar-title>

      <div class="col-2" />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "Header",
  props: ["leftIcon", "image", "unreadAmount", "icon", "name", "photo"],
  methods: {
    clicked(flag) {
      this.$emit("clicked");
      return flag;
    }
  }
};
</script>
