<template>
 <div class="q-mr-md q-ml-md q-mt-md">
  <q-dialog v-model="prompt_crop">
   <ImageCroper :imageUrl="imageUrl" @change="change($event)" />
  </q-dialog>
  <div class="fixed-center" v-if="uploading">
   <q-spinner color="blue" size="5em" :thickness="8" />
  </div>

  <q-img
   
   :src="imageUrl"
   class="q-pa-lg"
   @click="addPhoto"
   style="width: 318px;
    max-width: 318px;
    height: 250px;
    max-height: 250px;
    margin-left: 5px;"
   rounded
  >
  </q-img>

  <q-input
   v-model="groupName"
   autogrow
   filled
   class="q-pa-xs q-mt-xs"
   type="text"
   color="accent"
   label="Group Name"
  />

  <q-select
   filled
   color="accent"
   class="q-pa-xs"
   :options="options"
   v-model="category"
  />

  <q-input
   v-model="description"
   filled
   color="accent"
   type="textarea"
   class="q-pa-xs"
   label="Description"
  />

  <q-toggle
   outlined
   v-model="privateGroup"
   label="Private Group"
   checked-icon="check"
   color="green"
   unchecked-icon="clear"
   size="lg"
  />

  <q-input
   filled
   color="accent"
   class="q-pa-xs"
   v-model="zipcode"
   label="Zip Code"
  />
<center class="q-pa-sm">
  <q-list
    style="display: inline-block; overflow: auto;  white-space: nowrap; margin-top: -10px"
    horizonatal
    v-for="(item, key) in members"
    :key="key"
   >
    <ScrollableImageList
     :key="key"
     class="q-ml-sm"
     :img="item.img"
     :name="item.name"
     :id="item.id"
     :canDelete="1"
    />
   </q-list>

  
   <GlobalPillButton label="Update Group" @click="editGroup($event)" />
  </center>
 </div>
</template>

<script>
import Vue from "vue";
import GlobalPillButton from "../../../components/shared/buttons/GlobalPillButton";
import ImageCroper from "../../../components/modals/ImageCroper";
import ScrollableImageList from "../../../components/images/ScrollableCircleImageItem.vue";
import MediaUploader from "../../../media";
Vue.use(MediaUploader);

export default {
 name: "CreateGroup",
 data() {
  return {
   options: [
    "Cross Country",
    "Football",
    "Soccer",
    "Volleyball",
    "Basketball",
    "Cheer",
    "Swimming & Diving",
    "Wrestling",
    "Baseball",
    "Golf",
    "Softball",
    "Tennis",
    "Track & Field",
    "Weight Lifting"
   ],
   groupName: null,
   category: null,
   privateGroup: false,
   zipcode: null,
   description: null,
   prompt_crop: false,
   imageUrl: null,
   members:[],
   photo: null,
   uploadTask: {},
   uploading: false,
   group_users:[],
  };
 },
 components: {
  GlobalPillButton,
  ImageCroper,
  ScrollableImageList
 },
 mounted() {

var col = this.$db.collection("groups");
    const logged_in = this.$q.localStorage.getItem("user_id");
  var query = col.where("id", "==", this.$route.params.id);
  query.get().then(snapshot => {
   if (snapshot.docs.length > 0) {
    snapshot.docs.forEach(doc => {
      this.groupName = doc.data().name;
      this.zipcode = doc.data().zipcode;
      this.profileType = doc.data().profileType;
      this.description = doc.data().description;
      this.category = doc.data().category;
      this.privateGroup = doc.data().isPrivate;
    // alert(doc.data().photo)
     this.imageUrl = doc.data().photo;
     if (doc.data().users) {
        const users = doc.data().users.map(function(el) {
            console.log(el.uid)
           if(el.uid != logged_in){
               return el.uid;
           } 
           else
           {
               return false;
           }
                
           
        
        });
        //console.log(users)
        this.getUserList(users);
        
   }
    });
   }
  });

 },
 methods: {
  editGroup() {
    //   alert(this.groupName.toLowerCase());
    //   return false;
      if(this.photo){
                this.$db
            .collection("groups")
            .doc(this.$route.params.id)
            .update({
            name: this.groupName.toLowerCase(),
            category: this.category,
            isPrivate: this.privateGroup,
            description: this.description,
            photo: this.photo,
            zipcode: this.zipcode 
            });
            }
            else{
                this.$db
            .collection("groups")
            .doc(this.$route.params.id)
            .update({
            name: this.groupName.toLowerCase(),
            category: this.category,
            isPrivate: this.privateGroup,
            description: this.description,
            //photo: this.photo,
            zipcode: this.zipcode 
            });
      }

    this.$q.notify("Group is updated successfully.")
   //this.$router.push("/home");
  },
  addPhoto() {
   this.prompt_crop = true;
  },
  getUserList(users) {
   const col = this.$db.collection("users");
   const query = col.where("uid", "in", users);
   query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     //alert(doc.data().uid)
     

     var full_name = doc.data().name;
     var split_it = full_name.split(" ");
     var first_name = split_it[0];
     const member = {
      img: doc.data().avatar
       ? doc.data().avatar
       : "https://cdn.quasar.dev/img/avatar.png",
      name: first_name,
      id: doc.data().uid,
      
     };
     this.members.push(member);
    });
   });
  }
  ,

  change(data) {
   this.prompt_crop = false;
   if (data != null) {
    this.uploading = true;
    this.base64Image = data;
    this.uploadTask = this.uploadToStorage(this.base64Image);
    this.uploadTask.on("state_changed", () => {
     this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
      if (this.uploadTask.snapshot.state) {
       this.uploading = false;

       this.photo = downloadURL;
       this.imageUrl = downloadURL;
      }
     });
    });
   }
  },
  uploadToStorage(base64image, path) {
   let uniqkey = "pic" + Math.floor(Math.random() * 1000000);
   var pathUrl = (path ? path : "avatars") + "/" + uniqkey;
   let storageRef = this.$storage.ref(pathUrl);
   return storageRef.putString(base64image, "data_url");
  }
 }
};
</script>
