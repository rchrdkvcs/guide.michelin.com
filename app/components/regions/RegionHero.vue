<script lang="ts" setup></script>

<template>
  <UContainer class="mt-20">
    <div class="relative aspect-video w-full overflow-hidden rounded-2xl">
      <NuxtImg
        src="/images/regions/bretagne.png"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 to-transparent" />
      <div class="absolute inset-0 z-10 flex items-end justify-center pb-8">
        <h1 class="bordered-text w-full text-center font-bold tracking-wide capitalize">
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
