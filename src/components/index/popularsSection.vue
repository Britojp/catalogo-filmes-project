<template>

<Populars title="Filmes Famosos" description="lorem" :populars="populars"/>

</template>

<script lang="ts">
import Populars from './populars.vue'
import { getMostPopularMovies } from "@/services/api";
import type Film from '../../types/types'
export default {
  data() {
    return {
      populars: [] as Film[]
    };
  },


mounted() {
    this.loadPopularMovies();
  },
methods : {
    async loadPopularMovies() {
      try {
        const data = await getMostPopularMovies(1);
        this.populars = data.results;
        console.log(this.populars);
      } catch (error) {
        console.error("Erro ao carregar filmes populares:", error);
      }
    },
}
}
</script>

<style>


</style>