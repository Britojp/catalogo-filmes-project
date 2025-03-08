<template>

<Populars title="Filmes Famosos" description="Confira os filmes mais populares do momento" :populars="popularsFilms"/>
<Populars title="Séries Famosas" description="Descubra as séries mais assistidas atualmente" :populars="popularsTV" />

</template>

<script lang="ts">
import { getMostPopularMovies, getMostPopularSeries } from "@/services/api";
import type Film from '../../types/types'
export default {
  data() {
    return {
      popularsFilms: [] as Film[],
      popularsTV : [] as Film[],
      loading : false,
    };
  },


mounted() {
    this.loadPopularMovies();
    this.loadPopularSeries();
  },
methods : {
    loadPopularMovies() {
      this.loading = true;
      getMostPopularMovies(1).then((data) =>{
      this.popularsFilms = data.results;
    }).catch((error) => {

      console.error("Erro ao carregar filmes populares:", error);
    }).finally(() => {
      this.loading = false;
    })
      },
    loadPopularSeries() {
      this.loading = true;
        getMostPopularSeries(1).then((data) =>{
        this.popularsTV = data.results;
      }).catch ((error) => {
        console.error("Erro ao carregar séries populares:", error);
    }).finally(() =>{
      this.loading = false;
    })
    },
  },
}

</script>

<style>


</style>