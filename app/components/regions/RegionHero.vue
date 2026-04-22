<script lang="ts" setup></script>

<template>
  <UContainer class="mt-20">
    <div class="relative w-full aspect-video rounded-2xl overflow-hidden">
      <NuxtImg
        src="/images/regions/bretagne.png"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 to-transparent" />
      <div class="absolute inset-0 flex items-end justify-center pb-8 z-10">
        <h1 class="w-full text-center font-bold tracking-wide capitalize bordered-text">
          Bretagne
        </h1>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
.bordered-text {
  font-size: clamp(3rem, 10vw, 8rem);
  color: transparent;
  -webkit-text-stroke: 2px white;
}
</style>
