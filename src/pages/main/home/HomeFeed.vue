<template>
 <div class="ice" ref="top">
  <div
   v-scroll-fire="disableGroup"
   v-if="new_group_post && tab == 'group'"
  ></div>
  <div v-scroll-fire="disableFeed" v-if="new_post && tab == 'following'"></div>
  <q-tabs
   v-model="tab"
   dense
   class="onyx ice"
   active-color="accent"
   indicator-color="secondary"
   align="justify"
   v-scroll="scrolled"
   swipeable
   animated
  >
   <q-tab
    name="following"
    label="Following"
    class="relative"
    @click="new_post = false"
   >
    <div class="new_group_post" v-if="tab !== 'following' && new_post"></div>
   </q-tab>
   <q-tab
    name="group"
    label="Group"
    class="relative"
    @click="new_group_post = false"
   >
    <div class="new_post" v-if="tab !== 'group' && new_group_post"></div>
   </q-tab>
  </q-tabs>

  <q-tab-panels
   v-model="tab"
   transition-prev="scale"
   transition-next="scale"
   animated
   style="background: none; margin-top: -15px"
  >
   <q-tab-panel name="following" v-if="followed_users.length > 0">
    <div
     align="center"
     style="margin-top:30px;"
     v-if="this.following_post_count == 0 && tab == 'following'"
    >
     <!-- TOFIX No posts found -->
    </div>
    <q-infinite-scroll
     @load="loadMorePersonal"
     :offset="500"
     :disable="checkPersonalPost"
    >
     <q-list
      class="rounded-borders q-mt-md q-mb-md"
      v-for="(post, key) in posts"
      :key="post.key"
     >
      <div v-if="key == 0" v-scroll-fire="(new_group = false)"></div>
      <PostDisplay
       :key="key"
       :type="post.type"
       :avatar="post.avatar"
       :more="post.more"
       :name="post.owner"
       :group="post.group_name"
       :timestamp="post.created_at"
       :likeCount="post.likes.length"
       :commentCount="post.comments.length"
       :comments="post.comments"
       :text="post.text"
       doc="posts"
       :id="post.id"
       class="dropshadow"
       :media-urls="post.mediaUrls"
       :post="post"
      />
     </q-list>
     <template v-slot:loading>
      <div class="row justify-center q-my-md" @click="moveTop">
       <q-spinner-dots color="primary" size="40px" />
      </div>
     </template>
    </q-infinite-scroll>
    <div
     class="move-top"
     v-if="tab == 'following' && new_post"
     @click="moveTop"
    >
     <q-icon name="fas fa-arrow-up"></q-icon>
    </div>
   </q-tab-panel>

   <q-tab-panel name="group" v-if="group_ids.length > 0">
    <div
     align="center"
     style="margin-top:30px;"
     v-if="this.group_post_count == 0 && tab == 'group'"
    >
     <!--No posts found -->
    </div>
    <q-infinite-scroll
     @load="loadMoreGroupPost"
     :offset="500"
     :disable="checkGroupPost"
    >
     <q-list
      class="rounded-borders q-mt-md q-mb-md"
      v-for="(post, key) in groupPosts"
      :key="post.key"
     >
      <PostDisplay
       :key="key + 'group'"
       :type="post.type"
       :avatar="post.avatar"
       :more="post.more"
       :name="post.owner"
       :group="post.group_name"
       :timestamp="post.created_at"
       :likeCount="post.likes.length"
       :commentCount="post.comments.length"
       :comments="post.comments"
       :text="post.text"
       :media-urls="post.mediaUrls"
       doc="posts"
       :id="post.id"
       class="dropshadow"
       :post="post"
      />
     </q-list>
    </q-infinite-scroll>
    <div
     class="move-top"
     v-if="tab == 'group' && new_group_post"
     @click="moveTop"
    >
     <q-icon name="fas fa-arrow-up"></q-icon>
    </div>
   </q-tab-panel>
  </q-tab-panels>
 </div>
</template>

<script>
import PostDisplay from "../../../components/shared/PostDisplay.vue";
import { mapState } from "vuex";
import { scroll, debounce } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;
export default {
 name: "HomeFeed",
 components: {
  PostDisplay
 },
 methods: {
  scrolled: debounce(function(position) {
   this.scrollPosition = position;
  }, 200),
  disableGroup() {
   this.new_group_post = false;
  },
  disableFeed() {
   this.new_post = false;
  },
  moveTop() {
   var el = this.$refs.top;
   const target = getScrollTarget(el);
   const offset = 0;
   const duration = 400;
   setScrollPosition(target, offset, duration);
  },
  async loadMorePersonal(index, done) {
   var posts_count = await this.$db
    .collection("posts")
    .where("personal", "==", true)
    .where("uid", "in", this.followed_users)
    .orderBy("created_at", "desc")
    .get();

   this.following_post_count = posts_count.docs.length;

   var posts = this.$db
    .collection("posts")
    .where("personal", "==", true)
    .where("uid", "in", this.followed_users)
    .orderBy("created_at", "desc");
   if (this.lastVisible) {
    posts = posts.startAfter(this.lastVisible);
   }
   posts = posts.limit(5);
   let that = this;
   await posts.get().then(function(documentSnapshots) {
    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    that.lastVisible = lastVisible;
    that.checkPersonalPost = that.lastVisible == undefined ? true : false;
    documentSnapshots.docs.forEach(doc => {
     if (!that.posts.find(a => a.id === doc.id)) {
      that.posts.push({
       ...doc.data(),
       id: doc.id
      });
     }
    });
   });
   done();
  },
  async loadMoreGroupPost(index, done) {
   let that = this;

   var posts_count = await this.$db
    .collection("posts")
    .where("group", "in", this.group_ids)
    .where("personal", "==", false)
    .orderBy("created_at", "desc")
    .get();

   this.group_post_count = posts_count.docs.length;
   //alert(this.group_post_count);
   //alert(this.group_post_count)

   var posts = this.$db
    .collection("posts")
    .where("group", "in", this.group_ids)
    .where("personal", "==", false)
    .orderBy("created_at", "desc");
   if (this.lastGroupVisible) {
    posts = posts.startAfter(this.lastGroupVisible);
   }
   posts = posts.limit(5);
   await posts.get().then(function(documentSnapshots) {
    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    that.lastGroupVisible = lastVisible;
    that.checkGroupPost = that.lastGroupVisible == undefined ? true : false;
    documentSnapshots.docs.forEach(doc => {
     if (!that.groupPosts.find(a => a.id === doc.id)) {
      that.groupPosts.push({
       ...doc.data(),
       id: doc.id
      });
     }
    });
   });
   done();
  }
 },
 mounted() {
  var el = this.$refs.top;
  const target = getScrollTarget(el);
  const offset = this.scrollPosition;
  const duration = 300;
  setTimeout(() => {
   setScrollPosition(target, offset, duration);
  }, 2000);
 },
 computed: {
  ...mapState({
   user: state => state.storage.user
  }),
  posts: {
   get() {
    return this.$store.state.post.feed_posts;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "feed_posts",
     value: value
    });
   }
  },
  scrollPosition: {
   get() {
    return this.$store.state.post.scrollPosition;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "scrollPosition",
     value: value
    });
   }
  },
  tab: {
   get() {
    return this.$store.state.post.tab;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "tab",
     value: value
    });
   }
  },
  lastVisible: {
   get() {
    return this.$store.state.post.lastVisible;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "lastVisible",
     value: value
    });
   }
  },
  lastGroupVisible: {
   get() {
    return this.$store.state.post.lastGroupVisible;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "lastGroupVisible",
     value: value
    });
   }
  },
  group_post_listener: {
   get() {
    return this.$store.state.post.group_post_listener;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "group_post_listener",
     value: value
    });
   }
  },
  groupPosts: {
   get() {
    return this.$store.state.post.group_posts;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "groupPosts",
     value: value
    });
   }
  },
  post_listener: {
   get() {
    return this.$store.state.post.post_listener;
   },
   set(value) {
    this.$store.commit("post/setValue", {
     key: "post_listener",
     value: value
    });
   }
  }
 },
 async created() {
  let that = this;
  //this.followed_users.push(this.user.uid);
  this.followed_users.push(this.$q.localStorage.getItem("user_id"));

  await this.$db
   .collection("user_relationships")
   //.where("followed_by", "==", this.user.uid)
   .where("followed_by", "==", this.$q.localStorage.getItem("user_id"))
   .get()
   .then(docSnap => {
    docSnap.docs.forEach(doc => {
     that.followed_users.push(doc.data().followed_to);
    });
   });
  await this.$db
   .collection("groups")
   .get()
   .then(snap => {
    snap.forEach(doc => {
     //if (doc.data().users.find(a => a.uid == that.user.uid)) {
     if (
      doc
       .data()
       .users.find(a => a.uid == this.$q.localStorage.getItem("user_id"))
     ) {
      that.group_ids.push(doc.id);
     }
    });
   });
  if (this.post_listener == null) {
   that.post_listener = await this.$db
    .collection("posts")
    .where("personal", "==", true)
    .where("uid", "in", this.followed_users)
    .onSnapshot(function(querySnapshot) {
     querySnapshot.docChanges().forEach(change => {
      let post = change.doc.data();
      if (that.is_following_feed_pulled === true) {
       if (change.type == "added") {
        that.new_post = true;
        that.posts.unshift({ ...post, id: change.doc.id });
        that.$forceUpdate();
       } else if (change.type == "modified") {
        let group_post = that.posts.find(a => a.id == change.doc.id);
        if (group_post) {
         if (group_post.likes.length !== post.likes.length) {
          that.posts.find(a => a.id == change.doc.id).likes = post.likes;
         }
         let comments = group_post.comments;
         if (comments.length !== post.comments.length) {
          that.posts.find(a => a.id == change.doc.id).comments = post.comments;
         }
         for (let index = 0; index < comments.length; index++) {
          if (!comments[index].comments) {
           that.posts.find(a => a.id == change.doc.id).comments[
            index
           ].comments = post.comments[index].comments;
          }
          if (comments[index].comments && post.comments[index].comments) {
           if (
            comments[index].comments.length !==
            post.comments[index].comments.length
           ) {
            that.posts.find(a => a.id == change.doc.id).comments[
             index
            ].comments = post.comments[index].comments;
           }
          }
         }
         that.$forceUpdate();
        }
       }
       if (change.type === "removed") {
        that.posts = that.posts.filter(a => a.id !== change.doc.id);
        that.$forceUpdate();
       }
      }
     });
     that.is_following_feed_pulled = true;
    });
  }
  if (this.group_post_listener == null) {
   that.group_post_listener = await this.$db
    .collection("posts")
    .where("group", "in", that.group_ids)
    .where("personal", "==", false)
    .onSnapshot(async function(querySnapshot) {
     await querySnapshot.docChanges().forEach(change => {
      let post = change.doc.data();
      if (that.is_group_feed_pulled === true) {
       if (change.type == "added") {
        that.new_group_post = true;
        that.groupPosts.unshift({ ...post, id: change.doc.id });
        that.$forceUpdate();
       } else if (change.type == "modified") {
        let group_post = that.groupPosts.find(a => a.id == change.doc.id);
        if (group_post) {
         if (group_post.likes.length !== post.likes.length) {
          that.groupPosts.find(a => a.id == change.doc.id).likes = post.likes;
         }
         let comments = group_post.comments;
         if (comments.length !== post.comments.length) {
          that.groupPosts.find(a => a.id == change.doc.id).comments =
           post.comments;
         }
         for (let index = 0; index < comments.length; index++) {
          if (!comments[index].comments) {
           that.groupPosts.find(a => a.id == change.doc.id).comments[
            index
           ].comments = post.comments[index].comments;
          }
          if (comments[index].comments && post.comments[index].comments) {
           if (
            comments[index].comments.length !==
            post.comments[index].comments.length
           ) {
            that.groupPosts.find(a => a.id == change.doc.id).comments[
             index
            ].comments = post.comments[index].comments;
           }
          }
         }
        }
        that.$forceUpdate();
       }
       if (change.type === "removed") {
        that.groupPosts = that.groupPosts.filter(a => a.id !== change.doc.id);
        that.$forceUpdate();
       }
      }
     });
     that.is_group_feed_pulled = true;
    });
   this.$store.commit("post/setValue", {
    key: "group_post_listener",
    value: this.group_post_listener
   });
   this.$store.commit("post/setValue", {
    key: "post_listener",
    value: this.post_listener
   });
  }
 },
 data() {
  return {
   followed_users: [],
   checkPersonalPost: false,
   checkGroupPost: false,
   new_feed_post: false,
   new_group_post: false,
   is_following_feed_pulled: false,
   is_group_feed_pulled: false,
   group_ids: [],
   new_post: false,
   group_post_count: 0,
   following_post_count: 0
  };
 }
};
</script>
<style>
.new_group_post {
 background: red;
 width: 10px;
 height: 10px;
 border-radius: 50%;
 right: -19px;
 position: absolute;
}
.new_post {
 background: red;
 width: 10px;
 height: 10px;
 border-radius: 50%;
 right: -19px;
 position: absolute;
}
.move-top {
 width: 35px;
 height: 35px;
 position: fixed;
 bottom: 11.4%;
 background: #f05522;
 border-radius: 50%;
 display: flex;
 justify-content: center;
 align-items: center;
 right: 17px;
 color: white;
}
</style>
