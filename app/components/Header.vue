<script lang="ts"></script>

<template>
  <UHeader
    :ui="{
      root: 'bg-transparent border-none backdrop-blur-none!',
    }"
  >
    <template #left>
      <NuxtLink to="/">
        <NuxtImg src="/images/etoile_michelin.png" class="size-8" />
        <div class=""></div>
      </NuxtLink>
    </template>

    <template #right> </template>
  </UHeader>

  <div class="absolute top-0 left-0 w-full bg-linear-to-b from-black/25 to-transparent h-32"></div>
</template>
