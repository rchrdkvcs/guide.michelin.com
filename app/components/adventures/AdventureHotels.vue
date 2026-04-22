<script lang="ts" setup>
const { adventureName } = useRoute().params;
const { data: adventure } = await useFetch("/api/adventure", {
  query: { id: adventureName },
});
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div class="flex flex-col gap-2">
      <div class="flex w-full items-center justify-between">
        <h2 class="text-elevated text-2xl leading-snug font-medium">Les Hotels</h2>
        <UButton icon="lucide:filter" color="neutral" variant="ghost" />
      </div>
      <p class="text-sm leading-relaxed text-muted">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aperiam aspernatur
        blanditiis deserunt dignissimos ea esse est facere fuga illo ipsum laborum minima natus
        quibusdam quidem quis quo sapiente. Minima.
      </p>
    </div>

    <div class="-mx-4 flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto px-4 pb-2">
      <HotelCard
        v-for="hotel in adventure?.hotels"
        :key="hotel.id"
        class="w-120 shrink-0 snap-start"
        :name="hotel.name"
        :description="hotel.description"
        :city="hotel.city"
        :stars="hotel.stars"
        :image="hotel.image"
        :tags="hotel.tags"
        :slug="hotel.slug"
      />
    </div>

    <div class="flex w-full items-center justify-center">
      <UButton
        color="neutral"
        variant="ghost"
        label="Voir plus d'hotels"
        trailing-icon="lucide:arrow-right"
      />
    </div>
  </UContainer>
</template>
