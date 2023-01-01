<script setup>
import { watch, toRef } from "vue";

const props = defineProps({
  notification: {
    type: String,
  },
  show: {
    type: Boolean,
    required: true,
  },
  onEnd: {
    type: Function,
  },
});

const notification = toRef(props, "notification");
const show = toRef(props, "show");
watch(show, (newValue) => {
  if (newValue) {
    // if notificationhas just been shown
    setTimeout(() => {
      props.onEnd();
    }, 5000);
  }
});
</script>

<template>
  <Teleport to="body">
    <p v-if="show" class="notification">{{ notification }}</p>
  </Teleport>
</template>

<style scoped>
.fade-leave-active {
  transition: 1s ease;
}

.fade-leave-to {
  opacity: 0;
}

.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  font: 600 0.9em var(--font-default);
  color: var(--color-surface);
  position: fixed;
  bottom: 1.5em;
  right: 1.5em;
  border-radius: var(--border-radius-extra-small);
  background: #444;
  width: 16em;
  min-height: 3em;
}
</style>
