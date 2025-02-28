<template>
  <v-container class="hero" />
  <div class="overlay"></div>
</template>

<script lang="ts">


export default{
    name: 'HeroPage',
    
    
}


</script>

<style scoped>

.hero{
    background: url("../assets/images/HeroImage.jpeg") no-repeat center center fixed;
    background-size: cover;
    height: 70vh;
    width: 100vw;
    filter: grayscale(80%);
    position: relative;
}
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    filter: brightness(0.5); 
    z-index: 1; 
}

</style>