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

      <v-btn @click="filteredSeries()" color="primary">
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
      :items="Series"
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
        <p>{{ converterDate(item.first_air_date) }}</p>
      </template>

      


    </v-data-table>

    <v-pagination v-if="!isFilter && total_pages > 1" :length="total_pages" show-first-last-page total-visible="5" v-model="currentPage"></v-pagination>
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
import { getAllSeries } from '@/services/api';
import type Film from '@/types/types';
import { genresMoviesDB } from '@/types/types';
import { useSeriesStore } from '@/stores/seriesStore';
import { useDetailsStore } from '@/stores/detailsStore';

export default {
  name: 'SeriesSection',

  data() {
    return {
      Series: [] as Film[],
      total_pages: 500,
      currentPage: 1,
      headers: [
        { title: 'Título', align: 'start' as const, key: 'name' },
        { title: 'Gêneros', align: 'center' as const, key: 'genres', sortable: false },
        { title: 'Capa ', align: 'center' as const, sortable: false, key: 'poster_path' },
        { title: 'Resumo', align: 'center' as const, sortable: false, key: 'overview' },
        { title: 'Data de lançamento', align: 'center' as const, key: 'release_date' },
        { title: 'Nota popular', align: 'center' as const, key: 'vote_average' },
        { title: 'Favorito', align: 'center' as const, key: 'favorite' },
        {title: 'Ver mais detalhes', align: 'center' as const, sortable: false, key: 'id'}

      ],
      SeriesGenders: [
        ...genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name })),
      ],
      isLoading: false,
      search: '',
      selectedGenres: [] as string[],
      genders: '',
      noDataMessage: 'Não foi possível encontrar nenhum filme',
      isFilter: false,
    };
  },

  methods: {
    loadAllSeries() {
      this.isLoading = true;
      this.genders = '';
      this.selectedGenres = [];

      if (!this.store.useSeriesStore.getSerieForPage(this.currentPage).length) {
        getAllSeries(this.currentPage)
          .then((response) => {
            this.Series = response.data.results;
            this.total_pages = response.data.total_pages;
            this.loadGenres();
            this.store.useSeriesStore.addSerieForPage(this.currentPage, this.Series);
          })
          .catch((error) => {
            console.error('Erro ao carregar as séries populares:', error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.Series = this.store.useSeriesStore.getSerieForPage(this.currentPage);
        this.isLoading = false;
      }
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

    toggleFavorite(movieId: number) {
      const movie = this.Series.find(m => m.id === movieId);
      if (movie) {
        movie.favorite = !movie.favorite;
        this.store.useSeriesStore.favoriteSerie = {
          ...this.store.useSeriesStore.favoriteSerie,
          [this.currentPage]: this.Series.filter(film => film.favorite)
        };
      }
    },

    loadGenres() {
      this.Series = this.Series.map(film => {
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
      this.SeriesGenders = genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name }));
    },

    filteredSeries() {
      this.isFilter = true;
      this.isLoading = true;
      if (this.selectedGenres.length) {
        const filtered = this.Series.filter(film =>
          this.selectedGenres.every(genre => film.genres.includes(genre))
        );
        if (filtered.length) {
          this.Series = filtered;
        } else {
          this.noDataMessage = 'Não há séries com os gêneros selecionados';
          this.Series = [];
        }
      } else {
        this.loadAllSeries();
        this.isFilter = false;
      }
      this.isLoading = false;
    },
    addSelectedMedia(media : Film){
      this.store.useDetailsStore.setSelectedMedia(media)
    },
  },

  mounted() {
    this.loadAllSeries();
  },

  watch: {
    currentPage() {
      if (!this.isFilter) {
        this.loadAllSeries();
      } else {
        this.filteredSeries();
      }
    },
  },

  computed: {
    store() {
      return{ 
        useSeriesStore: useSeriesStore(),
        useDetailsStore: useDetailsStore(),
      }
    },
  },
};
</script>
