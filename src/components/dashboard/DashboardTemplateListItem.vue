<!--

Displays an image with text above it,
inside of a card.

Formatted to look good under the dashboard.

-->

<template>
  <b-card class="template-list-item-card">
    <b-card-content class="template-list-item-card-content">
      <p class="content has-text-centered has-padding-top-md has-padding-left-md has-padding-right-md">
        {{ label }}
      </p>
      <b-level>
        <b-level-item>
          <figure class="image is-128x128">
            <img :src="src" alt="chart">
          </figure>
        </b-level-item>
      </b-level>
    </b-card-content>
  </b-card>
</template>

<script>

export default {
  name: 'DashboardTemplateListItem',
  props: {
    src: String,
    label: String,
  },
};
</script>

<style scoped lang="scss">

.template-list-item-card {
  height: 250px;
}

.template-list-item-card-content {
  padding: 0rem;
}

</style>
