<template>
 <div>
  <q-splitter
   v-model="splitterModel"
   horizontal
   :limits="[0, 100]"
   before-class="overflow-hidden"
   after-class="overflow-hidden"
   :separator-style="{ display: none }"
   v-if="showEdit == 1"
  >
   <template v-slot:before>
    <div class="q-pa-xs" style="border-radius: 40px">
     <q-avatar
      style="border-radius: 50px; margin-left: 1px;"
      size="60px"
      @click="$router.push('/profile/' + id)"
     >
      <q-img :src="img" />
     </q-avatar>
    </div>
   </template>

   <template v-slot:after>
    <div class="q-pa-xs" style="margin-left: 14px; margin-top: -5px;">
     <SubTitle :text="name" />
     <q-icon name="delete"  @click="confirm = true" size="large" v-if="canDelete == 1"  />
    </div>
   </template>
  </q-splitter>
  <q-dialog v-model="confirm" persistent>
     <q-card>
      <q-card-section class="row items-center">
       <span class="q-ml-sm"
        >Are you sure you want to delete this member from the group ?</span
       >
      </q-card-section>

      <q-card-actions align="right">
       <q-btn flat label="No" color="primary" v-close-popup />
       <q-btn
        flat
        label="Yes"
        @click="delete_member(id)"
        color="primary"
        v-close-popup
       />
      </q-card-actions>
     </q-card>
    </q-dialog>
 </div>
 
</template>

<script>
//console.log(group_join);
//xKWdtd3I8kSQhW1OF6WHH4jkzY42
import SubTitle from "../typography/SubTitle.vue";
export default {
 name: "ScrollableCircleImageList",
 props: ["img", "name", "id","canDelete"],
 components: {
  SubTitle
 },
 data() {
  return {
   splitterModel: 10,
   member_update:[],
   confirm: false,
   showEdit: 1
  };
 },
 methods:{
     async delete_member(id){
        //  alert(this.$route.params.id);
        //  return false;
          const col = this.$db.collection("groups");
            const query = col.where("id", "==", this.$route.params.id);
            await query.get().then(snapshot => {
                //I8iXIMfmuMZXzGycbjs1
                snapshot.docs.forEach(doc => {
                doc.data().users.forEach(doci => {
                if (doci.uid != id) {
                    this.member_update.push({ uid: doci.uid, role: "admin" });
                }
                });
                });
            });

            await this.$db
                .collection("groups")
                .doc(this.$route.params.id)
                .update({ users: this.member_update });
                this.$q.notify("User is removed from the group!");
                this.showEdit = 0;
     },
      async joingroup() {
  

    }   
 }
};
</script>
