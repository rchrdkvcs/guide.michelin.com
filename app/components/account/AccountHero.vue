<script lang="ts" setup>
const { user, fullName, progressPercent, collections } = useAccountData();
</script>

<template>
  <div class="rounded-2xl border border-default bg-elevated">
    <UContainer class="py-4 md:py-8">
      <div class="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <!-- Informations -->
        <div class="min-w-0 flex-1">
          <!-- Nom -->
          <div class="mb-1 flex flex-wrap items-center gap-3">
            <h1 class="text-3xl font-bold tracking-tight text-highlighted">{{ fullName }}</h1>
            <UBadge
              v-if="user.plan === 'free'"
              label="Gratuit"
              color="neutral"
              variant="subtle"
            />
          </div>

          <!-- Email + ancienneté -->
          <div class="mb-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
            <span class="flex items-center gap-1.5">
              <UIcon name="lucide:mail" class="size-4 shrink-0" />
              {{ user.email }}
            </span>
            <span class="flex items-center gap-1.5">
              <UIcon name="lucide:calendar" class="size-4 shrink-0" />
              Membre depuis {{ user.memberSince }}
            </span>
          </div>

          <!-- Niveau + barre XP -->
          <div class="mb-6 flex flex-wrap items-center gap-4">
            <div
              class="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-1"
            >
              <UIcon name="lucide:zap" class="size-4 text-primary" />
              <span class="text-sm font-bold text-primary">Niveau {{ user.level }}</span>
            </div>
            <div class="max-w-xs min-w-40 flex-1">
              <div class="mb-1.5 flex justify-between text-xs text-muted">
                <span>{{ user.xpInCurrentLevel }} XP</span>
                <span>{{ user.xpPerLevel }} XP pour le niveau suivant</span>
              </div>
              <UProgress :modelValue="progressPercent" color="secondary" />
            </div>
          </div>

          <!-- Stats rapides -->
          <div class="flex flex-wrap gap-6">
            <div class="text-center">
              <p class="text-2xl font-bold text-highlighted">{{ user.totalXp }}</p>
              <p class="mt-0.5 text-xs text-muted">XP total</p>
            </div>
            <USeparator orientation="vertical" class="h-10 self-center" />
            <div class="text-center">
              <p class="text-2xl font-bold text-highlighted">{{ user.restaurantsVisited }}</p>
              <p class="mt-0.5 text-xs text-muted">Restaurants</p>
            </div>
            <USeparator orientation="vertical" class="h-10 self-center" />
            <div class="text-center">
              <p class="text-2xl font-bold text-highlighted">{{ user.hotelsVisited }}</p>
              <p class="mt-0.5 text-xs text-muted">Hôtels</p>
            </div>
            <USeparator orientation="vertical" class="h-10 self-center" />
            <div class="text-center">
              <p class="text-2xl font-bold text-highlighted">{{ collections.length }}</p>
              <p class="mt-0.5 text-xs text-muted">Objets collectés</p>
            </div>
          </div>
        </div>

        <!-- Bouton modification -->
        <UButton
          label="Modifier le profil"
          icon="lucide:pencil"
          variant="ghost"
          color="neutral"
          class="hidden shrink-0 self-start sm:flex"
        />
      </div>
    </UContainer>
  </div>
</template>
