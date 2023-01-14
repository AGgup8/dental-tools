<template>
  <div class="chart-layout">
    <div class="quadrant-layout">
      <ToothSingle
        v-for="tooth in upperRightQuadrant"
        :key="tooth.number"
        :tooth="tooth"
        :present="tooth.present"
        :highlightColor="highlightColor"
        :activeIndex="activeIndex"
        :activeSurface="activeSurface"
        :show-tooth="showTeeth"
        @surface-click="(payload) => selectSurface(payload)"
        @label-click="(payload) => blankTooth(payload)"
      />
    </div>
    <div class="quadrant-layout">
      <ToothSingle
        v-for="tooth in upperLeftQuadrant"
        :key="tooth.number"
        :tooth="tooth"
        :present="tooth.present"
        :highlightColor="highlightColor"
        :activeIndex="activeIndex"
        :activeSurface="activeSurface"
        :show-tooth="showTeeth"
        @surface-click="(payload) => selectSurface(payload)"
        @label-click="(payload) => blankTooth(payload)"
      />
    </div>
    <div class="quadrant-layout">
      <ToothSingle
        v-for="tooth in lowerRightQuadrant"
        :key="tooth.number"
        :tooth="tooth"
        :present="tooth.present"
        :highlightColor="highlightColor"
        :activeIndex="activeIndex"
        :activeSurface="activeSurface"
        :show-tooth="showTeeth"
        :label-bottom="true"
        @surface-click="(payload) => selectSurface(payload)"
        @label-click="(payload) => blankTooth(payload)"
      />
    </div>
    <div class="quadrant-layout">
      <ToothSingle
        v-for="tooth in lowerLeftQuadrant"
        :key="tooth.number"
        :tooth="tooth"
        :present="tooth.present"
        :highlightColor="highlightColor"
        :activeIndex="activeIndex"
        :activeSurface="activeSurface"
        :show-tooth="showTeeth"
        :label-bottom="true"
        @surface-click="(payload) => selectSurface(payload)"
        @label-click="(payload) => blankTooth(payload)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ToothSingle from "./ToothSingle.vue";
import { onKeyStroke } from "@vueuse/core";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  highlightColor: {
    type: Number,
  },
  onUpdate: {
    type: Function,
  },
  showTeeth: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

const chart = computed(() => {
  return props.data;
});
const upperRightQuadrant = computed(() => {
  return chart.value.filter((tooth) => {
    return tooth.number >= 11 && tooth.number <= 18;
  });
});
const upperLeftQuadrant = computed(() => {
  return chart.value.filter((tooth) => {
    return tooth.number >= 21 && tooth.number <= 28;
  });
});
const lowerLeftQuadrant = computed(() => {
  return chart.value.filter((tooth) => {
    return tooth.number >= 31 && tooth.number <= 38;
  });
});
const lowerRightQuadrant = computed(() => {
  return chart.value.filter((tooth) => {
    return tooth.number >= 41 && tooth.number <= 48;
  });
});

const activeIndex = ref(18);
const activeSurface = ref(0);
function selectSurface({ index, surface }) {
  const toothToSelect = chart.value.find((tooth) => tooth.number == index);
  if (toothToSelect.present) {
    activeIndex.value = index;
    activeSurface.value = surface;
  }
}

function blankTooth({ index }) {
  const toothToBlank = chart.value.find((tooth) => tooth.number == index);
  const editedTooth = JSON.parse(JSON.stringify(toothToBlank));
  if (toothToBlank.present) {
    editedTooth.present = false;
  } else {
    editedTooth.present = true;
  }
  props.onUpdate(editedTooth);
}

onKeyStroke(["0", "Delete", "Backspace"], (e) => {
  if (!props.disable) {
    // find active tooth by filtering toothData
    const activeTooth = chart.value.filter(
      (tooth) => tooth.number == activeIndex.value
    )[0];

    // edit tooth surface
    const editedTooth = JSON.parse(JSON.stringify(activeTooth));
    editedTooth.surfaces[activeSurface.value] = 0;

    // send edited tooth to update function
    props.onUpdate(editedTooth);
  }
});

onKeyStroke(["1", "Enter"], (e) => {
  if (!props.disable) {
    // find active tooth by filtering toothData
    const activeTooth = props.data.filter(
      (tooth) => tooth.number == activeIndex.value
    )[0];

    // edit tooth surface
    const editedTooth = JSON.parse(JSON.stringify(activeTooth));
    editedTooth.surfaces[activeSurface.value] = 1;

    // send edited tooth to update function
    props.onUpdate(editedTooth);
  }
});

function setUpArrowKeyListeners() {
  onKeyStroke(["ArrowDown"], (e) => {
    if (activeSurface.value == 0) {
      activeSurface.value = 3;
    } else if (activeSurface.value == 1) {
      activeSurface.value = 4;
    } else if (activeSurface.value == 2) {
      activeSurface.value = 5;
    }
  });

  onKeyStroke(["ArrowUp"], (e) => {
    if (activeSurface.value == 3) {
      activeSurface.value = 0;
    } else if (activeSurface.value == 4) {
      activeSurface.value = 1;
    } else if (activeSurface.value == 5) {
      activeSurface.value = 2;
    }
  });

  onKeyStroke(["ArrowRight"], (e) => {
    switch (activeSurface.value) {
      case 0:
        activeSurface.value = 1;
        break;
      case 1:
        activeSurface.value = 2;
        break;
      case 2:
        if (
          (activeIndex.value <= 18 && activeIndex.value > 11) ||
          (activeIndex.value <= 48 && activeIndex.value > 41)
        ) {
          activeIndex.value--;
          activeSurface.value = 0;
        } else if (
          (activeIndex.value >= 21 && activeIndex.value < 28) ||
          (activeIndex.value >= 31 && activeIndex.value < 38)
        ) {
          activeIndex.value++;
          activeSurface.value = 0;
        } else if (activeIndex.value == 11) {
          activeIndex.value = 21;
          activeSurface.value = 0;
        } else if (activeIndex.value == 41) {
          activeIndex.value = 31;
          activeSurface.value = 0;
        }
        break;
      case 3:
        activeSurface.value = 4;
        break;
      case 4:
        activeSurface.value = 5;
        break;
      case 5:
        if (
          (activeIndex.value <= 18 && activeIndex.value > 11) ||
          (activeIndex.value <= 48 && activeIndex.value > 41)
        ) {
          activeIndex.value--;
          activeSurface.value = 3;
        } else if (
          (activeIndex.value >= 21 && activeIndex.value < 28) ||
          (activeIndex.value >= 31 && activeIndex.value < 38)
        ) {
          activeIndex.value++;
          activeSurface.value = 3;
        } else if (activeIndex.value == 11) {
          activeIndex.value = 21;
          activeSurface.value = 3;
        } else if (activeIndex.value == 41) {
          activeIndex.value = 31;
          activeSurface.value = 3;
        }
        break;
    }
  });

  onKeyStroke(["ArrowLeft"], (e) => {
    switch (activeSurface.value) {
      case 5:
        activeSurface.value = 4;
        break;
      case 4:
        activeSurface.value = 3;
        break;
      case 3:
        if (
          (activeIndex.value < 18 && activeIndex.value >= 11) ||
          (activeIndex.value < 48 && activeIndex.value >= 41)
        ) {
          activeIndex.value++;
          activeSurface.value = 5;
        } else if (
          (activeIndex.value > 21 && activeIndex.value <= 28) ||
          (activeIndex.value > 31 && activeIndex.value <= 38)
        ) {
          activeIndex.value--;
          activeSurface.value = 5;
        } else if (activeIndex.value == 21) {
          activeIndex.value = 11;
          activeSurface.value = 5;
        } else if (activeIndex.value == 31) {
          activeIndex.value = 41;
          activeSurface.value = 5;
        }
        break;
      case 2:
        activeSurface.value = 1;
        break;
      case 1:
        activeSurface.value = 0;
        break;
      case 0:
        if (
          (activeIndex.value < 18 && activeIndex.value >= 11) ||
          (activeIndex.value < 48 && activeIndex.value >= 41)
        ) {
          activeIndex.value++;
          activeSurface.value = 2;
        } else if (
          (activeIndex.value > 21 && activeIndex.value <= 28) ||
          (activeIndex.value > 31 && activeIndex.value <= 38)
        ) {
          activeIndex.value--;
          activeSurface.value = 2;
        } else if (activeIndex.value == 21) {
          activeIndex.value = 11;
          activeSurface.value = 2;
        } else if (activeIndex.value == 31) {
          activeIndex.value = 41;
          activeSurface.value = 2;
        }
        break;
    }
  });
}

setUpArrowKeyListeners();
</script>

<style scoped>
.chart-layout {
  display: grid;
  grid-gap: 2rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.quadrant-layout {
  display: grid;
  grid-gap: 0.1rem;
  grid-template-columns: repeat(8, 1fr);
}
</style>
