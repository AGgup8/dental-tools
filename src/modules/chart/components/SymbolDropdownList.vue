<template>
  <div class="symbol-dropdown">
    <img
      class="symbol-arrow"
      src="../assets/arrow-down.svg"
      alt="dropdown arrow"
      @click="$emit('dropdown-click')"
    />
    <div v-show="showDropdownList" class="symbol-dropdown-list">
      <p v-for="option in options" @click="$emit('select', option[1])">
        {{ option[0] }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showDropdownIcon: {
    type: Boolean,
    default: false,
  },
  showDropdownList: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["dropdown-click", "select"]);

const options = [
  ["None", "1"],
  ["Missing", "0"],
  ["Artificial Tooth", "A"],
  ["Bridge Abutment", "BA"],
  ["Bridge Pontic", "BP"],
  ["Crown", "CR"],
  ["Fissure Sealant", "FS"],
  ["Fractured", "F"],
  ["Full Gold crown", "FGC"],
  ["Full Metal Crown", "FMC"],
  ["Implant", "IMP"],
  ["Instanding", "IN"],
  ["Outstanding", "OUT"],
  ["Partially Erupted", "PE"],
  ["Porcelain Bonded Crown", "PBC"],
  ["Porcelain jacket Crown", "PJC"],
  ["Sealant Restoration", "SR"],
  ["Porcelain Veneer", "PV"],
  ["Recently Extracted", "RE"],
  ["Retained C", "RC"],
  ["Rotated Mesially", "RM"],
  ["Rotated Distally", "RD"],
  ["Spaced Closed", "SC"],
];
</script>

<style lang="scss" scoped>
.symbol-dropdown {
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 0;
  z-index: 2;
  margin: calc(var(--tooth-width) / 16);

  background-color: var(--color-secondary);
  border: solid 1px var(--color-outline);
  border-radius: var(--border-radius-extra-small);

  &.active {
    z-index: 3;
  }
}

.symbol-arrow {
  display: flex;
  width: calc(var(--tooth-width) / 3);
}

#upper-left-quadrant,
#lower-left-quadrant {
  .symbol-dropdown {
    right: 0;
  }

  .symbol-arrow {
    align-self: flex-end;
  }
}

.symbol-dropdown-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.2rem;

  max-height: 15rem;
  width: 14rem;
  z-index: 2;

  padding: 0.25rem;
  border-top: solid 1px #fff;
  overflow-y: auto;

  color: var(--color-on-secondary);

  p {
    margin: 0;
    padding: 0.4rem;
    border-radius: var(--border-radius);

    font-size: 0.65rem;
    line-height: 1.15;

    &:hover {
      background-color: var(--color-secondary-hover);
      color: var(--color-on-secondary);
      cursor: pointer;
    }

    @media only screen and (min-width: 992px) {
      font-size: 0.75rem;
    }
  }
}
</style>
