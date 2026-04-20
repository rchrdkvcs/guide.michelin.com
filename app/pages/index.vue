<script lang="ts" setup></script>

<template>
  <div class="relative h-screen">
    <div
      class="bg-linear-to-b from-black/50 to-black/25 absolute top-0 size-full z-1 pointer-events-none"
    ></div>
    <NuxtImg
      src="/images/landing_background.png"
      class="size-full object-cover absolute inset-0 z-0"
    />
    <UPageHero
      :ui="{
        title: 'text-white font-light',
      }"
      title="Découvrez et réservez les hôtels et les restaurants du Guide MICHELIN "
      class="relative h-full z-10 bg-transparent"
    >
      <template #headline>
        <NuxtImg src="/images/logo_michelin.png" class="h-8 object-contain mx-auto" />
      </template>
    </UPageHero>
  </div>
</template>
