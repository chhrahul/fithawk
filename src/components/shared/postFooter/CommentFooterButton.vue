<template>
 <q-btn
  class="europa-light onyx"
  icon="chat_bubble_outline"
  flat
  :label="'Comment (' + commentCount + ')'"
  @click="$emit('openComment')"
 />
</template>

<script>
export default {
 name: "CommentFooterButton",
 props: ["commentCount"]
};
</script>
