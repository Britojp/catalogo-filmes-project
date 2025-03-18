import { defineStore } from 'pinia';
import type Film from '@/types/types';

export const useSeriesStore = defineStore('seriesStore', {
  state() {
    return {
      allSerie: {} as Record<number, Film[]>,
      favoriteSerie: new Set<number>(),  
      favoriteSerieTemp: [] as Film[],   
    };
  },

  actions: {
    addSerieForPage(page: number, Serie: Film[]) {
      const favoriteSerieForPage = this.favoriteSerieTemp.filter((serie) => this.favoriteSerie.has(serie.id));

      Serie.forEach(serie => {
        if (this.favoriteSerie.has(serie.id)) {
          serie.favorite = true;
        }
      });

      this.allSerie[page] = Serie;
      this.removeSeries();
    },

    removeSeries() {
      if (Object.keys(this.allSerie).length > 4) {
        const firstPage = Math.min(...Object.keys(this.allSerie).map(Number));
        delete this.allSerie[firstPage];
      }
    },

    setFavoriteSeries(serie: Film) {
      this.favoriteSerie.add(serie.id); 

      for (const page in this.allSerie) {
        const serieToUpdate = this.allSerie[page].find((m: Film) => m.id === serie.id);
        if (serieToUpdate) {
          serieToUpdate.favorite = true;
          break;
        }
      }

      this.updateFavoriteSerie();
    },

    removefavoriteSerie(serie: Film) {
      this.favoriteSerie.delete(serie.id);  

      for (const page in this.allSerie) {
        const serieToUpdate = this.allSerie[page].find((m: Film) => m.id === serie.id);
        if (serieToUpdate) {
          serieToUpdate.favorite = false;
          break;
        }
      }

      this.updateFavoriteSerie();
    },

    updateFavoriteSerie() {
      this.favoriteSerieTemp.forEach((serie) => {
        if (serie.favorite) {
          this.favoriteSerie.add(serie.id);
        }
      });

      this.favoriteSerieTemp = this.favoriteSerieTemp.filter((serie) => this.favoriteSerie.has(serie.id));
    },
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
  },

  persist: true,
});
