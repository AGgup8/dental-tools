<template>
  <Teleport to="body">
    <div class="modal-wrapper">
      <div class="modal" :class="{ 'text-left': textLeft }" ref="modal">
        <section class="modal-header">
          <slot name="header">Default header</slot>
        </section>
        <section class="modal-body">
          <slot name="body">Default body</slot>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["outside-click"]);

const props = defineProps({
  textLeft: Boolean,
});

function outsideClick() {
  emit("outside-click");
}

const modal = ref();
onClickOutside(modal, () => outsideClick());
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 15%;
  width: 70%;
  max-height: 60%;
  padding: 2.5em 3em;
  overflow: auto;
  text-align: center;

  display: flex;
  flex-direction: column;

  background-color: var(--color-surface-variant);
  border-radius: var(--border-radius-medium);

  &.text-left {
    text-align: left;
  }

  @media screen and (min-width: 992px) {
    left: 20%;
    width: 60%;
  }

  @media screen and (min-width: 1200px) {
    left: 25%;
    width: 50%;
  }
}

.modal-header {
  margin-bottom: 0.5em;
  font-weight: 600;

  :slotted(h2) {
    font-weight: 600;
    margin: 0;
    text-align: center;
  }
}

.modal-body {
  :slotted(.btn) {
    margin-right: 0.5em;
  }

  :slotted(h2) {
    margin-bottom: 0;
    font-weight: 600;
  }

  :slotted(h3) {
    margin-bottom: 0;
    font-weight: 600;
  }

  :slotted(p) {
    font-size: 0.9em;
  }

  :slotted(ul) {
    padding-left: 1.5em;
    list-style-type: disc;
  }

  :slotted(li) {
    font-size: 0.9em;
  }
}
</style>
