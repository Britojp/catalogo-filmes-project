<template>
    <v-container>
      <v-row>
        <v-col v-if="movieDetails" cols="12" md="8">
          <v-card>
            <v-img :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`" alt="Movie poster" height="400px"></v-img>
            <v-card-title>{{ movieDetails.title || movieDetails.name }}</v-card-title>
            <v-card-subtitle>{{ movieDetails.release_date || movieDetails.first_air_date }}</v-card-subtitle>
            <v-card-text>
              <p><strong>Overview:</strong> {{ movieDetails.overview }}</p>
              <p><strong>Genres:</strong> {{ genres }}</p>
              <p><strong>Rating:</strong> {{ movieDetails.vote_average }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-else cols="12">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Carregando detalhes...</p>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'MovieDetails',
    data() {
      return {
        movieDetails: null,
      };
    },
  
    computed: {
      genres() {
        return this.movieDetails?.genres?.map(genre => genre.name).join(', ') || 'Não disponível';
      },
    },
  
    watch: {
      '$route.query.movie': 'setMovieDetails',
    },
  
    methods: {
      setMovieDetails() {
        try {
          this.movieDetails = JSON.parse(this.$route.query.movie);
        } catch (error) {
          console.error('Erro ao carregar os detalhes do filme a partir da URL:', error);
        }
      },
    },
  
    created() {
      this.setMovieDetails(); 
    },
  };
  </script>
  