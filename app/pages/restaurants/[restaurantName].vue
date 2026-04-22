<script lang="ts" setup>
const { restaurantName } = useRoute().params;
</script>

<template>
  <RestaurantDetails />
  <RestaurantSuggestions />
  <HotelSuggestions />
</template>
