<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import Button from "../atoms/button.vue";
import { ArrowRight } from "@lucide/vue";
import { useRouter } from "vue-router";
import { AppRoutes } from "../../constants/app-routes.ts";
import TextHighlight from "../atoms/text-highlight.vue";

const router = useRouter();

const words = ["ferramentas", "protótipos", "produtos"];
const currentIndex = ref(0);

let timer: number | undefined = undefined;

const currentWord = computed(() => words[currentIndex.value]);

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % words.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(timer);
});

interface HeroBannerProps {
  onSeeProject?: () => void;
}

const props = defineProps<HeroBannerProps>();
</script>

<template>
  <section class="flex flex-col gap-6">
    <TextHighlight :text="'Gabriel Passos . Desenvolvedor de Software'" />

    <div class="flex flex-col gap-4">
      <h1
        class="text-7xl font-cormorant-garamond font-normal text-stone-100 dark:text-stone-800"
      >
        Construo
        <Transition name="fade-down" mode="out-in">
          <span
            :key="currentWord"
            class="text-accent-400 italic inline-block"
            >{{ currentWord }}</span
          >
        </Transition>
        <br />
        que resolvem problemas reais.
      </h1>
      <p class="font-lora text-stone-400 text-base mt-1">
        Desenvolvedor Fullstack com mais de três anos de experiência, criando
        aplicações <br />
        web e mobile com TypeScript, React, Next.js, React Native e Node.js — do
        primeiro componente <br />
        à API que sustenta o produto.
      </p>
    </div>

    <div class="flex items-center gap-4 mt-2">
      <Button variant="outlined" v-on:click="props.onSeeProject">
        Ver projetos
      </Button>
      <Button
        variant="ghost"
        class="flex items-center gap-1"
        v-on:click="router.push(AppRoutes.CONTACT)"
      >
        ou fale comigo <ArrowRight :size="14" />
      </Button>
    </div>
  </section>
</template>

<style scoped>
.fade-down-enter-active {
  transition: all 0.4s ease-out;
}
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.fade-down-leave-active {
  transition: all 0.2s ease-in;
}
.fade-down-leave-to {
  opacity: 0;
}
</style>
