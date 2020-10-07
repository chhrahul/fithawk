// import * as configs from '../utils/firebase/configs.js'
import firebase from "firebase/app";
import "firebase/firestore";
import { firestorePlugin } from "vuefire";
import "firebase/auth";
import "firebase/storage";
export default ({ Vue }) => {
 Vue.use(firestorePlugin);

 // Initialize app
 const currentConfig = {
  apiKey: "AIzaSyCdMnxTfNDSJA6WJDkqrJwMaduZ5Sqhbh4",
  authDomain: "fithawk-backend.firebaseapp.com",
  databaseURL: "https://fithawk-backend.firebaseio.com",
  projectId: "fithawk-backend",
  storageBucket: "fithawk-backend.appspot.com",
  messagingSenderId: "659514407527",
  appId: "1:659514407527:web:afe86684089be4a5"
 };

 // Make sure the firebase keys have been set accordingly
 if (currentConfig) {
  firebase.initializeApp(currentConfig);
  // Initialize Cloud Firestore through Firebase
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  // Add props to our Vue instance for easy access
  // in our app
  Vue.prototype.$fb = firebase;
  Vue.prototype.$db = firestore;
  Vue.prototype.$storage = storage;
 }

 // Add auth methods to our Vue instance
 Vue.prototype.$login = (email, password) => {
  return new Promise((resolve, reject) => {
   firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
     resolve(user);
    })
    .catch(error => {
     reject(error);
    });
  });
 };

 // Add logout methods to our Vue instance
 Vue.prototype.$logout = () => {
  return new Promise((resolve, reject) => {
   firebase
    .auth()
    .signOut()
    .then(user => {
     resolve(user);
    })
    .catch(error => {
     reject(error);
    });
  });
 };

 Vue.prototype.$registerUser = (email, password) => {
  return new Promise((resolve, reject) => {
   firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
     resolve(user);
    })
    .catch(error => {
     reject(error);
    });
  });
 };

 Vue.prototype.$uploadsImage = e => {
  //Get File
  return new Promise((resolve, reject) => {
   const file = e.target.files[0];
   let uploadTask = firebase
    .storage()
    .ref("avatars/" + file.name)
    .put(file);
   uploadTask.on(
    "state_changed",
    function(error) {
     reject(error);
    },
    function() {
     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      resolve(downloadURL);
     });
    }
   );
  });
 };
};
