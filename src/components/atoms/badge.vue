<script setup lang="ts">
interface BadgeProps {
  text: string;
  variant?: "outlined";
}

const props = defineProps<BadgeProps>();

const baseStyles = "font-lora text-xs font-medium px-2 py-0.5";

function getStylesByVariant() {
  switch (props.variant) {
    case "outlined": {
      return `${baseStyles} text-accent-400 border rounded border-accent-400`;
    }
    default: {
      return `${baseStyles} text-stone-300 dark:text-stone-600 bg-stone-800 dark:bg-stone-50`;
    }
  }
}
</script>

<template>
  <span :class="getStylesByVariant()">
    {{ props.text }}
  </span>
</template>
