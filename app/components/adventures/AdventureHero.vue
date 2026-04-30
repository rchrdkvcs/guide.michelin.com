<script lang="ts" setup>
interface Adventure {
  slug: string;
  label: string;
  locationType: string;
  countryName: string | null;
  totalRestaurants: number;
  image: string | null;
}

defineProps<{ adventure: Adventure }>();
</script>

<template>
  <UContainer class="mt-20">
    <div class="relative aspect-video w-full overflow-hidden rounded-2xl">
      <NuxtImg
        v-if="adventure.image"
        :src="adventure.image"
        :alt="adventure.label"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-200 to-neutral-300"
      >
        <UIcon name="lucide:map" class="size-24 text-neutral-400" />
      </div>
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 to-transparent" />
      <div class="absolute inset-0 z-10 flex items-end justify-center pb-8">
        <h1 class="bordered-text w-full text-center font-bold tracking-wide capitalize">
          {{ adventure.label }}
        </h1>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
.bordered-text {
  font-size: 6rem;
  color: transparent;
  -webkit-text-stroke: 1px white;
}
</style>
