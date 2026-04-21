<script lang="ts" setup>
const { data: adventuresList } = await useFetch<any[]>("/api/adventures");
const activeAdventureIndex = ref(0);

const currentAdventure = computed(() => {
  if (!adventuresList.value) return null;
  return adventuresList.value[activeAdventureIndex.value];
});

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

  <UPageSection
    title="Choisissez votre destination"
    description="Explorez les régions les plus emblématiques à travers leurs joyaux culinaires et hôteliers."
  >
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
  </UPageSection>
</template>
