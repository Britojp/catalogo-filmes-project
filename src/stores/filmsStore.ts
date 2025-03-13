import { defineStore } from 'pinia';
import type Film from '@/types/types';
import { searchMovies } from '@/services/api';
import debounce from 'lodash/debounce';

export const useFilmsStore = defineStore('filmsStore', {
  state() {
    return {
      allMovies: {} as Record<number, Film[]>,
      favoriteMovies: [] as Film[],  
     
    };
  },
  actions: {

  handleSearchQuery: debounce(function(this : any) {
    if (this.searchQueryText && this.searchQueryText.length > 3) { 
      searchMovies(this.searchQueryText)
        .then((response) => {
          this.searchMovies = response.data.results || []; 
        })
        .catch((error) => {
          console.error('Erro ao buscar filmes:', error);
        })
        .finally(() => {
        });
    } else {
      this.searchMovies = [];
    }
  }, 500),

  addMoviesForPage(page: number, movies: Film[]) {
    this.allMovies[page] = movies;
  },

},

  
  getters: {

    getMoviesForPage: (state) => (page: number): Film[] => {
      return state.allMovies[page] || [];
    },

  },



  persist: true,
});
