<template>
  <v-row>
    <v-col v-for="items in films"
:key="items.id" cols="2" md="2" sm="2" lg="2">
      <v-hover v-slot="{ isHovering, props }">
        <v-card max-width="344"
class="ma-2 pa-2 mx-auto" width="100%" v-bind="props">
          <v-img
            :src="items.poster_path ? `https://image.tmdb.org/t/p/w500${items.poster_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'" />
          <v-overlay :model-value="!!isHovering"
class="align-center justify-center container" scrim="#000000"
            contained>
            <v-card-text>
              <h2 class="text-h6 text-primary">{{ items.title || items.name }}</h2>
              <p>
                {{ expanded.has(items.id) ? items.overview : truncatedText(items) }}
              </p>
              <v-btn v-if="isLongText(items)"
variant="text" color="primary" @click="toggleExpand(items)">
                {{ expanded.has(items.id) ? "Ver menos" : "Ver mais" }}
              </v-btn>
            </v-card-text>
            <v-card-title>
              <v-rating :model-value="calculateRate(items)"
class="me-2" color="orange" density="compact"
                half-increments
readonly />
            </v-card-title>
          </v-overlay>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type Film from '@/types/types';
import {useSearchStore} from '@/stores/searchStore'

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
     this.store.searchMovies;
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