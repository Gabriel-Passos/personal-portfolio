<script setup lang="ts">
import { type InputHTMLAttributes } from "vue";

defineOptions({ inheritAttrs: false });

interface InputProps extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  textarea?: boolean;
}

const props = defineProps<InputProps>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="props.label"
      :for="`input-${props.label}`"
      class="font-lora text-sm text-stone-100 dark:text-stone-800"
    >
      {{ props.label }}
    </label>
    <textarea
      v-if="props.textarea"
      :name="`input-${props.label}`"
      :id="`input-${props.label}`"
      class="border rounded px-2.5 py-1.5 text-stone-100 dark:text-stone-800 border-stone-700 dark:border-stone-300 placeholder:text-stone-600 dark:placeholder:text-stone-400"
      rows="5"
      v-bind="$attrs"
    />
    <input
      v-else
      :id="`input-${props.label}`"
      class="border rounded px-2.5 py-1.5 text-stone-100 dark:text-stone-800 border-stone-700 dark:border-stone-300 placeholder:text-stone-600 dark:placeholder:text-stone-400"
      v-bind="$attrs"
    />
  </div>
</template>
