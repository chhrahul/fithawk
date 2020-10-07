<template>
 <div class="fixed-center ">
 
  <q-splitter
   v-model="splitterModel"
   horizontal
   :limits="[0, 100]"
   before-class="overflow-hidden"
   after-class="overflow-hidden"
  >
   <template v-slot:before>
    <div class="q-pa-xs">
     <q-img
      src="~assets/imgs/add-group5.png"
      id="target-img-1"
      style="height: 100px"
      @click="toCreateGroup()"
     >
     </q-img>
    </div>
   </template>

   <template v-slot:after>
    <div class="q-pa-xs" style="margin-left: 6px;">
     <span class="text-bold" style="color: white;">Create Group</span>
    </div>
   </template>
  </q-splitter>

  <q-splitter
   v-model="splitterModel"
   horizontal
   :limits="[0, 100]"
   before-class="overflow-hidden"
   after-class="overflow-hidden"
  >
   <template v-slot:before>
    <q-img
     src="~assets/imgs/join-group.png"
     style="height: 100px"
     @click="toJoinGroup()"
    >
    </q-img>
   </template>

   <template v-slot:after>
    <div class="q-pa-xs" style="margin-left: 10px;">
     <span class="text-bold" style="color: white;">Join Group</span>
    </div>
   </template>
  </q-splitter>

  <q-splitter
   v-model="splitterModel"
   horizontal
   :limits="[0, 100]"
   before-class="overflow-hidden"
   after-class="overflow-hidden"
  >
   <template v-slot:before>
    <q-img
     src="~assets/imgs/search3.png"
     style="height: 100px"
     @click="toSearch()"
    >
    </q-img>
   </template>

   <template v-slot:after>
    <div class="q-pa-xs" style="margin-left: 22px;">
     <span class="text-bold" style="color: white;">Search</span>
    </div>
   </template>
  </q-splitter>
 </div>
</template>
<script>
export default {
 name: "StepThree",
 splitterModel: 10, // start at 50%
 methods: {
  toCreateGroup() { 
  localStorage.setItem("url","/create-group");
  this.$router.push("/create-group");
  },
  toJoinGroup() { 
  localStorage.setItem("url","/join-group");
  this.$router.push("/join-group");
  },
  toSearch() { 
  localStorage.setItem("url","/search");
  this.$router.push("/search");
  }
 } 
};
</script>
