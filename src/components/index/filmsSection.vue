<template>
  <v-card flat>
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
        :items="films" 
        hide-default-footer
        
    >
        <template v-slot:headers >
            <tr>
                <th>Título</th>
                <th>Capa do filme</th>
                <th>Resumo</th>
                <th>Data de Lançamento</th>
                <th>Nota popular</th>
                <th>Favorito</th>
            </tr>
        </template>
        <template v-slot:item="{ item }">
            <tr>
                <td>{{ item.title }}</td>
                <td>
                    <img 
                    :src="item.backdrop_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg'"
                    width="100px"
                     alt="">
                </td>
                <td>{{ item.overview }}</td>
                <td>{{ item.release_date }}</td>
                <td><v-rating
                    :model-value=" Math.ceil(item.vote_average/2) == 0 ? 1 : Math.ceil(item.vote_average/2)"
                      class="me-2"
                      color="orange"
                      density="compact"
                      half-increments
                      readonly>                    
                </v-rating></td>
                <td>
                <v-icon icon="mdi-heart-outline"></v-icon>
                </td>
            </tr>
        </template>
    </v-data-table>

   
  </v-card>
        
  <v-pagination 
    :length="total_pages"
    show-first-last-page
    total-visible="5"
    v-model="currentPage"
  ></v-pagination>
</template>


<script lang="ts">
    import { getAllMovies } from '@/services/api';
    import type Film from '@/types/types';
    
    export default{
    name: 'filmsSection',

    data(){
        return{
        films : [] as Film[],
        total_pages : 1,
        currentPage: 1,
        search: '',
    }
},
    methods : {
        async loadAllFilms() {
      try {
        const data: { 
            data: { 
            results: Film[] 
        }, 

        total_pages: number 
        } 
        = await getAllMovies(this.currentPage);
        this.films = data.data.results;
        this.total_pages = data.total_pages;
        console.log(this.films);
      } catch (error) {
        console.error("Erro ao carregar séries populares:", error);
      }
    },
    },
    mounted(){
        this.loadAllFilms();
    },
    watch: {
        currentPage() {
            this.loadAllFilms();
        }
    }
}

</script>


<style>


</style>