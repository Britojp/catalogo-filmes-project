<template>
  <Heropage  />
  <ShowSearch v-if="isBtn"/>
  <PopularsSection v-else />

</template>

<script lang="ts">
import Heropage from '@/components/heropage.vue';
import PopularsSection from '@/components/index/popularsSection.vue';
import ShowSearch from '@/components/index/showSearch.vue';
import { useFilmsStore } from '@/stores/filmsStore';

export default{
  data() {
    return{
    isBtn : false,
  }
  },

  computed: {
    store() {
      return useFilmsStore();
    },

  },

  watch : {
    store: {
      handler() {
        this.isBtn = this.store.isBtnSearchClicked
      },
      deep: true
    }
  }
}


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