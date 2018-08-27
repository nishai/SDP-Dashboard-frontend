<template>
    <div id="heading">
      <h1>{{ heading_text }}</h1>
    </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    heading_text: String
  },
};
</script>

<style>

#heading {
  padding: 25px;
  color: #2c3e50;
}
</style>

