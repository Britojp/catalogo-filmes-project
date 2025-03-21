<template>
  <MediaDetails :selected-film-or-series="filmOrSerie" />
</template>
  
  <script lang="ts">
  import MediaDetails from '@/components/pageDetails/mediaDetails.vue';
  import { useDetailsStore } from '@/stores/detailsStore';
  import type Film from '@/types/types';
  
  export default {
    components: {
      MediaDetails,
    },
  
    data() {
      return {
        filmOrSerie: {} as Film,
      };
    },
  
    computed: {
      store() {
        return useDetailsStore();
      },
    },
  
    watch: {
      filmOrSerie: 'loadMediaDetails',
    },
  
    mounted() {
      this.loadMediaDetails();
    },
  
    methods: {
      loadMediaDetails() {
        this.filmOrSerie = this.store.getSelectedMedia();
      },
    },
  };
  </script>
  