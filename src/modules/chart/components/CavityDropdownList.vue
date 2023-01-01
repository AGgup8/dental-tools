<template>
  <div class="cavity-dropdown-list">
    <p @click="$emit('select', 0)">None</p>
    <p @click="$emit('select', 'amalgam')">Amalgam</p>
    <p @click="$emit('select', 'caries')">Caries</p>
    <p @click="$emit('select', 'composite')">Composite</p>
    <p @click="$emit('select', 'GIC')">GIC</p>
    <p @click="$emit('select', 'temporary')">Temporary</p>
  </div>
</template>

<script setup>
const emits = defineEmits(["select"]);
</script>

<style lang="scss" scoped>
.cavity-dropdown-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  position: absolute;
  top: calc(var(--tooth-width) + 1px);
  z-index: 3;

  border-radius: var(--border-radius-extra-small);
  background-color: var(--color-secondary);
  overflow-y: auto;
  padding: 0.25rem;

  color: #fff;
  white-space: nowrap;

  p {
    margin: 0;
    padding: 0.5rem 0.5rem;
    font-size: 0.6rem;
    border-radius: var(--border-radius-extra-small);
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

#lower-left-quadrant {
  .cavity-dropdown-list {
    right: 0;
  }
}
</style>
