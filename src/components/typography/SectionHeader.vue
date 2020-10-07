<template>
 <div>
  <div class="europa-regular" style="font-size: 18px;">{{ following }}</div>
  <div class="europa-regular" style="font-size: 18px;">{{ text }}</div>
 </div>
</template>

<script>
export default {
 name: "SectionHeader",
 props: ["text", "following"]
};
</script>
