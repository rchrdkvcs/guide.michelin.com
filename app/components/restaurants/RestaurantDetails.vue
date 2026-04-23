<script lang="ts" setup>
interface RestaurantHours {
  closed: boolean;
  opens: string;
  closes: string;
}

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
  hours_of_operation: Record<string, RestaurantHours[]>;
  days_open: string[];
  meal_times: string[];
  online_booking: number;
  booking_url: string;
}

const props = defineProps<{ restaurant: Restaurant }>();

type Tab = "etablissement" | "details";
const activeTab = ref<Tab>("etablissement");

const stars = computed(() => starCount(props.restaurant.michelin_star));

const priceRange = computed(() => {
  const { low, high } = props.restaurant.price ?? {};
  const sym = props.restaurant.currency_symbol ?? "€";
  if (low && high) return `${sym}${low} – ${sym}${high}`;
  if (low) return `À partir de ${sym}${low}`;
  return null;
});

const address = computed(() => {
  const parts = [
    props.restaurant.street,
    props.restaurant.postcode,
    props.restaurant.city?.name,
  ].filter(Boolean);
  return parts.join(", ");
});

const DAY_LABELS: Record<string, string> = {
  MONDAY: "Lundi",
  TUESDAY: "Mardi",
  WEDNESDAY: "Mercredi",
  THURSDAY: "Jeudi",
  FRIDAY: "Vendredi",
  SATURDAY: "Samedi",
  SUNDAY: "Dimanche",
};

const hoursEntries = computed(() => {
  const h = props.restaurant.hours_of_operation;
  if (!h) return [];
  return Object.entries(h).map(([day, slots]) => ({
    day: DAY_LABELS[day] ?? day,
    closed: slots.every((s) => s.closed),
    slots: slots.filter((s) => !s.closed).map((s) => `${s.opens} – ${s.closes}`),
  }));
});
</script>

<template>
  <UContainer class="mt-20 lg:flex lg:h-[calc(100vh-96px)] lg:items-center">
    <div
      class="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-default bg-elevated p-1 lg:h-full lg:grid-cols-3"
    >
      <div
        class="relative aspect-video w-full overflow-hidden rounded-xl lg:col-span-2 lg:aspect-auto lg:h-full"
      >
        <NuxtImg
          v-if="restaurant.image"
          :src="restaurant.image"
          :alt="restaurant.name"
          class="h-full w-full object-cover"
        />
        <div v-else class="flex h-full min-h-96 items-center justify-center bg-muted">
          <UIcon name="lucide:utensils" class="size-16 text-muted" />
        </div>
      </div>

      <aside class="flex min-h-0 w-full flex-col gap-4 p-4 lg:size-full lg:overflow-hidden">
        <!-- Tab switcher -->
        <div
          class="flex shrink-0 items-center justify-center gap-1 rounded-xl border border-default p-1"
        >
          <UButton
            label="Établissement"
            color="neutral"
            :variant="activeTab === 'etablissement' ? 'solid' : 'ghost'"
            block
            class="rounded-lg"
            @click="activeTab = 'etablissement'"
          />
          <UButton
            label="Personnelles"
            color="neutral"
            :variant="activeTab === 'details' ? 'solid' : 'ghost'"
            block
            class="rounded-lg"
            @click="activeTab = 'details'"
          />
        </div>

        <!-- Tab: Établissement -->
        <template v-if="activeTab === 'etablissement'">
          <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
            <div class="flex flex-col gap-2">
              <div class="flex items-start justify-between gap-2">
                <h1 class="line-clamp-2 flex-1 text-xl leading-tight font-semibold">
                  {{ restaurant.name }}
                </h1>
                <div v-if="stars > 0" class="flex shrink-0 items-center gap-1">
                  <NuxtImg
                    v-for="i in stars"
                    :key="i"
                    src="/images/logo.png"
                    alt="étoile Michelin"
                    class="size-6 object-contain"
                  />
                </div>
              </div>

              <div v-if="restaurant.distinction" class="flex items-center gap-1.5">
                <UBadge
                  :label="restaurant.distinction.label"
                  color="primary"
                  variant="subtle"
                  size="sm"
                />
              </div>

              <p class="line-clamp-4 text-sm leading-snug text-muted">
                {{ restaurant.main_desc }}
              </p>
            </div>

            <div
              class="flex flex-col gap-3 overflow-y-auto rounded-xl border border-default bg-default/25 p-4 text-sm"
            >
              <div v-if="address" class="flex items-start gap-2.5">
                <UIcon name="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-muted" />
                <span>{{ address }}</span>
              </div>

              <div v-if="restaurant.phone" class="flex items-center gap-2.5">
                <UIcon name="lucide:phone" class="size-4 shrink-0 text-muted" />
                <a :href="`tel:${restaurant.phone}`" class="hover:underline">{{
                  restaurant.phone
                }}</a>
              </div>

              <div v-if="restaurant.website" class="flex items-center gap-2.5">
                <UIcon name="lucide:globe" class="size-4 shrink-0 text-muted" />
                <a :href="restaurant.website" target="_blank" class="truncate hover:underline">{{
                  restaurant.website
                }}</a>
              </div>

              <div v-if="priceRange" class="flex items-center gap-2.5">
                <UIcon name="lucide:euro" class="size-4 shrink-0 text-muted" />
                <span>{{ priceRange }}</span>
              </div>
            </div>

            <!-- Infos détails -->
            <div class="space-y-4">
              <div v-if="restaurant.chef" class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted"
                >
                  <UIcon name="lucide:chef-hat" class="size-5 text-muted" />
                </div>
                <div>
                  <p class="leading-tight font-semibold">{{ restaurant.chef }}</p>
                  <p class="text-xs text-muted">Chef</p>
                </div>
              </div>

              <div v-if="restaurant.cuisines?.length" class="space-y-2">
                <p class="text-xs font-semibold tracking-wider text-muted uppercase">Cuisines</p>
                <div class="flex flex-wrap gap-1.5">
                  <UBadge
                    v-for="c in restaurant.cuisines"
                    :key="c.code"
                    :label="c.label"
                    color="neutral"
                    variant="subtle"
                    size="sm"
                  />
                </div>
              </div>

              <div v-if="hoursEntries.length" class="space-y-2">
                <p class="text-xs font-semibold tracking-wider text-muted uppercase">Horaires</p>
                <div class="space-y-1">
                  <div
                    v-for="entry in hoursEntries"
                    :key="entry.day"
                    class="flex items-center justify-between text-xs"
                  >
                    <span class="font-medium">{{ entry.day }}</span>
                    <span v-if="entry.closed" class="text-muted">Fermé</span>
                    <span v-else class="text-muted">{{ entry.slots.join(", ") }}</span>
                  </div>
                </div>
              </div>

              <div v-if="restaurant.region?.name" class="space-y-1">
                <p class="text-xs font-semibold tracking-wider text-muted uppercase">Région</p>
                <p class="text-sm">{{ restaurant.region.name }}</p>
              </div>
            </div>
          </div>
        </template>

        <!-- Tab: Personnelles -->
        <template v-else>
          <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
          </div>
        </template>

        <!-- CTA -->
        <div class="mt-auto shrink-0">
          <UButton
            v-if="restaurant.online_booking && restaurant.booking_url"
            label="Réserver une table"
            color="primary"
            variant="solid"
            class="rounded-lg"
            size="lg"
            block
            :to="restaurant.booking_url"
            target="_blank"
          />
          <UButton
            v-else
            label="Réserver une table"
            color="primary"
            variant="solid"
            class="rounded-lg"
            size="lg"
            block
            disabled
          />
        </div>
      </aside>
    </div>
  </UContainer>
</template>
