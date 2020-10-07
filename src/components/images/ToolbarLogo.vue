<template>
 <q-toolbar-title class="q-pr-xl">
  <q-img class="col-3" :src="logo" />
 </q-toolbar-title>
</template>

<script>
export default {
 name: "ToolbarLogo",
 props: ["logo"]
};
</script>
