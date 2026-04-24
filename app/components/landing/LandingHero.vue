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
      alt="Les meilleures tables et hôtels du Guide MICHELIN"
      :style="heroStyle"
      class="absolute inset-0 z-0 size-full object-cover transition-[transform,border-radius] duration-100 ease-out"
    />

    <UContainer
      class="absolute bottom-8 left-1/2 z-20 flex w-full -translate-x-1/2 flex-col items-center gap-4 px-6 md:bottom-12 md:gap-6 md:px-4"
    >
      <NuxtImg src="/images/logo_vertical.png" alt="Guide MICHELIN" class="w-20 object-contain md:w-36" />
      <h1
        class="text-center text-3xl leading-snug font-semibold tracking-wide text-inverted drop-shadow-lg sm:text-4xl md:text-7xl"
      >
        Découvrez les hôtels et les restaurants du Guide MICHELIN
      </h1>
    </UContainer>
  </div>
</template>
