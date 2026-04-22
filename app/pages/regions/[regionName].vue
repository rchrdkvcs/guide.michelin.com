<script lang="ts" setup>
const { regionName } = useRoute().params;
</script>

<template>
  <RegionHero />
  <RegionDescription class="pt-16" />
  <RegionRestaurant />
</template>
