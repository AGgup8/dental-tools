import { defineStore } from "pinia";

export const useBleedingStore = defineStore("bleeding", {
  state: () => {
    return {
      activeIndex: 18,
      activeSurface: 0,
    };
  },

  getters: {
    getActiveSurface: (state) => state.activeSurface,
    getActiveIndex: (state) => state.activeSurface,
  },

  actions: {
    resetActiveSurface() {
      this.activeIndex = 18;
      this.activeSurface = 0;
    },

    setActiveSurface({ index, surface }) {
      this.activeIndex = index;
      this.activeSurface = surface;
    },
  },
});
