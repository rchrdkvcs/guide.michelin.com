<script lang="ts" setup>
const { regionName } = useRoute().params;
const { data: adventure } = await useFetch("/api/adventure", {
  query: { id: regionName },
});
</script>

<template>
  <UContainer class="py-8 space-y-4">
    <div class="flex flex-col gap-2">
      <div class="w-full flex justify-between items-center">
        <h2 class="text-2xl font-medium leading-snug text-elevated">Les Hotels</h2>
        <UButton icon="lucide:filter" color="neutral" variant="ghost" />
      </div>
      <p class="text-sm text-muted leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aperiam aspernatur
        blanditiis deserunt dignissimos ea esse est facere fuga illo ipsum laborum minima natus
        quibusdam quidem quis quo sapiente. Minima.
      </p>
    </div>

    <div class="flex flex-row gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
      <HotelCard
        v-for="hotel in adventure?.hotels"
        :key="hotel.id"
        class="shrink-0 w-120 snap-start"
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
</template>
