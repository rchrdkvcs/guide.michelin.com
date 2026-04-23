<script lang="ts" setup>
const { data: adventures } = await useFetch("/api/adventures", {
  query: { limit: 12 },
});
</script>

<template>
  <UPageSection
    class="flex h-screen flex-col overflow-hidden"
    title="Partez à l’aventure"
    description="Explorez les destinations gastronomiques du Guide Michelin à travers nos cartes"
  >
    <div class="relative h-full w-full min-w-0">
      <div
        class="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-4 py-4 md:h-[50vh] md:px-8 lg:px-12"
      >
        <AdventurePostcard
          v-for="adventure in adventures?.data"
          :key="adventure.slug"
          :adventure="adventure"
          class="w-[80vw] shrink-0 snap-center first:ml-0 md:h-full md:w-auto md:snap-start"
        />
        <div class="w-10 shrink-0"></div>
      </div>

      <div class="mt-8 flex w-full justify-center">
        <UButton label="Voir toutes les régions" color="neutral" variant="ghost" to="/adventures" />
      </div>
    </div>
  </UPageSection>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
