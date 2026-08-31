<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./components/organisms/layout.vue";
import BackToTopButton from "./components/molecules/back-to-top-button.vue";
import { Analytics } from "@vercel/analytics/vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
</script>

<template>
  <Layout>
    <Analytics />
    <SpeedInsights />
    <RouterView />
    <BackToTopButton />
  </Layout>
</template>
