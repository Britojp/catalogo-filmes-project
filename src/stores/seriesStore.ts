import { defineStore } from 'pinia';
import type Film from '@/types/types';


export const useSeriesStore = defineStore('SeriesStore', {
  state() {
    return {
      allSeries: {} as Record<number, Film[]>,
      favoriteSeries: {} as Record<number, Film[]>,  
     
    };
  },
  actions: {

  addSeriesForPage(page: number, Series: Film[]) {
    const favoriteSeriesForPage = this.favoriteSeries[page] || [];
    Series.forEach(serie => {
      if (favoriteSeriesForPage.some((favserie: Film) => favserie.id === serie.id)) {
        serie.favorite = true;
      }
    });
    this.allSeries[page] = Series;
    this.removeSeries();
  },

  removeSeries() {
    if (Object.keys(this.allSeries).length > 4) {
      const firstPage = Math.min(...Object.keys(this.allSeries).map(Number));
      delete this.allSeries[firstPage];
    }
  },
  setFavoriteSeries(serie: Film) {
    for (const page in this.allSeries) {
      const Series = this.allSeries[page];
      const serieToUpdate = Series.find((m: Film) => m.id === serie.id);
      if (serieToUpdate) {
        serieToUpdate.favorite = true;
        break;
      }
    }
    this.setFavoriteListSeries();
  },
  setFavoriteListSeries(){
    this.favoriteSeries = Object.fromEntries(
      Object.entries(this.allSeries).map(([page, Series]) => [
        page,
        Series.filter((serie: Film) => serie.favorite),
      ])
    );
  },
  removeFavoriteSeries(serie: Film) {
    for (const page in this.allSeries) {
      const Series = this.allSeries[page];
      const serieToUpdate = Series.find((m: Film) => m.id === serie.id);
      if (serieToUpdate) {
        serieToUpdate.favorite = false;
        break;
      }
    }
    this.updateFavoriteSeries();
  },
  updateFavoriteSeries() {
    this.favoriteSeries = Object.fromEntries(
      Object.entries(this.allSeries).map(([page, Series]) => [
        page,
        Series.filter((serie: Film) => serie.favorite),
      ])
    );
  },
},

  getters: {
    getSeriesForPage: (state) => (page: number): Film[] => {
      return state.allSeries[page] || [];
    },
    getFavoriteSeries : (state) => () : Film[] => {
      return Object.values(state.favoriteSeries).flat();
    }
  },

  persist: true,
});
