<script lang="ts" setup>
useSeoMeta({
  title: "Mon compte",
  description: "Gérez votre compte L'Échappée et suivez vos récompenses sur le Guide MICHELIN.",
  robots: "noindex, nofollow",
});
</script>

<template>
  <UContainer class="mt-24">
    <AccountHero />
    <AccountProgression />
    <USeparator />
    <AccountCollections />
    <USeparator />
    <AccountRecompenses />
  </UContainer>
</template>
