<script lang="ts" setup>
const { vouchers } = useAccountData();
</script>

<template>
  <UContainer class="py-12 md:py-16">
    <div class="mb-10">
      <p class="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">L’Échappée</p>
      <h2 class="text-2xl font-bold text-highlighted md:text-3xl">Mes récompenses</h2>
    </div>

    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="voucher in vouchers"
        :key="voucher.title"
        :class="voucher.status === 'used' ? 'opacity-50' : ''"
        variant="subtle"
        :ui="{ root: 'flex flex-col', body: 'flex-1' }"
      >
        <template #header>
          <div class="flex items-start justify-between gap-3">
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
            >
              <UIcon name="lucide:ticket" class="size-5 text-primary" />
            </div>
            <UBadge
              :label="voucher.status === 'used' ? 'Utilisé' : 'Actif'"
              :color="voucher.status === 'used' ? 'neutral' : 'success'"
              variant="subtle"
              size="sm"
            />
          </div>
          <h3 class="mt-3 text-sm leading-snug font-semibold text-highlighted">
            {{ voucher.title }}
          </h3>
        </template>

        <div>
          <p class="text-sm leading-relaxed text-muted">{{ voucher.description }}</p>
          <div
            v-if="voucher.code"
            class="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-default bg-muted/20 px-3 py-2"
          >
            <UIcon name="lucide:tag" class="size-4 shrink-0 text-muted" />
            <span
              class="flex-1 font-mono text-sm font-semibold tracking-widest text-highlighted"
              >{{ voucher.code }}</span
            >
            <UButton
              icon="lucide:copy"
              size="xs"
              variant="ghost"
              color="neutral"
              aria-label="Copier le code"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 text-xs text-muted">
              <UIcon name="lucide:clock" class="size-3.5 shrink-0" />
              <span>Expire le {{ voucher.expires }}</span>
            </div>
            <UButton
              label="J’en profite"
              color="primary"
              size="sm"
              :disabled="voucher.status === 'used'"
              :variant="voucher.status === 'used' ? 'outline' : 'solid'"
            />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
