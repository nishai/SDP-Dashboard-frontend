
<template>
  <div class="container">
    <StandardPageTitle title="About" subtitle="Team Potato 🥔"/>
    <div class="content">
      <p>
        Formed out of the dying needs of necessity.
      </p>
      <p>
        These <strong class="has-text-grey-dark">seven</strong> intrepid programmers grudgingly set out to change the world...
      </p>
      <p>
        <ul class="has-text-grey-dark">
          <li> Adrian </li>
          <li> Avi </li>
          <li> Matt </li>
          <li> Nathan </li>
          <li> Niambh </li>
          <li> Nishai </li>
          <li> Or </li>
        </ul>
      </p>
      <p>
        But all they found was endless despair!
      </p>
  </div>
  </div>
</template>

<script>
import StandardPageTitle from '../components/StandardPageTitle.vue';

export default {
  name: 'PageMainAbout',
  components: {
    StandardPageTitle,
  },
};
</script>
