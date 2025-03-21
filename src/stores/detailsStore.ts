import { defineStore } from 'pinia';
import type Film from '@/types/types';


export const useDetailsStore = defineStore('detailsStore', {
  state() {
    return {
        selectedMedia: {} as Film,
    };
  },
  actions: {
    setSelectedMedia(media : Film){
        this.selectedMedia = media;
    },
    removeSelectedMedia(){
        this.selectedMedia = {} as Film;
    }

    },

  getters: {
    getSelectedMedia: (state) => (): Film => {
      return state.selectedMedia;
    },

  },

  
  
});
