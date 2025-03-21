<template>
  <template v-if="loading">
    <v-row class="my-4">
      <v-col
        v-for="n in 4"
        :key="n"
        cols="12"
        sm="12"
        md="4"
        lg="3"
        class="pa-2"
      >
        <v-skeleton-loader
          class="mx-auto border"
          max-width="100%"
          height="400"
          type="image"
        />
      </v-col>
    </v-row>
  </template>

  <template v-else>
    <Populars
      title="Filmes Famosos"
      description="Confira os filmes mais populares do momento"
      :populars="popularsFilms"
      mobile-view
      show-title
      show-rating
      show-buttons
    />
    <Populars
      title="Séries Famosas"
      description="Descubra as séries mais assistidas atualmente"
      :populars="popularsTV"
      mobile-view
      show-title
      show-rating
      show-buttons
    />
  </template>
</template>




<script lang="ts">
import { getMostPopularMovies, getMostPopularSeries } from "@/services/api";
import type Film from '../../types/types'
import { useFilmsStore } from "@/stores/filmsStore";
import { useSeriesStore } from "@/stores/seriesStore";
export default {
  data() {
    return {
      popularsFilms: [] as Film[],
      popularsTV : [] as Film[],
      loading : false,
    };
  },
computed: {
  store() {
    return{ 
      useFilmsStore: useFilmsStore(),
      useSerieStore: useSeriesStore()
    }
  },
},


mounted() {
  this.loadPopularMovies();
  this.loadPopularSeries();
},
methods : {
 
  loadPopularMovies() {
      this.loading = true;    
      getMostPopularMovies(1)
      .then((data) =>{
      this.popularsFilms = data.results;
      this.store.useFilmsStore.addPopularFilms(this.popularsFilms);
      this.verifyFavorites(this.popularsFilms)
          }).catch((error) => {

      console.error("Erro ao carregar filmes populares:", error);
    }).finally(() => {    
      this.loading = false;
    })
},
loadPopularSeries() {
    this.loading = true;  
      getMostPopularSeries(1)
      .then((data) =>{
        this.popularsTV = data.results;
        this.store.useSerieStore.addPopularsSeries(this.popularsTV);
        this.verifyFavorites(this.popularsTV) 
            }).catch ((error) => {
        console.error("Erro ao carregar séries populares:", error);
      }).finally(() =>{
        this.loading = false;
      })
    },

verifyFavorites(films : Film[]){
  const filmsStore = useFilmsStore();
  const serieStore = useSeriesStore();
  
  films.forEach(film => {
        if(film.name === undefined){
          const isFavoriteFilm = filmsStore.favoriteMovies.some(favorite => favorite.id === film.id);
          if(!isFavoriteFilm){
            film.favorite = false
          }
        }else{
          const isFavoriteSeries = serieStore.favoriteSerie.some(favorite => favorite.id === film.id);
        if(!isFavoriteSeries){
          film.favorite = false
        } 
      }
    });
},
  }

}

</script>

<style>


</style>