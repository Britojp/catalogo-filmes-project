<template>
  <v-app-bar :elevation="5">
    <template #prepend />
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"/>
    <v-btn>
        <router-link to="/">
          <v-icon>mdi-home</v-icon>
        </router-link>
      </v-btn>

      <v-app-bar-title>Catálogo de filmes - Norven</v-app-bar-title>



    </v-app-bar>
    
      <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
      >
      
    <template v-for="item in items" :key="item.router">
      <router-link :to="`/${item.router}`">
        <v-list-item>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </template>
    
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
    </v-navigation-drawer>


</template>

<script lang="ts">

export default {
  name: 'Navbar',
  data() {
    return {
      isClicked: false,
      drawer: false,
      items: [
        {
          title: 'Home',
          router: '/',
          value: 'Home',
        },
        {
          title: 'Filmes',
          router: 'films',
          value: 'Filmes',
        },
        {
          title: 'Séries',
          router: 'series',
          value: 'Séries',
        },
      ],
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

