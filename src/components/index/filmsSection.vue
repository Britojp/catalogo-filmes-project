<template>
    <v-card
      class="mx-auto"
      max-width="425"
    >
      <v-list lines="three">
        <v-list-subheader>Today</v-list-subheader>
  
        <template v-for="film in films" :key="film.id">

            <v-list-item
            :prepend-avatar="film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'"
            :title="film.title"
            >
            <template v-slot:subtitle>
                <span class="font-weight-bold">{{ film.genre_ids }}</span> 
                &mdash;{{ film.overview }}
            </template>
        </v-list-item>
        
    </template>
        <v-divider inset></v-divider>
        
    </v-list>
    </v-card>
  </template>


<script lang="ts">
    import { getAllMovies } from '@/services/api';
    import type Film from '@/types/types';
    
    export default{
    name: 'filmsSection',

    data(){
        return{
        films : [] as Film[]
    }
},
    methods : {
        async loadAllFilms() {
      try {
        const data = await getAllMovies(1);
        this.films = data.results;
        console.log(this.films);
      } catch (error) {
        console.error("Erro ao carregar séries populares:", error);
      }
    },
    },
    mounted(){
        this.loadAllFilms();
    }
}

</script>


<style>

</style>