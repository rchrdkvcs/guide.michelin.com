<script setup lang="ts">
interface CarouselItem {
  id: number | string
  name: string
  description: string
}

defineProps<{
  items: CarouselItem[]
  id?: string
}>()
</script>

<template>
  <section
    :id="id"
    style="height: 800px; display: flex; flex-direction: row; justify-content: space-evenly; align-items: center; flex-wrap: wrap; width: 100%; box-sizing: border-box; padding: 20px;"
  >
    <span
      v-for="item in items"
      :key="item.id"
      class="carousel-item"
      style="flex: 1 1 250px; text-align: center; display: flex; flex-direction: column;"
    >
      <strong>{{ item.name }}</strong>
      <span>{{ item.description }}</span>
    </span>
  </section>
</template>
