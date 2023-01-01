<template>
  <div class="title-group">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.title-group {
  display: flex;
  align-items: center;
  position: relative;
}

:slotted(.title) {
  font: var(--title-large);
  margin: 1.5em;
  text-align: center;

  @media only screen and (max-width: 992px) {
    margin: 1em;
  }
}

:slotted(.btn) {
  display: flex;
  align-items: center;
  margin-right: 0.5em;

  img {
    max-height: 1em;
  }
}
</style>
