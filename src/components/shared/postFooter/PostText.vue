<template>
 <div><BodyCopySmall :text="text" /></div>
</template>

<script>
import BodyCopySmall from "../../typography/BodyCopySmall.vue";
export default {
 name: "PostText",
 components: {
  BodyCopySmall
 },
 props: ["text"]
};
</script>
