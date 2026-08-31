<script setup lang="ts">
import Separator from "../atoms/separator.vue";

interface ProfessionalExpItemProps {
  title: string;
  company: string;
  hire_year: string;
  layoff_year: string;
  description: string;
}

const props = defineProps<ProfessionalExpItemProps>();
</script>

<template>
  <Separator />

  <div
    class="flex items-center justify-between py-6 gap-6 flex-col sm:flex-row sm:gap-0"
  >
    <div class="flex flex-col gap-1 w-full sm:w-1/3">
      <span
        class="font-cormorant-garamond text-lg font-semibold text-stone-100 dark:text-stone-800"
      >
        {{ props.title }}
      </span>
      <span class="font-lora text-base text-accent-300">
        {{ props.company }}
      </span>
      <span class="font-lora text-sm text-stone-400">
        {{ props.hire_year }} - {{ props.layoff_year }}
      </span>
    </div>

    <span class="font-lora text-base text-stone-400 w-full sm:w-4/6">
      {{ props.description }}
    </span>
  </div>
</template>
