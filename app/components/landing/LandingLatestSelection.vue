<script lang="ts" setup>
const { data: selections } = await useFetch("/api/selections");

const activeIndex = ref(0);
const activeItem = computed(() => selections.value?.[activeIndex.value]);
const total = computed(() => selections.value?.length ?? 0);

const containerRef = ref<HTMLElement | null>(null);

// Mobile-specific active index (controlled by tapping city cards)
const mobileActiveIndex = ref(0);
const mobileActiveItem = computed(() => selections.value?.[mobileActiveIndex.value]);

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
    <!-- ─── Mobile layout (< lg) ─────────────────────────── -->
    <div class="lg:hidden py-12 space-y-8">
      <div class="flex items-center gap-3">
        <NuxtImg src="/images/logo.png" class="size-6 object-contain" />
        <h3 class="text-2xl font-bold uppercase">Nouvelles sélections</h3>
      </div>

      <!-- Horizontal swipeable city cards -->
      <div class="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 gap-4 pb-2">
        <button
          v-for="(item, i) in selections"
          :key="item.id"
          class="relative h-56 w-[80vw] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg focus:outline-none"
          :class="i === mobileActiveIndex ? 'ring-2 ring-white ring-offset-2' : ''"
          @click="mobileActiveIndex = i"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.imageAlt"
            class="h-full w-full object-cover transition-transform duration-300"
            :class="i === mobileActiveIndex ? 'scale-105' : 'scale-100'"
          />
          <span class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div class="absolute bottom-4 left-4 text-left text-white">
            <p class="text-xs tracking-widest uppercase opacity-60">{{ item.country }}</p>
            <h4 class="text-xl font-bold">{{ item.city }}</h4>
            <p class="text-sm opacity-70">{{ item.totalStarred }} restaurants étoilés</p>
          </div>
          <!-- Active dot -->
          <span
            v-if="i === mobileActiveIndex"
            class="absolute top-3 right-3 size-2.5 rounded-full bg-white shadow"
          />
        </button>
      </div>

      <!-- Restaurant cards for active city -->
      <Transition name="panel" mode="out-in">
        <div :key="mobileActiveItem?.id" class="space-y-3">
          <RestaurantCard
            v-for="restaurant in mobileActiveItem?.restaurants?.slice(0, 3)"
            :key="restaurant.id"
            :name="restaurant.name"
            :description="restaurant.description"
            :city="mobileActiveItem?.city ?? ''"
            :stars="restaurant.stars"
            :image="restaurant.image"
            :slug="restaurant.slug ?? ''"
          />
        </div>
      </Transition>
    </div>

    <!-- ─── Desktop layout (≥ lg): sticky-scroll ─────────── -->
    <div ref="containerRef" class="hidden lg:block" :style="{ height: `${(total + 1) * 100}vh` }">
      <div class="sticky top-0 flex h-screen overflow-hidden">
        <!-- Titre vertical (fully sticky) -->
        <div class="flex shrink-0 flex-col items-center justify-center gap-8 px-4">
          <NuxtImg src="/images/logo.png" class="size-8 object-contain" />
          <h3 class="rotate-180 text-4xl font-bold uppercase [writing-mode:vertical-rl]">
            Nouvelles sélections
          </h3>
          <NuxtImg src="/images/logo.png" class="size-8 object-contain" />
        </div>

        <!-- Panneau principal -->
        <div class="flex flex-1 items-center gap-8 px-4">
          <!-- Gauche: image de la ville (sticky) -->
          <div class="relative h-[75vh] w-1/2 shrink-0 overflow-hidden rounded-2xl shadow-xl">
            <Transition name="fade" mode="out-in">
              <NuxtImg
                :key="activeItem?.id"
                :src="activeItem?.image"
                :alt="activeItem?.imageAlt"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </Transition>
            <div class="pointer-events-none absolute inset-0 bg-muted" />
            <Transition name="slide-up" mode="out-in">
              <div :key="activeItem?.id" class="absolute bottom-6 left-6 text-white">
                <p class="mb-1 text-xs tracking-widest uppercase opacity-60">
                  {{ activeItem?.country }}
                </p>
                <h2 class="text-4xl font-bold">{{ activeItem?.city }}</h2>
                <p class="mt-1 text-sm opacity-70">
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
          <div class="h-[75vh] flex-1 overflow-hidden">
            <Transition name="panel" mode="out-in">
              <div :key="activeItem?.id" class="flex h-full flex-col justify-center gap-4">
                <RestaurantCard
                  v-for="restaurant in activeItem?.restaurants"
                  :key="restaurant.id"
                  :name="restaurant.name"
                  :description="restaurant.description"
                  :city="activeItem?.city ?? ''"
                  :stars="restaurant.stars"
                  :image="restaurant.image"
                  :slug="restaurant.slug ?? ''"
                />
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
