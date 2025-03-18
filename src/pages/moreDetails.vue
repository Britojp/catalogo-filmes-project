<template>
    <MediaDetails :selected-film-or-series="filmOrSerie"></MediaDetails>
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
  
    methods: {
      loadMediaDetails() {
        this.filmOrSerie = this.store.getSelectedMedia();
      },
    },
  
    watch: {
      filmOrSerie: 'loadMediaDetails',
    },
  
    mounted() {
      this.loadMediaDetails();
    },
  };
  </script>
  