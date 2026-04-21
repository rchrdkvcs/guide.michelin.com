<script lang="ts" setup>
const { regionName } = useRoute().params;
</script>

<template>
  <UPageHero
    :title="`Region: ${regionName}`"
    description="Discover the unique characteristics and attractions of this region."
  />
</template>
