<template>
 <q-layout view="lHh Lpr lFf" class="ice">
  <q-overlay :no-scroll="noScroll" v-model="model">
   <template #body>
    <div
     class="fullscreen row justify-evenly items-end"
     style="padding-bottom: 75px"
    >
     <transition name="bottom-up">
      <div v-if="model === true && waiting !== true" class="overlay-body">
       <div class="fixed-center" style="height: 200vh;"></div>
       <center>
        <div class="q-ml-md q-mr-md overlay" @click="model = !model">
         <div class="row btns">
          <div class="col-4 q-pa-lg">
           <q-btn
            round
            color="accent"
            size="lg"
            @click="$router.push('/create-event')"
            icon="event_note"
           />Create Event
          </div>
          <div class="col-4 q-pa-lg">
           <q-btn
            round
            color="accent"
            size="lg"
            icon="create"
            to="/create-post"
            @click="model = !model"
           />Create Post
          </div>
          <div class="col-4 q-pa-lg">
           <q-btn
            @click="$router.push('/my-groups')"
            round
            color="accent"
            size="lg"
            icon="group"
           />My Groups
          </div>
         </div>
         <div class="row btns">
          <div class="col-4 q-pa-lg">
           <q-btn
            @click="$router.push('/create-group')"
            round
            color="accent"
            size="lg"
            icon="add_circle_outline"
           />Create Group
          </div>
          <div class="col-4 q-pa-lg">
           <q-btn
            @click="$router.push('/events')"
            round
            color="accent"
            size="lg"
            icon="calendar_today"
           />Calendar
          </div>
          <div class="col-4 q-pa-lg">
           <q-btn disable round color="accent" size="lg" icon="inbox" />Request
           Suggestions
          </div>
         </div>

         <div class="row btns">
          <div class="col-4 q-pa-lg">
           <q-btn
            disable
            round
            color="accent"
            size="lg"
            icon="attach_money"
           />Banking
          </div>
          <div class="col-4 q-pa-lg">
           <q-btn
            round
            color="accent"
            size="lg"
            to="/settings"
            icon="settings"
           />Settings
          </div>
          <div class="col-4 q-pa-lg">
           <q-btn disable round color="accent" size="lg" icon="share" />Share
           Fithawk
          </div>
         </div>
        </div>
        <q-footer style="background: none">
         <q-spinner
          v-if="model && waiting"
          color="secondary"
          size="3em"
         ></q-spinner>
         <q-btn
          class="q-mb-lg footer"
          v-if="model === true && waiting !== true"
          color="secondary"
          size="md"
          rounded
          icon="close"
          @click="model = !model"
         />
        </q-footer>
       </center>
      </div>
     </transition>
    </div>
   </template>

   <Header
    icon="inbox"
    to
    logo="../statics/logos/fithawktitle.png"
    unreadAmount="0"
    @click="toMessages($event)"
   />
   <Footer
    v-if="!model"
    image="../statics/logos/fithawklogo.png"
    @click="showOverlay($event)"
   />
  </q-overlay>

  <q-page-container>
   <router-view />
  </q-page-container>
 </q-layout>
</template>

<script>
import Header from "../components/navigation/Header.vue";
import Footer from "../components/navigation/Footer.vue";

export default {
 name: "MainLayout",
 components: {
  Header,
  Footer
 },
 data() {
  return {
   model: false,
   noScroll: false,
   waiting: false,
   timerId: null,
   tab: "mails"
  };
 },
 methods: {
  toMessages(flag) {
   this.$router.push(flag);
   return flag;
  },
  showOverlay(flag) {
   this.model = true;
   return flag;
  }
 },
 beforeDestroy() {
  clearTimeout(this.timerId);
 },

 watch: {
  model(val) {
   clearTimeout(this.timerId);
   if (val) {
    this.waiting = true;
    this.timerId = setTimeout(() => {
     this.waiting = false;
    }, 0);
   } else {
    this.waiting = false;
   }
  }
 },
 mounted() {
  var uid = this.$q.localStorage.getItem("user_id");
  if (
   uid != null &&
   uid != "" &&
   uid != undefined &&
   uid != "undefined" &&
   uid != "null"
  ) {
   //do nothing
  } else {
   this.$router.push("/auth");
  }

  //alert(this.$q.localStorage.getItem('name'))
 }
};
</script>
<style>
@-webkit-keyframes bounceInUp {
 from,
 60%,
 75%,
 90%,
 to {
  -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
 }

 from {
  opacity: 0;
  -webkit-transform: translate3d(0, 3000px, 0);
  transform: translate3d(0, 3000px, 0);
 }

 60% {
  opacity: 1;
  -webkit-transform: translate3d(0, -20px, 0);
  transform: translate3d(0, -20px, 0);
 }

 75% {
  -webkit-transform: translate3d(0, 10px, 0);
  transform: translate3d(0, 10px, 0);
 }

 90% {
  -webkit-transform: translate3d(0, -5px, 0);
  transform: translate3d(0, -5px, 0);
 }

 to {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
 }
}

@keyframes bounceInUp {
 from,
 60%,
 75%,
 90%,
 to {
  -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
 }

 from {
  opacity: 0;
  -webkit-transform: translate3d(0, 3000px, 0);
  transform: translate3d(0, 3000px, 0);
 }

 60% {
  opacity: 1;
  -webkit-transform: translate3d(0, -20px, 0);
  transform: translate3d(0, -20px, 0);
 }

 75% {
  -webkit-transform: translate3d(0, 10px, 0);
  transform: translate3d(0, 10px, 0);
 }

 90% {
  -webkit-transform: translate3d(0, -5px, 0);
  transform: translate3d(0, -5px, 0);
 }

 to {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
 }
}
.overlay-body {
 background: #ffffffeb;
 height: 100%;
 width: 100vw;
}
.overlay {
 margin-top: 35vh;
}
.bottom-up-enter-active {
 transition: all 0.5s ease;
}
.bottom-up-leave-active {
 transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.bottom-up-enter {
 margin-top: 100vh;
 border-top-left-radius: 1000px;
 border-top-right-radius: 1000px;
 transform: scaleX(1.5);
 height: 50vh;
}
.bottom-up-leave-to {
 margin-top: 0;
 border-top-left-radius: 1000px;
 border-top-right-radius: 1000px;
}
.bottom-up-enter-active .btns {
 opacity: 0;
 animation-name: bounceInUp;
}

.bounceInUp {
 -webkit-animation-name: bounceInUp;
 animation-name: bounceInUp;
}
</style>
