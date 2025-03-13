import { defineStore } from 'pinia';
import type Film from '@/types/types';


export const useFilmsStore = defineStore('filmsStore', {
  state() {
    return {
      allMovies: {} as Record<number, Film[]>,
      favoriteMovies: [] as Film[],  
     
    };
  },
  actions: {

  addMoviesForPage(page: number, movies: Film[]) {
    this.allMovies[page] = movies;
    this.removeFilms();
  },

  removeFilms() {
    if (Object.keys(this.allMovies).length > 6) {
      const firstPage = Math.min(...Object.keys(this.allMovies).map(Number));
      delete this.allMovies[firstPage];
    }
  },


},

  
  getters: {

    getMoviesForPage: (state) => (page: number): Film[] => {
      return state.allMovies[page] || [];
    },

  },



  persist: true,
});
