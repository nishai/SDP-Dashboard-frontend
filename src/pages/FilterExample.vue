<!-- <template> -->
<!--   <div>
    <multiselect
      v-model="selected"
      :options="options">
    </multiselect>
  </div> -->

 <!--  <div>
  <label class="typo__label">Groups</label>
  <multiselect v-model="Fuckoptions" :options="Fuckoptions" :multiple="true" group-values="libs" group-label="language" :group-select="true" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>
  <pre class="language-json"><code>{{ value }}</code></pre>
</div>


</template> -->
<!--
<script>
 import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      Fuckoptions: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->


<!-- <template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
    };
  },
};
</script>
         -->


<template>
<div>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
  </div>

    <div>

    <vue-tags-input
      v-model="tag2"
      :tags="tags2"
      :autocomplete-items="filteredItems2"
      @tags-changed="newTags => tags2 = newTags">
    </vue-tags-input>


  </div>
</div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      tag2: '',
      tags2: [],
      autocompleteItems: [{
        text: 'Spain',
      }, {
        text: 'France',
      }, {
        text: 'USA',
      }, {
        text: 'Germany',
      }, {
        text: 'China',
      }],

      autocompleteItems2: [{
        text: '1',
      }, {
        text: '2',
      }, {
        text: '3',
      }, {
        text: '54',
      }, {
        text: '5555',
      }],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter((i) => new RegExp(this.tag, 'i').test(i.text));
    },
    filteredItems2() {
      return this.autocompleteItems2.filter((i) => new RegExp(this.tag2, 'i').test(i.text));
    },
  },
};
</script>
