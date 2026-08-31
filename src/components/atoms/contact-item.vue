<script setup lang="ts">
import Separator from "./separator.vue";

interface ContactItemProps {
  label: string;
  value: string;
  href?: string;
}

const props = defineProps<ContactItemProps>();
</script>

<template>
  <Separator />
  <div class="flex items-center justify-between px-1 py-4">
    <span class="font-lora text-sm text-stone-400 uppercase tracking-wide">
      {{ props.label }}
    </span>
    <a
      v-if="props.href"
      :href="props.href"
      target="_blank"
      rel="noopener noreferrer"
      class="font-cormorant-garamond text-base font-medium text-stone-100 dark:text-stone-800 hover:underline hover:text-accent-400"
    >
      {{ props.value }}
    </a>
    <span
      v-else
      class="font-cormorant-garamond text-base font-medium text-stone-100 dark:text-stone-800"
    >
      {{ props.value }}
    </span>
  </div>
</template>
