<script lang="ts" setup>
interface Adventure {
  slug: string;
  label: string;
  locationType: string;
  countryName: string | null;
  totalRestaurants: number;
  image: string | null;
}

const props = defineProps<{
  adventure: Adventure;
  cuisines?: string[];
}>();
</script>

<template>
  <UContainer class="flex flex-col gap-6 py-8 pt-16">
    <div class="relative flex flex-col gap-2">
      <span class="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
        {{
          props.adventure.locationType === "REGION"
            ? "La région"
            : props.adventure.locationType === "CITY"
              ? "La ville"
              : "Le pays"
        }}
      </span>

      <h2 class="text-elevated text-2xl leading-snug font-medium">
        {{ props.adventure.label }}
        <span v-if="props.adventure.countryName" class="text-muted">
          , {{ props.adventure.countryName }}
        </span>
      </h2>

      <p class="leading-relaxed">
        Découvrez les saveurs et les tables d'exception de {{ props.adventure.label }}. Cette
        destination compte
        <strong>{{ props.adventure.totalRestaurants }}</strong>
        restaurant{{ props.adventure.totalRestaurants > 1 ? "s" : "" }} sélectionnés par le Guide
        Michelin.
      </p>
    </div>

    <div
      v-if="props.cuisines?.length"
      class="no-scrollbar flex items-center justify-start gap-2 overflow-x-auto"
    >
      <UBadge
        v-for="cuisine in props.cuisines"
        :key="cuisine"
        :label="cuisine"
        color="neutral"
        variant="subtle"
      />
    </div>
  </UContainer>
</template>
