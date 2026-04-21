<script lang="ts" setup>
const { heroStyle } = useHeroScroll();
</script>

<template>
  <div class="relative h-screen">
    <div
      :style="heroStyle"
      class="bg-linear-to-b from-black/75 via-transparent to-black/75 absolute top-0 size-full z-10 pointer-events-none transition-[transform,border-radius] duration-100 ease-out"
    ></div>
    <NuxtImg
      src="/images/hero.png"
      :style="heroStyle"
      class="size-full object-cover absolute inset-0 z-0 transition-[transform,border-radius] duration-100 ease-out"
    />

    <UContainer
      class="flex flex-col gap-6 absolute bottom-12 left-1/2 -translate-x-1/2 items-center z-20"
    >
      <NuxtImg src="/images/logo_vertical.png" class="w-auto object-contain" />
      <h1
        class="text-inverted text-4xl md:text-7xl font-semibold leading-snug tracking-wide drop-shadow-lg text-center"
      >
        Découvrez les hôtels et les restaurants du Guide MICHELIN
      </h1>
    </UContainer>
  </div>
</template>
