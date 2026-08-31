<script setup lang="ts">
import Container from "../atoms/container.vue";
import Separator from "../atoms/separator.vue";
import Footer from "../molecules/footer.vue";
import Header from "./header.vue";
</script>

<template>
  <header>
    <Container>
      <Header />
    </Container>
  </header>

  <Separator />

  <main>
    <Container>
      <div class="flex flex-col gap-12 my-12">
        <slot />
      </div>
    </Container>
  </main>

  <footer>
    <Container>
      <div class="pb-12 pt-6">
        <Separator />
        <Footer />
      </div>
    </Container>
  </footer>
</template>
