export default {
 uploadToStorage(base64image, storage) {
  let uniqkey = "pic" + Math.floor(Math.random() * 1000000);
  var pathUrl = "media/" + uniqkey;
  let storageRef = storage.ref(pathUrl);

  return storageRef.putString(base64image, "data_url");
 },
 upload(base64image, storage) {
  let uploadTask = this.uploadToStorage(base64image, storage);
  return new Promise((resolve, reject) => {
   uploadTask.on(
    "state_changed",
    error => {
     reject(error);
    },
    () => {
     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
      resolve(downloadURL);
     });
    }
   );
  });
 }
};
