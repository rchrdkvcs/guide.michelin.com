<script lang="ts" setup>
const { data: restaurants } = await useFetch("/api/restaurants", {
  query: { stars: "3", limit: 6, sort: "stars" },
});
</script>

<template>
  <UPageSection
    v-if="restaurants?.data?.length"
    title="Les tables d'exception"
    description="Trois étoiles — la plus haute distinction du Guide MICHELIN, réservée aux restaurants qui valent à eux seuls le voyage."
  >
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RestaurantCard
        v-for="r in restaurants.data"
        :key="r.objectID"
        :name="r.name"
        :description="r.main_desc"
        :city="r.city?.name ?? ''"
        :stars="r.distinction_score"
        :image="r.image"
        :slug="r.slug"
      />
    </div>

    <div class="mt-10 flex justify-center">
      <UButton
        label="Voir tous les restaurants"
        color="neutral"
        variant="ghost"
        to="/restaurants"
        trailing-icon="lucide:arrow-right"
      />
    </div>
  </UPageSection>
</template>
