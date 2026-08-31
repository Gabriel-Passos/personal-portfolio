<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "../atoms/button.vue";
import { AppRoutes } from "../../constants/app-routes.ts";

const router = useRouter();
</script>

<template>
  <section
    class="border rounded border-stone-700 dark:border-stone-300 p-12 flex justify-between md:items-center md:flex-row flex-col gap-8"
  >
    <div class="flex flex-col gap-2">
      <h2
        class="font-cormorant-garamond text-3xl font-semibold text-stone-100 dark:text-stone-800"
      >
        Tem um projeto em mente?
      </h2>
      <p class="font-lora text-stone-400">
        Estou aberto a conversas sobre trabalho, colaborações e <br />
        ideias em estágio inicial.
      </p>
    </div>

    <Button variant="outlined" v-on:click="router.push(AppRoutes.CONTACT)">
      Falar comigo
    </Button>
  </section>
</template>
