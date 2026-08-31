<script setup lang="ts">
import { ref } from "vue";
import Separator from "../components/atoms/separator.vue";
import ContactBanner from "../components/molecules/contact-banner.vue";
import ProjectCard from "../components/molecules/project-card.vue";
import { AppRoutes } from "../constants/app-routes.ts";
import { personalProjects } from "../mock/projects.ts";
import Subtitle from "../components/atoms/subtitle.vue";
import HeroBanner from "../components/organisms/hero-banner.vue";

const targetSection = ref<HTMLElement | null>(null);

const scrollToSection = () => {
  targetSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <HeroBanner v-on:see-project="scrollToSection" />

  <section class="flex flex-col gap-6">
    <Separator class="mt-4 mb-5" />

    <div class="flex flex-col gap-8" ref="targetSection">
      <Subtitle text="Projetos pessoais" />

      <div class="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
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

      <RouterLink
        :to="AppRoutes.PROJECTS"
        class="w-fit mx-auto font-lora text-sm text-accent-300 hover:underline"
      >
        Ver mais projetos
      </RouterLink>
    </div>

    <div />
  </section>

  <ContactBanner />
</template>
