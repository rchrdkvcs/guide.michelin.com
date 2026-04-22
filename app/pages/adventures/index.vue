<script lang="ts" setup>
const { data } = await useFetch("/api/adventures", { query: { limit: 100 } });
const adventures = computed(() => data.value?.data ?? []);
</script>

<template>
  <div>
    <UPageHero
      title="Aventures"
      description="Explorez les destinations gastronomiques du Guide Michelin à travers le monde."
    />

    <UContainer class="py-12">
      <div
        v-if="adventures.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        style="grid-auto-rows: 280px"
      >
        <AdventurePostcard
          v-for="adventure in adventures"
          :key="adventure.slug"
          :adventure="adventure"
        />
      </div>
      <div v-else class="py-24 text-center text-muted">Aucune aventure disponible.</div>
    </UContainer>
  </div>
</template>