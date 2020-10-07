<template>
 <div>
  <!-- TEXT SECTION -->
  <div style="background: #B9B0A2!important;" class="q-pt-xl">
   <DoubleHeaderSeparatorCentered
    class="snow"
    :primaryText="primaryText"
    :secondarySubText="secondarySubText"
   />
   <!-- END TEXT SECTION -->

   <!-- Step One -->
   <div>
    <center>
     <q-input
      label="Email *"
      v-model="user.email"
      rel="email"
      @input="$v.user.email.$touch()"
      :rules="[
       val => $v.user.email.required || 'Email is required',
       val => $v.user.email.email || 'Invalid email format'
      ]"
      class="q-ml-sm q-mr-sm q-mt-md q-pt-md q-pl-lg q-pr-lg"
      dense
      color="sage"
      filled
      round
     >
      <template v-slot:append>
       <q-icon name="email" />
      </template>
     </q-input>
     <q-input
      type="password"
      color="sage"
      filled
      round
      label="Password *"
      v-model="user.password"
      :rules="[
       val => $v.user.password.required || 'Password is required',
       val => $v.user.password.minLength || 'Minimum 6 characters for password'
      ]"
      class="q-ml-sm q-mr-sm q-mt-md q-pl-lg q-pr-lg"
      dense
     >
      <template v-slot:append>
       <q-icon name="lock" />
      </template>
     </q-input>

     <q-input
      type="password"
      color="sage"
      filled
      round
      label="Confirm Password *"
      v-model="user.confirmPassword"
      :rules="[
       val =>
        $v.user.confirmPassword.required || 'Please comfirm your password.',
       val =>
        $v.user.confirmPassword.sameAsPassword || 'Passwords must be identical.'
      ]"
      class="q-ml-sm q-mr-sm q-mt-md q-pl-lg q-pr-lg"
      dense
     >
      <template v-slot:append>
       <q-icon name="lock" />
      </template>
     </q-input>
    </center>
   </div>
  </div>

  <!-- BUTTON -->
  <div class=" q-mt-xl">
   <center>
    <q-btn
     style="background: white!important;"
     class="q-mt-md rift-regular
    dropshadow q-pl-xl q-pr-xl onyx"
     size="md"
     rounded
     label="Next"
     @click="select(user)"
    />
   </center>
  </div>
  <!-- END BUTTON -->
 </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import DoubleHeaderSeparatorCentered from "../../../typography/DoubleHeaderSeparatorCentered.vue";
export default {
 name: "Step",
 props: ["primaryText", "secondarySubText"],
 data() {
  return {
   user: {
    email: "",
    password: "",
    confirmPassword: ""
   }
  };
 },
 validations: {
  user: {
   email: { required, email },
   password: {
    required,
    minLength: minLength(6)
   },
   confirmPassword: {
    required,
    sameAsPassword: sameAs("password")
   }
  }
 },
 components: {
  DoubleHeaderSeparatorCentered
 },
 methods: {
  select(user) {
   this.$v.user.$touch();
   if (this.$v.user.$error) {
    alert("Please fill in all required fields and correct errors in the form!");
    return;
   }
   this.$emit("stepOne", user);
  }
 }
};
</script>
