<template>
  <div class="hero">
    <div class="overlay" />
    <div class="hero-text">
      <h1>Bem-vindo ao Catálogo de Filmes</h1>
      <p>Explore e descubra novos filmes</p>
  
      <v-btn 
        v-tooltip="'Procurar filmes'"
        icon="mdi-magnify"
        class="mb-5"
        @click="isSearchBtn"
      />

      <v-text-field
        v-if="searchBtn"
        v-model="store.searchQueryText"
        prepend-inner-icon="mdi-magnify"
        label="Digite o nome do filme que deseja buscar"
        solo  
        :clearable="true"
        @input="store.handleSearchQuery"
      />
    </div>
  </div>
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
    watch: {
      searchBtn(newVal) {
      this.store.isBtnSearchClicked = newVal;
      this.store.searchQueryText = '';
      }
    },
    methods: {
      isSearchBtn() {
        this.searchBtn = !this.searchBtn;
      },
    
    }
      


}
</script>

  
  <style scoped>
.hero {
  background: url("../assets/images/bg-image.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 70vh;
  width: 100vw;
  filter: grayscale(40%);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0;
  padding: 20px;
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
  font-size: 2rem;
  max-width: 90%;
}

@media (max-width: 768px) {
  .hero {
    height: 50vh;
    background-attachment: scroll; 
  }

  .hero-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero {
    height: 40vh;
  }

  .hero-text {
    font-size: 1.2rem;
  }
}

  </style>
  