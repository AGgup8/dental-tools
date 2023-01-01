<template>
  <div
    class="tooth"
    @mouseenter="displayDropdown = true"
    @mouseleave="() => !displayDropdownList && (displayDropdown = false)"
    v-on-click-outside="() => displayingCavityList && changeActiveSurface(null)"
  >
    <ChartTextarea
      v-if="index < 30"
      :text="surfaces.extra"
      @update="updateText"
    />

    <div class="tooth-wrapper">
      <ChartTooth :interactive="true" :index="index" />

      <SymbolDropdownList
        v-show="displayDropdown"
        :class="{ active: isDropdownActive }"
        :show-dropdown-icon="displayDropdown"
        :show-dropdown-list="displayDropdownList"
        @dropdown-click="onDropdownClick"
        @select="updateSymbol"
        v-on-click-outside="() => displayDropdownList && closeDropdown()"
      />

      <CavityDropdownList
        v-show="displayingCavityList"
        @select="updateCavity"
      />
    </div>

    <ChartTextarea
      v-if="index > 30"
      :text="surfaces.extra"
      @update="updateText"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChartStore } from "@/shared-stores/chartStore.js";
import SymbolDropdownList from "./SymbolDropdownList.vue";
import { vOnClickOutside } from "@vueuse/components";
import ChartTextarea from "./ChartTextarea.vue";
import CavityDropdownList from "./CavityDropdownList.vue";
import ChartTooth from "../../../components/ChartTooth.vue";

const store = useChartStore();

const props = defineProps({
  index: {
    type: Number,
  },
});

const isDropdownActive = ref(false);

const displayDropdown = ref(false);
const displayDropdownList = computed(() => {
  if (
    store.activeSurface?.[0] == props.index &&
    store.activeSurface?.[1] == 0
  ) {
    return true;
  }
});
const displayingCavityList = computed(() => {
  if (store.activeSurface?.[0] == props.index && store.activeSurface[1] > 0) {
    return true;
  } else {
    return false;
  }
});

const surfaces = computed(() => {
  return store.chart.find((tooth) => tooth.index == props.index).surfaces;
});

const type = calculateType(props.index);
function calculateType(number) {
  if (number % 10 >= 4) {
    return 1;
  } else {
    return 2;
  }
}

function findActiveSurface() {
  if (store.getActiveTooth == props.index) {
    return Number(store.getActiveSurface);
  }
}

function changeActiveSurface(surface) {
  if (surface == null) {
    store.resetActiveSurface();
  } else {
    if (store.activeSurface?.toString() == [props.index, surface]?.toString()) {
      store.resetActiveSurface();
      if (surface == 0) {
        isDropdownActive.value = false;
      }
    } else {
      store.activeSurface = [props.index, surface];
      if (surface == 0) {
        isDropdownActive.value = true;
      } else {
        isDropdownActive.value = false;
      }
    }
  }
}

function closeDropdown() {
  changeActiveSurface(0);
  displayDropdown.value = false;
}

function onDropdownClick() {
  changeActiveSurface(0);
}

function updateSymbol(symbol) {
  store.updateChart({
    index: props.index,
    surface: store.getActiveSurface,
    value: symbol,
  });
  store.resetActiveSurface();
}

function updateCavity(cavity) {
  store.updateChart({
    index: props.index,
    surface: store.getActiveSurface,
    value: cavity,
  });
  store.resetActiveSurface();
}

function updateText(text) {
  store.updateChart({
    index: props.index,
    surface: 6,
    value: text,
  });
}
</script>

<style lang="scss" scoped>
.tooth {
  --tooth-width: 2rem;
  @media only screen and (min-width: 768px) {
    --tooth-width: 2.5rem;
  }
  @media only screen and (min-width: 992px) {
    --tooth-width: 3rem;
  }
  @media only screen and (min-width: 1100px) {
    --tooth-width: 3.25rem;
  }
  @media only screen and (min-width: 1200px) {
    --tooth-width: 3.75rem;
  }
  @media only screen and (min-width: 1300px) {
    --tooth-width: 4rem;
  }
  @media only screen and (min-width: 1400px) {
    --tooth-width: 4.25rem;
  }
  // @media only screen and (min-width: 1500px) {
  //   --tooth-width: 4.5rem;
  // }

  display: flex;
  flex-direction: column;
  margin: 0 0.1rem;
  align-self: end;
}

.tooth-wrapper {
  display: flex;
  position: relative;
  align-items: flex-end;
}

.tooth-svg {
  width: var(--tooth-width);
  height: var(--tooth-width);
}
</style>
