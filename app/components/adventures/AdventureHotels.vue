<script lang="ts" setup>
interface Hotel {
  id: string;
  name: string;
  roomCount: number;
  previewImage: string | null;
  city?: string | null;
  distinctionScore?: number;
  criteriaStyle?: string | null;
  minPricePerNight?: number | null;
  maxPricePerNight?: number | null;
  isPlusEligible?: boolean;
}

defineProps<{
  hotels: Hotel[];
}>();
</script>

<template>
  <UContainer class="space-y-4 py-8">
    <div class="flex flex-col gap-2">
      <h2 class="text-elevated text-2xl leading-snug font-medium">Les Hôtels</h2>
    </div>

    <div
      v-if="hotels.length"
      class="no-scrollbar -mx-4 flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto px-4 pb-2"
    >
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.id"
        class="h-full w-[85vw] shrink-0 snap-start sm:w-80 lg:w-96"
        :id="hotel.id"
        :name="hotel.name"
        :room-count="hotel.roomCount"
        :preview-image="hotel.previewImage"
        :city="hotel.city"
        :distinction-score="hotel.distinctionScore"
        :criteria-style="hotel.criteriaStyle"
        :min-price-per-night="hotel.minPricePerNight"
        :max-price-per-night="hotel.maxPricePerNight"
        :is-plus-eligible="hotel.isPlusEligible"
      />
    </div>

    <div v-else class="py-12 text-center text-muted">
      Aucun hôtel disponible pour cette destination.
    </div>
  </UContainer>
</template>
