import { defineStore } from 'pinia';
import type Film from '@/types/types';


export const useFilmsStore = defineStore('filmsStore', {
  state() {
    return {
      allMovies: {} as Record<number, Film[]>,
      favoriteMovies: {} as Record<number, Film[]>,  
     
    };
  },
  actions: {

  addMoviesForPage(page: number, movies: Film[]) {
    const favoriteMoviesForPage = this.favoriteMovies[page] || [];
    movies.forEach(movie => {
      if (favoriteMoviesForPage.some((favMovie: Film) => favMovie.id === movie.id)) {
        movie.favorite = true;
      }
    });
    this.allMovies[page] = movies;
    this.removeFilms();
  },

  removeFilms() {
    if (Object.keys(this.allMovies).length > 4) {
      const firstPage = Math.min(...Object.keys(this.allMovies).map(Number));
      delete this.allMovies[firstPage];
    }
  },
  setFavoriteFilms(movie: Film) {
    for (const page in this.allMovies) {
      const movies = this.allMovies[page];
      const movieToUpdate = movies.find((m: Film) => m.id === movie.id);
      if (movieToUpdate) {
        movieToUpdate.favorite = true;
        break;
      }
    }
    this.setFavoriteListFilms();
  },
  setFavoriteListFilms(){
    this.favoriteMovies = Object.fromEntries(
      Object.entries(this.allMovies).map(([page, movies]) => [
        page,
        movies.filter((movie: Film) => movie.favorite),
      ])
    );
  },
  removefavoriteMovies(serie: Film) {
      for (const page in this.allMovies) {
        const Movies = this.allMovies[page];
        const movieToUpdate = Movies.find((m: Film) => m.id === serie.id);
        if (movieToUpdate) {
          movieToUpdate.favorite = false;
          break;
        }
      }
      this.updatefavoriteMovies();
    },
    updatefavoriteMovies() {
      this.favoriteMovies = Object.fromEntries(
        Object.entries(this.allMovies).map(([page, Movies]) => [
          page,
          Movies.filter((serie: Film) => serie.favorite),
        ])
      );
    },
  },

  getters: {
    getMoviesForPage: (state) => (page: number): Film[] => {
      return state.allMovies[page] || [];
    },
    getFavoriteMovies : (state) => () : Film[] => {
      return Object.values(state.favoriteMovies).flat();
    }

  },



  persist: true,
});
