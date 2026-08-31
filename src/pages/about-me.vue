<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "../components/atoms/button.vue";
import Separator from "../components/atoms/separator.vue";
import TextHighlight from "../components/atoms/text-highlight.vue";
import ProfessionalExpItem from "../components/molecules/professional-exp-item.vue";
import { AppRoutes } from "../constants/app-routes.ts";
import Subtitle from "../components/atoms/subtitle.vue";
import { professionalExps } from "../mock/prefessional-exp.ts";
import curriculumPdf from "../assets/curriculum/curriculum-gabriel-passos.pdf";

const router = useRouter();

function downloadCurriculum() {
  const link = document.createElement("a");
  link.href = curriculumPdf;
  link.download = "Currículo - Gabriel Passos.pdf";
  link.click();
}
</script>

<template>
  <section class="flex flex-col gap-8">
    <div
      class="flex items-start justify-between gap-14 w-full flex-col md:flex-row"
    >
      <div class="flex flex-col gap-4 w-full md:w-1/2">
        <TextHighlight :text="'Sobre mim'" />
        <h1
          class="font-cormorant-garamond text-5xl text-stone-100 dark:text-stone-800 mb-2 font-medium"
        >
          Gosto de entender o problema antes de escrever a primeira linha.
        </h1>
        <p class="font-lora text-lg text-stone-400 text-justify">
          Ao longo da minha trajetória, passei pelo desenvolvimento de
          interfaces, aplicações mobile e, mais recentemente, pela construção de
          produtos de ponta a ponta.
        </p>
        <p class="font-lora text-lg text-stone-400 text-justify">
          Hoje trabalho principalmente com TypeScript, React, Next.js e React
          Native, mas o que mais gosto no desenvolvimento não é uma tecnologia
          específica. É entender o que precisa ser resolvido, encontrar uma
          solução simples e transformar essa solução em software que realmente
          possa ser usado.
        </p>
        <p class="font-lora text-lg text-stone-400 text-justify">
          Também mantenho projetos pessoais como uma forma de experimentar
          ideias, aprender novas tecnologias e colocar em prática aquilo que
          descubro no trabalho.
        </p>
      </div>

      <div class="w-full md:w-1/2">
        <div
          class="border-8 rounded border-stone-800 dark:border-stone-100 outline-1 outline-stone-700 dark:outline-stone-300"
        >
          <img
            src="../assets/gabriel.jpg"
            alt="Gabriel Passos"
            loading="lazy"
            class="object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded"
          />
        </div>
      </div>
    </div>

    <Separator class="mt-8 mb-3" />

    <section class="flex flex-col gap-6">
      <Subtitle text="Experiência profissional" />

      <div>
        <ProfessionalExpItem
          v-for="professionalExp in professionalExps"
          :key="professionalExp.id"
          :title="professionalExp.title"
          :company="professionalExp.company"
          :hire_year="professionalExp.hire_year"
          :layoff_year="professionalExp.layoff_year"
          :description="professionalExp.description"
        />
      </div>

      <div
        class="p-10 mt-8 border rounded border-stone-700 dark:border-stone-300 flex items-start justify-between flex-col md:flex-row md:items-center gap-6 md:gap-0"
      >
        <p
          class="font-cormorant-garamond text-2xl font-semibold text-stone-100 dark:text-stone-800"
        >
          Quer o currículo completo?
        </p>

        <div class="flex items-center gap-4">
          <Button variant="contained" v-on:click="downloadCurriculum">
            Baixar Currículo (PDF)
          </Button>
          <Button
            variant="outlined"
            v-on:click="router.push(AppRoutes.CONTACT)"
          >
            Me chamar
          </Button>
        </div>
      </div>
    </section>
  </section>
</template>
