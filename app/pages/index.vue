<script lang="ts" setup>
const { data: adventuresList } = await useFetch<any[]>('/api/adventures')
const activeAdventureIndex = ref(0)

const currentAdventure = computed(() => {
  if (!adventuresList.value) return null
  return adventuresList.value[activeAdventureIndex.value]
})
</script>

<template>
  <div class="relative h-screen">
    <div
      class="bg-linear-to-b from-black/50 via-transparent to-black/50 absolute top-0 size-full z-10 pointer-events-none"
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

  <section class="min-h-screen bg-linen-50 py-24 flex flex-col items-center justify-center space-y-12 px-6">
    <div class="text-center space-y-4 max-w-2xl">
      <h2 class="text-4xl md:text-5xl font-bold text-linen-950 tracking-tight">Choisissez votre destination</h2>
      <p class="text-lg text-linen-700">Explorez les régions les plus emblématiques à travers leurs joyaux culinaires et hôteliers.</p>
    </div>

    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Interactive Map -->
      <div class="order-2 lg:order-1 flex justify-center">
        <FranceMap :active-region-id="currentAdventure?.id" />
      </div>

      <!-- Adventure Carousel -->
      <div class="order-1 lg:order-2">
        <RegionCarousel
          v-if="adventuresList"
          v-model="activeAdventureIndex"
          :items="adventuresList"
          id="main-adventures"
        />
      </div>
    </div>
  </section>
</template>
