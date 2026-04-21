<script lang="ts" setup>
const { resaurantName } = useRoute().params;
</script>

<template>
  <UPageHero
    :title="`Restaurant: ${resaurantName}`"
    description="Discover the unique flavors and ambiance of this restaurant."
  />
</template>
