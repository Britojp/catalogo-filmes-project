import { defineStore } from 'pinia';
import type Film from '@/types/types';
import { searchMovies } from '@/services/api';
import debounce from 'lodash/debounce';

export const useFilmsStore = defineStore('likedFilms', {
  state() {
    return {
      allMovies: [] as Film[],      
      favoriteMovies: [] as Film[],  
      searchQueryText : '',
      searchMovies : [] as Film[],
      isBtnSearchClicked : false,
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

  addAllMovies(movies: Film[]){
    this.allMovies = [...this.allMovies, ...movies];
  }

},

  
  getters: {
    getFavoriteMovies(state) {
      return state.allMovies.filter(movie => movie.favorite);
    },
    getSearchedMovies(state){
      return state.searchMovies;
    },
    getAllMovies(state){
      return state.allMovies ;  
    }

  },



  persist: true,
});
