<template>
  <div class="svg-wrapper">
    <img v-if="symbol" class="symbol" :src="'/src/assets/chart/' + symbol" />

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

const symbol = computed(() => {
  if (surfaces.value.whole == 1) {
    return null;
  } else {
    if (surfaces.value.whole == 0) {
      return "missing-line.svg";
    } else if (surfaces.value.whole == "A") {
      return "artificial-tooth.svg";
    } else if (surfaces.value.whole == "BA") {
      return "bridge-abutment.svg";
    } else if (surfaces.value.whole == "BP") {
      return "bridge-pontic.svg";
    } else if (surfaces.value.whole == "CR") {
      return "crown.svg";
    } else if (surfaces.value.whole == "FS") {
      return "fissure-sealant.svg";
    } else if (surfaces.value.whole == "F") {
      return "fracture.svg";
    } else if (surfaces.value.whole == "FGC") {
      return "full-gold-crown.svg";
    } else if (surfaces.value.whole == "FMC") {
      return "full-metal-crown.svg";
    } else if (surfaces.value.whole == "IMP") {
      return "implant.svg";
    } else if (surfaces.value.whole == "PE") {
      return "partially-erupted.svg";
    } else if (surfaces.value.whole == "PBC") {
      return "porcelain-bonded-crown.svg";
    } else if (surfaces.value.whole == "PJC") {
      return "porcelain-jacket-crown.svg";
    } else if (surfaces.value.whole == "PV") {
      return "porcelain-veneer.svg";
    } else if (surfaces.value.whole == "SR") {
      return "preventative-resin-restoration.svg";
    } else if (surfaces.value.whole == "RE") {
      return "recently-extracted.svg";
    } else if (surfaces.value.whole == "RC") {
      return "retained-c.svg";
    } else if (surfaces.value.whole == "SC") {
      return "space-closed.svg";
    } else if (
      surfaces.value.whole == "RM" &&
      (props.index < 20 || props.index > 40)
    ) {
      return "rotated-right-arrow.svg";
    } else if (
      surfaces.value.whole == "RM" &&
      props.index > 20 &&
      props.index < 40
    ) {
      return "rotated-left-arrow.svg";
    } else if (
      surfaces.value.whole == "RD" &&
      (props.index < 20 || props.index > 40)
    ) {
      return "rotated-left-arrow.svg";
    } else if (
      surfaces.value.whole == "RD" &&
      props.index > 20 &&
      props.index < 40
    ) {
      return "rotated-right-arrow.svg";
    } else if (surfaces.value.whole == "IN" && props.index < 30) {
      return "standing-arrow-down.svg";
    } else if (surfaces.value.whole == "IN" && props.index > 30) {
      return "standing-arrow-up.svg";
    } else if (surfaces.value.whole == "OUT" && props.index < 30) {
      return "standing-arrow-up.svg";
    } else if (surfaces.value.whole == "OUT" && props.index > 30) {
      return "standing-arrow-down.svg";
    }
  }
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
</style>
