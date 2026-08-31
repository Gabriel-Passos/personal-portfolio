<script setup lang="ts">
import { ArrowUp } from "@lucide/vue";
import { onMounted, onUnmounted, ref } from "vue";

interface Props {
  /** Distância de scroll (px) a partir da qual o botão aparece */
  threshold?: number;
  /** Comportamento do scroll ao clicar */
  behavior?: ScrollBehavior;
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 100,
  behavior: "smooth",
});

const isVisible = ref(false);
let ticking = false;

function updateVisibility() {
  isVisible.value = window.scrollY > props.threshold;
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateVisibility);
    ticking = true;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: props.behavior });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  updateVisibility(); // caso a página já carregue com scroll (ex: refresh)
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <Transition name="fade-up">
    <button
      v-if="isVisible"
      type="button"
      aria-label="Voltar ao topo"
      class="fixed bottom-6 right-6 z-40 border border-accent-400 bg-transparent rounded-2xl p-2.5 hover:bg-accent-400/10"
      @click="scrollToTop"
    >
      <ArrowUp class="w-5 h-5 text-accent-400" />
    </button>
  </Transition>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
