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
    loadMoviesFromLocalStorage() {
      const storedMovies = localStorage.getItem('movies');
      const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
      
      if (storedMovies) {
        const parsedMovies = JSON.parse(storedMovies);
        this.allMovies = parsedMovies;
      }
      if(storedFavoriteMovies){
        const parsedFavoriteMovies = JSON.parse(storedFavoriteMovies);
        this.favoriteMovies = parsedFavoriteMovies;
      }
    },

    saveMoviesToLocalStorage() {
      localStorage.setItem('movies', JSON.stringify(this.allMovies));
    },

    fetchAllMovies(movies: Film[]) {
      this.allMovies = movies;

    },

    toggleFavorite(movieId: number) {
      const movie = this.allMovies.find(m => m.id === movieId);
      if (movie) {
        movie.favorite = !movie.favorite;  
        this.saveMoviesToLocalStorage(); 
      }
    },
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

  },
  
  getters: {
    favoriteMovies(state) {
      return state.allMovies.filter(movie => movie.favorite);
    },
    searchedMovies(state){
      return state.searchMovies;
    },

  },
});
