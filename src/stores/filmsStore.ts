import {defineStore, mapStores} from 'pinia'
import type Film from '@/types/types'

export const useFilmsStore = defineStore('likedFilms', {
    state() {
        return {
            allMovies: [] as Film[]
        }
    },
    actions: {
        fetchAllMovies(movies: Film[]) {
            this.allMovies = movies;
        },
        
        toggleFavorite(movieId: number) {
            const movie = this.allMovies.find(m => m.id === movieId);
            if (movie) {
                movie.favorite = !movie.favorite;
            }
        }
    },
    getters: {
        favoriteMovies(state) {
            return state.allMovies.filter(movie => movie.favorite);
        }
    }
})