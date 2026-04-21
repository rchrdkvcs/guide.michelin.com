<script setup lang="ts">
const regionImage = ref({
  src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
  alt: 'Region representation'
})

const textDiscover = ref({
  title: 'Discover the Region',
  content: 'This section contains introductory text about the selected region, its history, and its unique characteristics.'
})

const carouselRestaurants = ref([
  { id: 1, name: 'Restaurant A', description: 'Brief description of A' },
  { id: 2, name: 'Restaurant B', description: 'Brief description of B' },
  { id: 3, name: 'Restaurant C', description: 'Brief description of C' },
  { id: 4, name: 'Restaurant D', description: 'Brief description of D' },
  { id: 5, name: 'Restaurant E', description: 'Brief description of E' },
])

const textAttraction = ref({
  title: 'Local Attractions',
  content: 'More text content about local spots, activities, or specific highlights of the area.'
})

const carouselHotels = ref([
  { id: 4, name: 'Hotel 1', description: 'Description of hotel 1' },
  { id: 5, name: 'Hotel 2', description: 'Description of hotel 2' },
  { id: 6, name: 'Hotel 3', description: 'Description of hotel 3' }
])
</script>

<template>
  <main style="width: 100%; overflow-x: hidden;">

    <div
      class="container"
      style="width: 80%; margin: 0 auto; display: flex; flex-direction: column; align-items: center; padding: 40px 0; box-sizing: border-box;"
    >

      <section
        id="region-hero"
        style="height: 600px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 40px;"
      >
        <img
          :src="regionImage.src"
          :alt="regionImage.alt"
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"
        >
      </section>

      <section
        id="text-discover"
        style="min-height: 400px; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; text-align: center;"
      >
        <h1>{{ textDiscover.title }}</h1>
        <p style="max-width: 800px;">{{ textDiscover.content }}</p>
      </section>

      <RegionCarousel
        id="carousel-restaurants"
        :items="carouselRestaurants"
        style="width: 100%; margin-bottom: 60px;"
      />

      <section
        id="text-attraction"
        style="height: 800px; width: 80%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; text-align: center;"
      >
        <h2>{{ textAttraction.title }}</h2>
        <p>{{ textAttraction.content }}</p>
      </section>

      <RegionCarousel
        id="carousel-hotels"
        :items="carouselHotels"
      />
    </div>
  </main>
</template>
