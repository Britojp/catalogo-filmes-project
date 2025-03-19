import { defineStore } from 'pinia';
import type Film from '@/types/types';

export const useFilmsStore = defineStore('filmsStore', {
  state() {
    return {
      allMovies: {} as Record<number, Film[]>,
      favoriteMovies: new Set<number>(),  
      favoriteMoviesTemp: [] as Film[],   
      popularsFilms : [] as Film[]
    };
  },

  actions: {
    addMoviesForPage(page: number, movies: Film[]) {

      movies.forEach(movie => {
        if (this.favoriteMovies.has(movie.id)) {
          movie.favorite = true;
        }
      });

      this.allMovies[page] = movies;
      this.removeFilms();
    },
    addPopularsFilms(movies: Film[]) {

      movies.forEach(movie => {
        if (this.favoriteMovies.has(movie.id)) {
          movie.favorite = true;
        }
      });

      this.favoriteMoviesTemp = movies;
      this.removeFilms();
    },
    removeFilms() {
      if (Object.keys(this.allMovies).length > 4) {
        const firstPage = Math.min(...Object.keys(this.allMovies).map(Number));
        delete this.allMovies[firstPage];
      }
    },

    setFavoriteFilms(movie: Film) {
      this.favoriteMovies.add(movie.id); 

      for (const page in this.allMovies) {
        const movieToUpdate = this.allMovies[page].find((m: Film) => m.id === movie.id);
        if (movieToUpdate) {
          movieToUpdate.favorite = true;
          break;
        }
      }

      this.updateFavoriteMovies();
    },

    removefavoriteMovies(movie: Film) {
      this.favoriteMovies.delete(movie.id);  

      for (const page in this.allMovies) {
        const movieToUpdate = this.allMovies[page].find((m: Film) => m.id === movie.id);
        if (movieToUpdate) {
          movieToUpdate.favorite = false;
          break;
        }
      }

      this.updateFavoriteMovies();
    },

    updateFavoriteMovies() {
      this.favoriteMoviesTemp.forEach((movie) => {
        if (movie.favorite) {
          this.favoriteMovies.add(movie.id);
        }
      });

      this.favoriteMoviesTemp = this.favoriteMoviesTemp.filter((movie) => this.favoriteMovies.has(movie.id));
    },
  },

  getters: {
    getMoviesForPage: (state) => (page: number): Film[] => {
      return state.allMovies[page] || [];
    },

    getFavoriteMovies : (state) => () : Film[] => {
      return Object.values(state.favoriteMovies).flat();
    },

    getAllMovies: (state) => (): Film[] => {
      return Object.values(state.allMovies).flat();
    },   
     getPopularMovies: (state) => (): Film[] => {
      return state.popularsFilms;
    },
  },

  persist: true,
});
