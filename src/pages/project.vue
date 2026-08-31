<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

import TextHighlight from "../components/atoms/text-highlight.vue";
import Separator from "../components/atoms/separator.vue";
import Badge from "../components/atoms/badge.vue";
import { personalProjects } from "../mock/projects.ts";
import Subtitle from "../components/atoms/subtitle.vue";
import Button from "../components/atoms/button.vue";
import Carousel from "../components/organisms/carousel.vue";

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const project = personalProjects.find((project) => project.id === id);

function openExternalLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
</script>

<template>
  <section class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <TextHighlight @back="router.back()" text="Voltar" />

      <TextHighlight
        v-if="project?.category"
        :text="`${project.category} . ${project.year}`"
      />

      <h1
        class="font-cormorant-garamond text-5xl text-stone-100 dark:text-stone-800 font-medium mb-0.5"
      >
        {{ project?.title }}
      </h1>

      <p class="font-lora text-lg text-stone-400 mb-4 text-justify">
        {{ project?.shortDescription }}
      </p>

      <div class="flex items-center gap-2 flex-wrap sm:justify-baseline">
        <Badge
          v-for="(tech, index) in project?.techs"
          :key="index"
          :text="tech"
          variant="outlined"
        />
      </div>
    </div>

    <Carousel
      v-if="project?.image?.length"
      :images="project.image"
      :fallback-alt="project.title"
    />

    <div
      class="flex items-start justify-between gap-14 h-fit mt-6 flex-col md:flex-row lg:h-100 md:h-164"
    >
      <div class="flex flex-col gap-6 w-full md:w-1/2">
        <Subtitle text="Informações gerais" />

        <p class="font-lora text-stone-400 text-justify">
          {{ project?.fullDescription }}
        </p>
      </div>

      <Separator orientation="vertical" class="hidden md:block" />

      <div class="flex flex-col gap-6 w-full md:w-1/2">
        <Subtitle text="Visualizar Projeto" />

        <Button
          v-if="project?.gitHubUrl"
          variant="outlined"
          type="button"
          @click="project?.gitHubUrl && openExternalLink(project.gitHubUrl)"
        >
          Código no GitHub
        </Button>

        <Button
          v-if="project?.gitHubBackendUrl"
          variant="outlined"
          type="button"
          @click="
            project?.gitHubBackendUrl &&
            openExternalLink(project.gitHubBackendUrl)
          "
        >
          Código no GitHub (Backend)
        </Button>

        <Button
          v-if="project?.gitHubFrontendUrl"
          variant="outlined"
          type="button"
          @click="
            project?.gitHubFrontendUrl &&
            openExternalLink(project.gitHubFrontendUrl)
          "
        >
          Código no GitHub (Front-end)
        </Button>

        <Button
          v-if="project?.gitHubMobileUrl"
          variant="outlined"
          type="button"
          @click="
            project?.gitHubMobileUrl &&
            openExternalLink(project.gitHubMobileUrl)
          "
        >
          Código no GitHub (Mobile)
        </Button>
      </div>
    </div>
  </section>
</template>
