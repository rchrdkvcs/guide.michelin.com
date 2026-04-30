<script lang="ts" setup>
const xpSources = [
  {
    label: "Bib Gourmand",
    xp: 350,
    icon: "lucide:utensils",
    description: "Le rapport qualité-prix selon Michelin",
  },
  {
    label: "Restaurant étoilé",
    xp: 600,
    icon: "lucide:star",
    description: "La table d’exception, une expérience inoubliable",
  },
  {
    label: "Hôtel",
    xp: 1000,
    icon: "lucide:building-2",
    description: "Un séjour soigneusement sélectionné par nos inspecteurs",
  },
  {
    label: "Niveau atteint",
    xp: 500,
    icon: "lucide:trophy",
    description: "Chaque palier franchi vous rapproche de nouvelles aventures",
  },
];
</script>

<template>
  <UPageSection
    id="xp"
    headline="Points d’expérience"
    title="Chaque visite compte"
    description="500 XP suffisent à franchir un nouveau palier. La route est longue, les récompenses valent le détour."
  >
    <template #body>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UCard
          v-for="source in xpSources"
          :key="source.label"
          variant="outline"
          :ui="{ body: 'flex flex-col gap-4' }"
        >
          <div class="flex items-start justify-between">
            <UIcon :name="source.icon" class="size-6 text-secondary" />
            <UBadge
              :label="`+${source.xp} XP`"
              color="neutral"
              variant="subtle"
              class="font-mono font-bold"
            />
          </div>
          <div>
            <p class="font-semibold">{{ source.label }}</p>
            <p class="mt-1 text-sm text-muted">{{ source.description }}</p>
          </div>
        </UCard>
      </div>
    </template>
  </UPageSection>
</template>
