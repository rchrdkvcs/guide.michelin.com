<script lang="ts" setup>
useSeoMeta({
  title: "Hébergements",
  description:
    "Découvrez les hôtels d'exception sélectionnés par le Guide MICHELIN pour des séjours inoubliables à travers le monde.",
  ogTitle: "Hébergements · Guide MICHELIN",
  ogDescription:
    "Découvrez les hôtels d'exception sélectionnés par le Guide MICHELIN pour des séjours inoubliables à travers le monde.",
  ogImage: "/images/hero.png",
});

const route = useRoute();
const router = useRouter();
const LIMIT = 24;

const page = computed(() => Number(route.query.page ?? 1));
const q = computed(() => (route.query.q as string) ?? "");
const sort = computed(() => (route.query.sort as string) ?? "name");
const order = computed(() => (route.query.order as string) ?? "asc");

const { data, pending } = await useFetch("/api/hotels", {
  query: computed(() => ({
    page: page.value,
    limit: LIMIT,
    name: q.value || undefined,
    sort: sort.value === "name" ? undefined : sort.value,
    order: order.value === "asc" ? undefined : order.value,
  })),
});

const hotels = computed(() => data.value?.data ?? []);
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

// Sort
const sortOptions = [
  { label: "Nom A–Z", value: "name-asc" },
  { label: "Nom Z–A", value: "name-desc" },
  { label: "Plus de chambres", value: "rooms-desc" },
  { label: "Moins de chambres", value: "rooms-asc" },
];
const selectedSort = ref(`${sort.value}-${order.value}`);
watch(selectedSort, (val) => {
  const i = val.lastIndexOf("-");
  updateQuery({
    sort: val.slice(0, i) === "name" ? undefined : val.slice(0, i),
    order: val.slice(i + 1) === "asc" ? undefined : val.slice(i + 1),
    page: undefined,
  });
});

function updateQuery(updates: Record<string, string | number | undefined>) {
  const newQuery = { ...route.query };
  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined) delete newQuery[k];
    else newQuery[k] = String(v);
  }
  router.replace({ query: newQuery });
}

const hasActiveFilters = computed(() => !!q.value);
function clearAll() {
  searchInput.value = "";
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
        <h1 class="text-5xl font-semibold tracking-tight text-default md:text-6xl">Hébergements</h1>
        <p class="mt-3 max-w-xl text-base text-muted">
          Découvrez les hôtels d'exception sélectionnés par le Guide Michelin, pour des séjours
          inoubliables.
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
          placeholder="Rechercher un hôtel, une destination…"
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
        class="flex flex-wrap items-center justify-between gap-4 border-b border-linen-200/60 pb-5"
      >
        <p class="text-sm text-muted">
          <template v-if="!pending">
            {{ meta.total.toLocaleString("fr-FR") }} hôtel{{ meta.total > 1 ? "s" : "" }}
          </template>
          <USkeleton v-else class="inline-block h-4 w-20" />
        </p>
        <div class="flex flex-wrap items-center gap-3 sm:gap-6">
          <button
            v-if="hasActiveFilters"
            class="text-xs font-medium text-brand-600 transition-colors hover:text-brand-700"
            @click="clearAll"
          >
            Effacer la recherche
          </button>
          <USelectMenu
            v-model="selectedSort"
            :items="sortOptions"
            value-key="value"
            variant="ghost"
            size="sm"
            :ui="{ base: 'font-normal text-muted hover:text-default' }"
          >
            <template #default="{ modelValue }">
              {{
                sortOptions.find((s: { value: any }) => s.value === modelValue)?.label ?? "Trier"
              }}
            </template>
          </USelectMenu>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <template v-if="pending">
          <div v-for="i in LIMIT" :key="i" class="overflow-hidden rounded-xl">
            <USkeleton class="h-64 w-full" />
          </div>
        </template>
        <template v-else-if="hotels.length">
          <HotelCard
            v-for="hotel in hotels"
            :key="hotel.id"
            :id="hotel.id"
            :name="hotel.name"
            :room-count="hotel.roomCount"
            :preview-image="hotel.previewImage"
            :city="hotel.city"
            :distinction-score="hotel.distinctionScore"
            :criteria-style="hotel.criteriaStyle"
            :min-price-per-night="hotel.minPricePerNight"
            :max-price-per-night="hotel.maxPricePerNight"
            :is-plus-eligible="hotel.isPlusEligible"
          />
        </template>
      </div>

      <!-- Empty state -->
      <div v-if="!pending && !hotels.length" class="py-32 text-center">
        <UIcon name="i-lucide-search-x" class="mx-auto mb-5 size-10 text-linen-400" />
        <p class="text-lg font-semibold text-default">Aucun hôtel trouvé</p>
        <p class="mt-2 text-sm text-muted">Essayez de modifier votre recherche.</p>
        <button
          class="mt-6 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
          @click="clearAll"
        >
          Réinitialiser
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
