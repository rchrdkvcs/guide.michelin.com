<script lang="ts" setup>
const battleFree = [
  { name: "Timbre virtuel",  img: "/images/escape/timbres/ile-de-france.png", desc: "Collectez les régions" },
  { name: "Carte postale",   img: "/images/escape/timbres/bretagne.png",      desc: "Souvenir numérique" },
  { name: "Chaussettes",     img: "/images/escape/goodies/chaussettes.png",   desc: "Brandées Michelin" },
  { name: "Tote bag",        img: "/images/escape/goodies/bag.png",           desc: "L’essentiel du voyageur" },
  { name: "Tee-shirt",       img: "/images/escape/goodies/t-shirt.png",       desc: "Collection exclusive" },
];

const battlePremium = [
  { name: "Passeport",        img: "/images/escape/carnet.png",                     desc: "Cuir vegan, embossé" },
  { name: "Pull",             img: "/images/escape/goodies/bob1.png",               desc: "Collection hiver" },
  { name: "Timbres physiques",img: "/images/escape/timbres/bourgogne.png",          desc: "Envoi par courrier" },
  { name: "Magnet",           img: "/images/escape/goodies/pins_chaussettes.png",   desc: "Collector’s edition" },
  { name: "Pack anniversaire",img: "/images/escape/goodies/sac.png",               desc: "Carnet + carte exclusive" },
];
</script>

<template>
  <UPageSection
    id="collection"
    headline="Aperçu"
    title="Visualisez votre collection"
    description="Découvrez l’ensemble des récompenses avant de vous lancer. La piste gratuite est accessible à tous, la piste Premium révèle son potentiel à chaque palier."
  >
    <template #body>
      <div class="flex flex-col gap-8">
        <!-- Free track -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <UBadge label="Gratuit" color="neutral" variant="soft" />
            <span class="text-sm text-muted">Inclus dans toutes les inscriptions</span>
          </div>
          <div
            class="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible"
          >
            <div
              v-for="item in battleFree"
              :key="item.name"
              class="group flex w-36 shrink-0 flex-col overflow-hidden rounded-xl border border-default bg-elevated transition-shadow hover:shadow-md lg:w-auto"
            >
              <div class="aspect-square overflow-hidden bg-muted">
                <NuxtImg
                  :src="item.img"
                  :alt="item.name"
                  class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-2.5">
                <p class="text-sm leading-tight font-semibold">{{ item.name }}</p>
                <p class="mt-0.5 text-xs text-muted">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <USeparator />

        <!-- Premium track -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <UBadge label="Premium" color="secondary" variant="soft" />
            <UIcon name="lucide:crown" class="size-4 text-secondary" />
            <span class="text-sm text-muted">Récompenses exclusives</span>
          </div>
          <div
            class="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible"
          >
            <div
              v-for="item in battlePremium"
              :key="item.name"
              class="group relative flex w-36 shrink-0 flex-col overflow-hidden rounded-xl border border-secondary/30 bg-elevated ring-1 ring-secondary/20 transition-shadow hover:shadow-md hover:shadow-secondary/10 lg:w-auto"
            >
              <div class="aspect-square overflow-hidden bg-muted">
                <NuxtImg
                  :src="item.img"
                  :alt="item.name"
                  class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-2.5">
                <p class="text-sm leading-tight font-semibold">{{ item.name }}</p>
                <p class="mt-0.5 text-xs text-muted">{{ item.desc }}</p>
              </div>
              <div class="absolute top-2 right-2">
                <UBadge color="secondary" variant="solid" icon="lucide:crown" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
