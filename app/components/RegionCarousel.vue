<script setup lang="ts">
import { ref, computed } from 'vue'

interface CarouselItem {
  id: number | string
  name: string
  description: string
  image?: string
  link?: string
}

const props = defineProps<{
  items: CarouselItem[]
  id?: string
}>()

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

const activeItem = computed(() => {
  return props.items[currentIndex.value] || { id: 0, name: '', description: '', image: '', link: '#' }
})
</script>

<template>
  <section
    :id="id"
    class="carousel-container"
    style="position: relative; height: 500px; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid brown; background: #000; border-radius: 12px;"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <img
        :key="activeItem.image"
        :src="activeItem.image || 'https://via.placeholder.com/800x500?text=No+Image'"
        :alt="activeItem.name"
        style="position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.6;"
      >
    </transition>

    <button
      class="nav-btn prev-btn"
      @click="prev"
    >
      &#10094;
    </button>

    <div
      class="carousel-content"
      style="position: relative; z-index: 5; text-align: center; color: white; padding: 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.8);"
    >
      <transition
        name="slide-up"
        mode="out-in"
      >
        <div :key="activeItem.id">
          <h2 style="font-size: 2.5rem; margin-bottom: 10px;">
            {{ activeItem.name }}
          </h2>
          <p style="font-size: 1.1rem; margin-bottom: 25px; max-width: 600px;">
            {{ activeItem.description }}
          </p>

          <a
            v-if="activeItem.link"
            :href="activeItem.link"
            class="details-link"
          >
            Voir le restaurant
          </a>
        </div>
      </transition>
    </div>

    <button
      class="nav-btn next-btn"
      @click="next"
    >
      &#10095;
    </button>

    <div class="dots-container">
      <span
        v-for="(_, index) in items"
        :key="index"
        :class="['dot', { active: index === currentIndex }]"
        @click="currentIndex = index"
      />
    </div>
  </section>
</template>

<style scoped>
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 15px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: brown;
  transform: translateY(-50%) scale(1.1);
}

.prev-btn { left: 20px; }
.next-btn { right: 20px; }

.details-link {
  display: inline-block;
  padding: 12px 30px;
  background-color: brown;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
}

.details-link:hover {
  background-color: #8b4513;
  transform: translateY(-3px);
}

.dots-container {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 8px;
  z-index: 10;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
.dot.active { background: brown; width: 25px; border-radius: 10px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-20px); }
</style>
