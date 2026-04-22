<script lang="ts" setup>
const { data: adventures } = await useFetch("/api/adventures", {
  query: { limit: 12 },
});
</script>

<template>
  <UPageSection
    class="flex h-screen flex-col overflow-hidden"
    title="Partez en aventure découvrir les spécialités"
    description="Explorez les destinations gastronomiques du Guide Michelin à travers le monde."
  >
    <div class="relative h-full w-full min-w-0">
      <div
        class="no-scrollbar flex h-[50vh] w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 py-4 md:px-8 lg:px-12"
      >
        <AdventurePostcard
          v-for="adventure in adventures?.data"
          :key="adventure.slug"
          :adventure="adventure"
          class="snap-center first:ml-0 md:snap-start"
        />
        <div class="w-10 shrink-0"></div>
      </div>

      <div class="mt-8 flex w-full justify-center">
        <UButton label="Voir toutes les régions" color="neutral" variant="subtle" to="/adventures" />
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
