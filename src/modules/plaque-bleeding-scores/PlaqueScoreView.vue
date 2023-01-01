<template>
  <main id="plaque-view">
    <AppNotification
      :notification="notification"
      :show="showNotification"
      :onEnd="clearNotification"
    />
    <AppTitleGroup>
      <h1 class="title">Plaque Score</h1>
      <button title="Clear" class="btn" @click="showModal = true">
        <IconRestore />
      </button>
      <button title="Toggle teeth" class="btn" @click="toggleTeeth">
        <IconToothOutline />
      </button>
      <AppModal v-if="showModal" @outside-click="showModal = false">
        <template #header>
          <p>Are you sure you want to clear the plaque score?</p>
        </template>
        <template #body>
          <button
            class="btn"
            @click="
              showModal = false;
              clearPlaqueChart();
            "
          >
            Yes
          </button>
          <button class="btn" @click="showModal = false">Cancel</button>
        </template>
      </AppModal>
    </AppTitleGroup>

    <ChartSixSurface
      :data="mouth"
      :onUpdate="updatePlaqueChart"
      :highlightColor="2"
      :show-teeth="showTeeth"
      :disable="showModal"
    />

    <p class="bold end score">Plaque Score: {{ plaqueScore }}%</p>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import PlaqueRepository from "./repository/PlaqueRepository.js";
import AppTitleGroup from "../../components/AppTitleGroup.vue";
import ChartSixSurface from "./components/ChartSixSurface.vue";
import AppNotification from "../../components/AppNotification.vue";
import AppModal from "../../components/AppModal.vue";
import { IconRestore, IconToothOutline } from "@iconify-prerendered/vue-mdi";

const plaqueRepository = PlaqueRepository();
const mouth = ref([...plaqueRepository.load()]);

const notification = ref("");
const showNotification = ref(false);
function clearNotification() {
  showNotification.value = false;
}

function updatePlaqueChart(newTooth) {
  const newMouth = mouth.value.map((tooth) => {
    if (tooth.number == newTooth.number) {
      tooth = newTooth;
    }
    return tooth;
  });
  mouth.value = plaqueRepository.update(newMouth);
}

function clearPlaqueChart() {
  mouth.value = plaqueRepository.clear();
  notification.value = "Plaque score cleared";
  showNotification.value = true;
}

const showModal = ref(false);

const showTeeth = ref(false);
function toggleTeeth() {
  if (showTeeth.value) {
    showTeeth.value = false;
  } else {
    showTeeth.value = true;
  }
}

const plaqueScore = computed(() => {
  const presentTeeth = mouth.value.filter((tooth) => {
    return tooth.present;
  });
  const numOfTeeth = presentTeeth.length;
  const mouthSurfaces = presentTeeth
    .map((tooth) => {
      return tooth.surfaces;
    })
    .flat();
  const totalPlaqueSurfaces = mouthSurfaces.reduce((total, num) => {
    return total + Number(num);
  }, 0);
  return Math.round((totalPlaqueSurfaces / (numOfTeeth * 6)) * 100);
});
</script>

<style scoped>
#plaque-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.score {
  background-color: var(--color-surface-el-2);
  border-radius: var(--border-radius-medium);
  padding: 1em;
  font: var(--title-medium);
}
</style>
