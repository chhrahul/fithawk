<template>
 <div class="q-mr-md q-ml-md q-mt-md">
  <q-form @submit="onSubmit" @reset="onReset" class="q-mt-md">
   <div class="q-mt-md">
    <q-radio
     v-model="post.paid"
     @rules="[val => $v.post.paid.required || 'Is the event paid ?']"
     val="true"
     label="Paid *"
     color="accent"
    />
    <q-radio
     @rules="[val => $v.post.paid.required || 'Is the event paid ?']"
     v-model="post.paid"
     val="false"
     label="Not Paid *"
     color="accent"
    />
   </div>
   <q-input
    v-model="post.cost"
    v-if="post.paid == 'true'"
    outlined
    label="Event Cost"
   />
   <q-radio
    @rules="[val => $v.post.paid.required || 'Is the event paid ?']"
    v-model="post.recurring"
    val="true"
    label="Recurring Event *"
    color="accent"
   />
   <q-radio
    v-model="post.recurring"
    val="false"
    @rules="[val => $v.post.paid.required || 'Is the event paid ?']"
    label="Non-Recurring Event *"
    color="accent"
   />
   <q-select
    v-if="post.recurring == 'true'"
    filled
    v-model="post.duration"
    :options="durations"
    label="Select Recurring Period"
   />
   <q-select
    filled
    v-model="post.days"
    v-if="post.duration == 'Every Week' || post.duration == 'Every 2 Weeks'"
    multiple
    :options="options"
    label="Select Recurring Days Of The Week"
   />
   <q-input
    label="Month Start Date"
    v-if="post.duration == 'Every Month'"
    filled
    v-model="post.month_start_date"
    mask="date"
   >
    <template v-slot:append>
     <q-icon name="event" class="cursor-pointer">
      <q-popup-proxy
       ref="qDateProxy"
       transition-show="scale"
       transition-hide="scale"
      >
       <q-date
        v-model="post.month_start_date"
        @input="() => $refs.qDateProxy.hide()"
       />
      </q-popup-proxy>
     </q-icon>
    </template>
   </q-input>
   <q-input
    label="Month End Date"
    v-if="post.duration == 'Every Month'"
    filled
    v-model="post.month_end_date"
    mask="date"
   >
    <template v-slot:append>
     <q-icon name="event" class="cursor-pointer">
      <q-popup-proxy
       ref="qDateProxy"
       transition-show="scale"
       transition-hide="scale"
      >
       <q-date
        v-model="post.month_end_date"
        @input="() => $refs.qDateProxy.hide()"
       />
      </q-popup-proxy>
     </q-icon>
    </template>
   </q-input>
   <div>
    <SelectGroup @input="GetSelectedGroupId" />
    <q-input
     class="q-mt-md"
     v-model="post.title"
     @input="$v.post.title.$touch()"
     :rules="[val => $v.post.title.required || 'Title is required']"
     filled
     label="Event Title *"
    />

    <q-input
     v-model="post.text"
     filled
     type="textarea"
     label="Event Description"
    />

    <q-input
     class="q-mt-md"
     label="Event Date *"
     filled
     v-model="post.event_date"
     mask="date"
     :rules="[val => $v.post.event_date.required || 'Event Date is required']"
    >
     <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
       <q-popup-proxy
        ref="qDateProxy"
        transition-show="scale"
        transition-hide="scale"
       >
        <q-date
         v-model="post.event_date"
         @input="() => $refs.qDateProxy.hide()"
        />
       </q-popup-proxy>
      </q-icon>
     </template>
    </q-input>
    <q-input
     filled
     v-model="post.event_time"
     label="Event Time *"
     :rules="[val => $v.post.event_time.required || 'Event Time is required']"
    >
     <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
       <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-time v-model="post.event_time" mask="HH:mm" format24h />
       </q-popup-proxy>
      </q-icon>
     </template>
    </q-input>
    <q-input
     v-model="post.location"
     @rules="[val => $v.post.location.required || 'Event Location is required']"
     filled
     type="text"
     @input="checkAddress()"
     label="Event Location *"
    />

    <q-list v-for="(item, id) in addresses" :key="id">
     <q-item>
      <q-item-section
       v-if="item.formatted_address != null"
       class="white_bg"
       @click="fillinaddress(item.formatted_address)"
      >
       <q-item-label class="europa-bold onyx" style="font-size: 1.1em;">{{
        item.formatted_address
       }}</q-item-label>
      </q-item-section>
     </q-item>
     <q-separator />
    </q-list>

    <div class="q-mt-md">
     Select Event Image: <q-btn icon="camera_alt" flat @click="cdkMedias()" />
    </div>
    <div>
     <center>
      <div
       class="q-mt-md"
       v-if="images.length != 0"
       style="width:90%;border-radius:10px"
      >
       <img
        style="width:100%"
        v-for="(src, index) in images"
        :src="src"
        :key="'img' + index"
       />
      </div>
     </center>
     <q-linear-progress
      class="full-width q-mb-sm q-mt-xl text-blue-9 fixed-top"
      v-if="images.length != 0"
      style="height: 15px;"
      :value="progress"
     />
    </div>
   </div>

   <br /><br />

   <div class="text-center">
    <q-btn @click="onSubmit()" label="Create Event" color="accent" />
   </div>
  </q-form>
  <br /><br /><br /><br /><br /><br />
 </div>
</template>
<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import axios from "axios";

import SelectGroup from "../shared/selects/SelectGroup.vue";

export default {
 components: {
  SelectGroup
 },
 validations: {
  post: {
   title: { required },
   event_date: { required },
   event_time: { required },
   location: { required },
   paid: { required },
   recurring: { required }
  }
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  })
 },

 data() {
  return {
   post: {
    text: null,
    paid: null,
    group: null,
    mediaType: null,
    mediaUploading: null,
    mediaDownloadUrls: [],
    detail_prompt: false,
    event_date: "",
    personal: true,
    month_start_date: null,
    month_end_date: null,
    days: [],
    users: [],
    cost: 0,
    duration: null
   },

   images: [],
   addresses: [
    {
     formatted_address: null
    }
   ],
   durations: ["Every Week", "Every 2 Weeks", "Every Month"],
   options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
   ]
  };
 },

 methods: {
  GetSelectedGroupId(val) {
   this.post.group = val;
  },
  fillinaddress(address) {
   this.post.location = address;
   this.addresses = [{ formatted_address: null }];
  },
  cdkMedias() {
   var args = {
    selectMode: 101, //101=picker image and video , 100=image , 102=video
    maxSelectCount: 10, //default 40 (Optional)
    maxSelectSize: 188743680 //188743680=180M (Optional)
   };
   var that = this;
   try {
    window.MediaPicker.getMedias(args, function(medias) {
     that.getThumbnail(medias);
    });
   } catch (err) {
    alert(err);
   }
  },
  getThumbnail(medias) {
   var that = this;
   var type = -1;
   for (var i = 0; i < medias.length; i++) {
    try {
     window.MediaPicker.extractThumbnail(medias[i], async function(data) {
      var media;
      if (data["mediaType"] == "image") {
       if (type == -1) {
        type = 0;
        that.post.mediaType = type;
       }
       if (type == 0) {
        media = "data:image/jpeg;base64," + data.thumbnailBase64;
        that.images.push(media);
       }
      }
     });
    } catch (err) {
     alert(err);
    }
   }
  },
  async onSubmit() {
   this.$v.post.$touch();
   if (this.$v.post.$error) {
    alert("Please fill in all required fields and correct errors in the form!");
    return;
   }

   this.post.mediaUploading = true;
   if (this.post.mediaType == 0) {
    for (var i = 0; i < this.images.length; i++) {
     var base64_image = this.images[i];
     await this.uploadMedia(base64_image, 0);
    }
   }

   this.post.personal = this.post.group ? false : true;

   var eventRef = this.$db.collection("events").doc();
   eventRef.set({
    id: eventRef.id,
    group: this.post.group,
    personal: this.post.personal,
    location: this.post.location,
    event_date: this.post.event_date,
    event_time: this.post.event_time,
    mediaType: this.post.mediaType,
    mediaUploading: this.post.mediaUploading,
    mediaDownloadUrls: this.post.mediaDownloadUrls,
    paid: this.post.paid,
    recurring: this.post.recurring,
    text: this.post.text,
    cost: this.post.cost,
    title: this.post.title,
    days: this.post.days,
    duration: this.post.duration,
    month_start_date: this.post.month_start_date,
    month_end_date: this.post.month_end_date
   });

   const doc = await this.$db
    .collection("groups")
    .doc(this.post.group)
    .get();
   this.group_new = doc.data();
   //alert(JSON.stringify(this.group_new.users));

   if (this.group_new.users) {
    const users = this.group_new.users.map(function(el) {
     return el.uid;
    });
    this.getUserList(users, this.post, this.group_new.name, eventRef.id);
   }

   this.$q.notify("Event Created");
   //this.$router.push("/events");
   this.$router.push("/event/"+eventRef.id);

   
  },
  async getUserList(users, eve, group_name, event_id) {
   const col = this.$db.collection("users");
   const query = col.where("uid", "in", users);
   await query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
     var uid = doc.data().uid;

     var notificationRef = this.$db.collection("notifications").doc();
     notificationRef.set({
      id: notificationRef.id,
      groupID: eve.group,
      name: this.$q.localStorage.getItem("name"),
      sender: this.$q.localStorage.getItem("user_id"),
      group: group_name,
      receiver: uid,
      flag: "2",
      status: "unread",
      created_at: new Date().getTime(),
      event_title: eve.title,
      event_date: eve.event_date,
      event_time: eve.event_time,
      to: event_id
     });
    });
   });
  },
  async uploadMedia(baseString, mediaType) {
   return new Promise(resolve => {
    this.uploadTask = this.uploadToStorage(baseString);
    this.uploadTask.on(
     "state_changed",
     sp => {
      if (sp.bytesTransferred / sp.totalBytes > 0.05)
       this.progress = sp.bytesTransferred / sp.totalBytes;
     },
     () => {
      alert("error on this " + mediaType);
     },
     () => {
      this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
       if (this.uploadTask.snapshot.state) {
        this.post.mediaDownloadUrls.push(downloadURL);
        this.progress = 0;
        resolve(downloadURL);
       }
      });
     }
    );
   });
  },
  uploadToStorage(base64image, path) {
   let uniqkey = "pic" + Math.floor(Math.random() * 1000000);
   var pathUrl = (path ? path : "avatars") + "/" + uniqkey;
   this.uploadMediaPath = pathUrl;
   let storageRef = this.$storage.ref(pathUrl);
   return storageRef.putString(base64image, "data_url");
  },
  checkAddress() {
   if (this.post.location == "") {
    this.addresses = [{ formatted_address: null }];
   }
   var address = this.post.location;
   axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
     params: {
      address: address,
      key: "AIzaSyDIw-8X7wdzxWHlBBeLc0OS-jzvMtzBwzs"
     }
    })
    .then(response => {
     response.data.results.forEach(doc => {
      this.addresses.unshift(doc);
     });
    })
    .catch(error => {
     alert(error);
    });
  },
  onReset() {
   this.name = null;
   this.age = null;
   this.accept = false;
  }
 }
};
</script>
<style>
.post-title {
 background: transparent;
}
.post-text {
 width: 100%;
 border: none;
 background: transparent;
 height: 30vh;
}
.post-input {
 width: 100%;
 border: none;
 background: transparent;
 height: 45px;
}
.white_bg {
 background-color: white;
 height: 35px;
 padding-left: 20px;
}
.white_bg_date {
 background-color: white;
}
</style>
