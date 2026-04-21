<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "Restaurants",
    to: "#",
  },
  {
    label: "Hébergements",
    to: "#",
  },
  {
    label: "Guides de voyage",
    to: "#",
  },
  {
    label: "Magazine",
    to: "#",
  },
]);
</script>

<template>
  <UHeader :ui="{ root: 'bg-transparent border-none backdrop-blur-none! fixed top-0 w-full z-50' }">
    <template #title>
      <NuxtImg src="/images/logo.png" class="size-8" />
    </template>

    <UNavigationMenu
      :ui="{
        link: 'text-white/75 hover:text-white font-medium before:bg-transparent! border border-transparent hover:border-muted/50',
      }"
      :items="items"
    />

    <template #right>
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: 'text-white/75 hover:text-white border border-transparent hover:border-muted/50',
        }"
        to="#"
        icon="lucide:search"
      />
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: 'text-white/75 hover:text-white border border-transparent hover:border-muted/50',
        }"
        to="#"
        icon="lucide:heart"
      />
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: 'text-white/75 hover:text-white border border-transparent hover:border-muted/50',
        }"
        to="#"
        icon="lucide:user"
      />
    </template>
  </UHeader>
</template>
