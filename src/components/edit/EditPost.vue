<template>
 <div>
  <q-form @submit="onSubmit" @reset="onReset" class="q-mt-md">
   <div class="flex">
    <div class="q-mr-sm">
     <q-avatar>
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
     </q-avatar>
    </div>
    <div>
     <div>{{ user.name }}</div>
     <SelectGroup
      :show-all="false"
      style="width: 250px"
      placeholder="select group"
      v-model="post.group"
     />
    </div>
   </div>
   <textarea
    class="post-text q-mt-sm"
    placeholder="Post text"
    v-model="post.text"
   ></textarea>
   <div class="flex justify-center">
    <div class="q-mr-sm text-h4" @click="captureImage()">
     <q-icon name="camera" />
    </div>
    <div class="q-mr-sm text-h4" @click="captureVideo()">
     <q-icon name="videocam" />
    </div>
    <div class="q-mr-sm text-h4">
     <q-icon name="album" @click="cdkMedias()" />
    </div>
   </div>
   <div class="text-center">
    <q-btn @click="upload" label="Edit" color="teal" />
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
       @click="detailView(index)"
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
   <div>
    <center>
     <div
      class="q-mt-md"
      v-if="videos.length != 0"
      style="width:90%;border-radius:10px"
     >
      <video
       class="q-mt-sm"
       loop
       muted
       playsinline
       style="width: 100%;max-height:200px;object-fit: cover;min-height:200px"
       v-for="(src, index) in videos"
       :src="src"
       :key="'video' + src + index"
       preload="metadata"
       controls
      >
       <source :src="src" type="video/mp4" />
      </video>
     </div>
    </center>
    <q-linear-progress
     class="full-width q-mb-sm q-mt-xl text-blue-9 fixed-top"
     v-if="videos.length != 0"
     style="height: 15px;"
     :value="progress"
    />
   </div>
   <q-dialog
    v-model="detail_prompt"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
   >
    <ImageDetail :images="images" :slide="selectedIndex" />
   </q-dialog>
  </q-form>
 </div>
</template>
<script>
import { mapState } from "vuex";
import SelectGroup from "../shared/selects/SelectGroup.vue";
import ImageDetail from "../images/ImageDetail.vue";
export default {
 components: {
  SelectGroup,
  ImageDetail
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  })
 },
 props: {
  post: {
   type: Object,
   default: null
  }
 },
 data() {
  return {
   name: null,
   age: null,
   accept: false,
   inGroupList: [],
   currentUid: null,
   images: [],
   videos: [],
   detail_prompt: false,
   selectedIndex: 0,
   progress: 0.05,
   mediaType: null,
   mediaDownloadUrls: []
  };
 },
 async created() {
  this.currentUid = this.$q.localStorage.getItem("user_id");
  this.images = this.post.mediaUrls.filter(
   a => !a.match(/\.(jpeg|jpg|gif|png)$/) != null
  );
  this.videos = this.post.mediaUrls.filter(
   a => a.match(/\.(jpeg|jpg|gif|png)$/) != null
  );
  this.mediaDownloadUrls = this.post.mediaUrls;
 },
 methods: {
  onSubmit() {
   this.post.personal = this.post.group ? false : true;
   this.$db
    .collection("posts")
    .doc(this.post.id)
    .update(this.post);
   this.$q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted"
   });
  },

  onReset() {
   this.name = null;
   this.age = null;
   this.accept = false;
  },
  captureImage() {
   navigator.camera.getPicture(
    data => {
     // on success
     var img = `data:image/jpeg;base64,${data}`;
     this.images.push(img);
    },
    () => {
     // on fail
     this.$q.notify("Could not access device camera.");
    },
    {
     limit: 3,
     quality: 0.5,
     destinationType: navigator.camera.DestinationType.DATA_URL
    }
   );
  },
  captureVideo() {
   try {
    navigator.device.capture.captureVideo(
     mediaFiles => {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
       path = mediaFiles[0].fullPath;
       path = "file://" + path; //for iOS
       var that = this;
       window.resolveLocalFileSystemURL(path, function(fileEntry) {
        return fileEntry.file(function(data) {
         var reader = new FileReader();
         reader.onloadend = function(e) {
          that.videos.push(e.target.result);
         };
         return reader.readAsDataURL(data);
        });
       });
      }
     },
     () => {
      this.$q.notify("Could not access the camera");
     },
     {
      limit: 1,
      duration: 24,
      quality: 0.5
     }
    );
   } catch (err) {
    this.$q.notify(err);
   }
  },
  cdkMedias() {
   var args = {
    selectMode: 101, //101=picker image and video , 100=image , 102=video
    maxSelectCount: 10, //default 40 (Optional)
    maxSelectSize: 188743680 //188743680=180M (Optional)
   };
   var that = this;
   try {
    window.MediaPicker.getMedias(
     args,
     function(medias) {
      that.getThumbnail(medias);
     },
     function(e) {
      alert(e);
     }
    );
   } catch (err) {
    this.$q.notify(err);
   }
  },
  detailView(index) {
   this.detail_prompt = true;
   this.selectedIndex = index;
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
        that.mediaType = type;
       }
       if (type == 0) {
        media = "data:image/jpeg;base64," + data.thumbnailBase64;
        that.images.push(media);
       }
      } else if (data["mediaType"] == "video") {
       if (type == -1) {
        type = 1;
        that.mediaType = type;
       }
       if (type == 1) await that.getBase64StringByFilePath(data.uri);
      }
     });
    } catch (err) {
     this.$q.notify(err);
    }
   }
  },
  getBase64StringByFilePath(fileURL) {
   var that = this;
   return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(fileURL, function(fileEntry) {
     return fileEntry.file(function(data) {
      var reader = new FileReader();
      reader.onload = function(e) {
       that.videos.push(e.target.result);
       resolve("success");
      };
      reader.onerror = error => {
       this.$q.notify(error);
       this.$q.notify(reject);
      };

      return reader.readAsDataURL(data);
     });
    });
   });
  },
  async upload() {
   var i = 0;
   if (this.post.text.length == 0 && this.mediaType == -1) {
    this.alertLabel = "Still Uploading";
    this.alert = true;
    return;
   }
   this.mediaUploading = true;
   if (this.mediaType == 0) {
    for (i = 0; i < this.images.length; i++) {
     if (!this.post.mediaUrls.find(a => a == this.images[i])) {
      var base64_image = this.images[i];
      await this.uploadMedia(base64_image, 0);
     }
    }
   }
   if (this.mediaType == 1) {
    for (i = 0; i < this.videos.length; i++) {
     if (!this.post.mediaUrls.find(a => a == this.images[i])) {
      var base64_video = this.videos[i];
      await this.uploadMedia(base64_video, 1);
     }
    }
   }
   var personal_feed = {
    avatar: this.user.avatar
     ? this.user.avatar
     : "https://cdn.quasar.dev/img/boy-avatar.png",
    uid: this.currentUid,
    created_at: this.post.created_at,
    text: this.post.text,
    mediaUrls: this.mediaDownloadUrls,
    likes: this.post.likes,
    comments: this.post.comments,
    mediaType: this.post.mediaType,
    group: this.post.group,
    owner: this.user,
    personal: this.post.group === null ? true : false
   };
   this.$db
    .collection("posts")
    .doc(this.post.id)
    .set(personal_feed);
   this.mediaUploading = false;
   this.images = [];
   this.videos = [];
   this.postText = "";
   this.mediaType = -1;
   this.mediaDownloadUrls = [];
   let users = [];
   let group_name = null;
   let groups_snapShot = await this.$db
    .collection("groups")
    .where("id", "==", this.post.group)
    .get();
   groups_snapShot.docs.forEach(doc => {
    users = doc.data().users;
    group_name = doc.data().name;
   });
   let that = this;
   users.forEach(a => {
    if (a.uid !== this.currentUid) {
     this.$db.collection("notifications").add({
      owner: this.currentUid,
      receiver: a.uid,
      status: "unread",
      group: group_name,
      group_id: that.post.group,
      name: that.user.name,
      time: new Date().getTime(),
      avatar: that.user.avatar
       ? this.user.avatar
       : "https://cdn.quasar.dev/img/boy-avatar.png",
      flag: 8
     });
    }
   });
   this.$emit("close");
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
        this.mediaDownloadUrls.push(downloadURL);
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
</style>
