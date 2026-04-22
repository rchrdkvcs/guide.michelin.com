<script lang="ts" setup>
const page = ref(1);
const { data } = await useFetch("/api/hotels", { query: { page, limit: 20 } });
const hotels = computed(() => data.value?.data ?? []);
const meta = computed(() => data.value?.meta ?? { page: 1, totalPages: 1, total: 0 });
</script>

<template>
  <div>
    <UPageHero
      title="Hôtels"
      description="Découvrez les hôtels d'exception sélectionnés par le Guide Michelin, pour des séjours inoubliables."
    />

    <UContainer class="py-12">
      <div class="mb-4 text-sm text-muted">{{ meta.total }} hôtels</div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <HotelCard
          v-for="hotel in hotels"
          :key="hotel.id"
          :id="hotel.id"
          :name="hotel.name"
          :room-count="hotel.roomCount"
          :preview-image="hotel.previewImage"
        />
      </div>

      <div v-if="meta.totalPages > 1" class="mt-10 flex items-center justify-center gap-4">
        <UButton
          :disabled="page <= 1"
          color="neutral"
          variant="ghost"
          icon="lucide:arrow-left"
          label="Précédent"
          @click="page--"
        />
        <span class="text-sm text-muted">Page {{ page }} / {{ meta.totalPages }}</span>
        <UButton
          :disabled="page >= meta.totalPages"
          color="neutral"
          variant="ghost"
          label="Suivant"
          trailing-icon="lucide:arrow-right"
          @click="page++"
        />
      </div>
    </UContainer>
  </div>
</template>