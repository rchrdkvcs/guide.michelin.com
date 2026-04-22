<script lang="ts" setup>
const { heroStyle } = useHeroScroll();
</script>

<template>
  <div class="relative h-screen">
    <div
      :style="heroStyle"
      class="pointer-events-none absolute top-0 z-10 size-full bg-linear-to-b from-black/75 via-transparent to-black/75 transition-[transform,border-radius] duration-100 ease-out"
    ></div>
    <NuxtImg
      src="/images/hero.png"
      :style="heroStyle"
      class="absolute inset-0 z-0 size-full object-cover transition-[transform,border-radius] duration-100 ease-out"
    />

    <UContainer
      class="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-6"
    >
      <NuxtImg src="/images/logo_vertical.png" class="w-auto object-contain" />
      <h1
        class="text-center text-4xl leading-snug font-semibold tracking-wide text-inverted drop-shadow-lg md:text-7xl"
      >
        Découvrez les hôtels et les restaurants du Guide MICHELIN
      </h1>
    </UContainer>
  </div>
</template>
