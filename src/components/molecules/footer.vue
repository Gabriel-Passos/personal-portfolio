<script setup lang="ts">
import { ref } from "vue";

const currentYear = new Date().getFullYear();

const socialMedias = ref([
  {
    id: 0,
    text: "GitHub",
    url: "https://github.com/Gabriel-Passos",
  },
  {
    id: 1,
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/ghpassos/",
  },
  {
    id: 2,
    text: "Instagram",
    url: "https://www.instagram.com/eu.aloves/",
  },
]);
</script>

<template>
  <div class="py-6 flex items-center justify-between">
    <p class="font-lora text-sm text-stone-400">
      &copy; {{ currentYear }} Gabriel Passos
    </p>

    <div class="flex items-center gap-4">
      <a
        v-for="social in socialMedias"
        :key="social.id"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="font-cormorant-garamond text-lg font-medium text-stone-100 dark:text-stone-600 hover:underline"
      >
        {{ social.text }}
      </a>
    </div>
  </div>
</template>
