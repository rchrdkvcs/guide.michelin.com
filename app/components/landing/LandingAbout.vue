<script lang="ts" setup>
const { data: stats } = await useFetch("/api/stats");

const totalStarred = computed(
  () =>
    (stats.value?.oneStarCount ?? 0) +
    (stats.value?.twoStarCount ?? 0) +
    (stats.value?.threeStarCount ?? 0),
);

const highlights = computed(() => [
  `${stats.value?.total.toLocaleString("fr-FR") ?? "…"} établissements sélectionnés`,
  `${totalStarred.value.toLocaleString("fr-FR")} restaurants étoilés`,
  `${stats.value?.bibGourmandCount.toLocaleString("fr-FR") ?? "…"} distinctions Bib Gourmand`,
  "Plus de 125 ans d'expertise gastronomique",
]);
</script>

<template>
  <UContainer class="mb-24">
    <UPageCTA
      orientation="horizontal"
      variant="subtle"
      title="À propos du Guide MICHELIN"
      :links="[
        {
          label: 'Explorer les aventures',
          to: '/adventures',
          color: 'primary',
          variant: 'solid',
          trailingIcon: 'lucide:arrow-right',
        },
        {
          label: 'Restaurants étoilés',
          to: '/restaurants',
          color: 'neutral',
          variant: 'outline',
          trailingIcon: 'lucide:star',
        },
      ]"
    >
      <template #description>
        <p class="leading-relaxed text-muted">
          Né en 1900 sous l'impulsion d'André et Édouard Michelin, le Guide MICHELIN est devenu la
          référence mondiale de la gastronomie. Chaque année, nos inspecteurs anonymes parcourent le
          monde pour dénicher les établissements les plus remarquables des adresses simples et
          généreuses aux tables d'exception méritant le voyage.
        </p>
        <ul class="mt-4 space-y-2">
          <li
            v-for="item in highlights"
            :key="item"
            class="flex items-center gap-2.5 text-sm text-muted"
          >
            <NuxtImg src="/images/logo.png" alt="" class="size-4 shrink-0 object-contain" />
            {{ item }}
          </li>
        </ul>
      </template>

      <!-- Right-side visual -->
      <div class="flex flex-col items-center gap-8">
        <NuxtImg
          src="/images/guide_original.png"
          alt="Le Guide MICHELIN"
          class="h-auto w-full max-w-sm rotate-12 object-contain drop-shadow-2xl"
        />
      </div>
    </UPageCTA>
  </UContainer>
</template>
