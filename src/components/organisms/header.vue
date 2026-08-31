<script setup lang="ts">
import { Menu, Moon, Sun, Terminal, X } from "@lucide/vue";
import { RouterLink } from "vue-router";
import { AppRoutes } from "../../constants/app-routes.ts";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import Separator from "../atoms/separator.vue";

const route = useRoute();
const pathname = computed(() => route.path);
const isDark = useDark();
const mobileMenu = ref(false);

const toggleDark = useToggle(isDark);

const routes = ref([
  {
    id: 0,
    text: "Home",
    href: AppRoutes.HOME,
  },
  {
    id: 1,
    text: "Projects",
    href: AppRoutes.PROJECTS,
  },
  {
    id: 2,
    text: "About Me",
    href: AppRoutes.ABOUT_ME,
  },
  {
    id: 3,
    text: "Contact",
    href: AppRoutes.CONTACT,
  },
]);

function activeRoute(active: boolean) {
  const baseStyles =
    "font-cormorant-garamond text-lg font-medium hover:text-accent-400 px-2";
  if (active === false) {
    return `${baseStyles} text-stone-100 dark:text-stone-600`;
  }
  return `${baseStyles} text-accent-400 bg-accent-400/10 rounded`;
}

function handleOpenMobileMenu() {
  mobileMenu.value = !mobileMenu.value;
}
</script>

<template>
  <div class="flex items-center justify-between h-14 relative">
    <RouterLink
      :to="AppRoutes.HOME"
      class="flex items-center gap-2 font-cormorant-garamond font-semibold text-xl text-stone-100 dark:text-stone-800"
    >
      <Terminal :size="22" class="text-accent-400" />
      Gabriel Passos
    </RouterLink>

    <!-- Mobile Menu Button -->
    <button type="button" class="block md:hidden" @click="handleOpenMobileMenu">
      <Menu class="text-stone-100 dark:text-stone-800" />
    </button>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenu"
      class="absolute top-0 -left-4 w-screen h-screen bg-stone-800 dark:bg-stone-100 z-50 flex flex-col"
    >
      <div
        class="flex items-center justify-between h-14 px-4 bg-stone-900 dark:bg-[#f3f2f2]"
      >
        <RouterLink
          :to="AppRoutes.HOME"
          class="flex items-center gap-2 font-cormorant-garamond font-semibold text-xl text-stone-100 dark:text-stone-800"
          @click="mobileMenu = false"
        >
          <Terminal :size="22" class="text-accent-400" />
          Gabriel Passos
        </RouterLink>

        <button type="button" @click="mobileMenu = false">
          <X class="text-stone-100 dark:text-stone-800" />
        </button>
      </div>

      <Separator />

      <nav class="flex flex-col gap-4 mt-4 px-4">
        <RouterLink
          v-for="route in routes"
          :key="route.id"
          :to="route.href"
          :class="activeRoute(pathname === route.href)"
          @click="mobileMenu = false"
        >
          {{ route.text }}
        </RouterLink>

        <button
          type="button"
          v-on:click="toggleDark()"
          class="border rounded p-1 ml-2 border-stone-700 dark:border-stone-300 hover:border-accent-400 hover:bg-accent-400/10 w-fit"
        >
          <Moon v-if="isDark" :size="18" class="text-stone-600" />
          <Sun v-else :size="18" class="text-accent-400" />
        </button>
      </nav>
    </div>

    <!-- Desktop Menu -->
    <nav class="items-center gap-8 hidden md:flex">
      <RouterLink
        v-for="route in routes"
        :key="route.id"
        :to="route.href"
        :class="activeRoute(pathname === route.href)"
      >
        {{ route.text }}
      </RouterLink>

      <button
        type="button"
        v-on:click="toggleDark()"
        class="border rounded p-1 border-stone-700 dark:border-stone-300 hover:border-accent-400 hover:bg-accent-400/10"
      >
        <Moon v-if="isDark" :size="18" class="text-stone-600" />
        <Sun v-else :size="18" class="text-accent-400" />
      </button>
    </nav>
  </div>
</template>
