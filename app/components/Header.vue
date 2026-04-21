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
    label: "Aventures",
    to: "/region-details",
  },
]);
</script>

<template>
  <UHeader
    :toggle="false"
    :ui="{
      // On garde 'border-b' en permanence mais on change sa couleur
      root: `fixed top-0 w-full z-50 transition-all duration-300 h-32 flex items-center
            ${isScrolled
              ? 'bg-white border-b border-gray-200'
              : 'bg-transparent border-b border-transparent'}`
    }"
  >
    <template #title>
      <NuxtImg src="/images/logo.png" class="h-12 w-auto object-contain" />
    </template>

    <UNavigationMenu
      :ui="{
        link: useCustomStyle
          ? 'text-white/75 hover:text-white font-medium before:bg-transparent!'
          : 'text-gray-900 hover:text-primary-600',
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
        :class="useCustomStyle ? 'text-white/75 hover:text-white' : 'text-gray-900'"
        to="#"
        icon="lucide:search"
      />
      <UButton
        color="neutral"
        variant="link"
        :class="useCustomStyle ? 'text-white/75 hover:text-white' : 'text-gray-900'"
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
