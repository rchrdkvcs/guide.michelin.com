<script lang="ts" setup>
defineProps<{
  name: string;
  description: string;
  city: string;
  stars: number;
  image: string;
  tags?: string[];
  slug?: string;
}>();
</script>

<template>
  <NuxtLink
    :to="`/hotels/${slug ?? 'hotel'}`"
    class="group relative flex flex-col rounded-2xl overflow-hidden bg-elevated border border-default transition-shadow duration-300 h-full p-1 cursor-pointer"
  >
    <div class="relative w-full aspect-video overflow-hidden shrink-0 rounded-xl">
      <NuxtImg
        :src="image"
        :alt="name"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
    </div>

    <div class="flex flex-col flex-1 p-2 gap-2">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-base leading-tight line-clamp-1 flex-1">{{ name }}</h3>
        <div class="flex items-center gap-1 shrink-0">
          <NuxtImg
            v-for="i in stars"
            :key="i"
            src="/images/logo.png"
            alt="étoile Michelin"
            class="size-5 object-contain"
          />
        </div>
      </div>

      <p class="text-sm text-muted leading-snug line-clamp-3 flex-1">
        {{ description }}
      </p>

      <div class="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-default">
        <span class="text-xs text-muted flex items-center gap-1 shrink-0">
          <UIcon name="lucide:map-pin" class="size-3 shrink-0" />
          {{ city }}
        </span>

        <div class="flex items-center gap-1.5 flex-wrap justify-end">
          <UBadge
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            color="neutral"
            variant="subtle"
            size="sm"
          />

          <UButton
            icon="lucide:arrow-right"
            color="neutral"
            variant="ghost"
            size="xs"
            class="opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 shrink-0"
            aria-label="Voir l'hôtel"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
