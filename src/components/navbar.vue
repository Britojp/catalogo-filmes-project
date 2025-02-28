<template>
  <v-app-bar :elevation="5">
    <template #prepend />
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-btn icon="mdi-home" href="/"></v-btn>
    <v-app-bar-title>Catálogo de filmes - Norven</v-app-bar-title>

    <template #append>
      <v-btn>
        <router-link to="/films">
          Filmes
        </router-link>
      </v-btn>
      <v-btn>
        <router-link to="/series">
          Séries
        </router-link>
      </v-btn>
      <v-btn 
        icon="mdi-magnify"
        @click="showInput"
      />
      <v-text-field 
        v-if="isClicked" 
        label="Procurar filmes" 
        class="search-input"
        solo
        flat
        clearable
        active
      />
    </template>
  </v-app-bar>
</template>

<script lang="ts">

export default {
  name: 'Navbar',
  data() {
    return {
      isClicked: false,
    }
  },
  methods: {
    showInput(){
      this.isClicked = !this.isClicked; 
    },

  }
}

</script>

<style scoped>

.search-input {
  width: 300px; 
  transition: width 0.3s ease-in-out;
}

.search-input.v-input--is-focused {
  width: 350px;
}

.v-app-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-app-bar-title {
  flex-grow: 1;
  text-align: center;
}

</style>

