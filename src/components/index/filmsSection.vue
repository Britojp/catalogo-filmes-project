<template>
  <v-card flat v-if="!isLoading">

    <v-card-title class="d-flex align-center pe-2">
          Listagem de todos os filmes
        <v-spacer></v-spacer>
  
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
    <v-data-table
    v-model:search="search"
          :filter-keys="['title']"
          hide-default-footer
      :headers="headers"
      :items="films"
      density="compact"
      item-key="title"
      items-per-page="20"
    >  
      <template v-slot:item.poster_path="{ item }">
        <v-img 
          :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" 
          alt="Poster do filme"
          width="100"
        ></v-img>
      </template>

      <template v-slot:item.vote_average="{ item }">
        <v-rating
                      :model-value=" Math.ceil(item.vote_average/2) == 0 ? 1 : Math.ceil(item.vote_average/2)"
                        class="me-2"
                        color="orange"
                        density="compact"
                        half-increments
                        readonly>                    
                  </v-rating>
      </template>

      <template v-slot:item.favorite="{ item }">
        <v-btn
                          @click="liked(item)"
                          :color="item.favorite ? 'red' : 'grey'"
                      >
                          <v-icon
                          :icon="item.favorite ? 'mdi-heart' : 'mdi-heart-outline'"
                          ></v-icon>
                      </v-btn>
      </template>
      <template v-slot:item.release_date="{ item }">
        <p>
          {{converterDate(item.release_date)}}                    
      </p>
      </template>
    </v-data-table>

    <v-pagination
      :length="total_pages"
      show-first-last-page
      total-visible="5"
      v-model="currentPage"
    ></v-pagination>
  </v-card>

  <v-container v-else>
    <v-row>
      <v-col>
        <v-skeleton-loader
          class="mx-auto border"
          type="table-tbody"
          :loading="isLoading"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { getAllMovies } from '@/services/api';
import type Film from '@/types/types';
import { useFilmsStore } from '@/stores/filmsStore';

export default {
  name: 'filmsSection',

  data() {
    return {
      films: [] as Film[],
      total_pages: 1,
      currentPage: 1,
      headers: [
        { title: 'Título', align:'start', key: 'title' },
        { title: 'Capa do filme', align:'center',  sortable: false, key: 'poster_path' },
        { title: 'Resumo', align:'center',  sortable: false, key: 'overview' },
        { title: 'Data de lançamento', align:'center', key: 'release_date' },
        { title: 'Nota popular',  align:'center',key: 'vote_average' },
        { title: 'Favorito', align:'center', key:'favorite'},
      ],
      isLoading: false,
      like: false,
      search: '',
      
    };
  },

  methods: {
    loadAllFilms() {
      this.isLoading = true;
      getAllMovies(this.currentPage)
        .then((response) => {
          this.films = response.data.results;
          this.total_pages = response.total_pages;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('Erro ao carregar filmes populares:', error);
          this.isLoading = false;
        });
    },
    converterDate(release_date: string){
      return release_date.split('-').reverse().join('/');
    },
    liked(film : Film){
      film.favorite = !film.favorite;
    }

  },

  mounted() {
    this.loadAllFilms();
  },

  watch: {
    currentPage() {
      this.loadAllFilms();
    },
  },
};
</script>

<style scoped>
</style>
