<template>
  <div class="svg-wrapper" :class="{ 'tooth-interactive': interactive }">
    <img v-if="isSymbolPresent" class="symbol" :src="symbolUrl" />

    <ChartPosteriorSvg
      v-if="type == 1"
      class="tooth-svg"
      :surfaces="surfaces"
      :interactive="interactive"
      :active-surface="activeSurface"
      @surface-click="(num) => changeActiveSurface(num)"
    />

    <ChartAnteriorSvg
      v-if="type == 2"
      class="tooth-svg"
      :surfaces="surfaces"
      :interactive="interactive"
      :active-surface="activeSurface"
      @surface-click="(num) => changeActiveSurface(num)"
    />
  </div>
</template>

<script setup>
import ChartPosteriorSvg from "./ChartPosteriorSvg.vue";
import ChartAnteriorSvg from "./ChartAnteriorSvg.vue";
import { computed } from "vue";
import { useChartStore } from "@/shared-stores/chartStore.js";

const store = useChartStore();

const props = defineProps({
  index: {
    type: Number,
  },
  interactive: {
    type: Boolean,
    default: false,
  },
});

const surfaces = computed(() => store.getTooth(props.index).surfaces);

const activeSurface = computed(() => {
  if (store.getActiveTooth == props.index) {
    return Number(store.getActiveSurface);
  }
});

function changeActiveSurface(surface) {
  if (props.interactive) {
    if (surface == null) {
      store.resetActiveSurface();
    } else {
      if (
        store.activeSurface?.toString() == [props.index, surface]?.toString()
      ) {
        store.resetActiveSurface();
      } else {
        store.activeSurface = [props.index, surface];
      }
    }
  }
}

const calculateType = (number) => (number % 10 >= 4 ? 1 : 2);
const type = calculateType(props.index);

const isSymbolPresent = computed(() => {
  if (surfaces.value.whole == 1) {
    return false;
  } else {
    return true;
  }
});
const symbolUrl = computed(() => {
  let name = "";
  if (surfaces.value.whole == 0) {
    name = "missing-line.svg";
  } else if (surfaces.value.whole == "A") {
    name = "artificial-tooth.svg";
  } else if (surfaces.value.whole == "BA") {
    name = "bridge-abutment.svg";
  } else if (surfaces.value.whole == "BP") {
    name = "bridge-pontic.svg";
  } else if (surfaces.value.whole == "CR") {
    name = "crown.svg";
  } else if (surfaces.value.whole == "FS") {
    name = "fissure-sealant.svg";
  } else if (surfaces.value.whole == "F") {
    name = "fracture.svg";
  } else if (surfaces.value.whole == "FGC") {
    name = "full-gold-crown.svg";
  } else if (surfaces.value.whole == "FMC") {
    name = "full-metal-crown.svg";
  } else if (surfaces.value.whole == "IMP") {
    name = "implant.svg";
  } else if (surfaces.value.whole == "PE") {
    name = "partially-erupted.svg";
  } else if (surfaces.value.whole == "PBC") {
    name = "porcelain-bonded-crown.svg";
  } else if (surfaces.value.whole == "PJC") {
    name = "porcelain-jacket-crown.svg";
  } else if (surfaces.value.whole == "PV") {
    name = "porcelain-veneer.svg";
  } else if (surfaces.value.whole == "SR") {
    name = "preventative-resin-restoration.svg";
  } else if (surfaces.value.whole == "RE") {
    name = "recently-extracted.svg";
  } else if (surfaces.value.whole == "RC") {
    name = "retained-c.svg";
  } else if (surfaces.value.whole == "SC") {
    name = "space-closed.svg";
  } else if (
    surfaces.value.whole == "RM" &&
    (props.index < 20 || props.index > 40)
  ) {
    name = "rotated-right-arrow.svg";
  } else if (
    surfaces.value.whole == "RM" &&
    props.index > 20 &&
    props.index < 40
  ) {
    name = "rotated-left-arrow.svg";
  } else if (
    surfaces.value.whole == "RD" &&
    (props.index < 20 || props.index > 40)
  ) {
    name = "rotated-left-arrow.svg";
  } else if (
    surfaces.value.whole == "RD" &&
    props.index > 20 &&
    props.index < 40
  ) {
    name = "rotated-right-arrow.svg";
  } else if (surfaces.value.whole == "IN" && props.index < 30) {
    name = "standing-arrow-down.svg";
  } else if (surfaces.value.whole == "IN" && props.index > 30) {
    name = "standing-arrow-up.svg";
  } else if (surfaces.value.whole == "OUT" && props.index < 30) {
    name = "standing-arrow-up.svg";
  } else if (surfaces.value.whole == "OUT" && props.index > 30) {
    name = "standing-arrow-down.svg";
  }

  return new URL(`../assets/chart/${name}`, import.meta.url).href;
});
</script>

<style lang="scss" scoped>
.svg-wrapper {
  position: relative;

  width: var(--tooth-width);
  height: var(--tooth-width);
}

.symbol {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.tooth-interactive:hover {
  .symbol {
    z-index: 0;
  }
}
</style>
