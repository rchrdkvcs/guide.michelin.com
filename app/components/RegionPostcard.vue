<script setup lang="ts">
interface Adventure {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  svgPath: string;
}

defineProps<{
  adventure: Adventure;
}>();

const isFlipped = ref(false);
const isHovered = ref(false);

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

// Organic random helpers
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const rotateDeg = rand(-3.5, 3.5);
const translateX = rand(-4, 4);
const translateY = rand(-3, 3);

const cardStyle = computed(() =>
  isHovered.value
    ? {
        transform: "rotate(0deg) translate(0px, 0px)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }
    : {
        transform: `rotate(${rotateDeg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
);
</script>

<template>
  <div
    class="perspective-1000 h-full aspect-3/2 cursor-pointer group shrink-0"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="toggleFlip"
  >
    <div
      class="relative w-full h-full transition-transform duration-500 preserve-3d"
      :class="{ 'rotate-y-180': isFlipped }"
    >
      <!-- Front Side -->
      <div class="absolute inset-0 backface-hidden">
        <div class="w-full h-full bg-muted p-1 shadow-md border border-default">
          <div class="w-full h-full relative overflow-hidden">
            <NuxtImg
              :src="adventure.image"
              :alt="adventure.name"
              class="w-full h-full object-cover"
            />

            <!-- Subtitle/title overlay like a vintage postcard -->
            <div
              class="absolute bottom-2 left-2 right-2 px-4 py-2 flex items-center justify-between"
            >
              <h3 class="text-inverted text-xl uppercase tracking-widest">
                {{ adventure.name }}
              </h3>
              <p class="text-inverted text-sm font-mono">FRANCE</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Side -->
      <div class="absolute inset-0 backface-hidden rotate-y-180">
        <div
          class="size-full bg-muted p-2 shadow-md border border-default grid justify-center items-center"
        >
          <div class="size-full border border-primary grid grid-cols-[1fr_1px_0.75fr] gap-4 p-3">
            <!-- Left: Title / Message -->
            <div class="size-full flex flex-col gap-4">
              <h3 class="text-xl font-semibold leading-snug tracking-tight">
                {{ adventure.name }}
              </h3>
              <p class="text-neutral-600 font-serif italic text-lg leading-relaxed line-clamp-4">
                "{{ adventure.description }}"
              </p>
            </div>

            <USeparator orientation="vertical" class="bg-muted" />

            <!-- Right: Address / CTA -->
            <div class="flex flex-col relative gap-8">
              <!-- Stamp Area -->
              <div
                class="w-20 h-24 border-2 border-default flex items-center justify-center bg-white ml-auto"
              >
                <UIcon name="lucide:stamp" class="size-8 text-neutral-400" />
              </div>

              <!-- Address Lines -->
              <div class="space-y-4">
                <div class="border-b border-elevated border-dashed pb-1">
                  <span class="text-muted text-sm">{{ adventure.name }}</span>
                </div>
                <div class="border-b border-elevated border-dashed pb-1">
                  <span class="text-muted text-sm">Guide MICHELIN</span>
                </div>
              </div>

              <!-- CTA -->
              <div class="mt-auto self-end">
                <UButton
                  label="Découvrir en détail"
                  :to="adventure.link"
                  color="neutral"
                  variant="ghost"
                  @click.stop
                />
              </div>

              <!-- Close icon -->
              <div class="absolute bottom-0 left-0">
                <UIcon
                  name="i-lucide-undo-2"
                  class="size-5 text-neutral-400 hover:text-neutral-700 transition-colors"
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
