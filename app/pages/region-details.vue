<script setup lang="ts">
interface AdventureData {
  image: { src: string; alt: string };
  discover: { title: string; content: string };
  attractions: { title: string; content: string };
  restaurants: any[];
  hotels: any[];
}

const route = useRoute()

// On change 'region' par 'id' pour correspondre à ton souhait d'URL
const adventureId = computed(() => (route.query.id as string) || 'bretagne')

const { data: adventure, pending, error } = await useFetch<AdventureData>('/api/adventure', {
  query: { id: adventureId },
  watch: [adventureId],
  lazy: true,
  server: true
})

const regionImage = computed(() => adventure.value?.image)
const textDiscover = computed(() => adventure.value?.discover)
const textAttraction = computed(() => adventure.value?.attractions)
const restaurants = computed(() => adventure.value?.restaurants || [])
const hotels = computed(() => adventure.value?.hotels || [])
</script>

<template>
  <main v-if="adventure" class="w-full overflow-x-hidden bg-linen-50/30 min-h-screen">
    <!-- Hero Section -->
    <section id="region-hero" class="relative h-[70vh] w-full overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/30 z-10" />
      <NuxtImg
        :src="regionImage?.src"
        :alt="regionImage?.alt"
        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
      />
      <div class="absolute bottom-20 left-0 w-full z-20 text-center px-4">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
          {{ textDiscover?.title }}
        </h1>
        <div class="w-24 h-1 bg-brand-500 mx-auto rounded-full shadow-lg" />
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <!-- Discover Section -->
      <section class="text-center max-w-3xl mx-auto space-y-6 reveal">
        <p class="text-xl md:text-2xl text-linen-700 leading-relaxed font-light italic">
          "{{ textDiscover?.content }}"
        </p>
      </section>

      <!-- Restaurants Carousel -->
      <section v-if="restaurants.length" class="space-y-10">
        <div class="flex items-center gap-4">
          <h2 class="text-3xl font-bold text-linen-900 shrink-0">Gastronomie</h2>
          <div class="h-px bg-linen-200 w-full" />
        </div>
        <RegionCarousel :items="restaurants" id="restaurants-carousel" class="shadow-2xl" />
      </section>

      <!-- Attractions Section -->
      <section class="text-center max-w-4xl mx-auto space-y-8 py-10">
        <h2 class="text-4xl font-bold text-linen-900">{{ textAttraction?.title }}</h2>
        <p class="text-lg text-linen-600 max-w-2xl mx-auto leading-relaxed">
          {{ textAttraction?.content }}
        </p>
      </section>

      <!-- Hotels Carousel -->
      <section v-if="hotels.length" class="space-y-10">
        <div class="flex items-center gap-4 justify-end">
          <div class="h-px bg-linen-200 w-full" />
          <h2 class="text-3xl font-bold text-linen-900 shrink-0">Hébergements d'Exception</h2>
        </div>
        <RegionCarousel :items="hotels" id="hotels-carousel" class="shadow-2xl" />
      </section>
    </div>
  </main>

  <div v-else-if="pending" class="min-h-screen flex items-center justify-center bg-linen-50">
    <div class="animate-pulse flex flex-col items-center space-y-4">
      <div class="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <p class="text-brand-700 font-medium tracking-widest">CHARGEMENT</p>
    </div>
  </div>

  <div v-else-if="error" class="min-h-screen flex items-center justify-center bg-linen-50 px-4">
    <div class="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center space-y-6">
      <div class="text-brand-500 text-6xl">⚠️</div>
      <h2 class="text-2xl font-bold text-linen-900">Oups !</h2>
      <p class="text-linen-600">Impossible de charger la région "{{ adventureId }}".</p>
      <UButton to="/" color="brand" variant="solid" size="lg" block>Retour à l'accueil</UButton>
    </div>
  </div>
</template>
