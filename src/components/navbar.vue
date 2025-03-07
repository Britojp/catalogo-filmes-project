<template>
  <v-app-bar :elevation="5">
    <template #prepend />
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"/>
    <v-btn icon="mdi-home">
        <router-link to="">
          <v-icon>mdi-home</v-icon>
        </router-link>
      </v-btn>

      <v-app-bar-title>Catálogo de filmes - Norven</v-app-bar-title>

      <template v-slot:append>
          <v-btn icon="mdi-account"></v-btn>
        </template>

    </v-app-bar>
    
      <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
      >
      
    <template v-for="item in items" :key="item.router">
      <router-link :to="`${item.router}`">
        <v-list-item>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </template>
   
   
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
          router: '',
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
        {
          title: 'Meus favoritos',
          router: 'liked',
          value: 'liked',
        }
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

