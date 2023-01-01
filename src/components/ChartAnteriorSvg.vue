<template>
  <svg
    version="1.1"
    viewBox="0 0 55.999915 54.04"
    preserveAspectRatio="none"
    :class="{ interactive: interactive }"
  >
    <defs id="defs7"></defs>

    <g>
      <path
        class="top"
        :class="[{ highlight: topActive }, topCavityFill]"
        @click="interactive ? click(1) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="top"
        d="m 0.49994941,0.5 c 0,0 9.99999959,26.5 9.99999959,26.5 0,0 34.98,0.02 34.98,0.02 0,0 10.02,-26.52 10.02,-26.52 0,0 -54.99999959,0 -54.99999959,0 z"
        style="stroke-linecap: round; stroke-linejoin: round"
      ></path>
    </g>

    <g>
      <path
        class="bottom"
        :class="[{ highlight: bottomActive }, bottomCavityFill]"
        @click="interactive ? click(3) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="bottom"
        d="m 0.49994911,53.54 9.99999989,-26.5 34.98,-0.02 10.02,26.52 z"
        sodipodi:nodetypes="ccccc"
        style="stroke-linecap: round; stroke-linejoin: round"
      ></path>
    </g>

    <g>
      <path
        class="left"
        :class="[{ highlight: leftActive }, leftCavityFill]"
        @click="interactive ? click(4) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="left"
        d="M 0.49994911,53.54 10.499949,27.04 0.49994941,0.5 Z"
        sodipodi:nodetypes="cccc"
        style="stroke-linecap: round; stroke-linejoin: round"
      ></path>
    </g>

    <g>
      <path
        class="right"
        :class="[{ highlight: rightActive }, rightCavityFill]"
        @click="interactive ? click(2) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="right"
        d="m 55.499949,53.54 -10.02,-26.52 10.02,-26.52 z"
        style="stroke-linecap: round; stroke-linejoin: round"
        sodipodi:nodetypes="cccc"
      ></path>
    </g>
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  activeSurface: {
    type: Number,
  },
  surfaces: {
    type: Object,
  },
  interactive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["surface-click"]);

const topActive = computed(() => (props.activeSurface == 1 ? true : false));
const rightActive = computed(() => (props.activeSurface == 2 ? true : false));
const bottomActive = computed(() => (props.activeSurface == 3 ? true : false));
const leftActive = computed(() => (props.activeSurface == 4 ? true : false));

function cavityClassAdapter(type) {
  if (type == "amalgam") {
    return "amalgam-fill";
  } else if (type == "caries") {
    return "caries-fill";
  } else if (type == "composite") {
    return "composite-fill";
  } else if (type == "GIC") {
    return "gic-fill";
  } else if (type == "temporary") {
    return "temporary-fill";
  }
}

const topCavityFill = computed(() => cavityClassAdapter(props.surfaces.top));
const rightCavityFill = computed(() =>
  cavityClassAdapter(props.surfaces.right)
);
const bottomCavityFill = computed(() =>
  cavityClassAdapter(props.surfaces.bottom)
);
const leftCavityFill = computed(() => cavityClassAdapter(props.surfaces.left));

function click(surfaceNum) {
  emit("surface-click", surfaceNum);
}
</script>

<style scoped lang="scss">
svg {
  display: block;
  position: relative;
}

.bottom,
.top,
.right,
.left,
.occlusal {
  fill: rgba(255, 255, 255, 0.5);
}

.interactive {
  .bottom,
  .top,
  .right,
  .left,
  .occlusal {
    cursor: pointer;
  }

  .bottom:hover,
  .top:hover,
  .right:hover,
  .left:hover,
  .occlusal:hover {
    stroke-width: 2;
    pointer-events: all;
  }
}

.highlight {
  fill: var(--color-secondary) !important;
}

.caries-fill {
  fill: #c0514d;
  fill-opacity: 0.8;
}

.amalgam-fill {
  fill: #a6a6a6;
  fill-opacity: 0.8;
}

.composite-fill {
  fill: #ffff00;
  fill-opacity: 0.8;
}

.gic-fill {
  fill: #92d050;
  fill-opacity: 0.8;
}

.temporary-fill {
  fill: #7030a0;
  fill-opacity: 0.8;
}
</style>
