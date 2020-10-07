<template>
 <div>
  <TitleLink text="Popular Near You" icon="chevron_right" />
  <q-list
   v-for="(item, key) in category"
   class="q-ml-md q-mr-md q-mt-md"
   :key="item.key"
   style="margin-top: -5px"
  >
   <InterestCard :key="key" :title="item.title" smallimage="" image="" />
  </q-list>
  <TitleLink text="Featured Groups" />
  <q-list
   v-for="(group, key) in featured"
   class="q-ml-md q-mr-md q-mt-md q-pb-md"
   :key="group.key"
   style="margin-top: -30px"
  >
   <GroupListItem
    class="q-mt-lg"
    v-if="icon == null"
    :key="key"
    :title="group.name"
    :text="group.category"
    :img="group.img"
    :icon="group.icon"
    :count="group.count"
   />
  </q-list>
 </div>
</template>

<script>
import GroupListItem from "../items/GroupListItem.vue";
import InterestCard from "../shared/cards/InterestCard.vue";
import TitleLink from "../typography/TitleLink.vue";
export default {
 name: "PopularNearYou",
 props: [
  "title",
  "caption",
  "smallimage",
  "image",
  "leftText",
  "rightText",
  "icon"
 ],
 data() {
  return {
   slide: "first",
   featured: [],
   category: [
    {
     title: "Test Categ",
     smallImage: "https://cdn.quasar.dev/img/parallax2.jpg"
    }
   ]
  };
 },
 components: {
  GroupListItem,
  InterestCard,
  TitleLink
 }
};
</script>
