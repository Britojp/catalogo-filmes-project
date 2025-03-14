<template>
  <Films :filmsOrSeries="films" :total_pages="total_pages" />
  </template>
    
    <script lang="ts">
    import Films from '@/components/filmsSeries/filmsOrSeriesComponent.vue';
  import { getAllMovies } from '@/services/api';
  import { useFilmsStore } from '@/stores/filmsStore';
  import type Film from '@/types/types';
  import { genresMoviesDB } from '@/types/types';
    export default {
      components: {
        Films
      },
  
      data() {
        return {
           isLoading: false,
          search: '',
          selectedGenres: [] as string[],
          genders: '',
          isFilter: false,
          films: [] as Film[], 
          total_pages : 500,
          currentPage : 1,
          filmsGenders: [
          ...genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name })),
        ],
        noDataMessage: '',
        };
      },
      computed: {
        store() {
          return useFilmsStore();
        },
      },
  
      methods: {
        loadAllFilms() {
          this.isLoading = true;
          this.genders = '';
          this.selectedGenres = [];
    
          if (!this.store.getMoviesForPage(this.currentPage).length) {
            getAllMovies(this.currentPage)
              .then((response: any) => {
                this.films = response.data.results;
                this.total_pages = response.data.total_pages;
                this.loadGenres();
                this.store.addMoviesForPage(this.currentPage, this.films);
              })
              .catch((error: any) => {
                console.error('Erro ao carregar filmes populares:', error);
              })
              .finally(() => {
                this.isLoading = false;
              });
          } else {
            this.films = this.store.getMoviesForPage(this.currentPage);
            this.isLoading = false;
          }
        },
        loadGenres() {
        this.films = this.films.map(film => {
          if (film.genre_ids) {
            return {
              ...film,
              genres: film.genre_ids.map(id => {
                const genre = genresMoviesDB.find(g => g.id === id);
                return genre ? genre.name : 'Outro';
              }),
            };
          } else {
            return { ...film, genres: ['Outro'] };
          }
        });
        this.filmsGenders = genresMoviesDB.map(genre => ({ id: genre.id, name: genre.name }));
      },
      filteredFilms() {
        this.isFilter = true;
        this.isLoading = true;
        if (this.selectedGenres.length) {
          const filtered = this.films.filter(film =>
            this.selectedGenres.every(genre => film.genres.includes(genre))
          );
          if (filtered.length) {
            this.films = filtered;
          } else {
            this.noDataMessage = 'Não há filmes com os gêneros selecionados';
            this.films = [];
          }
        } else {
          this.loadAllFilms();
          this.isFilter = false;
        }
        this.isLoading = false;
      },
      },
  
    mounted() {
      this.loadAllFilms();
    },
  
    watch: {
      currentPage() {
        if (!this.isFilter) {
          this.loadAllFilms();
        } else {
          this.filteredFilms();
        }
      },
    },
    }
    </script>
    <style>
    </style>