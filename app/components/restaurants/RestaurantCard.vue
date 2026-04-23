<script lang="ts" setup>
defineProps<{
  name: string;
  description: string;
  city: string;
  stars: number;
  image: string;
  tags?: string[];
  slug: string;
}>();
</script>

<template>
  <NuxtLink
    :to="`/restaurants/${slug}`"
    class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-default bg-elevated p-1 transition-shadow duration-300"
  >
    <div class="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl">
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="name"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      <div v-else class="absolute inset-0 flex items-center justify-center bg-muted">
        <UIcon name="lucide:utensils" class="size-12 text-muted" />
      </div>

      <UButton
        icon="lucide:arrow-right"
        color="neutral"
        variant="subtle"
        size="xs"
        class="absolute top-2 right-2 shrink-0 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        aria-label="Voir le restaurant"
      />
    </div>

    <div class="flex flex-1 flex-col gap-2 p-2">
      <div class="flex items-start justify-between gap-2">
        <h3 class="line-clamp-1 flex-1 text-base leading-tight font-semibold">{{ name }}</h3>
        <div v-if="stars > 0" class="flex shrink-0 items-center gap-1">
          <NuxtImg
            v-for="i in stars"
            :key="i"
            src="/images/logo.png"
            alt="étoile Michelin"
            class="size-5 object-contain"
          />
        </div>
      </div>

      <p class="line-clamp-3 flex-1 text-sm leading-snug text-muted">
        {{ description }}
      </p>

      <div class="mt-auto flex items-center justify-between gap-2 border-t border-default pt-2">
        <span class="flex shrink-0 items-center gap-1 text-xs text-muted">
          <UIcon name="lucide:map-pin" class="size-3 shrink-0" />
          {{ city }}
        </span>

        <div class="flex flex-wrap items-center justify-end gap-1.5">
          <UBadge
            v-for="tag in tags?.slice(0, 2)"
            :key="tag"
            :label="tag"
            color="neutral"
            variant="subtle"
            size="sm"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
