<template>

<v-skeleton-loader 
 boilerplate 
  type="card"
    v-if="loading"
  >
</v-skeleton-loader>

    <v-container class="hero" v-else>
        <div class="overlay"></div>
        <div class="hero-text">
            <h1>Bem-vindo ao Catálogo de Filmes</h1>
            <p>Explore e descubra novos filmes</p>

            <v-btn 
            icon="mdi-magnify"
            class="mb-5"
            @click="isSearchBtn()"
            >
              
            </v-btn>

            <v-autocomplete
                v-if="searchBtn"
                prepend-inner-icon="mdi-magnify"
                label="Digite o nome do filme que deseja buscar"
                solo
                :items=[]
            ></v-autocomplete>
        </div>
    </v-container>
</template>

<script lang="ts">

export default {
    name: 'HeroPage',
    data(){
        return{
    searchBtn : false,
    loading : false,
    }
    },
    
    methods: {
        isSearchBtn(){
            this.searchBtn = !this.searchBtn;
        },
        
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