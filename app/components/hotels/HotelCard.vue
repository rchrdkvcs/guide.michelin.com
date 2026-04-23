<script lang="ts" setup>
const props = defineProps<{
  id: string;
  name: string;
  roomCount: number;
  previewImage?: string | null;
  city?: string | null;
  distinctionScore?: number;
  criteriaStyle?: string | null;
  minPricePerNight?: number | null;
  maxPricePerNight?: number | null;
  isPlusEligible?: boolean;
}>();

const keys = computed(() => Math.min(props.distinctionScore ?? 0, 3));

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
</script>

<template>
  <NuxtLink
    :to="`/hotels/${id}`"
    class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-default bg-elevated p-1 transition-shadow duration-300"
  >
    <div class="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl">
      <NuxtImg
        v-if="previewImage"
        :src="previewImage"
        :alt="name"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
      >
        <UIcon name="lucide:building" class="size-10 text-neutral-400" />
      </div>

      <UButton
        icon="lucide:arrow-right"
        color="neutral"
        variant="subtle"
        size="xs"
        class="absolute top-2 right-2 shrink-0 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        aria-label="Voir l'hôtel"
      />
    </div>

    <div class="flex flex-1 flex-col gap-2 p-2">
      <div class="flex items-start justify-between gap-2">
        <h3 class="line-clamp-1 flex-1 text-base leading-tight font-semibold">{{ name }}</h3>
        <div v-if="keys > 0" class="flex shrink-0 items-center gap-0.5">
          <NuxtImg
            v-for="i in keys"
            :key="i"
            src="/images/logo_key.png"
            alt="Clé Michelin"
            class="size-5 object-contain"
          />
        </div>
      </div>

      <p class="line-clamp-3 text-sm leading-snug text-muted">
        {{ criteriaStyle ?? `${roomCount} chambre${roomCount > 1 ? 's' : ''}` }}
      </p>

      <div class="mt-auto flex items-center justify-between gap-2 border-t border-default pt-2">
        <span class="flex shrink-0 items-center gap-1 text-xs text-muted">
          <UIcon name="lucide:map-pin" class="size-3 shrink-0" />
          {{ city ?? '—' }}
        </span>

        <div class="flex flex-wrap items-center justify-end gap-1.5">
          <UBadge
            v-if="minPricePerNight"
            :label="`${formatPrice(minPricePerNight)}/nuit`"
            color="neutral"
            variant="subtle"
            size="sm"
          />
          <UBadge
            v-if="isPlusEligible"
            label="Tablet+"
            color="primary"
            variant="subtle"
            size="sm"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
