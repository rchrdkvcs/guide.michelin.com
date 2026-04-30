<script setup lang="ts">
interface Adventure {
  slug: string;
  label: string;
  locationType: string;
  countryName: string | null;
  totalRestaurants: number;
  image: string | null;
}

defineProps<{
  adventure: Adventure;
}>();

const isFlipped = ref(false);
const isHovered = ref(false);

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const rotateDeg = ref(0);
const translateX = ref(0);
const translateY = ref(0);

onMounted(() => {
  rotateDeg.value = rand(-3.5, 3.5);
  translateX.value = rand(-4, 4);
  translateY.value = rand(-3, 3);
});

const cardStyle = computed(() =>
  isHovered.value
    ? {
        transform: "rotate(0deg) translate(0px, 0px)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }
    : {
        transform: `rotate(${rotateDeg.value}deg) translate(${translateX.value}px, ${translateY.value}px)`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
);
</script>

<template>
  <div
    class="perspective-1000 group aspect-3/2 cursor-pointer"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="toggleFlip"
  >
    <div
      class="preserve-3d relative h-full w-full transition-transform duration-500"
      :class="{ 'rotate-y-180': isFlipped }"
    >
      <!-- Front Side -->
      <div class="absolute inset-0 backface-hidden">
        <div class="h-full w-full border border-default bg-muted p-1 shadow-md">
          <div class="relative h-full w-full overflow-hidden">
            <NuxtImg
              v-if="adventure.image"
              :src="adventure.image"
              :alt="adventure.label"
              class="h-full w-full object-cover"
            />

            <div
              v-else
              class="flex h-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200"
            >
              <UIcon name="lucide:map" class="size-16 text-neutral-400" />
            </div>

            <div
              class="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/50 to-transparent"
            />

            <div
              class="absolute right-2 bottom-2 left-2 flex min-w-0 items-end justify-between gap-2 px-3 py-1.5"
            >
              <h3
                class="min-w-0 truncate text-sm tracking-widest text-inverted uppercase md:text-base"
              >
                {{ adventure.label }}
              </h3>
              <p class="shrink-0 font-mono text-xs text-inverted">
                {{ adventure.countryName ?? "FRANCE" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Side -->
      <div class="absolute inset-0 rotate-y-180 backface-hidden">
        <div class="size-full border border-default bg-muted p-2 shadow-md">
          <div
            class="grid h-full min-h-0 grid-cols-[1fr_1px_0.75fr] gap-3 overflow-hidden border border-primary p-2"
          >
            <!-- Left: Title / Message -->
            <div class="flex min-h-0 min-w-0 flex-col gap-2 overflow-hidden">
              <h3
                class="line-clamp-2 text-sm leading-snug font-semibold tracking-tight md:text-base"
              >
                {{ adventure.label }}
              </h3>
              <p
                class="line-clamp-4 font-serif text-xs leading-relaxed text-neutral-600 italic md:text-sm"
              >
                "Découvrez les {{ adventure.totalRestaurants }} restaurants étoilés de cette
                destination."
              </p>
            </div>

            <USeparator orientation="vertical" />

            <!-- Right: Address / CTA -->
            <div class="flex min-h-0 min-w-0 flex-col justify-between overflow-hidden">
              <!-- Stamp Area -->
              <div
                class="ml-auto flex h-14 w-12 shrink-0 items-center justify-center border-2 border-default bg-white"
              >
                <NuxtImg src="/images/logo.png" alt="Michelin" class="size-7 object-contain" />
              </div>

              <!-- Address Lines -->
              <div class="min-w-0 space-y-1">
                <div class="border-b border-dashed pb-0.5">
                  <span class="block truncate text-xs text-muted">{{ adventure.label }}</span>
                </div>
                <div class="border-b border-dashed pb-0.5">
                  <span class="text-xs text-muted">Guide MICHELIN</span>
                </div>
              </div>

              <!-- CTA + Close -->
              <div class="flex min-w-0 items-center justify-between gap-1">
                <UIcon
                  name="i-lucide-undo-2"
                  class="size-4 shrink-0 text-neutral-400 transition-colors hover:text-neutral-700"
                />
                <UButton
                  label="Découvrir"
                  :to="`/adventures/${adventure.slug}`"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  @click.stop
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1500px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
