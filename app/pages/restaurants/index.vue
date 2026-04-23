<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const LIMIT = 24;

const page = computed(() => Number(route.query.page ?? 1));
const q = computed(() => (route.query.q as string) ?? "");
const stars = computed(() => (route.query.stars as string) ?? "");
const cuisine = computed(() => (route.query.cuisine as string) ?? "");
const country = computed(() => (route.query.country as string) ?? "");
const sort = computed(() => (route.query.sort as string) ?? "name");
const order = computed(() => (route.query.order as string) ?? "asc");

const { data: filtersData } = await useFetch("/api/restaurants/filters");

const { data, pending } = await useFetch("/api/restaurants", {
  query: computed(() => ({
    page: page.value,
    limit: LIMIT,
    name: q.value || undefined,
    stars: stars.value || undefined,
    cuisine: cuisine.value || undefined,
    country: country.value || undefined,
    sort: sort.value !== "name" ? sort.value : undefined,
    order: order.value !== "asc" ? order.value : undefined,
  })),
});

const restaurants = computed(() => data.value?.data ?? []);
const meta = computed(() => data.value?.meta ?? { page: 1, limit: LIMIT, total: 0, totalPages: 1 });

// Search
const searchInput = ref(q.value);
let searchTimer: ReturnType<typeof setTimeout>;
watch(q, (val) => { searchInput.value = val; });
function onSearch(val: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => updateQuery({ q: val || undefined, page: undefined }), 300);
}

// Selects
const cuisineLabels = computed(() => (filtersData.value?.cuisines ?? []).map((c) => c.label));
const countryNames = computed(() => (filtersData.value?.countries ?? []).map((c) => c.name));
const selectedCuisineLabel = ref<string | null>(null);
const selectedCountryName = ref<string | null>(null);

watchEffect(() => {
  if (filtersData.value) {
    selectedCuisineLabel.value = cuisine.value
      ? (filtersData.value.cuisines.find((c) => c.slug === cuisine.value)?.label ?? null)
      : null;
    selectedCountryName.value = country.value
      ? (filtersData.value.countries.find((c) => c.slug === country.value)?.name ?? null)
      : null;
  }
});

watch(selectedCuisineLabel, (label) => {
  const slug = label ? (filtersData.value?.cuisines.find((c) => c.label === label)?.slug ?? "") : "";
  if (slug !== cuisine.value) updateQuery({ cuisine: slug || undefined, page: undefined });
});
watch(selectedCountryName, (name) => {
  const slug = name ? (filtersData.value?.countries.find((c) => c.name === name)?.slug ?? "") : "";
  if (slug !== country.value) updateQuery({ country: slug || undefined, page: undefined });
});

// Sort
const sortOptions = [
  { label: "Nom A–Z", value: "name-asc" },
  { label: "Nom Z–A", value: "name-desc" },
  { label: "Étoiles Michelin", value: "stars-desc" },
  { label: "Plus récents", value: "published_date-desc" },
];
const selectedSort = ref(`${sort.value}-${order.value}`);
const currentSortLabel = computed(
  () => sortOptions.find((s) => s.value === selectedSort.value)?.label ?? "Trier"
);
watch(selectedSort, (val) => {
  const i = val.lastIndexOf("-");
  updateQuery({ sort: val.slice(0, i) !== "name" ? val.slice(0, i) : undefined, order: val.slice(i + 1) !== "asc" ? val.slice(i + 1) : undefined, page: undefined });
});

// Stars
const starItems = [
  { label: "Tous", value: "" },
  { label: "★", value: "1" },
  { label: "★★", value: "2" },
  { label: "★★★", value: "3" },
];

// Helpers
function updateQuery(updates: Record<string, string | number | undefined>) {
  const newQuery = { ...route.query };
  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined) delete newQuery[k];
    else newQuery[k] = String(v);
  }
  router.replace({ query: newQuery });
}

const activeFilters = computed(() => {
  const list: { key: string; label: string }[] = [];
  if (stars.value) list.push({ key: "stars", label: "★".repeat(Number(stars.value)) + " Michelin" });
  if (cuisine.value && selectedCuisineLabel.value) list.push({ key: "cuisine", label: selectedCuisineLabel.value });
  if (country.value && selectedCountryName.value) list.push({ key: "country", label: selectedCountryName.value });
  return list;
});
const hasActiveFilters = computed(() => !!q.value || activeFilters.value.length > 0);

function removeFilter(key: string) {
  if (key === "cuisine") selectedCuisineLabel.value = null;
  if (key === "country") selectedCountryName.value = null;
  updateQuery({ [key]: undefined, page: undefined });
}
function clearAll() {
  searchInput.value = "";
  selectedCuisineLabel.value = null;
  selectedCountryName.value = null;
  router.replace({ query: {} });
}

const currentPage = computed({
  get: () => page.value,
  set: (p) => updateQuery({ page: p > 1 ? p : undefined }),
});
</script>

<template>
  <div>
    <!-- Editorial header -->
    <section class="pt-28 pb-14 border-b border-linen-200/60">
      <UContainer>
        <p class="text-xs font-semibold tracking-[0.25em] uppercase text-linen-500 mb-4">
          Guide Michelin
        </p>
        <h1 class="text-5xl md:text-6xl font-semibold tracking-tight text-default">
          Restaurants
        </h1>
        <p class="mt-3 text-base text-muted max-w-xl">
          Découvrez les restaurants d'exception sélectionnés par le Guide Michelin.
        </p>
      </UContainer>
    </section>

    <UContainer class="py-10 space-y-8">
      <!-- Search -->
      <div class="relative group">
        <UIcon
          name="i-lucide-search"
          class="absolute left-0 top-1/2 -translate-y-1/2 size-5 text-linen-400 group-focus-within:text-brand-500 transition-colors pointer-events-none"
        />
        <input
          v-model="searchInput"
          type="text"
          placeholder="Rechercher un restaurant, une ville, une cuisine…"
          class="w-full pl-8 pr-10 py-3 bg-transparent border-0 border-b border-linen-300 focus:border-brand-500 focus:outline-none text-base placeholder:text-linen-400 transition-colors duration-200"
          @input="onSearch(($event.target as HTMLInputElement).value)"
        />
        <Transition name="fade">
          <button
            v-if="searchInput"
            class="absolute right-0 top-1/2 -translate-y-1/2 text-linen-400 hover:text-default transition-colors"
            @click="searchInput = ''; onSearch('')"
          >
            <UIcon name="i-lucide-x" class="size-4" />
          </button>
        </Transition>
      </div>

      <!-- Filter strip -->
      <div class="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 pb-5 border-b border-linen-200/60">
        <!-- Stars -->
        <div class="flex items-center">
          <button
            v-for="item in starItems"
            :key="item.value"
            :class="[
              'px-3 py-1 text-sm font-medium transition-all duration-200 border-b-2',
              stars === item.value
                ? 'text-brand-600 border-brand-500'
                : 'text-muted hover:text-default border-transparent'
            ]"
            @click="updateQuery({ stars: item.value || undefined, page: undefined })"
          >
            {{ item.label }}
          </button>
        </div>

        <!-- Dropdowns -->
        <div class="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
          <USelectMenu
            v-model="selectedCuisineLabel"
            :items="cuisineLabels"
            placeholder="Cuisine"
            variant="ghost"
            size="sm"
            :ui="{ base: 'font-normal text-muted hover:text-default' }"
          />
          <USelectMenu
            v-model="selectedCountryName"
            :items="countryNames"
            placeholder="Pays"
            variant="ghost"
            size="sm"
            :ui="{ base: 'font-normal text-muted hover:text-default' }"
          />
          <USelectMenu
            v-model="selectedSort"
            :items="sortOptions"
            value-key="value"
            variant="ghost"
            size="sm"
            :ui="{ base: 'font-normal text-muted hover:text-default' }"
          >
            <template #default="{ modelValue }">
              {{ sortOptions.find(s => s.value === modelValue)?.label ?? 'Trier' }}
            </template>
          </USelectMenu>
        </div>
      </div>

      <!-- Active filters + count -->
      <div class="flex flex-wrap items-center justify-between gap-3 -mt-4">
        <div class="flex flex-wrap items-center gap-4 text-xs text-muted">
          <template v-if="hasActiveFilters">
            <button
              v-for="f in activeFilters"
              :key="f.key"
              class="inline-flex items-center gap-1.5 hover:text-default transition-colors"
              @click="removeFilter(f.key)"
            >
              <span class="size-1.5 rounded-full bg-brand-500 shrink-0" />
              {{ f.label }}
              <UIcon name="i-lucide-x" class="size-3 opacity-60" />
            </button>
            <button
              class="text-brand-600 hover:text-brand-700 font-medium transition-colors"
              @click="clearAll"
            >
              Tout effacer
            </button>
          </template>
        </div>
        <span class="text-sm text-muted shrink-0 ml-auto">
          <template v-if="!pending">
            {{ meta.total.toLocaleString("fr-FR") }} restaurant{{ meta.total > 1 ? "s" : "" }}
          </template>
          <USkeleton v-else class="h-4 w-24 inline-block" />
        </span>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <template v-if="pending">
          <div v-for="i in LIMIT" :key="i" class="overflow-hidden rounded-xl">
            <USkeleton class="h-72 w-full" />
          </div>
        </template>
        <template v-else-if="restaurants.length">
          <RestaurantCard
            v-for="restaurant in restaurants"
            :key="restaurant.objectID"
            class="h-72"
            :slug="restaurant.slug"
            :name="restaurant.name"
            :description="restaurant.main_desc ?? ''"
            :city="restaurant.city?.name ?? ''"
            :stars="starCount(restaurant.michelin_star)"
            :image="restaurant.image ?? ''"
            :tags="restaurant.cuisines.slice(0, 2).map((c: { label: string }) => c.label)"
          />
        </template>
      </div>

      <!-- Empty state -->
      <div v-if="!pending && !restaurants.length" class="py-32 text-center">
        <UIcon name="i-lucide-search-x" class="mx-auto mb-5 size-10 text-linen-400" />
        <p class="text-lg font-semibold text-default">Aucun restaurant trouvé</p>
        <p class="mt-2 text-sm text-muted">Essayez de modifier ou réinitialiser vos filtres.</p>
        <button
          class="mt-6 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          @click="clearAll"
        >
          Réinitialiser les filtres
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="flex justify-center pt-4">
        <UPagination
          v-model:page="currentPage"
          :total="meta.total"
          :items-per-page="LIMIT"
        />
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

