<template>
  <main id="bleeding-view">
    <AppNotification
      :notification="notification"
      :show="showNotification"
      :onEnd="clearNotification"
    />
    <AppTitleGroup>
      <h1 class="title">Bleeding Score</h1>
      <button title="Clear" class="btn btn-icon" @click="showModal = true">
        <IconRestore class="icon" />
      </button>
      <button title="Toggle teeth" class="btn btn-icon" @click="toggleTeeth">
        <IconToothOutline class="icon" />
      </button>
      <AppModal v-if="showModal" @outside-click="showModal = false">
        <template v-slot:header>
          <p>Are you sure you want to clear the bleeding score?</p>
        </template>
        <template v-slot:body>
          <button
            class="btn"
            @click="
              showModal = false;
              clearBleedingChart();
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
      :onUpdate="updateBleedingChart"
      :highlightColor="1"
      :show-teeth="showTeeth"
      :disable="showModal"
    />
    <p class="bold end score">Bleeding score: {{ bleedingScore }}%</p>
  </main>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import BleedingRepository from "./repository/BleedingRepository.js";
import AppTitleGroup from "../../components/AppTitleGroup.vue";
import ChartSixSurface from "./components/ChartSixSurface.vue";
import AppNotification from "../../components/AppNotification.vue";
import AppModal from "../../components/AppModal.vue";
import { IconRestore, IconToothOutline } from "@iconify-prerendered/vue-mdi";

const bleedingRepository = BleedingRepository();
const mouth = ref([...bleedingRepository.load()]);

const notification = ref("");
const showNotification = ref(false);
function clearNotification() {
  showNotification.value = false;
}

function updateBleedingChart(newTooth) {
  const newMouth = mouth.value.map((tooth) => {
    if (tooth.number == newTooth.number) {
      tooth = newTooth;
    }
    return tooth;
  });
  mouth.value = bleedingRepository.update(newMouth);
}

function clearBleedingChart() {
  mouth.value = bleedingRepository.clear();
  notification.value = "Bleeding score cleared";
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

const bleedingScore = computed(() => {
  const presentTeeth = mouth.value.filter((tooth) => {
    return tooth.present;
  });
  const numOfTeeth = presentTeeth.length;
  const mouthSurfaces = presentTeeth
    .map((tooth) => {
      return tooth.surfaces;
    })
    .flat();
  const totalBleedingSurfaces = mouthSurfaces.reduce((total, num) => {
    return total + Number(num);
  }, 0);
  return Math.round((totalBleedingSurfaces / (numOfTeeth * 6)) * 100);
});
</script>

<style scoped>
#bleeding-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score {
  background-color: var(--color-surface-el-2);
  border-radius: var(--border-radius-medium);
  padding: 1em;
  font: var(--title-medium);
}
</style>
