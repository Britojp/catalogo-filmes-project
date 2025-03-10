<template>
    <v-skeleton-loader 
      boilerplate 
      type="card"
      v-show="loading"
    ></v-skeleton-loader>
  
    <v-container class="hero" v-show="!loading">
      <div class="overlay"></div>
      <div class="hero-text">
        <h1>Bem-vindo ao Catálogo de Filmes</h1>
        <p>Explore e descubra novos filmes</p>
  
        <v-btn 
          icon="mdi-magnify"
          class="mb-5"
          @click="isSearchBtn"
        >
        </v-btn>

        <v-autocomplete
          v-if="searchBtn"
          prepend-inner-icon="mdi-magnify"
          label="Digite o nome do filme que deseja buscar"
          solo
          :items="items"
          :loading="loading"
          item-text="title"
          item-value="id" 
          messages="Digite o filme que deseja buscar"
          @input="handleSearchQuery"
          :clearable="true"
        >

      </v-autocomplete>
      

        
      </div>
    </v-container>
  </template>
  
  <script lang="ts">
  import { searchMovies } from '@/services/api';
  import debounce from 'lodash/debounce';
  
  export default {
    name: 'HeroPage',
    data(): { searchBtn: boolean; loading: boolean; searchQueryText: string; items:any} {
      return {
        searchBtn: false,
        loading: false,
        searchQueryText: "",
        items: [],
      };
    },
    methods: {
      isSearchBtn() {
        this.searchBtn = !this.searchBtn;
        
      },
      handleSearchQuery: debounce(function (this: any, event: Event, ) {
      const queryText = (event.target as HTMLInputElement).value;
      console.log("Consulta de pesquisa:", queryText);

      if (queryText && queryText.length > 3) { 
        this.loading = true;
        
        console.log("Chamando a API com a query:", queryText);
        
        searchMovies(queryText, 1)
          .then((response) => {
            console.log("Resposta da API:", response.data.results);
            this.items = response.data.results || []; 
          })
          .catch((error) => {
            console.error('Erro ao buscar filmes:', error);
          })
          .finally(() => {
            this.loading = false; 
          });
      } else {
        this.items = [];
      }
    }, 500) 
  },
};
</script>

  
  <style scoped>
  .hero {
    background: url("../assets/images/bg.jpg") no-repeat center center fixed;
    background-size: cover;
    height: 70vh;
    width: 100vw;
    filter: grayscale(80%);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    filter: brightness(0.5);
    z-index: 0;
  }
  
  .hero-text {
    position: relative;
    z-index: 1;
    color: white;
    font-size: 30px;
  }
  </style>
  