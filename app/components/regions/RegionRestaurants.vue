<script lang="ts" setup>
const { regionName } = useRoute().params;
const { data: adventure } = await useFetch("/api/adventure", {
  query: { id: regionName },
});
</script>

<template>
  <UContainer class="py-8 space-y-8">
    <div class="flex flex-col gap-2">
      <div class="w-full flex justify-between items-center">
        <h2 class="text-2xl font-medium leading-snug text-elevated">Les restaurants</h2>
        <UButton icon="lucide:filter" color="neutral" variant="ghost" />
      </div>
      <p class="text-sm text-muted leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aperiam aspernatur
        blanditiis deserunt dignissimos ea esse est facere fuga illo ipsum laborum minima natus
        quibusdam quidem quis quo sapiente. Minima.
      </p>
    </div>

    <div class="flex flex-row gap-4 overflow-x-auto pb-2 h-96">
      <RestaurantCard
        class="shrink-0 w-[85vw] sm:w-80 lg:w-96 h-full"
        v-for="restaurant in adventure?.restaurants"
        :key="restaurant.id"
        :name="restaurant.name"
        :description="restaurant.description"
        :city="restaurant.city"
        :stars="restaurant.stars"
        :image="restaurant.image"
        :tags="restaurant.tags"
      />
    </div>

    <div class="w-full flex justify-center items-center">
      <UButton
        color="neutral"
        variant="ghost"
        label="Voir plus de restaurants"
        trailing-icon="lucide:arrow-right"
      />
    </div>
  </UContainer>
</template>
