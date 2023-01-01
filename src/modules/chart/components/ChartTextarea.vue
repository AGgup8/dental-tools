<template>
  <textarea
    class="extra-text"
    spellcheck="false"
    ref="input"
    :value="text"
    @input="$emit('update', $event.target.value)"
  ></textarea>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "None",
  },
});

const emit = defineEmits(["update"]);

const input = ref();
onMounted(() => {
  input.value.style.height = "auto";
  input.value.style.height = `${input.value.scrollHeight}px`;
});

watch(
  () => props.text,
  (newText) => {
    if (newText.length == 0) {
      input.value.style.height = "40px";
    } else {
      input.value.style.height = "auto";
      input.value.style.height = `${input.value.scrollHeight}px`;
    }
  }
);
</script>

<style lang="scss" scoped>
.extra-text {
  min-height: 45px;
  width: var(--tooth-width);

  margin: 0.3rem 0 0.3rem;
  padding: 0.15rem;
  box-sizing: border-box;
  border-radius: var(--border-radius-extra-small);
  border: 1px solid var(--color-outline);

  font-family: Helvetica, Arial, sans-serif;
  font-size: 0.5rem;
  line-height: 1.3;

  overflow-y: hidden;
  resize: none;

  @media only screen and (min-width: 768px) {
    padding: 0.15rem 0.15rem 0.3rem 0.15rem;
    font-size: 0.6rem;
  }

  @media only screen and (min-width: 992px) {
    font-size: 0.65rem;
    line-height: 1.4;
  }

  @media only screen and (min-width: 1200px) {
    padding: 0.2rem 0.2rem 0.3rem 0.2rem;
    font-size: 0.8rem;
  }
}
</style>
