<script lang="ts" setup>
useSeoMeta({
  title: "Aventures",
  description:
    "Partez à la découverte des destinations gastronomiques du Guide MICHELIN à travers le monde : régions, villes et pays à explorer.",
  ogTitle: "Aventures · Guide MICHELIN",
  ogDescription:
    "Partez à la découverte des destinations gastronomiques du Guide MICHELIN à travers le monde : régions, villes et pays à explorer.",
  ogImage: "/images/hero.png",
});

const { data } = await useFetch("/api/adventures", { query: { limit: 10 } });
const adventures = computed(() => data.value?.data ?? []);
</script>

<template>
  <div>
    <UPageHero
      title="Aventures"
      description="Explorez les destinations gastronomiques du Guide Michelin à travers le monde."
    />

    <UContainer>
      <UPageGrid v-if="adventures.length">
        <AdventurePostcard
          v-for="adventure in adventures"
          :key="adventure.slug"
          :adventure="adventure"
          class="w-full"
        />
      </UPageGrid>

      <div v-else class="py-24 text-center text-muted">Aucune aventure disponible.</div>
    </UContainer>
  </div>
</template>
