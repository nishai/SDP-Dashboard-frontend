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

   <vue-tags-input
      v-model="tag3"
      :tags="tags3"
      :autocomplete-items="filteredItems3"
      :add-only-from-autocomplete="true"    
      @tags-changed="newTags => tags3 = newTags">
    </vue-tags-input>


  </div>

<!-- axios example -->
 <!--  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      :add-only-from-autocomplete="true"
      @tags-changed="update">
    </vue-tags-input>
  </div>

    <div>
    <vue-tags-input
      v-model="tag2"
      :tags="tags2"
      :autocomplete-items="autocompleteItems"
      :add-only-from-autocomplete="true"
      @tags-changed="update">
    </vue-tags-input>
  </div> -->

        

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
      tag3: '',
      tags3: [],
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

      // autocompleteItems3:['1','2','3','hr','fml']
      autocompleteItems3: [{
        text: '2013',
      }, {
        text: "2014",
      }, {
        text: '2015',
      }, {
        text: '2016',
      }, {
        text: '2017',
      },{
        text: '2018',
      },{
        text: '2019',
      }
      ],


    };


  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter((i) => new RegExp(this.tag, 'i').test(i.text));
    },
    filteredItems2() {
      return this.autocompleteItems2.filter((i) => new RegExp(this.tag2, 'i').test(i.text));
    },
    filteredItems3() {
      return this.autocompleteItems3.filter((i) => new RegExp(this.tag3, 'i').test(i.text));
    },
  },
};
</script>




<!-- axios example -->

<!-- 
<script>
import VueTagsInput from '@johmun/vue-tags-input';
import axios from 'axios';

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
      autocompleteItems: [],
      autocompleteItems2: [],

      debounce: null,
    };
  },
  methods: {
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;

      this.autocompleteItems2 = [];
      this.tags2 = newTags;
    },
    initItems() {
      if (this.tag.length === 0) return;
      const url = `https://itunes.apple.com/search?term=
        ${this.tag}&entity=allArtist&attribute=allArtistTerm&limit=6`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios.get(url).then(response => {
          this.autocompleteItems = response.data.results.map(a => {
            return { text: a.artistName };
          });
        }).catch(() => console.warn('Oh. Something went wrong'));
      }, 600);
    },
  },
  watch: {
    'tag': 'initItems',
  },
};
</script>