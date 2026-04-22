<script lang="ts" setup>
type Tab = "etablissement" | "personnelles";
const activeTab = ref<Tab>("etablissement");

const restaurant = {
  name: "Le Bernardin",
  stars: 2,
  description:
    "Une cuisine française d'exception au cœur de Paris, sublimant les produits de la mer avec une précision et une sensibilité remarquables.",
  address: "18 Rue Troyon, 75017 Paris",
  phone: "+33 1 40 68 22 22",
  hours: [
    { day: "Lun – Ven", time: "12h00 – 14h30 · 19h30 – 22h30" },
    { day: "Samedi", time: "19h30 – 22h30" },
    { day: "Dimanche", time: "Fermé" },
  ],
  chef: {
    name: "Éric Ripert",
    title: "Chef Exécutif & Co-Propriétaire",
    avatar: "https://i.pravatar.cc/150?img=68",
    bio: "Né à Antibes, Éric Ripert débute sa formation à l'École Hôtelière de Perpignan avant de rejoindre les cuisines de La Tour d'Argent à Paris. Passionné par les produits de la mer, il a développé un style unique alliant rigueur technique et sensibilité artistique, faisant du Bernardin une référence mondiale.",
    quote:
      "La cuisine est un langage universel. Chaque assiette raconte une histoire, celle d'un territoire, d'une saison, d'une rencontre.",
  },
};
</script>

<template>
  <UContainer class="mt-20 lg:grid lg:h-[calc(100vh-96px)] lg:items-center lg:justify-center">
    <div
      class="grid w-full grid-cols-1 rounded-2xl border border-default bg-elevated p-1 lg:h-full lg:grid-cols-3"
    >
      <NuxtImg
        src="/images/hero.png"
        class="aspect-video w-full rounded-xl object-cover lg:col-span-2 lg:aspect-auto lg:size-full"
      />

      <aside class="flex min-h-0 w-full flex-col gap-4 p-4 lg:size-full">
        <!-- Tab switcher -->
        <div
          class="flex shrink-0 items-center justify-center gap-1 rounded-xl border border-default p-1"
        >
          <UButton
            label="Établissement"
            color="neutral"
            :variant="activeTab === 'etablissement' ? 'solid' : 'ghost'"
            block
            class="rounded-lg"
            @click="activeTab = 'etablissement'"
          />
          <UButton
            label="Personnelles"
            color="neutral"
            :variant="activeTab === 'personnelles' ? 'solid' : 'ghost'"
            block
            class="rounded-lg"
            @click="activeTab = 'personnelles'"
          />
        </div>

        <!-- Tab: Établissement -->
        <template v-if="activeTab === 'etablissement'">
          <div class="flex flex-col gap-2">
            <div class="flex items-start justify-between gap-2">
              <h1 class="line-clamp-1 flex-1 text-xl leading-tight font-semibold">
                {{ restaurant.name }}
              </h1>
              <div class="flex shrink-0 items-center gap-1">
                <NuxtImg
                  v-for="i in restaurant.stars"
                  :key="i"
                  src="/images/logo.png"
                  alt="étoile Michelin"
                  class="size-6 object-contain"
                />
              </div>
            </div>

            <p class="leading-snug">{{ restaurant.description }}</p>
          </div>

          <div
            class="flex flex-col gap-3 rounded-xl border border-default bg-default/50 p-3 text-sm"
          >
            <div class="flex items-start gap-2.5">
              <UIcon name="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-muted" />
              <span>{{ restaurant.address }}</span>
            </div>

            <div class="flex items-center gap-2.5">
              <UIcon name="lucide:phone" class="size-4 shrink-0 text-muted" />
              <a :href="`tel:${restaurant.phone}`" class="hover:underline">{{
                restaurant.phone
              }}</a>
            </div>

            <div class="flex items-start gap-2.5">
              <UIcon name="lucide:clock" class="mt-0.5 size-4 shrink-0 text-muted" />
              <div class="flex flex-col gap-1">
                <div v-for="slot in restaurant.hours" :key="slot.day" class="flex flex-col">
                  <span class="text-xs font-medium">{{ slot.day }}</span>
                  <span class="text-xs text-muted">{{ slot.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Tab: Personnelles -->
        <template v-else>
          <div class="flex items-center gap-3">
            <UAvatar :src="restaurant.chef.avatar" :alt="restaurant.chef.name" size="xl" />
            <div>
              <p class="leading-tight font-semibold">{{ restaurant.chef.name }}</p>
              <p class="text-xs text-muted">{{ restaurant.chef.title }}</p>
            </div>
          </div>

          <p class="flex-1 overflow-y-auto leading-relaxed">
            {{ restaurant.chef.bio }}
          </p>

          <div class="shrink-0 rounded-xl border border-default bg-default/50 p-3">
            <div class="flex gap-2">
              <UIcon name="lucide:quote" class="mt-0.5 size-4 shrink-0 text-primary" />
              <p class="text-sm leading-snug italic">{{ restaurant.chef.quote }}</p>
            </div>
            <p class="mt-2 text-right text-xs font-medium text-muted">
              - {{ restaurant.chef.name }}
            </p>
          </div>
        </template>

        <!-- CTA -->
        <div class="mt-auto shrink-0">
          <UButton
            label="Réserver une table"
            color="primary"
            variant="solid"
            class="rounded-lg"
            size="lg"
            block
          />
        </div>
      </aside>
    </div>
  </UContainer>
</template>
