<template>
  <!-- <input
        v-for="(surface, key) in surfaces"
        :key="key"
        type="text"
        maxlength="1"
        class="surface-input"
        :class="{ [highlightClass]: surfaces[key] == 1 }"
        :value="surfaces[key]"
        @input="onInput($event, key)"
        @focus="onFocus($event, key)"
        oninput="this.value=this.value.replace(/[^1]/g,'');"
      /> -->

  <div class="tooth" :class="{ 'tooth-blank': !present }">
    <p
      v-if="!labelBottom"
      class="tooth-label"
      @click="$emit('label-click', { index: toothIndex })"
    >
      {{ toothIndex }}
    </p>
    <div v-if="showTooth" class="surfaces surfaces-teeth">
      <input
        v-for="(surface, key) in surfaces.slice(0, 3)"
        :key="key"
        type="text"
        readonly="readonly"
        class="surface-box"
        :class="{
          [highlightClass]: surfaces[key] == 1,
          selected: activeIndex == toothIndex && activeSurface == key,
        }"
        @focus="$emit('surface-click', { index: toothIndex, surface: key })"
      />
      <ChartTooth :index="toothIndex" />
      <input
        v-for="(surface, key) in surfaces.slice(3, 6)"
        :key="key + 3"
        type="text"
        readonly="readonly"
        class="surface-box"
        :class="{
          [highlightClass]: surfaces[key + 3] == 1,
          selected: activeIndex == toothIndex && activeSurface == key + 3,
        }"
        @focus="$emit('surface-click', { index: toothIndex, surface: key + 3 })"
      />
    </div>
    <div v-else class="surfaces">
      <input
        v-for="(surface, key) in surfaces"
        :key="key"
        type="text"
        readonly="readonly"
        class="surface-box"
        :class="{
          [highlightClass]: surfaces[key] == 1,
          selected: activeIndex == toothIndex && activeSurface == key,
        }"
        @focus="$emit('surface-click', { index: toothIndex, surface: key })"
      />
    </div>
    <p
      v-if="labelBottom"
      class="tooth-label"
      @click="$emit('label-click', { index: toothIndex })"
    >
      {{ toothIndex }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ChartTooth from "@/components/ChartTooth.vue";

const props = defineProps({
  tooth: {
    type: Object,
  },
  highlightColor: {
    type: Number,
  },
  labelBottom: {
    type: Boolean,
  },
  activeIndex: {
    type: Number,
  },
  activeSurface: {
    type: Number,
  },
  showTooth: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["surface-click", "label-click"]);

const tooth = computed(() => props.tooth);
const present = computed(() => tooth.value.present);
const toothIndex = computed(() => tooth.value.number);
const surfaces = computed(() => tooth.value.surfaces);

function determineHighlightClass() {
  const code = props.highlightColor;
  if (code === 1) {
    return "highlight-red";
  } else if (code === 2) {
    return "highlight-grey";
  }
}
const highlightClass = determineHighlightClass();
</script>

<style scoped lang="scss">
.tooth {
  display: flex;
  flex-direction: column;
}

.tooth-label {
  align-self: center;
  margin: 0.3rem 0;
  padding: 0.1rem 0.3rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition-standard-short);
  border-radius: 1em;

  &:hover {
    color: var(--color-on-primary);
    background-color: var(--color-primary);
  }
}

.surfaces {
  display: grid;
  grid-template-columns: min-content min-content min-content;
  grid-template-rows: 1fr 1fr;
  border: 2px solid #000;
}

.surfaces-teeth {
  grid-template-rows: min-content min-content min-content;
  grid-row-gap: 0.25em;

  .svg-wrapper {
    grid-column: span 3;
  }
}

.surface-input {
  width: 1.2em;
  height: 1.7em;
  padding: 0.1em;
  border: 1px solid #000;
  margin: -0.4px;
  outline: none;
  text-align: center;
}

.tooth-blank .surface-box:hover {
  border: 1px solid #000;
  cursor: auto;
}

.surface-box {
  height: 2rem;
  width: 1.3rem;
  border: 1px solid #000;
  margin: -0.4px;
  outline: none;

  &:hover {
    border: 2px solid var(--color-outline);
    cursor: pointer;
  }
}

.highlight-red {
  background-color: red;
}

.highlight-grey {
  background-color: #b5a792;
}

.selected {
  border: 3px solid #000 !important;
}

.tooth-blank {
  opacity: 0.7;
}

.tooth-blank .surfaces {
  border-color: #000;
}

.tooth-blank input {
  border-color: #000;
  background-color: #333;
}
</style>
