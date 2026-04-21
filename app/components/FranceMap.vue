<script setup lang="ts">
const props = defineProps<{
  activeRegionId?: string
}>()

// Simplified SVG paths for France regions (Representative shapes)
const regions = [
  { id: 'bretagne', name: 'Bretagne', d: 'M 50 150 L 150 150 L 170 200 L 50 220 Z' },
  { id: 'normandie', name: 'Normandie', d: 'M 150 100 L 250 100 L 250 150 L 150 150 Z' },
  { id: 'hauts-de-france', name: 'Hauts-de-France', d: 'M 250 50 L 350 50 L 350 100 L 250 100 Z' },
  { id: 'grand-est', name: 'Grand Est', d: 'M 350 100 L 500 100 L 500 250 L 350 250 Z' },
  { id: 'ile-de-france', name: 'Île-de-France', d: 'M 250 150 L 350 150 L 350 200 L 250 200 Z' },
  { id: 'centre-val-de-loire', name: 'Centre-Val de Loire', d: 'M 200 200 L 300 200 L 300 300 L 200 300 Z' },
  { id: 'pays-de-la-loire', name: 'Pays de la Loire', d: 'M 150 220 L 200 200 L 200 300 L 150 300 Z' },
  { id: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', d: 'M 100 300 L 250 300 L 250 500 L 100 500 Z' },
  { id: 'occitanie', name: 'Occitanie', d: 'M 250 400 L 400 400 L 400 550 L 250 550 Z' },
  { id: 'auvergne-rhone-alpes', name: 'Auvergne-Rhône-Alpes', d: 'M 300 300 L 450 300 L 450 450 L 300 450 Z' },
  { id: 'provence-alpes-cote-d-azur', name: 'Provence-Alpes-Côte d\'Azur', d: 'M 400 450 L 500 450 L 500 550 L 400 550 Z' },
  { id: 'bourgogne-franche-comte', name: 'Bourgogne-Franche-Comté', d: 'M 350 250 L 450 250 L 450 350 L 350 350 Z' },
  { id: 'corse', name: 'Corse', d: 'M 520 520 L 550 520 L 550 580 L 520 580 Z' },
]

// Mapping for Pays Basque to Nouvelle-Aquitaine
const mappedId = computed(() => {
  if (props.activeRegionId === 'pays-basque') return 'nouvelle-aquitaine'
  return props.activeRegionId
})
</script>

<template>
  <div class="relative w-full aspect-square max-w-md mx-auto">
    <svg viewBox="0 0 600 600" class="w-full h-full drop-shadow-2xl">
      <defs>
        <!-- Bretagne Flag Pattern (Gwenn ha Du) -->
        <pattern id="flag-bretagne" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.5)">
          <rect width="40" height="40" fill="white" />
          <rect y="8" width="40" height="8" fill="black" />
          <rect y="24" width="40" height="8" fill="black" />
          <rect width="16" height="20" fill="white" />
          <!-- Simplified Ermines -->
          <circle cx="4" cy="4" r="1.5" fill="black" />
          <circle cx="12" cy="4" r="1.5" fill="black" />
          <circle cx="8" cy="10" r="1.5" fill="black" />
        </pattern>

        <!-- Pays Basque Flag Pattern (Ikurriña) -->
        <pattern id="flag-pays-basque" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.5)">
          <rect width="40" height="40" fill="#ED1C24" />
          <path d="M0 0 L40 40 M40 0 L0 40" stroke="#009246" stroke-width="6" />
          <path d="M20 0 L20 40 M0 20 L40 20" stroke="white" stroke-width="4" />
        </pattern>
      </defs>

      <g class="transition-all duration-500">
        <path
          v-for="region in regions"
          :key="region.id"
          :d="region.d"
          :class="[
            'transition-all duration-500 cursor-pointer stroke-white stroke-2',
            mappedId === region.id ? 'scale-[1.02] z-10 shadow-xl' : 'fill-linen-200 hover:fill-linen-300'
          ]"
          :fill="mappedId === region.id ? (region.id === 'bretagne' ? 'url(#flag-bretagne)' : (region.id === 'nouvelle-aquitaine' && activeRegionId === 'pays-basque' ? 'url(#flag-pays-basque)' : 'var(--color-brand-500)')) : ''"
        >
          <title>{{ region.name }}</title>
        </path>
      </g>
    </svg>
  </div>
</template>

<style scoped>
path {
  transform-origin: center;
}
</style>
