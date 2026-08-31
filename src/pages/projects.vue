<script setup lang="ts">
import TextHighlight from "../components/atoms/text-highlight.vue";
import Separator from "../components/atoms/separator.vue";
import ProjectCard from "../components/molecules/project-card.vue";
import { personalProjects } from "../mock/projects.ts";
import Subtitle from "../components/atoms/subtitle.vue";
</script>

<template>
  <section>
    <div class="flex flex-col gap-4">
      <TextHighlight :text="'Projetos'" />
      <h1
        class="font-cormorant-garamond text-5xl text-stone-100 dark:text-stone-800 font-medium mb-0.5"
      >
        Meus projetos
      </h1>
      <p class="font-lora text-lg text-stone-400">
        Aqui você vai encontrar meus projetos pessoais e também alguns projetos
        de estudos.
      </p>
    </div>

    <Separator class="mt-16 mb-11" />

    <Subtitle text="Projetos pessoais" />

    <div class="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6">
      <ProjectCard
        v-for="project in personalProjects"
        :key="project.id"
        :project-id="project.id"
        :title="project.title"
        :year="project.year"
        :category="project.category"
        :short-description="project.shortDescription"
        :techs="project.techs"
      />
    </div>
  </section>
</template>
