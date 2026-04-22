<script lang="ts" setup>
const { data: adventures } = await useFetch("/api/adventures");
</script>

<template>
  <UPageSection
    class="h-screen flex flex-col overflow-hidden"
    title="Partez en aventure découvrir les specialiter"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur enim efficitur a. Donec at nunc ac nisl efficitur convallis"
  >
    <div class="relative w-full h-full min-w-0">
      <div
        class="flex gap-4 overflow-x-auto w-full h-[50vh] px-4 md:px-8 lg:px-12 no-scrollbar scroll-smooth snap-x snap-mandatory py-4"
      >
        <RegionPostcard
          v-for="adventure in adventures"
          :key="adventure.id"
          :adventure="adventure"
          class="snap-center md:snap-start first:ml-0"
        />
        <div class="w-10 shrink-0"></div>
      </div>

      <div class="w-full flex justify-center mt-8">
        <UButton label="Voir toutes les regions" color="neutral" variant="subtle" to="/regions" />
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
