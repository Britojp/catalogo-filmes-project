<template>
  <template
    v-for="film in popularFilms"
    :key="film.id"
  >
  <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="mx-auto"
        max-width="344"
        v-bind="props"
      >
      <v-img :src="film.poster_path ? `https://image.tmdb.org/t/p/w500${film.backdrop_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'" />


        <v-card-text>
          <h2 class="text-h6 text-primary">
            {{ film.title }}
          </h2>
          {{ film.overview }}
        </v-card-text>
          
        <v-card-title>
          <v-rating
            :model-value=" calculateRate(film)"
            class="me-2"
            color="orange"
            density="compact"
            hover
          />
          <span class="text-primary text-subtitle-2">Popularidade: {{ film.popularity.toFixed(0) }}</span>
        </v-card-title>
          
        <v-overlay
          :model-value="!!isHovering"
          class="align-center justify-center"
          scrim="#036358"
          contained
        >
          <v-btn 
            variant="flat"
          >
            See more info
          </v-btn>
        </v-overlay>
      </v-card>
    </v-hover>
  </template>
</template>

<script lang="ts">
import { getMostPopularMovies } from '@/services/api'; 
import { Film } from '../components/types/types'

export default{

  name: 'PopularFilms',
  data(){
    return{
    popularFilms : [] as Film[],
    
    };
  },

  methods :  {
    async loadPopularMovies (){
      try {
        const data = await getMostPopularMovies(1); 
        this.popularFilms = data.results; 
        console.log(this.popularFilms);
      } catch (error) {
        console.error('Erro ao carregar filmes populares:', error);
      }
    },
    calculateRate(film: Film) {
  if (film.vote_average <= 2) return 1;
  if (film.vote_average <= 4) return 2;
  if (film.vote_average <= 6) return 3;
  if (film.vote_average <= 7) return 4;
  return 5;
}


},

  mounted(){
    this.loadPopularMovies();
  },
  
}

</script>

<style lang="css">
</style>