<script lang="ts" setup>
const { collections } = useAccountData();
</script>

<template>
  <UContainer class="py-12 md:py-16">
    <div class="mb-10">
      <p class="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">L’Échappée</p>
      <h2 class="text-2xl font-bold text-highlighted md:text-3xl">Mes collections</h2>
    </div>

    <div
      v-if="collections.length > 0"
      class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      <div
        v-for="item in collections"
        :key="item.name"
        class="group flex cursor-default flex-col overflow-hidden rounded-xl border border-default bg-elevated transition-colors"
      >
        <div class="flex aspect-square items-center justify-center bg-muted/10 p-4">
          <NuxtImg
            :src="item.img"
            :alt="item.name"
            class="size-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div class="border-t border-default p-3">
          <p class="truncate text-sm leading-snug font-medium text-default">{{ item.name }}</p>
          <div class="mt-1.5 flex items-center justify-between gap-1">
            <span class="truncate text-xs text-muted">{{ item.date }}</span>
            <UBadge
              :label="item.type"
              variant="subtle"
              color="secondary"
              size="xs"
              class="shrink-0"
            />
          </div>
        </div>
      </div>
    </div>

    <UEmpty
      v-else
      icon="lucide:package"
      title="Aucune collection pour le moment"
      description="Visitez des restaurants et hôtels pour débloquer des objets."
    />
  </UContainer>
</template>
