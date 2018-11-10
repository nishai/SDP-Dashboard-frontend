<template>
  <div v-html="image" style="display: contents;"></div>
</template>

<script>
import feather from 'feather-icons';

/*
 * https://www.npmjs.com/package/feather-icons
 * feather.toSvg('circle')
 * '<svg class="feather feather-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>'
 * feather.toSvg('circle', { 'stroke-width': 1 })
 * '<svg class="feather feather-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>'
 * feather.toSvg('circle', { class: 'foo bar' })
 *'<svg class="feather feather-circle foo bar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>'
 */

export default {
  name: 'FeatherIcon',
  props: {
    name: { type: String },
    args: { type: Object, default: () => ({}) },
    /* override args */
    size: { type: Number, default: 16 },
    fill: { type: String, default: null },
    stroke: { type: String, default: null },
    strokeWidth: { type: Number, default: 2 },
    strokeLinecap: { type: String, default: null },
    strokeLinejoin: { type: String, default: null },
    /* bootstrap */
    variant: { type: String, default: null },
  },
  computed: {
    image() {
      /* shallow copy */
      const args = Object.assign({}, this.args);
      /* replace if not null */
      if (this.size != null) args.width = this.size;
      if (this.size != null) args.height = this.size;
      if (this.fill != null) args.fill = this.fill;
      if (this.stroke != null) args.stroke = this.stroke;
      if (this.strokeWidth != null) args['stroke-width'] = this.strokeWidth;
      if (this.strokeLinecap != null) args['stroke-linecap'] = this.strokeLinecap;
      if (this.strokeLinejoin != null) args['stroke-linejoin'] = this.strokeLinejoin;
      /* create image */
      return feather.icons[this.name].toSvg(args);
    },
  },
  created() {
    if (!(this.name in feather.icons)) {
      throw new Error(`'${this.name}' is not a valid icon\nbrowse icons at: https://feathericons.com/`);
    }
  },
};
</script>

<style>
</style>
