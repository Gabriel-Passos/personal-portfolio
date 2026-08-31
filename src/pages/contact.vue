<script setup lang="ts">
import { reactive, ref } from "vue";
import Button from "../components/atoms/button.vue";
import ContactItem from "../components/atoms/contact-item.vue";
import Input from "../components/atoms/input.vue";
import TextHighlight from "../components/atoms/text-highlight.vue";

const contactEmail = "dev.ghpasssos@gmail.com";

// Chave pública do Web3Forms — não é secreta, mas fica em env var
// pra facilitar troca sem mexer no código.
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string;

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const honeypot = ref(""); // se vier preenchido, é bot
const status = ref<"idle" | "sending" | "success" | "error">("idle");

async function handleSubmit() {
  if (honeypot.value) return; // descarta silenciosamente

  status.value = "sending";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Novo contato via portfólio — ${form.name}`,
        from_name: form.name,
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      status.value = "success";
      form.name = "";
      form.email = "";
      form.message = "";
    } else {
      status.value = "error";
    }
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <section class="flex items-start justify-between gap-14 flex-col sm:flex-row">
    <div class="flex flex-col gap-4 w-full sm:w-1/2">
      <TextHighlight :text="'Contato'" />
      <h1
        class="font-cormorant-garamond text-5xl text-stone-100 dark:text-stone-800 font-medium mb-0.5"
      >
        Vamos conversar
      </h1>
      <p class="font-lora text-lg text-stone-400 mb-4">
        Respondo em até dois dias úteis. Se for sobre trabalho, conte o contexto
        e o prazo — ajuda muito.
      </p>

      <div class="flex flex-col">
        <ContactItem :label="'E-mail'" :value="'dev.ghpasssos@gmail.com'" />
        <ContactItem
          :label="'Linkedin'"
          :value="'/in/ghpassos'"
          :href="'https://www.linkedin.com/in/ghpassos/'"
        />
        <ContactItem
          :label="'Github'"
          :value="'@Gabriel-Passos'"
          :href="'https://github.com/Gabriel-Passos'"
        />
        <ContactItem :label="'Telefone'" :value="'+55 (14) 93085-4099'" />
        <ContactItem
          :label="'Localização'"
          :value="'Promissão-SP, Brasil . remoto'"
        />
      </div>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-6 border rounded border-stone-700 dark:border-stone-300 p-8 w-full sm:w-1/2"
    >
      <h2
        class="font-cormorant-garamond text-2xl font-semibold text-stone-100 dark:text-stone-800"
      >
        Enviar uma mensagem
      </h2>

      <Input
        v-model="form.name"
        type="text"
        label="Nome"
        placeholder="Como devo te chamar?"
        required
      />
      <Input
        v-model="form.email"
        type="email"
        label="E-mail"
        placeholder="voce@empresa.com"
        required
      />
      <Input
        v-model="form.message"
        type="text"
        label="Mensagem"
        placeholder="Contexto, prazo e o que você espera."
        textarea
        required
      />

      <!-- honeypot: invisível pra humanos, bots costumam preencher tudo -->
      <input
        v-model="honeypot"
        type="text"
        name="botcheck"
        tabindex="-1"
        autocomplete="off"
        class="hidden"
        aria-hidden="true"
      />

      <Button type="submit" variant="outlined" :disabled="status === 'sending'">
        {{ status === "sending" ? "Enviando..." : "Enviar mensagem" }}
      </Button>

      <p v-if="status === 'success'" class="font-lora text-sm text-emerald-500">
        Mensagem enviada! Respondo em até dois dias úteis.
      </p>
      <p v-else-if="status === 'error'" class="font-lora text-sm text-red-500">
        Não consegui enviar agora. Tenta de novo ou manda um e-mail direto pra
        {{ contactEmail }}.
      </p>
      <p v-else class="font-lora text-sm text-stone-400">
        Seus dados ficam só entre nós.
      </p>
    </form>
  </section>
</template>
