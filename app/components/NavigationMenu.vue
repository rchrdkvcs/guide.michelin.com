<script lang="ts" setup>
const navItems = ref([
  {
    label: "Accueil",
    to: "/",
  },
  {
    label: "Restaurants",
    to: "#",
  },
  {
    label: "Hébergements",
    to: "#",
  },
  {
    label: "Guide MICHELIN Plus",
    to: "#",
  },
  {
    label: "Guides de voyage",
    to: "#",
  },
  {
    label: "Guides Best-of",
    to: "#",
  },
  {
    label: "Magazine",
    to: "#",
  },
  {
    label: "Nous contacter",
    to: "#",
  },
  {
    label: "S'inscrire à la newsletter",
    to: "#",
  },
  {
    label: "Partenariat privilégié TheFork",
    to: "#",
  },
  {
    label: "Restaurants partenaires TheFork",
    to: "#",
  },
]);
</script>

<template>
  <USlideover side="left">
    <template #title>
      <div class="flex items-center justify-center gap-2">
        <NuxtImg src="/images/logo.png" class="size-6" />
        <NuxtImg src="/images/logo_michelin.png" class="h-3" />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :ui="{
          link: 'text-lg font-medium text-elevated hover:text-primary hover:translate-x-1 transition-transform duration-300',
        }"
        orientation="vertical"
        :items="navItems"
        variant="link"
      />
    </template>

    <template #footer>
      <div class="grid grid-cols-2 justify-center items-center w-full gap-4">
        <UButton label="Se connecter" color="primary" variant="solid" block />
        <UButton label="S'inscrire" color="primary" variant="outline" block />
      </div>
    </template>
  </USlideover>
</template>
