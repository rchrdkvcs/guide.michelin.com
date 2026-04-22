<script lang="ts" setup>
interface Hotel {
  id: string;
  name: string;
  roomCount: number;
  previewImage: string | null;
}

defineProps<{
  hotels: Hotel[];
}>();
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div class="flex flex-col gap-2">
      <h2 class="text-elevated text-2xl leading-snug font-medium">Les Hôtels</h2>
    </div>

    <div
      v-if="hotels.length"
      class="-mx-4 flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto px-4 pb-2"
    >
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.id"
        class="w-72 shrink-0 snap-start"
        :id="hotel.id"
        :name="hotel.name"
        :room-count="hotel.roomCount"
        :preview-image="hotel.previewImage"
      />
    </div>

    <div v-else class="py-12 text-center text-muted">
      Aucun hôtel disponible pour cette destination.
    </div>
  </UContainer>
</template>
