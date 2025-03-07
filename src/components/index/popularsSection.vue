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
      popularsTV : [] as Film[]
    };
  },


mounted() {
    this.loadPopularMovies();
    this.loadRatedTV();
  },
methods : {
    async loadPopularMovies() {
      try {
        const data = await getMostPopularMovies(1);
        this.popularsFilms = data.results;
      } catch (error) {
        console.error("Erro ao carregar filmes populares:", error);
      }
    },
    async loadRatedTV() {
      try {
        const data = await getMostPopularSeries(1);
        this.popularsTV = data.results;
        console.log(this.popularsTV);
      } catch (error) {
        console.error("Erro ao carregar séries populares:", error);
      }
    },
}
}
</script>

<style>


</style>