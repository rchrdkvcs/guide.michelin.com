<script lang="ts" setup>
const { data: adventures } = await useFetch("/api/adventures");
</script>

<template>
  <UPageSection
    class="flex h-screen flex-col overflow-hidden"
    title="Partez en aventure découvrir les specialiter"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur enim efficitur a. Donec at nunc ac nisl efficitur convallis"
  >
    <div class="relative h-full w-full min-w-0">
      <div
        class="no-scrollbar flex h-[50vh] w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 py-4 md:px-8 lg:px-12"
      >
        <AdventurePostcard
          v-for="adventure in adventures"
          :key="adventure.id"
          :adventure="adventure"
          class="snap-center first:ml-0 md:snap-start"
        />
        <div class="w-10 shrink-0"></div>
      </div>

      <div class="mt-8 flex w-full justify-center">
        <UButton label="Voir toutes les regions" color="neutral" variant="subtle" to="/adventures" />
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
