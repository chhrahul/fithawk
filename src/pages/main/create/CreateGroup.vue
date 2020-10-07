<template>
  <div class="q-mr-md q-ml-md q-mt-md">
    <q-dialog v-model="prompt_crop">
      <ImageCroper :imageUrl="imageUrl" @change="change($event)" ref="ImageCropped" />
    </q-dialog>
    <div class="fixed-center" v-if="uploading">
      <q-spinner color="blue" size="5em" :thickness="8" />
    </div>

    <q-img
      :src="photo == null ? imageUrl: photo"
      class="q-pa-lg"
      @click="addPhoto"
      style="width: 318px;
    max-width: 318px;
    height: 250px;
    max-height: 250px;
    margin-left: 5px;"
      rounded
    ></q-img>

    <q-input
      v-model="groupName"
      autogrow
      filled
      class="q-pa-xs q-mt-xs"
      type="text"
      color="accent"
      label="Group Name"
    />

    <q-select filled color="accent" class="q-pa-xs" :options="options" v-model="category" />

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

    <q-input filled color="accent" class="q-pa-xs" v-model="zipcode" label="Zip Code" />

    <center class="q-pa-sm">
      <GlobalPillButton label="Next" @click="createGroup($event)" />
    </center>
  </div>
</template>

<script>
import Vue from "vue";
import GlobalPillButton from "../../../components/shared/buttons/GlobalPillButton";
import ImageCroper from "../../../components/modals/ImageCroper";
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
      category: "Select Category",
      privateGroup: false,
      zipcode: null,
      description: null,
      prompt_crop: false,
      imageUrl: "statics/group/add.png",
      photo: null,
      uploadTask: {},
      uploading: false,
      minWidth: 270,
      minHeight: 180,
      width: 0,
      height: 0
    };
  },
  components: {
    GlobalPillButton,
    ImageCroper
  },
  mounted() {},
  methods: {
    createGroup() {
      //alert(this.photo);
      if (this.photo) {
        this.photo = this.photo;
      } else {
        this.photo = "/statics/logos/fithawklogo.png";
      }
      //   alert(this.photo);
      //   return false;

      if (this.width >= this.minWidth && this.height >= this.minHeight) {
        var uid = this.$q.localStorage.getItem("user_id");
        var groupRef = this.$db.collection("groups").doc();
        groupRef.set({
          id: groupRef.id,
          name: this.groupName.toLowerCase(),
          ownerUID: uid,
          category: this.category,
          isPrivate: this.privateGroup,
          description: this.description,
          photo: this.photo,
          zipcode: this.zipcode,
          users: [
            {
              uid: uid,
              role: "admin"
            }
          ]
        });
        this.$router.push("/group/"+groupRef.id);

        // Calls the initChat function
        this.initNewChat()
      } else {
        this.$q.notify(
          "Minimum width & height must be " +
            this.minWidth +
            "x" +
            this.minHeight
        );
      }
    },
    addPhoto() {
      this.prompt_crop = true;
    },
    getWidthHeight() {
      // Finally received cropped width and height
      let data = this.$refs.ImageCropped.sendWidhtHeight();
      this.width = data[0];
      this.height = data[1];
      // console.log("W & H: "+this.width)
      if (!(this.width >= this.minWidth && this.height >= this.minHeight)) {
        this.$q.notify(
          "Minimum width & height must be " +
            this.minWidth +
            "x" +
            this.minHeight
        );
      }
    },
    change(data) {
      this.getWidthHeight();
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
    },
    initNewChat() {
      // This is the users UID, this line should be stored in the data() because we have the exact same line when we create the group
      var uid = this.$q.localStorage.getItem("user_id");

      let channelInfo = {
        type: "group",
        channelId: this.groupRefId, // Channel Id will be set to the group Id
        members: [uid],
        admin: [uid], // The admin section is not used at the moment but is created just in case we want to add more functionality in the future
        created: Date.now(),
        image: this.photo,
        name: this.groupName.toLowerCase() // Why are we making the group name all lowercase? This was taken from above. I am just trying to keep consitency
      };

      // First message message. I made this in order for it to be easer to query and display messages on MessageList.vue
      let firstMsg = {
        userId: "Bot",
        userName: "Group Chat Bot",
        created: Date.now(),
        content: `Hi, I am a bot and this is ${this.groupName.toLowerCase()}'s group chat. Be the first one to start a conversation 👇`,
        status: "pending",
        read: false,
        sent: true,
        mediaType: "text"
      };

      // Setting the messages channel ID to the group chat ID. This makes it easier to decide what group chat belongs to what group
      this.$db
        .collection("messages")
        .doc(this.groupRefId)
        .set(channelInfo)
        .then(docRef => {
          this.$db
            .collection(["messages", this.groupRefId, "thread"].join("/"))
            .add(firstMsg)
            .then(snapshot => {
              console.log("Sent successfully");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
