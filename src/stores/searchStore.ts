import { defineStore } from 'pinia';
import type Film from '@/types/types';
import { searchMovies } from '@/services/api';
import debounce from 'lodash/debounce';

export const useSearchStore = defineStore('searchStore', {
  state() {
    return {
      searchQueryText : '',
      searchMovies : [] as Film[],
      isBtnSearchClicked : false,
    };
  },
  actions: {

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

  setIsBtn(){
    return !this.isBtnSearchClicked;
  }

},


  getters: {

    getSearchedMovies(state){
      return state.searchMovies;
    },
    getIsBtn(state){
        return state.isBtnSearchClicked;
    }
  },



});
