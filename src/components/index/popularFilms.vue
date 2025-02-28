<template>
  <v-container class="popularFilms">
    <h1>Filmes populares</h1>
    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore quibusdam possimus neque at iure labore excepturi veritatis quae corporis ad consectetur similique nobis eum, consequatur sit? Adipisci aspernatur nulla beatae!</h3>
  </v-container>

  <div class="d-flex flex-row mb-6">
    <template 
      v-if="popularFilms.length"
    >
      <v-carousel
        v-model="currentSlide"
        cycle
        hide-delimiters
        :show-arrows="true"
        class="mx-auto"
      >
        <v-carousel-item
          v-for="(group, index) in groupedFilms"
          :key="index"
        >
          <v-row class="d-flex justify-center">
            <v-col
              v-for="film in group"
              :key="film.id"
              cols="10"
              md="2"
              sm="3"
            >
              <v-hover v-slot="{ props }">
                <v-card
                  max-width="344"
                  v-bind="props"
                  class="ma-2 pa-2 mx-auto"
                >
                  <v-img
                    :src="film.poster_path ? `https://image.tmdb.org/t/p/w500${film.backdrop_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'"
                  />
                  <v-card-text>
                    <h2 class="text-h6 text-primary">
                      {{ film.title }}
                    </h2>
                    {{ film.overview }}
                  </v-card-text>
                  <v-card-title>
                    <v-rating
                      :model-value="calculateRate(film)"
                      class="me-2"
                      color="orange"
                      density="compact"
                      half-increments
                      readonly
                    />
                    <span class="text-primary text-subtitle-2">Conhecer</span>
                  </v-card-title>
                  <v-overlay
                    class="align-center justify-center"
                    scrim="#036358"
                    contained
                  />
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </template>
  </div>
</template>

<script lang="ts">
import { getMostPopularMovies } from '@/services/api';
import { Film } from '../components/types/types';

export default {
  name: 'PopularFilms',
  data() {
    return {
      popularFilms: [] as Film[],
      currentSlide: 0,
    };
  },
  computed: {
    groupedFilms() {
      const groups = [];
      for (let i = 0; i < this.popularFilms.length; i += 4) {
        groups.push(this.popularFilms.slice(i, i + 4));
      }
      return groups;
    },
  },
  mounted() {
    this.loadPopularMovies();
  },
  methods: {
    async loadPopularMovies() {
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
    },
  },
};
</script>

<style lang="css">
  .popularFilms{
    text-align: center;
    padding: 5%;
  }


</style>
