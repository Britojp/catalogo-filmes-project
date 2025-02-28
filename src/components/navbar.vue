<template>
  <div>

  </div>
</template>

<script lang="ts">
  import { getMostPopularMovies } from '../services/api'; 
const loadPopularMovies = async () => {
  try {
    const data = await getMostPopularMovies(1); 
    console.log('Filmes Populares:', data); 
  } catch (error) {
    console.error('Erro ao carregar filmes populares:', error);
  }
};

loadPopularMovies();
  
</script>
