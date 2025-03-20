import { defineStore } from 'pinia';
import type Film from '@/types/types';
import { searchMoviesAndSeries } from '@/services/api';
import debounce from 'lodash/debounce';
import { useFilmsStore } from './filmsStore';
import { useSeriesStore } from './seriesStore';

export const useSearchStore = defineStore('searchStore', {
  state() {
    return {
      searchQueryText : '',
      searchMoviesAndSeries : [] as Film[],
      isBtnSearchClicked : false,
    };
  },
  actions: {

    verifyFavorites(films : Film[]){
      const filmsStore = useFilmsStore();
      const serieStore = useSeriesStore();
      
      films.forEach(film => {
        if(film.media_type === 'tv'){
          const isFavoriteSeries = serieStore.favoriteSerie.some(favorite => favorite.id === film.id);
          if(isFavoriteSeries){
          film.favorite = true;
        } 
        }else{
        const isFavoriteFilm = filmsStore.favoriteMovies.some(favorite => favorite.id === film.id);
        if(isFavoriteFilm){
          film.favorite = true;
        } 
      }
    });
      
    },
  handleSearchQuery: debounce(function(this : any) {
    
    if (this.searchQueryText && this.searchQueryText.length > 3) { 
      
      searchMoviesAndSeries(this.searchQueryText)
        .then((response) => {
          this.searchMoviesAndSeries = response.data.results || []; 
        })
        .catch((error) => {
          console.error('Erro ao buscar filmes:', error);
        })
        .finally(() => {
          this.verifyFavorites(this.searchMoviesAndSeries);
        });
    } else {
      this.searchMoviesAndSeries = [];
    }
  }, 500),

  setIsBtn(){
    return !this.isBtnSearchClicked;
  },


},


  getters: {

    getSearchedMovies(state){
      return state.searchMoviesAndSeries;
    },
    getIsBtn(state){
        return state.isBtnSearchClicked;
    }
  },



});
