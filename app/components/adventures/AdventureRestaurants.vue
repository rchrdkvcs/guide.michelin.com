<script lang="ts" setup>
interface Restaurant {
  objectID: string;
  name: string;
  slug: string;
  main_desc: string | null;
  michelin_star: string | null;
  city: { name: string } | null;
  cuisines: { label: string }[];
  image: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

defineProps<{
  restaurants: Restaurant[];
  meta: Meta;
  adventureSlug: string;
}>();

const emit = defineEmits<{
  "page-change": [page: number];
}>();
</script>

<template>
  <UContainer class="space-y-4 py-8">
    <div class="flex flex-col gap-2">
      <div class="flex w-full items-center justify-between">
        <h2 class="text-elevated text-2xl leading-snug font-medium">
          Nos suggestions de restaurants
        </h2>
        <UBadge :label="`${meta.total} restaurants`" color="neutral" variant="subtle" />
      </div>
    </div>

    <div
      v-if="restaurants.length"
      class="no-scrollbar -mx-4 flex h-96 snap-x snap-mandatory flex-row gap-4 overflow-x-auto px-4 pb-2"
    >
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.objectID"
        class="h-full w-[85vw] shrink-0 snap-start sm:w-80 lg:w-96"
        :slug="restaurant.slug"
        :name="restaurant.name"
        :description="restaurant.main_desc ?? ''"
        :city="restaurant.city?.name ?? ''"
        :stars="starCount(restaurant.michelin_star)"
        :image="restaurant.image ?? ''"
        :tags="restaurant.cuisines.slice(0, 2).map((c: { label: any }) => c.label)"
      />
    </div>

    <div v-else class="py-12 text-center text-muted">
      Aucun restaurant disponible pour cette destination.
    </div>

    <div v-if="meta.totalPages > 1" class="flex w-full items-center justify-center gap-4">
      <UButton
        :disabled="meta.page <= 1"
        color="neutral"
        variant="ghost"
        icon="lucide:arrow-left"
        label="Précédent"
        @click="emit('page-change', meta.page - 1)"
      />
      <span class="text-sm text-muted">{{ meta.page }} / {{ meta.totalPages }}</span>
      <UButton
        :disabled="meta.page >= meta.totalPages"
        color="neutral"
        variant="ghost"
        label="Suivant"
        trailing-icon="lucide:arrow-right"
        @click="emit('page-change', meta.page + 1)"
      />
    </div>
  </UContainer>
</template>
