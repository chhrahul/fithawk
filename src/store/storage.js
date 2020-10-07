import { LocalStorage } from "quasar";
const getDefaultState = () => {
 return {
  user: {
   name: "",
   zip: "",
   description: "",
   uid: "",
   avatar: ""
  }
 };
};
const state = getDefaultState();

const mutations = {
 setUserData(state, val) {
  LocalStorage.set("usersession", val);
  state.user = LocalStorage.getItem("usersession");
  //alert(JSON.stringify(state.user))
 },
 resetState(state) {
  var user_arr = {
   name: "",
   zip: "",
   description: "",
   uid: "",
   avatar: ""
  };

  LocalStorage.set("usersession", user_arr);
  //alert(JSON.stringify(LocalStorage.getItem("usersession")))
  state.user = LocalStorage.getItem("usersession");
  //this.$fb.auth().currentUser.uid = '';
  //Object.assign(state, getDefaultState());
  return (state.user = LocalStorage.getItem("usersession"));
 },
 setUnreadNotification(state) {
  state.unreadNotification++;
  LocalStorage.set("unreadNotification", state.unreadNotification);
 },
 unreadNotification: state => {
  return state.unreadNotification;
 },
 setLocalStorage(s, data) {
  // alert(JSON.stringify(data))
  LocalStorage.set("usersession", data);
  //alert(JSON.stringify(LocalStorage.getItem("usersession")))
  // alert('ready here');
 }
};

const actions = {
 setProfileData({ commit }, name, avatar, description, zip, uid) {
  commit("setProfileData", name, avatar, description, zip, uid);
 }
};

const getters = {
 getUserData: state => {
  return (state.user = LocalStorage.getItem("usersession"));
 },
 getLocalStorage() {
  alert(JSON.stringifyLocalStorage.getItem("usersession"));
 },
 resetLocalstorage() {
  return LocalStorage.set("usersession", {});
 }
};

export default {
 namespaced: true,
 state,
 mutations,
 actions,
 getters
};
