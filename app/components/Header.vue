<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
const headerHeight = 128;
const isScrolled = computed(() => y.value > headerHeight / 2);

const route = useRoute();
const isHome = computed(() => route.path === "/");
const useCustomStyle = computed(() => isHome.value && !isScrolled.value);

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
  <UHeader
    :ui="{
      root: `${isScrolled ? 'bg-muted' : 'bg-transparent'} border-none backdrop-blur-none! fixed top-0 w-full z-50 transition-colors duration-300`,
    }"
  >
    <template #title>
      <NuxtImg src="/images/logo.png" class="size-8" />
    </template>

    <UNavigationMenu
      :ui="{
        link: useCustomStyle ? 'text-white/75 hover:text-white font-medium before:bg-transparent!' : '',
      }"
      :items="items"
    />

    <template #right>
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: useCustomStyle ? 'text-white/75 hover:text-white' : '',
        }"
        to="#"
        icon="lucide:search"
      />
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: useCustomStyle ? 'text-white/75 hover:text-white' : '',
        }"
        to="#"
        icon="lucide:heart"
      />
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: useCustomStyle ? 'text-white/75 hover:text-white' : '',
        }"
        to="#"
        icon="lucide:user"
      />
    </template>
  </UHeader>
</template>
