<template>
 <div>
  <q-card
   class="my-card q-mb-md"
   style="width: 100%;
    height: 100%;
    border-radius: 12px;"
  >
   <q-img
    :src="img"
    @click="$router.push('/group/' + to)"
    basic
    class="q-pa-md"
    :ratio="1.5"
   >
    <div class="absolute-bottom" style="background: none">
     <SectionHeader :text="title" />
     <SubTitle :text="text" class="snow" />
    </div>
    <div class="absolute-bottom-right" style="background: none">
     <q-icon name="supervised_user_circle" size="1.8em" class="q-mr-sm" />
     {{ count.length }}
    </div>
   </q-img>
  </q-card>
 </div>
</template>

<script>
import SectionHeader from "../typography/SectionHeader.vue";
import SubTitle from "../typography/SubTitle.vue";
export default {
 name: "GroupListitem",
 components: {
  SectionHeader,
  SubTitle
 },
 props: ["text", "title", "img", "icon", "count", "to"],
 mounted: function() {
  console.log("component " + this.count);
 }
};
</script>
