<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-img
              :src="`https://image.tmdb.org/t/p/w500${selectedFilmOrSeries.poster_path}`"
              alt="Movie poster"
              height="400px"
            />
          </v-col>
          <v-col cols="8">
            <v-card class="d-flex flex-column align-center">
              <v-card-title class="text-h2 ">
                {{ selectedFilmOrSeries.title || selectedFilmOrSeries.name }}
              </v-card-title>
              <v-card-subtitle class="text-subtitle-1">
                <strong> Data de lançamento: </strong>{{ converterDate(selectedFilmOrSeries.release_date || selectedFilmOrSeries.first_air_date) }}
              </v-card-subtitle>
              <v-rating
                :model-value="Math.ceil(selectedFilmOrSeries.vote_average / 2) == 0 ? 1 : Math.ceil(selectedFilmOrSeries.vote_average / 2)"
                class="me-2"
                color="orange"
                density="compact"
                half-increments
                readonly
              />
                        
              <v-chip-group column>
                <v-chip
                  v-for="(genre, index) in selectedFilmOrSeries.genres"
                  :key="index"
                  class="ma-1"
                  color="primary"
                  text-color="white"
                  variant="outlined"
                  :disabled="true"
                >
                  {{ genre }}
                </v-chip>
              </v-chip-group>
              <v-card-text>
                <p class="text-justify text-body-1">
                  <strong>Overview:</strong> {{ selectedFilmOrSeries.overview }}
                </p>

                <v-btn
                  :color="selectedFilmOrSeries.favorite ? 'red' : 'grey'"
                  @click="toggleFavorite(selectedFilmOrSeries)"
                >
                  <v-icon :icon="selectedFilmOrSeries.favorite ? 'mdi-heart' : 'mdi-heart-outline'" />
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { useFilmsStore } from '@/stores/filmsStore';
import { useSeriesStore } from '@/stores/seriesStore';
import type Film  from '@/types/types';
import { genresMoviesDB } from '@/types/types';

export default {
    name: 'MediaDetails',
    props: {
        selectedFilmOrSeries: {
            type: Object as () => Film,
            required: true
        },
    },
    data() {
        return {
            moviesAndSeries: [] as Film[],
            SeriesGenders: [
            ...genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name })),
          ],
        };
    },

    methods : {
    converterDate(release_date: string) {
      if (!release_date) {
        return 'Sem data';  
      }
      return release_date.split('-').reverse().join('/');
    },
    
    toggleFavorite(movieFavorite: Film) {
    const seriesStore = useSeriesStore();
    const filmsStore = useFilmsStore();
    this.moviesAndSeries = [...seriesStore.getAllSerie(), ...filmsStore.getAllMovies()];

    const movie = this.moviesAndSeries.find(m => m.id === movieFavorite.id);
    if (movie) {
      movie.favorite = !movie.favorite;
    }
  if(movie && movie?.media_type  === 'tv'){
    seriesStore.toggleFavorite(movieFavorite)
  }else{
    filmsStore.toggleFavorite(movieFavorite)
  } 
},
    },

    store() {
      return {
        useSeriesStore: useSeriesStore(),
        useFilmsStore: useFilmsStore(),
      };
    },

};

</script>
  
<style scoped>

</style>