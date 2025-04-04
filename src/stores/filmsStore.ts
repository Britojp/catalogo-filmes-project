import { defineStore } from 'pinia';
import type Film from '@/types/types';

export const useFilmsStore = defineStore('filmsStore', {
  state() {
    return {
      allMovies: {} as Record<number, Film[]>,
      favoriteMovies: [] as Film[],   
      popularsFilms : [] as Film[]
    };
  },

  actions: {
    addMoviesForPage(page: number, movies: Film[]) {
      if (Array.isArray(this.favoriteMovies)) {
        movies.forEach(movie => {
          if (this.favoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id)) {
            movie.favorite = true;
          }
        });
      } else {
        console.error('favoriteMovies is not an array:', this.favoriteMovies);
        this.favoriteMovies = [];
      }
      this.allMovies[page] = movies;
    },
    
    removeFilms() {
      if (Object.keys(this.allMovies).length > 4) {
        const firstPage = Math.min(...Object.keys(this.allMovies).map(Number));
        delete this.allMovies[firstPage];
      }
    },

    
  toggleFavorite(Movies: Film) {
      Movies.favorite = !Movies.favorite;
    
      if (Movies.favorite) {
        const index = this.favoriteMovies.findIndex(favorite => favorite.id === Movies.id);
        if (index === -1) {
          this.favoriteMovies.push(Movies);
        }
      } else {
        const index = this.favoriteMovies.findIndex(favorite => favorite.id === Movies.id);
        if (index !== -1) {
          this.favoriteMovies.splice(index, 1);
        }
      }
    
      for (const page in this.allMovies) {
        const MoviesToUpdate = this.allMovies[page].find((m: Film) => m.id === Movies.id);
        if (MoviesToUpdate) {
          MoviesToUpdate.favorite = Movies.favorite;
          if (Movies.favorite) {
            const index = this.favoriteMovies.findIndex(favorite => favorite.id === MoviesToUpdate.id);
            if (index === -1) {
              this.favoriteMovies.push(MoviesToUpdate);
            }
          } else {
            const index = this.favoriteMovies.findIndex(favorite => favorite.id === MoviesToUpdate.id);
            if (index !== -1) {
              this.favoriteMovies.splice(index, 1);
            }
          }
        }
      }
    },

        addPopularFilms(movies: Film[]) {
          if (Array.isArray(this.favoriteMovies)) {
            movies.forEach(movie => {
              if (this.favoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id)) {
                movie.favorite = true;
              }
            });
          } else {
            this.favoriteMovies = [];
          }
          this.popularsFilms = movies;
        },
    

    setFavoriteFilms(movie: Film) {
      if (!this.favoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id)) {
      this.favoriteMovies.push(movie); 

      for (const page in this.allMovies) {
        const movieToUpdate = this.allMovies[page].find((m: Film) => m.id === movie.id);
        if (movieToUpdate) {
        movieToUpdate.favorite = true;
        break;
        }
      }
      }
    },
    

    removefavoriteMovies(movie: Film) {
      this.favoriteMovies = this.favoriteMovies.filter(favoriteMovie => favoriteMovie.id !== movie.id);  

      for (const page in this.allMovies) {
        const movieToUpdate = this.allMovies[page].find((m: Film) => m.id === movie.id);
        if (movieToUpdate) {
          movieToUpdate.favorite = false;
          break;
        }
      }

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
