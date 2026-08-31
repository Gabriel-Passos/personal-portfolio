```vue
<script setup lang="ts">
import { computed } from "vue";

interface SeparatorProps {
  orientation?: "vertical" | "horizontal";
}

const props = defineProps<SeparatorProps>();

const separatorClasses = computed(() => {
  if (props.orientation === "vertical") {
    return "w-px h-full border-0 bg-stone-700 dark:bg-stone-300";
  }

  return "w-full h-px border-0 bg-stone-700 dark:bg-stone-300";
});
</script>

<template>
  <div :class="separatorClasses" />
</template>
```
