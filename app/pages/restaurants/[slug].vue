<script lang="ts" setup>
interface Restaurant {
  slug: string;
  name: string;
  main_desc: string;
  image: string;
  michelin_star: string | null;
  distinction: { label: string; slug: string } | null;
  cuisines: { code: string; label: string; slug: string }[];
  city: { name: string; slug: string };
  region: { name: string; slug: string };
  street: string;
  postcode: string;
  phone: string;
  website: string;
  chef: string;
  price: { high: number | null; low: number | null };
  currency_symbol: string;
  hours_of_operation: Record<string, { closed: boolean; opens: string; closes: string }[]>;
  days_open: string[];
  meal_times: string[];
  online_booking: number;
  booking_url: string;
  hotel_selection: {
    id: string;
    name: string;
    slug: string;
    city_slug: string;
    picture: string;
    distinction_score: number;
  } | null;
}

const route = useRoute();
const slug = route.params.slug as string;

const { data: restaurant, error } = await useFetch<Restaurant>(`/api/restaurants/${slug}`);

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
  ogType: "website",
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
