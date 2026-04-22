<script lang="ts" setup></script>

<template>
  <UContainer class="flex flex-col gap-6">
    <div class="relative flex flex-col gap-2">
      <span class="text-xs font-semibold tracking-[0.2em] uppercase text-muted">La région</span>

      <h2 class="text-2xl font-medium leading-snug text-elevated">
        Une terre de contrastes entre mer sauvage, forêts profondes et gastronomie d'exception.
      </h2>

      <p class="leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolore eligendi
        excepturi iste quaerat, qui quo reprehenderit repudiandae vel velit? Accusantium ad
        architecto at aut dolor dolore error facere fugiat in ipsa labore minima nobis nulla odio
        omnis placeat quae quas quidem quisquam quod rem sequi similique, sint suscipit unde vero
        vitae! A distinctio dolores ducimus odio. Animi blanditiis dicta necessitatibus officiis
        pariatur quis recusandae voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. At ducimus fuga fugit id, ipsum iusto nam pariatur porro sint veritatis!
      </p>
    </div>

    <!-- Badges -->
    <div class="flex gap-2 items-center justify-start overflow-x-auto no-scrollbar">
      <UBadge label="#Poisson" v-for="i in 10" :key="i" color="neutral" variant="subtle" />
    </div>
  </UContainer>
</template>
