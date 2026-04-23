<template>
  <UPageSection
    orientation="horizontal"
    title="Le passeport, votre carnet de route"
    description="En cuir vegan, embossé aux couleurs de L’échappée. Chaque établissement y appose son tampon unique. Quand il est plein, nous vous en envoyons un nouveau."
    :features="[
      {
        title: 'Qualité premium',
        description: 'Cuir vegan, embossage, finitions soignées.',
        icon: 'lucide:book-open',
      },
      {
        title: 'Tampon unique',
        description: 'Chaque établissement possède son propre tampon.',
        icon: 'lucide:stamp',
      },
      {
        title: 'Sans limite',
        description: 'Passeport rempli ? Nous vous en envoyons un nouveau.',
        icon: 'lucide:infinity',
      },
    ]"
  >
    <NuxtImg
      src="/images/escape/carnet.png"
      alt="Le carnet L’échappée"
      class="mx-auto w-full max-w-xl object-contain drop-shadow-2xl"
    />
  </UPageSection>
</template>
