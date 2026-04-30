<template>
  <UContainer class="mb-16">
    <UPageCTA
      title="Prêt à prendre la route ?"
      description="Rejoignez L’échappée et transformez chaque réservation en souvenir."
      :links="[
        { label: 'Rejoindre le club', to: '/escape/inscription', icon: 'lucide:map' },
        {
          label: 'En savoir plus',
          to: '#comment-ca-marche',
          color: 'neutral',
          variant: 'ghost',
          trailingIcon: 'lucide:arrow-up',
        },
      ]"
    />
  </UContainer>
</template>
