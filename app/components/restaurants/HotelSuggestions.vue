<script lang="ts" setup>
interface HotelSelection {
  id: string;
  name: string;
  slug: string;
  picture: string;
}

defineProps<{
  hotel: HotelSelection | null;
}>();
</script>

<template>
  <UContainer v-if="hotel" class="space-y-6 py-8">
    <h2 class="text-2xl font-semibold">Hôtel associé</h2>
    <NuxtLink
      :to="`/hotels/${hotel.id}`"
      class="group flex items-center gap-4 rounded-2xl border border-default bg-elevated p-4 transition-shadow hover:shadow-md"
    >
      <div class="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
        <NuxtImg
          v-if="hotel.picture"
          :src="hotel.picture"
          :alt="hotel.name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div v-else class="flex h-full items-center justify-center bg-muted">
          <UIcon name="lucide:building" class="size-6 text-muted" />
        </div>
      </div>
      <div class="flex-1">
        <h3 class="font-semibold">{{ hotel.name }}</h3>
        <p class="text-sm text-muted">Hôtel sélectionné par le Guide Michelin</p>
      </div>
      <UButton
        icon="lucide:arrow-right"
        color="neutral"
        variant="ghost"
        class="shrink-0"
        aria-label="Voir l'hôtel"
      />
    </NuxtLink>
  </UContainer>
</template>
