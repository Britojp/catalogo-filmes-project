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

      <v-btn @click="filteredSeriesAndMovies()" color="primary">
        Procurar
      </v-btn>

      <v-spacer></v-spacer>
      <v-text-field v-model="search" density="compact" label="Pesquisar" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line class="mx-2"></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table v-model:search="search" 
      :no-data-text="noDataMessage"
      :filter-keys="['title', 'name']"
      hide-default-footer 
      :headers="headers"
      :items="moviesAndSeries"
      :items-per-page="-1"
      density="compact" item-key="title">
    
      <template v-slot:item.title="{ item }">
        <p>{{ getTitle(item) }}</p>
      </template>


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
        <v-btn @click="toggleFavorite(item)" :color="item.favorite ? 'red' : 'grey'">
          <v-icon :icon="item.favorite ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
        </v-btn>
      </template>

      <template v-slot:item.release_date="{ item }">
        <p>{{ converterDate(getReleaseDate(item)) }}</p>
      </template>

      <template v-slot:item.media_type="{ item }">
        <v-chip :color="item.media_type === 'movie' ? 'blue' : 'green'" text-color="white">
          {{ item.media_type === 'movie' ? 'Filme' : 'Série' }}
        </v-chip>
      </template>

      <template v-slot:item.id="{ item }">
        <v-btn :to="`/moreDetails/${item.id}`"
        @click="addSelectedMedia(item)"
        append-icon="mdi-open-in-new">
      Ver mais
       </v-btn>
    
        </template>


    </v-data-table>


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
import type Film from '@/types/types';
import { genresMoviesDB } from '@/types/types';
import { useSeriesStore } from '@/stores/seriesStore';
import {useFilmsStore} from '@/stores/filmsStore';
import { useDetailsStore } from '@/stores/detailsStore';

export default {
  name: 'SeriesSection',

  data() {
    return {
      moviesAndSeries: [] as Film[],
      headers: [
        { title: 'Título', align: 'start' as const, key: 'title'},
        { title: 'Gêneros', align: 'center' as const, key: 'genres', sortable: false },
        { title: 'Capa', align: 'center' as const, sortable: false, key: 'poster_path' },
        { title: 'Resumo', align: 'center' as const, sortable: false, key: 'overview' },
        { title: 'Data de lançamento', align: 'center' as const, key: 'release_date' },
        { title: 'Tipo', align: 'center' as const, sortable: true, key: 'media_type' },
        { title: 'Nota popular', align: 'center' as const, key: 'vote_average' },
        { title: 'Favorito', align: 'center' as const, key: 'favorite' },
        {title: 'Ver mais', align:'center' as const, key: 'id'},
      ],
      SeriesGenders: [
        ...genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name })),
      ],
      isLoading: false,
      search: '',
      selectedGenres: [] as string[],
      genders: '',
      noDataMessage: 'Não há contéudo para ser mostrado',
      isFilter: false,
    };
  },

  methods: {
    loadFavoritesSeriesAndMovies() {
      this.moviesAndSeries = [...this.store.useSeriesStore.getFavoriteSerie(), ...this.store.useFilmsStore.getFavoriteMovies()];
      this.loadGenres();
    },

    getTitle(item : Film){
      return item.title || item.name
    },

    getReleaseDate(item: Film) {
    return item.first_air_date || item.release_date 
  },

    genderRender() {
      return this.SeriesGenders.map(genre => genre.name);
    },

    converterDate(release_date: string) {
      if (!release_date) {
        return 'Sem data';  
      }
      return release_date.split('-').reverse().join('/');
    },

toggleFavorite(movieFavorite: Film) {
  const movie = this.moviesAndSeries.find(m => m.id === movieFavorite.id);
    if (movie) {
      movie.favorite = !movie.favorite;
    }
  if(movie && movie?.media_type  === 'tv'){
    this.store.useSeriesStore.toggleFavorite(movieFavorite)
  }else{
    this.store.useFilmsStore.toggleFavorite(movieFavorite)
  } 
},


    loadGenres() {
      this.moviesAndSeries = this.moviesAndSeries.map(film => ({
        ...film,
        genres: film.genre_ids ? film.genre_ids.map(id => genresMoviesDB.find(g => g.id === id)?.name || 'Outro') : ['Outro'],
      }));
    },

    filteredSeriesAndMovies() {
      this.isFilter = true;
      this.isLoading = true;
      if (this.selectedGenres.length) {
        const filtered = this.moviesAndSeries.filter(film =>
          this.selectedGenres.every(genre => film.genres.includes(genre))
        );
        if (filtered.length) {
          this.moviesAndSeries = filtered;
        } else {
          this.moviesAndSeries = [];
        }
      } else {
        this.loadFavoritesSeriesAndMovies();
        this.isFilter = false;
      }
      this.isLoading = false;
    },
    addSelectedMedia(media : Film){
      this.store.useDetailsStore.setSelectedMedia(media)
    },
  },

  computed: {
    store() {
      return {
        useSeriesStore: useSeriesStore(),
        useFilmsStore: useFilmsStore(),
        useDetailsStore: useDetailsStore(),
      };
    },

  },

  mounted() {
    this.loadFavoritesSeriesAndMovies();
  },

  watch: {
    currentPage() {
      if (!this.isFilter) {
        this.loadFavoritesSeriesAndMovies();
      } else {
        this.filteredSeriesAndMovies();
      }
    },
  },
};

</script>
