<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./components/organisms/layout.vue";
import BackToTopButton from "./components/molecules/back-to-top-button.vue";
</script>

<template>
  <Layout>
    <RouterView />
    <BackToTopButton />
  </Layout>
</template>
