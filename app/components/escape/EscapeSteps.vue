<script lang="ts" setup>
const steps = [
  {
    title: "Inscrivez-vous",
    description: "Créez votre carnet de voyage en quelques instants.",
    icon: "lucide:user-plus",
  },
  {
    title: "Explorez",
    description: "Réservez dans les restaurants et hôtels sélectionnés par le Guide MICHELIN.",
    icon: "lucide:map",
  },
  {
    title: "Cumulez des XP",
    description: "Chaque établissement visité vous fait gagner des points d’expérience.",
    icon: "lucide:zap",
  },
  {
    title: "Découvrez vos récompenses",
    description: "Montez de niveau et recevez des objets collectors à chaque palier.",
    icon: "lucide:gift",
  },
];
</script>

<template>
  <UPageSection
    id="comment-ca-marche"
    headline="Le programme"
    title="Partez à l’aventure, ramenez des souvenirs"
    description="Inspiré de l’esprit voyageur qui a porté Michelin depuis ses origines du pneu de vélo au guide gastronomique. L’échappée récompense chaque découverte."
  >
    <template #body>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UCard
          v-for="(step, index) in steps"
          :key="index"
          variant="subtle"
          :ui="{ body: 'flex flex-col gap-3' }"
        >
          <div class="flex items-center gap-3">
            <UBadge
              :label="String(index + 1)"
              color="primary"
              variant="soft"
              size="lg"
              class="size-8 rounded-full text-center font-bold tabular-nums"
            />
            <UIcon :name="step.icon" class="size-5 text-muted" />
          </div>
          <div>
            <p class="font-semibold">{{ step.title }}</p>
            <p class="mt-1 text-sm text-muted">{{ step.description }}</p>
          </div>
        </UCard>
      </div>
    </template>
  </UPageSection>
</template>
