<script setup lang="ts">
interface SubtitleProps {
  text: string;
}

const props = defineProps<SubtitleProps>();
</script>

<template>
  <h2
    class="font-cormorant-garamond font-semibold text-3xl text-stone-100 dark:text-stone-800"
  >
    {{ props.text }}
  </h2>
</template>
