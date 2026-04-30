<script lang="ts" setup>
const footerLinks = ref([
  {
    label: "Accueil",
    to: "/",
  },
  {
    label: "Restaurants",
    to: "/restaurants",
  },
  {
    label: "Hébergements",
    to: "/hotels",
  },
  {
    label: "Aventures",
    to: "/adventures",
  },
  {
    label: "Guides Best-of",
    to: "#",
  },
  {
    label: "Actualités",
    to: "/news",
  },
  {
    label: "À propos",
    to: "/about",
  },
]);
</script>

<template>
  <div class="border-t border-default bg-muted py-6 lg:py-12">
    <UContainer class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="flex flex-col gap-2">
        <p class="font-medium">Recevez en avant-première les nouveautés du Guide MICHELIN</p>

        <UFieldGroup class="max-w-md">
          <UInput placeholder="Enter your email" class="w-full" />
          <UButton label="S'inscrire" color="primary" variant="solid" />
        </UFieldGroup>

        <p class="text-[10px] text-muted">
          Michelin traitera vos données afin de gérer votre inscription mesurer la performance de
          nos campagnes et analyser vos interactions avec nos communications. Vos données pourront
          être partagées avec les sociétés affiliées à Michelin (TabletHotels et Robert Parker) afin
          de mieux vous connaître et avec votre accord vous adresser des communications marketing.
          Vous pourrez à tout moment gérer vos préférences de communication ou vous désabonner. Vous
          pouvez exercer vos droits en nous contactant. En savoir plus sur la gestion de vos données
          par Michelin ici.
        </p>
      </div>

      <div class="flex flex-col items-center justify-center gap-4">
        <p class="font-medium">
          Les meilleurs restaurants et hôtels vous suivent partout sur l'app
        </p>

        <div class="flex items-center justify-center gap-4">
          <ULink to="#">
            <NuxtImg
              src="/images/download/apple.png"
              alt="Download on the App Store"
              class="h-10 object-contain"
            />
          </ULink>
          <ULink to="#">
            <NuxtImg
              src="/images/download/android.png"
              alt="Get it on Google Play"
              class="h-10 object-contain"
            />
          </ULink>
        </div>
      </div>
    </UContainer>
  </div>

  <USeparator />

  <UFooter class="bg-muted" :ui="{ bottom: 'border-t border-default' }">
    <template #left>
      <UNavigationMenu :items="footerLinks" orientation="vertical" variant="link" />
    </template>

    <div class="flex h-full flex-col items-center justify-between">
      <div class="flex items-center justify-center gap-4">
        <UButton
          icon="lucide:facebook"
          color="neutral"
          variant="ghost"
          to="https://www.facebook.com/michelin.fr"
        />
        <UButton
          icon="lucide:instagram"
          color="neutral"
          variant="ghost"
          to="https://www.instagram.com/michelin.fr"
        />
        <UButton
          icon="lucide:twitter"
          color="neutral"
          variant="ghost"
          to="https://twitter.com/michelin_fr"
        />
      </div>

      <UButton
        to="/contact-us"
        label="Contactez-nous"
        color="neutral"
        variant="link"
        class="mt-4 lg:mt-12"
      />
    </div>

    <template #right>
      <div class="flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Groupe Michelin</p>
        <p class="flex flex-col gap-1 text-center text-sm text-muted">
          <span>3 place des Carmes Déchaux</span>
          <span>63000 Clermont-Ferrand</span>
          <span>France</span>
        </p>
      </div>
    </template>

    <template #bottom>
      <div class="flex flex-col items-center justify-center gap-4">
        <MichelinLogo class="size-32 object-contain" />
        <p class="text-center text-sm text-muted">
          Copyright © 2026 MICHELIN Guide. Tous droits réservés
        </p>
        <UNavigationMenu
          :items="[
            { label: 'Mentions légales', to: '/legal' },
            { label: 'Politique de confidentialité', to: '/privacy' },
            { label: 'Conditions d\'utilisation', to: '/terms' },
          ]"
          orientation="horizontal"
          variant="link"
          class="hidden lg:flex"
        />
        <UNavigationMenu
          :items="[
            { label: 'Mentions légales', to: '/legal' },
            { label: 'Politique de confidentialité', to: '/privacy' },
            { label: 'Conditions d\'utilisation', to: '/terms' },
          ]"
          variant="link"
          orientation="vertical"
          class="flex lg:hidden"
        />
      </div>
    </template>
  </UFooter>
</template>
