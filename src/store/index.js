import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import storage from "./storage";
import post from "./post";
import notification from "./notification";

Vue.use(Vuex);

const vSSCurrentUser = new VuexPersist({
 key: "storage",
 storage: window.sessionStorage,
 reducer: state => ({
  storage: state.storage
 })
});

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
 const Store = new Vuex.Store({
  modules: {
   storage,
   post,
   notification
  },
  supportCircular: true,
  plugins: [vSSCurrentUser.plugin],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: false
 });

 return Store;
}
