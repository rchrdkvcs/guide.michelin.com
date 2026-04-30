<script lang="ts" setup>
const freeRewards = [
  "Timbres virtuels",
  "Cartes postales virtuelles",
  "Badges à chaque palier",
  "Chaussettes brandées",
  "Tote bag",
  "Tee-shirt",
];

const premiumRewards = [
  "Toutes les récompenses gratuites",
  "Timbres physiques",
  "Cartes postales physiques",
  "Pull",
  "Magnet",
  "Pack anniversaire (nouveau carnet, carte postale exclusive…)",
  "Passeport physique premium (cuir vegan, embossage)",
  "Tampon unique par établissement",
  "Renvoi d’un nouveau passeport si rempli",
];
</script>

<template>
  <UPageSection
    id="recompenses"
    headline="Récompenses"
    title="Des objets pensés pour les vrais voyageurs"
    description="Du virtuel au physique, chaque palier déverrouille des pièces collectors. La version Premium vous offre une expérience tangible."
  >
    <template #body>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UCard variant="subtle" :ui="{ root: 'flex flex-col', body: 'flex-1' }">
          <template #header>
            <div class="flex items-start justify-between">
              <div>
                <UBadge label="Gratuit" color="neutral" variant="subtle" class="mb-2" />
                <h3 class="text-xl font-semibold">L’échappée</h3>
                <p class="mt-1 text-sm text-muted">Commencez l’aventure sans engagement.</p>
              </div>
              <NuxtImg src="/images/escape/goodies/t-shirt.png" class="size-16 object-contain" />
            </div>
          </template>

          <ul class="flex h-full flex-col gap-2.5">
            <li
              v-for="reward in freeRewards"
              :key="reward"
              class="flex items-center gap-2.5 text-sm"
            >
              <UIcon name="lucide:check" class="size-4 shrink-0 text-primary" />
              <span>{{ reward }}</span>
            </li>
          </ul>

          <template #footer>
            <UButton
              label="Rejoindre gratuitement"
              color="neutral"
              variant="outline"
              block
              to="/escape/inscription"
            />
          </template>
        </UCard>

        <UCard
          variant="outline"
          class="ring-2 ring-primary"
          :ui="{ root: 'flex flex-col', body: 'flex-1' }"
        >
          <template #header>
            <div class="flex items-start justify-between">
              <div>
                <UBadge label="Premium" color="primary" variant="soft" class="mb-2" />
                <h3 class="text-xl font-semibold">L’échappée Premium</h3>
                <p class="mt-1 text-sm text-muted">
                  L’expérience complète, du numérique au physique.
                </p>
              </div>
              <NuxtImg src="/images/escape/carnet.png" class="size-16 object-contain" />
            </div>
          </template>

          <ul class="flex flex-col gap-2.5">
            <li
              v-for="(reward, index) in premiumRewards"
              :key="reward"
              class="flex items-start gap-2.5 text-sm"
            >
              <UIcon
                :name="index === 0 ? 'lucide:layers' : 'lucide:check'"
                class="mt-0.5 size-4 shrink-0"
                :class="index === 0 ? 'text-secondary' : 'text-primary'"
              />
              <span :class="index === 0 ? 'font-medium' : ''">{{ reward }}</span>
            </li>
          </ul>

          <template #footer>
            <UButton
              label="Passer Premium"
              color="primary"
              variant="solid"
              block
              to="/escape/inscription?plan=premium"
            />
          </template>
        </UCard>
      </div>
    </template>
  </UPageSection>
</template>
