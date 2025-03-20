import { defineStore } from 'pinia';
import type Film from '@/types/types';



export const useSeriesStore = defineStore('seriesStore', {
  state() {
    return {
      allSerie: {} as Record<number, Film[]>,
      favoriteSerie: [] as Film[],  
      popularsSeries : [] as Film[],
    };
  },

  actions: {
   addSeriesForPage(page: number, series: Film[]) {
       if (Array.isArray(this.favoriteSerie)) {
         series.forEach(serie => {
           if (this.favoriteSerie.some(favoriteSeries =>favoriteSeries.id === serie.id)) {
             serie.favorite = true;
           }
         });
       } else {
         console.error('favoriteSerie is not an array:', this.favoriteSerie);
         this.favoriteSerie = [];
       }
       this.allSerie[page] = series;
     },

    removeSeries() {
      if (Object.keys(this.allSerie).length > 4) {
        const firstPage = Math.min(...Object.keys(this.allSerie).map(Number));
        delete this.allSerie[firstPage];
      }
    },

    toggleFavoriteNoPage(serie: Film){
      serie.favorite = !serie.favorite
      if(serie.favorite){
        this.favoriteSerie.push(serie)
      }else{
        const index = this.favoriteSerie.findIndex(favorite => favorite.id === serie.id);
          if (index !== -1) {
            this.favoriteSerie.splice(index, 1);
          }
      }
    },

    toggleFavorite(serie: Film){
      for(const page in this.allSerie){
        const serieToUpdate = this.allSerie[page].find((m:Film) => m.id === serie.id)
        if(serieToUpdate){
          serieToUpdate.favorite = !serieToUpdate.favorite;
        }

        if(serieToUpdate && serieToUpdate.favorite){
          this.favoriteSerie.push(serieToUpdate);
        }else{
          const index = this.favoriteSerie.findIndex(favorite => favorite.id === serieToUpdate?.id);
          if (index !== -1) {
            this.favoriteSerie.splice(index, 1);
          }
        }

      }
    },
    addPopularsSeries(series: Film[]) {
    
      if (Array.isArray(this.favoriteSerie)) {
        series.forEach(serie => {
          if (this.favoriteSerie.some(s => s.id === serie.id)) {
            serie.favorite = true;
          }
        });
      } else {
        this.favoriteSerie = [];
      }
      this.popularsSeries = series;
    }
  },

  getters: {
    getSerieForPage: (state) => (page: number): Film[] => {
      return state.allSerie[page] || [];
    },

    getFavoriteSerie : (state) => () : Film[] => {
      return Object.values(state.favoriteSerie).flat();
    },

    getAllSerie: (state) => (): Film[] => {
      return Object.values(state.allSerie).flat();
    },
    getPopularSeries:(state) => (): Film[] => {
      return state.popularsSeries;
    }
  },

  persist: true,
});
