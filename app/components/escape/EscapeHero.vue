<template>
  <UPageHero
    title="L’échappée"
    description="Votre carnet de voyage gastronomique. Chaque table, chaque séjour, une nouvelle étape vers des récompenses d’exception."
    :links="[
      { label: 'Commencer l’aventure', to: '/escape/inscription', icon: 'lucide:map' },
      {
        label: 'Découvrir le programme',
        to: '#comment-ca-marche',
        color: 'neutral',
        variant: 'ghost',
        trailingIcon: 'lucide:arrow-down',
      },
    ]"
  >
    <template #headline>
      <NuxtImg src="/images/logo_timbre.png" class="mx-auto size-32 opacity-80" />
    </template>
  </UPageHero>
</template>
