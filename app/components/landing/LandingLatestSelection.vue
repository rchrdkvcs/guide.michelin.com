<script lang="ts" setup>
const { data: selections } = await useFetch("/api/selections");

const activeIndex = ref(0);
const activeItem = computed(() => selections.value?.[activeIndex.value]);
const total = computed(() => selections.value?.length ?? 0);

const containerRef = ref<HTMLElement | null>(null);

function onScroll() {
  if (!containerRef.value || total.value === 0) return;
  const { top, height } = containerRef.value.getBoundingClientRect();
  const scrollable = height - window.innerHeight;
  const scrolled = Math.max(0, -top);
  const progress = Math.min(scrolled / scrollable, 1);
  activeIndex.value = Math.min(Math.floor(progress * total.value), total.value - 1);
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <UContainer>
    <div ref="containerRef" :style="{ height: `${(total + 1) * 100}vh` }">
      <div class="sticky top-0 h-screen overflow-hidden flex">
        <!-- Titre vertical (fully sticky) -->
        <div class="flex flex-col gap-8 items-center justify-center shrink-0 px-4">
          <NuxtImg src="/images/logo.png" class="size-8 object-contain" />
          <h3 class="text-4xl font-bold [writing-mode:vertical-rl] rotate-180 uppercase">
            Nouvelles sélections
          </h3>
          <NuxtImg src="/images/logo.png" class="size-8 object-contain" />
        </div>

        <!-- Panneau principal -->
        <div class="flex-1 flex gap-8 items-center px-4">
          <!-- Gauche: image de la ville (sticky) -->
          <div class="w-1/2 h-[75vh] relative rounded-2xl overflow-hidden shadow-xl shrink-0">
            <Transition name="fade" mode="out-in">
              <NuxtImg
                :key="activeItem?.id"
                :src="activeItem?.image"
                :alt="activeItem?.imageAlt"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </Transition>
            <div class="absolute inset-0 bg-muted pointer-events-none" />
            <Transition name="slide-up" mode="out-in">
              <div :key="activeItem?.id" class="absolute bottom-6 left-6 text-white">
                <p class="text-xs uppercase tracking-widest opacity-60 mb-1">
                  {{ activeItem?.country }}
                </p>
                <h2 class="text-4xl font-bold">{{ activeItem?.city }}</h2>
                <p class="text-sm opacity-70 mt-1">
                  {{ activeItem?.totalStarred }} restaurants étoilés
                </p>
              </div>
            </Transition>
            <!-- Progress -->
            <div class="absolute top-4 right-4 flex flex-col gap-2">
              <div
                v-for="(_, i) in selections"
                :key="i"
                class="w-1.5 rounded-full transition-all duration-300"
                :class="i === activeIndex ? 'h-6 bg-white' : 'h-1.5 bg-white/40'"
              />
            </div>
          </div>

          <!-- Droite: tous les restos de la destination active -->
          <div class="flex-1 h-[75vh] overflow-hidden">
            <Transition name="panel" mode="out-in">
              <div :key="activeItem?.id" class="h-full flex flex-col gap-4 justify-center">
                <div
                  v-for="restaurant in activeItem?.restaurants"
                  :key="restaurant.id"
                  class="flex flex-col gap-4 rounded-xl overflow-hidden bg-elevated"
                >
                  <NuxtImg
                    :src="restaurant.image"
                    :alt="restaurant.name"
                    class="w-full aspect-video object-cover shrink-0"
                  />
                  <div class="py-3 pr-4 flex flex-col justify-center">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-semibold text-base">{{ restaurant.name }}</h4>
                      <span class="text-yellow-500 text-sm">{{
                        "★".repeat(restaurant.stars)
                      }}</span>
                    </div>
                    <p class="text-sm text-neutral-500 leading-snug">
                      {{ restaurant.description }}
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.panel-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
