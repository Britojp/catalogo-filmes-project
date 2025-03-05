<template>
    <v-container class="popularSeries">
      <h1>Series populares</h1>
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore quibusdam possimus neque at iure labore excepturi veritatis quae corporis ad consectetur similique nobis eum, consequatur sit? Adipisci aspernatur nulla beatae!
      </h3>
    </v-container>
  
    <div class="d-flex flex-row mb-6">
      <template v-if="popularSeries.length">
        <v-carousel
          v-model="currentSlide"
          cycle
          hide-delimiters
          :show-arrows="true"
          class="mx-auto"
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(group, index) in groupedSeries" :key="index">
            <v-row class="d-flex justify-center">
              <v-col v-for="series in group" :key="series.id" cols="10" md="3" sm="3">
                <v-hover v-slot="{ props }">
                  <v-card max-width="344" v-bind="props" class="ma-2 pa-2 mx-auto">
                    <v-img
                      :src="series.poster_path ? `https://image.tmdb.org/t/p/w500${series.backdrop_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'"
                    />
                    <v-card-text>
                      <h2 class="text-h6 text-primary">{{ series.title }}</h2>
                      <p>
                        {{ expandedSeries.has(series.id) ? series.overview : truncatedText(series) }}
                      </p>
                      <v-btn
                        v-if="isLongText(series)"
                        variant="text"
                        color="primary"
                        @click="toggleExpand(series)"
                      >
                        {{ expandedSeries.has(series.id) ? "Ver menos" : "Ver mais" }}
                      </v-btn>
                    </v-card-text>
                    <v-card-title>
                      <v-rating
                        :model-value="calculateRate(series)"
                        class="me-2"
                        color="orange"
                        density="compact"
                        half-increments
                        readonly
                      />
                    </v-card-title>
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
  import { getMostPopularSeries } from "@/services/api";
  import Film from "../../types/types";
  
  export default {
    name: "popularSeries",
    data() {
      return {
        popularSeries: [] as Film[],
        currentSlide: 0,
        expandedSeries: new Set<number>(),
      };
    },
    computed: {
      groupedSeries() {
        const groups = [];
        for (let i = 0; i < this.popularSeries.length; i += 4) {
          groups.push(this.popularSeries.slice(i, i + 4));
        }
        return groups;
      },
    },
    mounted() {
      this.loadPopularSeries();
    },
    methods: {
      async loadPopularSeries() {
        try {
          const data = await getMostPopularSeries(1);
          this.popularSeries = data.results;
          console.log(this.popularSeries);
        } catch (error) {
          console.error("Erro ao carregar filmes populares:", error);
        }
      },
      calculateRate(series: Film) {
        if (series.vote_average <= 2) return 1;
        if (series.vote_average <= 4) return 2;
        if (series.vote_average <= 6) return 3;
        if (series.vote_average <= 7) return 4;
        return 5;
      },
      isLongText(series: Film) {
        return series.overview.split(" ").length > 20; 
      },
      truncatedText(series: Film) {
        return this.isLongText(series) ? series.overview.split(" ").slice(0, 20).join(" ") + "..." : series.overview;
      },
      toggleExpand(series: Film) {
        if (this.expandedSeries.has(series.id)) {
          this.expandedSeries.delete(series.id);
        } else {
          this.expandedSeries.add(series.id);
        }
      },
    },
  };
  </script>
  
  <style lang="css">
  .popularSeries {
    text-align: center;
    padding: 5%;
  }
  </style>
  