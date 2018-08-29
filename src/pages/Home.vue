<template>
  <div id="reports">
    <Heading heading_text="Welcome to the Homepage"></Heading>
    <p id=content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lobortis eget dui et dignissim. Vestibulum feugiat, dolor ac porttitor facilisis, ex nulla ultricies ex, non dapibus nunc ex eu nunc. Suspendisse vitae aliquam elit. Mauris bibendum suscipit nulla eu sodales. Integer eleifend accumsan consequat. Proin vitae tellus urna. Nulla facilisi. Vestibulum efficitur, nibh ac aliquam interdum, lacus eros sodales orci, eget ultricies arcu velit at orci. Quisque suscipit sit amet lacus at luctus. Nulla semper ex pretium nibh suscipit, sit amet placerat elit ullamcorper. Aenean vehicula, purus ac sollicitudin suscipit, dui orci tempus nunc, congue pharetra risus erat vitae velit. Sed eget ex volutpat, suscipit augue in, ornare risus. Proin mattis ullamcorper felis a dictum. Sed a aliquam ipsum.
      <br><br>
      Cras sagittis, libero sed iaculis iaculis, ex nibh rutrum lorem, sit amet commodo sapien lectus ac arcu. Duis ullamcorper quis nunc sit amet faucibus. Quisque nec est maximus, congue sem vitae, ultrices nisl. Duis porttitor auctor lorem, vitae fermentum massa egestas non. Mauris molestie rutrum ipsum vitae commodo. Donec viverra elementum ipsum et volutpat. Donec lacus massa, dapibus a hendrerit congue, varius vel lacus. Phasellus nisi libero, suscipit eu justo et, tristique sodales sapien. Sed iaculis, ligula at sagittis aliquet, nisi velit tristique est, non viverra purus purus accumsan orci. Curabitur pellentesque ex vel ante molestie venenatis. Integer fermentum eu ex pharetra varius. Duis euismod a nisi at volutpat. Nam dapibus dictum mattis. Nulla scelerisque sagittis libero, vitae ultrices quam posuere vitae.
      <br><br>
      Mauris non semper nulla. Nulla vel nisl iaculis, vulputate mi in, rhoncus leo. Aenean et justo in ante scelerisque mollis eu et nunc. Fusce eu pharetra dolor. Nulla sed malesuada leo. Aliquam tincidunt libero at maximus scelerisque. Nullam sed placerat purus.
      <br><br>
      Proin leo felis, consequat non sollicitudin eget, sollicitudin sed orci. Nulla quis libero eget tortor feugiat ornare. Aliquam metus dolor, aliquam nec ligula in, euismod semper eros. Nulla laoreet aliquet pulvinar. Suspendisse ante lorem, iaculis ut euismod eget, malesuada sit amet nunc. Proin pellentesque, sapien quis ullamcorper viverra, quam erat auctor sapien, ut congue odio nibh in ex. Phasellus a dui lacinia, sollicitudin ipsum at, accumsan lectus. Suspendisse potenti. Suspendisse potenti. Vestibulum ut pulvinar eros. Nam eu nulla velit. Phasellus mattis lacus sapien, id imperdiet velit tincidunt eget.
      <br><br>
      Aliquam lobortis, urna non maximus ultricies, eros tellus molestie libero, a consequat augue augue in ante. Etiam nec ipsum ut justo dictum elementum ut sagittis elit. Vivamus eget mollis lacus. Cras mattis lacinia imperdiet. Praesent dapibus laoreet tempor. Suspendisse vel magna nulla. Duis in eros a est fringilla rutrum nec a justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce semper volutpat lectus, sed tempor sapien laoreet in. Nullam rhoncus laoreet luctus. Praesent at ultrices ex, non luctus nulla. In urna ligula, molestie in urna nec, porta placerat tortor. Vestibulum eu viverra arcu. Ut hendrerit laoreet justo, et accumsan nunc iaculis sit amet. Nunc cursus lacus vitae ante euismod, nec bibendum risus ornare.
    </p>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';

export default {
  name: 'Home',
  components: {
    Heading,
  },
};
</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}
</style>
