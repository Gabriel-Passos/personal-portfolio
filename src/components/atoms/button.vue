<script setup lang="ts">
import { type ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: "contained" | "outlined" | "ghost" | "link";
}

defineProps<Props>();
</script>

<template>
  <button
    :class="[
      'btn font-cormorant-garamond font-semibold',
      variant && `btn-${variant}`,
    ]"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 4px;
}
.btn-contained {
  background-color: var(--color-accent-400);
  color: var(--color-white);
  &:hover {
    filter: brightness(0.9);
  }
}
.btn-outlined {
  border: 1px solid var(--color-accent-400);
  background-color: transparent;
  color: var(--color-accent-400);
  &:hover {
    background-color: color-mix(
      in srgb,
      var(--color-accent-400) 10%,
      transparent
    );
  }
}
.btn-ghost {
  background-color: transparent;
  color: var(--color-accent-400);
  &:hover {
    background-color: color-mix(
      in srgb,
      var(--color-accent-400) 10%,
      transparent
    );
  }
}
.btn-link {
  background-color: transparent;
  color: var(--color-accent-400);
  &:hover {
    text-decoration: underline;
  }
}
</style>
