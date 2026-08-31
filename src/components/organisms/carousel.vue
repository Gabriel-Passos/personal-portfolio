<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from "vue";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "@lucide/vue";

interface CarouselImage {
  src: string;
  alt?: string;
}

interface Props {
  images: CarouselImage[];
  /** Usado como alt quando a imagem não define o seu próprio */
  fallbackAlt?: string;
  /** Classes do <img> na miniatura; sobrescreva se precisar de outra altura/proporção */
  imageClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fallbackAlt: "",
  imageClass: "w-full h-144 object-cover object-center rounded",
});

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const DOUBLE_TAP_ZOOM = 2.5;
const DOUBLE_TAP_DELAY = 300; // ms

/* ---------------------------- Carrossel ---------------------------- */

const currentImage = ref(0);
const slideDirection = ref<"slide-left" | "slide-right">("slide-left");

function nextImage() {
  slideDirection.value = "slide-left";
  currentImage.value = (currentImage.value + 1) % props.images.length;
}

function previousImage() {
  slideDirection.value = "slide-right";
  currentImage.value =
    (currentImage.value - 1 + props.images.length) % props.images.length;
}

function goToImage(index: number) {
  slideDirection.value =
    index > currentImage.value ? "slide-left" : "slide-right";
  currentImage.value = index;
}

/* ------------------------ Visualizador fullscreen ------------------------ */

const isFullscreen = ref(false);
const viewerRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLElement | null>(null);
let triggerElement: HTMLElement | null = null;

const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isInteracting = ref(false); // desliga a transição enquanto arrasta/belisca

const imageStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  transition: isInteracting.value ? "none" : "transform 0.25s ease-out",
  cursor: scale.value > 1 ? "grab" : "zoom-in",
}));

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function resetZoom() {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
}

// Evita que a imagem seja arrastada para fora da área visível
function clampTranslate() {
  if (!viewerRef.value) return;
  const { width, height } = viewerRef.value.getBoundingClientRect();
  const maxX = (width * (scale.value - 1)) / 2;
  const maxY = (height * (scale.value - 1)) / 2;
  translateX.value = clamp(translateX.value, -maxX, maxX);
  translateY.value = clamp(translateY.value, -maxY, maxY);
}

// Aplica o zoom mantendo fixo na tela o ponto sob o cursor/dedos
function zoomAtPoint(clientX: number, clientY: number, newScale: number) {
  if (!viewerRef.value) return;
  const rect = viewerRef.value.getBoundingClientRect();
  const offsetX = clientX - rect.left - rect.width / 2;
  const offsetY = clientY - rect.top - rect.height / 2;
  const ratio = newScale / scale.value;

  translateX.value = offsetX - (offsetX - translateX.value) * ratio;
  translateY.value = offsetY - (offsetY - translateY.value) * ratio;
  scale.value = newScale;
  clampTranslate();
}

function openFullscreen(event: MouseEvent) {
  triggerElement = event.currentTarget as HTMLElement;
  isFullscreen.value = true;
  resetZoom();
  document.body.style.overflow = "hidden";
  nextTick(() => closeButtonRef.value?.focus());
}

function closeFullscreen() {
  isFullscreen.value = false;
  resetZoom();
  document.body.style.overflow = "";
  triggerElement?.focus();
}

// Ao trocar de imagem, sempre volta pro zoom padrão
watch(currentImage, resetZoom);

/* Desktop: scroll para zoom */
function onWheel(event: WheelEvent) {
  event.preventDefault();
  const newScale = clamp(scale.value - event.deltaY * 0.01, MIN_ZOOM, MAX_ZOOM);
  zoomAtPoint(event.clientX, event.clientY, newScale);
}

/* Desktop: duplo clique alterna zoom */
function onDoubleClick(event: MouseEvent) {
  const newScale = scale.value > 1 ? MIN_ZOOM : DOUBLE_TAP_ZOOM;
  zoomAtPoint(event.clientX, event.clientY, newScale);
}

/* Desktop: arrastar com o mouse quando ampliado */
let dragStart = { x: 0, y: 0 };

function onMouseDown(event: MouseEvent) {
  if (scale.value <= 1) return;
  isInteracting.value = true;
  dragStart = {
    x: event.clientX - translateX.value,
    y: event.clientY - translateY.value,
  };
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(event: MouseEvent) {
  translateX.value = event.clientX - dragStart.x;
  translateY.value = event.clientY - dragStart.y;
  clampTranslate();
}

function onMouseUp() {
  isInteracting.value = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}

/* Mobile: pinch to zoom + arrastar com 1 dedo + duplo toque */
function getDistance(touches: TouchList) {
  const [a, b] = [touches[0], touches[1]];
  return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
}

function getMidpoint(touches: TouchList) {
  const [a, b] = [touches[0], touches[1]];
  return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
}

let pinchStartDistance = 0;
let pinchStartScale = 1;
let panStart = { x: 0, y: 0 };
let lastTap = { time: 0, x: 0, y: 0 };

function onTouchStart(event: TouchEvent) {
  isInteracting.value = true;

  if (event.touches.length === 2) {
    pinchStartDistance = Math.max(getDistance(event.touches), 1);
    pinchStartScale = scale.value;
    return;
  }

  if (event.touches.length === 1) {
    const touch = event.touches[0];

    if (scale.value > 1) {
      panStart = {
        x: touch.clientX - translateX.value,
        y: touch.clientY - translateY.value,
      };
    }

    const now = Date.now();
    const isDoubleTap =
      now - lastTap.time < DOUBLE_TAP_DELAY &&
      Math.hypot(touch.clientX - lastTap.x, touch.clientY - lastTap.y) < 30;

    if (isDoubleTap) {
      const newScale = scale.value > 1 ? MIN_ZOOM : DOUBLE_TAP_ZOOM;
      zoomAtPoint(touch.clientX, touch.clientY, newScale);
      lastTap = { time: 0, x: 0, y: 0 };
    } else {
      lastTap = { time: now, x: touch.clientX, y: touch.clientY };
    }
  }
}

function onTouchMove(event: TouchEvent) {
  if (event.touches.length === 2) {
    event.preventDefault();
    const distance = getDistance(event.touches);
    const midpoint = getMidpoint(event.touches);
    const newScale = clamp(
      pinchStartScale * (distance / pinchStartDistance),
      MIN_ZOOM,
      MAX_ZOOM,
    );
    zoomAtPoint(midpoint.x, midpoint.y, newScale);
    return;
  }

  if (event.touches.length === 1 && scale.value > 1) {
    event.preventDefault();
    const touch = event.touches[0];
    translateX.value = touch.clientX - panStart.x;
    translateY.value = touch.clientY - panStart.y;
    clampTranslate();
  }
}

function onTouchEnd(event: TouchEvent) {
  if (event.touches.length === 0) {
    isInteracting.value = false;
  }
}

/* Teclado: Esc fecha, setas navegam */
function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeFullscreen();
  if (event.key === "ArrowRight" && props.images.length > 1) nextImage();
  if (event.key === "ArrowLeft" && props.images.length > 1) previousImage();
}

watch(isFullscreen, (open) => {
  if (open) {
    window.addEventListener("keydown", onKeydown);
  } else {
    window.removeEventListener("keydown", onKeydown);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
  if (isFullscreen.value) document.body.style.overflow = "";
});
</script>

<template>
  <div v-if="images?.length" class="relative w-full">
    <div
      class="relative border-8 border-stone-800 dark:border-stone-100 outline-1 outline-stone-700 dark:outline-stone-300 rounded overflow-hidden"
    >
      <Transition :name="slideDirection" mode="out-in">
        <img
          :key="currentImage"
          :src="images[currentImage].src"
          :alt="images[currentImage].alt || fallbackAlt"
          loading="lazy"
          :class="imageClass"
          class="cursor-zoom-in"
          @click="openFullscreen($event)"
        />
      </Transition>

      <button
        type="button"
        aria-label="Ver imagem em tela cheia"
        class="absolute bottom-3 right-3 bg-stone-800/80 rounded-lg p-1.5"
        @click="openFullscreen($event)"
      >
        <Maximize2 class="w-4 h-4 text-stone-100" />
      </button>
    </div>

    <!-- Previous -->
    <button
      v-if="images.length > 1"
      @click="previousImage"
      type="button"
      aria-label="Imagem anterior"
      class="absolute left-6 top-1/2 -translate-y-1/2 bg-stone-800 rounded-2xl p-0.5"
    >
      <ChevronLeft class="text-stone-100" />
    </button>

    <!-- Next -->
    <button
      v-if="images.length > 1"
      @click="nextImage"
      type="button"
      aria-label="Próxima imagem"
      class="absolute right-6 top-1/2 -translate-y-1/2 bg-stone-800 rounded-2xl p-0.5"
    >
      <ChevronRight class="text-stone-100" />
    </button>

    <!-- Indicators -->
    <div v-if="images.length > 1" class="flex justify-center gap-2 mt-4">
      <button
        v-for="(_, index) in images"
        :key="index"
        type="button"
        :aria-label="`Ir para imagem ${index + 1}`"
        @click="goToImage(index)"
        class="w-2 h-2 rounded-full"
        :class="
          currentImage === index
            ? 'bg-stone-300 dark:bg-stone-800'
            : 'bg-stone-700 dark:bg-stone-400'
        "
      />
    </div>

    <!-- Fullscreen viewer -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isFullscreen"
          class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          :aria-label="images[currentImage].alt || fallbackAlt"
          @click.self="closeFullscreen"
        >
          <button
            ref="closeButtonRef"
            type="button"
            aria-label="Fechar"
            class="absolute top-4 right-4 bg-stone-800 rounded-full p-2 z-10"
            @click="closeFullscreen"
          >
            <X class="w-5 h-5 text-stone-100" />
          </button>

          <button
            v-if="images.length > 1"
            type="button"
            aria-label="Imagem anterior"
            class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-stone-800 rounded-2xl p-1.5 z-10"
            @click.stop="previousImage"
          >
            <ChevronLeft class="text-stone-100" />
          </button>

          <button
            v-if="images.length > 1"
            type="button"
            aria-label="Próxima imagem"
            class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-stone-800 rounded-2xl p-1.5 z-10"
            @click.stop="nextImage"
          >
            <ChevronRight class="text-stone-100" />
          </button>

          <div
            ref="viewerRef"
            class="w-full h-full flex items-center justify-center overflow-hidden touch-none select-none"
            @wheel="onWheel"
            @dblclick="onDoubleClick"
            @mousedown="onMouseDown"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
          >
            <img
              :key="currentImage"
              :src="images[currentImage].src"
              :alt="images[currentImage].alt || fallbackAlt"
              :style="imageStyle"
              class="max-w-[92%] max-h-[85%] object-contain"
              draggable="false"
            />
          </div>

          <p class="absolute bottom-4 text-stone-400 text-xs md:hidden">
            Toque duas vezes ou belisque a tela para ampliar
          </p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
