<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug as string;

const { data: restaurant, error } = await useFetch(`/api/restaurants/${slug}`);

if (error.value) {
  throw createError({ statusCode: 404, message: "Restaurant introuvable" });
}

const regionSlug = computed(() => restaurant.value?.region?.slug);
const { data: suggestionsData } = useLazyFetch("/api/restaurants", {
  query: computed(() => ({
    region: regionSlug.value,
    limit: 7,
  })),
});

const suggestions = computed(
  () => suggestionsData.value?.data?.filter((r: { slug: string }) => r.slug !== slug) ?? [],
);

const hotelSelection = computed(() => restaurant.value?.hotel_selection ?? null);
</script>

<template>
  <div v-if="restaurant">
    <RestaurantDetails :restaurant="restaurant" />
    <RestaurantSuggestions :restaurants="suggestions" :current-slug="slug" />
    <HotelSuggestions :hotel="hotelSelection" />
  </div>
</template>