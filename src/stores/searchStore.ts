import { defineStore } from 'pinia';
import type Film from '@/types/types';
import { searchMoviesAndSeries } from '@/services/api';
import debounce from 'lodash/debounce';

export const useSearchStore = defineStore('searchStore', {
  state() {
    return {
      searchQueryText : '',
      searchMoviesAndSeries : [] as Film[],
      isBtnSearchClicked : false,
    };
  },
  actions: {

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
        });
    } else {
      this.searchMoviesAndSeries = [];
    }
  }, 500),

  setIsBtn(){
    return !this.isBtnSearchClicked;
  }

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
