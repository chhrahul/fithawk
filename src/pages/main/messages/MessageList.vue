<template>
  <div class="bg-white">
    <!-- Loading spinner -->
    <div class="fixed-center uploading" v-if="isLoading">
      <q-spinner color="secondary" size="3em" />
    </div>

    <div v-else>
      <div
        v-if="messagesInfoList.length === 0"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%); position: absolute; text-align:center;"
      >No Messages</div>
      <div v-else>
        <div class="row q-pa-md">
          <!-- Gray color is different than in the styles. May change later when i'm not lazy -->
          <q-input
            bg-color="grey-3"
            color="grey-3"
            outlined
            type="search"
            v-model="inputText"
            placeholder="Search Messages"
            class="col no-outline"
            dense
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-separator />
        <q-list
          v-for="(item, key) in (filtered.length ? filtered : messagesInfoList)"
          :key="key"
          class="rounded-borders"
        >
          <div >
            <q-item :to="'messages/chat/' + item.channelId" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white" size="4em">
                  <img v-if="item.image" :src="item.image" style="width: 100%;height: auto;"/>
                  <span v-else>{{item.name[0].toUpperCase()}}</span>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1" class="europa-bold onyx">
                  {{
                  item.name
                  }}
                </q-item-label>
                <q-item-label class="europa-regular slate" caption lines="2">
                  <span
                    class="text-weight-bold"
                  >{{ item.latestMessage.userId == userId ? "Me" : item.latestMessage.userName }}</span>
                  -- {{ item.latestMessage.content ? item.latestMessage.content : "Media Attachment" }}
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
                top
                class="europa-light slate"
              >{{ item.latestMessage.created | moment('from','now') }}</q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
Vue.use(VueMoment);

export default {
  name: "MessageList",
  data() {
    return {
      inputText: "",
      isLoading: true,
      messagesInfoList: [],
      filtered: [],
      userId: "" // Holds all info related to the current user
    };
  },
  mounted() {
    this.init_variable();
    //this.userInfo = this.$store.getters["storage/getUserData"];
  }, 
  watch: {
    // Cannot take an ES6 style function because of scope
    inputText: function(value) {
      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];
      // If input value is NOT empty
      if (value !== "") {
        currentList = this.messagesInfoList;

        newList = currentList.filter(message => {
          let messageName = message.name.toLowerCase();
          return messageName.includes(value.toLowerCase());
        });
      } else {
        // If the search bar is empty, set newList to original message list
        newList = this.messagesInfoList;
      }
      this.filtered = newList;
    }
  },
  methods: {
    async init_variable() {
      this.userId = this.$q.localStorage.getItem("user_id");

      let getChannelInfo = await this.$db
        .collection("messages")
        .where("members", "array-contains", this.userId)
        .get();

      // If query is empty, turn off loading spinner
      if (getChannelInfo.empty) {
        this.isLoading = false;
      } else {
        for (const doc of getChannelInfo.docs) {
          this.messagesInfoList.push(doc.data());
        }
      }

      let queries = this.messagesInfoList.flatMap((messageInfo, index) => {
        let query = [];

        query.push(
          this.$db
            .collection(["messages", messageInfo.channelId, "thread"].join("/"))
            .orderBy("created", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                let data = doc.data();
                this.messagesInfoList[index]["latestMessage"] = data;
              });
            })
        );

        // If the group chat type is private, it will query the other users info
        if (messageInfo.type === "private") {
          // Gets the userId that is not your own so it can query info about the other user including name, avatar picture, etc...
          let otherUserId = messageInfo.members.filter(
            otherUserId => otherUserId !== this.userId
          );

          query.push(
            this.$db
              .collection("users")
              .doc(otherUserId[0])
              .get()
              .then(snapshot => {
                this.messagesInfoList[index]["name"] = snapshot.data().name;
                this.messagesInfoList[index]["image"] = snapshot.data().avatar;
              })
          );
        }
        return query;
      });
      // Using promises to wait until the queries are done
      Promise.all(queries).then(() => {
        // First filters the messages that has a latestMessage property 
        this.messagesInfoList = this.messagesInfoList.filter(
          message => message.latestMessage
        );
        // Sorts the message list by timestamp
        this.messagesInfoList.sort(
          (a, b) => b.latestMessage.created - a.latestMessage.created
        );

        console.log(this.messagesInfoList);
        // Turn off loading spinner
        this.isLoading = false;
      });
    }
  }
};
</script>
