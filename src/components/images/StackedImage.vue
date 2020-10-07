<template>
 <div>
  <q-img src="../../statics/welcome-screen/BikerPhoto.jpg" class="fix_inr_img">
   <q-img
    src="../../statics/logos/FithawkWhite.png"
    style="background: none"
    class="q-mt-xl"
   />
  </q-img>
 </div>
</template>

<script>
export default {
 name: "StackedImage"
};
</script>
<style>
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
 .fix_inr_img {
  height: 460px;
 }
}
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
 .fix_inr_img {
  height: 318px;
 }
}
@media only screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
 .fix_inr_img {
  height: 390px;
 }
 body {
  overflow: hidden;
 }
}

@media only screen and (min-height: 828px) { 
    .fix_inr_img{
        padding: 328px 12px;
    }
    .europa-bold{
        font-size: 45px !important;
    }
    .q-pa-xl {
    padding: 90px 48px;
    }
    .text-h6 {
    font-size: 2.25rem;
    }
    .q-mt-xl {
    margin-top: 80px;
    }
}
</style>
