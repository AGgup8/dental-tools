<template>
  <svg
    version="1.1"
    viewBox="0 0 56.000002 54.890002"
    preserveAspectRatio="none"
    :class="{ interactive: interactive }"
  >
    <defs id="defs7" />

    <g>
      <path
        class="bottom"
        :class="[{ highlight: bottomActive }, bottomCavityFill]"
        @click="interactive ? click(3) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="bottom"
        d="m 10.51,45.44 c 0,0 -10.01000003,9 -10.01000003,9 0,0 55.00000003,0 55.00000003,0 0,0 -10,-9 -10,-9 0,0 -34.99,0 -34.99,0 z"
        style="
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
        "
      />
    </g>

    <g>
      <path
        class="top"
        :class="[{ highlight: topActive }, topCavityFill]"
        @click="interactive ? click(1) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="top"
        d="m 10.52,9.45 c 0,0 -10.01000003,-9.00000001 -10.01000003,-9.00000001 0,0 55.00000003,0 55.00000003,0 0,0 -10,9.00000001 -10,9.00000001 0,0 -34.99,0 -34.99,0 z"
        style="
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
        "
      />
    </g>

    <g>
      <path
        class="right"
        :class="[{ highlight: rightActive }, rightCavityFill]"
        @click="interactive ? click(2) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="right"
        d="m 55.48,0.45999899 c 0,0 0.02,53.98000101 0.02,53.98000101 0,0 -10.01,-9 -10.01,-9 0,0 0.02,-35.99 0.02,-35.99 0,0 9.97,-8.99000101 9.97,-8.99000101 z"
        style="
          stroke-linecap: round;
          stroke-linejoin: bevel;
          paint-order: normal;
        "
      />
    </g>

    <g>
      <path
        class="left"
        :class="[{ highlight: leftActive }, leftCavityFill]"
        @click="interactive ? click(4) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="left"
        d="m 0.51999997,0.45999899 c 0,0 -0.02,53.98000101 -0.02,53.98000101 0,0 10.01000003,-9 10.01000003,-9 0,0 -0.02,-35.99 -0.02,-35.99 0,0 -9.97000003,-8.99000101 -9.97000003,-8.99000101 z"
        style="stroke-linecap: round; stroke-linejoin: bevel"
      />
    </g>

    <g>
      <path
        class="occlusal"
        :class="[{ highlight: occlusalActive }, occlusalCavityFill]"
        @click="interactive ? click(5) : ''"
        stroke="#000000"
        stroke-width="1"
        data-surface="occlusal"
        d="M 45.51,9.449999 45.49,45.44 H 10.51 L 10.49,9.449999 Z"
        style="stroke-linecap: round; stroke-linejoin: round"
        sodipodi:nodetypes="ccccc"
      />
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
const occlusalActive = computed(() =>
  props.activeSurface == 5 ? true : false
);

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
const occlusalCavityFill = computed(() =>
  cavityClassAdapter(props.surfaces.occlusal)
);
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
