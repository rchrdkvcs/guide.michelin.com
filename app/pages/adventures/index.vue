<script lang="ts" setup>
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
        />
      </UPageGrid>

      <div v-else class="py-24 text-center text-muted">Aucune aventure disponible.</div>
    </UContainer>
  </div>
</template>
