<script lang="ts" setup></script>

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

    <div class="flex flex-row gap-6 overflow-x-auto pb-4 h-96">
      <RestaurantCard
        class="shrink-0 w-1/3 h-full"
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
  </UContainer>
</template>
