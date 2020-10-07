<template>
 <div class="sand">
  <div v-if="stepOne == true">
   <StepOne
    class="snow"
    secondarySubText="Welcome to FITHAWK"
    primaryText="Sign Up"
    img="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-760x506.jpg"
    @stepOne="stepOneFunc($event)"
   />
  </div>
  <div v-if="stepTwo == true">
   <StepTwo
    class="snow"
    secondarySubText="Personalize your experience"
    primaryText="Let's complete your profile"
    @stepTwo="stepTwoFunc($event)"
   />
  </div>
  <div v-if="stepThree == true">
   <StepThree
    class="snow"
    secondarySubText="Find Groups Near You"
    primaryText="last Step!"
    img="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-760x506.jpg"
   />
  </div>
  <div
   class="text-center text-bold padding_top bottom-ft-sec"
   style="color: white;"
  >
   <!--   Already have an account?-->
   <!--   <q-btn-->
   <!--    flat-->
   <!--    label="Login"-->
   <!--    color="accent"-->
   <!--    style="text-decoration: underline;"-->
   <!--    class=" text-weight-bolder onyx"-->
   <!--    @click="toLogin()"-->
   <!--   />-->
  </div>
 </div>
</template>

<script>
import StepOne from "../../components/modals/auth/onboarding/StepOne.vue";
import StepTwo from "../../components/modals/auth/onboarding/StepTwo.vue";
import StepThree from "../../components/modals/auth/onboarding/StepThree.vue";
export default {
 name: "Signup",
 data() {
  return {
   stepOne: true,
   stepTwo: false,
   stepThree: false,
   user: {
    name: "",
    avatar: "",
    zipCode: "",
    profileType: "",
    email: "",
    password: "",
    description: ""
   }
  };
 },
 components: {
  StepOne,
  StepTwo,
  StepThree
 },
 methods: {
  toLogin() {
   this.$router.push("/auth");
  },
  stepOneFunc(data) {
   this.stepOne = false;
   this.stepTwo = true;
   this.user.email = data.email;
   this.user.password = data.password;
  },
  stepTwoFunc(data) {
   this.stepTwo = false;
   this.stepThree = true;
   this.user.name = data.name;
   //alert(data.avatar)
   if(data.avatar){
        this.user.avatar = data.avatar;
   }
   else{
        this.user.avatar = '/statics/logos/fithawktitle.png';
   }
   //alert(this.user.avatar)
   //return false;

   this.user.zipCode = data.zipCode;
   this.user.profileType = data.profileType;
   this.user.description = data.description;

   this.createUser(this.user.email, this.user.password, this.user);
  },
  createUser(email, password, data) {
   this.registerUser(email, password)
    .then(user => {
     
     var userRef = this.$db.collection("users").doc(user.user.uid);
     userRef.set({
      uid: user.user.uid,
      name: data.name.toLowerCase(),
      zipCode: data.zipCode,
      profileType: data.profileType,
      description: data.description,
      avatar: data.avatar,
      onboarded: true
     });
     this.setVueXData(this.user);
    })
    .catch(err => {
     this.stepOne = true;
     this.stepTwo = false;

     alert(err.message);
    });
  },
  registerUser(email, password) {
   return this.$registerUser(email, password);
  },

  setVueXData(user) {
   this.$login(user.email, user.password)
    .then(user => {
        //alert(user.user.uid)
     var userRef = this.$db.collection("users").doc(user.user.uid);
     userRef.get().then(doc => {
      this.$store.commit("storage/setUserData", doc.data());
      this.$q.localStorage.set("user_id", doc.data().uid);
      this.$q.localStorage.set("name", doc.data().name);
    //   alert(doc.data().name)
    //   alert(doc.data().uid)
      this.stepTwo = false;
      this.stepThree = true;
     });
    })
    .catch(err => {
     this.$q.notify(err.message);
    });
  }
 }
};
</script>
<style scoped>
.sand {
 background-color: #b9b0a2;
 min-height: 100vh;
}
.padding_top {
 padding-top: 30px;
}
</style>
