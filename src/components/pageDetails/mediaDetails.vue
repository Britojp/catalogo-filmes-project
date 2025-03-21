 <template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-img
              :src="`https://image.tmdb.org/t/p/w500${selectedFilmOrSeries.poster_path}`"
              alt="Movie poster"
              height="400px"
              class="rounded-lg shadow-lg"
            />
          </v-col>

          <v-col cols="12" md="8">
            <v-card class="d-flex flex-column align-center pa-4 rounded-lg shadow-lg">
              <v-card-title class="text-h2 font-weight-bold text-center mb-3">
                {{ selectedFilmOrSeries.title || selectedFilmOrSeries.name }}
              </v-card-title>

              <v-card-subtitle class="text-subtitle-1 mb-3">
                <strong>Data de lançamento:</strong>
                {{ converterDate(selectedFilmOrSeries.release_date || selectedFilmOrSeries.first_air_date) }}
              </v-card-subtitle>

              <v-rating
                :model-value="Math.ceil(selectedFilmOrSeries.vote_average / 2) == 0 ? 1 : Math.ceil(selectedFilmOrSeries.vote_average / 2)"
                class="mb-3"
                color="orange"
                density="compact"
                half-increments
                readonly
              />
                <v-row class="mb-3 justify-center">
                <v-col cols="7">
                  <v-card-subtitle class="text-subtitle-1 text-center">
                  <strong>Conteúdo adulto:</strong>
                  {{ selectedFilmOrSeries.adult ? 'Sim' : 'Não' }}
                  </v-card-subtitle>
                </v-col>
                <v-col cols="6">
                  <v-card-subtitle class="text-subtitle-1 text-center">
                  <strong>Popularidade:</strong> {{ Math.round(Number(selectedFilmOrSeries.popularity)) }}
                  </v-card-subtitle>
                </v-col>
                </v-row>

                <v-row class="mb-3 justify-center">
                <v-col>
                  <v-card-subtitle class="text-subtitle-1 text-center">
                  <strong>Votos:</strong> {{ selectedFilmOrSeries.vote_count }}
                  </v-card-subtitle>
                </v-col>
                </v-row>

              
              <v-chip-group column>
                <v-chip
                  v-for="(genre, index) in selectedFilmOrSeries.genres"
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

              <v-card-text>
                <p class="text-justify text-body-1 mb-3">
                  <strong>Overview:</strong> {{ selectedFilmOrSeries.overview }}
                </p>

                <v-btn
                  :color="selectedFilmOrSeries.favorite ? 'red' : 'grey'"
                  @click="toggleFavorite(selectedFilmOrSeries)"
                  class="mt-3 mx-auto d-flex justify-center"
                  outlined
                >
                  <v-icon :icon="selectedFilmOrSeries.favorite ? 'mdi-heart' : 'mdi-heart-outline'" />
                  <span class="ms-2">{{ selectedFilmOrSeries.favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}</span>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" sm="6" md="4">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${selectedFilmOrSeries.backdrop_path}`"
          alt="Scene image"
          class="rounded-lg shadow-lg"
          height="250px"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { useFilmsStore } from '@/stores/filmsStore';
import { useSeriesStore } from '@/stores/seriesStore';
import type Film  from '@/types/types';
import { genresMoviesDB } from '@/types/types';

export default {
    name: 'MediaDetails',
    props: {
        selectedFilmOrSeries: {
            type: Object as () => Film,
            required: true
        },
    },
    data() {
        return {
            moviesAndSeries: [] as Film[],
            SeriesGenders: [
            ...genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name })),
          ],
        };
    },

    methods : {
    converterDate(release_date: string) {
      if (!release_date) {
        return 'Sem data';  
      }
      return release_date.split('-').reverse().join('/');
    },
    
    toggleFavorite(item: Film) {
      const seriesStore = useSeriesStore();
      const filmsStore = useFilmsStore();

      const isMovie = !!item.title;
      const isSeries = !!item.name;

      if (isMovie) {
        filmsStore.toggleFavorite(item);
      } else if (isSeries) {
        seriesStore.toggleFavorite(item);
      }
    },
    },

    store() {
      return {
        useSeriesStore: useSeriesStore(),
        useFilmsStore: useFilmsStore(),
      };
    },

};

</script>
  
<style scoped>
.v-img {
  border-radius: 12px;
}



.v-btn {
  transition: background-color 0.3s, color 0.3s;
}

.v-btn:hover {
  background-color: #ff5722;
}

</style>