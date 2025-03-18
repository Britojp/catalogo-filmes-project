<template>
  <v-card flat v-if="!isLoading">
    <v-card-title class="d-flex align-center pe-2">
      <v-select 
        prepend-inner-icon="mdi-filter"
        label="Filtrar por gênero" 
        :items="genderRender()"
        v-model="selectedGenres" 
        item-value="id"
        multiple 
        variant="solo-filled" 
        flat 
        single-line 
        class="mx-2" 
        density="compact" 
        :menu-props="{ maxHeight: '200px' }" 
        chips
        :style="{ width: '300px' }">
      </v-select>

      <v-btn @click="filteredFilms()" color="primary">
        Procurar
      </v-btn>

      <v-spacer></v-spacer>
      <v-text-field v-model="search" density="compact" label="Pesquisar" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line class="mx-2"></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table v-model:search="search" 
      :no-data-text="noDataMessage"
      :filter-keys="['title']"
      hide-default-footer 
      :headers="headers"
      :items="films"
      density="compact" item-key="title" items-per-page="20">
      <template v-slot:item.genres="{ item }">
        <v-chip-group column>
          <v-chip v-for="(genre, index) in item.genres" :key="index" class="ma-1" color="primary" text-color="white" variant="outlined" :disabled="true">
            {{ genre }}
          </v-chip>
        </v-chip-group>
      </template>

      <template v-slot:item.poster_path="{ item }">
        <v-img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" alt="Poster do filme" width="100"></v-img>
      </template>

      <template v-slot:item.vote_average="{ item }">
        <v-rating :model-value="Math.ceil(item.vote_average / 2) == 0 ? 1 : Math.ceil(item.vote_average / 2)" class="me-2"
          color="orange" density="compact" half-increments readonly>
        </v-rating>
      </template>

      <template v-slot:item.favorite="{ item }">
        <v-btn @click="toggleFavorite(item.id)" :color="item.favorite ? 'red' : 'grey'">
          <v-icon :icon="item.favorite ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
        </v-btn>
      </template>

      
        <template v-slot:item.id="{ item }">
        <v-btn :to="`/moreDetails/${item.id}`"
        @click="addSelectedMedia(item)"
        append-icon="mdi-open-in-new">
      Ver mais
       </v-btn>
        </template>


      <template v-slot:item.release_date="{ item }">
        <p>{{ converterDate(item.release_date) }}</p>
      </template>
    </v-data-table>

    <v-pagination v-if="!isFilter && total_pages > 1"  :length="total_pages" show-first-last-page total-visible="5" v-model="currentPage"></v-pagination>
  </v-card>

  <v-container v-else>
    <v-row>
      <v-col>
        <v-skeleton-loader class="mx-auto border" type="table-tbody" :loading="isLoading"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { getAllMovies } from '@/services/api';
import type Film from '@/types/types';
import { genresMoviesDB } from '@/types/types';
import { useFilmsStore } from '@/stores/filmsStore';
import { useDetailsStore } from '@/stores/detailsStore';

export default {

  name: 'filmsSection',

  data() {
    return {
      currentPage: 1,
      headers: [
        { title: 'Título', align: 'start' as const, key: 'title' },
        { title: 'Gêneros', align: 'center' as const, key: 'genres', sortable: false },
        { title: 'Capa ', align: 'center' as const, sortable: false, key: 'poster_path' },
        { title: 'Resumo', align: 'center' as const, sortable: false, key: 'overview' },
        { title: 'Data de lançamento', align: 'center' as const, key: 'release_date' },
        { title: 'Nota popular', align: 'center' as const, key: 'vote_average' },
        { title: 'Favorito', align: 'center' as const, key: 'favorite' },
        {title: 'Ver mais detalhes', align: 'center' as const, sortable: false, key: 'id'}
      ],
      filmsGenders: [
        ...genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name })),
      ],
      isLoading: false,
      search: '',
      selectedGenres: [] as string[],
      genders: '',
      noDataMessage: 'Não foi possível encontrar nenhum filme',
      isFilter: false,
      films: [] as  Film[], 
      total_pages : 500,
    };
  },

  methods: {
    loadAllFilms() {
      this.isLoading = true;
      this.genders = '';
      this.selectedGenres = [];

      if (!this.store.useFilmsStore.getMoviesForPage(this.currentPage).length) {
        getAllMovies(this.currentPage)
          .then((response) => {
            this.films = response.data.results;
            this.total_pages = response.data.total_pages;
            this.loadGenres();
            this.store.useFilmsStore.addMoviesForPage(this.currentPage, this.films);
          })
          .catch((error) => {
            console.error('Erro ao carregar filmes populares:', error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.films = this.store.useFilmsStore.getMoviesForPage(this.currentPage);
        this.isLoading = false;
      }
    },

    genderRender() {
      return this.filmsGenders.map(genre => genre.name);
    },

    converterDate(release_date: string) {
      if (!release_date) {
        return 'Sem data';  
      }
      return release_date.split('-').reverse().join('/');
    },

    toggleFavorite(movieId: number) {
      const movie = this.films.find(m => m.id === movieId);
      if (movie) {
        movie.favorite = !movie.favorite;
        this.store.useFilmsStore.favoriteMovies[this.currentPage] = this.films.filter(film => film.favorite);
      }
    },

    loadGenres() {
      this.films = this.films.map(film => {
        if (film.genre_ids) {
          return {
            ...film,
            genres: film.genre_ids.map(id => {
              const genre = genresMoviesDB.find(g => g.id === id);
              return genre ? genre.name : 'Outro';
            }),
          };
        } else {
          return { ...film, genres: ['Outro'] };
        }
      });
      this.filmsGenders = genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name }));
    },

    filteredFilms() {
      this.isFilter = true;
      this.isLoading = true;
      if (this.selectedGenres.length) {
        const filtered = this.films.filter(film =>
          this.selectedGenres.every(genre => film.genres.includes(genre))
        );
        if (filtered.length) {
          this.films = filtered;
        } else {
          this.noDataMessage = 'Não há filmes com os gêneros selecionados';
          this.films = [];
        }
      } else {
        this.loadAllFilms();
        this.isFilter = false;
      }
      this.isLoading = false;
    },
    addSelectedMedia(media : Film){
      this.store.useDetailsStore.setSelectedMedia(media)
    }
  },

  mounted() {
    this.loadAllFilms();
  },

  watch: {
    currentPage() {
      if (!this.isFilter) {
        this.loadAllFilms();
      } else {
        this.filteredFilms();
      }
    },
  },

  computed: {
    store() {
      return{ 
        useFilmsStore: useFilmsStore(),
        useDetailsStore : useDetailsStore()
      }
    },
  },
};
</script>
