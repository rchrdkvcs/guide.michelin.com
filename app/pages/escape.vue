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

const stamps = [
  { name: "Auvergne", src: "/images/escape/timbres/auvergne.png" },
  { name: "Bourgogne", src: "/images/escape/timbres/bourgogne.png" },
  { name: "Bretagne", src: "/images/escape/timbres/bretagne.png" },
  { name: "Corse", src: "/images/escape/timbres/corse.png" },
  { name: "Île-de-France", src: "/images/escape/timbres/ile-de-france.png" },
  { name: "Loire", src: "/images/escape/timbres/loire.png" },
  { name: "Normandie", src: "/images/escape/timbres/normandie.png" },
];

const battleFree = [
  {
    name: "Timbre virtuel",
    img: "/images/escape/timbres/ile-de-france.png",
    desc: "Collectez les régions",
  },
  { name: "Carte postale", img: "/images/escape/timbres/bretagne.png", desc: "Souvenir numérique" },
  { name: "Chaussettes", img: "/images/escape/goodies/chaussettes.png", desc: "Brandées Michelin" },
  { name: "Tote bag", img: "/images/escape/goodies/bag.png", desc: "L’essentiel du voyageur" },
  { name: "Tee-shirt", img: "/images/escape/goodies/t-shirt.png", desc: "Collection exclusive" },
];

const battlePremium = [
  { name: "Passeport", img: "/images/escape/carnet.png", desc: "Cuir vegan, embossé" },
  { name: "Pull", img: "/images/escape/goodies/bob1.png", desc: "Collection hiver" },
  {
    name: "Timbres physiques",
    img: "/images/escape/timbres/bourgogne.png",
    desc: "Envoi par courrier",
  },
  {
    name: "Magnet",
    img: "/images/escape/goodies/pins_chaussettes.png",
    desc: "Collector’s edition",
  },
  {
    name: "Pack anniversaire",
    img: "/images/escape/goodies/sac.png",
    desc: "Carnet + carte exclusive",
  },
];

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

  <!-- Comment ça marche -->
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

  <!-- XP -->
  <UPageSection
    id="xp"
    headline="Points d’expérience"
    title="Chaque visite compte"
    description="500 XP suffisent à franchir un nouveau palier. La route est longue, les récompenses valent le détour."
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

  <!-- Timbres showcase -->
  <UPageSection
    id="timbres"
    headline="Les timbres"
    title="Collectez les régions"
    description="Chaque réservation dans une nouvelle région débloque son timbre. Sept régions disponibles au lancement, d’autres à venir."
    class="bg-linen-200"
  >
    <template #body>
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <div
          v-for="stamp in stamps"
          :key="stamp.name"
          class="group flex flex-col items-center gap-2"
        >
          <div
            class="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105"
          >
            <NuxtImg :src="stamp.src" :alt="stamp.name" class="w-full object-contain shadow-sm" />
          </div>
          <span class="text-elevated/75 text-center">{{ stamp.name }}</span>
        </div>
      </div>
    </template>
  </UPageSection>

  <!-- Battle pass -->
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

  <!-- Plans -->
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

  <!-- Passeport with carnet image -->
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
        description: 'Passeport rempli ? Nous vous en envoyons un nouveau.',
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

  <UContainer class="mb-16">
    <UPageCTA
      title="Prêt à prendre la route ?"
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
