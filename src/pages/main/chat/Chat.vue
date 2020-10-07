<!-- 
TODO: 
- Break up this page into different components and stuff 
- Make chat look nicer
--> 

<template>
  <q-page class="flex column">
    <!-- Page container that has the content -->

    <!-- <div style="width: 100%; max-width: 400px"> -->

    <!-- Loading spinner -->
    <div class="fixed-center uploading" v-if="isLoading">
      <q-spinner color="deep-orange-4" size="3em" />
    </div>
    <div v-else>
      <MessagesHeader
        leftIcon="arrow_back_ios"
        :image="channelInfoData.type === 'private' ? otherUserData.avatar : channelInfoData.image"
        @click="back($event)"
        :name="channelInfoData.type === 'private' ? otherUserData.name : channelInfoData.name"
      />
      <q-infinite-scroll
        scroll-target="#scroll-target-id"
        :offset="250"
        ref="pageChat"
        @load="onLoad"
        :disable="endInfiniteScroll"
        reverse
      >
        <!-- Spinner for when loading messages -->
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="deep-orange-4" size="40px" />
          </div>
        </template>

        <div
          v-for="(message, index) in msgList"
          :key="index"
          class="q-px-md q-py-xs column col justify-end"
        >
          <!-- Messages -->
          <q-chat-message
            v-if="message.content"
            :text="[message.content]"
            :sent="message.userId === userId"
            :name="channelInfoData.type === 'group' ? (message.userId == userInfo.uid ? null : message.userName) : null"
            class="my-font"
            :bg-color="message.userId === userId ? 'deep-orange-4 shadow-19' : 'grey-1 shadow-19'"
            :text-color="message.userId === userId ? 'white' : 'black'"
            :stamp="message.created | moment('from','now')"
          />

          <!-- Start of displaying media. If statements can def be simplified -->

          <!-- For Photos -->
          <div
            class="row"
            v-if="message.userId == userId && message.src && message.mediaType == 'image'"
          >
            <div class="col-7"></div>
            <div class="col-5">
              <img style="width:100%;border:1px solid gray" :src="message.src" />
              <p
                class="my-font"
                style="margin-top:-7px;text-align:right"
              >{{message.created | moment('from','now')}}</p>
            </div>
          </div>

          <div
            class="row q-ml-sm"
            v-if="message.userId != userId && message.src && message.mediaType == 'image'"
          >
            <div class="col-5">
              <img style="width:100%;border:1px solid gray" :src="message.src" />
              <p
                class="my-font"
                style="margin-top:-7px;text-align:right"
              >{{message.created | moment('from','now')}}</p>
            </div>
            <div class="col-7"></div>
          </div>

          <!-- For videos -->
          <div
            class="row q-ml-sm"
            s
            v-if="message.userId == userId && message.src && message.mediaType == 'video'"
          >
            <div class="col-7"></div>
            <div class="col-4">
              <video loop muted playsinline :width="getWidth" :height="getWidth" controls>
                <source :src="message.src" type="video/mp4" />
              </video>

              <p
                class="my-font"
                style="margin-top:-7px;text-align:right"
              >{{message.created | moment('from','now')}}</p>
            </div>
          </div>

          <div
            class="row q-ml-sm"
            style="margin-left:20px"
            v-if="message.userId != userId && message.src && message.mediaType == 'video'"
          >
            <div class="col-4">
              <video loop muted playsinline :width="getWidth" :height="getWidth" controls>
                <source :src="message.src" type="video/mp4" />
              </video>

              <p
                class="my-font"
                style="margin-top:-7px;text-align:right"
              >{{message.created | moment('from','now')}}</p>
            </div>
            <div class="col-7"></div>
          </div>
          <!-- End of displaying media -->
        </div>
      </q-infinite-scroll>

      <!-- Popup dialog -->
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section style="text-align:center">
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section>{{alertLabel}}</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Footer -->
      <q-footer elevated style="background-color:white;">
        <q-form @submit="sendMsg" class="full-width">
          <div
            class="q-mt-sm text-center full-width"
            style="max-height: 200px;"
            v-show="media.media"
          >
            <q-img contain style="max-width: 60%; max-height: 150px;" :src="media.media">
              <q-btn
                round
                size="sm"
                style="position: absolute; right: 0; top:0;"
                dense
                icon="close"
                @click="clearMedia"
                color="red"
                text-color="white"
              />
            </q-img>

            <!-- <div>
            <q-btn round flat icon="ion-ios-trash" color="red" @click="clearMedia" />



            <span class="q-mt-sm" id="Area" style="width: 100%;" />
            </div>-->
          </div>

          <div class="row q-py-sm">
            <!-- <div class="self-end">
            <label id="myFile" for="file-input"></label>
            <input id="file-input" type="file" accept="image/*, video/*" @change="attachFile" />
            </div>-->
            <div style="padding-bottom:12px;" class="col-3 self-end">
              <q-btn
                style="height:40px; width:25px;"
                round
                color="red"
                icon="photo_camera"
                class="q-ml-sm"
                flat
                @click="captureImage"
              />
              <label id="myFile" for="file-input"></label>
              <input id="file-input" type="file" accept="image/*, video/*" @change="attachFile" />
            </div>

            <div class="col q-my-xs q-mr-sm">
              <q-input
                ref="inputEl"
                autogrow
                @blur="inputBlur()"
                @focus="inputFocus()"
                color="grey-5"
                v-model="inputText"
                placeholder="Write a message..."
                outlined
                rounded
                class="full-width no-outline"
                style="cursor:pointer;"
                maxlength="1000"
              >
                <template v-slot:append>
                  <q-btn
                    :disable="!inputText && !media.media"
                    style="height:40px; width:40px;"
                    round
                    @click="sendMsg"
                    type="submit"
                    class="shadow-24"
                    color="red"
                    icon="send"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
      </q-footer>
    </div>
  </q-page>
</template>

<style scoped>
.platform-ios .q-footer {
  /* for your app's footer */
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.remove-footer-padding {
  /* This is to remove the padding at the bottom of the footer once the keyboard is open*/
  padding-bottom: 0px !important;
}

.q-message-received .q-message-text-content {
  color: white;
}
/* background: url(../../assets/imgs/_ionicons_svg_ios-attach.svg); */
#myFile {
  display: inline-block;
  position: absolute;
  width: 40px;
  height: 40px;
  background: url(../../../assets/imgs/_ionicons_svg_ios-attach.svg);
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: center;
  cursor: pointer;
  margin-left: 20px;
}

input[type="file"] {
  opacity: 0;
  position: absolute;
  pointer-events: none;

  width: 1px;
  height: 1px;
}
</style>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
Vue.use(VueMoment);

import MessagesHeader from "../../../components/navigation//MessagesHeader";
import { platform } from "os";

export default {
  name: "Chat",
  data() {
    return {
      channelId: "", // needs to be null later
      endInfiniteScroll: false,
      oldestTimeStamp: "",
      userInfo: {}, // This is the userInfo that came from vuex
      channelInfoData: {}, // This is the info about the group. Hold details like group type, group name, admin, etc...
      userId: "",
      userName: "",
      myInfo: {},
      toUserInfo: {}, // May not need this anymore
      inputText: "",
      msgList: [],
      media: { media: "", type: "" }, // holds "media" and "type"
      uploadTask: {},
      user: {},
      isLoading: true,
      mediaSending: false,
      alert: false,
      alertLabel: "",
      otherUserData: "" // only will be used if the chat type is private
    };
  },
  components: {
    MessagesHeader
  },
  computed: {
    getWidth() {
      var width = window.innerWidth / 3;
      return width;
    },
    realMsgs() {
      return this.$store.getters["storage/realMsgs"];
    },

    // Possibly how messages update in realtime
    refreshRealMsgKey() {
      return this.$store.getters["storage/refreshRealMsgKey"];
    }
  },
  watch: {
    refreshRealMsgKey() {
      console.log(this.realMsgs.length);
      this.realMsgs.forEach(msg => {
        this.msgList.push(msg);
      });
      this.$store.commit("storage/clearRealMsgs");
      this.scrollToBottom();
    }
  },
  mounted() {
    this.init_variable();
  },
  methods: {
    // This is the function to pick media. This is for the "attach" icon.
    async attachFile(e) {
      this.clearMedia(); // Clears the media before putting it in again.
      var file = e.target.files[0];
      if (file == undefined) return;
      if (file.type.includes("image")) {
        this.media = { media: "", type: "" };

        var image = new Image();
        var reader = new FileReader();
        var that = this;
        reader.onload = e => {
          that.media["media"] = e.target.result;
          that.media["type"] = "image";
          this.scrollToBottom(); //scrolls to bottom after image has been inserted
        };
        reader.readAsDataURL(file);
      } else if (file.type.includes("video")) {
        this.media = { media: "", type: "" };
        var reader = new FileReader();
        var that = this;
        reader.onload = e => {
          this.media["media"] = e.target.result;
          this.media["type"] = "video";

          this.scrollToBottom(); //scrolls to bottom after video has been inserted
        };
        reader.readAsDataURL(file);
      }
    },
    customStyling() {
      // This is where we can put custom styling when all the data loads onto the page
      this.$nextTick(() => {
        var textArea = document.querySelector("textarea");
        textArea.style.maxHeight = "200px";
      });
    },
    // This is the function to open the native device camera
    captureImage() {
      this.clearMedia(); // Clears the media before putting it in again.
      try {
        navigator.camera.getPicture(
          data => {
            // on success
            var img = `data:image/jpeg;base64,${data}`;
            this.media["media"] = img;
            this.media["type"] = "image";

            this.scrollToBottom(); //scrolls to bottom after image has been inserted
          },
          err => {
            // When no image is selected
          },
          {
            limit: 1,
            quality: 1,
            destinationType: navigator.camera.DestinationType.DATA_URL
          }
        );
      } catch (err) {}
    },

    scrollToBottom() {
      var pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scroll({
          top: pageChat.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      }, 500);
    },
    clearMedia() {
      this.media = { media: "", type: "" };
    },
    sendMsg() {
      if (this.inputText.length == 0 && this.media.media == 0) {
        this.alertLabel = "No message";
        this.alert = true;
        return;
      }

      // Mock message
      const id = Date.now().toString();
      let newMsg = {
        userId: this.userId,
        userName: this.userInfo.name,
        created: Date.now(),
        content: this.inputText,
        status: "pending",
        read: false,
        sent: true,
        mediaType: "text"
      };
      if (newMsg.content.length != 0) this.pushNewMsg(newMsg);

      this.inputText = "";

      //this.upDateReadStatus(this.myInfo.uid, this.toUserInfo.uid);

      if (newMsg.content.length != 0) {
        this.sendTo(newMsg).then(() => {
          let index = this.getMsgIndexById(id);
          if (index !== -1) {
            this.msgList[index].status = "success";
          }
        });
      }
      if (this.media.media) {
        // There really is no reason to put parameters in this
        this.sendMedia(this.media.media, this.media.type);
      }
      this.clearMedia();

      this.scrollToBottom(); // Scrolls to bottom after message was sent
    },

    sendTo(msg) {
      msg.status = "success";
      let promise = new Promise((resolve, reject) => {
        this.$db
          .collection(["messages", this.channelId, "thread"].join("/"))
          .add(msg)
          .then(snapshot => {
            resolve("Saved Successfully.");
          })
          .catch(err => {
            reject(err);
          });
      });
      return promise;
    },
    sendMedia(baseString, type) {
      var id = Date.now().toString();
      this.mediaSending = true;
      this.uploadTask = this.uploadToStorage(baseString);
      this.uploadTask.on(
        "state_changed",
        sp => {},
        error => {
          this.mediaSending = false;
        },
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            if (this.uploadTask.snapshot.state) {
              let mediaMsg = {
                userId: this.userId,
                userName: this.userInfo.name,
                created: Date.now(),
                content: this.inputText,
                status: "pending",
                read: false,
                sent: true,
                src: downloadURL,
                mediaType: type
              };

              this.inputText = "";

              //this.upDateReadStatus(this.myInfo.uid, this.toUserInfo.uid);
              this.sendTo(mediaMsg)
                .then(() => {
                  // Should only push the message if successful
                  this.pushNewMsg(mediaMsg);
                  let index = this.getMsgIndexById(id);
                  if (index !== -1) {
                    this.msgList[index].status = "success";
                  }
                  this.mediaSending = false;

                  this.scrollToBottom();
                })
                .catch(err => alert(err));
            }
          });
        }
      );
    },
    uploadToStorage(base64image, path) {
      let uniqkey = "pic" + Math.floor(Math.random() * 1000000);
      var pathUrl = (path ? path : "avatars") + "/" + uniqkey;
      let storageRef = this.$storage.ref(pathUrl);
      return storageRef.putString(base64image, "data_url");
    },

    getMsgIndexById(id) {
      return this.msgList.findIndex(e => e.messageId === id);
    },

    upDateReadStatus(thisUserId, thatUserId) {
      this.$db
        .collection("messages")
        .where("toUserId", "==", thisUserId)
        .where("userId", "==", thatUserId)
        .orderBy("time", "desc")
        .get()
        .then(snapshot => {
          for (var i = 0; i < snapshot.docs.length; i++) {
            this.$db
              .collection("messages")
              .doc(snapshot.docs[i].id)
              .update({ read: true });
          }
        });
    },
    pushNewMsg(msg) {
      this.msgList.push(msg);
    },
    async init_variable() {
      // Inits the userInfo and stores it
      this.userId = this.$q.localStorage.getItem("user_id");
      this.userInfo = this.$q.localStorage.getItem("usersession");
      this.channelId = this.$route.params.channelId;

      let channelInfoRef = await this.$db
        .collection("messages")
        .doc(this.channelId)
        .get();

      this.channelInfoData = channelInfoRef.data();
      console.log(this.channelInfoData);

      if (
        this.channelInfoData &&
        this.channelInfoData.members.includes(this.userId)
      ) {
        console.log("AUTHORIZED");
        if (this.channelInfoData.type === "private") {
          // gets the userId that is not your own so it can query info about the other user including name, avatar picture, etc...
          let otherUserId = this.channelInfoData.members.filter(
            otherUserId => otherUserId !== this.userId
          );
          console.log(otherUserId);
          let docRef = await this.$db
            .collection("users")
            .doc(otherUserId[0])
            .get();
          this.otherUserData = docRef.data();
          console.log("Other ", this.otherUserData);
        }
        this.retrieveMessages().then(() => {
          this.isLoading = false;
          this.customStyling();
        });
      } else {
        console.log("NOT AUTHORIZED TO VIEW THIS DOCUMENT");
        this.$router.replace("/messages");
      }
    },
    retrieveMessages(fromInfiniteScroll = false) {
      let timeStamp;
      let messageList = [];

      if (fromInfiniteScroll) {
        timeStamp = this.oldestTimeStamp;
      } else {
        timeStamp = Date.now();
      }
      let promise = new Promise((resolve, reject) => {
        // add .limit() to reduce loading times
        let messageData = this.$db
          .collection(["messages", this.channelId, "thread"].join("/"))
          .orderBy("created", "desc")
          .startAfter(timeStamp)
          .limit(20)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              let data = doc.data();
              //console.log(doc.id, " => ", data);
              messageList.push(data);
            });
          })
          .then(() => {
            console.log(messageList);

            if (messageList.length === 0) {
              console.log("[messageList] is 0");
              this.endInfiniteScroll = true;
              console.log("END INFINTIE SCROLL", this.endInfiniteScroll);
            } else {
              // Reverses the array then adds the messages to the msgList
              this.msgList.splice(0, 0, ...messageList.reverse()); // adds the messages to the current message list
              this.oldestTimeStamp = messageList[0].created;
            }
            resolve("Retrieved message");
            console.log(this.oldestTimeStamp);
          })
          .catch(err => reject(err));
      });
      return promise;
    },
    inputFocus() {
      // This removes the padding at the bottom of the footer if the keyboard is out. Only works on IOS
      if (this.$q.platform.is.ios) {
        var footer = document.querySelector(".platform-ios .q-footer");
        footer.classList.add("remove-footer-padding");
      }
      //this.scrollToBottom();
    },

    inputBlur() {
      // This adds the padding at the bottom of the footer if the keyboard is NOT out. Only works on IOS
      if (this.$q.platform.is.ios) {
        var footer = document.querySelector(".platform-ios .q-footer");
        footer.classList.remove("remove-footer-padding");
      }
    },
    onLoad(index, done) {
      if (this.msgList) {
        this.retrieveMessages(true).then(() => done());
      } else {
        this.endInfiniteScroll = true;
        done();
      }
    }
  }
};
</script>