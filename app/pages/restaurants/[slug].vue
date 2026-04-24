<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug as string;

const { data: restaurant, error } = await useFetch(`/api/restaurants/${slug}`);

if (error.value) {
  throw createError({ statusCode: 404, message: "Restaurant introuvable" });
}

useSeoMeta({
  title: () => restaurant.value?.name ?? "Restaurant",
  description: () =>
    restaurant.value?.main_desc
      ? restaurant.value.main_desc.slice(0, 160)
      : `Découvrez ${restaurant.value?.name ?? "ce restaurant"} sélectionné par le Guide MICHELIN.`,
  ogTitle: () =>
    restaurant.value ? `${restaurant.value.name} · Guide MICHELIN` : "Restaurant · Guide MICHELIN",
  ogDescription: () =>
    restaurant.value?.main_desc
      ? restaurant.value.main_desc.slice(0, 160)
      : `Découvrez ${restaurant.value?.name ?? "ce restaurant"} sélectionné par le Guide MICHELIN.`,
  ogImage: () => restaurant.value?.image || "/images/hero.png",
  ogType: "restaurant",
});

useHead({
  script: computed(() => {
    if (!restaurant.value) return [];
    const r = restaurant.value;
    const addressParts = [r.street, r.postcode, r.city?.name].filter(Boolean);
    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: r.name,
      description: r.main_desc ?? undefined,
      image: r.image ?? undefined,
      url: r.website ?? undefined,
      telephone: r.phone ?? undefined,
      address: addressParts.length
        ? {
            "@type": "PostalAddress",
            streetAddress: r.street ?? undefined,
            postalCode: r.postcode ?? undefined,
            addressLocality: r.city?.name ?? undefined,
            addressRegion: r.region?.name ?? undefined,
          }
        : undefined,
      servesCuisine: r.cuisines?.map((c: { label: string }) => c.label) ?? undefined,
      priceRange: (() => {
        const { low, high } = r.price ?? {};
        const sym = r.currency_symbol ?? "€";
        if (low && high) return `${sym}${low} – ${sym}${high}`;
        if (low) return `${sym}${low}+`;
        return undefined;
      })(),
    };
    return [{ type: "application/ld+json", innerHTML: JSON.stringify(schema) }];
  }),
});

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