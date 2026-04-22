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
        <h2 class="text-elevated text-2xl leading-snug font-medium">Les restaurants</h2>
        <UButton icon="lucide:filter" color="neutral" variant="ghost" />
      </div>
      <p class="text-sm leading-relaxed text-muted">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aperiam aspernatur
        blanditiis deserunt dignissimos ea esse est facere fuga illo ipsum laborum minima natus
        quibusdam quidem quis quo sapiente. Minima.
      </p>
    </div>

    <div class="flex h-96 flex-row gap-4 overflow-x-auto pb-2">
      <RestaurantCard
        class="h-full w-[85vw] shrink-0 sm:w-80 lg:w-96"
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

    <div class="flex w-full items-center justify-center">
      <UButton
        color="neutral"
        variant="ghost"
        label="Voir plus de restaurants"
        trailing-icon="lucide:arrow-right"
      />
    </div>
  </UContainer>
</template>
