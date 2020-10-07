<template>
 <div class="q-pa-lg q-mt-lg">
  <div class="q-pl-md q-pb-md white_font" align="left">
   Login
  </div>
  <q-input
   bg-color="none"
   outlined
   v-model="email"
   label="email"
   type="text"
   class="q-pa-sm q-mb-sm field_class"
   :rules="[
    val => $v.email.required || 'Email is required',
    val => $v.email.email || 'Invalid email format'
   ]"
  />

  <q-input
   v-model="password"
   :type="isPwd ? 'password' : 'text'"
   :rules="[
    val => $v.password.required || 'Password is required',
    val => $v.password.minLength || 'Minimum 6 characters for password'
   ]"
   outlined
   label="password"
   class="q-pa-sm "
  >
   <template v-slot:append>
    <q-icon
     :name="isPwd ? 'visibility_off' : 'visibility'"
     class="cursor-pointer"
     @click="isPwd = !isPwd"
    />
   </template>
  </q-input>

  <GlobalPillButton
   @click="login(email, password)"
   label="login"
   class="q-pa-sm"
   v-if="emailLoginDisplay != true"
   style="text-transform:lowercase;"
  />
 </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import GlobalPillButton from "../../shared/buttons/GlobalPillButtonInverted.vue";
import { colors } from "quasar";
colors.getBrand("inputgreybg");
export default {
 name: "EmailLogin",
 data() {
  return {
   isPwd: true,
   email: "",
   password: "",
   emailLoginDisplay: false
  };
 },
 components: {
  GlobalPillButton
 },
 validations: {
  email: { required, email },
  password: {
   required,
   minLength: minLength(6)
  }
 },
 methods: {
  login(email, password) {
   this.$v.$touch();
   if (this.$v.$error) {
    this.$q.notify(
     "Please fill in all required fields and correct errors in the form!"
    );
    return;
   }
   this.$login(email, password)
    .then(user => {
      //alert(user.user.uid)
     var userRef = this.$db.collection("users").doc(user.user.uid);
     userRef.get().then(doc => {
      this.$store.commit("storage/setUserData", doc.data());
      if(doc.data())
      {
         this.$q.localStorage.set("user_id", doc.data().uid);
      this.$q.localStorage.set("name", doc.data().name);
       this.$router.push("/home");

      }
      else
      {
        this.$q.notify(
     "Please fill in all required fields and correct errors in the form!"
    );
      }
     
      //alert(localStorage.getItem("url") )

      //if (localStorage.getItem("url") == "" || localStorage.getItem("url") == "null" || localStorage.getItem("url") == null) {
      // } else {
      //  this.$router.push(localStorage.getItem("url"));
      // }
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
label .justify-center {
 background-color: #3f5564 !important;
 border-radius: 10px;
 border: 1px solid #3f5564 !important;
}
.q-field--labeled .q-field__native,
.q-field--labeled .q-field__prefix,
.q-field--labeled .q-field__suffix {
 color: #8c99a2 !important;
}
.q-field--outlined .q-field__control {
 border-radius: 10px;
}
.ellipsis {
 color: #8c99a2;
}
.white_font {
 color: #fff;
 font-size: 18px;
 font-weight: bold;
}
</style>
