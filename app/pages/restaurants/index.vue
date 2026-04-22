<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page ?? 1));
const stars = computed(() => route.query.stars as string | undefined);
const name = computed(() => route.query.name as string | undefined);

const { data, pending } = await useFetch("/api/restaurants", {
  query: computed(() => ({
    page: page.value,
    limit: 20,
    stars: stars.value,
    name: name.value,
  })),
});

const restaurants = computed(() => data.value?.data ?? []);
const meta = computed(() => data.value?.meta ?? { page: 1, limit: 20, total: 0, totalPages: 1 });

const searchInput = ref(name.value ?? "");
let debounceTimer: ReturnType<typeof setTimeout>;

function onSearchInput(val: string) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    router.replace({ query: { ...route.query, name: val || undefined, page: undefined } });
  }, 300);
}

function setStars(val: string | undefined) {
  router.replace({ query: { ...route.query, stars: val, page: undefined } });
}

function goToPage(p: number) {
  router.replace({ query: { ...route.query, page: p } });
}
</script>

<template>
  <div>
    <UPageHero
      title="Restaurants"
      description="Découvrez les restaurants d'exception sélectionnés par le Guide Michelin."
    />

    <UContainer class="py-8">
      <!-- Filters -->
      <div class="mb-8 flex flex-wrap items-center gap-3">
        <UInput
          v-model="searchInput"
          placeholder="Rechercher un restaurant..."
          icon="lucide:search"
          class="w-64"
          @update:model-value="onSearchInput"
        />

        <div class="flex items-center gap-1">
          <UButton
            :variant="!stars ? 'solid' : 'ghost'"
            color="neutral"
            label="Tous"
            @click="setStars(undefined)"
          />
          <UButton
            v-for="n in [1, 2, 3]"
            :key="n"
            :variant="stars === String(n) ? 'solid' : 'ghost'"
            color="neutral"
            @click="setStars(String(n))"
          >
            <span class="flex items-center gap-1">
              <NuxtImg src="/images/logo.png" class="size-4" alt="" />
              <span>{{ n }}</span>
            </span>
          </UButton>
        </div>

        <span v-if="!pending" class="ml-auto text-sm text-muted">
          {{ meta.total }} résultat{{ meta.total > 1 ? "s" : "" }}
        </span>
      </div>

      <!-- Grid -->
      <div
        v-if="restaurants.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <RestaurantCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="h-72"
          :slug="restaurant.slug"
          :name="restaurant.name"
          :description="restaurant.main_desc ?? ''"
          :city="restaurant.city?.name ?? ''"
          :stars="starCount(restaurant.michelin_star)"
          :image="restaurant.image ?? ''"
          :tags="restaurant.cuisines.slice(0, 2).map((c: { label: string }) => c.label)"
        />
      </div>

      <div v-else-if="!pending" class="py-24 text-center text-muted">
        Aucun restaurant trouvé.
      </div>

      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="mt-10 flex items-center justify-center gap-4">
        <UButton
          :disabled="meta.page <= 1"
          color="neutral"
          variant="ghost"
          icon="lucide:arrow-left"
          label="Précédent"
          @click="goToPage(meta.page - 1)"
        />
        <span class="text-sm text-muted">Page {{ meta.page }} / {{ meta.totalPages }}</span>
        <UButton
          :disabled="meta.page >= meta.totalPages"
          color="neutral"
          variant="ghost"
          label="Suivant"
          trailing-icon="lucide:arrow-right"
          @click="goToPage(meta.page + 1)"
        />
      </div>
    </UContainer>
  </div>
</template>
