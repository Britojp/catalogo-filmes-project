<template>
  <v-footer>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.title"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
        :to="`/${link.router}`"
      >
        {{ link.title }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ currentYear }} — <strong>Norven</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
interface Link {
  title: string
  router: string
}

const links: Link[] = [
  { title: 'Home', router: '' },
  { title: 'Filmes', router: 'films' },
  { title: 'Séries', router: 'series' },
]

const currentYear = new Date().getFullYear()
</script>
