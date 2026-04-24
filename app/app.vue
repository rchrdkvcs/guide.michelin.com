<script setup>
useSeoMeta({
  ogType: "website",
  ogImage: "/images/hero.png",
});
</script>

<template>
  <UApp>
    <Header />

    <UMain>
      <NuxtPage />
    </UMain>

    <Footer />
  </UApp>
</template>
