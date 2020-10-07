<template>
 <div>
  <q-card class="my-card q-pa-md" style="min-width: 250px">
   <q-card-section>
    <q-select :options="options" v-model="reason" label="Reason" />
   </q-card-section>
   <q-card-section>
    <q-input
     type="textarea"
     v-model="description"
     placeholder="Can you explain more?"
    />
   </q-card-section>
   <q-card-actions>
    <div>
     <q-btn label="cancel" class="europa-regular onyx" v-close-popup />
    </div>
    <q-space />
    <div>
     <q-btn
      class="europa-regular"
      color="primary"
      align="right"
      label="submit"
      @click="submitReport(id)"
      v-close-popup="this.description != '' && this.reason != ''"
     />
    </div>
   </q-card-actions>
  </q-card>
 </div>
</template>

<script>
export default {
 name: "ReportPopup",
 props: ["id"],
 data() {
  return {
   description: "",
   reason: "",
   firstItemEnabled: false,
   options: ["Nudity / Innapropirate", "Harrassment", "Other"]
  };
 },
 methods: {
  submitReport(id) {
   var reportRef = this.$db.collection("reports").doc(id);
   reportRef.set({
    description: this.description,
    reason: this.reason,
    id: id,
    complaintID: this.$q.localStorage.getItem("user_id")
   });
  }
 }
};
</script>
