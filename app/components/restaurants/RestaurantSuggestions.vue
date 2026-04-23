<script lang="ts" setup>
interface Restaurant {
  objectID: string;
  slug: string;
  name: string;
  main_desc: string;
  image: string;
  michelin_star: string | null;
  cuisines: { code: string; label: string; slug: string }[];
  city: { name: string; slug: string };
}

const props = defineProps<{
  restaurants: Restaurant[];
  currentSlug?: string;
}>();

const suggestions = computed(() =>
  props.restaurants.filter((r) => r.slug !== props.currentSlug).slice(0, 6),
);
</script>

<template>
  <UContainer v-if="suggestions.length" class="space-y-6 py-8">
    <h2 class="text-2xl font-semibold">Restaurants similaires</h2>

    <div class="no-scrollbar flex h-96 snap-x snap-mandatory flex-row gap-4 overflow-x-auto pb-2">
      <RestaurantCard
        v-for="r in suggestions"
        :key="r.objectID"
        class="h-full w-[85vw] shrink-0 snap-start sm:w-72 lg:w-80"
        :name="r.name"
        :description="r.main_desc"
        :city="r.city?.name ?? ''"
        :stars="starCount(r.michelin_star)"
        :image="r.image"
        :tags="r.cuisines?.slice(0, 2).map((c: { label: any; }) => c.label)"
        :slug="r.slug"
      />
    </div>
  </UContainer>
</template>
