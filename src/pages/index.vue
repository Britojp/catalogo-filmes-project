<template>
  <Heropage />
  <PopularFilms />
  <PopularSeries />
</template>

<script lang="ts" setup>
import Heropage from '@/components/heropage.vue';
import PopularFilms from '@/components/index/popularFilms.vue'
import PopularSeries from '@/components/index/popularSeries.vue'

</script>

<style>
a{
  text-decoration: none;
  color: white
}
h3{
  font-weight: normal;
}
</style>