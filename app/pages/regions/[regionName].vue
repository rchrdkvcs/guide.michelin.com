<script lang="ts" setup>
const { regionName } = useRoute().params;
</script>

<template>
  <RegionHero />
  <RegionDescription />
  <RegionRestaurants />
  <RegionHotels />
</template>
