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
    class="perspective-1000 group aspect-3/2 h-full shrink-0 cursor-pointer"
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
              class="flex h-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
            >
              <UIcon name="lucide:map" class="size-16 text-neutral-400" />
            </div>

            <div
              class="absolute right-2 bottom-2 left-2 flex items-center justify-between px-4 py-2"
            >
              <h3 class="text-xl tracking-widest text-inverted uppercase">
                {{ adventure.label }}
              </h3>
              <p class="font-mono text-sm text-inverted">
                {{ adventure.countryName ?? "FRANCE" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Side -->
      <div class="absolute inset-0 rotate-y-180 backface-hidden">
        <div
          class="grid size-full items-center justify-center border border-default bg-muted p-2 shadow-md"
        >
          <div class="grid size-full grid-cols-[1fr_1px_0.75fr] gap-4 border border-primary p-3">
            <!-- Left: Title / Message -->
            <div class="flex size-full flex-col gap-4">
              <h3 class="text-xl leading-snug font-semibold tracking-tight">
                {{ adventure.label }}
              </h3>
              <p class="line-clamp-4 font-serif text-lg leading-relaxed text-neutral-600 italic">
                "Découvrez les {{ adventure.totalRestaurants }} restaurants étoilés de cette
                destination."
              </p>
            </div>

            <USeparator orientation="vertical" class="bg-muted" />

            <!-- Right: Address / CTA -->
            <div class="relative flex flex-col gap-8">
              <!-- Stamp Area -->
              <div
                class="ml-auto flex h-24 w-20 items-center justify-center border-2 border-default bg-white"
              >
                <NuxtImg src="/images/logo.png" alt="Michelin" class="size-10 object-contain" />
              </div>

              <!-- Address Lines -->
              <div class="space-y-4">
                <div class="border-elevated border-b border-dashed pb-1">
                  <span class="text-sm text-muted">{{ adventure.label }}</span>
                </div>
                <div class="border-elevated border-b border-dashed pb-1">
                  <span class="text-sm text-muted">Guide MICHELIN</span>
                </div>
              </div>

              <!-- CTA -->
              <div class="mt-auto self-end">
                <UButton
                  label="Découvrir en détail"
                  :to="`/adventures/${adventure.slug}`"
                  color="neutral"
                  variant="ghost"
                  @click.stop
                />
              </div>

              <!-- Close icon -->
              <div class="absolute bottom-0 left-0">
                <UIcon
                  name="i-lucide-undo-2"
                  class="size-5 text-neutral-400 transition-colors hover:text-neutral-700"
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
