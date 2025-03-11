import { defineStore } from 'pinia';
import type Film from '@/types/types';
import { searchMovies } from '@/services/api';

export const useFilmsStore = defineStore('likedFilms', {
  state() {
    return {
      allMovies: [] as Film[],      
      favoriteMovies: [] as Film[],  
      searchQueryText : '',
      searchMovies : [] as Film[],
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
      this.saveMoviesToLocalStorage(); 
    },

    toggleFavorite(movieId: number) {
      const movie = this.allMovies.find(m => m.id === movieId);
      if (movie) {
        movie.favorite = !movie.favorite;  
        this.saveMoviesToLocalStorage(); 
      }
    },
    handleSearchQuery() {
  
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
    },
  },
  
  getters: {
    favoriteMovies(state) {
      return state.allMovies.filter(movie => movie.favorite);
    },
    searchedMovies(state){
      console.log('searchedMovies: ', state.searchMovies);
      return state.searchMovies;
    },

  },
});
