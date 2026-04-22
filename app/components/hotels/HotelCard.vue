<script lang="ts" setup>
defineProps<{
  id: string;
  name: string;
  roomCount: number;
  previewImage?: string | null;
}>();
</script>

<template>
  <NuxtLink
    :to="`/hotels/${id}`"
    class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-default bg-elevated p-1 transition-shadow duration-300"
  >
    <div class="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl">
      <NuxtImg
        v-if="previewImage"
        :src="previewImage"
        :alt="name"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
      >
        <UIcon name="lucide:building" class="size-10 text-neutral-400" />
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-2 p-2">
      <div class="flex items-start justify-between gap-2">
        <h3 class="line-clamp-2 flex-1 text-base leading-tight font-semibold">{{ name }}</h3>
      </div>

      <div class="mt-auto flex items-center justify-between gap-2 border-t border-default pt-2">
        <span class="flex shrink-0 items-center gap-1 text-xs text-muted">
          <UIcon name="lucide:door-open" class="size-3 shrink-0" />
          {{ roomCount }} chambre{{ roomCount > 1 ? "s" : "" }}
        </span>

        <UButton
          icon="lucide:arrow-right"
          color="neutral"
          variant="ghost"
          size="xs"
          class="shrink-0 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-label="Voir l'hôtel"
        />
      </div>
    </div>
  </NuxtLink>
</template>
