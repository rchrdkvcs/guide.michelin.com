<script lang="ts" setup>
useSeoMeta({
  title: "Restaurants",
  description:
    "Explorez la sélection complète du Guide MICHELIN : restaurants étoilés, Bib Gourmand et tables d'exception dans le monde entier.",
  ogTitle: "Restaurants · Guide MICHELIN",
  ogDescription:
    "Explorez la sélection complète du Guide MICHELIN : restaurants étoilés, Bib Gourmand et tables d'exception dans le monde entier.",
  ogImage: "/images/hero.png",
});

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
    sort: sort.value === "name" ? undefined : sort.value,
    order: order.value === "asc" ? undefined : order.value,
  })),
});

const restaurants = computed(() => data.value?.data ?? []);
const meta = computed(() => data.value?.meta ?? { page: 1, limit: LIMIT, total: 0, totalPages: 1 });

// Search
const searchInput = ref(q.value);
let searchTimer: ReturnType<typeof setTimeout>;
watch(q, (val) => {
  searchInput.value = val;
});
function onSearch(val: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => updateQuery({ q: val || undefined, page: undefined }), 300);
}

// Selects
const cuisineLabels = computed(() => (filtersData.value?.cuisines ?? []).map((c) => c.label));
const countryNames = computed(() => (filtersData.value?.countries ?? []).map((c) => c.name));
const selectedCuisineLabel = ref<string | undefined>(undefined);
const selectedCountryName = ref<string | undefined>(undefined);

watchEffect(() => {
  if (filtersData.value) {
    selectedCuisineLabel.value = cuisine.value
      ? (filtersData.value.cuisines.find((c) => c.slug === cuisine.value)?.label ?? undefined)
      : undefined;
    selectedCountryName.value = country.value
      ? (filtersData.value.countries.find((c) => c.slug === country.value)?.name ?? undefined)
      : undefined;
  }
});

watch(selectedCuisineLabel, (label) => {
  const slug = label
    ? (filtersData.value?.cuisines.find((c) => c.label === label)?.slug ?? "")
    : "";
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
  () => sortOptions.find((s) => s.value === selectedSort.value)?.label ?? "Trier",
);
watch(selectedSort, (val) => {
  const i = val.lastIndexOf("-");
  updateQuery({
    sort: val.slice(0, i) === "name" ? undefined : val.slice(0, i),
    order: val.slice(i + 1) === "asc" ? undefined : val.slice(i + 1),
    page: undefined,
  });
});

// Stars
const starItems = [{ label: "Tous", value: "" }, { value: "1" }, { value: "2" }, { value: "3" }];

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
  if (stars.value) {
    const n = Number(stars.value);
    list.push({ key: "stars", label: `${n} étoile${n > 1 ? "s" : ""} Michelin` });
  }
  if (cuisine.value && selectedCuisineLabel.value)
    list.push({ key: "cuisine", label: selectedCuisineLabel.value });
  if (country.value && selectedCountryName.value)
    list.push({ key: "country", label: selectedCountryName.value });
  return list;
});
const hasActiveFilters = computed(() => !!q.value || activeFilters.value.length > 0);

function removeFilter(key: string) {
  if (key === "cuisine") selectedCuisineLabel.value = undefined;
  if (key === "country") selectedCountryName.value = undefined;
  updateQuery({ [key]: undefined, page: undefined });
}
function clearAll() {
  searchInput.value = "";
  selectedCuisineLabel.value = undefined;
  selectedCountryName.value = undefined;
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
    <section class="border-b border-linen-200/60 pt-28 pb-14">
      <UContainer>
        <p class="mb-4 text-xs font-semibold tracking-[0.25em] text-linen-500 uppercase">
          Guide Michelin
        </p>
        <h1 class="text-5xl font-semibold tracking-tight text-default md:text-6xl">Restaurants</h1>
        <p class="mt-3 max-w-xl text-base text-muted">
          Découvrez les restaurants d'exception sélectionnés par le Guide Michelin.
        </p>
      </UContainer>
    </section>

    <UContainer class="space-y-8 py-10">
      <!-- Search -->
      <div class="group relative">
        <UIcon
          name="i-lucide-search"
          class="pointer-events-none absolute top-1/2 left-0 size-5 -translate-y-1/2 text-linen-400 transition-colors group-focus-within:text-brand-500"
        />
        <input
          v-model="searchInput"
          type="text"
          placeholder="Rechercher un restaurant, une ville, une cuisine…"
          class="w-full border-0 border-b border-linen-300 bg-transparent py-3 pr-10 pl-8 text-base transition-colors duration-200 placeholder:text-linen-400 focus:border-brand-500 focus:outline-none"
          @input="onSearch(($event.target as HTMLInputElement).value)"
        />
        <Transition name="fade">
          <button
            v-if="searchInput"
            class="absolute top-1/2 right-0 -translate-y-1/2 text-linen-400 transition-colors hover:text-default"
            @click="
              searchInput = '';
              onSearch('');
            "
          >
            <UIcon name="i-lucide-x" class="size-4" />
          </button>
        </Transition>
      </div>

      <!-- Filter strip -->
      <div
        class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-linen-200/60 pb-5"
      >
        <!-- Stars -->
        <div class="flex items-center">
          <button
            v-for="item in starItems"
            :key="item.value"
            :class="[
              'flex cursor-pointer items-center gap-0.5 border-b-2 px-3 py-1.5 text-sm font-medium transition-all duration-200',
              stars === item.value
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-muted hover:text-default',
            ]"
            @click="updateQuery({ stars: item.value || undefined, page: undefined })"
          >
            <template v-if="item.value">
              <NuxtImg
                v-for="i in Number(item.value)"
                :key="i"
                src="/images/logo.png"
                alt="étoile Michelin"
                class="size-4 object-contain"
              />
            </template>
            <template v-else>Tous</template>
          </button>
        </div>

        <!-- Dropdowns -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-4">
          <USelectMenu
            v-model="selectedCuisineLabel"
            :items="cuisineLabels"
            placeholder="Cuisine"
            variant="ghost"
            color="neutral"
            :ui="{ base: 'cursor-pointer', placeholder: 'text-elevated' }"
            class="w-32"
          />
          <USelectMenu
            v-model="selectedCountryName"
            :items="countryNames"
            placeholder="Pays"
            variant="ghost"
            color="neutral"
            :ui="{ base: 'cursor-pointer', placeholder: 'text-elevated' }"
            class="w-32"
          />
          <USelectMenu
            v-model="selectedSort"
            :items="sortOptions"
            value-key="value"
            variant="ghost"
            color="neutral"
            :ui="{ base: 'cursor-pointer', placeholder: 'text-elevated' }"
            class="w-32"
          >
            <template #default="{ modelValue }">
              {{
                sortOptions.find((s: { value: any }) => s.value === modelValue)?.label ?? "Trier"
              }}
            </template>
          </USelectMenu>
        </div>
      </div>

      <!-- Active filters + count -->
      <div class="-mt-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-4 text-xs text-muted">
          <template v-if="hasActiveFilters">
            <button
              v-for="f in activeFilters"
              :key="f.key"
              class="inline-flex items-center gap-1.5 transition-colors hover:text-default"
              @click="removeFilter(f.key)"
            >
              <span class="size-1.5 shrink-0 rounded-full bg-brand-500" />
              {{ f.label }}
              <UIcon name="i-lucide-x" class="size-3 opacity-60" />
            </button>
            <button
              class="font-medium text-brand-600 transition-colors hover:text-brand-700"
              @click="clearAll"
            >
              Tout effacer
            </button>
          </template>
        </div>
        <span class="ml-auto shrink-0 text-sm text-muted">
          <template v-if="!pending">
            {{ meta.total.toLocaleString("fr-FR") }} restaurant{{ meta.total > 1 ? "s" : "" }}
          </template>
          <USkeleton v-else class="inline-block h-4 w-24" />
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
          class="mt-6 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
          @click="clearAll"
        >
          Réinitialiser les filtres
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="flex justify-center pt-4">
        <UPagination v-model:page="currentPage" :total="meta.total" :items-per-page="LIMIT" />
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
