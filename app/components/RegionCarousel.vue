<script setup lang="ts">
import { ref, computed } from "vue";

interface CarouselItem {
  id: number | string;
  name: string;
  description: string;
  image?: string;
  link?: string;
  svgPath?: string;
}

const props = defineProps<{
  items: CarouselItem[];
  id?: string;
}>();

const currentIndex = defineModel<number>({ default: 0 });

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
};

const activeItem = computed(() => {
  return (
    props.items[currentIndex.value] || { id: 0, name: "", description: "", image: "", link: "#" }
  );
});
</script>

<template>
  <section
    :id="id"
    class="relative group h-[550px] w-full flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl bg-slate-900"
  >
    <!-- Background Image -->
    <NuxtImg
      :key="activeItem.image"
      :src="activeItem.image || 'https://via.placeholder.com/1200x800?text=No+Image'"
      :alt="activeItem.name"
      class="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
    />

    <!-- Navigation -->
    <button
      class="absolute left-6 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
      @click="prev"
    >
      <span class="iconify i-lucide:chevron-left size-8"></span>
    </button>

    <div class="relative z-20 w-full max-w-2xl px-12 py-10 text-center text-white space-y-6">
      <div :key="activeItem.id" class="space-y-6 flex flex-col items-center">
        <!-- Regional SVG Icon -->
        <div
          v-if="activeItem.svgPath"
          class="mb-4 group-hover:scale-110 transition-transform duration-500"
        >
          <svg viewBox="0 0 100 100" class="w-24 h-24 text-red-500 drop-shadow-lg fill-current">
            <path :d="activeItem.svgPath" />
          </svg>
        </div>

        <h3 class="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
          {{ activeItem.name }}
        </h3>
      </div>
      <p class="text-lg md:text-xl text-white/90 max-w-lg mx-auto leading-relaxed drop-shadow-md">
        {{ activeItem.description }}
      </p>
      <div class="pt-4">
        <NuxtLink
          v-if="activeItem.link"
          :to="activeItem.link"
          class="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-xl active:scale-95 group/btn"
        >
          <span>Découvrir</span>
          <span
            class="iconify i-lucide:arrow-right size-5 transition-transform group-hover/btn:translate-x-1"
          ></span>
        </NuxtLink>
      </div>
    </div>

    <button
      class="absolute right-6 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 active:scale-90"
      @click="next"
    >
      <span class="iconify i-lucide:chevron-right size-8"></span>
    </button>

    <!-- Progress Indicators -->
    <div class="absolute bottom-8 left-0 w-full flex justify-center gap-3 z-30">
      <button
        v-for="(_, index) in items"
        :key="index"
        class="h-1.5 transition-all duration-300 rounded-full"
        :class="index === currentIndex ? 'w-10 bg-red-600' : 'w-4 bg-white/30 hover:bg-white/50'"
        @click="currentIndex = index"
      />
    </div>
  </section>
</template>

<style scoped>
/* Clean styles */
</style>
