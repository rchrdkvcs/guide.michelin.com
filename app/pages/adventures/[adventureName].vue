<script lang="ts" setup>
const { adventureName } = useRoute().params;
</script>

<template>
  <AdventureHero />
  <AdventureDescription />
  <AdventureRestaurants />
  <AdventureHotels />
</template>
