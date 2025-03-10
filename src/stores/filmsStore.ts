import { defineStore } from 'pinia';
import type Film from '@/types/types';

export const useFilmsStore = defineStore('likedFilms', {
  state() {
    return {
      allMovies: [] as Film[],      
      favoriteMovies: [] as Film[],  
    };
  },
  actions: {
    loadMoviesFromLocalStorage() {
      const storedMovies = localStorage.getItem('movies');
      
      if (storedMovies) {
        const parsedMovies = JSON.parse(storedMovies);
        this.allMovies = parsedMovies;
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
  },
  getters: {
    favoriteMovies(state) {
      return state.allMovies.filter(movie => movie.favorite);
    },
  },
});
