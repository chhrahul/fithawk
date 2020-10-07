const getDefaultState = () => {
 return {
  feed_posts: [],
  group_posts: [],
  post_listener: null,
  group_post_listener: null,
  lastGroupVisible: null,
  lastVisible: null,
  scrollPosition: 0,
  tab: "group"
 };
};
const state = getDefaultState();

const mutations = {
 setValue(state, payload) {
  state[payload.key] = payload.value;
 },
 resetState(state) {
  Object.assign(state, getDefaultState());
 }
};

const actions = {
 getFeedPosts() {}
};

const getters = {
 getUserData: state => {
  return state.user;
 }
};

export default {
 namespaced: true,
 state,
 mutations,
 actions,
 getters
};
