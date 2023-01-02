<template>
  <main id="charting-view">
    <AppNotification
      :notification="notification"
      :show="showNotification"
      :onEnd="clearNotification"
    />

    <AppTitleGroup>
      <h1 class="title">Chart</h1>
      <button title="Clear" class="btn btn-icon" @click="showModal = true">
        <IconRestore class="icon" />
      </button>
      <AppModal v-if="showModal" @outside-click="showModal = false">
        <template v-slot:header>
          <p>Are you sure you want to clear the charting?</p>
        </template>
        <template v-slot:body>
          <button
            class="btn"
            @click="
              showModal = false;
              clearChart();
            "
          >
            Yes
          </button>
          <button class="btn" @click="showModal = false">Cancel</button>
        </template>
      </AppModal>
    </AppTitleGroup>

    <div class="chart-layout">
      <div id="upper-right-quadrant" class="quadrant-layout">
        <ChartToothSingle
          v-for="tooth in upperRightQuadrant"
          :key="tooth.index"
          :index="tooth.index"
          :surfaces="tooth.surfaces"
          :type="Object.keys(tooth.surfaces).length == 7 ? 1 : 2"
        />
      </div>
      <div id="upper-left-quadrant" class="quadrant-layout">
        <ChartToothSingle
          v-for="tooth in upperLeftQuadrant"
          :key="tooth.index"
          :index="tooth.index"
          :surfaces="tooth.surfaces"
          :type="Object.keys(tooth.surfaces).length == 7 ? 1 : 2"
        />
      </div>
      <div id="lower-right-quadrant" class="quadrant-layout">
        <ChartToothSingle
          v-for="tooth in lowerRightQuadrant"
          :key="tooth.index"
          :index="tooth.index"
          :surfaces="tooth.surfaces"
          :type="Object.keys(tooth.surfaces).length == 7 ? 1 : 2"
        />
      </div>
      <div id="lower-left-quadrant" class="quadrant-layout">
        <ChartToothSingle
          v-for="tooth in lowerLeftQuadrant"
          :key="tooth.index"
          :index="tooth.index"
          :surfaces="tooth.surfaces"
          :type="Object.keys(tooth.surfaces).length == 7 ? 1 : 2"
        />
      </div>
    </div>
    <ColorKey v-once />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import AppTitleGroup from "../../components/AppTitleGroup.vue";
import AppNotification from "../../components/AppNotification.vue";
import ColorKey from "./components/ColorKey.vue";
import ChartToothSingle from "./components/ChartToothSingle.vue";
import { useChartStore } from "../../shared-stores/chartStore.js";
import AppModal from "../../components/AppModal.vue";
import { IconRestore } from "@iconify-prerendered/vue-mdi";

const notification = ref("");
const showNotification = ref(false);
function clearNotification() {
  showNotification.value = false;
}

// load chart data and split into quadrants
const chartStore = useChartStore();
const chartData = chartStore.chart;
const upperRightQuadrant = computed(() =>
  chartData
    .filter((tooth) => tooth.index >= 11 && tooth.index <= 18)
    .sort((a, b) => b.index - a.index)
);
const upperLeftQuadrant = computed(() =>
  chartData
    .filter((tooth) => tooth.index >= 21 && tooth.index <= 28)
    .sort((a, b) => a.index - b.index)
);
const lowerLeftQuadrant = computed(() =>
  chartData
    .filter((tooth) => tooth.index >= 31 && tooth.index <= 38)
    .sort((a, b) => a.index - b.index)
);
const lowerRightQuadrant = computed(() =>
  chartData
    .filter((tooth) => tooth.index >= 41 && tooth.index <= 48)
    .sort((a, b) => b.index - a.index)
);

function clearChart() {
  chartStore.clearChart();
  notification.value = "Chart cleared";
  showNotification.value = true;
}

const showModal = ref(false);
</script>

<style lang="scss" scoped>
#charting-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chart-layout {
  display: grid;
  grid-gap: 2.5em 1.5em;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content min-content;
}

.quadrant-layout {
  display: grid;
  grid-gap: 0.2em;
  grid-template-columns: repeat(8, 1fr);

  @media only screen and (max-width: 992px) {
    grid-gap: 0.1em;
  }
}
</style>
