<script setup lang="ts">
import { NavigationMenu } from "#components";
import { useWindowScroll } from "@vueuse/core";

const overlay = useOverlay();
const navigationMenu = overlay.create(NavigationMenu);

const { y } = useWindowScroll();
const isScrolled = computed(() => y.value > 64 / 2);

const route = useRoute();
const isHome = computed(() => route.path === "/");
const useCustomStyle = computed(() => isHome.value && !isScrolled.value);

const { headerItems } = useNavigation();
</script>

<template>
  <UHeader
    :toggle="false"
    :ui="{
      root: `${isScrolled || !isHome ? 'after:opacity-100' : 'after:opacity-0'} after:transition-opacity after:duration-300 after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-32 after:bg-linear-to-b after:from-linen-100 after:to-transparent after:-z-10 after:pointer-events-none bg-transparent fixed top-0 w-full z-50 backdrop-blur-none! border-none`,
    }"
  >
    <template #title>
      <NuxtImg src="/images/logo.png" class="size-8" />
    </template>

    <UNavigationMenu
      class="hidden md:flex"
      :ui="
        useCustomStyle
          ? {
              root: 'group/nav',
              link: 'text-white! group-hover/nav:text-white/50! hover:text-white! font-medium before:bg-transparent! text-md',
            }
          : {
              link: 'text-elevated text-md',
            }
      "
      :items="headerItems"
      variant="link"
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
        class="hidden md:inline-flex"
        color="neutral"
        variant="link"
        :ui="{
          base: useCustomStyle ? 'text-white/75 hover:text-white' : '',
        }"
        to="#"
        icon="lucide:heart"
      />
      <UButton
        class="hidden md:inline-flex"
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
