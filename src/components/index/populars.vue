<template>
  <v-container class="populars">
    <h1>{{ title }}</h1>
    <h3>
      {{ description }}
    </h3>



    <div class="d-flex flex-row mt-6">
      <template v-if="populars.length">
        <v-carousel
          v-model="currentSlide"
          cycle
          hide-delimiters
          :show-arrows="true"
          class="mx-auto"
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(group, index) in groupedFilms"
            :key="index"
          >
            <v-row class="d-flex justify-center">
              <v-col
                v-for="items in group"
                :key="items.id"
                cols="10"
                md="3"
                sm="3"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    max-width="344"
                    class="ma-2 pa-2 mx-auto"
                    width="100%"
                    v-bind="props"
                  >
                    <v-img
                      :src="items.poster_path ? `https://image.tmdb.org/t/p/w500${items.poster_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'"
                    />
                    <v-overlay
                      :model-value="!!isHovering"
                      class="align-center justify-center container"
                      scrim="#000000"
                      contained
                    >
                      <v-card-text>
                        <h2 class="text-h6 text-primary">
                          {{ items.title || items.name }}
                        </h2>
                        <p>
                          {{ expanded.has(items.id) ? items.overview : truncatedText(items) }}
                        </p>
                        <v-btn
                          v-if="isLongText(items)"
                          variant="text"
                          color="primary"
                          @click="toggleExpand(items)"
                        >
                          {{ expanded.has(items.id) ? "Ver menos" : "Ver mais" }}
                        </v-btn>
                      </v-card-text>
                      <v-card-title>
                        <v-rating
                          :model-value="calculateRate(items)"
                          class="me-2"
                          color="orange"
                          density="compact"
                          half-increments
                          readonly
                        />
                      </v-card-title>

                      <v-btn
                        variant="plain"
                        :to="`/moreDetails/${items.id}`"
                        @click="addSelectedMedia(items)"
                      >
                        <v-icon>
                          mdi-open-in-new
                        </v-icon>
                      </v-btn>

                      <v-btn
                        variant="plain"
                        :color="items.favorite ? 'red' : 'grey'"
                        @click="toggleFavorite(items)"
                      >
                        <v-icon :icon="items.favorite ? 'mdi-heart' : 'mdi-heart-outline'" />
                      </v-btn>
                    </v-overlay>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </template>
    </div>
  </v-container>
</template>
<script lang="ts">
import { useDetailsStore } from "@/stores/detailsStore";
import type Film from "../../types/types";
import { useFilmsStore } from "@/stores/filmsStore";
import { useSeriesStore } from "@/stores/seriesStore";

export default {

  name: "Populars",
  props:{
    title : {
      type: String,
      required: false, 
      default: "Os mais populares"
    },
    description : {
      type: String,
      required: false, 
      default: "Os mais populares"
    },
    populars : {
      type: Array as () => Film[],
      required: true,
    }

  },
  data() {
    return {
      currentSlide: 0,
      expanded: new Set<number>(),
      moviesAndSeries: [] as Film[],
    };
  },
  computed: {
    groupedFilms() {
      const groups = [];
      for (let i = 0; i < this.populars.length; i += 4) {
        groups.push(this.populars.slice(i, i + 4));
      }
      return groups;
    },
  },

  methods: {
    isLongText(items: Film) {
      return items.overview.split(" ").length > 20; 
    },
    calculateRate(items: Film) {
      return Math.ceil(items.vote_average/2) == 0 ? 1 : Math.ceil(items.vote_average/2)  ;
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
    addSelectedMedia(media : Film){
      useDetailsStore().setSelectedMedia(media)
    },
    toggleFavorite(item: Film) {
      const seriesStore = useSeriesStore();
      const filmsStore = useFilmsStore();

      const isMovie = !!item.title;
      const isSeries = !!item.name;

      if (isMovie) {
        filmsStore.toggleFavoriteNoPage(item);
      } else if (isSeries) {
        seriesStore.toggleFavoriteNoPage(item);
      }
    },
  },
};
</script>

<style lang="css">

.populars {
  text-align: center;
  padding: 0 0 0 ;
}

.container:hover{
  background-color: black ;
  opacity: 0.8;
}

</style>
