<script lang="ts" setup>
const { data: hotels } = await useFetch("/api/hotels");
</script>

<template>
  <div>
    <UPageHero
      title="Hôtels"
      description="Découvrez les hôtels d'exception sélectionnés par le Guide Michelin, pour des séjours inoubliables."
    />

    <UContainer class="py-12">
      <div class="grid grid-cols-1 gap-4">
        <HotelCard
          v-for="hotel in hotels"
          :key="hotel.id"
          :name="hotel.name"
          :description="hotel.description"
          :city="hotel.city"
          :stars="hotel.stars"
          :image="hotel.image"
          :tags="hotel.tags"
          :slug="hotel.slug"
        />
      </div>
    </UContainer>
  </div>
</template>
