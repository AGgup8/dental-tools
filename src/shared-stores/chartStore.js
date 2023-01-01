import { defineStore } from "pinia";
import ChartRepository from "../shared-repository/ChartRepository.js";

const chartRepository = ChartRepository()

export const useChartStore = defineStore("chart", {
  state: () => {
    return { 
      activeSurface: null,
      chart: chartRepository.load()
    };
  },

  getters: {
    getActiveTooth: (state) => state.activeSurface?.[0],
    getActiveSurface: (state) => state.activeSurface?.[1],
    getChart: (state) => state.chart,
    getTooth: (state) => {
      return (index) => state.chart.find(t => t.index == index);
    }
  },

  actions: {
    resetActiveSurface() {
      this.activeSurface = null;
    },

    clearChart() {
      chartRepository.clear();
      this.chart = chartRepository.load();
    },

    setActiveSurface(data) {
      this.activeSurface = data
    },

    updateChart({ index, surface, value }) {
      const data = this.chart.find(tooth => tooth.index == index);

      if (surface == 0) {
        data.surfaces.whole = value;
      } else if (surface == 1) {
        data.surfaces.top = value;
      } else if (surface == 2) {
        data.surfaces.right = value;
      } else if (surface == 3) {
        data.surfaces.bottom = value;
      } else if (surface == 4) {
        data.surfaces.left = value;
      } else if (surface == 5) {
        data.surfaces.occlusal = value;
      } else if (surface == 6) {
        data.surfaces.extra = value;
      }
      chartRepository.update(this.chart);
    }
  },
});
