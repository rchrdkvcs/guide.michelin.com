<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { NavigationMenu } from "#components";
import { useWindowScroll } from "@vueuse/core";

const overlay = useOverlay();
const navigationMenu = overlay.create(NavigationMenu);

const { y } = useWindowScroll();
const headerHeight = 64;
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
    :toggle="false"
    :ui="{
      root: `${isScrolled ? '' : 'bg-transparent border-none backdrop-blur-none!'} fixed top-0 w-full z-50 transition-colors duration-300`,
    }"
  >
    <template #title>
      <NuxtImg src="/images/logo.png" class="size-8" />
    </template>

    <UNavigationMenu
      :ui="{
        link: useCustomStyle
          ? 'text-white/75 hover:text-white font-medium before:bg-transparent!'
          : 'text-elevated',
      }"
      :items="items"
      variant="link"
    />

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
      <UButton
        color="neutral"
        variant="link"
        :ui="{
          base: useCustomStyle ? 'text-white/75 hover:text-white' : '',
        }"
        icon="lucide:menu"
        @click="navigationMenu.open()"
      />
    </template>
  </UHeader>
</template>
