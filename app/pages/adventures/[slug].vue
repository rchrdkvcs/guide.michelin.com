<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

const page = computed(() => Number(route.query.page ?? 1));

const { data, error } = await useFetch(`/api/adventures/${slug}`, {
  query: computed(() => ({ page: page.value, limit: 12 })),
});

if (error.value) {
  throw createError({ statusCode: 404, message: "Aventure introuvable" });
}

const adventure = computed(() => data.value?.adventure);
const restaurants = computed(() => data.value?.restaurants?.data ?? []);
const restaurantsMeta = computed(() => data.value?.restaurants?.meta ?? { page: 1, limit: 12, total: 0, totalPages: 1 });
const hotels = computed(() => data.value?.hotels?.data ?? []);

const cuisines = computed(() => {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const r of restaurants.value) {
    for (const c of (r.cuisines ?? [])) {
      if (!seen.has(c.label)) {
        seen.add(c.label);
        result.push(c.label);
      }
    }
    if (result.length >= 10) break;
  }
  return result;
});

function onPageChange(p: number) {
  router.replace({ query: { ...route.query, page: p } });
}
</script>

<template>
  <div v-if="adventure">
    <AdventureHero :adventure="adventure" />
    <AdventureDescription :adventure="adventure" :cuisines="cuisines" />
    <AdventureRestaurants
      :restaurants="restaurants"
      :meta="restaurantsMeta"
      :adventure-slug="slug"
      @page-change="onPageChange"
    />
    <AdventureHotels :hotels="hotels" />
  </div>
</template>