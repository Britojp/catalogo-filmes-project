<template>
    <v-footer >
      <v-row justify="center" no-gutters>
      <v-btn
      v-for="link in links"
      :key="link"
      class="mx-2"
      color="white"
      rounded="xl"
      variant="text"
      :to="`/${link.router}`"
      >
      {{ link.title }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Norven</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  
  <script>
    export default {
    name: 'Footer',

      data(){
        return{
        links: [
          {title: 'Home', router: '' },
          {title: 'Filmes', router: 'films'},
          {title: 'Séries', router: 'series'},
        ],
      }
      },
    }
  </script>