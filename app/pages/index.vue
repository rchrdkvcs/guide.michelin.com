<script lang="ts" setup></script>

<template>
  <div class="relative h-screen">
    <div
      class="bg-linear-to-b from-black/50 via-transparent to-black/50 absolute top-0 size-full z-1 pointer-events-none"
    ></div>
    <NuxtImg src="/images/hero.png" class="size-full object-cover absolute inset-0 z-0" />

    <div
      class="flex flex-col gap-6 absolute bottom-12 left-1/2 -translate-x-1/2 items-center z-20 w-full max-w-2xl px-4 text-center"
    >
      <NuxtImg src="/images/logo_michelin.png" class="h-12 w-auto object-contain" />
      <h1
        class="text-white text-2xl md:text-4xl font-semibold leading-snug tracking-wide drop-shadow-md"
      >
        Découvrez et réservez les hôtels et les restaurants du Guide MICHELIN
      </h1>
    </div>
  </div>

  <section class="h-screen">hello</section>
</template>
