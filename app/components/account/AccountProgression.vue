<script lang="ts" setup>
const { milestones, progressPercent } = useAccountData();
</script>

<template>
  <UContainer class="py-12 md:py-16">
    <div class="mb-10">
      <p class="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">L’Échappée</p>
      <h2 class="text-2xl font-bold text-highlighted md:text-3xl">Ma progression</h2>
    </div>

    <!-- Timeline horizontale scrollable -->
    <div class="no-scrollbar -mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
      <div class="flex" style="min-width: max-content">
        <div
          v-for="(milestone, index) in milestones"
          :key="milestone.level"
          class="flex w-40 shrink-0 flex-col items-center transition-opacity duration-200"
          :class="milestone.status === 'locked' ? 'opacity-45' : ''"
        >
          <!-- Zone haute : carte pour indices pairs (0, 2, 4…) -->
          <div class="flex h-48 w-full flex-col items-center justify-end px-1.5 pb-3">
            <template v-if="index % 2 === 0">
              <div
                class="flex w-full flex-col items-center gap-1.5 rounded-xl border border-default bg-elevated p-2.5 text-center"
              >
                <div
                  class="flex size-12 items-center justify-center overflow-hidden rounded-lg bg-muted/10"
                >
                  <NuxtImg
                    v-if="milestone.img"
                    :src="milestone.img"
                    :alt="milestone.reward"
                    class="size-full object-contain p-1"
                  />
                  <UIcon v-else name="lucide:gift" class="size-5 text-muted" />
                </div>
                <p class="line-clamp-2 text-xs leading-tight font-medium text-default">
                  {{ milestone.reward }}
                </p>
                <div class="flex flex-wrap justify-center gap-1">
                  <UBadge
                    v-if="milestone.premium"
                    label="Premium"
                    color="secondary"
                    variant="subtle"
                    size="sm"
                  />
                  <UBadge
                    v-if="milestone.status === 'completed'"
                    label="Obtenu"
                    color="success"
                    variant="subtle"
                    size="sm"
                  />
                </div>
                <div v-if="milestone.status === 'current'" class="w-full">
                  <UProgress :modelValue="progressPercent" color="secondary" size="sm" />
                  <span class="mt-0.5 block text-xs text-muted">{{ progressPercent }} %</span>
                </div>
              </div>
            </template>
          </div>

          <!-- Label niveau -->
          <span
            class="mb-1 text-xs font-semibold"
            :class="milestone.status === 'locked' ? 'text-muted' : 'text-highlighted'"
            >Niveau {{ milestone.level }}</span
          >

          <!-- Ligne + pastille -->
          <div class="flex w-full items-center">
            <div
              class="h-1 flex-1"
              :class="
                index === 0
                  ? 'invisible'
                  : milestones[index - 1]?.status === 'completed'
                    ? 'bg-primary/50'
                    : 'bg-border-default'
              "
            />
            <div
              class="z-10 flex size-9 shrink-0 items-center justify-center rounded-full"
              :class="{
                'bg-primary text-inverted shadow-sm': milestone.status === 'completed',
                'bg-secondary text-inverted shadow-sm ring-4 ring-secondary/20':
                  milestone.status === 'current',
                'border-2 border-default bg-elevated text-muted': milestone.status === 'locked',
              }"
            >
              <UIcon
                :name="
                  milestone.status === 'completed'
                    ? 'lucide:check'
                    : milestone.status === 'current'
                      ? 'lucide:zap'
                      : 'lucide:lock'
                "
                class="size-4"
              />
            </div>
            <div
              class="h-1 flex-1"
              :class="
                index === milestones.length - 1
                  ? 'invisible'
                  : milestone.status === 'completed'
                    ? 'bg-primary/50'
                    : 'bg-border-default'
              "
            />
          </div>

          <!-- Badge XP -->
          <UBadge
            :label="`${milestone.xp} XP`"
            variant="subtle"
            color="neutral"
            size="sm"
            class="mt-1"
          />

          <!-- Zone basse : carte pour indices impairs (1, 3, 5…) -->
          <div class="flex h-48 w-full flex-col items-center justify-start px-1.5 pt-3">
            <template v-if="index % 2 === 1">
              <div
                class="flex w-full flex-col items-center gap-1.5 rounded-xl border border-default bg-elevated p-2.5 text-center"
              >
                <div
                  class="flex size-12 items-center justify-center overflow-hidden rounded-lg bg-muted/10"
                >
                  <NuxtImg
                    v-if="milestone.img"
                    :src="milestone.img"
                    :alt="milestone.reward"
                    class="size-full object-contain p-1"
                  />
                  <UIcon v-else name="lucide:gift" class="size-5 text-muted" />
                </div>
                <p class="line-clamp-2 text-xs leading-tight font-medium text-default">
                  {{ milestone.reward }}
                </p>
                <div class="flex flex-wrap justify-center gap-1">
                  <UBadge
                    v-if="milestone.premium"
                    label="Premium"
                    color="secondary"
                    variant="subtle"
                    size="sm"
                  />
                  <UBadge
                    v-if="milestone.status === 'completed'"
                    label="Obtenu"
                    color="success"
                    variant="subtle"
                    size="sm"
                  />
                </div>
                <div v-if="milestone.status === 'current'" class="w-full">
                  <UProgress :value="progressPercent" color="secondary" size="xs" />
                  <span class="mt-0.5 block text-xs text-muted">{{ progressPercent }} %</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Légende -->
    <div class="mt-8 flex flex-wrap items-center gap-5 text-xs text-muted">
      <span class="flex items-center gap-2">
        <span class="inline-block size-2.5 rounded-full bg-primary" />
        Débloqué
      </span>
      <span class="flex items-center gap-2">
        <span class="inline-block size-2.5 rounded-full bg-secondary" />
        En cours
      </span>
      <span class="flex items-center gap-2">
        <span class="inline-block size-2.5 rounded-full border-2 border-default" />
        Verrouillé
      </span>
    </div>
  </UContainer>
</template>
