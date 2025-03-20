<template>
  <v-row>
    <v-col v-for="items in films"
:key="items.id" cols="2" md="2" sm="2" lg="2">
      <v-hover v-slot="{ isHovering, props }">
        <v-card max-width="344"
class="ma-2 pa-2 mx-auto" width="100%" v-bind="props">
          <v-img
            :src="items.poster_path ? `https://image.tmdb.org/t/p/w500${items.poster_path}` : 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'" />
          <v-overlay :model-value="!!isHovering"
class="align-center justify-center container" scrim="#000000"
            contained>
            <v-card-text>
              <h2 class="text-h6 text-primary">{{ items.title || items.name }}</h2>
              <p>
                {{ expanded.has(items.id) ? items.overview : truncatedText(items) }}
              </p>
              
            </v-card-text>
            <v-card-title>
              <v-rating :model-value="calculateRate(items)"
class="me-2" color="orange" density="compact"
                half-increments
readonly />
            </v-card-title>
              <v-btn variant="plain"
                        :to="`/moreDetails/${items.id}`"
                        @click="addSelectedMedia(items)"
                        >
                        <v-icon>
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
    
                   <v-btn variant="plain" @click="toggleFavorite(items)" :color="items.favorite ? 'red' : 'grey'">
                       
                       <v-icon :icon="items.favorite ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
                   </v-btn>
          </v-overlay>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type Film from '@/types/types';
import {useSearchStore} from '@/stores/searchStore'
import { useSeriesStore } from '@/stores/seriesStore';
import { useFilmsStore } from '@/stores/filmsStore';
import { useDetailsStore } from '@/stores/detailsStore';

export default {
  name: 'ShowSearch',

  data() {
    return {
      films: [] as Film[],
      expanded: new Set<number>(),
      isBtn: false,

    }
  },
  methods: {
    loadFilms() {
     this.store.searchMoviesAndSeries;
    },
    isLongText(items: Film) {
      return items.overview.split(" ").length > 20;
    },
    calculateRate(items: Film) {
      return Math.ceil(items.vote_average / 2) == 0 ? 1 : Math.ceil(items.vote_average / 2);
    },
    truncatedText(items: Film) {
      return this.isLongText(items) ? items.overview.split(" ").slice(0, 20).join(" ") + "..." : items.overview;
    },
    toggleExpand(items: Film) {
      if (this.expanded.has(items.id)) {
        this.expanded.delete(items.id);
      } else {
        this.expanded.add(items.id);
      }
    },
    toggleFavorite(movieFavorite: Film) {
    const seriesStore = useSeriesStore();
    const filmsStore = useFilmsStore();

    const movie = this.films.find(m => m.id === movieFavorite.id);
 
    if(movie && movie?.media_type  === 'tv'){
      seriesStore.toggleFavoriteNoPage(movieFavorite)
      console.log(movieFavorite.favorite)
    }else{
      filmsStore.toggleFavoriteNoPage(movieFavorite)
    } 
},
addSelectedMedia(media : Film){
    const detailsStore = useDetailsStore();  
    detailsStore.setSelectedMedia(media)
    },
  },
  computed: {
    store() {
      return useSearchStore();
    },

  },
  mounted() {
    this.loadFilms();

  },
  watch: {
    store: {
      handler() {
        this.films = this.store.getSearchedMovies;
        this.isBtn = this.store.getIsBtn;
      },
      deep: true
    }
  }
}
</script>