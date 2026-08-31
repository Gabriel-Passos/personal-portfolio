<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue";
import Button from "./button.vue";

interface TextHighlightProps {
  text: string;
  onBack?: () => void;
}

const props = defineProps<TextHighlightProps>();
</script>

<template>
  <div>
    <Button
      v-if="props.onBack"
      v-on:click="props.onBack"
      variant="link"
      class="flex items-center gap-2 uppercase px-0! font-normal! text-sm!"
    >
      <ArrowLeft :size="16" /> {{ props.text }}
    </Button>
    <p
      v-else
      class="font-cormorant-garamond text-accent-300 uppercase text-sm tracking-wider"
    >
      {{ props.text }}
    </p>
  </div>
</template>
