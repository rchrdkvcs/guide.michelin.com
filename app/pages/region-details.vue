<script setup lang="ts">
const regionImage = ref({
  src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
  alt: 'Region representation'
})

const textSectionOne = ref({
  title: 'Discover the Region',
  content: 'This section contains introductory text about the selected region, its history, and its unique characteristics.'
})

const carouselOneItems = ref([
  { id: 1, name: 'Hotel/Restaurant A', description: 'Brief description of A' },
  { id: 2, name: 'Hotel/Restaurant B', description: 'Brief description of B' },
  { id: 3, name: 'Hotel/Restaurant C', description: 'Brief description of C' }
])

const textSectionTwo = ref({
  title: 'Local Attractions',
  content: 'More text content about local spots, activities, or specific highlights of the area.'
})

const carouselTwoItems = ref([
  { id: 4, name: 'Specialty 1', description: 'Description of specialty 1' },
  { id: 5, name: 'Specialty 2', description: 'Description of specialty 2' },
  { id: 6, name: 'Specialty 3', description: 'Description of specialty 3' }
])
</script>

<template>
  <main style="width: 100%; overflow-x: hidden;">
    <section
      id="region-hero"
      style="height: 800px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden;"
    >
      <img
        :src="regionImage.src"
        :alt="regionImage.alt"
        style="width: 100%; height: 100%; object-fit: cover;"
      >
    </section>

    <section
      id="intro-text"
      style="height: 800px; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; text-align: center;"
    >
      <h1>{{ textSectionOne.title }}</h1>
      <p>{{ textSectionOne.content }}</p>
    </section>

    <RegionCarousel
      id="first-carousel"
      :items="carouselOneItems"
    />

    <section
      id="secondary-text"
      style="height: 800px; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; text-align: center;"
    >
      <h2>{{ textSectionTwo.title }}</h2>
      <p>{{ textSectionTwo.content }}</p>
    </section>

    <RegionCarousel
      id="second-carousel"
      :items="carouselTwoItems"
    />
  </main>
</template>
