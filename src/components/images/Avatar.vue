<template>
 <q-avatar>
  <img :src="src" />
 </q-avatar>
</template>

<script>
export default {
 name: "Avatar",
 props: ["src"]
};
</script>
