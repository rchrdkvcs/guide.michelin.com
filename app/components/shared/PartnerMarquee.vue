<script lang="ts" setup>
const partnerLogos = [
  { src: "/images/partners/blancpain.png", name: "Blancpain", href: "https://www.blancpain.com" },
  { src: "/images/partners/lafont.png", name: "Lafont", href: "https://www.lafont.com" },
  { src: "/images/partners/metro.png", name: "Metro", href: "https://www.metro.fr" },
  { src: "/images/partners/thefork.png", name: "TheFork", href: "https://www.thefork.fr" },
];
</script>

<template>
  <UContainer class="relative w-full overflow-hidden py-8">
    <p class="mb-8 text-center text-sm font-semibold tracking-[0.25em] text-muted uppercase">
      Nos partenaires officiels
    </p>

    <UMarquee :pauseOnHover="true" class="w-full" :overlay="false">
      <ULink
        v-for="(partner, index) in partnerLogos"
        :key="index"
        :to="partner.href"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-14 w-36 items-center justify-center transition-transform duration-300 hover:scale-110"
      >
        <NuxtImg
          :src="partner.src"
          :alt="partner.name"
          class="h-full w-full object-contain transition-all duration-300"
        />
      </ULink>
    </UMarquee>
  </UContainer>
</template>
