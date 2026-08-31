<script setup lang="ts">
import { ArrowRight } from "@lucide/vue";
import { useRouter } from "vue-router";
import Badge from "../atoms/badge.vue";
import { truncate } from "../../utils/truncate.utils.ts";

const router = useRouter();

interface ProjectCardProps {
  projectId: string;
  title: string;
  year: string;
  category: string;
  shortDescription: string;
  techs: string[];
}

const props = defineProps<ProjectCardProps>();
</script>

<template>
  <article
    v-on:click="router.push({ name: 'Project', params: { id: projectId } })"
    class="flex flex-col gap-4 border rounded border-stone-700 dark:border-stone-300 p-6 hover:border-accent-300 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1"
  >
    <div class="flex items-center justify-between">
      <p
        class="font-normal uppercase text-xs font-lora text-accent-300 tracking-wider"
      >
        {{ props.category }}
      </p>
      <p class="text-sm font-lora text-stone-400">{{ props.year }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <p
        class="font-cormorant-garamond text-2xl text-stone-100 dark:text-stone-800 font-semibold"
      >
        {{ props.title }}
      </p>

      <p class="font-lora text-sm text-stone-400">
        {{ truncate(props.shortDescription, 88) }}
      </p>
    </div>

    <div class="flex items-center flex-wrap gap-2 mt-1">
      <Badge
        v-for="(tech, index) in props.techs.slice(0, 3)"
        :key="index"
        :text="tech"
      />
      <Badge v-if="props.techs.length > 3" text="..." />
    </div>

    <p
      class="flex items-center gap-1 text-accent-300 font-cormorant-garamond font-medium mt-1"
    >
      Ler estudo de caso <ArrowRight :size="14" />
    </p>
  </article>
</template>
