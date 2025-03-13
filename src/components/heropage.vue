<template>

  
    <v-container class="hero" >
      <div class="overlay"></div>
      <div class="hero-text">
        <h1>Bem-vindo ao Catálogo de Filmes</h1>
        <p>Explore e descubra novos filmes</p>
  
        <v-btn 
          icon="mdi-magnify"
          class="mb-5"
          @click="isSearchBtn"
          v-tooltip="'Procurar filmes'"

        >
        </v-btn>

      <v-text-field
        v-if="searchBtn"
        v-model="store.searchQueryText"
        prepend-inner-icon="mdi-magnify"
        label="Digite o nome do filme que deseja buscar"
        solo  
        @input="store.handleSearchQuery"
        :clearable="true"
        
      >
      </v-text-field>
      

        
      </div>
    </v-container>
  </template>
  
  <script lang="ts">
  import { useSearchStore } from '@/stores/searchStore';
  
  export default {
    name: 'HeroPage',
    data(): { searchBtn: boolean; items:any} {
      return {
        searchBtn: false,
        items: [],
      };
    },
    computed: {
      store() {
        return useSearchStore();
      }
    },
    methods: {
      isSearchBtn() {
        this.searchBtn = !this.searchBtn;

      },
    
    },
    watch: {
      searchBtn(newVal) {
      this.store.isBtnSearchClicked = newVal;
      this.store.searchQueryText = '';
      }
    }
      


}
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
  