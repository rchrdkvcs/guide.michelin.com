<script lang="ts" setup>
const stamps = [
  { name: "Auvergne", src: "/images/escape/timbres/auvergne.png" },
  { name: "Bourgogne", src: "/images/escape/timbres/bourgogne.png" },
  { name: "Bretagne", src: "/images/escape/timbres/bretagne.png" },
  { name: "Corse", src: "/images/escape/timbres/corse.png" },
  { name: "Île-de-France", src: "/images/escape/timbres/ile-de-france.png" },
  { name: "Loire", src: "/images/escape/timbres/loire.png" },
  { name: "Normandie", src: "/images/escape/timbres/normandie.png" },
];
</script>

<template>
  <UPageSection
    id="timbres"
    headline="Les timbres"
    title="Collectez les régions"
    description="Chaque réservation dans une nouvelle région débloque son timbre. Sept régions disponibles au lancement, d’autres à venir."
    class="bg-linen-200"
  >
    <template #body>
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <div
          v-for="stamp in stamps"
          :key="stamp.name"
          class="group flex flex-col items-center gap-2"
        >
          <div
            class="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105"
          >
            <NuxtImg :src="stamp.src" :alt="stamp.name" class="w-full object-contain shadow-sm" />
          </div>
          <span class="text-elevated/75 text-center">{{ stamp.name }}</span>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
