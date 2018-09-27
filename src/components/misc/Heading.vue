<template>
    <div class="heading">
      <h1>{{ heading_text }}</h1>
    </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    heading_text: String,
  },
};
</script>

<style>
.heading {
  color: var(--heading-color);
}
</style>

