<script lang="ts" setup>
const stepCardItems = [
  {
    title: "Rejoignez le PASS",
    description:
      "Inscrivez-vous au pass en vous laissant guider lors de l’inscription ou de la connexion.",
    icon: "lucide:user-plus",
  },
  {
    title: "Profitez de nos offres",
    description: "Réservez des hôtels et restaurants.",
    icon: "lucide:gift",
  },
  {
    title: "Cumulez des XP",
    description:
      "Cumuler des XP vous permettra de gagner des niveaux. Chaque réservation d’un restaurant vous rapporte 40 XP et un hôtel 100 XP. Pour évoluer d’un palier, il vous suffit d’obtenir 50 XP.",
    icon: "lucide:award",
  },
  {
    title: "Gagnez des récompenses",
    description: "À chaque fois que vous gagnez un niveau, vous gagnerez des récompenses.",
    icon: "lucide:gift",
  },
];
</script>

<template>
  <UPageHero
    title="L'échappée"
    description="Rejoignez le club et profitez toute l’année de nombreuses offres et récompenses."
    :links="[
      {
        label: 'Rejoindre le club',
        to: '/escape/inscription',
      },
      {
        label: 'En savoir plus',
        to: '/escape#comment-ca-marche',
        color: 'neutral',
        variant: 'ghost',
      },
    ]"
  >
    <template #headline>
      <NuxtImg src="/images/logo_timbre.png" class="mx-auto size-32" />
    </template>
  </UPageHero>

  <UPageSection title="Comment ça fonctionne ?">
    <template #body>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard variant="subtle" v-for="(item, index) in stepCardItems" :key="index">
          <template #header>
            <h2 class="flex items-center text-lg font-semibold">
              <UIcon :name="item.icon" class="mr-2 size-5" />
              {{ item.title }}
            </h2>
          </template>

          <p class="text-sm">
            {{ item.description }}
          </p>
        </UCard>
      </div>
    </template>
  </UPageSection>

  <UPageSection title="Récompenses disponibles">
    <template #body> </template>
  </UPageSection>

  <UPageSection
    title="Comment obtenir des XP ?"
    :features="[
      {
        title: 'Restaurant',
        description: 'Chaque restaurant vous rapporte 350 XP.',
        icon: 'lucide:utensils',
      },
      {
        title: 'Hôtel',
        description: 'Chaque hôtel vous rapporte 1000 XP.',
        icon: 'lucide:building',
      },
    ]"
  />
</template>
