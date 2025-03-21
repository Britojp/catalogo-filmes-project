<template>
  <v-card
    v-if="!isLoading"
    flat
  >
    <v-card-title class="d-flex align-center pe-2 flex-wrap">
      <v-select 
        v-model="selectedGenres"
        prepend-inner-icon="mdi-filter" 
        label="Filtrar por gênero"
        :items="genderRender()" 
        item-value="id"
        multiple 
        variant="solo-filled" 
        flat 
        single-line 
        class="mx-2" 
        density="compact" 
        :menu-props="{ maxHeight: '200px' }" 
        chips
        :style="{ width: '100%', maxWidth: '300px' }"
      />

      <v-btn
        color="primary"
        class="mx-2"
        @click="filteredFilms()"
      >
        Procurar
      </v-btn>

      <v-spacer />

      <v-text-field
        v-model="search"
        density="compact"
        label="Pesquisar"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        class="mx-2"
        :style="{ width: '100%', maxWidth: '300px' }"
      />
    </v-card-title>

    <v-divider />

    <v-data-table
      v-model:search="search" 
      :no-data-text="noDataMessage"
      :filter-keys="['title']"
      hide-default-footer 
      :headers="headers"
      :items="films"
      density="compact"
      item-key="title"
      items-per-page="20"
    >
      <template #item.genres="{ item }">
        <v-chip-group column>
          <v-chip
            v-for="(genre, index) in item.genres"
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
      </template>

      <template #item.poster_path="{ item }">
        <v-img
          :src="item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'"
          alt="Poster do filme"
          width="100"
        />
      </template>

      <template #item.vote_average="{ item }">
        <v-rating
          :model-value="Math.ceil(item.vote_average / 2) == 0 ? 1 : Math.ceil(item.vote_average / 2)"
          class="me-2"
          color="orange"
          density="compact"
          half-increments
          readonly
        />
      </template>

      <template #item.favorite="{ item }">
        <v-btn
          :color="item.favorite ? 'red' : 'grey'"
          @click="toggleFavorite(item)"
        >
          <v-icon :icon="item.favorite ? 'mdi-heart' : 'mdi-heart-outline'" />
        </v-btn>
      </template>

      <template #item.id="{ item }">
        <v-btn
          :to="`/moreDetails/${item.id}`"
          append-icon="mdi-open-in-new"
          @click="addSelectedMedia(item)"
        >
          Ver mais
        </v-btn>
      </template>

      <template #item.release_date="{ item }">
        <p>{{ converterDate(item.release_date) }}</p>
      </template>
    </v-data-table>

    <v-pagination
      v-if="!isFilter && total_pages > 1"
      v-model="currentPage"
      :length="total_pages"
      show-first-last-page
      total-visible="5"
    />
  </v-card>

  <v-container v-else>
    <v-row>
      <v-col>
        <v-skeleton-loader
          class="mx-auto border"
          type="table-tbody"
          :loading="isLoading"
        />
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

  name: 'FilmsSection',

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

  computed: {
    store() {
      return{ 
        useFilmsStore: useFilmsStore(),
        useDetailsStore : useDetailsStore()
      }
    },
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

  mounted() {
    this.loadAllFilms();
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
            this.films = this.films.map(film => ({ ...film, favorite: false }));
            console.log(this.films)
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

    toggleFavorite(movies: Film) {
      const movie = this.films.find(m => m.id === movies.id);
      if (movie) {
       this.store.useFilmsStore.toggleFavorite(movies)
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
};
</script>
