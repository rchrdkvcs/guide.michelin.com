<script lang="ts" setup>
useSeoMeta({
  title: "Restaurants & Hôtels d'Exception",
  description:
    "Découvrez les restaurants étoilés et hôtels d'exception sélectionnés par le Guide MICHELIN à travers le monde.",
  ogTitle: "Restaurants & Hôtels d'Exception · Guide MICHELIN",
  ogDescription:
    "Découvrez les restaurants étoilés et hôtels d'exception sélectionnés par le Guide MICHELIN à travers le monde.",
  ogImage: "/images/hero.png",
});
</script>

<template>
  <LandingHero />
  <PartnerMarquee class="pt-20" />
  <LandingAdventure />
  <LandingFeaturedRestaurants />
  <LandingArticles />
  <LandingAbout />
</template>
